const { expect } = require("@playwright/test");
const commonHelpers = require("../helpers/commonHelpers.js");
const axeTest = require("../helpers/accessibilityTestHelper.js");
const path = require("path");
const config = require("../config.js");
const CheckYourAnswersPage = require("../fixtures/content/CheckYourAnswers_content");
const subjectDetailsPage = require("../fixtures/content/SubjectDetails_content");
const subjectContactDetailsPage = require("../fixtures/content/SubjectContactDetails_content");
const representativeDetailsPage = require("../fixtures/content/RepresentativeDetails_content");
const UploadOtherInfoPage = require("../fixtures/content/UploadOtherInformation_content");

module.exports = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page, representationPresent, accessibilityTest) {
    await expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
      CheckYourAnswersPage.pageTitle,
    );
    await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
      CheckYourAnswersPage.subTitle1,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(0)).toHaveText(
      CheckYourAnswersPage.textOnPage1,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(1)).toHaveText(
      CheckYourAnswersPage.textOnPage2,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(2)).toHaveText(
      CheckYourAnswersPage.textOnPage3,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(3)).toHaveText(
      CheckYourAnswersPage.textOnPage4,
    );
    await expect(page.locator(".govuk-heading-m").nth(2)).toHaveText(
      CheckYourAnswersPage.subTitle2,
    );
    await expect(page.locator(".govuk-summary-list__key").nth(4)).toHaveText(
      CheckYourAnswersPage.textOnPage5,
    );
    if (representationPresent) {
      await expect(page.locator(".govuk-summary-list__key").nth(5)).toHaveText(
        CheckYourAnswersPage.textOnPage6,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(6)).toHaveText(
        CheckYourAnswersPage.textOnPage7,
      );
      await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
        CheckYourAnswersPage.subTitle3,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(7)).toHaveText(
        CheckYourAnswersPage.textOnPage8,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(8)).toHaveText(
        CheckYourAnswersPage.textOnPage9,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(9)).toHaveText(
        CheckYourAnswersPage.textOnPage10,
      );
      await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
        CheckYourAnswersPage.subTitle4,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(10)).toHaveText(
        CheckYourAnswersPage.textOnPage11,
      );
      await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
        CheckYourAnswersPage.subTitle5,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(11)).toHaveText(
        CheckYourAnswersPage.textOnPage12,
      );
      await expect(page.locator(".govuk-heading-m").nth(6)).toHaveText(
        CheckYourAnswersPage.subTitle6,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(12)).toHaveText(
        CheckYourAnswersPage.textOnPage13,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(13)).toHaveText(
        CheckYourAnswersPage.textOnPage14,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(14)).toHaveText(
        CheckYourAnswersPage.textOnPage15,
      );
    } else {
      await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
        CheckYourAnswersPage.subTitle4,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(5)).toHaveText(
        CheckYourAnswersPage.textOnPage11,
      );
      await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
        CheckYourAnswersPage.subTitle5,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(6)).toHaveText(
        CheckYourAnswersPage.textOnPage12,
      );
      await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
        CheckYourAnswersPage.subTitle6,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(7)).toHaveText(
        CheckYourAnswersPage.textOnPage13,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(8)).toHaveText(
        CheckYourAnswersPage.textOnPage14,
      );
      await expect(page.locator(".govuk-summary-list__key").nth(9)).toHaveText(
        CheckYourAnswersPage.textOnPage15,
      );
    }
    await expect(page.locator(".govuk-heading-l").nth(1)).toHaveText(
      CheckYourAnswersPage.subTitle7,
    );
    await expect(page.locator(".govuk-body-l")).toHaveText(
      CheckYourAnswersPage.textOnPage16,
    );
    if (accessibilityTest) {
      await axeTest.axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
  ) {
    const yes = "Yes";
    const no = "No";
    await expect(page.locator(".govuk-summary-list__value").nth(0)).toHaveText(
      subjectDetailsPage.name,
    );
    await expect(page.locator(".govuk-summary-list__value").nth(1)).toHaveText(
      commonHelpers.convertDate(),
    );
    await expect(page.locator(".govuk-summary-list__value").nth(2)).toHaveText(
      subjectContactDetailsPage.emailAddress,
    );
    await expect(page.locator(".govuk-summary-list__value").nth(3)).toHaveText(
      subjectContactDetailsPage.contactNumber,
    );
    if (representationPresent) {
      await expect(
        page.locator(".govuk-summary-list__value").nth(4),
      ).toHaveText(yes);
      if (representationQualified) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(5),
        ).toHaveText(yes);
      } else if (!representationQualified) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(5),
        ).toHaveText(no);
      }
      await expect(
        page.locator(".govuk-summary-list__value").nth(6),
      ).toHaveText(representativeDetailsPage.fullName);
      await expect(
        page.locator(".govuk-summary-list__value").nth(7),
      ).toHaveText(representativeDetailsPage.Organisation);
      await expect(
        page.locator(".govuk-summary-list__value").nth(8),
      ).toHaveText(representativeDetailsPage.contactNumber);
      await expect(
        page.locator(".govuk-summary-list__value").nth(9),
      ).toHaveText(representativeDetailsPage.emailAddress);
      await expect(
        page.locator(".govuk-summary-list__value").nth(10),
      ).toHaveText(path.basename(config.testPdfFile));
      await expect(
        page.locator(".govuk-summary-list__value").nth(11),
      ).toHaveText(path.basename(config.testFile));
      if (uploadOtherInfo) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(12),
        ).toHaveText(path.basename(config.testWordFile));
        await expect(
          page.locator(".govuk-summary-list__value").nth(13),
        ).toHaveText(path.basename(UploadOtherInfoPage.documentRelevance));
        await expect(
          page.locator(".govuk-summary-list__value").nth(14),
        ).toHaveText(path.basename(UploadOtherInfoPage.additionalInfo));
      }
    } else {
      await expect(
        page.locator(".govuk-summary-list__value").nth(4),
      ).toHaveText(no);
      await expect(
        page.locator(".govuk-summary-list__value").nth(5),
      ).toHaveText(path.basename(config.testPdfFile));
      await expect(
        page.locator(".govuk-summary-list__value").nth(6),
      ).toHaveText(path.basename(config.testFile));
      if (uploadOtherInfo) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(7),
        ).toHaveText(path.basename(config.testWordFile));
        await expect(
          page.locator(".govuk-summary-list__value").nth(8),
        ).toHaveText(path.basename(UploadOtherInfoPage.documentRelevance));
        await expect(
          page.locator(".govuk-summary-list__value").nth(9),
        ).toHaveText(path.basename(UploadOtherInfoPage.additionalInfo));
      }
    }
  },

  async continueOn(page) {
    await page.click(this.continueButton);
    return commonHelpers.getTimestamp();
  },

  async pressBackButton(page) {
    await page.click(this.backButton);
  },
};
