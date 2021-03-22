function LogInUser() {
    // verify that the user's credentials are correct

    var name = document.forms[0]["username"].value;
    var password = document.forms[0]["password"].value;

    if (name && password) {

        window.sessionStorage.setItem("isLoggedIn", true);
        window.sessionStorage.setItem("username", name);

        $('#page-wrapper').load('loggedInIndexPanel.html', function () {
            $('#welcomeMsg').html("Welcome, " + name);
        });

        $('#logIn').html('<i class="fas fa-sign-out-alt"></i>   Log out (logged in as ' + name + ')');

        return true;
    }

    else {
        alert("Please enter a username and a password. If you don't have an account, you can create one.")

        return false;
    }
}

function DisplayWelcomeMsg() {
    
}