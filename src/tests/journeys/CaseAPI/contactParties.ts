import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import selectDocumentsPage from "../../pages/CaseAPI/contactParties/selectDocumentsPage.ts";
import partiesToContactPage from "../../pages/CaseAPI/contactParties/partiesToContactPage.ts";
import submitPage from "../../pages/CaseAPI/contactParties/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/contactParties/confirmPage.ts";

type ContactParties = {
  contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const contactParties: ContactParties = {
  async contactParties(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    // if (user == "respondent") {
    //   await commonHelpers.chooseEventFromDropdown(
    //     page,
    //     "Case: CICA Contact parties",
    //   );
    // }
    await selectDocumentsPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await selectDocumentsPage.tickCheckbox(page);
    await selectDocumentsPage.continueOn(page);
    await partiesToContactPage.checkPageLoads(
      page,
      caseNumber,
      user,
      accessibilityTest,
      subjectName,
    );
    switch (errorMessaging) {
      default:
        await partiesToContactPage.tickCheckBoxes(page, true, user);
        await partiesToContactPage.fillInFields(page);
        await partiesToContactPage.continueOn(page);
        await submitPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          subjectName,
        );
        await submitPage.checkValidInfo(page, user);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          user,
          subjectName,
        );
        await confirmPage.continueOn(page);
        break;
      case true:
        await partiesToContactPage.tickCheckBoxes(page, false, user);
        await partiesToContactPage.triggerErrorMessages(page);
        await partiesToContactPage.tickCheckBoxes(page, true, user);
        await partiesToContactPage.continueOn(page);
        await page.waitForSelector(`h2:text-is("Check your answers")`);
        await submitPage.continueOn(page);
        await confirmPage.checkPageLoads(
          page,
          caseNumber,
          accessibilityTest,
          user,
          subjectName,
        );
        await confirmPage.continueOn(page);
        break;
    }
  },
};
export default contactParties;
