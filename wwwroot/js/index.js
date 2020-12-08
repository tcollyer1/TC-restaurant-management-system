$(document).ready(function () {
    $('#book').click(function () {

        $('#page-wrapper').load('book.html');

        //var items = $('#page-content > #sidenav nav ul li a');

        //var activeItems = items.$('.active');

        //activeItems.each(function () {
        //    var current = $(this);
        //    current.removeClass('active');
        //})

        //$('#page-content #sidenav nav ul li a .nav-link').removeClass("active");
        //$('#page-content #sidenav nav ul li a .nav-link').addClass("na");

        //$(this).addClass("active");
        //$(this).removeClass("na");
        
    })

    $('#index').click(function () {
        $('#page-wrapper').load('indexPanel.html');
        
    })

    $('#cancelbooking').click(function () {
        $('#page-wrapper').load('cancelbooking.html');

        //$('#page-content #sidenav nav ul li a .nav-link').removeClass("active");
        //$('#page-content #sidenav nav ul li a .nav-link').addClass("na");

        //$(this).addClass("active");
        //$(this).removeClass("na");
    })
 
});