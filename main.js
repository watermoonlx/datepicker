(function () {
    const datePicker = window.datePicker;
    const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
    let displayedYear;
    let displayedMonth;
    let anchor = document.getElementById('datepicker');

    function main() {
        if (!anchor)
            return;

        const now = new Date();
        displayedYear = now.getFullYear();
        displayedMonth = now.getMonth() + 1;

        buildDatePicker(displayedYear, displayedMonth, anchor);
    }

    function buildDatePicker(year, month, anchor) {

        const wrapper = document.createElement('div');
        addClass(wrapper, 'ui-datepicker-wrapper');

        const header = createHeader(year, month);
        wrapper.appendChild(header);

        const body = createBody(year, month);
        wrapper.appendChild(body);

        for (const child of anchor.childNodes) {
            anchor.removeChild(child);
        }
        anchor.appendChild(wrapper);
    }

    function createHeader(year, month) {
        const header = document.createElement('div');
        addClass(header, 'ui-datepicker-header');

        const preAnchor = document.createElement('a');
        preAnchor.setAttribute('href', '#');
        addClass(preAnchor, 'ui-datepicker-btn ui-datepicker-prev-btn');
        const preText = document.createTextNode('<');
        preAnchor.appendChild(preText);
        preAnchor.addEventListener('click', onClickPreMonth);
        header.appendChild(preAnchor);

        const nextAnchor = document.createElement('a');
        nextAnchor.setAttribute('href', '#');
        addClass(nextAnchor, 'ui-datepicker-btn ui-datepicker-next-btn');
        const nextText = document.createTextNode('>');
        nextAnchor.appendChild(nextText);
        nextAnchor.addEventListener('click', onClickNextMonth);
        header.appendChild(nextAnchor);

        const currentMonth = document.createElement('span');
        addClass(currentMonth, 'ui-datepicker-curr-month');
        const currentMonthText = document.createTextNode(`${year} - ${month}`);
        currentMonth.appendChild(currentMonthText);
        header.appendChild(currentMonth);

        return header;
    }

    function createBody(year, month) {

        const body = document.createElement('div');
        addClass(body, 'ui-datepicker-body');

        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const thead_tr = document.createElement('tr');
        for (const weekDay of weekDays) {
            thead_tr.appendChild(createTh(weekDay));
        }
        thead.appendChild(thead_tr);
        table.appendChild(thead);

        const monthData = datePicker.getMonthData(year, month);
        const rowCount = monthData.length / weekDays.length;

        const tbody = document.createElement('tbody');
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const startIndex = rowIndex * weekDays.length;
            const endIndex = (rowIndex + 1) * weekDays.length - 1;

            const days = monthData.slice(startIndex, endIndex + 1);
            tbody.appendChild(createBodyRow(days));
        }
        table.appendChild(tbody);

        body.appendChild(table);

        return body;
    }

    function createTh(text) {
        const th = document.createElement('th');
        const textNode = document.createTextNode(text);
        th.appendChild(textNode);
        return th;
    }

    function createBodyRow(days) {
        const tr = document.createElement('tr');
        for (const day of days) {
            const td = document.createElement('td');
            const text = document.createTextNode(day.displayedDate);
            td.appendChild(text);

            if (!day.isThisMonth)
                addClass(td, 'not-this-month');

            tr.appendChild(td);
        }

        return tr;
    }

    function onClickPreMonth() {
        const prevMonth = new Date(displayedYear, displayedMonth - 2);
        displayedYear = prevMonth.getFullYear();
        displayedMonth = prevMonth.getMonth() + 1;

        buildDatePicker(displayedYear, displayedMonth, anchor);
    }

    function onClickNextMonth() {
        const nextMonth = new Date(displayedYear, displayedMonth);
        displayedYear = nextMonth.getFullYear();
        displayedMonth = nextMonth.getMonth() + 1;

        buildDatePicker(displayedYear, displayedMonth, anchor);
    }

    addLoadEvent(main);
}());