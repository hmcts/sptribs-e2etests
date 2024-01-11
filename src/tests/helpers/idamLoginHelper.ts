import config, { UserCredentials } from "../config.ts";
import { Page } from "@playwright/test";

interface UserLoginInfo {
  username: string;
  password: string;
}

type IdamLoginHelper = {
  fields: UserLoginInfo;
  submitButton: string;
  signInUser(page: Page, user: keyof typeof config): Promise<void>;
};

const idamLoginHelper: IdamLoginHelper = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async signInUser(page: Page, user: keyof typeof config): Promise<void> {
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );

    // Access the email and password properties based on the user role
    if (typeof config[user] !== 'string') {
      const userCredentials: UserCredentials = config[user];
      await page.fill(this.fields.username, userCredentials.email);
      await page.fill(this.fields.password, userCredentials.password);
      await page.click(this.submitButton);
    } else {
      // Handle the case when config[user] is a string (not UserCredentials)
      console.error(`Invalid user configuration for ${user}`);
    }
  },
};

export default idamLoginHelper
