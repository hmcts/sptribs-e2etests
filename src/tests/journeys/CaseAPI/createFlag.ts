import { Page, expect } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import commonHelpers, { allEvents, State } from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import createCase from "./createCase.ts";
import createListing from "./createListing.ts";
import createSummary from "./createSummary.ts";
import createFlags1Page from "../../pages/CaseAPI/createFlag/createFlagscaseworkerCaseFlag1Page.ts";
import createFlags2Page from "../../pages/CaseAPI/createFlag/createFlagscaseworkerCaseFlag2Page.ts";
import createFlags3Page from "../../pages/CaseAPI/createFlag/createFlagscaseworkerCaseFlag3Page.ts";
import createFlags4Page from "../../pages/CaseAPI/createFlag/createFlagscaseworkerCaseFlag4Page.ts";
import createFlags5Page from "../../pages/CaseAPI/createFlag/createFlagscaseworkerCaseFlag5Page.ts";
import submitPage from "../../pages/CaseAPI/createFlag/submitPage.ts";
import caseApplicantDetailsObject_content from "../../fixtures/content/CaseAPI/createCase/caseApplicantDetailsObject_content.ts";
import confirmPage from "../../pages/CaseAPI/createFlag/confirmPage.ts";

type CreateFlag = {
    createFlag(
        page: Page,
        user: UserRole,
        initialState: State,
        accessibility: boolean,
        errorMessaging: boolean,
    ): Promise<any>
};

const createFlag: CreateFlag = {
    async createFlag(
        page: Page,
        user: UserRole,
        initialState: State,
        accessibility: boolean,
        errorMessaging: boolean,

    ): Promise<any> {
        let caseNumber: string | void;
        let previousEvents: allEvents[] = [];
        let eventTimes: string[] = [];

        switch (initialState) {
            default:
                throw new Error(
                    "Invalid state, create a flag from this state.",
                  );
            case "Case Management":
                caseNumber = await buildCase.buildCase(
                    page,
                    previousEvents,
                    eventTimes,
                    true,
                    "caseWorker",
                );
                break;
            case "Submitted":
                caseNumber = await createCase.createCase(
                    page,
                    "caseWorker",
                    false,
                    "Assessment",
                    "Fatal",
                    true,
                    true,
                    "Email",
                    true,
                    true,
                    "1996",
                    "Scotland",
                    true,
                    false,
                    true,
                    false,
                    true,
                    false,
                  );
                  break;
            case "Awaiting Hearing":
                caseNumber = await createListing.createListing(
                    page,
                    "caseWorker",
                    false,
                    true,
                    "1-London",
                    "Case management",
                    "Face to Face",
                    "Morning",
                    false,
                    false,
                    "East London Tribunal Hearing Centre-2 Clove Crescent, East India Dock London",
                    false,
                    );
                    break;
            case "Awaiting Outcome":
                caseNumber = await createSummary.createSummary(
                    page,
                    "caseWorker",
                    false,
                    "Case management",
                    "Hybrid",
                    "Morning",
                    false,
                    "Fox Court - London (Central) SSCS Tribunal-4th Floor, Fox Court, 30 Brooke Street, London",
                    "Fox Court",
                    "Allowed",
                    null,
                    true,
                    false,
                    false,
                    );
                    break;
        }
        console.log(caseNumber);
        if (typeof caseNumber !== "string") {
            throw new Error("Case number is invalid.");
          }
        await commonHelpers.signOutAndGoToCase(
            page,
            user,
            config.CaseAPIBaseURL,
            caseNumber,
          );
        await commonHelpers.chooseEventFromDropdown(
            page,
            "Create Flag",
        );
        await createFlags1Page.checkPageLoads(page, false, caseNumber)
        switch (user) {
            default: //Defaults to caseWorker
                await createFlags1Page.selectFlagLocation(page, "applicant")
                await createFlags2Page.checkPageLoads(page, false, caseNumber)
                await createFlags2Page.selectFlagType(page, "Reasonable adjustment")
                await createFlags3Page.checkPageLoadsReasonableAdjustment(page, false, caseNumber)
                await createFlags3Page.selectAdjustmentType(page, " I need documents in an alternative format ")
                await createFlags4Page.checkPageLoadsReasonableAdjustAltFormat(page, false, caseNumber)
                await createFlags4Page.selectAdjustmentType(page, " Documents in a specified colour ")
                await createFlags5Page.checkPageLoads(page, false, caseNumber)
                await createFlags5Page.addTextToTextBox(page)
                await submitPage.checkPageLoads(page, false, caseNumber)
                await submitPage.checkSummaryInfo(page, caseApplicantDetailsObject_content.name, " Documents in a specified colour ")
                await submitPage.clickSaveAndContinue(page)
                await confirmPage.checkPageLoads(page, false, caseNumber);
                await confirmPage.closeAndReturnToCase(page);
                break;
            case "seniorCaseworker":

                break;
            case "hearingCentreAdmin":

                break;
            case "hearingCentreTeamLead":

                break;
        }


    },
};
export default createFlag;