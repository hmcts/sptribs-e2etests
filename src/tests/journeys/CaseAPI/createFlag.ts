import { Page, expect } from "@playwright/test";
import flagCommentsPage from "../../pages/CaseAPI/createFlag/flagCommentsPage.ts";
import flagLevelPage from "../../pages/CaseAPI/createFlag/flagLevelPage.ts";
import flagTypePage from "../../pages/CaseAPI/createFlag/flagTypePage.ts";
import submitPage from "../../pages/CaseAPI/createFlag/submitPage.ts";
import commonHelpers from "../../helpers/commonHelpers";
import events_content from "../../fixtures/content/CaseAPI/events_content";

type CreateFlag = {
  createFlag(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
    flagLevel: number,
    flagType: number,
  ): Promise<any>;
};

const createFlag: CreateFlag = {
  async createFlag(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
    flagLevel: number,
    flagType: number,
  ): Promise<any> {
    await flagLevelPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await flagLevelPage.fillInFields(page, flagLevel);
    await flagTypePage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await flagTypePage.fillInFields(page, flagType);
    await flagCommentsPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await flagCommentsPage.fillInFields(page);
    await submitPage.checkPageLoads(
      page,
      caseNumber,
      accessibilityTest,
      subjectName,
    );
    await submitPage.fillInFields(page);
    await submitPage.verifyFlagCreated(page);
  },
};

export default createFlag;