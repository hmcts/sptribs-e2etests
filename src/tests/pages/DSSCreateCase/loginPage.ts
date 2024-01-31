import { Page } from "@playwright/test";
import idamLoginHelper from "../../helpers/idamLoginHelper.ts";

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
      `#skiplinktarget:text("Sign in or create an account")`,
    );
    await idamLoginHelper.signInUser(page, "citizen");
  },
};

export default signInPage;
