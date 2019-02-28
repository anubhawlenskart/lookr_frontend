var setting = {
    getFilters : function(appObj){
        var requestUrl = common.apiUrl+'/getfilter?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        if ('success' in res){
            return res.success.filters;
        }
    },

    getProfile : function(appObj){
        var requestUrl = common.apiUrl+'/getuserprofile?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        if ('success' in res){
            return res.success;
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }
        }
    },

    getUserFilters : function(appObj){
        var requestUrl = common.apiUrl+'/getUserfilter?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        if ('success' in res){
            return res.success;
        }else{
            if(res.error == 'Unauthroized'){
                appObj.showPopup('Your session has been expired','alert-danger','Error!');
                appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                appObj.mobileScreen.setMobileonField(appObj);
                appObj.mobileScreen.bindClicks(appObj);
            }
        }
    },

    getFilterHtml : function(datalist,filtername,classname,keyname,selecteddata){
        var selectedValList = [];
        if(selecteddata != null){
            selectedValList = selecteddata.split(",");
        }
        var htm = '';
        htm += '<div class="row '+classname+'">';
        htm += '<div class="col-md-12 age-group">';
        htm += '<h2>'+filtername+'</h2>';
        htm += '</div>';
        htm += '<div class="col-md-12">';
        htm += '<div class="row select-item">';


        datalist.forEach(function(element,index) {
            var classval = "";
            var checkVar = '';
            if($.inArray(element[keyname], selectedValList) != -1){
                classval = 'active';
                checkVar = 'checked="checked"';
            }
            if(element[keyname] != ''){
                htm += '<div class="col-md-3"><label class="'+classval+'">'+element[keyname];
                htm += '<input type="checkbox" '+checkVar+' name="'+keyname+'" placeholder="" class="form-control '+keyname+'" value="'+element[keyname]+'">';
                htm += '<span class="checkmark"></span>';
                htm += '</label>';
                htm += '</div>';
            }
            
        });
        htm += '</div>';
        htm += '</div>';
        htm += '</div>';
        return htm;
    },

    renderFilters : function(appObj){
        var _this = this;
        var userFilters = {};
        var fetchFilter = _this.getUserFilters(appObj);
        if (0 in fetchFilter){
            userFilters = fetchFilter[0];
        }
        var Filters = _this.getFilters(appObj);
        var brands = Filters.brand;
        var colors = Filters.color;
        var shapes = Filters.shape;
        var sizes = Filters.size;
        // Set Brand filter html
        var htm = _this.getFilterHtml(brands,'BRAND','brand','brand',userFilters.brand);
        // Set Shape filter html
        htm += _this.getFilterHtml(shapes,'FRAME SHAPE','frame-shape','shape',userFilters.shape);
        // Set Color filter html
        htm += _this.getFilterHtml(colors,'Frame Color','frame-shape','color',userFilters.color);
        // Set Size filter html
        htm += _this.getFilterHtml(sizes,'Frame Size','frame-shape','size',userFilters.size);
        return htm;
    },

    renderProfile : function(appObj){
        var _this = this;
        var profileDet = _this.getProfile(appObj);
        var profileImage = "images/profile2.jpg";
        if(appObj.getDittoId() != '' || appObj.getDittoId() != 'null'){
            profileImage = appObj.dittoVTUrl+appObj.getDittoId();
        }
        var htm = '<div class="row profile-section">';
        htm += '<div class="col-md-12" id="editprofile">';
        htm += '<h2>Profile <span class="edit">EDIT</span></h2>';
        htm += '</div>';
        htm += '<div class="col-md-3">';
        htm += '<div class="profile-img"><img src="'+profileImage+'"></div>';
        htm += '</div>';
        htm += '<div class="col-md-9 profile-des">';
        htm += '<span><strong>'+profileDet.name+'</strong>'+profileDet.gender+'</span>';
        htm += '<span><strong>'+profileDet.mobile+'</strong></span>';
        htm += '<span><strong>Age</strong>'+profileDet.agegroup+'</span>';
        htm += '</div>';
        htm += '</div>';
        return htm;
    },

    renderAchievements : function(appObj){
        var htm = '<div class="row achievements">';
        htm += '<div class="col-md-12">';
        htm += '<h2>Achievements </h2>';
        htm += '</div>';
        htm += '<div class="col-md-4">';
        htm += '<div class="achievements-circle" data-toggle="modal" data-target="#myModal">';
        htm += '<span>Completed</span>';
        htm += '<strong>50</strong>';
        htm += '<span>SWIPES</span>';
        htm += '</div>';
        htm += '</div>';
        htm += '<div class="col-md-4">';
        htm += '<div class="achievements-circle blank"></div>';
        htm += '</div>';
        htm += '<div class="col-md-4">';
        htm += '<div class="achievements-circle blank"></div>';
        htm += '</div>';
        htm += '<div class="col-md-4">';
        htm += '<div class="achievements-circle blank"></div>';
        htm += '</div>';
        htm += '</div>';
        htm += '</div>';
        htm += '</div>';
        return htm;
    },

    loadSettingScreen : function(appObj){
        var _this = this;
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<header class="header-section">';
        htmlStr += '<ul class="">';
        htmlStr += '<li class="active" id="settings"><a href="#"><i class="fa fa-gear" style="font-size:30px"></i></a></li>';
        htmlStr += '<li class="ditto-profile" id="dittoprofile"><a href="#">&nbsp</a></li>';
        htmlStr += '<li class="like" id="wishlist"><a href="#"><i class="fa fa-heart" aria-hidden="true" style="font-size:28px"></i></a></li>';
        htmlStr += '</ul>';
        htmlStr += '</header>';
        htmlStr += '<div class="main-content other-info settings">';
        htmlStr += '<div class="row filter">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-6">';
        htmlStr += '<h2>Filters</h2>';
        htmlStr += '</div>';
        htmlStr += '<div class="col-md-6">';
        htmlStr += '<span class="apply" id="applyfilter">APPLY</span>';
        htmlStr += '<span class="clear" id="clearfilter">CLEAR</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        // Set Filter Html
        htmlStr += _this.renderFilters(appObj);

        // Set User Profile
        htmlStr += _this.renderProfile(appObj);

        // Set Achievement
        //htmlStr += _this.renderAchievements(appObj);
        htmlStr += '</div>';
        return htmlStr;
    },

    bindClicks : function(appObj){
        var _this = this;
        $('.wrapper').addClass('settings-page');
        $(".frame-shape label").on('change', function(){
            $(this).toggleClass("active");
            return false;
        });

        $('.brand label').on('change', function(){
            $(this).toggleClass("active");
            return false;
        });
        // bind click for lookr
        $('#dittoprofile').click(function(){
            $('.wrapper').removeClass('settings-page');
            appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj); 
            stackedCards();                  
            appObj.lookersScreen.bindClicks(app);
        });

        // Wishlist click
        $('#wishlist').click(function(){
            $('.wrapper').removeClass('settings-page');
            appObj.mainDom.innerHTML = appObj.wishListScreen.wishListScreen(appObj);
            appObj.wishListScreen.bindClicks(appObj);
        });

        // Bind edit profile click
        $('#editprofile').click(function(){
            $('.wrapper').removeClass('settings-page');
            appObj.mainDom.innerHTML = appObj.editprofileScreen.loadProfileScreen(appObj);
            appObj.editprofileScreen.bindClicks(appObj);
        });

        // Bind Apply filter
        $('#applyfilter').click(function(){
            var brand = $('.brand:checked').map(function() {return this.value;}).get().join(',');
            var shape = $('.shape:checked').map(function() {return this.value;}).get().join(',');
            var size = $('.size:checked').map(function() {return this.value;}).get().join(',');
            var color = $('.color:checked').map(function() {return this.value;}).get().join(',');
            var requestUrl = common.apiUrl+'/setfilter?mobile='+appObj.getUserMobile();
            requestUrl += '&brand='+brand;
            requestUrl += '&color='+color;
            requestUrl += '&size='+size;
            requestUrl += '&shape='+shape;
            var res = common.sendRequest(requestUrl);
            if ('success' in res){
                _this.loadSettingScreen(appObj);
                appObj.showPopup(res.success,'alert-success','Success!');
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }else{
                    appObj.showPopup('Some Errors during updation','alert-danger','Error!');
                }
            }
        });

        // Bind Clear filter
        $('#clearfilter').click(function(){
            var requestUrl = common.apiUrl+'/clearfilter?mobile='+appObj.getUserMobile();
            var res = common.sendRequest(requestUrl);
            if ('success' in res){
                _this.loadSettingScreen(appObj);
                appObj.showPopup(res.success,'alert-success','Success!');
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }else{
                    appObj.showPopup('Some Errors during updation','alert-danger','Error!');
                }
            }
        });
    }

};
