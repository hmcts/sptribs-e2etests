import { Template } from "../issueFinalDecision/selectTemplatePage.ts";
import orderMainContent_content from "../../../fixtures/content/CaseAPI/createDraft/orderMainContent_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import { Page } from "@playwright/test";
import addDocumentFooter_content from "../../../fixtures/content/CaseAPI/createDraft/addDocumentFooter_content.ts";
import ordersAndDecisionsTab_content from "../../../fixtures/content/CaseAPI/caseTabs/ordersAndDecisionsTab_content.ts";

type OrdersAndDecisionsTabPage = {
  checkDraftOrder(page: Page, template: Template): Promise<void>;
};

const ordersAndDecisionsTabPage: OrdersAndDecisionsTabPage = {
  async checkDraftOrder(page: Page, template: Template): Promise<void> {
    await Promise.all([
      ...Array.from({ length: 6 }, (_, index) => {
        const draft = (ordersAndDecisionsTab_content as any)[
          `draft${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("${draft}")`),
          1,
        );
      }),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("${template}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(`span:text-is("${orderMainContent_content.description}")`),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.text-16:text-is("${addDocumentFooter_content.signature}")`,
        ),
        1,
      ),
    ]);
  },
};

export default ordersAndDecisionsTabPage;
