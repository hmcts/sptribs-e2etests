import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import commonHelpers, {
  allEvents,
  parties,
} from "../../helpers/commonHelpers.ts";
import buildCase from "../../../removedFiles/buildCase.ts";
import selectAdditionalDocuments from "../../pages/CaseAPI/issueToRespondent/selectAdditionalDocumentsPage.ts";
import notifyOtherPartiesPage from "../../pages/CaseAPI/issueToRespondent/notifyOtherPartiesPage.ts";
import submitPage from "../../pages/CaseAPI/issueToRespondent/submitPage.ts";
import confirmPage from "../../pages/CaseAPI/issueToRespondent/confirmPage.ts";

type IssueToRespondent = {
  issueToRespondent(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    recipients: parties[],
  ): Promise<void>;
};

const issueToRespondent: IssueToRespondent = {
  async issueToRespondent(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    recipients: parties[],
  ): Promise<void> {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber = await buildCase.buildCase(
      page,
      previousEvents,
      eventTimes,
      accessibilityTest,
      user,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Issue to respondent",
    );
    await selectAdditionalDocuments.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
    );
    switch (errorMessaging) {
      default:
        await selectAdditionalDocuments.continueOn(page);
        await notifyOtherPartiesPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
        );
        await notifyOtherPartiesPage.continueOn(page, recipients);
        await submitPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          recipients,
        );
        await submitPage.continueOn(page, recipients);
        await confirmPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
          recipients,
        );
        await confirmPage.continueOn(page);
        break;
      case true:
        await selectAdditionalDocuments.triggerErrorMessages(page);
        await selectAdditionalDocuments.continueOn(page);
        await notifyOtherPartiesPage.checkPageLoads(
          page,
          accessibilityTest,
          caseNumber,
        );
        await notifyOtherPartiesPage.triggerErrorMessages(page);
        break;
    }
  },
};

export default issueToRespondent;
