const { expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

async function axeTest(page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  await expect(accessibilityScanResults.violations).toEqual([]);
}

module.exports = {
  axeTest,
};
