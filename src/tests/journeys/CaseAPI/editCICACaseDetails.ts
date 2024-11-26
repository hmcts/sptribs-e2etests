import { Page } from "@playwright/test";
import config from "../../config.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import editCICACaseDetailsEditCaseDetailsPage from "../../pages/CaseAPI/editCICACaseDetails/editCICACaseDetailsEditCaseDetailsPage.ts";
import submitPage from "../../pages/CaseAPI/editCICACaseDetails/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/editCICACaseDetails/confirmPage.ts";
import CICADetailsTabPage from "../../pages/CaseAPI/caseTabs/CICADetailsTabPage.ts";

type EditCICACaseDetails = {
  editCICACaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const editCICACaseDetails: EditCICACaseDetails = {
  async editCICACaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await commonHelpers.signOutAndGoToCase(
      page,
      "respondent",
      config.CaseAPIBaseURL,
      caseNumber,
    );
    if (accessibilityTest) {
      await page.waitForTimeout(15000);
    }
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Edit case details",
    );
    await editCICACaseDetailsEditCaseDetailsPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await editCICACaseDetailsEditCaseDetailsPage.fillFields(page);
    await editCICACaseDetailsEditCaseDetailsPage.continueOn(page);
    await submitPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await submitPage.checkValidInfo(page);
    await submitPage.continueOn(page);
    await confirmPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await confirmPage.continueOn(page);
    await CICADetailsTabPage.changeToCICADetailsTab(page);
    await CICADetailsTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      subjectName,
    );
    await CICADetailsTabPage.checkValidInfo(page);
  },
};

export default editCICACaseDetails;
