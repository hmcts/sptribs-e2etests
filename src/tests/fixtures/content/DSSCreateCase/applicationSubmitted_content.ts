import subjectDetailsContent from "./SubjectContactDetails_content.ts";

const applicationSubmittedContent = {
  pageTitle: "Tribunal form sent",
  subTitle1: "Case Number:",
  textOnPage1: "Your tribunal form and related documents have been sent.",
  textOnPage2:
    "An email will be sent to " +
    subjectDetailsContent.emailAddress +
    ", that explains what happens next.",
  subTitle2: "Feedback",
  textOnPage3: "We would like to hear your thoughts",
  textOnPage4:
    "Complete this short 5-minutes survey to help improve our services for you and others",
  textOnPage5: "Please leave your your feedback",
  button: "Close and exit",

  welshPageTitle: "Ffurflen y tribiwnlys wedi’i hanfon",
  welshSubTitle1: "Rhif Achos:",
  welshTextOnPage1: "Mae ffurflenni’r tribiwnlys a’ch dogfennau perthnasol wedi’u hanfon.",
  welshTextOnPage2:
    "Fe anfonir neges e-bost i " +
    subjectDetailsContent.emailAddress +
    ", i esbonio beth fydd yn digwydd nesaf.",
  welshSubTitle2: "Feedback",
  welshTextOnPage3: "Hoffwn glywed eich barn",
  welshTextOnPage4:
    "Llenwch yr arolwg byr hwn, sy’n cymryd 5 munud i’w lenwi, i’n helpu i wella ein gwasanaethau i chi a phobl eraill ",
  welshTextOnPage5: "Rhowch eich adborth os gwelwch yn dda",
  welshButton: "Cau ac ymadael",
};

export default applicationSubmittedContent;
