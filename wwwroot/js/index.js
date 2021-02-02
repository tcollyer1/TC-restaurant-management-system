$(document).ready(function () {    

    $('#book').click(function () {

        $('#page-wrapper').load('book.html');

        RemoveActive(); 
        UpdateActive('#book');
        
    })

    $('#bookHomeScr').click(function () {

        $('#page-wrapper').load('book.html');

        RemoveActive();
        UpdateActive('#book');

    })

    $('#index').click(function () {
        $('#page-wrapper').load('indexPanel.html');

        RemoveActive();
        UpdateActive('#index');

    })

    $('#viewbookings').click(function () {

        $('#page-wrapper').load('viewBookings.html');


        RemoveActive();
        UpdateActive('#viewbookings');
    })

    $('#viewbookingsHomeScr').click(function () {

        $('#page-wrapper').load('viewBookings.html');


        RemoveActive();
        UpdateActive('#viewbookings');
    })

    $('#tables').click(function () {

        $('#page-wrapper').load('tables.html');


        RemoveActive();
        UpdateActive('#tables');
    })

    $('#tablesHomeScr').click(function () {

        $('#page-wrapper').load('tables.html');


        RemoveActive();
        UpdateActive('#tables');
    })

    $('#openingtimes').click(function () {

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