import { Page } from "@playwright/test";
import config, { UserCredentials, UserRole } from "../../../config.ts";
import idamLoginHelper from "../../../helpers/idamLoginHelper.ts";

type CaseAPILoginPage = {
  fields: {
    username: string;
    password: string;
  };
  submitButton: string;
  SignInUser(page: Page, user: UserRole): Promise<void>;
};

const caseAPILoginPage: CaseAPILoginPage = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page: Page, user: UserRole): Promise<void> {
    await page.goto(config.CaseAPIBaseURL);
    await idamLoginHelper.signInUser(page, user);
  },
};

export default caseAPILoginPage;
