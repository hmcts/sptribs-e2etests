import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import partiesToContact_content from "../../../fixtures/content/CaseAPI/contactParties/partiesToContact_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";

type PartiesToContactPage = {
  continue: string;
  message: string;
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

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${partiesToContact_content.pageHint}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-heading-l:text-is("${partiesToContact_content.pageTitle}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3").nth(0)).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        partiesToContact_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `xpath=//markdown//p[text()="${partiesToContact_content.textOnPage}"]`,
        ),
        1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        return expect(
          page
            .locator(`text="${partiesToContact_content.textOnPage5}"`)
            .nth(index),
        ).toBeVisible();
      }),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (partiesToContact_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.form-label:text-is("${partiesToContact_content.textOnPage6}")`,
        ),
        1,
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
      // expect(
      //   page.locator(".heading-h3.error-summary-heading.ng-star-inserted"),
      // ).toContainText(partiesToContact_content.errorBanner2),
      // commonHelpers.checkVisibleAndPresent(
      //   page.locator(`.heading-h3.error-summary-heading.ng-star-inserted:text-is("${partiesToContact_content.errorBanner2}")`),
      //   1,
      //   ),
      // expect(
      //   page.locator("error-summary-list.ng-star-inserted"),
      // ).toContainText(partiesToContact_content.partyRequiredError),
    ]);
  },

  async tickCheckBoxes(page: Page): Promise<void> {
    const checkboxNames = [
      "cicCaseNotifyPartySubject",
      "cicCaseNotifyPartyApplicant",
      "cicCaseNotifyPartyRepresentative",
      "cicCaseNotifyPartyRespondent",
    ];
    await Promise.all(
      Array.from({ length: checkboxNames.length }, (_, index: number) => {
        const name = checkboxNames[index];
        const checkboxLocator = page.locator(
          `input[type="checkbox"][name="${name}"]`,
        );

        return checkboxLocator.waitFor({ state: "visible" }).then(async () => {
          const isPresent = await checkboxLocator.count();
          if (isPresent > 0) {
            await checkboxLocator.check();
            await checkboxLocator.isChecked();
          }
        });
      }),
    );
    await page.click(this.continue);
  },
};
export default partiesToContactPage;
