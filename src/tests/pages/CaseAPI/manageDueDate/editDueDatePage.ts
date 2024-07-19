import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import editDueDate_content from "../../../fixtures/content/CaseAPI/manageDueDate/editDueDate_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import orderDueDates_content from "../../../fixtures/content/CaseAPI/sendOrder/orderDueDates_content.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";

type EditDueDatePage = {
  previous: string;
  continue: string;
  cancel: string;
  addNew: string;
  remove: string;
  dayField: string;
  monthField: string;
  yearField: string;
  informationField: string;
  checkPageLoads(
    page: Page,
    caseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(
    page: Page,
    completed: boolean,
    completedCheckboxChecked: boolean,
  ): Promise<void>;
  checkFields(page: Page, completed: boolean): Promise<void>;
  triggerErrorMessages(
    page: Page,
    completed: boolean,
    completedCheckboxChecked: boolean,
  ): Promise<void>;
};

const editDueDatePage: EditDueDatePage = {
  previous: `.button-secondary:text-is("Previous")`,
  continue: '[type="submit"]',
  cancel: ".cancel",
  addNew: ".write-collection-add-item__top",
  remove: `.button:text-is("Remove")`,
  dayField: "#dueDate-day",
  monthField: "#dueDate-month",
  yearField: "#dueDate-year",
  informationField: "#cicCaseOrderDueDates_0_information",

  async checkPageLoads(page, caseNumber, accessibilityTest): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        `${editDueDate_content.pageHint}`,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        caseSubjectDetailsObject_content.name,
      ),
      expect(page.locator("markdown > p").first()).toContainText(
        editDueDate_content.caseReference + caseNumber,
      ),
      expect(
        page.locator(`h2:text-is("${editDueDate_content.subTitle1}")`),
      ).toBeVisible(),
      expect(page.locator(this.addNew)).toBeVisible(),
      expect(page.locator(this.remove)).toBeDisabled(),

      ...Array.from({ length: 6 }, (_, index: number) => {
        const textOnPage: ArrayConstructor = (editDueDate_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#cicCaseOrderDueDates_0_0 .form-label:text-is("${textOnPage}")`,
          ),
          1,
        );
      }),
      commonHelpers.checkForButtons(
        page,
        this.continue,
        this.previous,
        this.cancel,
      ),
      expect(page.locator(this.addNew)).toBeVisible(),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkFields(page: Page, completed: boolean): Promise<void> {
    const formatValue = (value: string) =>
      value.length === 1 ? `0${value}` : value;
    await Promise.all([
      expect(page.locator(this.dayField)).toHaveValue(
        formatValue(orderDueDates_content.day),
      ),
      expect(page.locator(this.monthField)).toHaveValue(
        formatValue(orderDueDates_content.month),
      ),
      expect(page.locator(this.yearField)).toHaveValue(
        orderDueDates_content.year,
      ),
      expect(page.locator(this.informationField)).toHaveValue(
        orderDueDates_content.information,
      ),
    ]);
    if (completed) {
      await expect(page.getByRole("checkbox")).toBeChecked();
    } else {
      await expect(page.getByRole("checkbox")).not.toBeChecked();
    }
    await page
      .getByRole("button", { name: "Add new" })
      .first()
      .click({ force: true });
    await Promise.all([
      expect(page.locator("#cicCaseOrderDueDates_1_1 h3")).toHaveText(
        editDueDate_content.subTitle3,
      ),
      ...Array.from({ length: 6 }, (_, index) => {
        const textOnPage = (editDueDate_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(
            `#cicCaseOrderDueDates_1_1 .form-label:text-is("${textOnPage}")`,
          ),
          1,
        );
      }),
    ]);
    await page.click(`#cicCaseOrderDueDates_1_1 ${this.remove}`);
    await expect(page.locator(".cdk-overlay-container")).toBeVisible();
    await page.locator("button[title='Remove']").click();
    await expect(page.locator(".cdk-overlay-container")).not.toBeVisible();
    await expect(page.locator("#cicCaseOrderDueDates_1_1")).not.toBeVisible();
  },

  async fillInFields(page, completed, completedCheckboxChecked): Promise<void> {
    const clearAndUpdateField = async (selector: string, value: string) => {
      await page.locator(selector).click({ clickCount: 3 });
      await page.locator(selector).fill(value);
    };
    await clearAndUpdateField(this.dayField, editDueDate_content.day);
    await clearAndUpdateField(this.monthField, editDueDate_content.month);
    await clearAndUpdateField(this.yearField, editDueDate_content.year);
    await clearAndUpdateField(
      this.informationField,
      editDueDate_content.information,
    );

    if (completed) {
      if (completedCheckboxChecked) {
        // completed: true, completedCheckBoxChecked: true
        await page.getByRole("checkbox").check();
      } else {
        //completed: true, completedCheckBoxChecked: false
        await page.getByRole("checkbox").uncheck();
      }
    } else {
      if (!completed) {
        if (completedCheckboxChecked) {
          // completed: false, completedCheckboxChecked: true
          await page.getByRole("checkbox").check();
        } else {
          // completed: false, completedCheckboxChecked: false
          await page.getByRole("checkbox").uncheck();
        }
      }
    }
    await page.click(this.continue);
  },

  async triggerErrorMessages(
    page: Page,
    completed: boolean,
    completedCheckboxChecked: boolean,
  ): Promise<void> {
    // await page.locator(this.dayField).click({ clickCount: 3 });
    // await page.locator(this.dayField).press('Backspace');
    // commonHelpers.checkVisibleAndPresent(
    //     page.locator(
    //       `.error-message:has-text("${editDueDate_content.errorBlank2}")`,
    //     ),
    //     1,
    //   ),

    //   await page.locator(this.dayField).fill(editDueDate_content.day);
    //   await page.locator(this.monthField).click({ clickCount: 3 });
    //   await page.locator(this.monthField).press('Backspace');
    //   commonHelpers.checkVisibleAndPresent(
    //     page.locator(
    //       `.error-message:has-text("${editDueDate_content.errorBlank2}")`,
    //     ),
    //     1,
    //   ),

    //   await page.locator(this.monthField).fill(editDueDate_content.month);
    //   await page.locator(this.yearField).click({ clickCount: 3 });
    //   await page.locator(this.yearField).press('Backspace');
    //   commonHelpers.checkVisibleAndPresent(
    //     page.locator(
    //       `.error-message:has-text("${editDueDate_content.errorBlank2}")`,
    //     ),
    //     1,
    //   ),

    const clearField = async (
      page: Page,
      locator: any,
      error: string,
      value: string,
    ) => {
      await page.locator(locator).click({ clickCount: 3 });
      await page.locator(locator).press("Backspace");
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.error-message:has-text("${error}")`),
        1,
      );
      await locator(locator).fill(value);
    };

    await clearField(
      page,
      this.dayField,
      editDueDate_content.errorBlank2,
      editDueDate_content.day,
    );
    await clearField(
      page,
      this.monthField,
      editDueDate_content.errorBlank2,
      editDueDate_content.month,
    );
    await clearField(
      page,
      this.yearField,
      editDueDate_content.errorBlank2,
      " ",
    );
    //});

    await page.click(this.continue);
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `#error-summary-title:text-is("${editDueDate_content.errorBanner}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.validation-error:has-text("${editDueDate_content.errorBlank1}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.error-message:has-text("${editDueDate_content.errorBlank2}")`,
        ),
        1,
      ),
    ]);
    await this.fillInFields(page, completed, completedCheckboxChecked);
  },
};

export default editDueDatePage;
