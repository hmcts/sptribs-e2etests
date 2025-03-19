import { Page } from "@playwright/test";
import idamLoginHelper from "../../helpers/idamLoginHelper.ts";
import config from "../../config.ts";
import waUsers_content from "../../fixtures/content/waUsers_content.ts";

type SignInPage = {
  SignInUser(page: Page): Promise<void>;
};

const signInPage: SignInPage = {
  async SignInUser(page: Page): Promise<void> {
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );
    await idamLoginHelper.signInUser(
      page,
      waUsers_content.userRoleCitizen,
      config.FEBaseURL,
    );
  },
};

export default signInPage;
