import { Page } from "@playwright/test";
import submitPage from "../../pages/CaseAPI/createBundle/submitPage.ts";

type CreateBundle = {
  createBundle(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void>;
};

const createBundle: CreateBundle = {
  async createBundle(
    page: Page,
    caseNumber: string,
    subjectName: string,
  ): Promise<void> {
    await submitPage.checkPageLoads(
      page,
      caseNumber,
      subjectName,
    );
    await submitPage.continueOn(
      page,
    );
  },
};

export default createBundle