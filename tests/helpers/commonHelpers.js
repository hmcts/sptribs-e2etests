const subjectDetailsPage = require("../fixtures/content/SubjectDetails_content");

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

function convertDate(tab) {
  const dayOfBirth = subjectDetailsPage.dayOfBirth;
  const monthOfBirth = subjectDetailsPage.monthOfBirth;
  const yearOfBirth = subjectDetailsPage.yearOfBirth;
  const monthName = months[Number(monthOfBirth) - 1];
  if (tab) {
    return `${dayOfBirth} ${monthName.slice(0, 3)} ${yearOfBirth}`;
  } else{
    return `${dayOfBirth} ${monthName} ${yearOfBirth}`;
  }
}

function getTimestamp() {
  function padZero(value) {
    return value < 10 ? '0' + value : value;
  }
  const currentDate = new Date();
  let hours = currentDate.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${currentDate.getDate()} ${months[currentDate.getMonth()].slice(0, 3)} ${currentDate.getFullYear()}, ${hours}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())} ${ampm}`;

}

module.exports = {
  convertDate, getTimestamp
};