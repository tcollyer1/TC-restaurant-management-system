

function AddTables() { // Will read in data from a list and add a table to the <div> container in viewBookings.html

    // this instead parses locally stored data back as an object and displays it.
    
    for (var i = 0, length = localStorage.length; i < length; i++) {
        let tableContent = "";
        var key = localStorage.key(i);
        var bookingInfo = JSON.parse(localStorage[key]);

        // -------------------------------- Cleaner way of storing/displaying bookings: only one row per booking rather than one table
        tableContent += `
                        <td>${bookingInfo.name}</td>
                        <td>${bookingInfo.seats}</td>
                        <td>${bookingInfo.phone}</td>
                        <td>${bookingInfo.date}</td>
                        <td>${bookingInfo.time}</td>
                        <td colspan="2" id="cancelbutton"><button id="${bookingInfo.phone}" type="button" class="site-button" onclick="RemoveBooking('${bookingInfo.phone}')">Cancel</button></td>
                        `;

        var tablesDiv = document.createElement("tr"); // adds new row to the page to place the tables
        tablesDiv.innerHTML = tableContent; // adds table HTML
        document.getElementById("bookingData").appendChild(tablesDiv); // adds to page
        // --------------------------------

        //tableContent += `<table id="bookingsTable">`;
        //tableContent += `<tr>
        //            <td><b>First name: </b></td>
        //            <td>${bookingInfo.fName}</td>
        //            </tr>

        //            <tr>
        //            <td><b>Last name: </b></td>
        //            <td>${bookingInfo.lName}</td>
        //            </tr>

        //            <tr>
        //            <td><b>Seats: </b></td>
        //            <td>${bookingInfo.seats}</td>
        //            </tr>
                    
        //            <tr>
        //            <td><b>Phone No.: </b></td>
        //            <td>${bookingInfo.phone}</td>
        //            </tr>

        //            <tr>
        //            <td><b>Booking date: </b></td>
        //            <td>${bookingInfo.date}</td>
        //            </tr

        //            <tr>
        //            <td><b>Booking time: </b></td>
        //            <td>${bookingInfo.time}</td>
        //            </tr>

        //            <tr>
        //            <td colspan="2" id="cancelbutton"><button id="${bookingInfo.fName}${bookingInfo.lName}" type="button" class="site-button" onclick="RemoveBooking('${bookingInfo.fName}${bookingInfo.lName}')">Cancel</button></td>                    
        //            </tr>`; // currently sets booking name/ID as customer full name, which is not final

        //tableContent += "</table><br /><br />";
    }


    //var tablesDiv = document.createElement("div"); // adds div to the page to place the tables
    //tablesDiv.innerHTML = tableContent; // adds table HTML
    //document.getElementById("bookingslist").appendChild(tablesDiv); // adds to page
}



function RemoveBooking(theKey) { // removes a booking from storage when cancelled
    var bookingInfo = JSON.parse(window.localStorage.getItem(theKey));

    if (confirm("Are you sure you want to remove booking for " + bookingInfo.name + "?")) {
        alert("Booking for " + bookingInfo.name + " removed.");
        window.localStorage.removeItem(theKey);
    }

    
}