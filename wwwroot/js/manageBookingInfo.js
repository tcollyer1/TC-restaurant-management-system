var bookings = {};

function GetBookingDetails() { // currently stores booking data locally as an object
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

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1 && validPhone)
    {
        alert("Booking for " + name + " saved.");

        // store details as bookings object
        bookings = {
            "name": name,
            "seats": seats,
            "phone": phone,
            "date": date,
            "time": time
        };

        // store booking to local storage
        var key = phone;
        window.localStorage.setItem(key, JSON.stringify(bookings));
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

    else {
        alert("Phone number invalid");
        return false;
    }
}

function ModifyBooking(theKey) { // modifies selected booking information, filling in HTML form

    $('#page-wrapper').load('modifyBooking.html', function () {
        var bookingInfo = JSON.parse(window.localStorage.getItem(theKey));
        $('#nameEdit').val(bookingInfo.name);
        $('#phoneEdit').val(bookingInfo.phone);
        $('#bookingDateEdit').val(bookingInfo.date);
        $('#bookingTimeEdit').val(bookingInfo.time);
        $('#numSeatsEdit').val(bookingInfo.seats);
    });
}

function UpdateBookingToStorage() {
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

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1 && validPhone) {
        alert("Booking for " + name + " updated.");

        // store details as bookings object
        bookings = {
            "name": name,
            "seats": seats,
            "phone": phone,
            "date": date,
            "time": time
        };

        var key = phone;

        window.localStorage.setItem(key, JSON.stringify(bookings));
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


// function StartDateFilter() {
// // Filters bookings by date
// $("#dateFilter").on("input", function () {
//     var value = $(this).val();
//     $("table tbody tr").filter(function () {
//         $(this).toggle($(this).text().indexOf(value) > -1)
//     });
// });

// }

// function StartTimeFilter() {
//     // Filters bookings by time
//     $("#timeFilter").on("input", function () {
//         var value = $(this).val();
//         $("table tbody tr").filter(function () {
//             $(this).toggle($(this).text().indexOf(value) > -1)
//         });
//     });
// }

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



function AddTables() { 

    // this parses locally stored data back as an object and displays it in HTML table format

    var validBookingKey = /^\d{10}$/;
      
    for (var i = 0, length = localStorage.length; i < length; i++) {
        let tableContent = "";
        var isBooking = false;
        var key = localStorage.key(i);

        if (key.match(validBookingKey)) {
            isBooking = true;
        }

        if (isBooking) {
            var bookingInfo = JSON.parse(localStorage[key]);

        // Cleaner way of storing/displaying bookings: only one row per booking rather than one table
        tableContent += `
                        <td>${bookingInfo.name}</td>
                        <td>${bookingInfo.seats}</td>
                        <td>${bookingInfo.phone}</td>
                        <td>${bookingInfo.date}</td>
                        <td>${bookingInfo.time}</td>
                        <td id="cancelbutton"><button id="${bookingInfo.phone}" type="button" class="site-button site-button-cancel" onclick="RemoveBooking('${bookingInfo.phone}')"><i class="far fa-trash-alt"></i>   Remove</button></td>
                        <td id="modifybutton"><button id="${bookingInfo.phone}" type="button" class="site-button" onclick="ModifyBooking('${bookingInfo.phone}')"><i class="fas fa-user-edit"></i>   Modify</button></td>
                        `;

        var tablesDiv = document.createElement("tr"); // adds new row to the page to place the tables
        tablesDiv.innerHTML = tableContent; // adds table HTML
        document.getElementById("bookingData").appendChild(tablesDiv); // adds to page
        }

        

    }
}


// removes a booking from storage when cancelled
function RemoveBooking(theKey) { 
    var bookingInfo = JSON.parse(window.localStorage.getItem(theKey));

    if (confirm("Are you sure you want to remove booking for " + bookingInfo.name + "?")) {
        alert("Booking for " + bookingInfo.name + " removed.");
        window.localStorage.removeItem(theKey);
        $('#page-wrapper').load('viewBookings.html');
    }

    
}

function ModifyBooking(theKey) { // modifies selected booking information, filling in HTML form

    $('#page-wrapper').load('modifyBooking.html', function () {
        var bookingInfo = JSON.parse(window.localStorage.getItem(theKey));
        $('#nameEdit').val(bookingInfo.name);
        $('#phoneEdit').val(bookingInfo.phone);
        $('#bookingDateEdit').val(bookingInfo.date);
        $('#bookingTimeEdit').val(bookingInfo.time);
        $('#numSeatsEdit').val(bookingInfo.seats);
    });
}