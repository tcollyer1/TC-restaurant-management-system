﻿//bookings = typeof (bookings) == 'undefined' ? [] : bookings;

var bookings = {};

function GetBookingDetails() { // currently stores booking data locally as an object
    var fName = document.forms[0]["firstName"].value;
    var lName = document.forms[0]["lastName"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;

    

    if (fName && lName && seats && phone)
    {
        alert("First name: " + fName + ", last name: " + lName + ", seats: " + seats + ", phone No.: " + phone);

        // store details

        bookings = { "fName": fName, "lName": lName, "seats": seats, "phone": phone };

        var key = fName + " " + lName;

        window.localStorage.setItem(key, JSON.stringify(bookings));

        return true;
        
    }

    else
    {
        alert("Some form details missing");

        // do not store details

        return false;      
    }
}

