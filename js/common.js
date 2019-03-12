var common = {    
    rootElement : document.querySelector('main'),
    dittoId : '',
    apiUrl : 'https://labs.lenskart.com/tinder/api',
    //apiUrl : 'http://localhost/lookr_backend/api',
    userMobile : '',
    cookieexpiryday : 365,
    authToken : '',
    
    enableLoader : function(){
        $('#preloader').show();
    },

    disableLoader : function (){
        $('#preloader').delay(100).fadeOut('slow',function(){
            $(this).hide();
        });
    },

    getColorCode : function(){
        var colorCode = new Array();
        colorCode['black'] = '#000000';
        colorCode['blue'] = '#0000FF';
        colorCode['gunmetal'] = '#800080';
        colorCode['purple'] = '#800080';
        colorCode['red'] = '#FF0000';
        colorCode['brown'] = '#A52A2A';
        colorCode['tortoise'] = '#000000';
        colorCode['cream'] = '#FFFFCC';
        colorCode['grey'] = '#808080';
        colorCode['pink'] = '#F660AB';
        colorCode['green'] = '#008000';
        colorCode['maroon'] = '#810541';
        colorCode['silver'] = '#C0C0C0';
        colorCode['sky'] = '#3BB9FF';
        colorCode['golden']= '#FFD700';
        return colorCode;
    },

    sendRequest : function(url,method = 'POST',isloadertrue=true,isasync=false){
        var _this = this;
        if(isloadertrue){
            _this.enableLoader();
        }        
        var responseData = '';
        $.ajax({
            type: method,
            url: url,
            async:isasync,
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':true,
                'mode':'cors',
                'Authorization': 'Bearer '+_this.readCookie('eyewish-token')
            },
            success: function (res) {
                if(isloadertrue){
                    common.disableLoader();
                }
                responseData =  JSON.stringify(res);  
                responseData = jQuery.parseJSON(responseData);
            }
        });
        return responseData;
    },

    enablepopupHtml : function(msg,classname,popuptype){
        $('#popupmsg').html(msg);
        $('.alert').addClass(classname);
        $('.alert strong').html(popuptype);
        $("#alert-message").modal('toggle');
        setTimeout(function(){ 
            $("#alert-message").modal('toggle');
        }, 1000);
    },


    createCookie : function(name, value, days) {
        var expires;
    
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    },
    
    readCookie : function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    
    eraseCookie : function (name) {
        this.createCookie(name, "", -1);
    },

    getType : function (p) {
        if (Array.isArray(p)) return 'array';
        else if (typeof p == 'string') return 'string';
        else if (p != null && typeof p == 'object') return 'object';
        else return 'other';
    },


    getColorCode : function(){
        var colorCode = new Array();
        colorCode['black'] = '#000000';
        colorCode['blue'] = '#0000FF';
        colorCode['gunmetal'] = '#800080';
        colorCode['purple'] = '#800080';
        colorCode['red'] = '#FF0000';
        colorCode['brown'] = '#A52A2A';
        colorCode['tortoise'] = '#000000';
        colorCode['cream'] = '#FFFFCC';
        colorCode['grey'] = '#808080';
        colorCode['pink'] = '#F660AB';
        colorCode['green'] = '#008000';
        colorCode['maroon'] = '#810541';
        colorCode['silver'] = '#C0C0C0';
        colorCode['sky'] = '#3BB9FF';
        colorCode['golden']= '#FFD700';
        return colorCode;
    },

    
}




