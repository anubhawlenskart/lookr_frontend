var otherprofilescreen = {


    loadProfileScreen : function(appObj){
        var requestUrl = common.apiUrl+'/getuserprofile?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        var nameValue = '';
        var malechecked = 'checked="checked"';
        var femalechecked = '';

        var less15age = 'checked="checked"';
        var age16to25 = '';
        var age26to40 = '';
        var agegret40 = '';

        var less15ageclass = 'active';
        var age16to25class = '';
        var age26to40class = '';
        var agegret40class = '';

        if ('success' in res){
            if(res.success.name != '' || res.success.name != null){
                nameValue = res.success.name;
            }

            if(res.success.gender != '' || res.success.name != null){
                if(res.success.gender == 'Female'){
                    malechecked = '';
                    femalechecked = 'checked="checked"';
                }
            }

            if(res.success.agegroup != '' || res.success.agegroup != null){
                if(res.success.agegroup == '16-25'){
                    less15age = '';
                    age16to25 = 'checked="checked"';
                    age26to40 = '';
                    agegret40 = '';

                    less15ageclass = '';
                    age16to25class = 'active';
                    age26to40class = '';
                    agegret40class = '';
                }

                if(res.success.agegroup == '26-40'){
                    less15age = '';
                    age16to25 = '';
                    age26to40 = 'checked="checked"';
                    agegret40 = '';

                    less15ageclass = '';
                    age16to25class = '';
                    age26to40class = 'active';
                    agegret40class = '';
                }

                if(res.success.agegroup == '40+'){
                    less15age = '';
                    age16to25 = '';
                    age26to40 = '';
                    agegret40 = 'checked="checked"';

                    less15ageclass = '';
                    age16to25class = '';
                    age26to40class = '';
                    agegret40class = 'active';
                }
            }
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
        htmlStr += '<span class="back" id="otherprofilebackbtn"></span>';
        htmlStr += '<div class="main-content other-info">';
        htmlStr += '<h1>';
        htmlStr += 'Almost there...';
        htmlStr += '</h1>';
        htmlStr += '<div class="input-box">';
        htmlStr += '<div class="row otp-section">';
        htmlStr += '<div class="col-md-12 name">';
        htmlStr += '<input type="text" name="username" id="username" placeholder="Name (Optional)" class="form-control" value="'+nameValue+'">';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<h2>Gender</h2>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<div class="row gender">';
        htmlStr += '<div class="col-md-6">';
        htmlStr += '<label class="active">Male';
        htmlStr += '<input type="radio" name="gender" placeholder="" class="form-control" '+malechecked+' value="Male">';
        htmlStr += '<span class="checkmark"><i class="fa fa-male"></i></span>';
        htmlStr += '</label>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-6 female">';
        htmlStr += '<label>Female';
        htmlStr += '<input type="radio" name="gender" placeholder="" class="form-control" '+femalechecked+' value="Female">';
        htmlStr += '<span class="checkmark"><i class="fa fa-female"></i></span>';
        htmlStr += '</label>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';

        htmlStr += '<div class="row age-group">';
        htmlStr += '<div class="col-md-12 age-group">';
        htmlStr += '<h2>Age Group</h2>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3"><label class="'+less15ageclass+'">&lt;15';
        htmlStr += '<input type="radio" value="<15" name="age" placeholder="" class="form-control" '+less15age+'>';
        htmlStr += '<span class="checkmark"></span></label>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3"><label class="'+age16to25class+'">16-25';
        htmlStr += '<input type="radio" value="16-25" name="age" placeholder="" class="form-control" '+age16to25+'>';
        htmlStr += '<span class="checkmark"></span>';
        htmlStr += '</label>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3"> <label class="'+age26to40class+'">26-40';
        htmlStr += '<input type="radio" value="26-40" name="age" placeholder="" class="form-control" '+age26to40+'>';
        htmlStr += '<span class="checkmark"></span>';
        htmlStr += '</label>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-3"> <label class="'+agegret40class+'">40+';
        htmlStr += '<input type="radio" value="40+" name="age" placeholder="" class="form-control" '+agegret40+'>';
        htmlStr += '<span class="checkmark"></span>';
        htmlStr += '</label>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        return htmlStr;
    },

    renderotpNextBtn : function(){
        var htm= '<div class="buttons" id="otpscreenbtn">';
        htm += '<div class="row">';
        htm += '<div class="col-md-12"><span>This information will help us show relevent content for you.</span></div>';
        htm += '</div>';
        htm += '<button class="btn" id="profilenextBtn">Next</button>';
        htm += '</div>';
        $('main').after(htm);
    },

    bindClicks:function(appObj){
      var _this = this;
      _this.renderotpNextBtn();
        $(".gender label").click(function () {
            $(".gender label").removeClass("active");
             $(this).addClass("active");
        });

        $(".age-group label").click(function () {
            $(".age-group label").removeClass("active");
             $(this).addClass("active");
        });

        $('#otherprofilebackbtn').click(function(){
            appObj.afterAuthScreen();
        });


        $('#profilenextBtn').click(function(){
            $('#otpscreenbtn').hide();
            var requestUrl = common.apiUrl+'/updateprofile?mobile='+appObj.getUserMobile();
            var name = $('#username').val();
            var gender = $("input[name='gender']:checked").val();
            var age = $("input[name='age']:checked").val();
            if(name != ''){
                requestUrl += '&name='+name;
            }

            if(gender != ''){
                requestUrl += '&gender='+gender;
            }

            if(age != ''){
                requestUrl += '&agegroup='+encodeURIComponent(window.btoa(age));
            }
            res = common.sendRequest(requestUrl);

            if ('success' in res){
                //appObj.mainDom.innerHTML = appObj.dittoScreen.loadScreen();
                //appObj.dittoScreen.bindClicks(appObj);
                appObj.mainDom.innerHTML = appObj.threeDtry.loadScreen(appObj);
                appObj.threeDtry.bindClicks(appObj);
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }
            }
        });
    }
}
