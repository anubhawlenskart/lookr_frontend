var lookersscreen = {
    userFrames : Array(),
    loadLookersScreen : function(appObj){
        var _this = this;
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';

        htmlStr += '<header class="header-section">';
        htmlStr += '<ul class="">';
        htmlStr += '<li id="settings"><a href="#"><i class="fa fa-gear" style="font-size:30px"></i></a></li>';
        htmlStr += '<li class="active ditto-profile" id="dittoprofile"><a href="#">&nbsp;</a></li>';
        htmlStr += '<li class="like" id="wishlist"><a href="#"><i class="fa fa-heart" aria-hidden="true" style="font-size:28px"></i></a></li>';
        htmlStr += '</ul>';
        htmlStr += '</header>';

        htmlStr += '<div class="main-content ditto-page">';
        htmlStr += '<div class="demo">';
        htmlStr += '<div class="demo__content">';
        htmlStr += '<div class="demo__card-cont">';

        /********** card html*******************/

        /********** card html*******************/
        htmlStr += '</div>';
        htmlStr += '<div class="demo-like">';
        htmlStr += '<p class="demo__card__name"><span class="post-name" id="framename"> </span><span class="like-post"><i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> </span></p>';
        htmlStr += '<div class="like-dislike"><span class="dislike-button"><i class="fa fa-thumbs-down"></i></span> <span class="like-button"><i class="fa fa-thumbs-up"></i></span></div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    bindCardCLick : function(appObj){
        var _this = this;
        $('.demo__card').click(function(){
            $('.wrapper').removeClass('ditto-wrapper');
            appObj.mainDom.innerHTML = appObj.frameDetailScreen.loadDetailProfileScreen(appObj,_this.userFrames[$(this).attr('id')]);
            appObj.frameDetailScreen.bindClicks(appObj);
        });
    },

    bindSwap : function(appObj){
        $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
            if (animating) return;

            $card = $(this);
            $cardReject = $(".demo__card__choice.m--reject", $card);
            $cardLike = $(".demo__card__choice.m--like", $card);
            var startX =  e.pageX || e.originalEvent.touches[0].pageX;

            $(document).on("mousemove touchmove", function(e) {
              var x = e.pageX || e.originalEvent.touches[0].pageX;
              pullDeltaX = (x - startX);
              if (!pullDeltaX) return;
              pullChange();
            });

            $(document).on("mouseup touchend", function() {
              $(document).off("mousemove touchmove mouseup touchend");
              if (!pullDeltaX) return; // prevents from rapid click events
              release();
            });
        });
    },


    getCardHtml : function(startkey,lastkey,appObj,isdisplay=false,reverse=false){
        var _this = this;
        var cardHtml = '';
        var style = 'style=display:none';
        if(isdisplay){
            style = 'style=display:block';
        }
        if(reverse){
            for(var i=lastkey; i >= startkey; i--){
                cardHtml += '<div class="demo__card" id="'+i+'" '+style+'>';
                cardHtml += '<div class="demo__card__top cyan">';
                cardHtml += '<div class="demo__card__img"><img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[i].sku+'" alt=""></div>';
                cardHtml += '</div>';
                cardHtml += '<div class="demo__card__choice m--reject"></div>';
                cardHtml += '<div class="demo__card__choice m--like"></div>';
                cardHtml += '<div class="demo__card__drag"></div>';
                cardHtml += '</div>';
            }

        }else{
            for(var i=startkey; i<=lastkey; i++){
                cardHtml += '<div class="demo__card" id="'+i+'" '+style+'>';
                cardHtml += '<div class="demo__card__top cyan">';
                cardHtml += '<div class="demo__card__img"><img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[i].sku+'" alt=""></div>';
                cardHtml += '</div>';
                cardHtml += '<div class="demo__card__choice m--reject"></div>';
                cardHtml += '<div class="demo__card__choice m--like"></div>';
                cardHtml += '<div class="demo__card__drag"></div>';
                cardHtml += '</div>';
            }
        }
        return cardHtml;
    },

    getUserFrames : function(appObj){
        var requestUrl = common.apiUrl+'/userframes?mobile='+appObj.getUserMobile()+'&dittoid='+appObj.getDittoId();
        res = common.sendRequest(requestUrl);
        return res;
    },

    renderCards : function(appObj){
        var _this = this;
        var userFrames = _this.getUserFrames(appObj);
        if('success' in userFrames){
            _this.userFrames = userFrames.success;
            var frameLen = _this.userFrames.length;
            common.enableLoader();
            $('.demo__card-cont').html(_this.getCardHtml(0,0,appObj,true,true));
            $('.demo__card').first().before(_this.getCardHtml(1,(appObj.cardcountinlookrscreen - 1),appObj,true,true));
            for(var i=4; i<=(frameLen - 1); i++){
                $('.demo__card').first().before(_this.getCardHtml(i,i,appObj));
            }
            _this.setFrameNameandLikeCount(appObj,0);
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }
        }
    },

    bindClicks : function(appObj){
        var _this = this;
        $('.wrapper').addClass('ditto-wrapper');
        // Set Swipe Cards
        _this.renderCards(appObj);
        _this.bindSwap(appObj);
        _this.bindCardCLick(appObj);
        // Set Swipe Cards
        $('#settings').click(function(){
            $('.wrapper').removeClass('ditto-wrapper');
            appObj.mainDom.innerHTML = appObj.settingScreen.loadSettingScreen(appObj);
            appObj.settingScreen.bindClicks(appObj);
        });

        // Wishlist click
        $('#wishlist').click(function(){
            $('.wrapper').removeClass('ditto-wrapper');
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
        $('#framename').html(appObj.lookersScreen.userFrames[key].description.substr(0, 50));
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
