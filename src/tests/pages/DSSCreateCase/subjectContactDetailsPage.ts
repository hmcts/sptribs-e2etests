import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import subjectContactDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectContactDetails_content";
import commonHelpers from "../../helpers/commonHelpers.ts";

type SubjectContactDetailsPage = {
  fields: {
    email: string;
    mobileNumber: string;
  };
  contactAgreeBox: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const subjectContactDetailsPage: SubjectContactDetailsPage = {
  fields: {
    email: "#subjectEmailAddress",
    mobileNumber: "#subjectContactNumber",
  },

  contactAgreeBox: "#subjectAgreeContact",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${subjectContactDetailsContent.pageTitleCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `main[id='main-content'] p[class='govuk-body']:text-is("${subjectContactDetailsContent.textOnPageCy1}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectContactDetailsContent as any)[
              `subHeadingCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `label[for='subjectAgreeContact']:text-is("${subjectContactDetailsContent.textOnPageCy2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${subjectContactDetailsContent.emailHintCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${subjectContactDetailsContent.numberHintCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${subjectContactDetailsContent.pageTitle}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `main[id='main-content'] p[class='govuk-body']:text-is("${subjectContactDetailsContent.textOnPage1}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (subjectContactDetailsContent as any)[
              `subHeading${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `label[for='subjectAgreeContact']:text-is("${subjectContactDetailsContent.textOnPage2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${subjectContactDetailsContent.emailHint}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${subjectContactDetailsContent.numberHint}")`,
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
    await page.fill(
      this.fields.email,
      subjectContactDetailsContent.emailAddress,
    );
    await page.fill(
      this.fields.mobileNumber,
      subjectContactDetailsContent.contactNumber,
    );
    await page.click(this.contactAgreeBox);
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    await page.click(this.continueButton);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectContactDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectEmailAddress']:text-is("${subjectContactDetailsContent.emailErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectContactNumber']:text-is("${subjectContactDetailsContent.contactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectAgreeContact']:text-is("${subjectContactDetailsContent.agreeErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectEmailAddress-error:text-is("${subjectContactDetailsContent.emailErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectContactNumber-error:text-is("${subjectContactDetailsContent.contactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectAgreeContact-error:text-is("${subjectContactDetailsContent.agreeErrorCy}")`,
            ),
            1,
          ),
        ]);
        await page.fill(
          this.fields.email,
          subjectContactDetailsContent.partEmailEntry,
        );
        await page.fill(
          this.fields.mobileNumber,
          subjectContactDetailsContent.partContactNumberEntry,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectContactDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectEmailAddress']:text-is("${subjectContactDetailsContent.validEmailErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectContactNumber']:text-is("${subjectContactDetailsContent.validContactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectEmailAddress-error:text-is("${subjectContactDetailsContent.validEmailErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectContactNumber-error:text-is("${subjectContactDetailsContent.validContactNumberErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectContactDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectEmailAddress']:text-is("${subjectContactDetailsContent.emailError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectContactNumber']:text-is("${subjectContactDetailsContent.contactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectAgreeContact']:text-is("${subjectContactDetailsContent.agreeError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectEmailAddress-error:text-is("${subjectContactDetailsContent.emailError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectContactNumber-error:text-is("${subjectContactDetailsContent.contactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectAgreeContact-error:text-is("${subjectContactDetailsContent.agreeError}")`,
            ),
            1,
          ),
        ]);
        await page.fill(
          this.fields.email,
          subjectContactDetailsContent.partEmailEntry,
        );
        await page.fill(
          this.fields.mobileNumber,
          subjectContactDetailsContent.partContactNumberEntry,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${subjectContactDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectEmailAddress']:text-is("${subjectContactDetailsContent.validEmailError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#subjectContactNumber']:text-is("${subjectContactDetailsContent.validContactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectEmailAddress-error:text-is("${subjectContactDetailsContent.validEmailError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#subjectContactNumber-error:text-is("${subjectContactDetailsContent.validContactNumberError}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};

export default subjectContactDetailsPage;
