import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import cicaLookupContent from "../../fixtures/content/DSSCreateCase/cicaLookup_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CICALookupPage = {
  fields: {
    ccdReference: string;
  };
  continueButton: string;
  rejectCookiesButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, ccdReference: string): Promise<void>;
};

const cicaLookupPage: CICALookupPage = {
  fields: {
    ccdReference: "#ccdReference",
  },
  continueButton: "#main-form-submit",
  rejectCookiesButton: ".cookie-banner-reject-button",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaLookupContent.pageTitleCy}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaLookupContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${cicaLookupContent.hintTextCy1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${cicaLookupContent.hintTextCy2}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaLookupContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaLookupContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaLookupContent.subHeading1}")`,
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

  async fillInFields(page: Page, ccdReference: string) {
    await page.waitForSelector("#ccdReference");
    await page.fill(this.fields.ccdReference, `${ccdReference}`);
    await page.click(this.continueButton);
  },
};

export default cicaLookupPage;
