# Special Tribunals E2E tests in raw Playwright.

## Getting Started

### Brief introduction

This application uses Playwright.ts as both a test runner, and framework, and node.js as a runtime environment. It makes use of axe-core accessibility tools, and does not require a SauceLabs tunnel or subscription to run in crossbrowser mode. The tests are set to run five concurrently, this can be altered in the Playwright.config.ts file, as well as timeouts, and other small changes.

We make use of TypeScript, and follow the strict type declarations, no .js files should appear in this repository as .js is disabled.

### Requirements

To run the application on your pc, please ensure you have the following:

- node.js version 20 or above
- jq
- azure-cli

### Running the tests locally

Please install the dependencies with the following cmd:

`yarn configure`

`yarn install`

You will need to run the `./scripts/get_secrets.sh` script to create the `.env` file, which is used to store secrets for the application. This will create a `.env` file in the root of the repository.

### To run the e2e tests:

There are several commands you can run, these include:

- `yarn test:fullfunctional` - this will run every E2E test against the URLS configured in tests/config.js, in a Chromium browser only.
- `yarn test:crossbrowser` - this will run every E2E test against the URLS configured in tests/config.js, in a Chromium, Firefox, and Webkit browsers.
- `yarn test:ChromeDSS` - this will run the E2E tests for the DSS Submit application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.
- `yarn test:CrossbrowserDSS` - this will run the E2E tests for the DSS Submit application against the URL configured in tests/config.js, in a Chromium, Firefox, and Webkit browsers, which is used in our Jenkins pipeline.
- `yarn test:CrossDeviceDSS` - this will run the E2E tests for the DSS Submit application against the URL configured in tests/config.js, in a mobile Chromium and Webkit browsers - this does not work well.
- `yarn test:AccessibilityDSS` - this will run the Accessibility tests for the DSS Submit application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.
- `yarn FunctionalCaseAPI` - this will run the E2E tests for the Case API application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.
- `yarn test:FirefoxCaseAPI` - this will run the E2E tests for the Case API application against the URL configured in tests/config.js, in a Firefox browser, which is used in our Jenkins pipeline.
- `yarn test:CrossDeviceCaseAPI` - this will run the E2E tests for the Case API application against the URL configured in tests/config.js, in a mobile Chromium and Webkit browsers - this does not work well.
- `yarn test:AccessibilityCaseAPI` - this will run the Accessibility tests for the Case API application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.
- `yarn FunctionalUC` - this will run the E2E tests for the DSS Update application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.
- `yarn test:CrossbrowserUC` - this will run the E2E tests for the DSS Update application against the URL configured in tests/config.js, in a Chromium, Firefox, and Webkit browsers, which is used in our Jenkins pipeline.
- `yarn test:CrossDeviceUC` - this will run the E2E tests for the DSS Update application against the URL configured in tests/config.js, in a mobile Chromium and Webkit browsers - this does not work well.
- `yarn test:AccessibilityUC` - this will run the Accessibility tests for the DSS Update application against the URL configured in tests/config.js, in a Chromium browser only, which is used in our Jenkins pipeline.

As well as this, we have:

- `yarn test:ui` - To run a test in UI mode.
- `yarn lint` - to run prettier on the repository, this is also done as part of a pre commit hook.

Accessibility testing is done as a part of the tests marked @\_\_\_\_Accessibility, and run as a part of our pipeline.

### Running the application locally.

Should you wish to run a test locally, I recommend using Intellij Aqua, and you can press the green play button against any of the tests defined in \_\_\_.test.ts.
Should you wish to run in headed mode, you can select modify run configuration, and then change the playwright options, the following are recommended:
`--project chromium --headed`
This runs a test in Chrome, whilst headed.

### To obtain an E2E report, use the following command:

`yarn test:report`

### Our Jenkins configuration

Should you wish to run the pipeline, you can do so by accessing it in Jenkins, and if you wish to run it against a specific URL, for example a PR branch, the "Build with parameters" is configured to allow you to do so, as well as skip certain applications being tested.

Please note: running the DSS E2E tests in a pipeline on a PR branch without an associated Case-API PR branch are likely to cause them to fail, as those E2E's check for the visibility of the case within Case-API.
