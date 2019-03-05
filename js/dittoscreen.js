var dittoscreen = {

  loadScreen : function(){
        var _this = this;
        var htmlStr = '<div class="container">';
        htmlStr += '<div class="row">';
        htmlStr += '<div class="col-md-12">';
        htmlStr += '<span class="back" id="backbtn"></span>';
        htmlStr += '<div class="main-content other-info">';
        //htmlStr += '<h1>Ditto</h1>';
        htmlStr += '<div class="input-box">';
        htmlStr += '</div></div></div></div>';
        htmlStr += '<div id="creation"></div>';
        htmlStr += '<div id="ditto"></div>';
        htmlStr += '<div id="ditto-thumbnail"></div>';
        return htmlStr;
    },

    renderotpNextBtn : function(){
        var htm= '<div class="buttons">';
        htm += '<button class="btn" id="dittotrybtn">try on</button>';
        htm += '</div>';
        $('main').after(htm);
    },

    bindClicks : function(appObj){
      var _this = this;
      //_this.renderotpNextBtn();
      $('#creation').hide();
      $('#ditto').hide();
      $('#ditto-thumbnail').hide();
      $('#dittotrybtn').unbind('click');
      $('#backbtn').click(function(){
        appObj.loadScreen();
      });

      //$('#dittotrybtn').click(function(){
        $('#creation').show();
        _this.createTryOnView(appObj,'#creation');
      //});
    },

    createTryOnView : function(appObj,selector) {
      //$('.row').hide();
      $('.other-info').hide();
      var dittoCreation = new ditto.api.DittoCreation(
        {
          selector: selector,
          serverNetloc: "https://vto.ditto.api.ditto.com",
          disableScale : true
        },
        {
          success: function(callbackObject) {
            appObj.setDittoId(callbackObject.dittoId);
            common.createCookie('eyewish-ditto' , callbackObject.dittoId , common.cookieexpiryday);
            var requestUrl = common.apiUrl+'/setditto?mobile='+appObj.getUserMobile()+'&dittoid='+callbackObject.dittoId;
            res = common.sendRequest(requestUrl);
            if ('success' in res){
              appObj.mainDom.innerHTML = appObj.lookersScreen.loadLookersScreen(appObj);
              app.lookersScreen.needtoshowpopup = true;
              $.getScript( "js/swipe.js", function() {});
              stackedCards();
              appObj.lookersScreen.bindClicks(app);
            }else{
                if(res.error == 'Unauthroized'){
                    appObj.showPopup('Your session has been expired','alert-danger','Error!');
                    appObj.mainDom.innerHTML = appObj.mobileScreen.loadMobileScreen();
                    appObj.mobileScreen.setMobileonField(appObj);
                    appObj.mobileScreen.bindClicks(appObj);
                }
            }

          },
          failure: function(callbackObject) {
            console.log("failure", callbackObject);
          },
          progress: function(callbackObject) {
            console.log(callbackObject);
            console.log("progress", callbackObject);
          },
          close: function(callbackObject) {
            console.log("close", callbackObject);
          }
        }
      );
    }
}
