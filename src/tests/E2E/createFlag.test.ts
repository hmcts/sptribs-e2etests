import { test } from "@playwright/test";
import createFlag from "../journeys/CaseAPI/createFlag.ts";

test.describe("Creat flags for a case @CaseAPI", () => {
    test("Create flag in case management state as a caseworker. @crossbrowserCaseAPI", async ({
        page,
    }): Promise<void> => {
        await createFlag.createFlag(
            page,
            "caseWorker",
            "Case Management",
            false,
            false,
        )
    });
});