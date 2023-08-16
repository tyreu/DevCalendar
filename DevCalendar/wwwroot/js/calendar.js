var year = new Date().getFullYear();
const daysInWeek = 7;

const formatter = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
});

const holidays = [
    "01.01",
    "06.01",
    "09.04",
    "10.04",
    "01.05",
    "03.05",
    "28.05",
    "08.06",
    "15.08",
    "01.11",
    "11.11",
    "25.12",
    "26.12"
];

$(document).ready(function () {
    createCalendar(year, 2);
});

function createCalendar(year, radix = 10) {
    $("#YearHeader").html(year.toString(radix));

    var mainBlock = $("#mainBlock");
    var rowCount = 3, columnCount = 4;
    for (var i = 0; i < rowCount; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "justify-content-md-center");

        for (var j = 0; j < columnCount; j++) {
            var colDiv = document.createElement("div");
            colDiv.classList.add("col", "col-3", "monthIndex");

            var month = document.createElement("div");
            var monthNumber = document.createElement("p");
            var monthIndex = columnCount * i + j;//0..11
            monthNumber.innerText = formatter.format((monthIndex + 1).toString(radix));

            month.append(monthNumber);
            createTableForMonth(month, monthIndex, radix);

            colDiv.appendChild(month);
            rowDiv.append(colDiv);
        }
        mainBlock.append(rowDiv);
    }
}

var getDayInWeek = function (year, monthIndex, currentDay) {
    var dayInWeek = new Date(year, monthIndex, currentDay).getDay();
    if (dayInWeek === 0) dayInWeek = 7;//handle sunday case
    return dayInWeek;
}

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

var weeksCount = function (year, month_number) {
    var firstOfMonth = new Date(year, month_number, 1);
    var day = firstOfMonth.getDay() || 6;
    day = day === 1 ? 0 : day;
    if (day) { day-- }
    var diff = 7 - day;
    var lastOfMonth = new Date(year, month_number + 1, 0);
    var lastDate = lastOfMonth.getDate();
    if (lastOfMonth.getDay() === 1) {
        diff--;
    }
    var result = Math.ceil((lastDate - diff) / 7);
    return result + 1;
};

function createTableForMonth(monthElement, monthIndex, notation) {
    var table = document.createElement("table");
    table.classList.add("table");

    var tableHeader = document.createElement("thead");
    var tr = document.createElement("tr");
    for (var i = 1; i <= daysInWeek; i++) {
        var th = document.createElement("th");
        th.classList.add(i >= 6 ? "weekend" : "workday");
        th.innerText = formatter.format(i.toString(notation));
        tr.appendChild(th);
    }
    tableHeader.appendChild(tr);
    table.append(tableHeader);

    var tableBody = document.createElement("tbody");
    var currentDay = 1;
    for (var weekIndex = 0; weekIndex < weeksCount(year, monthIndex); weekIndex++) {
        tr = document.createElement("tr");
        for (var columnIndex = 1, dayIndex = 1; columnIndex <= daysInWeek; columnIndex++) {
            if (weekIndex == 0) {
                currentDay = weekIndex * daysInWeek + dayIndex;//from 1 to 30/31
            }

            var dayIndexInWeek = getDayInWeek(year, monthIndex, currentDay)//from 1 to 7
            var td = document.createElement("td");
            td.classList.add('dayIndex');

            if (holidays.includes(formatter.format(currentDay) + "." + formatter.format((monthIndex + 1))))
                td.classList.add('holiday');

            if (weekIndex == 0) {
                if (columnIndex == dayIndexInWeek && currentDay <= daysInMonth(year, monthIndex)) {
                    td.innerText = formatter.format(currentDay.toString(notation));
                    dayIndex++;
                }
            }
            else {
                if (currentDay <= daysInMonth(year, monthIndex)) {
                    td.innerText = formatter.format(currentDay.toString(notation));
                    dayIndex++;
                }
            }
            currentDay++;
            tr.append(td);
        }
        tableBody.append(tr);
    }
    table.appendChild(tableBody);
    monthElement.appendChild(table);
}