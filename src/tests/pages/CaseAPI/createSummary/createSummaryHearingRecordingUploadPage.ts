import { expect, Page } from "@playwright/test";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import createSummaryHearingRecordingUploadContent from "../../../fixtures/content/CaseAPI/createSummary/createSummaryHearingRecordingUpload_content.ts";

type CreateSummaryHearingRecordingUploadPage = {
  previous: string;
  continue: string;
  cancel: string;
  remove: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const createSummaryHearingRecordingUploadPage: CreateSummaryHearingRecordingUploadPage =
  {
    previous: "button[name='Previous']",
    continue: '[type="submit"]',
    cancel: ".cancel",
    remove: "button[aria-label='Remove Upload file']",

    async checkPageLoads(
      page: Page,
      caseNumber: string,
      accessibilityTest: boolean,
    ): Promise<void> {
      await page.waitForURL(
        `**/case-details/${caseNumber.replace(/-/g, "")}/trigger/create-hearing-summary/create-hearing-summaryhearingRecordingUploadPage`,
      );
      await Promise.all([
        expect(page.locator(".govuk-caption-l")).toHaveText(
          createSummaryHearingRecordingUploadContent.pageHint,
        ),
        expect(page.locator(".govuk-heading-l")).toHaveText(
          createSummaryHearingRecordingUploadContent.pageTitle,
        ),
        expect(page.locator("markdown > h3").nth(0)).toContainText(
          caseSubjectDetailsObject_content.name,
        ),
        expect(page.locator("markdown > p").nth(0)).toContainText(
          createSummaryHearingRecordingUploadContent.caseReference + caseNumber,
        ),
        expect(page.locator("markdown > h2")).toContainText(
          createSummaryHearingRecordingUploadContent.title,
        ),
        expect(page.locator("markdown > p").nth(1)).toContainText(
          createSummaryHearingRecordingUploadContent.textOnPage1,
        ),
        ...Array.from({ length: 3 }, (_, index) => {
          const textOnPage = (
            createSummaryHearingRecordingUploadContent as any
          )[`textOnPage${index + 2}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(
              `#theHearingRecordingUpload > dt > ccd-markdown > div > markdown > ul > li > p:text-is("${textOnPage}")`,
            ),
            1,
          );
        }),
        expect(page.locator("markdown > p").nth(2)).toContainText(
          createSummaryHearingRecordingUploadContent.textOnPage5,
        ),
        expect(page.locator(".heading-h2")).toContainText(
          createSummaryHearingRecordingUploadContent.subTitle1,
        ),
        expect(page.locator("markdown > h3").nth(1)).toContainText(
          createSummaryHearingRecordingUploadContent.textOnPage10,
        ),
        expect(
          page.locator(
            "#caseEditForm > div > ccd-field-write > div > ccd-write-text-area-field > div > label > span",
          ),
        ).toHaveText(createSummaryHearingRecordingUploadContent.textOnPage11),
        page.locator(this.previous).isVisible(),
        page.locator(this.continue).isVisible(),
        page.locator(this.cancel).isVisible(),
      ]);
      await page.getByRole("button", { name: "Add new" }).click();
      await Promise.all([
        expect(page.locator("label > h3")).toHaveText(
          createSummaryHearingRecordingUploadContent.textOnPage6,
        ),
        ...Array.from({ length: 3 }, (_, index) => {
          const textOnPage = (
            createSummaryHearingRecordingUploadContent as any
          )[`textOnPage${index + 7}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.form-label:text-is("${textOnPage}")`),
            1,
          );
        }),
      ]);
      await page.click(this.remove);
      await expect(page.locator(".cdk-overlay-container")).toBeVisible();
      await page.locator("button[title='Remove']").click();

      // if (accessibilityTest) {
      //   await axeTest(page);
      // }
    },

    async fillFields(page: Page): Promise<void> {
      await page.getByRole("button", { name: "Add new" }).click();
      await page
        .locator("#recFile_0_documentCategory")
        .selectOption({ index: 1 });
      await page
        .locator("#recFile_0_documentEmailContent")
        .fill(createSummaryHearingRecordingUploadContent.description);
      await page
        .locator("#recFile_0_documentLink")
        .setInputFiles(config.testMP3File);
      await expect(page.locator(".error-message")).toHaveCount(0);
      await page
        .locator("#recDesc")
        .fill(createSummaryHearingRecordingUploadContent.recordingLocation);
    },

    async continueOn(page: Page): Promise<void> {
      await page.click(this.continue);
    },
  };

export default createSummaryHearingRecordingUploadPage;
