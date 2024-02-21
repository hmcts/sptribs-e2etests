import { test } from "@playwright/test";
import { createFEApplication } from "../journeys/DSSCreateCase/createCase.ts";

test.describe("DSS Create case tests. @DSSCreate", () => {
  test("As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("As a Citizen, Create an application with all details, a qualified representative, additional information, no PCQ, and submit - Cy", async ({
    page,
  }) => {
    const cy = true,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with no representative, additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = false,
      representationQualified = false,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with no representative, additional information, no PCQ, and submit - Cy", async ({
    page,
  }) => {
    const cy = true,
      representationPresent = false,
      representationQualified = false,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = false,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with all details, a qualified representative, no additional information, no PCQ, and submit - Cy.", async ({
    page,
  }) => {
    const cy = true,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = false,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit.", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = true,
      representationQualified = false,
      uploadOtherInfo = false,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with all details, no representative, uploading multiple documents, and submitting.", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = false,
      representationQualified = false,
      uploadOtherInfo = true,
      multipleDocuments = true,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Create an application with all details, an unqualified representative, no additional information, no PCQ, and submit - Cy.", async ({
    page,
  }) => {
    const cy = true,
      representationPresent = true,
      representationQualified = false,
      uploadOtherInfo = false,
      multipleDocuments = false,
      completeApplication = true,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Test all back buttons on the Frontend application", async ({
    page,
  }) => {
    const cy = false,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = false,
      backButtonJourney = true,
      accessibilityTest = false,
      errorMessaging = false;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Error messaging", async ({ page }) => {
    const cy = false,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = false,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = true;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });

  test("Error messaging - Cy", async ({ page }) => {
    const cy = true,
      representationPresent = true,
      representationQualified = true,
      uploadOtherInfo = true,
      multipleDocuments = false,
      completeApplication = false,
      backButtonJourney = false,
      accessibilityTest = false,
      errorMessaging = true;
    await createFEApplication(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
      completeApplication,
      backButtonJourney,
      accessibilityTest,
      errorMessaging,
    );
  });
});

test("Accessibility test every page on DSS. @DSSAccessibility", async ({
  page,
}) => {
  const cy = false,
    representationPresent = true,
    representationQualified = true,
    uploadOtherInfo = true,
    multipleDocuments = false,
    completeApplication = false,
    backButtonJourney = false,
    accessibilityTest = true,
    errorMessaging = false;
  await createFEApplication(
    page,
    cy,
    representationPresent,
    representationQualified,
    uploadOtherInfo,
    multipleDocuments,
    completeApplication,
    backButtonJourney,
    accessibilityTest,
    errorMessaging,
  );
});
