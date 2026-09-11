import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import commonHelpers from "../../helpers/commonHelpers.ts";
import dashboardContent from "../../fixtures/content/DSSCreateCase/dashboard_content.ts";

type DashboardPage = {
  viewDocuments(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    subjectName: String,
    caseNumber: String,
  ): Promise<void>;
};

const dashboardPage: DashboardPage = {
  async viewDocuments(page: Page, cy: boolean, accessibilityTest: boolean, subjectName: String, caseNumber: String) {
    switch (cy) {
      case true:
        await page.waitForSelector(
          `.govuk-panel__title:text-is("${subjectName}")`,
        );
        await page.waitForSelector(
          `.govuk-panel__body > strong:text-is("${caseNumber.replace(/\D/g, "")}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("English")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.headingCy1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.headingCy2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.headingCy3}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        await page.waitForSelector(
          `.govuk-panel__title:text-is("${subjectName}")`,
        );
        await page.waitForSelector(
          `.govuk-panel__body > strong:text-is("${caseNumber.replace(/\D/g, "")}")`,
        );
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.govuk-link.language:text-is("Cymraeg")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.heading1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.heading2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:text-is("${dashboardContent.heading3}")`,
            ),
            1,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  },
};

export default dashboardPage;