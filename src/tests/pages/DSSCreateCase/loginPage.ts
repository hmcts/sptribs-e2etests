import { Page } from "@playwright/test";
import idamLoginHelper from "../../helpers/idamLoginHelper.ts";
import config, { UserRole } from "../../config.ts";

type SignInPage = {
  SignInUser(page: Page, user: UserRole): Promise<void>;
};

const signInPage: SignInPage = {
  async SignInUser(page: Page, user: UserRole): Promise<void> {
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );
    await idamLoginHelper.signInUser(page, user, config.FEBaseURL);
  },
};

export default signInPage;
