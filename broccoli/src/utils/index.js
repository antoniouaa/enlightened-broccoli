const dateOptions = { day: "2-digit", month: "long", year: "numeric" };

export const dateFormat = (dateString) =>
  new Intl.DateTimeFormat("en-GB", dateOptions).format(Date.parse(dateString));
