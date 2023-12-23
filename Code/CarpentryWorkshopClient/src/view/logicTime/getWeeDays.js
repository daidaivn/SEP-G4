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

const createWeekOptions = (year) => {
  const weeks = [];

  // Start from the first week of the given year
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31);

  // Get the first Monday of the given year
  const firstMondayOfYear = new Date(
    firstDayOfYear.setDate(firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7))
  );

  // Loop through weeks starting from the first Monday of the year
  let currentDate = new Date(firstMondayOfYear);
  while (currentDate <= lastDayOfYear) {
    const { start, end } = getWeekRange(currentDate);

    // Check if the week is entirely within the given year
    if (currentDate.getFullYear() === year) {
      weeks.push({ value: `${start}-${end}`, label: `${start} đến ${end}` });
    } else {
      // Automatically switch to the next year
      const nextYear = currentDate.getFullYear() + 1;
      weeks.push({ value: `${start}-${end}`, label: `${start} đến ${end} (${nextYear})` });
    }

    // Move to the next Monday
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return weeks;
};


const parseWeekRange = (weekRange) => {
  const [startStr, endStr] = weekRange.split("-").map((dateStr) => dateStr.trim());
  
  const [startDay, startMonth] = startStr.split("/").map(Number);
  const [endDay, endMonth] = endStr.split("/").map(Number);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const startDate = new Date(startMonth - 1 >= new Date().getMonth() ? currentYear : nextYear, startMonth - 1, startDay);
  const endDate = new Date(endMonth - 1 >= new Date().getMonth() ? currentYear : nextYear, endMonth - 1, endDay);

  const days = [];
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    days.push(
      new Date(date).toLocaleDateString(undefined, {
        month: '2-digit',
        day: '2-digit',
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
