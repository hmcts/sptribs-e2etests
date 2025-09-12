import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import cicaReferenceContent from "../../fixtures/content/DSSCreateCase/cicaReference_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CICAReferencePage = {
  fields: {
    cicaReferenceNumber: string;
  };
  continueButton: string;
  rejectCookiesButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, subjectName: string): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
};

const cicaReferencePage: CICAReferencePage = {
  fields: {
    cicaReferenceNumber: "#cicaReferenceNumber",
  },
  continueButton: "#main-form-submit",
  rejectCookiesButton: ".cookie-banner-reject-button",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaReferenceContent.pageTitle}")`,
        );
        await page.locator(".govuk-link.language").click();
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaReferenceContent.pageTitleCy}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaReferenceContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaReferenceContent.hintTextCy1}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaReferenceContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaReferenceContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaReferenceContent.subHeading1}")`,
            ),
            1,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async fillInFields(page: Page, cicaReferenceNumber: string) {
    await page.waitForSelector("#cicaReferenceNumber");
    await page.fill(this.fields.cicaReferenceNumber, `${cicaReferenceNumber}`);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    const currentDate = new Date();
    switch (cy) {
      case true:
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-link.language:text-is("English")`),
          1,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${cicaReferenceContent.errorBannerCy}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },
};

export default cicaReferencePage;
