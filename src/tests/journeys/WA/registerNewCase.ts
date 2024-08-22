import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createFEApplication from "../DSSCreateCase/createCase.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import myWorkPage from "../../pages/CaseAPI/myWork/myWorkPage.ts";

type RegisterNewCase = {
  seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void>;
  completeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void>;
};

const registerNewCase: RegisterNewCase = {
  async seeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    let caseNumber: string | void;
    caseNumber = await createFEApplication.createFEApplication(
      page,
      false,
      "demoCitizen",
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
    );
    await page.locator(`a:text-is(" Sign out ")`).click();
    await page.waitForLoadState("domcontentloaded");
    await caseAPILoginPage.SignInUser(page, user);
    await myWorkPage.checkPageLoads(page, accessibilityTest);
  },

  async completeTask(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.seeTask(page, user, accessibilityTest);
  },
};

export default registerNewCase;
