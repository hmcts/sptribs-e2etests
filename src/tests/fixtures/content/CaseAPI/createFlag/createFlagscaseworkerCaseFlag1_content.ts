import caseSubjectDetailsObject_content from "../createCase/caseSubjectDetailsObject_content";
import caseRepresentativeDetailsObject_content from "../createCase/caseRepresentativeDetailsObject_content";
import caseApplicantDetailsObject_content from "../createCase/caseApplicantDetailsObject_content";

const createFlags1_content = {
  pageTitle: "Create Flag",
  caseReference: "Case number: ",
  subTitle1: "Where should this flag be added?",
  textOnPage1: `${caseApplicantDetailsObject_content.name} (applicant)`,
  textOnPage2: "Case level",
  textOnPage3: `${caseRepresentativeDetailsObject_content.name} (Representative)`,
  textOnPage4: `${caseSubjectDetailsObject_content.name} (subject)`,

  errorBanner: " There is a problem ",
  errorMessage: " Please make a selection ",
} as const;

export default createFlags1_content;
