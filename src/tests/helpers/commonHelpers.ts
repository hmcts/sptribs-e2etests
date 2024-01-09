import subjectDetailsPage from "../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";

type CommonHelpers = {
  readonly months: string[];
  padZero(value: number): Promise<string>;
  convertDate(tab: string): Promise<string>;
  getTimestamp(): Promise<string>;
};

const months: string[] = [
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

// Add a zero before a value if it is under 10 - used for timestamp
function padZero(value: number): string | number {
  return value < 10 ? "0" + value : value;
}

async function convertDate(tab: string): Promise<string> {
  const dayOfBirth = subjectDetailsPage.dayOfBirth;
  const monthOfBirth = subjectDetailsPage.monthOfBirth;
  const yearOfBirth = subjectDetailsPage.yearOfBirth;
  const monthName = months[Number(monthOfBirth) - 1];
  if (tab) {
    return `${dayOfBirth} ${monthName.slice(0, 3)} ${yearOfBirth}`;
  } else {
    return `${dayOfBirth} ${monthName} ${yearOfBirth}`;
  }
}

async function getTimestamp(): Promise<string> {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${currentDate.getDate()} ${months[currentDate.getMonth()].slice(
    0,
    3,
  )} ${currentDate.getFullYear()}, ${hours}:${padZero(
    currentDate.getMinutes(),
  )}`;
}

export default {
  convertDate,
  getTimestamp,
};
