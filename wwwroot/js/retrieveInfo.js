var bookings = {};

function GetBookingDetails() { // currently stores booking data locally as an object
    var name = document.forms[0]["name"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;
    var date = document.forms[0]["bookingDate"].value;
    var time = document.forms[0]["bookingTime"].value;
    

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1)
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

        return true;
        
    }

    else if (!name || !seats || !phone || !date || !time)
    {
        alert("Some form details missing");

        // do not store details

        return false;   
    }

    else
    {
        alert("Number of people at a table must be between 1-6.");        

        // do not store details 

        return false;      
    }
}

$('#refresh-button').click(function () {
    $('#page-wrapper').load('viewBookings.html');
})

// Simple search through table for bookings
$("#bookingSearchBar").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("table tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}); 

// Filters bookings by date
$("#dateFilter").on("input", function () {
    var value = $(this).val().toLowerCase();
    $("table tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

function ClearDateFilter() {
    $('#dateFilter').val('');
    $("table tbody tr").each(function (index) {
        $row = $(this);
        $row.show();
    })
}

