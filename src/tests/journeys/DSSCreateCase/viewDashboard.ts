import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import landingPage from "../../pages/DSSCreateCase/landingPage.ts";
import loginPage from "../../pages/DSSCreateCase/loginPage.ts";
import cicaLookupPage from "../../pages/DSSCreateCase/cicaLookupPage.ts";
import cicaPostCodeVerificationPage from "../../pages/DSSCreateCase/cicaPostcodeVerificationPage.ts";
import dashboardPage from "../../pages/DSSCreateCase/dashboardPage.ts";

type ViewDashboard = {
  viewDashboard(
    page: Page,
    cy: boolean,
    user: UserRole,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any>;
};

const viewDashboard: ViewDashboard = {
  async viewDashboard(
    page: Page,
    cy: boolean,
    user: UserRole,
    accessibilityTest: boolean,
    caseNumber: string,
    subjectName: string,
  ): Promise<any> {
    await landingPage.seeTheLandingPage(
        page, 
        cy, 
        accessibilityTest);
    await landingPage.continueOn(page);
    await loginPage.SignInUser(page, user);
    await cicaLookupPage.checkPageLoads(
        page, 
        cy, 
        accessibilityTest);
    await cicaLookupPage.fillInFields(page, caseNumber);
    await cicaPostCodeVerificationPage.checkPageLoads(
        page, 
        cy, 
        accessibilityTest);
    await cicaPostCodeVerificationPage.fillInFields(page);
    await dashboardPage.viewDocuments(
        page, 
        cy, 
        accessibilityTest, 
        subjectName, 
        caseNumber
    );
  },
};

export default viewDashboard;