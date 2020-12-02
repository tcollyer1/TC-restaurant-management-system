$(document).ready(function () {
    $('#book').click(function () {
        $('#page-content-wrapper').load('book.html');
    })

    $('#index').click(function () {
        $('#page-content-wrapper').load('indexPanel.html');
        
    })

    $('#cancelbooking').click(function () {
        $('#page-content-wrapper').load('cancelbooking.html');
    })
 
});

$(document).ready(function GetUserName() {
    document.getElementById("welcomeMsg").innerHTML = "Welcome, user"; // Will get actual username later on.
});