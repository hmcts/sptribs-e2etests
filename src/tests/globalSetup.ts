import { ensureWaPresidentOfTribunalUser } from "./helpers/idamUserHelper.ts";

export default async function globalSetup(): Promise<void> {
  await ensureWaPresidentOfTribunalUser();
}
