import { Page } from "@playwright/test";
import { UserRole } from "../../../config.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import notesTab_content from "../../../fixtures/content/CaseAPI/caseTabs/notesTab_content.ts";
import addCaseNotes_content from "../../../fixtures/content/CaseAPI/addNote/addCaseNotes_content.ts";

type NotesTabPage = {
  checkAddedNote(page: Page, user: UserRole): Promise<void>;
};

const notesTabPage: NotesTabPage = {
  async checkAddedNote(page: Page, user: UserRole): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.case-viewer-label:text-is("${notesTab_content.textOnPage1}")`,
        ),
        1,
      ),
      ...Array.from({ length: 4 }, (_, index: number) => {
        const textOnPage = (notesTab_content as any)[`textOnPage${index + 2}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    switch (user) {
      default:
        throw new Error("Invalid user type selected.");
      case "caseWorker":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("automated caseworker")`),
          1,
        );
        break;
      case "seniorCaseworker":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("automated seniorcaseworker")`),
          1,
        );
        break;
      case "hearingCentreAdmin":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("automated hearingcentreadmin")`),
          1,
        );
        break;
      case "hearingCentreTeamLead":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("automated hearingcentreteamlead")`),
          1,
        );
        break;
      case "seniorJudge":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("automated seniorjudge")`),
          1,
        );
        break;
    }
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${await commonHelpers.todayDate()}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`span:text-is("${addCaseNotes_content.textContent}")`),
        1,
      ),
    ]);
  },
};

export default notesTabPage;
