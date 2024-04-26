import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import createListingNotifyPageContent from "../../../fixtures/content/CaseAPI/createListing/createListingNotifyPage_content.ts";

type CreateListingNotifyPage = {
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const createListingNotifyPage: CreateListingNotifyPage = {
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        createListingNotifyPageContent.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        createListingNotifyPageContent.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        createListingNotifyPageContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `dt > ccd-markdown > div > markdown > p:text-is("${createListingNotifyPageContent.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${createListingNotifyPageContent.textOnPage2}")`,
        ),
        4,
      ),
      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage = (createListingNotifyPageContent as any)[
          `textOnPage${index + 3}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    // if (accessibilityTest) {
    //   await axeTest(page);
    // }
  },

  async continueOn(page: Page): Promise<void> {
    await page.locator(`#cicCaseNotifyPartySubject-SubjectCIC`).click();
    await page
      .locator(`#cicCaseNotifyPartyRepresentative-RepresentativeCIC`)
      .click();
    await page.locator(`#cicCaseNotifyPartyRespondent-RespondentCIC`).click();
    await page.locator(`#cicCaseNotifyPartyApplicant-ApplicantCIC`).click();
    await page.getByRole("button", { name: "Continue" }).click();
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Continue" }).click();
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-heading:has-text("${createListingNotifyPageContent.errorTitle}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-list:has-text("${createListingNotifyPageContent.errorMessage}")`,
      ),
      1,
    );
  },
};

export default createListingNotifyPage;
