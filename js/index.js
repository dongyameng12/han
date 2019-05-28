(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//移动手机号码验证
function istel(tel) {
    var rtn = false;
    //移动号段验证
    var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
    if (regtel.test(tel)) {
	// console.log(1)
        rtn = true;	
    }
    return rtn;
}
// 手机号验证
$("#inputTel").blur(function(){
	var value = $('#inputTel').val()
	if(!istel(value)){
		$("#sginBox").hide();
		$("#tel").show()
	}
})

// 验证码验证（只是验证的长度）
$("#code").blur(function(){
	var length = $('#code').val().toString().length
	console.log(length)
	if(length !== 6){
		$("#sginBox").hide();
		$("#pwd").show()
	}
})
$('.imgC img').click(function(){
	$(this).parents('#tel').hide()
	$("#sginBox").show();
})
$('.imgY img').click(function(){
	$(this).parents('#tel').hide()
	$("#sginBox").show();
})
$("#sginIn").on('click',function () {
    $("#sginBox").hide();
    $("#receive").show();
});
function bindEvents(id) {
    $("#"+id).on('click',function () {
        var code = $("#"+id);
        // code.attr("class","noClick");
        code.unbind('click');
        var time = 60;
        var set = setInterval(function(){
            code.text(--time+"S重新获取");
        }, 1000);
        setTimeout(function(){
            $("#verificationCode").bind('click', bindEvents('verificationCode'));
            code.text("重新获取验证码");
            clearInterval(set);
        }, 60000);
    });
}
$(function () {
    bindEvents('verificationCode');
});
