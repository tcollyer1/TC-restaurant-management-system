

function AddTables() { // Will read in data from a list like the one below, and add a table to the <div> container in viewBookings.html
    const exampleBookings = [ // temp list of example bookings. Will eventually be able to read this info in from a file when I get bookings to be stored.
        {
            firstName: "John",
            lastName: "Smith",
            numSeats: "2",
            phoneNo: "01234567890",
        },
        {
            firstName: "Sally",
            lastName: "Brown",
            numSeats: "1",
            phoneNo: "07382634076",
        },
        {
            firstName: "Mark",
            lastName: "Jones",
            numSeats: "5",
            phoneNo: "94563299533",
        },
        {
            firstName: "Kate",
            lastName: "Johnson",
            numSeats: "3",
            phoneNo: "93742997534",
        },
        {
            firstName: "Eddie",
            lastName: "Parker",
            numSeats: "1",
            phoneNo: "73864220966",
        },
        {
            firstName: "Bob",
            lastName: "Green",
            numSeats: "2",
            phoneNo: "06678952461",
        },
        {
            firstName: "Jeremy",
            lastName: "Thompson",
            numSeats: "4",
            phoneNo: "77387126378",
        },
    ];    

    //let tableContent = "";
    //exampleBookings.forEach((booking) => { // Loops through each booking to add a table
    //    tableContent += "<table>";
    //    tableContent += `<tr>
    //                <td><b>First name: </b></td>
    //                <td>${booking.firstName}</td>
    //                </tr>

    //                <tr>
    //                <td><b>Last name: </b></td>
    //                <td>${booking.lastName}</td>
    //                </tr>

    //                <tr>
    //                <td><b>Seats: </b></td>
    //                <td>${booking.numSeats}</td>
    //                </tr>
                    
    //                <tr>
    //                <td><b>Phone No.: </b></td>
    //                <td>${booking.phoneNo}</td>
    //                </tr>`; 
    //    tableContent += "</table><br /><br />";
    //})

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
        tableContent += "</table><br /><br />";
    }


    var tablesDiv = document.createElement("div"); // adds div to the page to place the tables
    tablesDiv.innerHTML = tableContent; // adds table HTML
    document.getElementById("bookingslist").appendChild(tablesDiv); // adds to page
}