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

const maleBMR = ({ weight, height, age }) =>
  66.47 + 13.75 * +weight + 5.003 * +height - 6.755 * +age;
const femaleBMR = ({ weight, height, age }) =>
  655.1 + 9.563 * +weight + 1.85 * +height - 4.676 * +age;
export const BMR = ({ sex, ...rest }) =>
  Math.round(sex === "male" ? maleBMR(rest) : femaleBMR(rest));
const multipliers = {
  sed: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.75,
  extreme: 1.95,
};
const extraCalories = {
  lose: 0.8,
  maintain: 1,
  gain: 1.2,
};
export const sedentaryCalories = (bmr) => Math.round(bmr * multipliers.sed);
export const target = (goal, bmr) =>
  Math.round(sedentaryCalories(bmr) * extraCalories[goal]);

export const energyExpenditures = (userStats) => {
  const basal = BMR(userStats);
  const sedentary = Math.round(basal * multipliers.sed);
  return {
    basal,
    sedentary,
    target: Math.round(sedentary * extraCalories[userStats.goal]),
  };
};

export const titleCase = (string) =>
  string
    .split("")
    .map((letter, index) => (index == 0 ? letter.toUpperCase() : letter))
    .join("");
