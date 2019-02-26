

var app = {    
    appstate : {},    
    dittoVTUrl : 'https://vto.ditto.api.ditto.com/comparison/?ditto_id=',
    apiKey : common.key,
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
    cardcountinlookrscreen : 4,

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
        if(this.getUserMobile() != ''){            
            // First check User has already ditto or not
            var requestUrl = common.apiUrl+'/getuserditto?mobile='+this.getUserMobile();
            res = common.sendRequest(requestUrl);
            if ('success' in res){
                if('dittoid' in res.success){
                    this.setDittoId(res.success.dittoid); 
                    common.createCookie('eyewish-ditto',res.success.dittoid);
                    app.mainDom.innerHTML = app.lookersScreen.loadLookersScreen(app);
                    //$.getScript( 'js/swipe.js', function() {
                        //console.log('swipe script loaded');
                    //});
                    app.lookersScreen.bindClicks(app);
                    //app.lookersScreen.setFrameNameandLikeCount(app,1);
                   
                }else{
                    app.mainDom.innerHTML = app.otherProfileScreen.loadProfileScreen(app);
                    app.otherProfileScreen.bindClicks();
                }
            }else{
                if(res.error == 'Unauthroized'){
                    _this.showPopup('Your session has been expired','alert-danger','Error!');
                    app.mainDom.innerHTML = app.mobileScreen.loadMobileScreen();
                    app.mobileScreen.setMobileonField(app);
                    app.mobileScreen.bindClicks(app);
                }else{
                    app.mainDom.innerHTML = app.otherProfileScreen.loadProfileScreen(app);                                        
                    app.otherProfileScreen.bindClicks(app);
                    app.mainDom.innerHTML = app.dittoScreen.loadDittoScreen(app);                                        
                    app.dittoScreen.bindClicks(app);
                }
            }  
            return res;
        }else{
            app.mainDom.innerHTML = app.mobileScreen.loadMobileScreen();
            app.mobileScreen.setMobileonField(app);
            app.mobileScreen.bindClicks(app);
        }
    },

    loadScreen : function(){
        if(app.getAuthToken() != null){
            app.afterAuthScreen();
        }else{
            /*  Mobile Screen Loading flow */
            app.mainDom.innerHTML = app.mobileScreen.loadMobileScreen();
            app.mobileScreen.setMobileonField(app);
            app.mobileScreen.bindClicks(app);
            /*  Mobile Screen Loading flow */
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





