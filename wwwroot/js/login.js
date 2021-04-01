var url = "http://localhost:5000/api/accounts";

async function LogInUser() {
    // verify that the user's credentials are correct
    var raw = await fetch(url);
    var accounts = await raw.json();

    var name = document.forms[0]["username"].value;
    var password = document.forms[0]["password"].value;
    var userFound = false;
    var realPassword;
    var accountType;

    for (var i = 0; i < accounts.length; i++) {
        var currentAccount = accounts[i];
        if (currentAccount.username == name) {
            userFound = true;
            realPassword = currentAccount.password;
            accountType = currentAccount.accountType;
        }
    }

    if (userFound) {
        if (password == realPassword) { // correct login
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("username", name);
            window.sessionStorage.setItem("accountType", accountType);

            $('#page-wrapper').load('loggedInIndexPanel.html', function () {
                $('#welcomeMsg').html("Welcome, " + name);
            });

            $('#logIn').html('<i class="fas fa-sign-out-alt"></i>   Log out (logged in as ' + name + ' - ' + accountType.toUpperCase() + ')');

            return true;
        }

        else {
            alert("Incorrect password.");

            return false;
        }
        
    }

    else if (name && password && !userFound) {
        alert("Account with the username " + name +" doesn't exist.");
        return false;
    }

    else {
        alert("Please enter a username and a password.")

        return false;
    }
}

async function CreateUserAccount() {
    var fName = document.forms[0]["accountFName"].value;
    var lName = document.forms[0]["accountLName"].value;
    var password = document.forms[0]["accountPwd"].value;
    var cfmPassword = document.forms[0]["cfmAccountPwd"].value;
    var accountType = $('input:radio[name=accountTypeSelection]:checked').val();

    if (fName && lName && password && cfmPassword && accountType) {
        if (password == cfmPassword) {
            var username = await GetNewUsername(fName[0], lName);
            alert("Account created. Your login username is " + username + ".");

            var newAccount = {
                "Username": username,
                "Password": password,
                "AccountType": accountType
            };

            await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAccount)
            });

            BackToLoginPage();

            return true;
        }
        else {
            alert("Error: passwords don't match.");

            return false;
        }
    }
    else {
        alert("Some fields are missing. Remember to select your account type, then enter your name and desired password.");

        return false;
    }
}

async function GetNewUsername(fName, lName) { // combines first and last name, potentially a number if the username already exists in the accounts file
    var proposedUsername = fName.toLowerCase() + lName.toLowerCase();
    var originalproposedUsername = proposedUsername;
    var username;
    var userNameExists = true;
    var number = 0;
    var raw = await fetch(url);
    var accounts = await raw.json();

    while (userNameExists) {
        userNameExists = false;
        number++;
        for (var i = 0, length = accounts.length; i < length; i++) {
            var currentAccount = accounts[i];
            if (currentAccount.username == proposedUsername) {
                userNameExists = true;
            }
        }

        if (!userNameExists) {
            username = proposedUsername;
        }

        else {
            if (proposedUsername != originalproposedUsername) {
                proposedUsername = originalproposedUsername + number.toString();
            }
            else proposedUsername += number.toString();
        }
    }

    return username;
    
}

function LoadAccountCreatePage() {
    $('#page-wrapper').load('register.html');
}

function BackToLoginPage() {
    $('#page-wrapper').load('loginpage.html');
}