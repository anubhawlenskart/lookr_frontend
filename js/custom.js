$(document).ready(function() {
    $(".gender label").click(function () {
        $(".gender label").removeClass("active");
         $(this).addClass("active");
    });
    
    $(".age-group label").click(function () {
        $(".age-group label").removeClass("active");
         $(this).addClass("active");
    });
    
   /* $(".header-section li").click(function () {
        $(".header-section li").removeClass("active");
         $(this).addClass("active");
    });*/
    
    $('.wishlist-img .arrow-up').click(function () {
        $(this).parents('.wishlist-img').hide();
    });

    $("#alert-message").modal('hide')
        $(".apply").click(function showAlert() {
            $("#alert-message").fadeTo(1000, 1000).fadeTo(500, 500, function(){
            $("#alert-message").modal('toggle');
        });
   });
});
$(window).on( 'load', function(){
    $('#preloader').delay(300).fadeOut('slow',function(){
      $(this).hide();
    });
});
