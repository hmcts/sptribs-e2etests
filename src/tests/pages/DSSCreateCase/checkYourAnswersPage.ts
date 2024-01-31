import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import commonHelpers from "../../helpers/commonHelpers.ts";
import CheckYourAnswersContent from "../../fixtures/content/DSSCreateCase/CheckYourAnswers_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content";
import subjectContactDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectContactDetails_content";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<string>;
  pressBackButton(page: Page): Promise<void>;
};

const checkYourAnswersPage: CheckYourAnswersPage = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
          CheckYourAnswersContent.pageTitleCy,
        );
        await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
          CheckYourAnswersContent.subTitleCy1,
        );
        await expect(
          page.locator(".govuk-summary-list__key").nth(0),
        ).toHaveText(CheckYourAnswersContent.textOnPageCy1);
        await expect(
          page.locator(".govuk-summary-list__key").nth(1),
        ).toHaveText(CheckYourAnswersContent.textOnPageCy2);
        await expect(
          page.locator(".govuk-summary-list__key").nth(2),
        ).toHaveText(CheckYourAnswersContent.textOnPageCy3);
        await expect(
          page.locator(".govuk-summary-list__key").nth(3),
        ).toHaveText(CheckYourAnswersContent.textOnPageCy4);
        await expect(page.locator(".govuk-heading-m").nth(2)).toHaveText(
          CheckYourAnswersContent.subTitleCy2,
        );
        await expect(
          page.locator(".govuk-summary-list__key").nth(4),
        ).toHaveText(CheckYourAnswersContent.textOnPageCy5);
        if (representationPresent) {
          await expect(
            page.locator(".govuk-summary-list__key").nth(5),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy6);
          await expect(
            page.locator(".govuk-summary-list__key").nth(6),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy7);
          await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
            CheckYourAnswersContent.subTitleCy3,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(7),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy8);
          await expect(
            page.locator(".govuk-summary-list__key").nth(8),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy9);
          await expect(
            page.locator(".govuk-summary-list__key").nth(9),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy10);
          await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
            CheckYourAnswersContent.subTitleCy4,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(10),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy11);
          await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
            CheckYourAnswersContent.subTitleCy5,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(11),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy12);
          await expect(page.locator(".govuk-heading-m").nth(6)).toHaveText(
            CheckYourAnswersContent.subTitleCy6,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(12),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy13);
          await expect(
            page.locator(".govuk-summary-list__key").nth(13),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy14);
          await expect(
            page.locator(".govuk-summary-list__key").nth(14),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy15);
        } else {
          await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
            CheckYourAnswersContent.subTitleCy4,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(5),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy11);
          await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
            CheckYourAnswersContent.subTitleCy5,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(6),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy12);
          await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
            CheckYourAnswersContent.subTitleCy6,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(7),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy13);
          await expect(
            page.locator(".govuk-summary-list__key").nth(8),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy14);
          await expect(
            page.locator(".govuk-summary-list__key").nth(9),
          ).toHaveText(CheckYourAnswersContent.textOnPageCy15);
        }
        await expect(page.locator(".govuk-heading-l").nth(1)).toHaveText(
          CheckYourAnswersContent.subTitleCy7,
        );
        await expect(page.locator(".govuk-body-l")).toHaveText(
          CheckYourAnswersContent.textOnPageCy16,
        );
        break;
      case false:
        await expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
          CheckYourAnswersContent.pageTitle,
        );
        await expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
          CheckYourAnswersContent.subTitle1,
        );
        await expect(
          page.locator(".govuk-summary-list__key").nth(0),
        ).toHaveText(CheckYourAnswersContent.textOnPage1);
        await expect(
          page.locator(".govuk-summary-list__key").nth(1),
        ).toHaveText(CheckYourAnswersContent.textOnPage2);
        await expect(
          page.locator(".govuk-summary-list__key").nth(2),
        ).toHaveText(CheckYourAnswersContent.textOnPage3);
        await expect(
          page.locator(".govuk-summary-list__key").nth(3),
        ).toHaveText(CheckYourAnswersContent.textOnPage4);
        await expect(page.locator(".govuk-heading-m").nth(2)).toHaveText(
          CheckYourAnswersContent.subTitle2,
        );
        await expect(
          page.locator(".govuk-summary-list__key").nth(4),
        ).toHaveText(CheckYourAnswersContent.textOnPage5);
        if (representationPresent) {
          await expect(
            page.locator(".govuk-summary-list__key").nth(5),
          ).toHaveText(CheckYourAnswersContent.textOnPage6);
          await expect(
            page.locator(".govuk-summary-list__key").nth(6),
          ).toHaveText(CheckYourAnswersContent.textOnPage7);
          await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
            CheckYourAnswersContent.subTitle3,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(7),
          ).toHaveText(CheckYourAnswersContent.textOnPage8);
          await expect(
            page.locator(".govuk-summary-list__key").nth(8),
          ).toHaveText(CheckYourAnswersContent.textOnPage9);
          await expect(
            page.locator(".govuk-summary-list__key").nth(9),
          ).toHaveText(CheckYourAnswersContent.textOnPage10);
          await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
            CheckYourAnswersContent.subTitle4,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(10),
          ).toHaveText(CheckYourAnswersContent.textOnPage11);
          await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
            CheckYourAnswersContent.subTitle5,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(11),
          ).toHaveText(CheckYourAnswersContent.textOnPage12);
          await expect(page.locator(".govuk-heading-m").nth(6)).toHaveText(
            CheckYourAnswersContent.subTitle6,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(12),
          ).toHaveText(CheckYourAnswersContent.textOnPage13);
          await expect(
            page.locator(".govuk-summary-list__key").nth(13),
          ).toHaveText(CheckYourAnswersContent.textOnPage14);
          await expect(
            page.locator(".govuk-summary-list__key").nth(14),
          ).toHaveText(CheckYourAnswersContent.textOnPage15);
        } else {
          await expect(page.locator(".govuk-heading-m").nth(3)).toHaveText(
            CheckYourAnswersContent.subTitle4,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(5),
          ).toHaveText(CheckYourAnswersContent.textOnPage11);
          await expect(page.locator(".govuk-heading-m").nth(4)).toHaveText(
            CheckYourAnswersContent.subTitle5,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(6),
          ).toHaveText(CheckYourAnswersContent.textOnPage12);
          await expect(page.locator(".govuk-heading-m").nth(5)).toHaveText(
            CheckYourAnswersContent.subTitle6,
          );
          await expect(
            page.locator(".govuk-summary-list__key").nth(7),
          ).toHaveText(CheckYourAnswersContent.textOnPage13);
          await expect(
            page.locator(".govuk-summary-list__key").nth(8),
          ).toHaveText(CheckYourAnswersContent.textOnPage14);
          await expect(
            page.locator(".govuk-summary-list__key").nth(9),
          ).toHaveText(CheckYourAnswersContent.textOnPage15);
        }
        await expect(page.locator(".govuk-heading-l").nth(1)).toHaveText(
          CheckYourAnswersContent.subTitle7,
        );
        await expect(page.locator(".govuk-body-l")).toHaveText(
          CheckYourAnswersContent.textOnPage16,
        );
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void> {
    const yes = "Yes";
    const no = "No";
    const yesCy = "Ydy";
    const noCy = "Nac ydy";
    await expect(page.locator(".govuk-summary-list__value").nth(0)).toHaveText(
      subjectDetailsContent.name,
    );
    await expect(page.locator(".govuk-summary-list__value").nth(1)).toHaveText(
      await commonHelpers.convertDate(false),
    );
    await expect(page.locator(".govuk-summary-list__value").nth(2)).toHaveText(
      subjectContactDetailsContent.emailAddress,
    );
    await expect(page.locator(".govuk-summary-list__value").nth(3)).toHaveText(
      subjectContactDetailsContent.contactNumber,
    );
    if (representationPresent) {
      if (cy) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(yesCy);
        if (representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(yesCy);
        } else if (!representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(noCy);
        }
      } else {
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
      }
      await expect(
        page.locator(".govuk-summary-list__value").nth(6),
      ).toHaveText(representativeDetailsContent.fullName);
      await expect(
        page.locator(".govuk-summary-list__value").nth(7),
      ).toHaveText(representativeDetailsContent.Organisation);
      await expect(
        page.locator(".govuk-summary-list__value").nth(8),
      ).toHaveText(representativeDetailsContent.contactNumber);
      await expect(
        page.locator(".govuk-summary-list__value").nth(9),
      ).toHaveText(representativeDetailsContent.emailAddress);
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
        ).toHaveText(
          path.basename(uploadOtherInformationContent.documentRelevance),
        );
        await expect(
          page.locator(".govuk-summary-list__value").nth(14),
        ).toHaveText(
          path.basename(uploadOtherInformationContent.additionalInfo),
        );
      }
    } else {
      if (cy) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(noCy);
      } else {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(no);
      }
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
        ).toHaveText(
          path.basename(uploadOtherInformationContent.documentRelevance),
        );
        await expect(
          page.locator(".govuk-summary-list__value").nth(9),
        ).toHaveText(
          path.basename(uploadOtherInformationContent.additionalInfo),
        );
      }
    }
  },

  async continueOn(page: Page): Promise<string> {
    await page.click(this.continueButton);
    return await commonHelpers.getTimestamp();
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default checkYourAnswersPage;
