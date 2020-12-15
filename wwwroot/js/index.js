$(document).ready(function () {

    $('#book').click(function () {

        $('#page-wrapper').load('book.html');

        RemoveActive();
        UpdateActive('#book');
        
    })

    $('#index').click(function () {
        $('#page-wrapper').load('indexPanel.html');

        RemoveActive();
        UpdateActive('#index');

    })

    $('#cancelbooking').click(function () {
        $('#page-wrapper').load('cancelbooking.html');

        RemoveActive();
        UpdateActive('#cancelbooking');
    })

    $('#viewbookings').click(function () {

        $('#page-wrapper').load('viewBookings.html');


        RemoveActive();
        UpdateActive('#viewbookings');
        //DisplayBookings();
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









