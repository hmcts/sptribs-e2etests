import axios from "axios";

type AccessTokenResponse = {
  access_token: string;
};

const environment = "aat";
const idamBaseUrl =
  process.env.IDAM_BASE_URL ||
  `https://idam-web-public.${environment}.platform.hmcts.net`;
const idamTestSupportBaseUrl =
  process.env.IDAM_TESTING_SUPPORT_URL ||
  `https://idam-testing-support-api.${environment}.platform.hmcts.net`;

const idamClientId = process.env.IDAM_CLIENT_ID;
const idamClientSecret = process.env.OAUTH2_CLIENT_SECRET;
const waPresidentOfTribunalUsername =
  process.env.WA_PRESIDENT_OF_TRIBUNAL_USERNAME;
const waPresidentOfTribunalPassword =
  process.env.WA_PRESIDENT_OF_TRIBUNAL_PASSWORD;
const waPresidentOfTribunalId =
  process.env.WA_PRESIDENT_OF_TRIBUNAL_ID;

const roleNames = [
  "caseworker",
  "caseworker-sscs",
  "caseworker-sscs-judge",
  "hmcts-judiciary",
  "specific-access-approver-judiciary",
  "judge",
  "hearing-viewer",
  "task-supervisor",
  "case-allocator",
  "leadership-judge",
  "post-hearing-salaried-judge",
  "senior-judge",
  "sscs-judge",
  "sscs-leadership-judge",
  "st_cic-leadership-judge",
  "sscs-post-hearing-salaried-judge",
  "st_cic-senior-judge",
  "st_cic-judge",
];

const assertEnv = (
  value: string | undefined,
  name: string,
): asserts value is string => {
  if (!value) {
    throw new Error(`Environment variable ${name} is required.`);
  }
};

export const getClientAccessToken = async (): Promise<string> => {
  assertEnv(idamClientId, "IDAM_CLIENT_ID");
  assertEnv(idamClientSecret, "OAUTH2_CLIENT_SECRET");

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", idamClientId);
  params.append("client_secret", idamClientSecret);
  params.append("scope", "profile roles");

  const { data } = await axios.post<AccessTokenResponse>(
    `${idamBaseUrl}/o/token`,
    params.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  if (!data?.access_token) {
    throw new Error("Unable to obtain client credentials access token.");
  }

  return data.access_token;
};

const userExists = async (
  accessToken: string,
  email: string,
): Promise<boolean> => {
  try {
    await axios.get(`${idamTestSupportBaseUrl}/test/idam/users`, {
      params: { email },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    throw error;
  }
};

const createUser = async (accessToken: string): Promise<void> => {
  assertEnv(waPresidentOfTribunalUsername, "WA_PRESIDENT_OF_TRIBUNAL_USERNAME");
  assertEnv(waPresidentOfTribunalPassword, "WA_PRESIDENT_OF_TRIBUNAL_PASSWORD");

  await axios.post(
    `${idamTestSupportBaseUrl}/test/idam/users`,
    {
      password: waPresidentOfTribunalPassword,
      user: {
        id: waPresidentOfTribunalId,
        email: waPresidentOfTribunalUsername,
        forename: "Zaara",
        surname: "Duke",
        roleNames,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const ensureWaPresidentOfTribunalUser = async (): Promise<void> => {
  assertEnv(waPresidentOfTribunalUsername, "WA_PRESIDENT_OF_TRIBUNAL_USERNAME");

  const accessToken = await getClientAccessToken();
  const exists = await userExists(accessToken, waPresidentOfTribunalUsername);

  if (exists) {
    console.log(
      `[idam-user-helper] User ${waPresidentOfTribunalUsername} already exists.`,
    );
    return;
  }

  console.log(
    `[idam-user-helper] Creating user ${waPresidentOfTribunalUsername}.`,
  );
  await createUser(accessToken);
};
