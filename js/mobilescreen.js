var mobilescreen = {

    loadMobileScreen : function(){
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<div class="main-content">';        
        htmlStr += '<h1>';
        htmlStr += 'Tell us your phone number.';
        htmlStr += '<span>We’ll send an OTP so we know that you’re real!</span>';
        htmlStr += '</h1>';
        htmlStr += '<div class="input-box">';
        htmlStr += '<div class="phone">';
        htmlStr += '<input type="tel" name="mobile" id="mobile" placeholder="Phone Number" class="form-control" autofocus>';
        htmlStr += '<span class="input-arrow"></span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    renderNextBtn : function(){
        var htm = '<div class="buttons">';
        htm += '<button class="btn disable" id="nextBtn">Next</button>';
        htm += '</div>';
        $('main').after(htm);
    },

    bindClicks:function(appObj){
        var _this = this;    
        if($('#otpnextBtn').length){
            $('#otpnextBtn').parent().remove();
        }        
        _this.renderNextBtn(); 
        var mobField = $('#mobile');
        $('#nextBtn').click(function(){
            if(!$(this).hasClass( "disable" )){
                var mobile = $(mobField).val();
                console.log(mobile);
                appObj.setUserMobile(mobile);
                if(mobile != ''){
                    var clickRes = _this.clickNext(appObj.getUserMobile());
                    if (!clickRes.success.isexist){  
                        var registerResponse = appObj.mobileScreen.registerUser(appObj.getUserMobile());
                    }
                    appObj.mainDom.innerHTML = appObj.otpScreen.loadOtpScreen();
                    appObj.otpScreen.bindClicks(appObj);
                }
            }else{
                $(mobField).focus();
                return false;
            }            
        });

        $('.input-arrow').click(function(){
            
            if($(mobField).val() == ''){
                $(mobField).addClass('error');
            }else{
                $('#nextBtn').removeClass('disable');
            }            
        });
      },

    clickNext : function (mobile){
        // First check User exist or not
        var requestUrl = common.apiUrl+'/isregisteredmobile?mobile='+mobile;
        res = common.sendRequest(requestUrl); 
        if ('success' in res){
            return res;
        }else{            
            if(res.error == 'Unauthroized'){               
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }    
        }
        
    },

    registerUser : function (mobile){
        // First check User exist or not
        var requestUrl = common.apiUrl+'/register?mobile='+mobile;
        res = common.sendRequest(requestUrl);  
        if ('success' in res){
            return res;
        }else{            
            if(res.error == 'Unauthroized'){               
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }    
        }
    },

    setMobileonField : function(appObj){
        if(appObj.getUserMobile() != ''){
            $('#mobile').val(appObj.getUserMobile());
        }
    }


}