import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import decisionMain_content from "../../../fixtures/content/CaseAPI/issueDecision/decisionMain_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import { Template } from "./selectTemplatePage.ts";

type DecisionMainPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    template: Template,
    subjectName: string,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const decisionMainPage: DecisionMainPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    template: Template,
    subjectName: string,
  ): Promise<void> {
    await page.waitForSelector(
      `.govuk-heading-l:text-is("${decisionMain_content.pageTitle}")`,
    );
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        decisionMain_content.pageHint,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `markdown > h3:text-is("${subjectName}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        decisionMain_content.caseReference + caseNumber,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (decisionMain_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown:has-text("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 3 }, (_, index) => {
        const subTitle = (decisionMain_content as any)[
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
    switch (template) {
      default:
        await expect(page.locator(`textarea`)).toBeEmpty();
        break;
      case "CIC1 - Eligibility":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(
          `${decisionMain_content.eligibility}`,
        );
        break;
      case "CIC2 - Quantum":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(`${decisionMain_content.quantum}`);
        break;
      case "CIC3 - Rule 27":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(`${decisionMain_content.rule27}`);
        break;
      case "CIC7 - ME Dmi Reports":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(`${decisionMain_content.dmiReports}`);
        break;
      case "CIC8 - ME Joint Instructions":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(`${decisionMain_content.joint}`);
        break;
      case "CIC10 - Strike Out Warning":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(
          `${decisionMain_content.strikeoutWarn}`,
        );
        break;
      case "CIC11 - Strike Out Decision Notice":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(
          `${decisionMain_content.strikeoutNotice}`,
        );
        break;
      case "CIC13 - Pro Forma Summons":
        textBoxValue = await page.locator(`textarea`).inputValue();
        expect(textBoxValue).toEqual(`${decisionMain_content.proForma}`);
        break;
    }
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit();
    // }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.fill(`textarea`, decisionMain_content.description);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.click(this.continue);
    await commonHelpers.checkVisibleAndPresent(
      page.locator(
        `.error-message:has-text("${decisionMain_content.errorNoEntryDescription}")`,
      ),
      1,
    );
    await this.fillInFields(page);
  },
};

export default decisionMainPage;
