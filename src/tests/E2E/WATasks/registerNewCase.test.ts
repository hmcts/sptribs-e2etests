import { test } from "@playwright/test";
import registerNewCase from "../../journeys/WA/registerNewCase.ts";

test.describe("Register new case task tests @CaseAPI", (): void => {
  test("AC1: New task created", async ({ page }) => {
    await registerNewCase.seeTask(
      page, 
      "waRegionalHearingCentreAdmin", 
      false);
  });

  test("AC2: Task is completable via next steps link - assign to me and go to task", async ({ page }) => {
    await registerNewCase.completeTask(
      page,
      "waRegionalHearingCentreAdmin",
      "Link: Assign Task to Me and Go To Task",
      false,
    );
  });

  test("AC2: Task is completable via next steps link - assign to me", async ({ page }) => {
    await registerNewCase.completeTask(
      page,
      "waRegionalHearingCentreAdmin",
      "Link: Assign Task to Me",
      false,
    );
  });

    test("Task is completed via event dropdown", async ({ page }) => {
      await registerNewCase.completeTask(
        page,
        "waRegionalHearingCentreAdmin",
        "Event DropDown",
        false,
      );
    });

   // accessibility test for WA ?? configured by EXUI 
   // error messaging 

});
