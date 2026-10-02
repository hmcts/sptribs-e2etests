import { Page } from "@playwright/test";
import config, { UserRole } from "../../config.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";

const toIsoDate = (date: Date): string => date.toISOString().split("T")[0];

const getXsrfCookie = async (page: Page): Promise<string> => {
  const cookies = await page.context().cookies();
  const token = cookies.find((c) => c.name === "XSRF-TOKEN")?.value;
  return token!;
};

export const formatCaseReference = (caseId: string): string =>
  caseId.replace(/(\d{4})(?=\d)/g, "$1-");

export async function createCaseViaApi(
  page: Page,
  subjectName: string,
  user: UserRole = "waHearingCentreAdmin",
  caseType: string = "CriminalInjuriesCompensation",
): Promise<string> {
  await caseAPILoginPage.SignInUser(page, user);
  const baseUrl = config.CaseAPIBaseURL.replace(/\/cases\/?$/, "");
  const request = page.request;

  const startEventResponse = await request.get(
    `${baseUrl}/data/internal/case-types/${caseType}/event-triggers/caseworker-create-case?ignore-warning=false`,
    {
      headers: {
        accept:
          "application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-start-case-trigger.v2+json;charset=UTF-8",
        experimental: "true",
      },
    },
  );

  const startEventBody = await startEventResponse.json();
  const eventToken: string = startEventBody.event_token;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const createCasePayload = {
    data: {
      cicCaseCaseCategory: "Assessment",
      cicCaseCaseSubcategory: "MedicalReOpening",
      editCicaCaseDetails: null,
      cicCaseInitialCicaDecisionDate: toIsoDate(yesterday),
      cicCaseCaseReceivedDate: toIsoDate(today),
      cicCaseFullName: subjectName,
      cicCasePhoneNumber: "07123456789",
      cicCaseDateOfBirth: "1977-07-07",
      cicCaseContactPreferenceType: "Email",
      cicCaseEmail: "AutoTestSubject@mail.com",
      cicCasePartiesCIC: ["ApplicantCIC", "SubjectCIC", "RepresentativeCIC"],
      cicCaseAddress: {
        AddressLine1: "Buckingham Palace",
        AddressLine2: "",
        AddressLine3: "",
        PostTown: "London",
        County: "",
        Country: "United Kingdom",
        PostCode: "SW1A 1AA",
      },
      cicCaseApplicantFullName: "Applicant AutoTesting",
      cicCaseApplicantPhoneNumber: "07123456789",
      cicCaseApplicantDateOfBirth: null,
      cicCaseApplicantContactDetailsPreference: "Email",
      cicCaseApplicantEmailAddress: "AutoTestApplicant@mail.com",
      cicCaseRepresentativeFullName: "Representative AutoTesting",
      cicCaseRepresentativeOrgName: "HMCTS",
      cicCaseRepresentativePhoneNumber: "07123456789",
      cicCaseRepresentativeReference: null,
      cicCaseIsRepresentativeQualified: "Yes",
      cicCaseRepresentativeContactDetailsPreference: "Email",
      cicCaseRepresentativeEmailAddress: "AutoTestRepresentative@mail.com",
      cicCaseSubjectCIC: ["SubjectCIC"],
      cicCaseApplicantCIC: ["ApplicantCIC"],
      cicCaseRepresentativeCIC: ["RepresentativeCIC"],
      cicCaseCaseDocumentsUpload: [
        {
          value: {
            documentCategory: "ApplicationForm",
            documentEmailContent: "Lorem ipsum text A - Application Form",
            documentLink: {
              document_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/b53771c4-1072-4696-8c75-f31354c3eac3",
              document_binary_url:
                "http://dm-store-aat.service.core-compute-aat.internal/documents/b53771c4-1072-4696-8c75-f31354c3eac3/binary",
              document_filename: "mockFile.pdf",
            },
          },
          id: "7af65a44-1cea-49bd-8322-cc0472fac67c",
        },
      ],
      cicCaseSchemeCic: "Preference",
      cicCaseRegionCIC: "London",
      cicCaseClaimLinkedToCic: "No",
      cicCaseCompensationClaimLinkCIC: "No",
      cicCaseFormReceivedInTime: "Yes",
    },
    event: {
      id: "caseworker-create-case",
      summary: "",
      description: "",
    },
    event_token: eventToken,
    ignore_warning: false,
    draft_id: null,
  };

  const createCaseResponse = await request.post(
    `${baseUrl}/data/case-types/${caseType}/cases?ignore-warning=false`,
    {
      headers: {
        accept:
          "application/vnd.uk.gov.hmcts.ccd-data-store-api.create-case.v2+json;charset=UTF-8",
        "content-type": "application/json",
        experimental: "true",
        "x-xsrf-token": await getXsrfCookie(page),
      },
      data: createCasePayload,
    },
  );

  const createCaseBody = await createCaseResponse.json();
  const rawCaseId: string | undefined = createCaseBody.id ?? createCaseBody.case_id;
  const caseId = formatCaseReference(rawCaseId!);

  try {
    await page.goto(
      `${baseUrl}/cases/case-details/ST_CIC/CriminalInjuriesCompensation/${rawCaseId}`,
    );
  } catch (e) {
    if (
      !(e as Error).message.includes("interrupted by another navigation") &&
      !(e as Error).message.includes("ERR_ABORTED")
    ) {
      throw e;
    }
  }
  await page.waitForLoadState("domcontentloaded");

  return caseId!;
}