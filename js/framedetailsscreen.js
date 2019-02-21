var framedetailsscreen = {

    loadDetailProfileScreen: function(appObj,framedet){
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="main-content details-page">';
        htmlStr += '<div class="single-details">';
        htmlStr += '<span class="arrow-up"><i class="fa fa-angle-down" id="backscreen"></i></span>';
        htmlStr += '<img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+framedet.sku+'" alt="">';
        htmlStr += '</div>';
        htmlStr += '<div class="slider-wrapper">';
        htmlStr += '<span class="arrow-up"><i class="fa fa-angle-down" id="backscreenfromslider"></i></span>';
        htmlStr += '<div id="single-slider">';
        htmlStr += '<img src="'+framedet.image+'" alt="">';
        htmlStr += '<img src="'+framedet.image2+'" alt="">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<p class="demo__card__name"><span class="post-name">'+framedet.brand+' '+framedet.size+' <span><i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> '+framedet.like_count+'</span></span>';
        htmlStr += '<span class="toggleTrueFalse" data-label-on="" data-label-off="" data-toggle-width="36">';
        htmlStr += '<input type="checkbox" value="false" id="parametros_MOSTRAPEDIDOS" class="toggleCheckBox" name="parametros.MOSTRAPEDIDOS" />';
        htmlStr += '<label class="clickToggle" for="parametros_MOSTRAPEDIDOS"></label>';
        htmlStr += '</span>';
        htmlStr += '<span class="frame">Frame Only </span>';
        htmlStr += '</p>';
        htmlStr += '<p>'+framedet.description+'</p>';
        htmlStr += '<div class="frame-container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-5">';
        htmlStr += '<span class="shape">Shape</span>';
        htmlStr += '<span class="shape-title">';
        htmlStr +=  framedet.shape;
        htmlStr += '<i>';
        htmlStr += '<img src="images/shape/'+framedet.shape+'.png">';
        htmlStr += '</i>';
        htmlStr += '</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-5">';
        var color = framedet.color;
        htmlStr += '<span class="shape">Color</span><span class="shape-title color">'+framedet.color+' <i class="'+color.toLowerCase()+'">';
        htmlStr += '</i></span>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-2">';
        htmlStr += '<span class="shape">Size</span><span class="shape-title">'+framedet.size.substr(0, 1)+'  </span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="lenskart-container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-8 l-purchase">';
        htmlStr += '<p><a href="https://www.lenskart.com/'+framedet.buynowkey+'.html" target="_blank">Go to Lenskart.com to purchase <i class="fa fa-arrow-right"></i></a></p>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-4 text-right">';
        htmlStr += '<span>Share</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    bindClicks: function(appObj){
        $('.wrapper').addClass('details-wrapper');

        $(".toggleTrueFalse label").click(function () {
            $(".toggleTrueFalse,.single-details,.slider-wrapper").toggleClass("active");
        });
        $.getScript( 'js/slick.js', function() {
            console.log('Slick script loaded');
        });

        $('#backscreen').click(function(){
            $('.wrapper').removeClass('details-wrapper');
            appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
            appObj.lookersScreen.bindClicks(appObj);
        });

        $('#backscreenfromslider').click(function(){
            $('.wrapper').removeClass('details-wrapper');
            appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
            appObj.lookersScreen.bindClicks(appObj);
        });
    }
}