if (window.sessionStorage.getItem("isLoggedIn") === null) {
    window.sessionStorage.setItem("isLoggedIn", false); // sets login status as false on startup (user isn't logged in)
}

// $('#page-wrapper').load('loggedInIndexPanel.html', function () {
//     var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

//     if (isLoggedIn != "false") {
//         $('#logIn').html('<i class="fas fa-sign-out-alt"></i>   Log out');
//     }
// });

$(document).ready(function () {
    $('#logIn').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            $('#page-wrapper').load('loginpage.html');
            RemoveActive();
            UpdateActive('#logIn');
        }

        else {
            alert("Logging out..."); // TODO: ask the user if they're sure they want to log out
            window.sessionStorage.setItem("isLoggedIn", false);
            $('#logIn').html('<i class="fas fa-sign-in-alt"></i>   Log in');
            $('#page-wrapper').load('index2.html');
            RemoveActive();
            UpdateActive('#index');
        }

        
    })

    $('#logInLink').off().click(function () {
        $('#page-wrapper').load('loginpage.html');
            RemoveActive();
            UpdateActive('#logIn');
    })

    $('#logInLink2').off().click(function () {
        $('#page-wrapper').load('loginpage.html');
            RemoveActive();
            UpdateActive('#logIn');
    })

    $('#book').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('book.html');
            RemoveActive();
            UpdateActive('#book');
        }
    })

    $('#bookHomeScr').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        // if (isLoggedIn == "false") {
            // alert("You need to log in before you can access this content.")
        // }
        // else {
            $('#page-wrapper').load('book.html');
            RemoveActive();
            UpdateActive('#book');
        // }
    })

    $('#index').off().click(function () {
        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            $('#page-wrapper').load('index2.html');

            RemoveActive();
            UpdateActive('#index');
        }

        else {
            var username = window.sessionStorage.getItem("username");

            $('#page-wrapper').load('loggedInIndex2.html', function () {
                $('#welcomeMsg').html("Welcome, " + username);

            });

            RemoveActive();
            UpdateActive('#index');
        }
    })

    $('#viewbookings').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('viewBookings.html');  
            RemoveActive();         
            UpdateActive('#viewbookings');
        }
    })

    $('#viewbookingsHomeScr').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('viewBookings.html');
            RemoveActive();
            UpdateActive('#viewbookings');
        }
    })

    $('#tables').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('tables.html');
            RemoveActive();
            UpdateActive('#tables');
        } 
    })

    $('#tablesHomeScr').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('tables.html');
            RemoveActive();
            UpdateActive('#tables');
        }
    })

    $('#openingtimes').off().click(function () {

        var isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn == "false") {
            alert("You need to log in before you can access this content.")
        }
        else {
            $('#page-wrapper').load('openingtimes.html');
            RemoveActive();
        }
    })   
});

function UpdateActive(item) // changes active page
{ 
    $(item).addClass("active");
}

function RemoveActive()
{
    var items = $('.active');
    items.removeClass("active");   
}