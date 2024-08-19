import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import sendOrderNotifyPage_content from "../../../fixtures/content/CaseAPI/sendOrder/sendOrderNotifyPage_content.ts";

type CloseCaseNotifyPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const closeCaseNotifyPage: CloseCaseNotifyPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `dt > ccd-markdown > div > markdown > p:text-is("${sendOrderNotifyPage_content.textOnPage1}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(
        sendOrderNotifyPage_content.pageHint,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h3:text-is("${caseSubjectDetailsObject_content.name}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        sendOrderNotifyPage_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${sendOrderNotifyPage_content.textOnPage2}")`,
        ),
        4,
      ),
      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage = (sendOrderNotifyPage_content as any)[
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
    if (!(await page.isChecked(`#cicCaseNotifyPartySubject-SubjectCIC`))) {
      await page.locator(`#cicCaseNotifyPartySubject-SubjectCIC`).click();
      await page
        .locator(`#cicCaseNotifyPartyRepresentative-RepresentativeCIC`)
        .click();
      await page.locator(`#cicCaseNotifyPartyRespondent-RespondentCIC`).click();
      await page.locator(`#cicCaseNotifyPartyApplicant-ApplicantCIC`).click();
    }
    await page.getByRole("button", { name: "Continue" }).click();
  },
};

export default closeCaseNotifyPage;
