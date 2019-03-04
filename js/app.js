

var app = {    
    appstate : {},    
    dittoVTUrl : 'https://vto.ditto.api.ditto.com/comparison/?ditto_id=',    
    mainDom : common.rootElement,
    apiUrl : common.apiUrl,
    cookieexpiryday : 1,
    mobileScreen : mobilescreen,
    otpScreen : otpscreen,
    dittoScreen : dittoscreen,
    otherProfileScreen : otherprofilescreen,
    lookersScreen : lookersscreen,
    frameDetailScreen : framedetailsscreen,
    editprofileScreen : editprofile,
    wishListScreen : wishlist,
    settingScreen : setting,
    threeDtry : threedtry,
    cardcountinlookrscreen : 4,
    swipedCardId : [],
    showSplash : true,

    setAuthToken : function(token){
        common.authToken = token;
    },

    getAuthToken : function(){
        return common.readCookie('eyewish-token');
        //return common.authToken;
    },

    setDittoId : function(dittoid){
        common.dittoId = dittoid;
    },

    getDittoId : function(){
        return common.dittoId;
    },

    setUserMobile : function(mobile){
        common.userMobile = mobile;
    },

    getUserMobile : function(){
        return common.userMobile;
    },

    showPopup : function(msg,classname,popuptype){
        common.enablepopupHtml(msg,classname,popuptype);
    },

    afterAuthScreen : function(){
        var _this = this;
        if(this.getUserMobile() != ''){            
            // First check User has already ditto or not
            var requestUrl = common.apiUrl+'/getuserditto?mobile='+this.getUserMobile();
            app.mainDom.innerHTML =  '';
            res = common.sendRequest(requestUrl);
            if ('success' in res){
                if('dittoid' in res.success){
                    this.setDittoId(res.success.dittoid); 
                    common.createCookie('eyewish-ditto',res.success.dittoid);
                    app.mainDom.innerHTML = app.lookersScreen.loadLookersScreen(app); 
                    app.lookersScreen.needtoshowpopup = true;
                    $.getScript( "js/swipe.js", function() {}); 
                    app.lookersScreen.bindClicks(app);
                }else{
                    appObj.mainDom.innerHTML = appObj.threeDtry.loadScreen(appObj);
                    appObj.threeDtry.bindClicks(appObj);
                }
            }else{
                if(res.error == 'Unauthroized'){
                    _this.showPopup('Your session has been expired','alert-danger','Error!');
                    app.mainDom.innerHTML = app.mobileScreen.loadScreen();
                    app.mobileScreen.setMobileonField(app);
                    app.mobileScreen.bindClicks(app);
                }else{
                    app.mainDom.innerHTML = app.otherProfileScreen.loadProfileScreen(app);                                        
                    app.otherProfileScreen.bindClicks(app);
                }
            }  
            return res;
        }else{
            app.mainDom.innerHTML = app.mobileScreen.loadScreen();
            app.mobileScreen.setMobileonField(app);
            app.mobileScreen.bindClicks(app);
        }
    },

    spashHtml : function(){
        var htm = '<header id="header">';
        htm += '<div class="container">';
        htm += '<div class="logo"><img src="images/logo.png" alt="" title=""></div></div>';
        htm += '</header>';
        return htm;
    },

    loadScreen : function(){
        if(app.getAuthToken() != null){
            app.afterAuthScreen();
        }else{
            if(app.showSplash){        
                $('.wrapper').addClass('home');  
                $('#content').before(app.spashHtml());      
                setTimeout(function() {
                    $('.wrapper').removeClass('home');
                    $('#header').remove();
                    app.showSplash = false;
                    app.loadScreen();
               }, 2000);
            }else{
                /*  Mobile Screen Loading flow */
                app.mainDom.innerHTML = app.mobileScreen.loadScreen();
                app.mobileScreen.setMobileonField(app);
                app.mobileScreen.bindClicks(app);
                /*  Mobile Screen Loading flow */
            }
            
        }
    }
}

window.addEventListener('load', e => {
    /* if validation token exist then open the after login screen */
    app.setAuthToken(common.readCookie('eyewish-token'));
    app.setUserMobile(common.readCookie('eyewish-mobile'));
    app.setDittoId(common.readCookie('eyewish-ditto'));
    app.loadScreen();
    /*if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
            console.log('Sw registered');
        }catch(error){
            console.log('Sw registeration failed');
        }
    }*/
});


function handleUserSwipes(){    
    if(app.swipedCardId.length > 0){
        for(var i = 0; i<= (app.swipedCardId.length - 1);i++){
            var requestUrl1 = '';
            var requestUrl = '';
            requestUrl1 = common.apiUrl+'/userswapes?mobile='+app.getUserMobile();
            requestUrl1 +='&sku='+app.swipedCardId[i].sku;
            requestUrl1 +='&swaptype='+app.swipedCardId[i].direction;
            requestUrl1 +='&dittoid='+app.getDittoId();        
            common.sendRequest(requestUrl1,'POST',false,true);

            requestUrl = common.apiUrl+'/likedislikeproduct?mobile='+app.getUserMobile();
            requestUrl +='&sku='+app.swipedCardId[i].sku;
            requestUrl +='&status='+app.swipedCardId[i].status;
            common.sendRequest(requestUrl,'POST',false,true);

            /*if('success' in res){
                var requestUrl = common.apiUrl+'/likedislikeproduct?mobile='+app.getUserMobile();
                requestUrl +='&sku='+app.swipedCardId[i].sku;
                requestUrl +='&status='+app.swipedCardId[i].status;
                res = common.sendRequest(requestUrl,'POST',false);
            }*/
            app.swipedCardId.splice(i,1);
        }        
    }    
}

setInterval(handleUserSwipes,1000);





