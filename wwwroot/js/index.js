$(document).ready(function () {    

    $('#book').off().click(function () {

        $('#page-wrapper').load('book.html');

        RemoveActive(); 
        UpdateActive('#book');
        
    })

    $('#bookHomeScr').off().click(function () {

        $('#page-wrapper').load('book.html');

        RemoveActive();
        UpdateActive('#book');

    })

    $('#index').off().click(function () {
        $('#page-wrapper').load('indexPanel.html');

        RemoveActive();
        UpdateActive('#index');

    })

    $('#viewbookings').off().click(function () {

        $('#page-wrapper').load('viewBookings.html');

        RemoveActive();
        UpdateActive('#viewbookings');
    })

    $('#viewbookingsHomeScr').off().click(function () {

        $('#page-wrapper').load('viewBookings.html');

        RemoveActive();
        UpdateActive('#viewbookings');
    })

    $('#tables').off().click(function () {

        $('#page-wrapper').load('tables.html');


        RemoveActive();
        UpdateActive('#tables');
    })

    $('#tablesHomeScr').off().click(function () {

        $('#page-wrapper').load('tables.html');


        RemoveActive();
        UpdateActive('#tables');
    })

    $('#openingtimes').off().click(function () {

        $('#page-wrapper').load('openingTimes.html');

        RemoveActive();

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