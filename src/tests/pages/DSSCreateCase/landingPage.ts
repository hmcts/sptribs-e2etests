import { AxeUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";
import config from "../../config";
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
        await page.waitForSelector(
          `h1:text-is("${LandingPageDetails.pageTitle}")`,
        );
        await page.locator(`a.govuk-link:text-is("Cymraeg")`).click();
        await page.waitForSelector(`.govuk-link:text-is("English")`);
        await Promise.all([
          expect(page.locator(`a.govuk-link:text-is("English")`)).toBeVisible(),
          expect(page.locator("h1")).toHaveText(
            LandingPageDetails.pageTitleCy,
          ),
          expect(page.locator(".govuk-body-l").first()).toContainText(
            LandingPageDetails.hintMessageCy,
          ),
          expect(page.locator("h2").nth(0)).toContainText(
            LandingPageDetails.subHeadingCy1,
          ),
          expect(page.locator("h2").nth(1)).toContainText(
            LandingPageDetails.subHeadingCy2,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(page.locator(".govuk-body-l").nth(index + 1)).toContainText(
              textOnPage,
            );
          }),
          expect(page.locator(landingPage.startButton)).toContainText(
            "Dechrau nawr",
          ),
        ]);
        break;
      default:
        await page.goto(config.FEBaseURL);
        await page.waitForSelector(
          `h1:text-is("${LandingPageDetails.pageTitle}")`,
        );
        await Promise.all([
          expect(page.locator("h1")).toHaveText(
            LandingPageDetails.pageTitle,
          ),
          expect(page.locator(".govuk-body-l").first()).toContainText(
            LandingPageDetails.hintMessage,
          ),
          expect(page.locator("h2").nth(0)).toContainText(
            LandingPageDetails.subHeading1,
          ),
          expect(page.locator("h2").nth(1)).toContainText(
            LandingPageDetails.subHeading2,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPage${index + 1}`
            ];
            return expect(page.locator(".govuk-body-l").nth(index + 1)).toContainText(
              textOnPage,
            );
          }),
          expect(page.locator(landingPage.startButton)).toHaveText("Start now"),
        ]);
        if (accessibilityTest) {
          await new AxeUtils(page).audit();
        }
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(landingPage.startButton);
  },
};

export default landingPage;
