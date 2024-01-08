export function convertDateTime(utcTimestamp) {
  const date = new Date(utcTimestamp);
  const extractedDate = date.toDateString();
  return extractedDate;
}
