var threedtry = {

    loadScreen : function(appObj){
        var _this = this;
        var htmlStr = '';
        htmlStr +='<div class="dittoscreen">';
        htmlStr +='<div class="dittoscreen-img"><img src="images/katrina_ditto.gif"></div>';
        htmlStr +='<div class="ditto-des">';
        htmlStr +='<h2>3D TRY ON</h2>';
        htmlStr +='<ul>';
        htmlStr +='<li><span>1</span><dfn>Make a video to try glasses with 3D view</dfn></li>';
        htmlStr +='<li><span>2</span><dfn>Try 1000s of frames</dfn></li>';
        htmlStr +='</ul>';
        htmlStr +='<div class="get-start" id="get3dtry">';
        htmlStr +='<span>Get Started</span>';
        htmlStr +='</div>';
        htmlStr +='</ul>';
        htmlStr +='</div>';
        htmlStr +='</div>';
        return htmlStr;
    },

    bindClicks : function(appObj){
        var _this = this;
        $('#get3dtry').click(function(){
            appObj.mainDom.innerHTML = appObj.dittoScreen.loadScreen(appObj);
            appObj.dittoScreen.bindClicks(appObj);
        });
    }

}