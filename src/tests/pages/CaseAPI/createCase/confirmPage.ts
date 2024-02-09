import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import confirm_content from "../../../fixtures/content/CaseAPI/createCase/confirm_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type ConfirmPage = {
  closeAndReturn: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
};

const confirmPage: ConfirmPage = {
  closeAndReturn: ".button",

  async checkPageLoads(page, accessibilityTest): Promise<void> {
    await expect(page.locator(".heading-h1")).toHaveText(
      confirm_content.pageTitle,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`markdown > h1:text-is("${confirm_content.subTitle1}")`),
      1,
    );
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`markdown > h2:text-is("${confirm_content.textOnPage1}")`),
      1,
    );
    const caseElement = await page.$$("markdown > h2");

    const caseElementLength16 = await Promise.all(
      caseElement.map(async (element) => {
        const text = await page.evaluate(
          (element) => element.textContent,
          element,
        );
        if (text && text.trim().length === 16) {
          // Check if text is not null
          return element;
        }
      }),
    );

    const filteredCaseElement = caseElementLength16.filter(
      (element) => element !== null,
    );

    if (!(filteredCaseElement.length > 0)) {
      console.log("Invalid case reference.");
      process.exit(1);
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },
};

export default confirmPage;
