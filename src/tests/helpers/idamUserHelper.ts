import axios from "axios";

type AccessTokenResponse = {
  access_token: string;
};

type IdamUser = {
  id: string;
  email: string;
  roleNames?: string[];
};

const environment = process.env.ENVIRONMENT || "aat";
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
const waPresidentOfTribunalId = process.env.WA_PRESIDENT_OF_TRIBUNAL_ID;

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

const fetchUserByEmail = async (
  accessToken: string,
  email: string,
): Promise<IdamUser | null> => {
  try {
    const { data } = await axios.get<IdamUser>(
      `${idamTestSupportBaseUrl}/test/idam/users`,
      {
        params: { email },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

const deleteUser = async (
  accessToken: string,
  userId: string,
): Promise<void> => {
  await axios.delete(
    `${idamTestSupportBaseUrl}/test/idam/users/${encodeURIComponent(userId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

const rolesMatch = (
  existing: string[] | undefined,
  expected: string[],
): boolean => {
  const normalize = (list: string[] = []) =>
    [...new Set(list)].map((r) => r.trim()).filter(Boolean).sort();

  const existingSorted = normalize(existing || []);
  const expectedSorted = normalize(expected);

  if (existingSorted.length !== expectedSorted.length) {
    return false;
  }

  return existingSorted.every((role, index) => role === expectedSorted[index]);
};

const ensureRolesExist = async (accessToken: string): Promise<void> => {
  await Promise.all(
    roleNames.map(async (role) => {
      try {
        await axios.post(
          `${idamTestSupportBaseUrl}/test/idam/roles`,
          { name: role },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          // Role already exists
          return;
        }
        throw error;
      }
    }),
  );
};

const createUser = async (accessToken: string): Promise<void> => {
  assertEnv(waPresidentOfTribunalUsername, "WA_PRESIDENT_OF_TRIBUNAL_USERNAME");
  assertEnv(waPresidentOfTribunalPassword, "WA_PRESIDENT_OF_TRIBUNAL_PASSWORD");
  assertEnv(waPresidentOfTribunalId, "WA_PRESIDENT_OF_TRIBUNAL_ID");

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
  await ensureRolesExist(accessToken);

  const existingUser = await fetchUserByEmail(
    accessToken,
    waPresidentOfTribunalUsername,
  );

  if (existingUser) {
    if (rolesMatch(existingUser.roleNames, roleNames)) {
      console.log(
        `[idam-user-helper] User ${waPresidentOfTribunalUsername} already exists with expected roles.`,
      );
      return;
    }

    console.log(
      `[idam-user-helper] User ${waPresidentOfTribunalUsername} has out-of-date roles. Deleting and recreating.`,
    );
    await deleteUser(accessToken, existingUser.id);
    await createUser(accessToken);
    return;
  }

  console.log(
    `[idam-user-helper] Creating user ${waPresidentOfTribunalUsername}.`,
  );
  await createUser(accessToken);
};
