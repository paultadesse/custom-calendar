const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const _weekdayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const _monthLabels = [
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
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};

const _displayKeyOptions = [
  { id: "label", value: "label", label: "Label" },
  { id: "number", value: "day", label: "Day" },
  { id: "weekday", value: "weekday", label: "Weekday" },
  { id: "week", value: "week", label: "Week" },
  { id: "month", value: "month", label: "Month" },
  { id: "year", value: "year", label: "Year" },
  { id: "beforeMonth", value: "beforeMonth", label: "Before Month" },
  { id: "afterMonth", value: "afterMonth", label: "After Month" },
  { id: "inMonth", value: "inMonth", label: "In Month" },
  { id: "isToday", value: "isToday", label: "Is Today" },
  { id: "isFirstDay", value: "isFirstDay", label: "Is First Day" },
  { id: "isLastDay", value: "isLastDay", label: "Is Last Day" },
];

const _selectModeOptions = [
  { id: "none", value: "none", label: "None" },
  { id: "single", value: "single", label: "Single Date" },
  { id: "multiple", value: "multiple", label: "Multiple Dates" },
  { id: "range", value: "range", label: "Date Range" },
];

export {
  _daysInMonths,
  _weekdayLabels,
  _monthLabels,
  _today,
  _todayComps,
  _displayKeyOptions,
  _selectModeOptions,
};
