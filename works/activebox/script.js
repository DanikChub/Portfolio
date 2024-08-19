$(function() {

    // Fixed Header
    let header = $("#header"),
        intro = $("#intro"),
        introH = intro.innerHeight(),
        scrollPos = $(window).scrollTop();

        checkScroll(scrollPos, introH);
    
    $(window).on("scroll resize", function() {
        introH = intro.innerHeight();
        scrollPos = $(window).scrollTop();
        
        checkScroll(scrollPos, introH);
    });

    function checkScroll(scrollPos, introH) {
        if( scrollPos > introH ) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }


    /* Smooth scroll */
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let elementId = $(this).data('scroll'),
            elementOffset = $(elementId).offset().top;

        nav.removeClass("show");

        $("html, body").animate({
            scrollTop: elementOffset - 70
        }, 500);
    });

    // Nav Toggle
    let nav = $("#nav"),
        navToggle = $("#navToggle");

    navToggle.on("click", function(event) {
        event.preventDefault();

        nav.toggleClass("show");
    });

    // Reviews https://github.com/kenwheeler/slick/

    let slider = $("#reviewsSlider");

    slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
        dots: true
      });
});