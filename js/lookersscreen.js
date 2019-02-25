var lookersscreen = {
    userFrames : Array(),
    loadLookersScreen : function(appObj){
        var _this = this;
        var userFrames = this.getUserFrames(appObj);
        if('success' in userFrames){
            _this.userFrames = userFrames.success;
            cardHtml = this.getCardHtml(appObj);
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }
        }
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
        htmlStr += cardHtml;
        /********** card html*******************/
        htmlStr += '</div>';
        htmlStr += '<div class="demo-like">';
        htmlStr += '<p class="demo__card__name"><span class="post-name" id="framename">Hungry cat </span><span class="like-post"><i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> 1234</span></p>';
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

    bindClicks : function(appObj){
        var _this = this;
        $('.wrapper').addClass('ditto-wrapper');
        _this.bindCardCLick(appObj);

        // Bind setting CLick
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

    getUserFrames : function(appObj){
        var requestUrl = common.apiUrl+'/userframes?mobile='+appObj.getUserMobile()+'&dittoid='+appObj.getDittoId();
        res = common.sendRequest(requestUrl);
        return res;
    },

    getCardHtml : function(appObj){
        var _this = this;
        var cardHtml = '';
        var frameLen = _this.userFrames.length;
        if(frameLen > 0){
            if(frameLen == 1){
                cardHtml += '<div class="demo__card" id="'+(frameLen - 1)+'">';
                cardHtml += '<div class="demo__card__top cyan">';
                cardHtml += '<div class="demo__card__img"><img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[frameLen - 1].sku+'" alt=""></div>';
                cardHtml += '</div>';
                cardHtml += '<div class="demo__card__choice m--reject"></div>';
                cardHtml += '<div class="demo__card__choice m--like"></div>';
                cardHtml += '<div class="demo__card__drag"></div>';
                cardHtml += '</div>';
            }else{
                for(var i = 1; i>=0; i--){
                    cardHtml += '<div class="demo__card" id="'+i+'">';
                    cardHtml += '<div class="demo__card__top cyan">';
                    cardHtml += '<div class="demo__card__img"><img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[i].sku+'" alt=""></div>';
                    cardHtml += '</div>';
                    cardHtml += '<div class="demo__card__choice m--reject"></div>';
                    cardHtml += '<div class="demo__card__choice m--like"></div>';
                    cardHtml += '<div class="demo__card__drag"></div>';
                    cardHtml += '</div>';
                }
            }
        }else{
            cardHtml += '<div class="demo__card">';
            cardHtml += '<div class="demo__card__top cyan">';
            cardHtml += '<div class="demo__card__img"><img src="images/profile1.jpg" alt=""></div>';
            cardHtml += '</div>';
            cardHtml += '<div class="demo__card__choice m--reject"></div>';
            cardHtml += '<div class="demo__card__choice m--like"></div>';
            cardHtml += '<div class="demo__card__drag"></div>';
            cardHtml += '</div>';
            cardHtml += '<div class="demo__card">';
            cardHtml += '<div class="demo__card__top cyan">';
            cardHtml += '<div class="demo__card__img"><img src="images/profile1.jpg" alt=""></div>';
            cardHtml += '</div>';
            cardHtml += '<div class="demo__card__choice m--reject"></div>';
            cardHtml += '<div class="demo__card__choice m--like"></div>';
            cardHtml += '<div class="demo__card__drag"></div>';
            cardHtml += '</div>';
        }
        return cardHtml;
    },

    setFrameNameandLikeCount : function(appObj,key){
        var _this = this;
        var nameStr = appObj.lookersScreen.userFrames[key+1].brand+' '+appObj.lookersScreen.userFrames[key+1].size;
        $('#framename').html(nameStr.substr(0, 25));
        $('.like-post').html('<i class="fa fa-heart" aria-hidden="true" style="font-size:18px"></i> '+appObj.lookersScreen.userFrames[key+1].like_count);
    },

    swipeCard : function(appObj,key,swipeDirection){
        var _this = this;
        $('#'+key).remove();

        var newCardKey = parseInt(key) + 2;
        if(newCardKey <= _this.userFrames.length){
            var cardHtml = '<div class="demo__card" id="'+ newCardKey +'">';
            cardHtml += '<div class="demo__card__top cyan">';
            cardHtml += '<div class="demo__card__img"><img src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[newCardKey].sku+'" alt=""></div>';
            cardHtml += '</div>';
            cardHtml += '<div class="demo__card__choice m--reject"></div>';
            cardHtml += '<div class="demo__card__choice m--like"></div>';
            cardHtml += '<div class="demo__card__drag"></div>';
            cardHtml += '</div>';
        }
        $('.demo__card').before(cardHtml);
        _this.setFrameNameandLikeCount(appObj,parseInt(newCardKey));
        _this.bindCardCLick(appObj);
        // First set the user swipe
        var requestUrl = common.apiUrl+'/userswapes?mobile='+appObj.getUserMobile();
        requestUrl +='&sku='+_this.userFrames[key].sku;
        requestUrl +='&swaptype='+swipeDirection;
        requestUrl +='&dittoid='+appObj.getDittoId();
        res = common.sendRequest(requestUrl,'POST',false);

        // Now manage like and dislike count
        if('success' in res){
            var status = '';
            if(swipeDirection == 'right'){
                status = 'Like';
            }else{
                status = 'Dislike';
            }
            var requestUrl = common.apiUrl+'/likedislikeproduct?mobile='+appObj.getUserMobile();
            requestUrl +='&sku='+_this.userFrames[key].sku;
            requestUrl +='&status='+status;
            res = common.sendRequest(requestUrl,'POST',false);
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }
        }

    }
}
