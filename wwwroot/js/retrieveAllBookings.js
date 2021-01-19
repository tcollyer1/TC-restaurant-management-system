

function AddTables() { // Will read in data from a list and add a table to the <div> container in viewBookings.html

    // this instead parses locally stored data back as an object and displays it.
    
    for (var i = 0, length = localStorage.length; i < length; i++) {
        let tableContent = "";
        var key = localStorage.key(i);
        var bookingInfo = JSON.parse(localStorage[key]);

        // Cleaner way of storing/displaying bookings: only one row per booking rather than one table
        tableContent += `
                        <td>${bookingInfo.name}</td>
                        <td>${bookingInfo.seats}</td>
                        <td>${bookingInfo.phone}</td>
                        <td>${bookingInfo.date}</td>
                        <td>${bookingInfo.time}</td>
                        <td id="cancelbutton"><button id="${bookingInfo.phone}" type="button" class="site-button" onclick="RemoveBooking('${bookingInfo.phone}')">Cancel</button></td>
                        <td id="modifybutton"><button id="${bookingInfo.phone}" type="button" class="site-button" onclick="ModifyBooking('${bookingInfo.phone}')">Modify</button></td>
                        `;

        var tablesDiv = document.createElement("tr"); // adds new row to the page to place the tables
        tablesDiv.innerHTML = tableContent; // adds table HTML
        document.getElementById("bookingData").appendChild(tablesDiv); // adds to page

    }
}


// removes a booking from storage when cancelled
function RemoveBooking(theKey) { 
    var bookingInfo = JSON.parse(window.localStorage.getItem(theKey));

    if (confirm("Are you sure you want to remove booking for " + bookingInfo.name + "?")) {
        alert("Booking for " + bookingInfo.name + " removed.");
        window.localStorage.removeItem(theKey);
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

// writes a modified booking back to storage with updated data.
function UpdateBookingToStorage() {
    var name = document.forms[0]["nameEdit"].value
    var seats = document.forms[0]["numSeatsEdit"].value;
    var phone = document.forms[0]["phoneEdit"].value;
    var date = document.forms[0]["bookingDateEdit"].value;
    var time = document.forms[0]["bookingTimeEdit"].value;

    if (name && seats && phone && date && time && seats <= 6 && seats >= 1) {
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

        return true;
    }

    else if (!name || !seats || !phone || !date || !time) {
        alert("Some form details missing");

        // do not store details

        return false;
    }

    else {
        alert("Number of people at a table must be between 1-6.");

        // do not store details 

        return false;
    }
}


function BackToBookings() {
    $('#page-wrapper').load('viewBookings.html');
}

