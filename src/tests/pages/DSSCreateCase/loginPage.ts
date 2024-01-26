import { expect, Page } from "@playwright/test";
import idamLoginHelper from "../../helpers/idamLoginHelper.ts";

type SignInPage = {
  fields: {
    username: string;
    password: string;
  };
  submitButton: string;
  SignInUser(page: Page, welsh: boolean): Promise<void>;
};

const signInPage: SignInPage = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page: Page, welsh: boolean): Promise<void> {
    if (welsh) {
      await page.locator(".language").click();
      await expect(page.locator(".language")).toHaveText("English");
      await page.waitForSelector(
        `#skiplinktarget:text("Mewngofnodi neu greu cyfrif")`,
      );
      await idamLoginHelper.signInUser(page, welsh, "citizen");
    } else {
      await page.waitForSelector(
        `#skiplinktarget:text("Sign in or create an account")`,
      );
      await idamLoginHelper.signInUser(page, welsh,"citizen");
    }
  },
};

export default signInPage;
