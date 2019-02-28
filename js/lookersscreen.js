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
                htmlStr += '<p class="demo__card__name"><span class="post-name">Hungry cat </span><span class="like-post"><i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> 1234</span></p>';
                  htmlStr += '<div class="card-des"><span class="shape-color"><i></i></span><span class="card-shape">Clubmaster</span><span class="card-size">Clubmaster</span><span class="info"></span></div>';
                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '</div>';
            }
        }
        ///////////////Card Html
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"  width="auto" height="auto"/></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay right"><i>Good</i></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay left"><i>Bad</i></div>';
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

    bindSwap : function(appObj){

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
    setFrameNameandLikeCount : function(appObj,key){
        var _this = this;
        $('#framename').html(appObj.lookersScreen.userFrames[key].description.substr(0, 40)+' ...');
        $('.like-post').html('<i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> '+appObj.lookersScreen.userFrames[key].like_count);
    },

    swipeCard : function(appObj,key,swipeDirection){
        var _this = this;
        $('#'+key).remove();
        var newCardKey = parseInt(key) + (appObj.cardcountinlookrscreen);
        $('#'+newCardKey).show();
        if(newCardKey < _this.userFrames.length){
            _this.setFrameNameandLikeCount(appObj,parseInt(newCardKey));
        }else{
            _this.setFrameNameandLikeCount(appObj,parseInt(key));
        }

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
