const editDueDate_content = {
  pageHint: "Orders: Manage due date",
  pageTitle: "Amend due dates",

  caseReference: "Case number: ",

  subTitle1: "Due Date (Optional)",
  subTitle2: "Due Date",
  subTitle3: "Due Date 2",

  textOnPage1: "Day",
  textOnPage2: "Month",
  textOnPage3: "Year",
  textOnPage4: "Due Date information (Optional)",
  textOnPage5: "Completed (Optional)",
  textOnPage6: "Yes",

  errorBanner: " There is a problem ",
  errorBlank1: " Field is not valid ",
  errorBlank2: " The data entered is not valid for Field ",

  day: "2",
  month: "2",
  year: `${new Date().getFullYear() + 1}`,
  information: "Updated Optional Information",
} as const;

export default editDueDate_content;
