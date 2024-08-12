import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { Template } from "../issueFinalDecision/selectTemplatePage.ts";
import orderMainContent_content from "../../../fixtures/content/CaseAPI/createDraft/orderMainContent_content.ts";

type OrderMainContentPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    template: Template,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const orderMainContentPage: OrderMainContentPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    template: Template,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${orderMainContent_content.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        orderMainContent_content.pageHint,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h3:text-is("${caseSubjectDetailsObject_content.name}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        orderMainContent_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown:has-text("${orderMainContent_content.textOnPage1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:has-text("${orderMainContent_content.textOnPage2}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown:has-text("${orderMainContent_content.textOnPage3}")`,
        ),
        1,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const subTitle = (orderMainContent_content as any)[
          `subTitle${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`h3:text-is("${subTitle}")`),
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
    let textBoxValue = "";
    textBoxValue = await page.locator(`textarea`).inputValue();
    switch (template) {
      default:
        await expect(page.locator(`textarea`)).toBeEmpty();
        break;
      case "CIC3 - Rule 27":
        expect(textBoxValue).toEqual(`${orderMainContent_content.rule27}`);
        break;
      case "CIC7 - ME Dmi Reports":
        expect(textBoxValue).toEqual(`${orderMainContent_content.dmiReports}`);
        break;
      case "CIC8 - ME Joint Instruction":
        expect(textBoxValue).toEqual(`${orderMainContent_content.joint}`);
        break;
      case "CIC10 - Strike Out Warning":
        expect(textBoxValue).toEqual(
          `${orderMainContent_content.strikeoutWarn}`,
        );
        break;
      case "CIC13 - Pro Forma Summons":
        expect(textBoxValue).toEqual(`${orderMainContent_content.proForma}`);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.fill(`textarea`, orderMainContent_content.description);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.click(this.continue);
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-message:has-text("${orderMainContent_content.errorNoEntryDescription}")`,
      ),
      1,
    );
    await this.fillInFields(page);
  },
};

export default orderMainContentPage;
