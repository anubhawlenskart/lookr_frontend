var framedetailsscreen = {

    loadDetailProfileScreen: function(appObj,framedet){
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="main-content details-page">';
        htmlStr += '<div class="single-details">';
        htmlStr += '<span class="arrow-up"><i class="fa fa-angle-left" id="backscreen"></i></span>';
        htmlStr += '<img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+framedet.sku+'" alt="">';
        htmlStr += '</div>';
        htmlStr += '<div class="slider-wrapper">';
        htmlStr += '<span class="arrow-up"><i class="fa fa-angle-left" id="backscreenfromslider"></i></span>';
        htmlStr += '<div id="single-slider">';
        htmlStr += '<img src="'+framedet.image+'" alt="">';
        htmlStr += '<img src="'+framedet.image2+'" alt="">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<p class="demo__card__name"><span class="post-name">'+framedet.brand+' '+framedet.size+'<span>';
        htmlStr += '<i>';
        htmlStr += '<svg width="24px" height="21px" viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        htmlStr += '<g id="Changes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
        htmlStr += '<g id="5.1-Frame-card-28-jan-Copy" transform="translate(-243.000000, -61.000000)" fill="#e9467b" fill-rule="nonzero">';
        htmlStr += '<g id="Group-7" transform="translate(110.000000, 46.000000)">';
        htmlStr += '<path d="M155.063342,17.0914579 C152.284839,14.3028474 147.779702,14.3028474 145.001199,17.0914579 L144.998883,17.0914579 C142.22022,14.3028474 137.715163,14.3028474 134.93666,17.0914579 C132.157997,19.8800684 132.558656,24.0503232 134.93666,27.189914 C137.45503,30.514691 142.053106,36 144.998883,36 L145.001199,36 C147.947056,36 152.544972,30.514691 155.063342,27.189914 C157.441426,24.0504033 157.841926,19.8801485 155.063342,17.0914579 Z" id="wishlist"></path>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</svg>';
        htmlStr += '</i> '+framedet.like_count+'</span></span>';

        htmlStr += '<span class="toggleTrueFalse" data-label-on="" data-label-off="" data-toggle-width="36">';
        htmlStr += '<input type="checkbox" value="false" id="parametros_MOSTRAPEDIDOS" class="toggleCheckBox" name="parametros.MOSTRAPEDIDOS" />';
        htmlStr += '<label class="clickToggle" for="parametros_MOSTRAPEDIDOS"></label>';
        htmlStr += '</span>';
        htmlStr += '<span class="frame">View Frames Only </span>';
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
        htmlStr += '<div class="col-md-12 l-purchase">';
        htmlStr += '<p><a href="https://www.lenskart.com/'+framedet.buynowkey+'.html" target="_blank">Buy Now <i class="fa fa-arrow-right"></i></a></p>';
        htmlStr += '</div>';
        //htmlStr += '<div class="col-md-4 text-right">';
        //htmlStr += '<span>Share</span>';
        //htmlStr += '</div>';
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
            $('#preloader').show();                  
            $('.wrapper').removeClass('details-wrapper');
            setTimeout(function(){                
                appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
                stackedCards();
                appObj.lookersScreen.bindClicks(app);
            }, 0);
        });

        $('#backscreenfromslider').click(function(){
            $('.wrapper').removeClass('details-wrapper');
            appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
            appObj.lookersScreen.bindClicks(appObj);
        });
    }
}
