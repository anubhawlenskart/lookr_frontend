var lookersscreen = {
    userFrames : Array(),
    loadLookersScreen : function(appObj){
        var _this = this;
        var htmlStr = '';
        htmlStr += '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';

        htmlStr += '<header class="header-section">';
        htmlStr += '<ul class="">';
        htmlStr += '<li id="settings"><a href="#"><i class="fa fa-gear" style="font-size:30px"></i></a></li>';
        htmlStr += '<li class="active ditto-profile" id="dittoprofile"><a href="#">&nbsp;</a></li>';
        htmlStr += '<li class="like" id="wishlist"><a href="#"><i class="fa fa-heart" aria-hidden="true" style="font-size:28px"></i></a></li>';
        htmlStr += '</ul>';
        htmlStr += '</header>';
        htmlStr += '<div class="stage">';
        htmlStr += '<div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">';
        htmlStr += '<div class="stackedcards-container">';

        /////////// Card html
        var _this = this;
        var userFrames = _this.getUserFrames(appObj);

        if('success' in userFrames){
            _this.userFrames = userFrames.success;
            var frameLen = _this.userFrames.length;
            for(var i=0; i<=(frameLen - 1); i++){
                htmlStr += '<div class="card" id="'+i+'">';
                htmlStr += '<div class="card-content">';
                htmlStr += '<div class="card-image"><img class="loading" src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[i].sku+'" width="50%" height="50%"/></div>';
                htmlStr += '<div class="card-titles">';
                htmlStr += '<p class="demo__card__name"><span class="post-name">'+_this.userFrames[i].brand+' </span><span class="like-post"><i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> '+_this.userFrames[i].like_count+' </span></p>';
                  htmlStr += '<div class="card-des"><span class="shape-color"><i class="'+_this.userFrames[i].color.toLowerCase()+'"></i></span><span class="card-shape">'+_this.userFrames[i].shape+' </span><span class="card-size">'+_this.userFrames[i].size+' </span><span class="info"><i></i></span></div>';
                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '</div>';
            }
        }
        ///////////////Card Html
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"  width="auto" height="auto"/></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay right"><i>COOL</i></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay left"><i>NOPE</i></div>';
        htmlStr += '</div>';
        htmlStr += '<div class="global-actions">';
        htmlStr += '<div class="left-action"></div>';
        htmlStr += '<div class="top-action"></div>';
        htmlStr += '<div class="right-action"></div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="final-state hidden"><h2>Got it! We received your preferences! <br/> To submit again, press F5.</h2></div>';
        htmlStr += '</div></div></div>';
        return htmlStr;
    },

    bindCardCLick : function(appObj){
        var _this = this;
        $('.card').click(function(){
            $('.wrapper').removeClass('ditto-wrapper');
            appObj.mainDom.innerHTML = appObj.frameDetailScreen.loadDetailProfileScreen(appObj,_this.userFrames[$(this).attr('id')]);
            appObj.frameDetailScreen.bindClicks(appObj);
        });
    },

    getUserFrames : function(appObj){
        var requestUrl = common.apiUrl+'/userframes?mobile='+appObj.getUserMobile()+'&dittoid='+appObj.getDittoId();
        res = common.sendRequest(requestUrl);
        return res;
    },


    bindClicks : function(appObj){
        var _this = this;

        _this.bindCardCLick(appObj);
        // Set Swipe Cards
        $('#settings').click(function(){
            $('body').removeAttr('class');
            appObj.mainDom.innerHTML = appObj.settingScreen.loadSettingScreen(appObj);
            appObj.settingScreen.bindClicks(appObj);
        });

        // Wishlist click
        $('#wishlist').click(function(){
            $('body').removeAttr('class');
            appObj.mainDom.innerHTML = appObj.wishListScreen.wishListScreen(appObj);
            appObj.wishListScreen.bindClicks(appObj);
        });
    },

    swipeCard : function(key,swipeDirection){
        var _this = this;
        var swipesObject = {};
        swipesObject.sku = _this.userFrames[key].sku;
        swipesObject.direction = swipeDirection;
        if(swipeDirection == 'right'){
            swipesObject.status = 'Like';
        }else{
            swipesObject.status = 'Dislike';
        }
        app.swipedCardId.push(swipesObject);
    }
}
