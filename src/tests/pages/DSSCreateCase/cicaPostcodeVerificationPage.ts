import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import cicaPostcodeVerificationContent from "../../fixtures/content/DSSCreateCase/cicaPostcodeVerification_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CICAPostCodeVerificationPage = {
  postcode: string;
  continueButton: string;
  rejectCookiesButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
  ): Promise<void>;
};

const cicaPostCodeVerificationPage: CICAPostCodeVerificationPage = {
  postcode: "#postcode",
  continueButton: "#main-form-submit",
  rejectCookiesButton: ".cookie-banner-reject-button",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaPostcodeVerificationContent.pageTitleCy}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaPostcodeVerificationContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${cicaPostcodeVerificationContent.hintTextCy1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaPostcodeVerificationContent.subHeadingCy1}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${cicaPostcodeVerificationContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${cicaPostcodeVerificationContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${cicaPostcodeVerificationContent.hintText1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-label:text-is("${cicaPostcodeVerificationContent.subHeading1}")`,
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

  async fillInFields(page: Page) {
    await page.waitForSelector("#postcode");
    await page.fill(this.postcode, cicaPostcodeVerificationContent.postCode);
    await page.click(this.continueButton);
  }
};

export default cicaPostCodeVerificationPage;
