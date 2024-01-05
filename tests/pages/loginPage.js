const config = require("../config");

module.exports = {
  fields: {
    username: "#username",
    password: "#password",
  },
  submitButton: 'input[value="Sign in"]',

  async SignInUser(page) {
    await page.waitForSelector(
      `#skiplinktarget:text("Sign in or create an account")`,
    );
    await page.fill(this.fields.username, config.citizen.email);
    await page.fill(this.fields.password, config.citizen.password);
    await page.click(this.submitButton);
  },
};
