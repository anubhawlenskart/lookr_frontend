var setting = {
    getFilters : function(appObj){
        var requestUrl = common.apiUrl+'/getfilter?mobile='+appObj.getUserMobile();
        res = common.sendRequest(requestUrl);
        if ('success' in res){
            return res.success.filters;
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


    getFrameColorHtml : function(colors,selectedColors = null ){
        var htm = '';
        var split = null;
        if(selectedColors!=null){
            split = selectedColors.split(","); 
        }
        for(var i = 0; i < colors.length ;i++){
            var checkClassStr = '';
            var activeClass = '';
            if(split!=null){
                if(split.length > 0){
                    if(split.indexOf(colors[i]) != -1){
                        checkClassStr = 'checked="checked"';
                        activeClass = 'active';
                    }
                }
            }
            htm += '<div class="col-md-3">';
            htm += '<label style="background:'+common.getColorCode()[colors[i]]+'" class="'+activeClass+'">';
            htm += '<input type="checkbox" name="frame" placeholder="" class="frame-color form-control" '+checkClassStr+' value="'+colors[i]+'">';
            htm += '<span class="checkmark"></span></label>';
            htm += '</div>';
        } 
        return htm;
    },

    getFrameBrandHtml : function(brands,selectedBrands = null){
        var htm = '';
        var split = null;
        if(selectedBrands!=null){
            split = selectedBrands.split(","); 
        }
        for(var i = 0; i < brands.length ;i++){
            var checkClassStr = '';
            var activeClass = '';
            if(split!=null){
                if(split.length > 0){
                    if(split.indexOf(brands[i]) != -1){
                        checkClassStr = 'checked="checked"';
                        activeClass = 'active';
                    }
                }
            }
            htm += '<div class="col-md-3"><label class="'+activeClass+'">'+brands[i];
            htm += '<input type="checkbox" name="brand" placeholder="" class="brand form-control"  '+checkClassStr+' value="'+brands[i]+'">';
            htm += '<span class="checkmark"></span></label>';
            htm += '</div>';
        }
        return htm;
    },

    getFrameShapeHtml : function(shapes,selectedShapes = null){        
        var htm = '';
        var split = null;
        if(selectedShapes!=null){
            split = selectedShapes.split(","); 
        }
        for(var i = 0; i < shapes.length ;i++){
            key = shapes[i].replace(/ /g,"-");
            var checkClassStr = '';
            var activeClass = '';
            if(split!=null){
                if(split.length > 0){
                    if(split.indexOf(shapes[i]) != -1){
                        checkClassStr = 'checked="checked"';
                        activeClass = 'active';
                    }
                }
            }
            htm += '<div class="col-md-3"><label class="'+activeClass+'"><i>';
            htm += '<img src="./images/shape/svg/'+key.toLowerCase()+'.svg"></i>'+shapes[i];
            htm += '<input type="checkbox" name="frame" placeholder="" class="shape form-control" '+checkClassStr+' value="'+shapes[i]+'">';
            htm += '<span class="checkmark"></span></label>';
            htm += '</div>';
        }
        return htm;
    },

    getFrameSizeHtml : function(sizes,selectedSizes = null){
        var htm = '';
        var split = null;
        if(selectedSizes!=null){
            split = selectedSizes.split(","); 
        }
        for(var i = 0; i < sizes.length ;i++){
            var checkClassStr = '';
            var activeClass = '';
            if(split!=null){
                if(split.length > 0){
                    if(split.indexOf(sizes[i]) != -1){
                        checkClassStr = 'checked="checked"';
                        activeClass = 'active';
                    }
                }
            }
            htm += '<div class="col-md-3"><label class="'+activeClass+'">'+sizes[i];
            htm += '<input type="checkbox" name="frame" placeholder="" class="size form-control" '+checkClassStr+' value="'+sizes[i]+'">';
            htm += '<span class="checkmark"></span></label>';
            htm += '</div>';
        }       
        return htm;
    },

    bindClicks : function(appObj){
        var _this = this;
        $('.wrapper').addClass('settings-page');

        $(".frame label").on('change', function(){
            $(this).toggleClass("active");
            if ($(this).find('input').attr('checked')) {
                $(this).find('input').removeAttr('checked');
            } else {
                $(this).find('input').attr('checked', 'checked');
            }
            return false;
        });

        $(".frame-shape label").on('change', function(){
            $(this).toggleClass("active");
            if ($(this).find('input').attr('checked')) {
                $(this).find('input').removeAttr('checked');
            } else {
                $(this).find('input').attr('checked', 'checked');
            }
            return false;
        });

        $('.frame-color label').on('change', function(){
            if ($(this).find('input').attr('checked')) {
                $(this).find('input').attr('checked', 'checked');
                $(this).addClass("active");
            } else {
                $(this).find('input').removeAttr('checked');
                $(this).removeClass("active");
            }
            return false;
        });

        $('.brand label').on('change', function(){
            $(this).toggleClass("active");            
            if ($(this).find('input').attr('checked')) {
                $(this).find('input').removeAttr('checked');
            } else {
                $(this).find('input').attr('checked', 'checked');
            }
            return false;
        });
        // bind click for lookr
        $('#dittoprofile').click(function(){
            $('#preloader').show();                  
            $('.wrapper').removeClass('settings-page');
            setTimeout(function(){                
                appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
                if(appObj.lookersScreen.userFrames.length > 0){
                    stackedCards();
                }
                appObj.lookersScreen.bindClicks(app);
            }, 0);            
        });

        // Wishlist click
        $('#wishlist').click(function(){
            $('#preloader').show();                  
            $('.wrapper').removeClass('settings-page');
            setTimeout(function(){                
                appObj.mainDom.innerHTML = appObj.wishListScreen.wishListScreen(appObj);
                appObj.wishListScreen.bindClicks(appObj);
            }, 0);
        });

        // Bind Apply filter
        $('#applyfilter').click(function(){
            var brand = $('.brand:checked').map(function() {return this.value;}).get().join(',');            
            var shape = $('.shape:checked').map(function() {return this.value;}).get().join(',');
            var size = $('.size:checked').map(function() {return this.value;}).get().join(',');
            var color = $('.frame-color:checked').map(function() {return this.value;}).get().join(',');
            var requestUrl = common.apiUrl+'/setfilter?mobile='+appObj.getUserMobile();
            requestUrl += '&brand='+brand;
            requestUrl += '&color='+color;
            requestUrl += '&size='+size;
            requestUrl += '&shape='+shape;
            var res = common.sendRequest(requestUrl);
            if ('success' in res){
                appObj.showPopup(res.success,'alert-success','Success!');
                setTimeout(function(){ 
                    appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);  
                    appObj.lookersScreen.bindClicks(appObj);                  
                    stackedCards();
                }, 200);
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
                appObj.showPopup(res.success,'alert-success','Success!');                
                setTimeout(function(){ 
                    appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);   
                    appObj.lookersScreen.bindClicks(appObj);                 
                    stackedCards();               
                }, 200);                
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
