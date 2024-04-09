import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import createCase from "./createCase.ts";
import commonHelpers, {
  allEvents,
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../../helpers/commonHelpers.ts";
import buildCase from "./buildCase.ts";
import selectAdditionalDocuments from "../../pages/CaseAPI/issueToRespondent/selectAdditionalDocuments.ts";

type IssueToRespondent = {
  issueToRespondent(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
};

const issueToRespondent: IssueToRespondent = {
  async issueToRespondent(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    let previousEvents: allEvents[] = [];
    let eventTimes: string[] = [];
    const caseNumber = await createCase.createCase(
      page,
      user,
      accessibilityTest,
      category,
      subCategory,
      representative,
      applicant,
      contactPreference,
      representativeQualified,
      multipleFiles,
      schemeSelection,
      caseRegionSelection,
      claimsLinked,
      compensationLinked,
      tribunalFormsInTime,
      applicantExplained,
      needLogin,
    );
    await createCase.verifyDetails(
      page,
      user,
      accessibilityTest,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await buildCase.buildCase(
      page,
      caseNumber,
      previousEvents,
      eventTimes,
      accessibilityTest,
    );
    await commonHelpers.chooseEventFromDropdown(
      page,
      "Case: Issue to respondent",
    );
    await selectAdditionalDocuments.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
    );
    switch (errorMessaging) {
      default:
        await selectAdditionalDocuments.continueOn(page);
        break;
      case true:
        await selectAdditionalDocuments.triggerErrorMessages(page);
        await selectAdditionalDocuments.continueOn(page);
        break;
    }
  },
};

export default issueToRespondent;
