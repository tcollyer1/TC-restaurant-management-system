newTable = {};
var url = "http://localhost:5000/api/tables";

async function AddNewTable() { // Currently stores table data in JSON format to a .csv file
    var seats = document.forms[0]["tableseats"].value;

    if (seats <= 6 && seats >= 1) {
        alert("Table added!");

        // store details as table object
        newTable = {
            "TableNo": 0, // temp table num value. This is calculated in the backend
            "Seats": parseInt(seats),
        };

        // store table to tables.csv

        await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTable)
        });

        $(".form-input").val('');

        BackToTables();

        return true;
    }

    else if (!seats) {
        alert("Please enter a value for the number of seats.");

        // do not store details

        return false;
    }

    else {
        alert("Please enter a number of seats that is between 1 and 6.")
        return false;
    }  
}

async function AddTablesData() { // adds row to HTML table of all restaurant tables to display table name and No. seats, as well as modify/remove buttons
    var raw = await fetch(url);
    var data = await raw.json();

    for (var i = 0, length = data.length; i < length; i++) {
        let tableContent = "";
        var currentTable = data[i];

        var tableInfo = currentTable;

        tableContent += `
                        <td>Table ${tableInfo.tableNo}</td>
                        <td>${tableInfo.seats}</td>
                        <td id="cancelbutton"><button id="${tableInfo.tableNo}" type="button" class="site-button site-button-cancel" onclick="RemoveTable('${tableInfo.tableNo}')"><i class="far fa-trash-alt"></i> Remove</button></td>
                        <td id="modifybutton"><button id="${tableInfo.tableNo}" type="button" class="site-button" onclick="ModifyTable('${tableInfo.tableNo}')"><i class="fas fa-user-edit"></i> Modify</button></td>
                        `;

        var tableRow = document.createElement("tr"); // adds new row to the page to place the tables
        tableRow.innerHTML = tableContent; // adds table HTML
        document.getElementById("tablesData").appendChild(tableRow); // adds to page
    }
}

function ModifyTable(tableNum) { // Allows user to change the number of seats at a table. (Maybe should only allow for seats to be increased so as not to make some bookings associated with that table potentially invalid?)
    var accountType = window.sessionStorage.getItem("accountType");

    if (accountType == "owner") {
        $('#page-wrapper').load('modifyTable.html', async function () {

            var raw = await fetch(url);
            var data = await raw.json();
    
            for (i = 0; i < data.length; i++) {
                var current = data[i];
                if (current.tableNo == tableNum) {
                    var tableInfo = current;
                }
            }
    
            $('#seatsEdit').val(tableInfo.seats);
    
            window.sessionStorage.setItem("TABLE_ID", tableNum); // stores ID of selected booking to be modified to be accessed by UpdateBookingToStorage()
        });
    }

    else alert("You don't have permission to modify table seats.");
    
    
}

async function UpdateTableToStorage() { // Store updated value to .csv
    var seats = document.forms[0]["seatsEdit"].value;
    var tableNumber = window.sessionStorage.getItem("TABLE_ID");

    if (seats <= 6 && seats >= 1) {
        alert("Table " + tableNumber + " updated!");

        // store details as table object
        newTable = {
            "TableNo": parseInt(tableNumber), // temp table num value. This is calculated in the backend
            "Seats": parseInt(seats),
        };

        // store table to tables.csv

        await fetch(url + "/" + parseInt(tableNumber), {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTable)
        });

        BackToTables();

        return true;
    }

    else if (!seats) {
        alert("Please enter a value for the number of seats.");

        // do not store details

        return false;
    }

    else {
        alert("Please enter a number of seats that is between 1 and 6.")

        return false;
    }  

}

async function RemoveTable(tableNum) { // Removes a table from storage. (May potentially be an issue with bookings if they're matched with table numbers that no longer are on the system)

    var accountType = window.sessionStorage.getItem("accountType");

    if (accountType == "owner") {
        var raw = await fetch(url);
        var data = await raw.json();

        for (i = 0; i < data.length; i++) {
            var current = data[i];
            if (current.tableNo == tableNum) {
                var tableInfo = current;
            }
        }

        if (confirm("Are you sure you want to remove table " + tableInfo.tableNo + "?")) {
            alert("Table " + tableInfo.tableNo + " removed.");

            await fetch(url + "/" + tableNum, {
                method: "DELETE"
            });
        }

        $('#page-wrapper').load('tables.html');
    }

    else alert("You don't have permission to remove tables.");

    
}

function BackToTables() {
    $('#page-wrapper').load('tables.html');
}

function OpenAddTablePage() {
    var accountType = window.sessionStorage.getItem("accountType");
    if (accountType == "owner") {
        $('#page-wrapper').load('addTable.html');
    }

    else alert("You don't have permission to add tables.");
}