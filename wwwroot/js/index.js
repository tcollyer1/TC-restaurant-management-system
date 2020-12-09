$(document).ready(function () {
    $('#book').click(function () {

        $('#page-wrapper').load('book.html');

        UpdateActive('#book');
        
    })

    $('#index').click(function () {
        $('#page-wrapper').load('indexPanel.html');

        UpdateActive('#index');

    })

    $('#cancelbooking').click(function () {
        $('#page-wrapper').load('cancelbooking.html');

        UpdateActive('#cancelbooking');
    })
 
});

function UpdateActive(item) // changes active page
{ 
    var items = $('.active');

    items.removeClass("active");

    $(item).addClass("active");
}