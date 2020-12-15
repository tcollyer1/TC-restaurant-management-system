$('#bookingSubmit').click(function () {
    GetBookingDetails();    
})

function GetBookingDetails() {
    var fName = document.forms[0]["firstName"].value;
    var lName = document.forms[0]["lastName"].value;
    var seats = document.forms[0]["numSeats"].value;
    var phone = document.forms[0]["phone"].value;

    if (fName && lName && seats && phone) {
        alert("First name: " + fName + ", last name: " + lName + ", seats: " + seats + ", phone No.: " + phone);
    }
    else alert("Some form details missing");

    
}