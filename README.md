# Special Tribunals Raw Playwright proof of concept - a recreation of the Special Tribunals Frontend E2E tests.

## Getting Started

### Requirements

To run the application on your pc, please ensure you have the followings:

Node.JS v20.10.0  
yarn

### Running the application on local environment

Please install the dependencies with the following cmd:

`yarn configure`   

`yarn install`

### To run the e2e test, use the following command:

`yarn test`

### To run the e2e test in ui mode, use the following command:

`yarn test:ui`

### To run the e2e test in cross browser mode, use the following command:

These tests are run using Playwright's in-built cross browser functionality, so no saucelabs tunnel is required.

`yarn test:crossbrowser`

### Axe Accessibility testing

Accessibility testing is done as a part of the test "As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit - aXe test as it proceeds." which is located in tests/e2e/createCaseFE.test.js, the helper for this is located tests/helpers/accessibilityTestHelper.js.

### To obtain an E2E report, use the following command:

`yarn test:report`
