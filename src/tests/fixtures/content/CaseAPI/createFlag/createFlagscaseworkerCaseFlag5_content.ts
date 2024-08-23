const createFlags5ReasonableAdjustment_content = {
  pageTitle: "Create Flag",
  caseReference: "Case number: ",
  subTitle1: " Add comments for this flag",
  textOnPage1:
    " Explain why you are creating this flag. Do not include any sensitive information such as personal details. ",
  textOnPage2: " You can enter up to 200 characters ",

  commentInputText: " Test comments for flag ",

  errorBanner: " There is a problem ",
  errorMessage1: " Please enter comments for this flag ",
  // handle error message for > 200 characters
} as const;

export default createFlags5ReasonableAdjustment_content;
