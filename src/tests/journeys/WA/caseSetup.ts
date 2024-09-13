import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createCase from "./createCase.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import buildCase from "./buildCase.ts";
import task from "./task.ts";

type CaseSetup = {
  caseSetup(page: Page, userRole: UserRole): Promise<string>;
};

const caseSetup: CaseSetup = {
  async caseSetup(page: Page, userRole: UserRole): Promise<string> {
    let caseNumber: any;
    caseNumber = await createCase.createCase(
      page,
      userRole,
      false,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      false,
      true,
      false,
    );
    console.log(`Case Number : ${caseNumber}`);
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await buildCase.buildCase(page, false, caseNumber);
    await task.cleanUpTestData(
      page,
      "Available tasks",
      "Issue Case To Respondent",
      "Issue Case To Respondent",
    );
    return caseNumber;
  },
};

export default caseSetup;
