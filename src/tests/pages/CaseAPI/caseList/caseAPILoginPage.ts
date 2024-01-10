import { Page } from "@playwright/test";
import config from "../../../config.ts";

type CaseAPILoginPage = {
  fields: {
    username: string;
    password: string;
  };
  submitButton: string;
  SignInUser(page: Page): Promise<void>;
};

const caseAPILoginPage: CaseAPILoginPage = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page: Page): Promise<void> {
    await page.goto(config.CaseAPIBaseURL);
    await page.fill(this.fields.username, config.caseWorker.email);
    await page.fill(this.fields.password, config.caseWorker.password);
    await page.click(this.submitButton);
  },
};

export default caseAPILoginPage;
