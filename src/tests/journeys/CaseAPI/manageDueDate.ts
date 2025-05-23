import { Page, expect } from "@playwright/test";
import selectOrderPage from "../../pages/CaseAPI/manageDueDate/selectOrderPage.ts";
import editDueDatePage from "../../pages/CaseAPI/manageDueDate/editDueDatePage.ts";
import submitPage from "../../pages/CaseAPI/manageDueDate/submitPage.ts";
import manageDueDateConfirmPage from "../../pages/CaseAPI/manageDueDate/confirmPage.ts";

type ManageDueDate = {
  manageDueDate(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    completedCheckboxChecked: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any>;
};

const manageDueDate: ManageDueDate = {
  async manageDueDate(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    completed: boolean,
    completedCheckboxChecked: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any> {
    await selectOrderPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default: // false
        await selectOrderPage.selectDropdownOption(page);
        await editDueDatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDueDatePage.checkFields(page, completed);
        await editDueDatePage.fillInFields(
          page,
          completed,
          completedCheckboxChecked,
        );
        break;
      case true:
        await selectOrderPage.triggerErrorMessages(page);
        await editDueDatePage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await editDueDatePage.triggerErrorMessages(
          page,
          completed,
          completedCheckboxChecked,
        );
    }
    await submitPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      completed,
      completedCheckboxChecked,
      subjectName,
    );
    await submitPage.checkValidInfo(page, completedCheckboxChecked);
    await submitPage.checkChangeLink(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await submitPage.saveAndContinue(page);
    await manageDueDateConfirmPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
    await manageDueDateConfirmPage.closeAndReturnToCase(page);
    expect(page.locator(".alert-message")).toHaveText(
      ` Case #${caseNumber} has been updated with event: Orders: Manage due date `,
    );
  },
};
export default manageDueDate;
