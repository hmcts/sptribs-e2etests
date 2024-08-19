import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import postponeHearingNotifyPageContent from "../../../fixtures/content/CaseAPI/postponeHearing/postponeHearingNotifyPage_content.ts";

type PostponeHearingNotifyPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const postponeHearingNotifyPage: PostponeHearingNotifyPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${postponeHearingNotifyPageContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        postponeHearingNotifyPageContent.pageHint,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        postponeHearingNotifyPageContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `dt > ccd-markdown > div > markdown > p:text-is("${postponeHearingNotifyPageContent.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${postponeHearingNotifyPageContent.textOnPage2}")`,
        ),
        3,
      ),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage = (postponeHearingNotifyPageContent as any)[
          `textOnPage${index + 3}`
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
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await expect(
      page.locator(`#cicCaseNotifyPartySubject-SubjectCIC`),
    ).toBeChecked();
    await expect(
      page.locator(`#cicCaseNotifyPartyRepresentative-RepresentativeCIC`),
    ).toBeChecked();
    await expect(
      page.locator(`#cicCaseNotifyPartyRespondent-RespondentCIC`),
    ).toBeChecked();
    await page.getByRole("button", { name: "Continue" }).click();
  },
};

export default postponeHearingNotifyPage;
