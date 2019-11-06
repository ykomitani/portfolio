$(function(){


var IE = false;
if(!jQuery.support.opacity){
	IE = true;
}
	
/* タッチできる環境なら true */
var isTouch = ('ontouchstart' in window);


$(window).load(function(){

setPanoHeight();


/*$("#PANOBODY-F").fadeTo(0,0);*/
var dp = 2687;
var ws = $(window).width();
var firstview = (dp-ws)*0.000; //初期位置（%）
/*var firstview1 = (dp-750)/2;
var firstview = firstview1/dp*100;*/

if(ws < 1200){
	var firstview = (dp-ws)*0.012;
}

if(ws <= 750){
    var firstview = 0; //初期位置（%）
/* firstview1 = (dp-ws)/2;
    firstview = firstview1/dp*100;*/
}

var fp =  dp*firstview/100;
$("#PANOWRAP").scrollLeft(fp);


$(window).resize(function(){
	setPanoHeight();
});

var pday = true;
	
$("#PANO-LOAD").fadeTo(200,0,function(){$(this).hide();});

/* hoge のイベントを jQuery.bind で捕獲します。 */
$('#PANOWRAP').bind({
	  
    /* down, touch */
    'touchstart mousedown': function(e) {
        // desable event
        e.preventDefault();
         
		
		stopPano();
        startX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
		$("#DEBUG .xs").text(startX);
		
 
 		// 現在の背景の位置を記憶
		
		p = $("#PANOWRAP").scrollLeft();
		$("#DEBUG .bp").text(p);
		
         
        // タッチ処理を開始したフラグをたてる
        this.touched = true;
    },
    /* タッチしながら移動、マウスのドラッグ */
    'touchmove mousemove': function(e) {
         
        // 開始していない場合は動かないようにする
        // 過剰動作の防止
        if (!this.touched) {
            return;
        }
         
        // ページが動くのを止める
        e.preventDefault();
		
		
		//移動量をリアルタイムで格納する
		moveX = startX - (isTouch ? event.changedTouches[0].pageX : e.pageX);
		$("#DEBUG .xe").text(moveX);
         
 
        //移動
		$("#PANOWRAP").scrollLeft(p+moveX);
    },
    /* タッチの終了、マウスのドラッグの終了 */
    'touchend mouseup': function(e) {
        if (!this.touched) {
            return;
        }
        
		moveX = 0; 
		 
		
        // タッチ処理は終了したため、フラグをたたむ
        this.touched = false;
         
    }
});


function stopPano(){
	$("#PANOWRAP").stop();	
}


function setPanoHeight(){
	var w = $(window).width();
	if (w <= 750) {
		var h = w/16*9;
		$("#PANO,#PANOWRAP,#PANOBODY img,#PANOBODY-F img,#PANO-LOAD").height(400);
	}
}


// thb btn

$("#PANOBTN img.day").click(function(){
	$(this).attr("src","imgs/pano-bt-day_ov.jpg");
	$("#PANOBTN img.night").attr("src","imgs/pano-bt-night.jpg");
	$("#PANOBODY-F").fadeTo(300,0);
	return false;
});

$("#PANOBTN img.night").click(function(){
	$(this).attr("src","imgs/pano-bt-night_ov.jpg");
	$("#PANOBTN img.day").attr("src","imgs/pano-bt-day.jpg");
	$("#PANOBODY-F").fadeTo(300,1);
	return false;
});


var moveScroll;

$('img.arr').bind({
	'touchstart mousedown mouseover': function(e) {
		clearInterval(moveScroll);
		var m = parseInt($(this).attr("rel"));
		scrollPano(m);
	},
	'touchend mouseup mouseleave touchcancel': function(e) {
		clearInterval(moveScroll);
	}
});

function scrollPano(m){
	var speed = 3;
	moveScroll = setInterval(
		function(){
			var s = $("#PANOWRAP").scrollLeft();
			$("#PANOWRAP").scrollLeft(s+speed*m);
		},16
	);
}


}); // load


});