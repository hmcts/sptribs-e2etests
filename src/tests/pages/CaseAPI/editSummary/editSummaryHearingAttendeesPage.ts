import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import editSummaryHearingAttendeesContent from "../../../fixtures/content/CaseAPI/editSummary/editSummaryHearingAttendees_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type EditSummaryHearingAttendeesPage = {
  previous: string;
  continue: string;
  cancel: string;
  remove: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page, fullPanelHearing: boolean): Promise<string[]>;
  triggerErrorMessages(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const editSummaryHearingAttendeesPage: EditSummaryHearingAttendeesPage = {
  previous: "button[name='Previous']",
  continue: '[type="submit"]',
  cancel: ".cancel",
  remove: "button[aria-label='Remove Panel member and Role 4']",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        editSummaryHearingAttendeesContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        editSummaryHearingAttendeesContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editSummaryHearingAttendeesContent.caseReference + caseNumber,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (editSummaryHearingAttendeesContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    await page.locator(".write-collection-add-item__bottom").click();
    await Promise.all([
      expect(page.locator("#memberList > div > h2")).toHaveText(
        editSummaryHearingAttendeesContent.subTitle1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `label > h3:has-text("${editSummaryHearingAttendeesContent.subTitle1}")`,
        ),
        4,
      ),
      expect(
        page.locator("#memberList_0_0 > div > div > label > h3"),
      ).toHaveText(editSummaryHearingAttendeesContent.subTitle1),
      ...Array.from({ length: 5 }, (_, index) => {
        const textOnPage = (editSummaryHearingAttendeesContent as any)[
          `textOnPage${index + 5}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          4,
        );
      }),
    ]);
    await page.click(this.remove);
    await expect(page.locator(".cdk-overlay-container")).toBeVisible();
    await page.locator("button[title='Remove']").click();

    // if (accessibilityTest) {
    //   await axeTest(page);
    // }
  },

  async fillFields(page: Page, fullPanelHearing: boolean): Promise<string[]> {
    const panel: string[] = [];
    panel.push(<string>await page.textContent("#judge > option:nth-child(2)"));
    if (!fullPanelHearing) {
      await page
        .getByLabel("No. It was a 'sit alone' hearing", { exact: true })
        .click();
      return panel;
    } else {
      await expect(page.getByLabel("Yes", { exact: true })).toBeChecked();
      panel.push(
        <string>(
          await page.textContent("#memberList_0_name > option:nth-child(3)")
        ),
      );
      await expect(page.locator("#memberList_0_role-fullMember")).toBeChecked();
      panel.push(
        <string>(
          await page.textContent("#memberList_1_name > option:nth-child(4)")
        ),
      );
      await expect(page.locator("#memberList_1_role-observer")).toBeChecked();
      panel.push(
        <string>(
          await page.textContent("#memberList_2_name > option:nth-child(5)")
        ),
      );
      await expect(page.locator("#memberList_2_role-appraiser")).toBeChecked();
      return panel;
    }
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.getByLabel("Yes", { exact: true }).click();
    await page.waitForTimeout(1000);
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        editSummaryHearingAttendeesContent.errorBanner,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        editSummaryHearingAttendeesContent.panelMemberError,
      ),
    ]);
    await page.getByRole("button", { name: "Add new" }).click();
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator(".govuk-error-summary__title")).toHaveText(
        editSummaryHearingAttendeesContent.errorBanner,
      ),
      expect(page.locator(".error-message").nth(0)).toHaveText(
        editSummaryHearingAttendeesContent.nameError,
      ),
      expect(page.locator(".error-message").nth(1)).toHaveText(
        editSummaryHearingAttendeesContent.roleError,
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

export default editSummaryHearingAttendeesPage;
