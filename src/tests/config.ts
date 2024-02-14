import path from "path";

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export type UserRole =
  | "caseWorker"
  | "seniorCaseworker"
  | "hearingCentreAdmin"
  | "hearingCentreTeamLead"
  | "judge"
  | "seniorJudge"
  | "respondent"
  | "citizen"
  | "superUser";

interface Config {
  [key: string]: UserCredentials | string;
}

const config: Config = {
  caseWorker: {
    email: process.env.CASEWORKER_USERNAME || "caseworker-user",
    password: process.env.CASEWORKER_PASSWORD || "caseworker-password",
  },
  seniorCaseworker: {
    email: process.env.SENIOR_CASEWORKER_USERNAME || "seniorCaseworker-user",
    password:
      process.env.SENIOR_CASEWORKER_PASSWORD || "seniorCaseworker-password",
  },
  hearingCentreAdmin: {
    email:
      process.env.HEARING_CENTRE_ADMIN_USERNAME || "hearingCentreAdmin-user",
    password:
      process.env.HEARING_CENTRE_ADMIN_PASSWORD ||
      "hearingCentreAdmin-password",
  },
  hearingCentreTeamLead: {
    email:
      process.env.HEARING_CENTRE_TEAM_LEAD_USERNAME ||
      "hearingCentreTeamLead-user",
    password:
      process.env.HEARING_CENTRE_TEAM_LEAD_PASSWORD ||
      "hearingCentreTeamLead-password",
  },
  judge: {
    email: process.env.JUDGE_USERNAME || "judge-user",
    password: process.env.JUDGE_PASSWORD || "judge-password",
  },
  seniorJudge: {
    email: process.env.SENIOR_JUDGE_USERNAME || "seniorJudge-user",
    password: process.env.SENIOR_JUDGE_PASSWORD || "seniorJudge-password",
  },
  respondent: {
    email: process.env.RESPONDENT_USERNAME || "respondent-user",
    password: process.env.RESPONDENT_PASSWORD || "respondent-password",
  },
  citizen: {
    email: process.env.CITIZEN_USERNAME || "citizen-user",
    password: process.env.CITIZEN_PASSWORD || "citizen-password",
  },
  superUser: {
    email: process.env.SUPER_USER_USERNAME || "superUser-user",
    password: process.env.SUPER_USER_PASSWORD || "superUser-password",
  },

  FEBaseURL: process.env.DSS_BASE_URL || "FEBaseURL",
  CaseAPIBaseURL: process.env.CASEAPI_BASE_URL || "CaseAPIBaseURL",
  UpdateCaseBaseURL: process.env.UC_BASE_URL || "UpdateCaseBaseURL",

  testFile: path.resolve(__dirname, "../tests/fixtures/testFiles/mockFile.txt"),
  testPdfFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.pdf",
  ),
  testWordFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.docx",
  ),
  testOdtFile: path.resolve(
    __dirname,
    "../tests/fixtures/testFiles/mockFile.odt",
  ),
};

export default config as {
  [key in UserRole]: UserCredentials;
} & {
  FEBaseURL: string;
  CaseAPIBaseURL: string;
  UpdateCaseBaseURL: string;
  testFile: string;
  testPdfFile: string;
  testWordFile: string;
  testOdtFile: string;
};
