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
  startButton: 'a[role="button"]',

  async seeTheLandingPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.goto(config.UpdateCaseBaseURL);
    await expect(page.locator(".govuk-header__service-name")).toHaveText(
      LandingPageDetails.header,
    );
    await expect(page.locator(".govuk-phase-banner__text")).toContainText(
      LandingPageDetails.feedbackBanner,
    );
    await expect(page.locator("a.govuk-link").nth(0)).toHaveText(
      LandingPageDetails.feedbackLinkText,
    );
    await expect(page.locator("a.govuk-link").nth(0)).toHaveAttribute(
      "href",
      LandingPageDetails.feedbackLink,
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
