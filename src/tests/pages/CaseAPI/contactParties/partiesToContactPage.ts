import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";

type PartiesToContactPage = {
  continue: string;
  message: string;
  previous: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  tickCheckBoxes(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const partiesToContactPage: PartiesToContactPage = {
  continue: '[type="submit"]',
  message: "#cicCaseNotifyPartyMessage",
  previous: ".button-secondary[disabled]",
  cancel: ".cancel",
  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toContainText(
        partiesToContact_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toContainText(
        partiesToContact_content.pageTitle,
      ),
      expect(page.locator("markdown > h3").nth(0)).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        partiesToContact_content.caseReference + caseNumber,
      ),
      expect(page.locator("markdown > p").nth(1)).toContainText(
        partiesToContact_content.textOnPage,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`text="${partiesToContact_content.textOnPage5}"`),
        4,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (partiesToContact_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      expect(
        page.locator('label[for="cicCaseNotifyPartyMessage"] .form-label'),
      ).toContainText(partiesToContact_content.textOnPage6),
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

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(this.continue);
    await Promise.all([
      expect(page.locator("#error-summary-title")).toHaveText(
        partiesToContact_content.errorBanner1,
      ),
      expect(page.locator(".validation-error")).toHaveText(
        partiesToContact_content.messageRequiredError1,
      ),
      expect(page.locator(".error-message")).toHaveText(
        partiesToContact_content.messageRequiredError1,
      ),
      page.fill(this.message, partiesToContact_content.message),
      page.click(this.continue),
      expect(
        page.locator(".heading-h3.error-summary-heading.ng-star-inserted"),
      ).toContainText(partiesToContact_content.errorBanner2),
      expect(
        page.locator(
          'div[role="group"].error-summary[aria-label="Cannot continue because the service reported one or more errors or warnings"] li.ng-star-inserted',
        ),
      ).toContainText(partiesToContact_content.partyRequiredError),
    ]);
  },

  async tickCheckBoxes(page: Page): Promise<void> {
    const checkboxNames = [
      "cicCaseNotifyPartySubject",
      "cicCaseNotifyPartyApplicant",
      "cicCaseNotifyPartyRepresentative",
      "cicCaseNotifyPartyRespondent",
    ];

    for (const name of checkboxNames) {
      const checkboxLocator = page.locator(
        `input[type="checkbox"][name="${name}"]`,
      );

      await checkboxLocator.waitFor({ state: "visible" });
      const isPresent = await checkboxLocator.count();
      if (isPresent > 0) {
        await checkboxLocator.check();
        await checkboxLocator.isChecked();
      }
    }

    await page.click(this.continue);
  },
};
export default partiesToContactPage;
