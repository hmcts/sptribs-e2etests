import config from "../../config";
import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import LandingPageDetails from "../../fixtures/content/DSSCreateCase/LandingPage_content";

type LandingPage = {
  startButton: string;
  seeTheLandingPage(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const landingPage: LandingPage = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await page.goto(config.FEBaseURL);
        await page.locator(".govuk-link").nth(1).click();
        await expect(page.locator(".govuk-link").nth(1)).toHaveText("English");
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          LandingPageDetails.pageTitleCy,
        );
        await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
          LandingPageDetails.hintMessageCy,
        );
        await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
          LandingPageDetails.subHeadingCy,
        );
        await expect(page.locator(".govuk-body-l").nth(2)).toHaveText(
          LandingPageDetails.textOnPageCy1,
        );
        await expect(page.locator(".govuk-body-l").nth(3)).toHaveText(
          LandingPageDetails.textOnPageCy2,
        );
        await expect(page.locator(landingPage.startButton)).toHaveText(
          "Dechrau nawr",
        );
        break;
      default:
        await page.goto(config.FEBaseURL);
        await expect(page.locator(".govuk-heading-l")).toHaveText(
          LandingPageDetails.pageTitle,
        );
        await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
          LandingPageDetails.hintMessage,
        );
        await expect(page.locator(".govuk-body-l").nth(1)).toContainText(
          LandingPageDetails.subHeading,
        );
        await expect(page.locator(".govuk-body-l").nth(2)).toHaveText(
          LandingPageDetails.textOnPage1,
        );
        await expect(page.locator(".govuk-body-l").nth(3)).toHaveText(
          LandingPageDetails.textOnPage2,
        );
        await expect(page.locator(landingPage.startButton)).toHaveText(
          "Start now",
        );
        if (accessibilityTest) {
          await axeTest(page);
        }
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Start now" }).click();
  },
};

export default landingPage;
