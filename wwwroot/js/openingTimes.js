var keys = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // key (day) names for local storage

function EditOpeningTimesPage() { // prefills any already-entered opening time details on any day on opening times modify page

    var accountType = window.sessionStorage.getItem("accountType");

    if (accountType == "owner") {
        $('#page-wrapper').load('modifyOpeningTimes.html', function () {
            for (var i = 0, length = localStorage.length; i < length; i++) {
                var key = localStorage.key(i);
                var timesInfo = JSON.parse(window.localStorage.getItem(key));

                $('#' + key + 'Open').val(timesInfo.open);
                $('#' + key + 'Close').val(timesInfo.close);
            }
        });
    }

    else {
        alert("You don't have permission to edit opening times.");
    }
}

function BackToOpeningTimes() {
    $('#page-wrapper').load('openingTimes.html');
}

// Stores all opening times in JS local storage with key being the day name, value being an object with properties for opening and closing hours
function StoreOpeningTimes() { 
    var mondayTimes = {
        "open": document.forms[0]["MondayOpen"].value,
        "close": document.forms[0]["MondayClose"].value,
    };

    var tuesdayTimes = {
        "open": document.forms[0]["TuesdayOpen"].value,
        "close": document.forms[0]["TuesdayClose"].value,
    };

    var wedsTimes = {
        "open": document.forms[0]["WednesdayOpen"].value,
        "close": document.forms[0]["WednesdayClose"].value,
    };

    var thursTimes = {
        "open": document.forms[0]["ThursdayOpen"].value,
        "close": document.forms[0]["ThursdayClose"].value,
    };

    var fridayTimes = {
        "open": document.forms[0]["FridayOpen"].value,
        "close": document.forms[0]["FridayClose"].value,
    };

    var satTimes = {
        "open": document.forms[0]["SaturdayOpen"].value,
        "close": document.forms[0]["SaturdayClose"].value,
    };

    var sunTimes = {
        "open": document.forms[0]["SundayOpen"].value,
        "close": document.forms[0]["SundayClose"].value,
    };

    let allTimes = [sunTimes, mondayTimes, tuesdayTimes, wedsTimes, thursTimes, fridayTimes, satTimes];

    for (x = 0; x <= 6; x++) {;

        var currentDay = allTimes[x];
        var opens = new Date();
        var closes = new Date();

        opens.setHours(currentDay.open.split(':')[0]);
        opens.setMinutes(currentDay.open.split(':')[1]);
        opens.setSeconds(0);

        closes.setHours(currentDay.close.split(':')[0]);
        closes.setMinutes(currentDay.close.split(':')[1]);
        closes.setSeconds(0);

        if ((currentDay.open != '' && currentDay.close == '') || (currentDay.open == '' && currentDay.close != '')) {
            alert("One or more incomplete opening times entered. Please enter either: both an opening AND closing time, or neither to indicate that the restaurant is closed.");
            return false;
        }

        else if (closes <= opens) {
            alert("One or more sets of invalid opening hours entered.");
            return false;
        }
    }

    for (i = 0; i < allTimes.length; i++) {
        var key = keys[i];
        var currentDay = allTimes[i];

        window.localStorage.setItem(key, JSON.stringify(currentDay));
    }

    alert("Opening times updated successfully.");
    BackToOpeningTimes();
    return true;
}

function DisplayOpeningTimes() { // displays user-stored opening times on opening times page
    if (localStorage.length != 0) {
        for (var i = 0, length = localStorage.length; i < length; i++) {
            var key = localStorage.key(i);
            var times = JSON.parse(localStorage[key]);

            if (times.open === '' && times.close === '') {
                $('#' + key).text(key + ': ' + 'CLOSED');
            }
            else $('#' + key).text(key + ': ' + times.open + ' - ' + times.close);
            
        }
    }
}

function ClearTimesField(day) {
    $('#' + day + 'Open').val('');
    $('#' + day + 'Close').val('');
}

function GetDayToday() { // gets actual day of the week to display daily updated opening times
    var date = new Date();
    var todayNum = date.getDay();
    var today = keys[todayNum];

    return today;
}

function DisplayTodaysOpeningTimes() { // displays today's stored opening times in footer
    var key = GetDayToday();

    try {
        var times = JSON.parse(localStorage[key]);

        if (times.open !== '' && times.close !== '') {
            $('#todaysTimes').text(times.open + ' - ' + times.close + '.');
        }

        else $('#todaysTimes').text('CLOSED.');
    } catch (e) {
        $('#todaysTimes').text("none set.");
    }

}