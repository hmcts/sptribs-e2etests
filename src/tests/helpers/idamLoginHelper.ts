import config, { UserCredentials } from "../config.ts";
import { Page } from "@playwright/test";

interface UserLoginInfo {
  username: string;
  password: string;
}

type IdamLoginHelper = {
  fields: UserLoginInfo;
  submitButton: string;
  welshSubmitButton: string;
  signInUser(page: Page, welsh: boolean, user: keyof typeof config): Promise<void>;
};

const idamLoginHelper: IdamLoginHelper = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',
  welshSubmitButton: 'input[value="Mewngofnodi"]',

  async signInUser(page: Page, welsh: boolean, user: keyof typeof config): Promise<void> {
    if (welsh) {
      await page.waitForSelector(
        `#skiplinktarget:text("Mewngofnodi neu greu cyfrif")`,
      );
    } else {
      await page.waitForSelector(
        `#skiplinktarget:text("Sign in or create an account")`,
      );
    }
    const isUserCredentials = (
      value: UserCredentials | string,
    ): value is UserCredentials => {
      return typeof value !== "string";
    };

    const userCredentials: UserCredentials | string = config[user];
    if (isUserCredentials(userCredentials)) {
      await page.fill(this.fields.username, userCredentials.email);
      await page.fill(this.fields.password, userCredentials.password);
      if (welsh) {
        await page.click(this.welshSubmitButton);
      } else {
        await page.click(this.submitButton);
      }
    } else {
      console.error("Invalid credential type");
    }
  },
};

export default idamLoginHelper;
