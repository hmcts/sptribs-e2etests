import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import cancelHearingNotifyPageContent from "../../../fixtures/content/CaseAPI/cancelHearing/cancelHearingNotifyPage_content.ts";

type PostponeHearingNotifyPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const postponeHearingNotifyPage: PostponeHearingNotifyPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        cancelHearingNotifyPageContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        cancelHearingNotifyPageContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        cancelHearingNotifyPageContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `dt > ccd-markdown > div > markdown > p:text-is("${cancelHearingNotifyPageContent.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${cancelHearingNotifyPageContent.textOnPage2}")`,
        ),
        3,
      ),
      ...Array.from({ length: 3 }, (_, index: number) => {
        const textOnPage = (cancelHearingNotifyPageContent as any)[
          `textOnPage${index + 3}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
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
