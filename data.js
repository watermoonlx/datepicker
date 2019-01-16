(function () {
    const datePicker = {};

    datePicker.getMonthData = function (year, month) {
        const data = [];

        if (!year || !month) {
            const today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }


        const firstDayOfThisMonth = new Date(year, month - 1, 1);
        const lastDayOfThisMonth = new Date(year, month, 0);

        for (let i = firstDayOfThisMonth.getDate(); i <= lastDayOfThisMonth.getDate(); i++) {
            data.push({
                displayedDate: i,
                date: new Date(year, month - 1, i),
                isThisMonth: true
            });
        }

        // 本月第一天是星期几
        let weekDayOfFirstDayOfThisMonth = firstDayOfThisMonth.getDay();
        if (weekDayOfFirstDayOfThisMonth === 0)
            weekDayOfFirstDayOfThisMonth = 7;

        // 需要包含多少天上个月的日期
        const lastMonthDayCount = weekDayOfFirstDayOfThisMonth - 1;

        for (let i = 0; i < lastMonthDayCount; i++) {
            const date = new Date(year, month - 1, i * -1);
            data.unshift({
                displayedDate: date.getDate(),
                date: date,
                isThisMonth: false
            });
        }

        // 本月的最后一天是星期几
        let weekDayOfLastDayOfThisMonth = lastDayOfThisMonth.getDay();
        if (weekDayOfLastDayOfThisMonth === 0)
            weekDayOfLastDayOfThisMonth = 7;

        // 需要包含多少天下个月的日期
        const nextMonthDayCount = 7 - weekDayOfLastDayOfThisMonth;
        for (let i = 0; i < nextMonthDayCount; i++) {
            const date = new Date(year, month, i + 1);
            data.push({
                displayedDate: date.getDate(),
                date: date,
                isThisMonth: false
            });
        }

        return data;
    }

    window.datePicker = datePicker;
}());