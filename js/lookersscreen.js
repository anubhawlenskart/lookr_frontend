var lookersscreen = {
    userFrames : Array(),
    swipedFrameIndex : Array(),
    loadLookersScreen : function(appObj){
        var _this = this;
        var htmlStr = '';
        htmlStr += '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<header class="header-section">';
        htmlStr += '<ul class="">';
        htmlStr += '<li id="settings">';
        htmlStr += '<a href="#">';
        htmlStr += '<svg width="23px" height="24px" viewBox="0 0 23 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        htmlStr += '<g id="Changes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
        htmlStr += '<g id="5.1-Frame-card-28-jan-Copy" transform="translate(-110.000000, -58.000000)" fill="#FFFFFF" fill-rule="nonzero">';
        htmlStr += '<g id="Group-7" transform="translate(110.000000, 46.000000)">';
        htmlStr += '<g id="profile" transform="translate(0.000000, 12.000000)">';
        htmlStr += '<path d="M11.4865881,11.987262 C13.2142134,11.987262 14.6887816,11.4017494 15.9106923,10.2312164 C17.1327171,9.06068337 17.7438437,7.64818223 17.7438437,5.99349431 C17.7438437,4.33907973 17.1327171,2.92652392 15.9106923,1.75571754 C14.6883821,0.58523918 13.2137568,0 11.4865881,0 C9.75941935,0 8.28456576,0.58523918 7.06265509,1.75571754 C5.84051613,2.92652392 5.22944665,4.33902506 5.22944665,5.99349431 C5.22944665,7.64818223 5.84051613,9.06068337 7.06265509,10.2312164 C8.28490819,11.4017494 9.75936228,11.987262 11.4865881,11.987262 Z" id="Path"></path>';
        htmlStr += '<path d="M22.9005806,18.3163189 C22.8624566,17.7909977 22.7863226,17.2237449 22.672464,16.6149431 C22.5583772,16.0061412 22.4142705,15.4418952 22.2404293,14.921385 C22.0665881,14.4012574 21.8329926,13.8939226 21.5396998,13.3995991 C21.2465211,12.9053303 20.9097965,12.4839909 20.5293548,12.1352528 C20.1489132,11.7866241 19.6846328,11.5084647 19.1364566,11.3003918 C18.5875955,11.0923736 17.9819479,10.9881731 17.3192854,10.9881731 C17.2216352,10.9881731 16.9934615,11.1000273 16.6349355,11.3237904 C16.2767519,11.5475535 15.8720546,11.7973394 15.4212432,12.0732027 C14.9704888,12.348574 14.3835608,12.5985239 13.6614864,12.8219043 C12.9390695,13.0456674 12.2140844,13.1575763 11.4860174,13.1575763 C10.7582357,13.1575763 10.0331935,13.0456674 9.31089082,12.8219043 C8.58864516,12.5985239 8.00188834,12.348574 7.55107692,12.0732027 C7.10032258,11.7973394 6.69573945,11.5476082 6.33732754,11.3237904 C5.97874442,11.1000273 5.75074194,10.9881731 5.65297767,10.9881731 C4.99037221,10.9881731 4.38472457,11.0923736 3.83620596,11.3003918 C3.2875732,11.5084647 2.82323573,11.7868428 2.44296526,12.1352528 C2.06280893,12.4839909 1.7260273,12.9053303 1.43284864,13.3995991 C1.13966998,13.8939226 0.906131514,14.4014761 0.732290323,14.921385 C0.558506203,15.4418952 0.414513648,16.0061412 0.300483871,16.6149431 C0.18633995,17.2237449 0.110320099,17.790615 0.0722531017,18.3163189 C0.0342431762,18.8420228 0.0152952854,19.3805194 0.0152952854,19.9320273 C0.0152952854,21.1804647 0.411888337,22.1666515 1.20478908,22.889877 C1.99786104,23.6128292 3.05163772,23.9742506 4.36600496,23.9742506 L18.6073424,23.9742506 C19.9215955,23.9742506 20.9752581,23.6128292 21.7684442,22.889877 C22.5618015,22.1666515 22.9581092,21.1806287 22.9581092,19.9320273 C22.957995,19.3805194 22.9390471,18.8420228 22.9005806,18.3163189 Z" id="Path"></path>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</svg>';
        htmlStr += '</a></li>';
        htmlStr += '<li class="ditto-profile active" id="dittoprofile">';
        htmlStr += '<a href="#">';
        htmlStr += '<svg width="38px" height="16px" viewBox="0 0 38 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        htmlStr += '<g id="28-feb" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
        htmlStr += '<g id="5.1-Frame-card-28-jan" transform="translate(-169.000000, -62.000000)" fill="#fff">';
        htmlStr += '<g id="Group-7" transform="translate(88.000000, 46.000000)">';
        htmlStr += '<g id="lookr" transform="translate(81.000000, 16.000000)">';
        htmlStr += '<path d="M35.7567073,6.01464854 C35.8364527,6.00497766 35.917645,6 36,6 C37.1045695,6 38,6.8954305 38,8 C38,9.1045695 37.1045695,10 36,10 C35.9115559,10 35.8244526,9.99425905 35.7390425,9.98312946 C34.8448577,13.4052807 31.7556686,16 28.0766962,16 C24.4318092,16 21.3512543,13.4138047 20.4520688,10 L17.5477908,10 C16.6478754,13.4138047 13.5627967,16 9.88987217,16 C6.23898959,16 3.15429715,13.4052894 2.26082516,9.9831467 C2.17545744,9.99426498 2.08839846,10 2,10 C0.8954305,10 0,9.1045695 0,8 C0,6.8954305 0.8954305,6 2,6 C2.08231392,6 2.16346641,6.0049727 2.24317344,6.01463408 C3.11301499,2.60588322 6.21454485,0 9.88987217,0 C13.5881695,0 16.6904711,2.59842785 17.5661275,6 L20.4337467,6 C21.3087199,2.59842785 24.4066301,0 28.0766962,0 C31.7803005,0 34.8861974,2.60589059 35.7567073,6.01464854 Z M5.87807276,7.95031056 C5.87807276,10.3022774 7.64995084,12.2236025 9.88987217,12.2236025 C12.1297935,12.2236025 13.9351032,10.3022774 13.9351032,7.95031056 C13.9351032,5.63146998 12.1297935,3.77639752 9.88987217,3.77639752 C7.64995084,3.77639752 5.87807276,5.63146998 5.87807276,7.95031056 Z M24.0648968,7.95031056 C24.0648968,10.3022774 25.8367748,12.2236025 28.0766962,12.2236025 C30.3166175,12.2236025 32.1219272,10.3022774 32.1219272,7.95031056 C32.1219272,5.63146998 30.3166175,3.77639752 28.0766962,3.77639752 C25.8367748,3.77639752 24.0648968,5.63146998 24.0648968,7.95031056 Z" id="Combined-Shape"></path>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</svg>';
        htmlStr += '</a></li>';
        htmlStr += '<li class="like" id="wishlist">';
        htmlStr += '<a href="#">';
        htmlStr += '<svg width="24px" height="21px" viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
        htmlStr += '<g id="Changes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
        htmlStr += '<g id="5.1-Frame-card-28-jan-Copy" transform="translate(-243.000000, -61.000000)" fill="#FFFFFF" fill-rule="nonzero">';
        htmlStr += '<g id="Group-7" transform="translate(110.000000, 46.000000)">';
        htmlStr += '<path d="M155.063342,17.0914579 C152.284839,14.3028474 147.779702,14.3028474 145.001199,17.0914579 L144.998883,17.0914579 C142.22022,14.3028474 137.715163,14.3028474 134.93666,17.0914579 C132.157997,19.8800684 132.558656,24.0503232 134.93666,27.189914 C137.45503,30.514691 142.053106,36 144.998883,36 L145.001199,36 C147.947056,36 152.544972,30.514691 155.063342,27.189914 C157.441426,24.0504033 157.841926,19.8801485 155.063342,17.0914579 Z" id="wishlist"></path>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</g>';
        htmlStr += '</svg>';
        htmlStr += '</a></li>';
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
            if(frameLen > 0){
                for(var i=0; i<=(frameLen - 1); i++){
                //for(var i=0; i<=4; i++){
                    htmlStr += '<div class="card" id="'+i+'">';
                    htmlStr += '<div class="card-content">';
                    htmlStr += '<div class="card-image"><img class="loading" src="'+appObj.dittoVTUrl+appObj.getDittoId()+'&product_id='+_this.userFrames[i].sku+'" width="50%" height="50%"/></div>';
                    htmlStr += '<div class="card-titles">';
                    htmlStr += '<p class="demo__card__name"><span class="post-name">'+_this.userFrames[i].brand+' </span><span class="like-post">';
                    htmlStr += '<i>';
                    htmlStr += '<svg width="16px" height="16px" viewBox="0 0 24 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
                    htmlStr += '<g id="Changes" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
                    htmlStr += '<g id="5.1-Frame-card-28-jan-Copy" transform="translate(-243.000000, -61.000000)" fill="#FFFFFF" fill-rule="nonzero">';
                    htmlStr += '<g id="Group-7" transform="translate(110.000000, 46.000000)">';
                    htmlStr += '<path d="M155.063342,17.0914579 C152.284839,14.3028474 147.779702,14.3028474 145.001199,17.0914579 L144.998883,17.0914579 C142.22022,14.3028474 137.715163,14.3028474 134.93666,17.0914579 C132.157997,19.8800684 132.558656,24.0503232 134.93666,27.189914 C137.45503,30.514691 142.053106,36 144.998883,36 L145.001199,36 C147.947056,36 152.544972,30.514691 155.063342,27.189914 C157.441426,24.0504033 157.841926,19.8801485 155.063342,17.0914579 Z" id="wishlist"></path>';
                    htmlStr += '</g>';
                    htmlStr += '</g>';
                    htmlStr += '</g>';
                    htmlStr += '</svg>';
                    htmlStr += '</i> '+_this.userFrames[i].like_count+' </span></p>';
                    htmlStr += '<div class="card-des"><span class="shape-color"><i class="'+_this.userFrames[i].color.toLowerCase()+'"></i></span><span class="card-shape">'+_this.userFrames[i].shape+' </span><span class="card-size">'+_this.userFrames[i].size+' </span><span class="info"><i></i></span></div>';
                    htmlStr += '</div>';
                    htmlStr += '</div>';
                    htmlStr += '</div>';
                }
                htmlStr += '<div class="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"  width="auto" height="auto"/></div>';
                htmlStr += '<div class="stackedcards--animatable stackedcards-overlay right"><i>COOL</i></div>';
                htmlStr += '<div class="stackedcards--animatable stackedcards-overlay left"><i>NOPE</i></div>';
                htmlStr += '</div>';
            }
        }
        ///////////////Card Html
        htmlStr += '<div class="global-actions">';
        htmlStr += '<div class="left-action"></div>';
        htmlStr += '<div class="top-action"></div>';
        htmlStr += '<div class="right-action"></div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div></div></div>';
        return htmlStr;
    },

    bindCardCLick : function(appObj){
        var _this = this;
        $('.stackedcards-overlay').css("z-index", '');
        $('.card').click(function(e){
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

    emptyScreenMessage : function(appObj,msg){
        var str = '<div class="empty">';
        str += '<div class="empty-img">';
        str += '<img src="images/lookr-empty.svg" alt="" title="">';
        str += '</div>';
        str += msg;
        str += '</div>';
        $('header').after(str);
        $('.stage').remove();
    },


    bindClicks : function(appObj){
        var _this = this;
        if(_this.userFrames.length == 0){
            var msgtoshow = '';
            msgtoshow += '<p> <strong>OOPS!</strong></br>We have limited products for your filters.</br>';
            msgtoshow += 'Please clear the filters and try again.</p>';
            _this.emptyScreenMessage(appObj,msgtoshow);
        }else{
            _this.bindCardCLick(appObj);
        }
        // Set Swipe Cards
        $('#settings').click(function(){
            $('#preloader').show();                  
            $('body').removeAttr('class');
            setTimeout(function(){                
                appObj.mainDom.innerHTML = appObj.settingScreen.loadSettingScreen(appObj);
                appObj.settingScreen.bindClicks(appObj);
            }, 0);
            
        });

        

        // Wishlist click
        $('#wishlist').click(function(){  
            $('#preloader').show();                  
            $('body').removeAttr('class');
            setTimeout(function(){                
                appObj.mainDom.innerHTML = appObj.wishListScreen.wishListScreen(appObj);
                appObj.wishListScreen.bindClicks(appObj);
            }, 0);  
        });
        
        if(common.readCookie('lookr-demo') == null){
            $('#lookr-popup').modal('show');
            common.createCookie('lookr-demo',1)
        }else{
            $('#lookr-popup').modal('hide');
        }

        $('.got-it').click(function(){
            $('#lookr-popup').modal('hide');
        });
    },

    swipeCard : function(appObj,key,swipeDirection){
        var _this = this;
        _this.bindCardCLick(appObj);
        var swipesObject = {};
        swipesObject.sku = _this.userFrames[key].sku;
        swipesObject.direction = swipeDirection;
        if(swipeDirection == 'right'){
            swipesObject.status = 'Like';
        }else{
            swipesObject.status = 'Dislike';
        }
        app.swipedCardId.push(swipesObject);
        _this.swipedFrameIndex.push(_this.userFrames[key].sku);
        if(_this.userFrames.length == _this.swipedFrameIndex.length){
            var ms ='<p> <strong>Congratulation!</strong></br>You have exhausted all the looks for today.';
            ms +='Try again later for more.</p>';
            _this.emptyScreenMessage(appObj,ms);
        }
    }
}
