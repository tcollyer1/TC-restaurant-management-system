var keys = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // key names for local storage

function EditOpeningTimesPage() { // prefills any already-entered opening time details on any day on opening times modify page

    $('#page-wrapper').load('modifyOpeningTimes.html', function () {

        var validOpeningTimesKey = /^[A-Za-z]+$/; // this separates the opening times from bookings in JS local storage. Bookings are stored (currently) with a numerical phone No. as key, opening times are stored by day name as key.

        for (var i = 0, length = localStorage.length; i < length; i++) {
            var key = localStorage.key(i);
            var isOpeningTimesEntry = false;
    
            if (key.match(validOpeningTimesKey)) {
                isOpeningTimesEntry = true;
            }
    
            if (isOpeningTimesEntry) {
                var timesInfo = JSON.parse(window.localStorage.getItem(key));
                $('#' + key + 'Open').val(timesInfo.open);
                $('#' + key + 'Close').val(timesInfo.close);
            }
        }
    });

}


function BackToOpeningTimes() {
    $('#page-wrapper').load('openingTimes.html');
}

function StoreOpeningTimes() { // stores all opening times in JS local storage so far with key being the day name, as an object with properties open and close correlating to opening and closing times.
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

    let allTimes = [mondayTimes, tuesdayTimes, wedsTimes, thursTimes, fridayTimes];   

    for (x = 0; x <= 4; x++) {
        // var key = keys[x];
        // window.localStorage.setItem(key, JSON.stringify(allTimes[x]));

            var currentDay = allTimes[x];

            if ((currentDay.open != '' && currentDay.close == '') || (currentDay.open == '' && currentDay.close != '')) {
                alert("One or more invalid opening times. Please enter either: both an opening AND closing time, or neither to indicate that the restaurant is closed.");
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
    var validOpeningTimesKey = /^[A-Za-z]+$/;

    for (var i = 0, length = localStorage.length; i < length; i++) {
        var key = localStorage.key(i);
        var isOpeningTimesEntry = false;

        if (key.match(validOpeningTimesKey)) {
            isOpeningTimesEntry = true;
        }

        if (isOpeningTimesEntry) {
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