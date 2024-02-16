import config from "../../config";
import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import LandingPageDetails from "../../fixtures/content/DSSUpdateCase/LandingPage_content";

type LandingPage = {
  startButton: string;
  seeTheLandingPage(page: Page, accessibilityTest: boolean): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const landingPage: LandingPage = {
  startButton: "button[name='startNow']",

  async seeTheLandingPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.goto(config.UpdateCaseBaseURL);
    await expect(page.locator(".govuk-header")).toHaveText(
      LandingPageDetails.pageTitle,
    );
    await expect(page.locator(".govuk-heading-l")).toHaveText(
      LandingPageDetails.pageTitle,
    );
    await expect(page.locator(".govuk-body-l").nth(0)).toContainText(
      LandingPageDetails.hintMessage,
    );
    await expect(page.locator(".govuk-body-l").nth(1)).toHaveText(
      LandingPageDetails.textOnPage1,
    );
    await expect(page.locator(".govuk-body-l").nth(2)).toHaveText(
      LandingPageDetails.textOnPage2,
    );
    await expect(page.locator(landingPage.startButton)).toHaveText("Start now");
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(landingPage.startButton);
  },
};

export default landingPage;
