import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import { parties } from "../../helpers/commonHelpers.ts";
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
    caseNumber: string,
  ): Promise<void>;
};

const issueToRespondent: IssueToRespondent = {
  async issueToRespondent(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    recipients: parties[],
    caseNumber: string,
  ): Promise<void> {
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
    }
  },
};

export default issueToRespondent;
