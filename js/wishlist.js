var wishlist = {

    getUserWishList : function(appObj){
        var requestUrl = common.apiUrl+'/getwishlist?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        if ('success' in res){
            return res.success;
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }else{
                appObj.showPopup('Some error occur','alert-danger','Error!');
            }
        }
    },

    getwishListFramesHtml : function(appObj){
        var responseList = Array();
        var framesObj = this.getUserWishList(appObj);
        var framesonlyHtm = '';
        var dittoHtm = '';
        framesObj.forEach(function(element,index) {
            framesonlyHtm += '<div class="col-md-6">';
            framesonlyHtm += '<div class="wishlist-img" sku="'+element.sku+'">';
            framesonlyHtm += '<img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+element.sku+'" alt="">  <span class="arrow-up"><i class="fa">&times;</i></span>';
            framesonlyHtm += '<span class="wish-title">'+element.brand+' '+element.size+' <span class="input-arrow" ></span></span>';
            framesonlyHtm += '</div>';
            framesonlyHtm += '</div>';

            dittoHtm += '<div class="col-md-6">  <div class="wishlist-img" sku="'+element.sku+'">';
            dittoHtm += '<img src="'+element.image+'" alt="">  <span class="arrow-up"><i class="fa">&times;</i></span>';
            dittoHtm += '<span class="wish-title">'+element.brand+' '+element.size+' <span class="input-arrow"><i class="fa fa-arrow-right"></i></span></span>';
            dittoHtm += '</div></div>';

        });
        responseList['dittoHtml'] = framesonlyHtm;
        responseList['framesHtml'] = dittoHtm;
        return responseList;
    },

    wishListScreen : function(appObj){
        var _this = this;
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<header class="header-section">';
        htmlStr += '<ul class="">';
        htmlStr += '<li id="settings"><a href="#"><i class="fa fa-gear" style="font-size:30px"></i></a></li>';
        htmlStr += '<li class="ditto-profile" id="dittoprofile"><a href="#">&nbsp</a></li>';
        htmlStr += '<li class="like active" id="wishlist"><a href="#"><i class="fa fa-heart" aria-hidden="true" style="font-size:28px"></i></a></li>';
        htmlStr += '</ul>';
        htmlStr += '</header>';
        htmlStr += '<div class="main-content wishlist-page">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<p class="demo__card__name"><span class="post-name">My Wishlist </span>';
        htmlStr += '<span class="toggleTrueFalse" data-label-on="" data-label-off="" data-toggle-width="36">';
        htmlStr += '<input type="checkbox" value="false" id="parametros_MOSTRAPEDIDOS" class="toggleCheckBox" name="parametros.MOSTRAPEDIDOS" />';
        htmlStr += '<label class="clickToggle" for="parametros_MOSTRAPEDIDOS"></label>';
        htmlStr += '</span>';
        htmlStr += '<span class="frame" id="framefilter">View Frames Only </span> </p>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="single-details row">';

        /********  Add Wishlist frames html with ditto ********/
        var getHtmlList = _this.getwishListFramesHtml(appObj)
        htmlStr += getHtmlList['dittoHtml'];
        /********  Add Wishlist frames html with ditto ********/

        htmlStr += '</div>';
        htmlStr += '<div class="slider-wrapper">';
        htmlStr += '<div id="single-product" class="row">';

        /********  Add Wishlist frames html with frames only ********/
        htmlStr += getHtmlList['framesHtml'];
        /********  Add Wishlist frames html with frames only ********/

        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    bindWIshlistImgClick : function(appObj){
        $('.wish-title').click(function(){
            $('.wrapper').removeClass('wishlist-wrapper');
            var prdsku = $(this).parent().attr('sku');
            var requestUrl = common.apiUrl+'/productdetail?sku='+prdsku;
            res = common.sendRequest(requestUrl);
            if ('success' in res){
                appObj.mainDom.innerHTML = appObj.frameDetailScreen.loadDetailProfileScreen(appObj,res.success.detail);
                appObj.frameDetailScreen.bindClicks(appObj);
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }else{
                    appObj.showPopup('Some error occur','alert-danger','Error!');
                }
            }
        });
    },

    bindClicks : function(appObj){
        var _this = this;
        $('.wrapper').addClass('wishlist-wrapper');
        _this.bindWIshlistImgClick(appObj);
        // Bind setting CLick
        $('#settings').click(function(){
            $('.wrapper').removeClass('wishlist-wrapper');
            appObj.mainDom.innerHTML = appObj.settingScreen.loadSettingScreen(appObj);
            appObj.settingScreen.bindClicks(appObj);
        });

        // Bind click for lookr
        $('#dittoprofile').click(function(){
            $('.wrapper').removeClass('wishlist-wrapper');
            appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj); 
            stackedCards();                  
            appObj.lookersScreen.bindClicks(app);
        });

        // Bind Frames only filter click
        $(".toggleTrueFalse label").click(function () {
            if($('.toggleTrueFalse').hasClass( "active" )){
                $(".toggleTrueFalse").removeClass("active");
                $(".single-details").fadeIn();
                $(".slider-wrapper").fadeOut();
            }else{
                $(".toggleTrueFalse").toggleClass("active");
                $(".single-details").fadeOut();
                $(".slider-wrapper").fadeIn();
            }
        });

        // Bind close icon click
        $('.arrow-up i').click(function(e){
            var requestUrl = common.apiUrl+'/clearwishlist?mobile='+appObj.getUserMobile();
            requestUrl +='&sku='+$(this).parent().parent().attr('sku');
            res = common.sendRequest(requestUrl,'POST',false);
            if('success' in res){
                $(this).parent().parent().parent().remove();
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }
            }
        })
    }

};
