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
        htmlStr += '<div class="title"></div>';
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
                htmlStr += '<h1>Adventure <br/> and Outdoor</h1>';
                htmlStr += '<h3>10 Destinations</h3>';
                htmlStr += '</div>';
                htmlStr += '</div>';
                htmlStr += '</div>'; 
            }
        }
        ///////////////Card Html
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"  width="auto" height="auto"/></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay right"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="auto" height="auto"/></div>';
        htmlStr += '<div class="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto"/></div>';
        htmlStr += '</div>';
        htmlStr += '<div class="global-actions">';
        htmlStr += '<div class="left-action"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="26" height="26"/></div>';
        htmlStr += '<div class="top-action"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="18" height="16"/></div>';
        htmlStr += '<div class="right-action"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="30" height="28"/></div>';
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
            appObj.mainDom.innerHTML = appObj.settingScreen.loadSettingScreen(appObj);
            appObj.settingScreen.bindClicks(appObj);
        });

        // Wishlist click
        $('#wishlist').click(function(){
            appObj.mainDom.innerHTML = appObj.wishListScreen.wishListScreen(appObj);
            appObj.wishListScreen.bindClicks(appObj);
        })

        // Bind Like and Dislike button click
        $('.dislike-button').click(function(e){
            $card = $('.demo__card').last();
            $card.find('.demo__card__choice.m--reject').css({opacity : '0.48'});
            var cardId = $($card).attr('id');
            $card.addClass('rotate-right').delay(700).fadeOut(function(){
                $card.remove();
                _this.swipeCard(appObj,cardId,'left');
            });
        })

        $('.like-button').click(function(e){
            $card = $('.demo__card').last();
            $card.find('.demo__card__choice.m--like').css({opacity : '0.48'});
            var cardId = $($card).attr('id');
            $card.addClass('rotate-left').delay(700).fadeOut(function(){
                $card.remove();
                _this.swipeCard(appObj,cardId,'right')
            });
        })
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
