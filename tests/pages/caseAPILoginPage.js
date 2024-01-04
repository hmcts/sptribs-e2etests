const config = require("../config");

module.exports = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page) {
    await page.goto(config.CaseAPIBaseURL);
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );
    await page.fill(this.fields.username, config.caseWorker.email);
    await page.fill(this.fields.password, config.caseWorker.password);
    await page.click(this.submitButton);
  },
};
