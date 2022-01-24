const today = new Date();

export const monthNames = [
  { name: "January", value: "Jan" },
  { name: "February", value: "Feb" },
  { name: "March", value: "Mar" },
  { name: "April", value: "Apr" },
  { name: "May", value: "May" },
  { name: "June", value: "Jun" },
  { name: "July", value: "Jul" },
  { name: "August", value: "Aug" },
  { name: "September", value: "Sep" },
  { name: "October", value: "Oct" },
  { name: "November", value: "Nov" },
  { name: "December", value: "Dec" },
];

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const firstWeekDay = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const currentMonth = today.getMonth();
export const monthDays = [
  { mon: "Jan", days: 31, firstDay: firstWeekDay(today.getFullYear(), 0) },
  {
    mon: "Feb",
    days: daysInMonth(today.getFullYear(), 2),
    firstDay: firstWeekDay(today.getFullYear(), 1),
  },
  { mon: "Mar", days: 31, firstDay: firstWeekDay(today.getFullYear(), 2) },
  { mon: "Apr", days: 30, firstDay: firstWeekDay(today.getFullYear(), 3) },
  { mon: "May", days: 31, firstDay: firstWeekDay(today.getFullYear(), 4) },
  { mon: "Jun", days: 30, firstDay: firstWeekDay(today.getFullYear(), 5) },
  { mon: "Jul", days: 31, firstDay: firstWeekDay(today.getFullYear(), 6) },
  { mon: "Aug", days: 31, firstDay: firstWeekDay(today.getFullYear(), 7) },
  { mon: "Sep", days: 30, firstDay: firstWeekDay(today.getFullYear(), 8) },
  { mon: "Oct", days: 31, firstDay: firstWeekDay(today.getFullYear(), 9) },
  { mon: "Nov", days: 30, firstDay: firstWeekDay(today.getFullYear(), 10) },
  { mon: "Dec", days: 31, firstDay: firstWeekDay(today.getFullYear(), 11) },
];
