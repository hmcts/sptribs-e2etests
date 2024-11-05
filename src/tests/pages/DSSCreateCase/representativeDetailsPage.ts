import { Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type RepresentativeDetailsPage = {
  fields: {
    fullName: string;
    representativeOrgName: string;
    representativeContactNumber: string;
    representativeEmailAddress: string;
  };
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

const representativeDetailsPage: RepresentativeDetailsPage = {
  fields: {
    fullName: "#representativeFullName",
    representativeOrgName: "#representativeOrganisationName",
    representativeContactNumber: "#representativeContactNumber",
    representativeEmailAddress: "#representativeEmailAddress",
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${representativeDetailsContent.pageTitleCy}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${representativeDetailsContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `subHeadingCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representativeDetailsContent.numberHintCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representativeDetailsContent.emailHintCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${representativeDetailsContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${representativeDetailsContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `textOnPage${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-body:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (representativeDetailsContent as any)[
              `subHeading${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-label:text-is("${textOnPage}")`),
              1,
            );
          }),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representativeDetailsContent.numberHint}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-hint:text-is("${representativeDetailsContent.emailHint}")`,
            ),
            1,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(
      this.fields.fullName,
      representativeDetailsContent.fullName,
    );
    await page.fill(
      this.fields.representativeOrgName,
      representativeDetailsContent.Organisation,
    );
    await page.fill(
      this.fields.representativeContactNumber,
      representativeDetailsContent.contactNumber,
    );
    await page.fill(
      this.fields.representativeEmailAddress,
      representativeDetailsContent.emailAddress,
    );
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    await page.click(this.continueButton);
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representativeDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeFullName']:text-is("${representativeDetailsContent.fullNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeOrganisationName']:text-is("${representativeDetailsContent.organisationNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeContactNumber']:text-is("${representativeDetailsContent.contactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeEmailAddress']:text-is("${representativeDetailsContent.emailErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeFullName-error:text-is("${representativeDetailsContent.fullNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeOrganisationName-error:text-is("${representativeDetailsContent.organisationNameErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeContactNumber-error:text-is("${representativeDetailsContent.contactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeEmailAddress-error:text-is("${representativeDetailsContent.emailErrorCy}")`,
            ),
            1,
          ),
        ]);
        // await page.fill(
        //   this.fields.fullName,
        //   representativeDetailsContent.html,
        // );
        // await page.fill(
        //   this.fields.representativeOrgName,
        //   representativeDetailsContent.html,
        // );
        await page.fill(
          this.fields.representativeEmailAddress,
          representativeDetailsContent.partEmailEntry,
        );
        await page.fill(
          this.fields.representativeContactNumber,
          representativeDetailsContent.partContactNumberEntry,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representativeDetailsContent.errorBannerCy}")`,
            ),
            1,
          ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `[href='#representativeFullName']:text-is("${representativeDetailsContent.fullNameHTMLErrorCy}")`,
          //   ),
          //   1,
          // ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `[href='#representativeOrganisationName']:text-is("${representativeDetailsContent.organisationHTMLErrorCy}")`,
          //   ),
          //   1,
          // ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeContactNumber']:text-is("${representativeDetailsContent.validContactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeEmailAddress']:text-is("${representativeDetailsContent.validEmailErrorCy}")`,
            ),
            1,
          ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `#representativeFullName-error:text-is("${representativeDetailsContent.fullNameHTMLErrorCy}")`,
          //   ),
          //   1,
          // ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `#representativeOrganisationName-error:text-is("${representativeDetailsContent.organisationHTMLErrorCy}")`,
          //   ),
          //   1,
          // ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeContactNumber-error:text-is("${representativeDetailsContent.validContactNumberErrorCy}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeEmailAddress-error:text-is("${representativeDetailsContent.validEmailErrorCy}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representativeDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeFullName']:text-is("${representativeDetailsContent.fullNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeOrganisationName']:text-is("${representativeDetailsContent.organisationNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeContactNumber']:text-is("${representativeDetailsContent.contactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeEmailAddress']:text-is("${representativeDetailsContent.emailError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeFullName-error:text-is("${representativeDetailsContent.fullNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeOrganisationName-error:text-is("${representativeDetailsContent.organisationNameError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeContactNumber-error:text-is("${representativeDetailsContent.contactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeEmailAddress-error:text-is("${representativeDetailsContent.emailError}")`,
            ),
            1,
          ),
        ]);
        // await page.fill(
        //   this.fields.fullName,
        //   representativeDetailsContent.html,
        // );
        // await page.fill(
        //   this.fields.representativeOrgName,
        //   representativeDetailsContent.html,
        // );
        await page.fill(
          this.fields.representativeEmailAddress,
          representativeDetailsContent.partEmailEntry,
        );
        await page.fill(
          this.fields.representativeContactNumber,
          representativeDetailsContent.partContactNumberEntry,
        );
        await page.click(this.continueButton);
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-error-summary__title:text-is("${representativeDetailsContent.errorBanner}")`,
            ),
            1,
          ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `[href='#representativeFullName']:text-is("${representativeDetailsContent.fullNameHTMLError}")`,
          //   ),
          //   1,
          // ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `[href='#representativeOrganisationName']:text-is("${representativeDetailsContent.organisationHTMLError}")`,
          //   ),
          //   1,
          // ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeContactNumber']:text-is("${representativeDetailsContent.validContactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `[href='#representativeEmailAddress']:text-is("${representativeDetailsContent.validEmailError}")`,
            ),
            1,
          ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `#representativeFullName-error:text-is("${representativeDetailsContent.fullNameHTMLError}")`,
          //   ),
          //   1,
          // ),
          // commonHelpers.checkVisibleAndPresent(
          //   page.locator(
          //     `#representativeOrganisationName-error:text-is("${representativeDetailsContent.organisationHTMLError}")`,
          //   ),
          //   1,
          // ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeContactNumber-error:text-is("${representativeDetailsContent.validContactNumberError}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#representativeEmailAddress-error:text-is("${representativeDetailsContent.validEmailError}")`,
            ),
            1,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default representativeDetailsPage;
