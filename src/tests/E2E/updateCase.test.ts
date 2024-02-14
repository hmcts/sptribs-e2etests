import { test } from "@playwright/test";
import landingPage from "../pages/DSSUpdateCase/landingPage.ts";

test.describe("DSS Update case tests.", () => {
  test.only("Check for the landing page - aXe test as it proceeds. @accessibility", async ({
    page,
  }) => {
    await landingPage.seeTheLandingPage(page, true);
    await landingPage.continueOn(page);
  });
});
