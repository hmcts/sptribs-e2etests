const subjectDetailsPage = require("../fixtures/content/SubjectDetails_content");

function convertDate(tab) {
  const dayOfBirth = subjectDetailsPage.dayOfBirth;
  const monthOfBirth = subjectDetailsPage.monthOfBirth;
  const yearOfBirth = subjectDetailsPage.yearOfBirth;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[Number(monthOfBirth) - 1];
  if (tab) {
    return `${dayOfBirth} ${monthName.slice(0, 3)} ${yearOfBirth}`;
  } else{
    return `${dayOfBirth} ${monthName} ${yearOfBirth}`;
  }
}

module.exports = {
  convertDate,
};