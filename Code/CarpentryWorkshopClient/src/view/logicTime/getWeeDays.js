// DateUtils.js
const createYearOptionsHoliday = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 10;
  const endYear = currentYear + 1;

  const years = Array.from(
    { length: endYear - startYear + 2 },
    (_, i) => startYear + i
  );

  return years.map((year) => ({ value: year, label: year.toString() }));
};

const createYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  return years.map((year) => ({ value: year, label: year.toString() }));
};

const getMonthsInYear = (year) => {
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  let result = [];
  if (year < currentYear) {
    result = months;
  } else if (year === currentYear) {
    result = months.slice(0, currentMonth + 1);
  } else {
    result = [];
  }
  return result.map((month, index) => ({ value: index + 1, label: month }));
};

const getWeekRange = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

const createWeekOptions = () => {
  const today = new Date();
  const weeks = [];

  for (let i = -4; i <= 4; i++) {
    const weekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7 * i
    );
    const { start, end } = getWeekRange(weekDate);
    weeks.push({ value: `${start}-${end}`, label: `${start} đến ${end}` });
  }
  return weeks;
};

const parseWeekRange = (weekRange) => {
  const [start, end] = weekRange.split("-").map((date) => {
    const [day, month] = date.split("/").map(Number);
    return new Date(new Date().getFullYear(), month - 1, day);
  });

  const days = [];
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(
      new Date(date).toLocaleDateString(undefined, {
        month: "numeric",
        day: "numeric",
      })
    );
  }
  return days;
};
export {
  createYearOptions,
  getWeekRange,
  createWeekOptions,
  parseWeekRange,
  getMonthsInYear,
  createYearOptionsHoliday
};
