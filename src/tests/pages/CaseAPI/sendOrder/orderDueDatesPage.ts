import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import orderDueDates_content from "../../../fixtures/content/CaseAPI/sendOrder/orderDueDates_content.ts";

type OrderDueDatesPage = {
  previous: string;
  continue: string;
  cancel: string;
  addNew: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, completed: boolean): Promise<void>;
};

const orderDueDatesPage: OrderDueDatesPage = {
  previous: ".button-secondary",
  continue: '[type="submit"]',
  cancel: ".cancel",
  addNew: ".write-collection-add-item__top",

  async checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(this.addNew);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.govuk-caption-l:text-is("${orderDueDates_content.pageHint}")`,
        ),
        1,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").nth(0)).toContainText(
        orderDueDates_content.caseReference + caseNumber,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h2:text-is("${orderDueDates_content.subTitle1}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`h3:text-is("${orderDueDates_content.subTitle2}")`),
        1,
      ),
      ...Array.from({ length: 6 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (orderDueDates_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
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

  async fillInFields(page: Page, completed: boolean): Promise<void> {
    await page.fill(`#dueDate-day`, orderDueDates_content.day);
    await page.fill(`#dueDate-month`, orderDueDates_content.month);
    await page.fill(`#dueDate-year`, orderDueDates_content.year);
    await page.fill(
      `#cicCaseOrderDueDates_0_information`,
      orderDueDates_content.information,
    );
    if (completed) {
      await page.click(`cicCaseOrderDueDates_0_orderMarkAsCompleted`);
    }
    await page.click(this.continue);
  },
};

export default orderDueDatesPage;
