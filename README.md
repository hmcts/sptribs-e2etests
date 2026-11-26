# Special Tribunals end-to-end tests

Browser end-to-end (E2E) tests for the Special Tribunals service, written in TypeScript with [Playwright](https://playwright.dev/) and the HMCTS [`@hmcts/playwright-common`](https://github.com/hmcts/playwright-common) package.

Playwright is both the test runner and the framework, and Node.js is the runtime. Accessibility checks use axe-core through `@hmcts/playwright-common`. Cross-browser runs use local Playwright browsers, so no SauceLabs tunnel or subscription is needed.

## What the suite covers

The tests drive the three live Special Tribunals applications through a real browser:

| Application | Repository | What the tests do |
|---|---|---|
| DSS Submit (create a case as a citizen) | [hmcts/sptribs-frontend](https://github.com/hmcts/sptribs-frontend) | Sign in as a citizen, complete the application journey, upload documents and submit. Some tests then check the case is visible to caseworkers. |
| DSS Update (add to an existing case) | [hmcts/sptribs-dss-update-case-web](https://github.com/hmcts/sptribs-dss-update-case-web) | Find an existing case and upload further information. |
| Case API, through Manage Case (XUI) | [hmcts/sptribs-case-api](https://github.com/hmcts/sptribs-case-api) | Caseworker, legal officer and judge journeys: create and build cases, listings and hearings, orders and decisions, stays, flags, linked cases, notes, document management, and Work Allocation tasks. |

The suite also contains a global data clean-up (`@dataCleanup`) that tidies up test cases created by earlier runs.

Unit, integration, contract and smoke tests live in each application's own repository. This repository holds only the browser E2E tests.

## Repository layout

```
playwright.config.ts        Projects, timeouts, retries and workers
scripts/get-secrets.js      Writes .env from the sptribs-aat Key Vault
src/tests/
  config.ts                 Base URLs, test users and test file paths, read from the environment
  E2E/                      Test files (*.test.ts)
  journeys/                 Multi-page flows, one per event or user journey
    CaseAPI/  DSSCreateCase/  DSSUpdateCase/
  pages/                    Page objects
    CaseAPI/  DSSCreateCase/  DSSUpdateCase/  WA/
  helpers/                  Shared helpers: sign-in, dates, uploads, API case creation, clean-up
  fixtures/
    content/                Expected page text, one file per page
    testFiles/              Files used in upload tests
```

See [docs/writing-tests.md](docs/writing-tests.md) for how these fit together and how to add a test.

## Set up

### Requirements

- Node.js. The version is pinned in [`.nvmrc`](.nvmrc).
- Yarn 4 (the version in `packageManager` in [`package.json`](package.json), enabled through Corepack).
- Azure CLI, signed in with `az login`, to read secrets from Key Vault.
- The HMCTS VPN, to reach AAT and Key Vault.

### Install

```bash
yarn install
yarn configure       # playwright install --with-deps
```

### Secrets

```bash
yarn load-secrets
```

This runs [`scripts/get-secrets.js`](scripts/get-secrets.js), which calls `populateSecrets` from `@hmcts/playwright-common` to write a `.env` file from the `sptribs-aat` Key Vault. `.env` is git-ignored.

If you cannot read the vault, copy [`.env.example`](.env.example) to `.env` and fill in the values by hand. The file lists every variable the tests read:

- `DSS_BASE_URL`, `CASEAPI_BASE_URL` and `UC_BASE_URL`: the application base URLs.
- Username and password pairs for the test users: citizen, respondent, super user, demo citizen, and the Work Allocation roles (caseworker, senior caseworker, hearing centre admin and team lead, regional hearing centre admin and team lead, CTSC admin and team lead, respondent, President of the Tribunal, and salaried and fee-paid judges).
- `IDAM_SECRET`, `TEST_PASSWORD` and `GITHUB_TOKEN`.

[`src/tests/config.ts`](src/tests/config.ts) reads these variables. If one is unset it falls back to a placeholder, so tests start but fail at sign-in or navigation.

## Run the tests

Each script runs a Playwright project (browser) and filters tests by tag with `--grep`.

### DSS Submit

| Command | Project | Tag |
|---|---|---|
| `yarn test:ChromeDSS` | `chromium` | `@DSSCreate` |
| `yarn test:FirefoxDSS` | `firefox` | `@createDSSFirefox` |
| `yarn test:WebkitDSS` | `webkit` | `@createDSSWebkit` |
| `yarn test:CrossDeviceDSS` | `tabletWebkit`, `tabletchrome` | `@DSSCreate` |

### DSS Update

| Command | Project | Tag |
|---|---|---|
| `yarn test:ChromeUC` | `chromium` | `@DSSUpdate` |
| `yarn test:FirefoxUC` | `firefox` | `@updateDSSFirefox` |
| `yarn test:WebkitUC` | `webkit` | `@updateDSSWebkit` |
| `yarn test:CrossDeviceUC` | `tabletWebkit`, `tabletchrome` | `@DSSUpdate` |

### Case API

| Command | Project | Tag |
|---|---|---|
| `yarn test:ChromeCaseAPI` | `chromium` | `@CaseAPI` |
| `yarn test:ChromeCaseAPI1` | `chromium` | `@CaseAPI1` |
| `yarn test:ChromeCaseAPI2` | `chromium` | `@CaseAPI2` |
| `yarn test:ChromeCaseAPI3` | `chromium` | `@CaseAPI3` |
| `yarn test:FirefoxCaseAPI` | `firefox` | `@crossbrowserCaseAPI` |
| `yarn test:WebkitCaseAPI` | `webkit` | `@crossbrowserCaseAPI` |
| `yarn test:CrossDeviceCaseAPI` | `tabletWebkit`, `tabletchrome` | `@CaseAPI` |

`@CaseAPI1`, `@CaseAPI2` and `@CaseAPI3` split the Case API tests into three batches for the nightly pipeline.

### Other suites

| Command | What it runs |
|---|---|
| `yarn test:ci` | `@continuousIntegration` tests in Chromium with a 5-minute test timeout. Used for preview deployments. |
| `yarn test:accessibility` | `@accessibility` tests in Chromium. |
| `yarn test:errorMessaging` | `@ErrorMessaging` tests in Chromium. |
| `yarn test:dataCleanUp` | The global data clean-up (`@dataCleanup`) in Chromium. |
| `yarn test:fullfunctional` | Every test in Chromium. |
| `yarn test:crossbrowser` | Every test in Firefox and WebKit. |
| `yarn test:ui` | Chromium in headed mode. Add `--ui` for Playwright UI mode, or `--grep` to pick tests. |
| `yarn test:report` | Opens the last HTML report from `playwright-report/`. |
| `yarn lint` | Runs Prettier over the repository. It also runs as a pre-commit hook. |

To run a single file or test, pass Playwright arguments directly:

```bash
npx playwright test src/tests/E2E/addNote.test.ts --project chromium --headed
npx playwright test --project chromium --grep "Add a note"
```

An IDE with Playwright support (for example the VS Code Playwright extension or IntelliJ) can run individual tests from the gutter. Use `--project chromium --headed` to watch a run.

## Tags and projects

Tags are written into the `test.describe` or `test` title, for example `test.describe("Case-API Add note tests. @CaseAPI", ...)`, and selected with `--grep`. The tags in use are:

| Tag | Meaning |
|---|---|
| `@DSSCreate`, `@DSSUpdate`, `@CaseAPI` | The full Chromium suite for each application |
| `@CaseAPI1`, `@CaseAPI2`, `@CaseAPI3` | Case API batches for the nightly pipeline |
| `@createDSSFirefox`, `@createDSSWebkit`, `@updateDSSFirefox`, `@updateDSSWebkit`, `@crossbrowserCaseAPI` | The subsets run in Firefox and WebKit |
| `@continuousIntegration` | The subset run against preview deployments |
| `@accessibility` | Journeys run with axe checks on each page |
| `@ErrorMessaging` | Validation and error-message checks |
| `@dataCleanup` | Global test data clean-up |

[`playwright.config.ts`](playwright.config.ts) extends `CommonConfig.recommended` from `@hmcts/playwright-common` and sets:

- `testDir`: `./src/tests/E2E`
- test timeout: 7 minutes, expect timeout: 2 minutes
- workers: 10 (override with `--workers`)
- retries: 4
- projects: `chromium`, `firefox`, `webkit`, `tabletChrome`, `tabletWebkit` and `edge`, all taken from `ProjectsConfig` in `@hmcts/playwright-common`

## Choose an environment

The tests read the base URLs from the environment, so you can point them at any environment.

### AAT

```bash
export DSS_BASE_URL=https://sptribs-frontend.aat.platform.hmcts.net
export UC_BASE_URL=https://sptribs-dss-update-case-web.aat.platform.hmcts.net/
export CASEAPI_BASE_URL=https://manage-case.aat.platform.hmcts.net/cases
yarn test:ChromeDSS
```

These are the defaults the Jenkins jobs use.

### A preview deployment

Each pull request on an application repository deploys to preview. Set the URLs for the PRs you want to test and run the `@continuousIntegration` subset:

```bash
export DSS_BASE_URL=https://sptribs-frontend-pr-<PR>.preview.platform.hmcts.net
export UC_BASE_URL=https://sptribs-dss-update-case-web-pr-<PR>.preview.platform.hmcts.net
export CASEAPI_BASE_URL=https://xui-sptribs-case-api-pr-<PR>.preview.platform.hmcts.net
yarn test:ci
```

The Case API preview URL is the XUI deployed with the case-api PR. DSS tests that check a submitted case in Case API need a matching case-api deployment, so when you test a frontend PR on its own, keep `CASEAPI_BASE_URL` on AAT.

Case API tests that start from a DSS-submitted case are skipped when `skipDSSCreateTests` is set to any non-empty value.

## How pipelines call it

### `Jenkinsfile_CNP`

A parameterised Jenkins job ("Build with parameters") built on `withNightlyPipeline`. It takes:

| Parameter | Default | Mapped to |
|---|---|---|
| `ENVIRONMENT` | `aat` | The Key Vault environment (`sptribs-<env>`) |
| `SPTRIBS_CASEAPI_URL` | `https://manage-case.aat.platform.hmcts.net/cases` | `CASEAPI_BASE_URL` |
| `SPTRIBS_FRONTEND_URL` | `https://sptribs-frontend.aat.platform.hmcts.net` | `DSS_BASE_URL` |
| `SPTRIBS_UPDATE_URL` | `https://sptribs-dss-update-case-web.aat.platform.hmcts.net/` | `UC_BASE_URL` |

It loads the test secrets from the `sptribs-<env>` vault and installs Playwright. When `SPTRIBS_CASEAPI_URL` contains `preview`, it runs `yarn test:ci` and publishes the HTML report.

The [sptribs-case-api](https://github.com/hmcts/sptribs-case-api) pipeline triggers this job when a pull request has the `enable-e2e-tests` label. It passes the PR's XUI URL as `SPTRIBS_CASEAPI_URL`, waits for the job to finish and passes its result back to the case-api build. You can also start the job by hand in Jenkins to test any combination of URLs.

### `Jenkinsfile_nightly`

Runs on weekdays (cron `H 8 * * 1-5`) against AAT. It takes the same URL parameters, plus `FUNCTIONAL_TESTS_WORKERS` and three skip flags: `skipDSSCreateTests`, `skipDSSUpdateTests` and `skipCaseAPITests`. The stages are:

1. Delete the `nightly-dev` branch of this repository (`yarn delete-branch`).
2. Install Playwright (`yarn configure`).
3. Global data clean-up (`yarn test:dataCleanUp`).
4. DSS Submit in Chrome, Firefox and WebKit.
5. DSS Update in Chrome, Firefox and WebKit.
6. Case API Chrome batches 1 and 2, a data clean-up, then Case API Chrome batch 3, Firefox and WebKit.
7. Accessibility tests (`yarn test:accessibility`).
8. A final data clean-up.

A failing stage marks the build unstable and the pipeline continues. Each test stage publishes its own HTML report in Jenkins. Results go to the `#special-tribunals-builds` Slack channel.

## Reports

- Locally: `yarn test:report` opens `playwright-report/index.html`.
- In Jenkins: each stage publishes a report named after the application and browser, for example "DSS Create Case Application Chrome E2E Test Report".

## Contributing

- Write tests in TypeScript and follow the patterns in [docs/writing-tests.md](docs/writing-tests.md).
- Tag every new test so a pipeline picks it up.
- Run `yarn lint` before you push. The pre-commit hook runs it too.
- Dependencies are updated by Renovate ([`renovate.json`](renovate.json)).
