import { Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import commonHelpers from "../../helpers/commonHelpers.ts";
import CheckYourAnswersContent from "../../fixtures/content/DSSCreateCase/CheckYourAnswers_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content";
import subjectContactDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectContactDetails_content";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import uploadOtherInformation_content from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    subjectName: string,
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
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${CheckYourAnswersContent.pageTitleCy}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitleCy${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-heading-m:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitleCy${index + 4}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-heading-m:text-is("${textOnPage}")`),
              1,
            );
          }),
          // Subject details heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy2}")`,
            ),
            1,
          ),
          // Representation heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy5}")`,
            ),
            1,
          ),
          // Appeal forms heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy11}")`,
            ),
            1,
          ),
          // Supporting documents heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy12}")`,
            ),
            1,
          ),
          // Additional information heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy13}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body-l:text-is("${CheckYourAnswersContent.textOnPageCy16}")`,
            ),
            1,
          ),
        ]);
        if (representationPresent) {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy4}")`,
              ),
              2,
            ),
            // Representation heading
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy6}")`,
              ),
              1,
            ),
            // Representative details heading
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-heading-m:text-is("${CheckYourAnswersContent.subTitleCy3}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy1}")`,
              ),
              2,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy8}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy3}")`,
              ),
              2,
            ),
          ]);
        } else {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy4}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy1}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy3}")`,
              ),
              1,
            ),
          ]);
        }
        if (uploadOtherInfo) {
          if (multipleDocuments) {
            await Promise.all([
              ...Array.from({ length: 2 }, (_, index) => {
                const textOnPage = (CheckYourAnswersContent as any)[
                  `textOnPageCy${index + 14}`
                ];
                return commonHelpers.checkVisibleAndPresent(
                  page.locator(
                    `.govuk-summary-list__key:text-is("${textOnPage}")`,
                  ),
                  4,
                );
              }),
            ]);
          } else {
            await Promise.all([
              ...Array.from({ length: 2 }, (_, index) => {
                const textOnPage = (CheckYourAnswersContent as any)[
                  `textOnPageCy${index + 14}`
                ];
                return commonHelpers.checkVisibleAndPresent(
                  page.locator(
                    `.govuk-summary-list__key:text-is("${textOnPage}")`,
                  ),
                  1,
                );
              }),
            ]);
          }
        }
        break;
      default:
        await page.waitForSelector(
          `.govuk-heading-l:text-is("${CheckYourAnswersContent.pageTitle}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-l:text-is("${CheckYourAnswersContent.pageTitle}")`,
            ),
            1,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitle${index + 1}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-heading-m:text-is("${textOnPage}")`),
              1,
            );
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitle${index + 4}`
            ];
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`.govuk-heading-m:text-is("${textOnPage}")`),
              1,
            );
          }),
          // Subject details heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage2}")`,
            ),
            1,
          ),
          // Representation heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage5}")`,
            ),
            1,
          ),
          // Appeal forms heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage11}")`,
            ),
            1,
          ),
          // Supporting documents heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage12}")`,
            ),
            1,
          ),
          // Additional information heading
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage13}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-body-l:text-is("${CheckYourAnswersContent.textOnPage16}")`,
            ),
            1,
          ),
        ]);
        if (representationPresent) {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage4}")`,
              ),
              2,
            ),
            // Representation heading
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage6}")`,
              ),
              1,
            ),
            // Representative details heading
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-heading-m:text-is("${CheckYourAnswersContent.subTitle3}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
              ),
              2,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage8}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
              ),
              2,
            ),
          ]);
        } else {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage4}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
              ),
              1,
            ),
          ]);
        }
        if (uploadOtherInfo) {
          if (multipleDocuments) {
            await Promise.all([
              ...Array.from({ length: 2 }, (_, index) => {
                const textOnPage = (CheckYourAnswersContent as any)[
                  `textOnPage${index + 14}`
                ];
                return commonHelpers.checkVisibleAndPresent(
                  page.locator(
                    `.govuk-summary-list__key:text-is("${textOnPage}")`,
                  ),
                  4,
                );
              }),
            ]);
          } else {
            await Promise.all([
              ...Array.from({ length: 2 }, (_, index) => {
                const textOnPage = (CheckYourAnswersContent as any)[
                  `textOnPage${index + 14}`
                ];
                return commonHelpers.checkVisibleAndPresent(
                  page.locator(
                    `.govuk-summary-list__key:text-is("${textOnPage}")`,
                  ),
                  1,
                );
              }),
            ]);
          }
        }
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
    multipleDocuments: boolean,
    subjectName: string,
  ): Promise<void> {
    const yes = "Yes";
    const no = "No";
    const yesCy = "Ydy";
    const noCy = "Nac ydy";

    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.govuk-summary-list__value:text-is("${subjectName}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-summary-list__value:text-is("${await commonHelpers.convertDate(false)}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-summary-list__value:text-is("${subjectContactDetailsContent.emailAddress}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-summary-list__value:text-is("${subjectContactDetailsContent.contactNumber}")`,
        ),
        1,
      ),
    ]);
    if (representationPresent) {
      if (cy) {
        if (representationQualified) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${yesCy}")`),
            2,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${yesCy}")`),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${noCy}")`),
            1,
          );
        }
      } else {
        if (representationQualified) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${yes}")`),
            2,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${yes}")`),
            1,
          );
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-summary-list__value:text-is("${no}")`),
            1,
          );
        }
      }
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${representativeDetailsContent.fullName}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${representativeDetailsContent.Organisation}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${representativeDetailsContent.contactNumber}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${representativeDetailsContent.emailAddress}")`,
          ),
          1,
        ),
      ]);
    } else {
      if (cy) {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-summary-list__value:text-is("${noCy}")`),
          1,
        );
      } else {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.govuk-summary-list__value:text-is("${no}")`),
          1,
        );
      }
    }
    if (multipleDocuments) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)}")`,
          ),
          1,
        ),
      ]);
      if (uploadOtherInfo) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadOtherInformation_content.additionalInfo}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
            ),
            4,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadOtherInformationContent.documentRelevance}")`,
            ),
            4,
          ),
        ]);
      }
    } else {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.govuk-summary-list__value:text-is("${path.basename(config.testFile)}")`,
          ),
          1,
        ),
      ]);
      if (uploadOtherInfo) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadOtherInformation_content.additionalInfo}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadOtherInformationContent.documentRelevance}")`,
            ),
            1,
          ),
        ]);
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
