

function AddTables() { // Will read in data from a list and add a table to the <div> container in viewBookings.html

    // this instead parses locally stored data back as an object and displays it.
    let tableContent = "";
    for (var i = 0, length = localStorage.length; i < length; i++) {
        var key = localStorage.key(i);
        var bookingInfo = JSON.parse(localStorage[key]);

        tableContent += "<table>";
        tableContent += `<tr>
                    <td><b>First name: </b></td>
                    <td>${bookingInfo.fName}</td>
                    </tr>

                    <tr>
                    <td><b>Last name: </b></td>
                    <td>${bookingInfo.lName}</td>
                    </tr>

                    <tr>
                    <td><b>Seats: </b></td>
                    <td>${bookingInfo.seats}</td>
                    </tr>
                    
                    <tr>
                    <td><b>Phone No.: </b></td>
                    <td>${bookingInfo.phone}</td>
                    </tr>`;
        tableContent += `</table><br /><br />
                        <button>Cancel</button>`;
    }


    var tablesDiv = document.createElement("div"); // adds div to the page to place the tables
    tablesDiv.innerHTML = tableContent; // adds table HTML
    document.getElementById("bookingslist").appendChild(tablesDiv); // adds to page
}