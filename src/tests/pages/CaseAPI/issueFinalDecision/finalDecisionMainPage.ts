import { expect, Page } from "@playwright/test";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { DecisionTemplate } from "./selectTemplatePage.ts";
import finalDecisionMain_content from "../../../fixtures/content/CaseAPI/issueFinalDecision/finalDecisionMain_content.ts";

type FinalDecisionMainPage = {
  previous: string;
  continue: string;
  cancel: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    decisionTemplate: DecisionTemplate,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  triggerErrorMessages(page: Page): Promise<void>;
};

const finalDecisionMainPage: FinalDecisionMainPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
    decisionTemplate: DecisionTemplate,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        finalDecisionMain_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        finalDecisionMain_content.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        finalDecisionMain_content.caseReference + caseNumber,
      ),
      ...Array.from({ length: 3 }, (_, index) => {
        const textOnPage = (finalDecisionMain_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`markdown:has-text("${textOnPage}")`),
          1,
        );
      }),
      ...Array.from({ length: 3 }, (_, index) => {
        const subTitle = (finalDecisionMain_content as any)[
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
    switch (decisionTemplate) {
      default:
        await expect(page.locator(`textarea`)).toBeEmpty();
        break;
      case "CIC1 - Eligibility":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.eligibility}`,
        );
        break;
      case "CIC2 - Quantum":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.quantum}`,
        );
        break;
      case "CIC3 - Rule 27":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.rule27}`,
        );
        break;
      case "CIC7 - ME Dmi Reports":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.dmiReports}`,
        );
        break;
      case "CIC8 - ME Joint Instructions":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.joint}`,
        );
        break;
      case "CIC10 - Strike Out Warning":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.strikeoutWarn}`,
        );
        break;
      case "CIC11 - Strike Out Decision Notice":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.strikeoutNotice}`,
        );
        break;
      case "CIC13 - Pro Forma Summons":
        await expect(page.locator(`textarea`)).toContainText(
          `${finalDecisionMain_content.proForma}`,
        );
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.fill(`textarea`, finalDecisionMain_content.description);
    await page.click(this.continue);
  },

  async triggerErrorMessages(page: Page): Promise<void> {
    await page.fill(`textarea`, ``);
    await expect(page.locator(`textarea`)).toBeEmpty();
    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${finalDecisionMain_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${finalDecisionMain_content.errorNoEntryDescription}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${finalDecisionMain_content.errorNoEntryDescription}")`,
        ),
        1,
      ),
    ]);
    await this.fillInFields(page);
  },
};

export default finalDecisionMainPage;
