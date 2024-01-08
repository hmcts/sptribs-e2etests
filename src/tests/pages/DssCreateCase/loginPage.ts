import config from "../../config";
import { Page } from "@playwright/test";

type SignInPage = {
  fields: {
    username: string;
    password: string;
  };
  submitButton: string;
  SignInUser(page: Page): Promise<void>;
};

const signInPage: SignInPage = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page: Page): Promise<void> {
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`
    );
    await page.fill(this.fields.username, config.citizen.email);
    await page.fill(this.fields.password, config.citizen.password);
    await page.click(this.submitButton);
  },
};

export default signInPage;
