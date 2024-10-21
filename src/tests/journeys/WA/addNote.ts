import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import addCaseNotePage from "../../pages/CaseAPI/addNote/addCaseNotePage.ts";
import notesTabPage from "../../pages/CaseAPI/caseTabs/notesTabPage.ts";

type AddNote = {
  addNote(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string
  ): Promise<void>;
};

const addNote: AddNote = {
  async addNote(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string
  ): Promise<void> {
    await commonHelpers.chooseEventFromDropdown(page, "Case: Add note");
    await addCaseNotePage.checkPageLoads(page, accessibilityTest, caseNumber, subjectName);
    await addCaseNotePage.fillInFields(page);
    await page.click(`.mat-tab-label-content:text-is("Notes")`);
    await notesTabPage.checkAddedNote(page);
  },
};

export default addNote;
