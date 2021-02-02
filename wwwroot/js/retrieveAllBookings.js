function AddTables() { 

    // this parses locally stored data back as an object and displays it in HTML table format
    
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
                        <td id="cancelbutton"><button id="${bookingInfo.phone}" type="button" class="site-button site-button-cancel" onclick="RemoveBooking('${bookingInfo.phone}')"><i class="far fa-trash-alt"></i>   Remove</button></td>
                        <td id="modifybutton"><button id="${bookingInfo.phone}" type="button" class="site-button" onclick="ModifyBooking('${bookingInfo.phone}')"><i class="fas fa-user-edit"></i>   Modify</button></td>
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

// writes a modified booking back to storage with updated data.





