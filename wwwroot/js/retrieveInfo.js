var bookings = {};

function GetBookingDetails() { // currently stores booking data locally as an object
    var fName = document.forms[0]["firstName"].value;
    var lName = document.forms[0]["lastName"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;
    var date = document.forms[0]["bookingDate"].value;
    var time = document.forms[0]["bookingTime"].value;
    

    if (fName && lName && seats && phone && date && time && seats <= 6 && seats >= 1)
    {
        alert("Booking for " + fName + " " + lName + " saved.");

        // store details as bookings object
        bookings = {
            "fName": fName,
            "lName": lName,
            "seats": seats,
            "phone": phone,
            "date": date,
            "time": time
        };

        //// // // This attempts to write bookings object to a text file, doesn't work great but just an attempt
        //const textToBLOB = new Blob([JSON.stringify(bookings)], { type: 'text/plain' });
        //const file = "/customerBookings/bookings.txt";

        //let newLink = document.createElement("a");
        //newLink.download = file;

        //if (window.webkitURL != null) {
        //    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
        //}
        //else {
        //    newLink.href = window.URL.createObjectURL(textToBLOB);
        //    newLink.style.display = "none";
        //    document.body.appendChild(newLink);
        //}

        //newLink.click();
        //// // // 

        // store booking to local storage
        var key = fName + lName;
        window.localStorage.setItem(key, JSON.stringify(bookings));        

        return true;
        
    }

    else if (!fName || !lName || !seats || !phone || !date || !time)
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

// Simple search through table for bookings - only works with first name currently
$("#bookingSearchBar").on("keyup", function () {
    var value = $(this).val();

    $("table tr").each(function (index) {
        if (index !== 0) {

            $row = $(this);

            var id = $row.find("td").text();

            if (id.indexOf(value) !== 0) {
                $row.hide();
            }
            else {
                $row.show();
            }
        }
    });
});

