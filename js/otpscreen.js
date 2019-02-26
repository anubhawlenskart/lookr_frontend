var otpscreen = {

    loadOtpScreen : function(){
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<span class="back"></span>';
        htmlStr += '<div class="main-content">';
        htmlStr += '<h1>Enter the OTP you have received on your phone.</h1>';
        htmlStr += '<div class="input-box">';
        htmlStr += '<div class="row otp-section">';
        htmlStr += '<div class="col-md-3">';
        htmlStr += '<input type="number" class="otp-cls" name="otp-1" id="otp-1" placeholder="" class="form-control" maxlength="1" autofocus>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3">';
        htmlStr += '<input type="number" class="otp-cls" name="otp-2" id="otp-2" placeholder="" class="form-control" maxlength="1">';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3">';
        htmlStr += '<input type="number" class="otp-cls" name="otp-3" id="otp-3" placeholder="" class="form-control" maxlength="1">';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3">';
        htmlStr += '<input type="number" class="otp-cls" name="otp-4" id="otp-4" placeholder="" class="form-control" maxlength="1">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="buttons buttons-static">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-6"><span>Didn’t receive OTP?</span></div>';
        htmlStr += '<div class="col-md-6"><a href="#">RESEND</a></div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    renderotpNextBtn : function(){
        var htm= '<div class="buttons">';
        htm += '<button class="btn disable" id="otpnextBtn">Next</button>';
        htm += '</div>';
        $('main').after(htm);
    },

    bindClicks:function(appObj){
        var _this = this;
        $('#nextBtn').parent().remove();
        _this.renderotpNextBtn();
        $('#otpnextBtn').click(function(){ 
            if(!$( "#otpnextBtn" ).hasClass( "disable" )){
                var otp = $('#otp-1').val()+$('#otp-2').val()+$('#otp-3').val()+$('#otp-4').val();            
                var submitOtp = appObj.otpScreen.SubmitNext(appObj.getUserMobile() , otp);
                if (!submitOtp['successy']){
                    $('#otpnextBtn').remove();
                    /**************  Set required Cookies *************/
                    common.createCookie('eyewish-token' , submitOtp.success.token , common.cookieexpiryday);
                    common.createCookie('eyewish-mobile' , appObj.getUserMobile() , common.cookieexpiryday);
                    /**************  Set required Cookies *************/
                    //appObj.setAuthToken(submitOtp.success.token);
                    appObj.setDittoId(submitOtp.success.dittoId)
                    appObj.afterAuthScreen();
                    $('#nextBtn').parent().remove();
                }
            }
        });

        // Bind back button click
        $('.back').click(function(){
            appObj.loadScreen();
        });

        // Blur event
        var numericButtonUnicode = [48,49,50,51,52,53,54,55,56,57];
        $('.otp-cls').keyup(function(e){
            var unicode = e.charCode? e.charCode : e.keyCode;           
            if(numericButtonUnicode.indexOf(unicode) != -1){
                var idattr = $(this).attr('id');
                var split = idattr.split('-');
                var nexttab = parseInt(parseInt(split[1])+1);

                var otp = $('#otp-1').val()+$('#otp-2').val()+$('#otp-3').val()+$('#otp-4').val();
                $('#otp-'+nexttab).focus().val($('#otp-'+nexttab).val());
                if(otp.length == 4){
                    $('#otpnextBtn').removeClass('disable');
                }
            }            
        });
      },

    SubmitNext : function(mobile,otp){
        // First check User exist or not
        var requestUrl = common.apiUrl+'/login?mobile='+mobile+'&otp='+otp;
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
    }
}
