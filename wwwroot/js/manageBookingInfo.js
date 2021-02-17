var bookings = {};
var url = "http://localhost:5000/api/bookings";

async function GetBookingDetails() { // currently stores booking data locally as an object
    var name = document.forms[0]["name"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;
    var date = document.forms[0]["bookingDate"].value;
    var time = document.forms[0]["bookingTime"].value;   

    var validPhoneNo = /^\d{10}$/;
    var validPhone = false;

    if (phone.match(validPhoneNo)) {
        validPhone = true;
    }   

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1 && validPhone && CheckIfWithinOpeningTimes(time, date) && CheckValidDate(date))
    {
        alert("Booking for " + name + " saved.");

        // store details as bookings object
        bookings = {
            "Id": 0,
            "Name": name,
            "Seats": seats,
            "Phone": phone,
            "Date": date,
            "Time": time
        };

        // store booking to local storage

        // !!! --- This part will have to change with a C# backend.
        

            try {
                await fetch(url, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookings)
                });
            }
            catch (ex) {
                console.log(ex);
                throw "Failed to post";            
            }           
        
        // var key = phone;
        // window.localStorage.setItem(key, JSON.stringify(bookings));
        // ---

        $(".form-input").val('');

        return true;
        
    }

    else if (!name || !seats || !phone || !date || !time)
    {
        alert("Some form details missing");

        // do not store details

        return false;   
    }

    else if (seats < 1 || seats > 6)
    {
        alert("Number of people at a table must be between 1-6.");        

        // do not store details 

        return false;      
    }

    else if(CheckValidDate(date) === false) {
        alert("Restaurant is closed on a " + GetBookingDay(date) + ". Please select another date.");
        return false;
    }

    else if (CheckIfWithinOpeningTimes(time, date) === false) {
        alert("Invalid timeslot - please check opening times for a " + GetBookingDay(date) + ".");
        return false;
    }

    else {
        alert("Phone number invalid");
        return false;
    }
}

async function UpdateBookingToStorage() {
    var name = document.forms[0]["nameEdit"].value;
    var seats = document.forms[0]["numSeatsEdit"].value;
    var phone = document.forms[0]["phoneEdit"].value;
    var date = document.forms[0]["bookingDateEdit"].value;
    var time = document.forms[0]["bookingTimeEdit"].value;

    var validPhoneNo = /^\d{10}$/;
    var validPhone = false;

    if (phone.match(validPhoneNo)) {
        validPhone = true;
    }

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1 && validPhone && CheckIfWithinOpeningTimes(time, date) && CheckValidDate(date)) {
        alert("Booking for " + name + " updated.");

        // store details as bookings object
        var key = window.sessionStorage.getItem("BOOKING_ID");

        bookings = {
            "Id": parseInt(key),
            "Name": name,
            "Seats": seats,
            "Phone": phone,
            "Date": date,
            "Time": time
        };

        await fetch(url + "/" + parseInt(key), {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookings)
        }); 

        // ---

        $("input").val('');
        
        BackToBookings();

        return true;
    }

    else if (!name || !seats || !phone || !date || !time) {
        alert("Some form details missing");

        // do not store details

        return false;
    }

    else if (seats < 1 || seats > 6) {
        alert("Number of people at a table must be between 1-6.");

        // do not store details 

        return false;
    }

    else if(CheckValidDate(date) === false) {
        alert("Restaurant is closed on a " + GetBookingDay(date) + ". Please select another date.");
        return false;
    }

    else if (CheckIfWithinOpeningTimes(time, date) === false) {
        alert("Invalid timeslot - please check opening times for a " + GetBookingDay(date) + ".");
        return false;
    }

    else {
        alert("Invalid phone number");

        return false;
    }
}

function BackToBookings() {
    $('#page-wrapper').load('viewBookings.html');
}

function StartSearch() {
    // Simple search through table for bookings
    $("#bookingSearchBar").on("keyup", function () {
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
}



async function AddTables() { 

    // this parses locally stored data back as an object and displays it in HTML table format

    // !!! --- This whole segment will have to change with a C# backend.   

    var raw = await fetch(url);
    var data = await raw.json();
 
    for (var i = 0, length = data.length; i < length; i++) {
        let tableContent = "";
        var currentBooking = data[i];
         
        var bookingInfo = currentBooking;

        // Cleaner way of storing/displaying bookings: only one row per booking rather than one table
        tableContent += `
                        <td>${bookingInfo.name}</td>
                        <td>${bookingInfo.seats}</td>
                        <td>${bookingInfo.phone}</td>
                        <td>${bookingInfo.date}</td>
                        <td>${bookingInfo.time}</td>
                        <td id="cancelbutton"><button id="${bookingInfo.id}" type="button" class="site-button site-button-cancel" onclick="RemoveBooking('${bookingInfo.id}')"><i class="far fa-trash-alt"></i>   Remove</button></td>
                        <td id="modifybutton"><button id="${bookingInfo.id}" type="button" class="site-button" onclick="ModifyBooking('${bookingInfo.id}')"><i class="fas fa-user-edit"></i>   Modify</button></td>
                        `;

        var tablesDiv = document.createElement("tr"); // adds new row to the page to place the tables
        tablesDiv.innerHTML = tableContent; // adds table HTML
        document.getElementById("bookingData").appendChild(tablesDiv); // adds to page
        

      // ---  

    }
}


// removes a booking from storage when cancelled
async function RemoveBooking(theKey) { 

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

        // !!! --- This part will have to change with a C# backend.
        await fetch(url + "/" + theKey, {
            method: "DELETE"
        });
        // ---

        
    }

    $('#page-wrapper').load('viewBookings.html');
    
}

async function ModifyBooking(theKey) { // modifies selected booking information, filling in HTML form

    $('#page-wrapper').load('modifyBooking.html', async function () {

        // !!! --- This part will have to change with a C# backend.

        var raw = await fetch(url);
        var data = await raw.json();

        for (i = 0; i < data.length; i++) {
            var current = data[i];
            if (current.id == theKey) {
                var bookingInfo = current;
            }
        }        
        
        $('#nameEdit').val(bookingInfo.name);
        $('#phoneEdit').val(bookingInfo.phone);
        $('#bookingDateEdit').val(bookingInfo.date);
        $('#bookingTimeEdit').val(bookingInfo.time);
        $('#numSeatsEdit').val(bookingInfo.seats);

        window.sessionStorage.setItem("BOOKING_ID", theKey);
        //
    });
}


function CheckIfWithinOpeningTimes(timeInput, dateInput) { // validates that proposed booking time is within opening hours for specified date
    var day = GetBookingDay(dateInput);
    console.log('Day to check times for: ' + day);
    var times = JSON.parse(window.localStorage.getItem(day));
    var opens = times.open;
    var closes = times.close;
    var timeslotStart = new Date();
    var timeslotEnd = new Date();
    var targetTimeSlot = new Date();

    console.log("Opening time: " + opens);
    console.log("Closing time: " + closes);

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