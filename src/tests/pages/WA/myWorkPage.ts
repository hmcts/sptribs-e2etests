import { expect, Page } from "@playwright/test";
import config from "../../config.ts";
import myWork_content from "../../fixtures/content/CaseAPI/myWork/myWork_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import axeTest from "../../helpers/accessibilityTestHelper.ts";

type MyWorkPage = {
  myTasksTab: string;
  availableTasksTab: string;
  filterButton: string;
  assignToMeAndGoToTask: string;
  assignToMeLink: string;
  myWorkLink: string;
  reloadUrl: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    user: any,
  ): Promise<void>;
  selectAvailableTasks(page: Page): Promise<void>;
  seeTask(page: Page, taskName: string): Promise<void>;
  clickAssignAndGoToTask(page: Page): Promise<void>;
  clickAssignToMe(page: Page): Promise<void>;
  navigateToTaskPage(page: Page, taskName: string): Promise<void>;
  navigateToMyWorkPage(page: Page): Promise<void>;
};

const myWorkPage: MyWorkPage = {
  myTasksTab: `a:text-is(" My tasks ")`,
  availableTasksTab: "li.hmcts-sub-navigation__item:nth-child(2)",
  filterButton: ".hmcts-button--secondary",
  assignToMeAndGoToTask: "#action_claim-and-go",
  assignToMeLink: "#action_claim",
  myWorkLink: `nav a:text-is(" My work ")`,
  reloadUrl: `${config.CaseAPIBaseURL}/work/my-work/available`,

  async checkPageLoads(page, accessibilityTest, user): Promise<void> {
    await page.locator(".hmcts-primary-navigation__link").first().click();
    await page.waitForSelector(
      `.govuk-heading-xl:text-is("${myWork_content.pageTitle}")`,
    );
    await expect(page.locator("xuilib-generic-filter")).toBeHidden();
    await page
      .getByRole("button")
      .filter({ hasText: " Show work filter " })
      .dispatchEvent("click");
    await page.waitForSelector("xuilib-generic-filter > form");
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(`p:text-is("${myWork_content.hintText}")`),
        1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const tab = (myWork_content as any)[`tab${index + 1}`];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`li.hmcts-sub-navigation__item:has-text("${tab}")`),
          1,
        );
      }),
    ]);

    if (user === "waPrincipalJudge") {
      await Promise.all([
        ...Array.from({ length: 6 }, (_, index) => {
          const judicialColumn = (myWork_content as any)[
            `judicialColumn${index + 1}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.cdk-header-cell > button:text-is("${judicialColumn}")`,
            ),
            1,
          );
        }),
      ]);
    } else {
      await Promise.all([
        ...Array.from({ length: 6 }, (_, index) => {
          const column = (myWork_content as any)[`column${index + 1}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`th.cdk-header-cell > button:text-is("${column}")`),
            1,
          );
        }),
      ]);
      expect(
        page.locator(`button > h1:text-is("${myWork_content.priorityColumn}")`),
      );
    }
    await page.click(this.filterButton);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async selectAvailableTasks(page: Page): Promise<void> {
    await page.locator(this.availableTasksTab).click();
    page.waitForURL(/.*\/available$/);
    await page.waitForTimeout(5000);
  },

  async seeTask(page: Page, taskName: string): Promise<any> {
    const subjectTask = page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(`exui-task-field:text-is("${taskName}")`);
    const paginationLocator = `a > span:text-matches("^[1-9][0-9]*$", "i")`;

    while (true) {
      let locatorFound = false;
      if (await subjectTask.isVisible()) {
        console.log("Task visible!");
        break;
      }

      const paginationExists =
        (await page.locator(paginationLocator).count()) > 0;
      if (!paginationExists) {
        await page.goto(this.reloadUrl);
        await page.waitForTimeout(15000); // // waiting for cron job before rechecking
      } else {
        const paginationCount = await page.locator(paginationLocator).count();
        for (let i = 0; i < paginationCount; i++) {
          const nextPage = page.locator(paginationLocator).nth(i);
          const nextPageNumber = await nextPage.textContent();

          if (nextPageNumber) {
            console.log(`Navigating to page ${nextPageNumber}`);
            await page.waitForSelector(paginationLocator);
            await nextPage.click();
            await page.waitForSelector(`li > span:text("${nextPageNumber}")`);
            await page.waitForTimeout(15000); // waiting for cron job before rechecking
            const subjectTask = page
              .locator("tr")
              .filter({
                has: page.locator(
                  `td:has-text("${subjectDetailsContent.name}")`,
                ),
              })
              .locator(`exui-task-field:text-is("${taskName}")`);

            if (await subjectTask.isVisible()) {
              console.log("Task visible!");
              locatorFound = true;
              break;
            }
          }
        }
        if (locatorFound) {
          break;
        } else {
          console.log(
            "No more pages left to check. Restarting from the first page...",
          );
          await page.locator('a > span:text-is("1")').click();
          await page.waitForSelector(`li > span:text("1")`);
          await page.waitForTimeout(15000); // waiting for cron job before rechecking
        }
      }
    }
  },

  async clickAssignAndGoToTask(page: Page): Promise<void> {
    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(`div > button:has-text("Manage")`)
      .click();
    await page.waitForSelector(this.assignToMeAndGoToTask);
    await page.locator(this.assignToMeAndGoToTask).click();
    await page.waitForSelector(`h2:text-is("Active tasks")`);
  },

  async clickAssignToMe(page: Page): Promise<void> {
    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(`div > button:text-is("Manage ")`)
      .click();
    await page.waitForSelector(this.assignToMeLink);
    await page.locator(this.assignToMeLink).click();
    await page
      .locator(`td:has-text("${subjectDetailsContent.name}")`)
      .waitFor({ state: "detached" });
  },

  async navigateToTaskPage(page: Page, taskName: string): Promise<void> {
    await page.locator(this.myTasksTab).click();
    await page.waitForSelector(`td:has-text("${subjectDetailsContent.name}")`);

    await page
      .locator("tr")
      .filter({
        has: page.locator(`td:has-text("${subjectDetailsContent.name}")`),
      })
      .locator(
        `exui-task-field > exui-task-name-field > exui-url-field > a:text-is("${taskName}")`,
      )
      .click();
  },
  async navigateToMyWorkPage(page: Page): Promise<void> {
    await page.locator(this.myWorkLink).click();
    await page.waitForSelector(`h3:text-is("My work")`);
  },
};

export default myWorkPage;
