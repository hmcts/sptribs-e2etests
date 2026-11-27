# Writing tests

This page describes how the tests in this repository are structured and how to add one. For setup and commands, see the [README](../README.md).

The suite builds on the HMCTS Test Centre of Excellence (TCoE) package [`@hmcts/playwright-common`](https://github.com/hmcts/playwright-common), which supplies the shared Playwright configuration, browser projects, secret loading and axe-core accessibility helper. The TCoE reference project, [hmcts/tcoe-playwright-example](https://github.com/hmcts/tcoe-playwright-example), shows the wider conventions the package is designed for.

## The layers

A test is made of four layers. Each lives in its own directory under `src/tests/`:

| Layer | Directory | Responsibility |
|---|---|---|
| Test | `E2E/` | Sets up data, chooses users and calls journeys. Holds the tags. |
| Journey | `journeys/<App>/` | Runs one event or user flow across several pages, in order. |
| Page object | `pages/<App>/` | Knows one page: its selectors, what it should show, and how to fill it in. |
| Content | `fixtures/content/<App>/` | The expected text on each page, as constants. |

`<App>` is `CaseAPI`, `DSSCreateCase` or `DSSUpdateCase`. Work Allocation pages (My work, the Tasks tab and History) are under `pages/WA/`.

Keep assertions about page content in the page object, flow control in the journey, and test data and user choice in the test.

## Page objects

A page object is a typed object literal exported as the default. It has:

- selector properties for buttons and links used on the page;
- `checkPageLoads(page, accessibilityTest, ...)`, which waits for the page heading, asserts the page content and, when `accessibilityTest` is `true`, runs an axe audit;
- one or more action methods, such as `fillInFields(page)` or `continueOn(page)`, that complete the page and move on.

A shortened example, from [`pages/CaseAPI/addNote/addCaseNotePage.ts`](../src/tests/pages/CaseAPI/addNote/addCaseNotePage.ts):

```ts
import { AxeUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";
import addCaseNotes_content from "../../../fixtures/content/CaseAPI/addNote/addCaseNotes_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type AddCaseNotePage = {
  continue: string;
  checkPageLoads(page: Page, accessibilityTest: boolean, caseNumber: string, subjectName: string): Promise<void>;
  fillInFields(page: Page): Promise<void>;
};

const addCaseNotePage: AddCaseNotePage = {
  continue: '[type="submit"]',

  async checkPageLoads(page, accessibilityTest, caseNumber, subjectName) {
    await page.waitForSelector(`.govuk-heading-l:text-is("${addCaseNotes_content.pageTitle}")`);
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(addCaseNotes_content.pageHint),
      expect(page.locator("markdown > h3")).toContainText(subjectName),
      expect(page.locator("markdown > p")).toContainText(addCaseNotes_content.caseReference + caseNumber),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async fillInFields(page) {
    await page.fill(".form-control", addCaseNotes_content.textContent);
    await page.click(this.continue);
  },
};

export default addCaseNotePage;
```

Guidelines:

- Wait for something specific to the page (usually its heading) before asserting anything else.
- Group independent assertions in `Promise.all` so they run together.
- Read every expected string from the page's content file, not from a literal in the page object.
- Prefer web-first assertions (`expect(locator).toHaveText(...)`, `toBeVisible()`) to fixed waits.

## Content files

Each page has a content file under `fixtures/content/` that exports its expected text as a `const` object, for example [`fixtures/content/CaseAPI/addNote/addCaseNotes_content.ts`](../src/tests/fixtures/content/CaseAPI/addNote/addCaseNotes_content.ts):

```ts
const addCaseNotes_content = {
  pageHint: "Case: Add note",
  pageTitle: "Add case notes",
  caseReference: "Case number: ",
  textOnPage1: "Add a case note (Optional)",
  textOnPage2: "Enter note",
  textContent: "Lorem ipsum note",
} as const;

export default addCaseNotes_content;
```

Shared content files sit at the top of `fixtures/content/`:

| File | Holds |
|---|---|
| `waUsers_content.ts` | The user roles tests sign in as: `userRoleAdmin`, `userRoleCitizen`, `userRoleLO`, `userRoleJudge` and `userRoleCaseWorker`. `userRoleCitizen` switches to the demo citizen when the DSS URL is a demo URL. |
| `states_content.ts` | Case state names |
| `taskNames_content.ts` | Work Allocation task names |
| `CaseAPI/events_content.ts` | The labels in the Case API "Next step" event list |

When the service changes page text, update the content file and every test that uses it picks up the change.

## Journeys

A journey chains page objects to complete one event or flow. It takes the `page`, an `accessibilityTest` flag and whatever data the flow needs, and passes the flag through to each page's `checkPageLoads`. From [`journeys/CaseAPI/addNote.ts`](../src/tests/journeys/CaseAPI/addNote.ts):

```ts
const addNote: AddNote = {
  async addNote(page, accessibilityTest, caseNumber, subjectName) {
    await commonHelpers.chooseEventFromDropdown(page, "Case: Add note");
    await addCaseNotePage.checkPageLoads(page, accessibilityTest, caseNumber, subjectName);
    await addCaseNotePage.fillInFields(page);
    await page.click(`.mdc-tab__text-label:text-is("Notes")`);
    await notesTabPage.checkAddedNote(page);
  },
};
```

Larger journeys take options that pick a branch of the flow, for example the representation and upload choices in `journeys/DSSCreateCase/createCase.ts`, or the task completion method in `journeys/CaseAPI/task.ts`. Reuse an existing journey before you write a new one.

## Tests

Test files are in `src/tests/E2E/` and end in `.test.ts`. They use the standard Playwright `test` and its built-in `page` fixture. There are no custom fixtures: set-up is done by calling journeys and helpers at the start of each test.

```ts
import { test } from "@playwright/test";
import waUsers_content from "../fixtures/content/waUsers_content.ts";
import commonHelpers from "../helpers/commonHelpers.ts";
import { createCaseViaApi } from "../helpers/api/ApiCreateCase.ts";
import addNote from "../journeys/CaseAPI/addNote.ts";

test.describe("Case-API Add note tests. @CaseAPI", () => {
  test("Add a note to a Submitted case. @continuousIntegration", async ({ page }): Promise<void> => {
    const subjectName = `Subject AutoTesting${commonHelpers.randomLetters(5)}`;
    const caseNumber = await createCaseViaApi(page, subjectName);
    await addNote.addNote(page, false, caseNumber, subjectName);
  });
});
```

Conventions:

- Name the subject `Subject AutoTesting` followed by random letters. The global data clean-up finds test cases and tasks by that prefix.
- Create the case you need inside the test so tests stay independent and can run in parallel.
- Pass `false` for `accessibilityTest` in functional tests. Accessibility tests pass `true` (see below).
- Case API tests that start from a DSS-submitted case are wrapped in `if (!config.skipDSSCreateTests)` so they can be turned off with the `skipDSSCreateTests` environment variable.

## Helpers

| Helper | Use it for |
|---|---|
| [`config.ts`](../src/tests/config.ts) | Base URLs (`FEBaseURL`, `CaseAPIBaseURL`, `UpdateCaseBaseURL`), the test users keyed by `UserRole`, and paths to the upload test files (`testFile`, `testPdfFile`, `testWordFile`, `testOdtFile`, `testMP3File`). |
| [`helpers/api/ApiCreateCase.ts`](../src/tests/helpers/api/ApiCreateCase.ts) | `createCaseViaApi(page, subjectName, user?, caseType?)` signs in through XUI and creates a case through the CCD data store endpoints that XUI proxies, then opens it. Much faster than creating the case through the UI. Use it when the test is not about case creation. |
| [`helpers/idamLoginHelper.ts`](../src/tests/helpers/idamLoginHelper.ts) | `signInUser` and `signInUserDSS` sign a user in through IDAM for Case API and the DSS applications. |
| [`helpers/commonHelpers.ts`](../src/tests/helpers/commonHelpers.ts) | Shared steps: `chooseEventFromDropdown`, `signOutAndGoToCase`, `generateUrl`, `checkAndAcceptCookies`, `uploadFileController`, `checkVisibleAndPresent`, `checkForButtons`, `checkAllCaseTabs`, `checkDocument`, date helpers such as `todayDate` and `futureDate` (which skips weekends and bank holidays), and `randomLetters`. |
| [`helpers/testDataCleanUp.ts`](../src/tests/helpers/testDataCleanUp.ts) and [`journeys/CaseAPI/globalDataCleanUp.ts`](../src/tests/journeys/CaseAPI/globalDataCleanUp.ts) | Clear up tasks and cases left by earlier runs. Run by `yarn test:dataCleanUp`. |

Upload test files are in `src/tests/fixtures/testFiles/`.

## Accessibility checks

Accessibility tests reuse the functional journeys rather than having their own. To add one:

1. Write a test that runs the journey with `accessibilityTest` set to `true`.
2. Put `@accessibility` in its title.

Every page object's `checkPageLoads` then calls `new AxeUtils(page).audit()` from `@hmcts/playwright-common` after the page has loaded. Any axe violation fails the test. `yarn test:accessibility` and the nightly pipeline run all `@accessibility` tests in Chromium.

When you add a page object, include the `accessibilityTest` parameter and the audit in its `checkPageLoads`, so the page is covered by any accessibility test that passes through it.

## Tagging

Tests are selected by tags in their titles, through `--grep`. A test without a tag that a pipeline uses will not run in CI.

| Add this tag | When the test |
|---|---|
| `@DSSCreate` | Covers DSS Submit |
| `@DSSUpdate` | Covers DSS Update |
| `@CaseAPI` | Covers Case API, plus one of `@CaseAPI1`, `@CaseAPI2` or `@CaseAPI3` to place it in a nightly batch |
| `@continuousIntegration` | Should run against preview deployments. Keep this set small and reliable. |
| `@accessibility` | Runs a journey with `accessibilityTest: true` |
| `@ErrorMessaging` | Checks validation and error messages |
| `@crossbrowserCaseAPI`, `@createDSSFirefox`, `@createDSSWebkit`, `@updateDSSFirefox`, `@updateDSSWebkit` | Should also run in Firefox or WebKit |

Put a tag that applies to the whole file on `test.describe`, and tags for individual tests on `test`. The [README](../README.md#run-the-tests) maps each yarn script to its tag and project.

## Before you raise a pull request

1. Run the new test locally in Chromium against AAT, then in any other browser it is tagged for.
2. Run it a few times, or with `--repeat-each`, to check it is stable.
3. Run `yarn lint`.
4. If it should run on preview deployments, run `yarn test:ci` against a preview URL.
