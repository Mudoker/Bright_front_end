import dayjs from 'dayjs';

export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year()
) => {
    const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');

    const arrayOfDate = [];

    // Prefix days of the previous month
    for (let i = 0; i < firstDayOfMonth.day(); i++) {
        arrayOfDate.push({
            date: firstDayOfMonth.day(i),
            currentMonth: false,
        });
    }

    // Days of the current month
    for (let i = firstDayOfMonth.date(); i < lastDayOfMonth.date(); i++) {
        arrayOfDate.push({
            date: firstDayOfMonth.date(i),
            currentMonth: true,
            today:
                firstDayOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
        });
    }

    // Postfix days of the next month
    const remaining = 43 - arrayOfDate.length;

    for (
        let i = lastDayOfMonth.date() + 1;
        i < lastDayOfMonth.date() + remaining;
        i++
    ) {
        arrayOfDate.push({
            date: lastDayOfMonth.date(i),
            currentMonth: false,
        });
    }

    return arrayOfDate;
};
