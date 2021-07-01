const dateOptions = { day: "2-digit", month: "long", year: "numeric" };

export const dateFormat = (dateString) =>
  new Intl.DateTimeFormat("en-GB", dateOptions).format(Date.parse(dateString));

export const dateStringSlashes = (dateString) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(Date.parse(dateString));

export const dayNameFromDate = (dateString) => {
  const date = new Date(dateString);
  return weekLabels[date.getDay()];
};

export const oneDayTime = 24 * 60 * 60 * 1000;

export const weekLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
