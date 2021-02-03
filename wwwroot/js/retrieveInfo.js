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

function UpdateBookingToStorage() {
    var name = document.forms[0]["nameEdit"].value
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