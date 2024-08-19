import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers, {
  CaseNoticeType,
} from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { Template } from "../issueFinalDecision/selectTemplatePage.ts";
import editDraftPreviewTemplateContent from "../../../fixtures/content/CaseAPI/editDraft/editDraftPreviewTemplate_content.ts";

type EditDraftPreviewTemplatePage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
    template: Template,
    caseNumber: string,
    caseNoticeType: CaseNoticeType,
  ): Promise<void>;
};

const editDraftPreviewTemplatePage: EditDraftPreviewTemplatePage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${editDraftPreviewTemplateContent.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        editDraftPreviewTemplateContent.pageHint,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        editDraftPreviewTemplateContent.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.case-field__label:text-is("${editDraftPreviewTemplateContent.textOnPage1}")`,
        ),
        1,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (editDraftPreviewTemplateContent as any)[
          `textOnPage${index + 2}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`p:text-is("${textOnPage}")`),
          1,
        );
      }),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    template: Template,
    caseNumber: string,
    caseNoticeType: CaseNoticeType,
  ): Promise<void> {
    await commonHelpers.checkDocument(
      page,
      template,
      caseNumber,
      caseNoticeType,
      true,
    );
    await page.click(this.continue);
  },
};

export default editDraftPreviewTemplatePage;
