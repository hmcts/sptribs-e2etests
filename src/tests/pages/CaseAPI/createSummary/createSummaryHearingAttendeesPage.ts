import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import createSummaryHearingAttendeesContent from "../../../fixtures/content/CaseAPI/createSummary/createSummaryHearingAttendees_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CreateSummaryHearingAttendeesPage = {
  previous: string;
  continue: string;
  cancel: string;
  remove: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
  fillFields(page: Page, fullPanelHearing: boolean): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createSummaryHearingAttendeesPage: CreateSummaryHearingAttendeesPage = {
  previous: "button[name='Previous']",
  continue: '[type="submit"]',
  cancel: ".cancel",
  remove: "button[aria-label='Remove Panel member and Role']",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await page.waitForURL(
      `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/create-hearing-summary/create-hearing-summaryhearingAttendees`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createSummaryHearingAttendeesContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createSummaryHearingAttendeesContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createSummaryHearingAttendeesContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (createSummaryHearingAttendeesContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      page.locator(this.previous).isVisible(),
      page.locator(this.continue).isVisible(),
      page.locator(this.cancel).isVisible(),
    ]);
    if (!errorMessaging) {
      await page.getByLabel("Yes", { exact: true }).click();
      await page.getByRole("button", { name: "Add new" }).click();
      await Promise.all([
        expect(page.locator("#memberList > div > h2")).toHaveText(
          createSummaryHearingAttendeesContent.subTitle1,
        ),
        expect(
          page.locator("#memberList_0_0 > div > div > label > h3"),
        ).toHaveText(createSummaryHearingAttendeesContent.subTitle1),
        ...Array.from({ length: 5 }, (_, index) => {
          const textOnPage = (createSummaryHearingAttendeesContent as any)[
            `textOnPage${index + 5}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.form-label:text-is("${textOnPage}")`),
            1,
          );
        }),
      ]);
      await page.click(this.remove);
      await expect(page.locator(".cdk-overlay-container")).toBeVisible();
      await page.locator("button[title='Remove']").click();
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillFields(page: Page, fullPanelHearing: boolean): Promise<void> {
    await page.locator("#judge").selectOption({ index: 1 });
    if (!fullPanelHearing) {
      await page
        .getByLabel("No. It was a 'sit alone' hearing", { exact: true })
        .click();
    } else {
      await page.getByLabel("Yes", { exact: true }).click();
      await page.getByRole("button", { name: "Add new" }).first().click();
      await page.locator("#memberList_0_name").selectOption({ index: 2 });
      await page.locator("#memberList_0_role-fullMember").check();
      await page.getByRole("button", { name: "Add new" }).nth(1).click();
      await page.locator("#memberList_1_name").selectOption({ index: 3 });
      await page.locator("#memberList_1_role-observer").check();
      await page.getByRole("button", { name: "Add new" }).nth(1).click();
      await page.locator("#memberList_2_name").selectOption({ index: 4 });
      await page.locator("#memberList_2_role-appraiser").check();
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        createSummaryHearingAttendeesContent.errorBanner,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        createSummaryHearingAttendeesContent.fullPanelError,
      ),
    ]);
    await page.getByLabel("Yes", { exact: true }).click();
    await page.waitForTimeout(1000);
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        createSummaryHearingAttendeesContent.errorBanner,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        createSummaryHearingAttendeesContent.panelMemberError,
      ),
    ]);
    await page.getByRole("button", { name: "Add new" }).click();
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        createSummaryHearingAttendeesContent.errorBanner,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        createSummaryHearingAttendeesContent.nameError,
      ),
      expect(page.locator(".error-message").nth(1)).toHaveText(
        createSummaryHearingAttendeesContent.roleError,
      ),
    ]);
    await page.click(this.remove);
    await expect(page.locator(".cdk-overlay-container")).toBeVisible();
    await page.locator("button[title='Remove']").click();
    await page
      .getByLabel("No. It was a 'sit alone' hearing", { exact: true })
      .click();
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continue);
  },
};

export default createSummaryHearingAttendeesPage;
