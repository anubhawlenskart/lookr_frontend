$(document).ready(function () {
    //Visual da Section
    var $on = 'section';
    $($on).css({
        'background': 'none',
        'border': 'none',
        'box-shadow': 'none'
    });
  
    //
    //Ajusta tamanho dos elementos de acordo com o parametro passado
     $('.toggleTrueFalse').each(function(i) {
        var width = $(this).data('toggle-width');
        $(this).width(width);
        $(this).children('label').width(width * 0.45);
    });
  
    //
    $('.clickToggle').on('click',function () {
      var obj = $(this).prev();
      if ($(obj).is(":checked")) {

        $(obj).attr("value", false);
      }
      else {
        $(obj).attr("value", true);
      }
    });


    $('.toggleTrueFalse input[type=checkbox]').click(function (e) {
      e.stopPropagation();
    });
    //
});