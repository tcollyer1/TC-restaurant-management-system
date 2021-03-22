var bookings = {};
var url = "http://localhost:5000/api/bookings";
var tablesUrl = "http://localhost:5000/api/tables";

async function StoreNewBooking() { // Currently stores booking data in JSON format to a .csv file
    var name = document.forms[0]["name"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;
    var date = document.forms[0]["bookingDate"].value;
    var time = document.forms[0]["bookingTime"].value;
    var table = document.forms[0]["selectTable"].value;

    var validPhoneNo = /^\d{10}$/; // Ensures phone No. is a 10-digit number-only value
    var validPhone = false;

    if (phone.match(validPhoneNo)) {
        validPhone = true;
        phone = "0" + phone; // Prefixes with 0 for displaying in the table
    }

    if (name && seats && phone && date && time && table && seats <= 6 && seats >= 1 && validPhone && CheckIfWithinOpeningTimes(time, date) && CheckValidDate(date)) {
        alert("Booking for " + name + " saved.");

        // store details as bookings object
        bookings = {
            "Id": 0, // temp ID value. This is calculated in the backend
            "Name": name,
            "Seats": seats,
            "Phone": phone,
            "Date": date,
            "Time": time,
            "Table": table
        };

        // store booking to bookings.csv

        await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookings)
        });

        ClearBookingForm();

        return true;

    }

    else if (!name || !seats || !phone || !date || !time || !table) {
        alert("Some form details missing (don't forget to select a table).");

        // do not store details

        return false;
    }

    else {
        alert("Phone number invalid");
        return false;
    }
}

async function UpdateBookingToStorage() { // Updates a booking entry in .csv when modified
    var name = document.forms[0]["nameEdit"].value;
    var seats = document.forms[0]["numSeatsEdit"].value;
    var phone = document.forms[0]["phoneEdit"].value;
    var date = document.forms[0]["bookingDateEdit"].value;
    var time = document.forms[0]["bookingTimeEdit"].value;
    var table = document.forms[0]["selectTableEdit"].value;

    var validPhoneNo = /^\d{10}$/;
    var validPhone = false;

    if (phone.match(validPhoneNo)) {
        validPhone = true;
        phone = "0" + phone; // adds preceding 0 to phone number
    }

    if (name && seats && phone && date && time && table && seats <= 6 && seats >= 1 && validPhone && CheckIfWithinOpeningTimes(time, date) && CheckValidDate(date)) {
        alert("Booking for " + name + " updated.");

        if (table == "original") {
            table = $("#selectTableEdit option:selected").html();
        }

        var key = window.sessionStorage.getItem("BOOKING_ID"); // get temporarily stored booking ID of the booking being updated

        // store details as bookings object
        bookings = {
            "Id": parseInt(key),
            "Name": name,
            "Seats": seats,
            "Phone": phone,
            "Date": date,
            "Time": time,
            "Table": table
        };

        await fetch(url + "/" + parseInt(key), {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookings)
        });

        $("input").val('');

        BackToBookings();

        return true;
    }

    else if (!name || !seats || !phone || !date || !time || !table) {
        alert("Some form details missing (remember to select a table).");

        // do not store details

        return false;
    }

    else if (CheckValidDate(date) === false) {
        var temp = localStorage.getItem(GetBookingDay(date));
        if (temp == null) {
            alert("No opening times found on system for " + GetBookingDay(date) + ". Please go to the opening times page and set opening hours for each day.");
        }
        else alert("Restaurant is closed on a " + GetBookingDay(date) + ". Please select another date.");

        return 0;
    }

    else {
        alert("Invalid phone number");

        return false;
    }
}

async function AddBookingData() { // This parses stored data back as a JSON object and displays it in HTML table format    

    var raw = await fetch(url);
    var data = await raw.json();

    for (var i = 0, length = data.length; i < length; i++) {
        let tableContent = "";
        var currentBooking = data[i];

        var bookingInfo = currentBooking;

        // Creates table data HTML containing relevant booking data and remove/modify buttons to be displayed on the bookings page
        tableContent += `
                        <td>${bookingInfo.name}</td>
                        <td>${bookingInfo.seats}</td>
                        <td>${bookingInfo.phone}</td>
                        <td>${bookingInfo.date}</td>
                        <td>${bookingInfo.time}</td>
                        <td>${bookingInfo.table}</td>
                        <td id="cancelbutton"><button id="${bookingInfo.id}" type="button" class="site-button site-button-cancel" onclick="RemoveBooking('${bookingInfo.id}')"><i class="far fa-trash-alt"></i>   Remove</button></td>
                        <td id="modifybutton"><button id="${bookingInfo.id}" type="button" class="site-button" onclick="ModifyBooking('${bookingInfo.id}')"><i class="fas fa-user-edit"></i>   Modify</button></td>
                        `;

        var tablesDiv = document.createElement("tr"); // adds new row to the page to place the row data
        tablesDiv.innerHTML = tableContent; // adds row data to the created row
        document.getElementById("bookingData").appendChild(tablesDiv); // adds to page
    }
}

async function RemoveBooking(theKey) { // Removes a booking from storage when cancelled

    var raw = await fetch(url);
    var data = await raw.json();

    for (i = 0; i < data.length; i++) {
        var current = data[i];
        if (current.id == theKey) {
            var bookingInfo = current;
        }
    }

    if (confirm("Are you sure you want to remove booking for " + bookingInfo.name + "?")) {
        alert("Booking for " + bookingInfo.name + " removed.");

        await fetch(url + "/" + theKey, {
            method: "DELETE"
        });
    }

    $('#page-wrapper').load('viewBookings.html');
}

function ModifyBooking(theKey) { // modifies selected booking information, filling in HTML form

    $('#page-wrapper').load('modifyBooking.html', async function () {

        var raw = await fetch(url);
        var data = await raw.json();

        for (i = 0; i < data.length; i++) {
            var current = data[i];
            if (current.id == theKey) {
                var bookingInfo = current;
            }
        }

        // adds existing chosen table to form, like the other inputs
        var selectElement = document.getElementById("selectTableEdit");
        var newOption = document.createElement("option");
        newOption.text = `${bookingInfo.table}`;
        newOption.value = "original";
        selectElement.add(newOption);
        $('#selectTableEdit').css('display', 'inline');

        var phoneEdit = (bookingInfo.phone).substring(1); // removes preceding 0 for modifying

        // adds existing booking data to form inputs to be modified
        $('#nameEdit').val(bookingInfo.name);
        $('#phoneEdit').val(phoneEdit);
        $('#bookingDateEdit').val(bookingInfo.date);
        $('#bookingTimeEdit').val(bookingInfo.time);
        $('#numSeatsEdit').val(bookingInfo.seats);

        window.sessionStorage.setItem("BOOKING_ID", theKey); // stores ID of selected booking to be modified to be accessed by UpdateBookingToStorage()

        // Stores original date/time/table number to be accessed when editing a booking.
        window.sessionStorage.setItem("originalDate", bookingInfo.date);
        window.sessionStorage.setItem("originalTime", bookingInfo.time);
        window.sessionStorage.setItem("originalTableNo", bookingInfo.table);

        FillInTableSelectEdit();
        
    });
}

function BackToBookings() {
    $('#page-wrapper').load('viewBookings.html');
}

function StartSearch() {
    // Simple search through table for bookings
    $("#bookingSearchBar").on("keyup", function () {
        ClearDateTimeFilters();
        var value = $(this).val().toLowerCase();
        $("table tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

        var numVisible = $('table tbody tr:visible').length;

        if (numVisible < 1) {
            $('.not-found').css('display', 'block');
        }
        else {
            $('.not-found').css('display', 'none');
        }

    });

}

function ClearSearchField() {
    $('#bookingSearchBar').val('');
    $("table tbody tr").show();
    $('.not-found').css('display', 'none');
}

function StartDateTimeFilter() { // Filters bookings by date and time
    $("table tbody tr").show();

    var currDate = $('#dateFilter').val();
    var currTime = $('#timeFilter').val();

    $("table tbody tr").filter(function () {
        $(this).toggle($(this).text().indexOf(currDate) > -1);
    });

    $("table tbody tr:visible").filter(function () {
        $(this).toggle($(this).text().indexOf(currTime) > -1);
    });

    var numVisible = $('table tbody tr:visible').length;

    if (numVisible < 1) {
        $('.not-found').css('display', 'block');
    }
    else {
        $('.not-found').css('display', 'none');
    }
}

function ClearDateTimeFilters() {
    $('#dateFilter').val('');
    $('#timeFilter').val('');
    $("table tbody tr").each(function () {
        $row = $(this);
        $row.show();
    })
    $('.not-found').css('display', 'none');
}

function ClearBookingForm() {
    $('.form-input').val('');

    $('#selectTable').children().remove().end();
    $('#selectTable').css('display', 'none');

    $('#selectTableEdit').children().remove().end();
    $('#selectTableEdit').css('display', 'none');
}

// These are used to clear the table select on the booking/modify booking pages when the date/time/seats are modified to prevent erroneous bookings getting stored.
$("#bookingDate").on("change", function () {
    $('#selectTable').children().remove().end();
    $('#selectTable').css('display', 'none');
});

$("#bookingTime").on("change", function () {
    $('#selectTable').children().remove().end();
    $('#selectTable').css('display', 'none');
});

$("#numSeats").on("change", function () {
    $('#selectTable').children().remove().end();
    $('#selectTable').css('display', 'none');
});

$("#numSeats").on("keyup", function () {
    $('#selectTable').children().remove().end();
    $('#selectTable').css('display', 'none');
});

$("#bookingDateEdit").on("change", function () {
    $('#selectTableEdit').children().remove().end();
    $('#selectTableEdit').css('display', 'none');
});

$("#bookingTimeEdit").on("change", function () {
    $('#selectTableEdit').children().remove().end();
    $('#selectTableEdit').css('display', 'none');
});

$("#numSeatsEdit").on("change", function () {
    $('#selectTableEdit').children().remove().end();
    $('#selectTableEdit').css('display', 'none');
});

$("#numSeatsEdit").on("keyup", function () {
    $('#selectTableEdit').children().remove().end();
    $('#selectTableEdit').css('display', 'none');
});
//

function CheckIfWithinOpeningTimes(timeInput, dateInput) { // validates that proposed booking time is within opening hours for specified date
    var day = GetBookingDay(dateInput);

    try {
        var times = JSON.parse(window.localStorage.getItem(day));

        var opens = times.open;
        var closes = times.close;
        var timeslotStart = new Date();
        var timeslotEnd = new Date();
        var targetTimeSlot = new Date();

        timeslotStart.setHours(opens.split(':')[0]);
        timeslotStart.setMinutes(opens.split(':')[1]);
        timeslotStart.setSeconds(0);

        timeslotEnd.setHours(closes.split(':')[0]);
        timeslotEnd.setMinutes(closes.split(':')[1]);
        timeslotEnd.setSeconds(0);

        targetTimeSlot.setHours(timeInput.split(':')[0]);
        targetTimeSlot.setMinutes(timeInput.split(':')[1]);
        targetTimeSlot.setSeconds(0);

        if (timeslotStart === null) { // if no opening times for this day (restaurant is closed)
            return false;
        }

        if (targetTimeSlot >= timeslotStart && targetTimeSlot < timeslotEnd) {
            return true;
        }
        else return false;
    }
    catch (e) {
        return false;
    }
}

async function GetNumSeatsForTable(tableNo) { // Gets number of seats at a specified table.
    var raw = await fetch(tablesUrl);
    var tablesList = await raw.json();

    for (table = 0; table < tablesList.length; table++) { // loop through each table
        var tableNum = tablesList[table].tableNo;
        
        if (tableNum == tableNo) {
            return tablesList[table].seats;
        }
    }
}

async function GetWhichTablesAreAvailable(inputDate, inputTime, inputSeats, tablesList) { // Returns list of tables available based on inputted date/time/seats
    var rawBookings = await fetch(url);
    var bookingslist = await rawBookings.json();
    var availTables = [];

    for (table = 0; table < tablesList.length; table++) { // loop through each table
        var tableNum = tablesList[table].tableNo;
        var invalidTable = false;
        for (i = 0; i < bookingslist.length; i++) { // loop through each booking per table
            if ((bookingslist[i].time == inputTime && bookingslist[i].date == inputDate && bookingslist[i].table == tableNum) || tablesList[table].seats < inputSeats) {
                invalidTable = true;
            }

        }
        if (!invalidTable) {
            availTables.push(tableNum);
        }
    }

    return availTables;
}

async function GetTables(userTime, userDate, userSeats) { // returns what tables will be available for the given date, time and No. seats and validates form inputs

    var tablesRaw = await fetch(tablesUrl);
    var tableData = await tablesRaw.json();

    if (userTime && userDate && userSeats && userSeats <= 6 && userSeats > 0 && CheckValidDate(userDate) && CheckIfWithinOpeningTimes(userTime, userDate)) {
        var tablesAvailable = await GetWhichTablesAreAvailable(userDate, userTime, userSeats, tableData);
        $('#selectTable').css('display', 'inline');
        $('#selectTableEdit').css('display', 'inline');
        return tablesAvailable;
    }

    else if (!userTime || !userDate || !userSeats) {
        alert("Please enter a date, time and number of seats to view available tables.");
        return 0;
    }

    else if (userSeats != '' && userSeats > 6 || userSeats < 1) {
        alert("Invalid number of seats entered. Enter a value between 1-6");
        return 0;
    }

    else if (CheckValidDate(userDate) === false) {
        var temp = localStorage.getItem(GetBookingDay(userDate));
        if (temp == null) {
            alert("No opening times found on system for " + GetBookingDay(userDate) + ". Please go to the opening times page and set opening hours for each day.");
        }
        else alert("Restaurant is closed on a " + GetBookingDay(userDate) + ". Please select another date.");

        return 0;
    }

    else if (CheckIfWithinOpeningTimes(userTime, userDate) === false) {
        alert("Invalid timeslot - please check opening times for a " + GetBookingDay(userDate) + ".");
        return 0;
    }
}

async function FillInTableSelect() { // Adds available tables to selection on booking form
    $('#selectTable').children().remove().end();

    var userTime = $('#bookingTime').val();
    var userDate = $('#bookingDate').val();
    var userSeats = $('#numSeats').val();

    GetTables(userTime, userDate, userSeats).then((availableTables) => {
        var selectElement = document.getElementById("selectTable");

        if (availableTables != 0) {
            for (i = 0; i < availableTables.length; i++) {
                var newOption = document.createElement("option");
                newOption.text = `${availableTables[i]}`;
                selectElement.add(newOption);
            }
        }
    });

    // $('#selectTable').css('display', 'inline');
}

async function FillInTableSelectEdit() { // Adds available tables to selection on modify booking form
    var isOriginalTable = false;

    var originalDate = window.sessionStorage.getItem("originalDate");
    var originalTime = window.sessionStorage.getItem("originalTime");
    var originalTableNo = window.sessionStorage.getItem("originalTableNo");

    var userTime = $('#bookingTimeEdit').val();
    var userDate = $('#bookingDateEdit').val();
    var userSeats = $('#numSeatsEdit').val();
    
    var originalTableSeatLimit = await GetNumSeatsForTable(originalTableNo); 

    $('#selectTableEdit').children().remove().end();

    if (userTime == originalTime && userDate == originalDate && userSeats <= originalTableSeatLimit) {
        isOriginalTable = true;
    }
    else {
        isOriginalTable = false;
    }

    GetTables(userTime, userDate, userSeats).then((availableTables) => {
        var selectElement = document.getElementById("selectTableEdit");

        if (availableTables != 0) {

            if (isOriginalTable) {
                availableTables.push(originalTableNo);
            }

            for (i = 0; i < availableTables.length; i++) {
                var newOption = document.createElement("option");
                newOption.text = `${availableTables[i]}`;
                selectElement.add(newOption);
            }
        }
    });

    // $('#selectTableEdit').css('display', 'inline');
}

function GetBookingDay(userDate) { // gets day of entered booking date to validate timeslot against stored opening times
    var theDate = new Date(userDate);
    var todayNum = theDate.getDay();
    var daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = daysList[todayNum];

    return today;
}

function CheckValidDate(userDate) {
    var day = GetBookingDay(userDate);
    var key = JSON.parse(window.localStorage.getItem(day));

    if (key === null) {
        return false;
    }

    else if (key.open == "" && key.close == "") {
        return false;
    }

    else return true;

}