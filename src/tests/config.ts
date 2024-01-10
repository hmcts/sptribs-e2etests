import path from "path";

interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

// To get the secrets values to run locally, look in the azure secrets vault, and replace the strings below with
// their key value, do not commit raw values as this will show on the Git history.

// users
const config: {
  caseWorker: UserCredentials;
  seniorCaseworker: UserCredentials;
  hearingCentreAdmin: UserCredentials;
  hearingCentreTeamLead: UserCredentials;
  judge: UserCredentials;
  seniorJudge: UserCredentials;
  respondent: UserCredentials;
  citizen: UserCredentials;
  superUser: UserCredentials;

  // base urls
  readonly FEBaseURL: string;
  readonly CaseAPIBaseURL: string;

  // files
  testFile: string;
  testPdfFile: string;
  testWordFile: string;
  testOdtFile: string;
} = {
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

  FEBaseURL: process.env.FEBASEURL || "FEBaseURL",
  CaseAPIBaseURL: process.env.CASEAPIBASEURL || "CaseAPIBaseURL",

  testFile: path.resolve(__dirname, '../tests/fixtures/testFiles/mockFile.txt'),
  testPdfFile: path.resolve(__dirname, '../tests/fixtures/testFiles/mockFile.pdf'),
  testWordFile: path.resolve(__dirname, '../tests/fixtures/testFiles/mockFile.docx'),
  testOdtFile: path.resolve(__dirname, '../tests/fixtures/testFiles/mockFile.odt'),
};

export default config;
