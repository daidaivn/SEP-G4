// DateUtils.js

 const createYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    return years.map(year => ({ value: year, label: year.toString() }));
};

const getMonthsInYear = (year) => {
    const months = [
        '1', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', '11', '12'
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

    const isEdge = /Edge\/\d./i.test(navigator.userAgent);

    let dateFormatOptions = { month: 'numeric', day: 'numeric' };

    if (isEdge) {
        // If it's Microsoft Edge, reverse the date and month
        dateFormatOptions = { day: 'numeric', month: 'numeric' };
    }

    return {
        start: startOfWeek.toLocaleDateString(undefined, dateFormatOptions),
        end: endOfWeek.toLocaleDateString(undefined, dateFormatOptions),
    };
};

 const createWeekOptions = () => {
    const today = new Date();
    const weeks = [];

    for (let i = -4; i <= 4; i++) {
        const weekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7 * i);
        const { start, end } = getWeekRange(weekDate);
        weeks.push({ value: `${start}-${end}`, label: `${start} đến ${end}` });
    }
    return weeks;
};

 const parseWeekRange = (weekRange) => {
    const [start, end] = weekRange.split('-').map(date => {
        const [day, month] = date.split('/').map(Number);
        return new Date(new Date().getFullYear(), month - 1, day);
    });

    const days = [];
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        days.push(new Date(date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }));
    }
    return days;
};
export{createYearOptions, getWeekRange, createWeekOptions, parseWeekRange, getMonthsInYear};