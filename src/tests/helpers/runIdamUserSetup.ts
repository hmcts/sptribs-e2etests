import { ensureWaPresidentOfTribunalUser } from "./idamUserHelper.ts";

ensureWaPresidentOfTribunalUser().catch((error) => {
  if (error && typeof error === "object" && "response" in error) {
    // Axios-style error payload logging for easier debugging
    const axiosError = error as {
      response?: { status?: number; data?: unknown };
      message?: string;
    };
    console.error(
      "[idam-user-helper] Failed to ensure IDAM user exists.",
      axiosError.response?.status ?? "",
      axiosError.response?.data ?? axiosError.message ?? error,
    );
  } else {
    console.error("[idam-user-helper] Failed to ensure IDAM user exists.", error);
  }
  process.exit(1);
});
