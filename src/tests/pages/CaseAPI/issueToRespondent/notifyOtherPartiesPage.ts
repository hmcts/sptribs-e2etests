import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers, { parties } from "../../../helpers/commonHelpers.ts";
import notifyOtherParties_content from "../../../fixtures/content/CaseAPI/issueToRespondent/notifyOtherParties_content.ts";

type NotifyOtherPartiesPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  continueOn(page: Page, recipients: parties[]): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const notifyOtherPartiesPage: NotifyOtherPartiesPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${notifyOtherParties_content.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        notifyOtherParties_content.pageHint,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        notifyOtherParties_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `dt > ccd-markdown > div > markdown > p:text-is("${notifyOtherParties_content.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${notifyOtherParties_content.textOnPage2}")`,
        ),
        4,
      ),
      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage = (notifyOtherParties_content as any)[
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

  async continueOn(page: Page, recipients: parties[]): Promise<void> {
    if (recipients.includes("Subject")) {
      await page.locator(`#cicCaseNotifyPartySubject-SubjectCIC`).click();
    }
    if (recipients.includes("Representative")) {
      await page
        .locator(`#cicCaseNotifyPartyRepresentative-RepresentativeCIC`)
        .click();
    }
    if (recipients.includes("Respondent")) {
      await page.locator(`#cicCaseNotifyPartyRespondent-RespondentCIC`).click();
    }
    if (recipients.includes("Applicant")) {
      await page.locator(`#cicCaseNotifyPartyApplicant-ApplicantCIC`).click();
    }
    await page.getByRole("button", { name: "Continue" }).click();
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForSelector(`.error-summary-heading:has-text("${notifyOtherParties_content.errorTitle}")`);
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-heading:has-text("${notifyOtherParties_content.errorTitle}")`,
      ),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-summary-list:has-text("${notifyOtherParties_content.errorMessage}")`,
      ),
      1,
    );
  },
};

export default notifyOtherPartiesPage;
