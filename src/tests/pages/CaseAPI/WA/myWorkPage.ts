import { expect, Page } from "@playwright/test";
import myWorkContent from "../../fixtures/content/CaseAPI/myWork/myWork_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";

type MyWorkPage = {
  myTasksTab: string;
  availableTasksTab: string;
  filterButton: string;
  assignToMeAndGoToTask: string;
  assignToMeLink: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  selectAvailableTasks(page: Page): Promise<void>;
  seeTask(page: Page, taskName: string): Promise<void>;
  clickAssignAndGoToTask(page: Page): Promise<void>;
  clickAssignToMe(page: Page): Promise<void>;
  navigateToTaskPage(page: Page, taskName: string): Promise<void>;
};

const myWorkPage: MyWorkPage = {
  myTasksTab: `a:text-is(" My tasks ")`,
  availableTasksTab: "li.hmcts-sub-navigation__item:nth-child(2)",
  filterButton: ".hmcts-button--secondary",
  assignToMeAndGoToTask: "#action_claim-and-go",
  assignToMeLink: "#action_claim",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await page.locator(".hmcts-primary-navigation__link").first().click();
    await page.waitForSelector(
      `.govuk-heading-xl:text-is("${myWorkContent.pageTitle}")`,
    );
    //await page.click(this.filterButton);
    //await page.locator(this.filterButton).click({force: true});
    //await expect(page.locator("xuilib-generic-filter")).toBeVisible();
    //await page.waitForSelector(".govuk-!-padding-3")
    await expect(page.locator("xuilib-generic-filter")).toBeHidden();
    await page
      .getByRole("button")
      .filter({ hasText: " Show work filter " })
      .dispatchEvent("click");
    //await expect(page.locator("xuilib-generic-filter > form > .contain-classes")).toBeVisible();
    await expect(page.locator("xuilib-generic-filter > form")).toBeVisible();

    //     const sectionText = await page.locator("xuilib-generic-filter > form").evaluate(el => el.textContent);
    //     expect(sectionText).toContain(`${myWorkContent.filterSubtitle1}`);

    //expect(page.locator("xuilib-generic-filter > form").innerText()).toContain(`${myWorkContent.filterSubtitle1}`)
    //await page.waitForSelector(`.govuk-heading-s:text-is("${myWorkContent.filterSubtitle1}")`);

    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${myWorkContent.hintText}")`),
        1,
      ),
      // ...Array.from({ length: 3 }, (_, index) => {
      //   const subtitle = (myWorkContent as any)[`filterSubtitle${index + 1}`];
      //   return commonHelpers.checkVisibleAndPresent(
      //     page.locator(`.govuk-heading-s:text-is("${subtitle}")`),
      //     1,
      //   );
      // }),
      ...Array.from({ length: 4 }, (_, index) => {
        const tab = (myWorkContent as any)[`tab${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`li.hmcts-sub-navigation__item:has-text("${tab}")`),
          1,
        );
      }),
      ...Array.from({ length: 7 }, (_, index) => {
        const column = (myWorkContent as any)[`column${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`th.cdk-header-cell:has-text("${column}")`),
          1,
        );
      }),
    ]);
    await page.click(this.filterButton);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async selectAvailableTasks(page: Page): Promise<void> {
    await page.locator(this.availableTasksTab).click();
  },

  async seeTask(page: Page, taskName: string): Promise<void> {
    while (true) {
      const locatorVisible = await page
        .locator(`td:has-text("${subjectDetailsContent.name}")`)
        .isVisible();
      if (locatorVisible) {
        console.log("Task visible!");
        break;
      }
      await page.reload();
      await page.waitForTimeout(10000);
    }

    expect(
      page
        .locator("tr")
        .filter({
          has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
        })
        .locator(`exui-task-field:text-is("${taskName}")`),
    ).toBeVisible();
  },

  async clickAssignAndGoToTask(page: Page): Promise<void> {
    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(`div > button:text-is("Manage ")`)
      .click();
    await page.waitForSelector(this.assignToMeAndGoToTask);
    await page.locator(this.assignToMeAndGoToTask).click();
    await page.waitForSelector(`h2:text-is("Active tasks")`);
  },

  async clickAssignToMe(page: Page): Promise<void> {
    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(`div > button:text-is("Manage ")`)
      .click();
    await page.waitForSelector(this.assignToMeLink);
    await page.locator(this.assignToMeLink).click();
    await page
      .locator(`td:has-text("${subjectDetailsContent.name}")`)
      .waitFor({ state: "detached" });
  },

  async navigateToTaskPage(page: Page, taskName: string): Promise<void> {
    await page.locator(this.myTasksTab).click();
    await page.waitForSelector(`td:has-text("${subjectDetailsContent.name}")`);

    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(
        `exui-task-field > exui-task-name-field > exui-url-field > a:text-is("${taskName}")`,
      )
      .click();
    // await page.waitForSelector(`h2:text-is("Active tasks")`);
    // await page.waitForLoadState("domcontentloaded");
  },
};

export default myWorkPage;
