/**
 * Template Footer.
 */
var tf = {};
tf.onChoice = null;
tf.onArray = {};
tf.init = function(){
	for(var i = 0; i < incNav.onArray.length; i++){
		if(tf.onChoice == null){
			if(location.href.indexOf(incNav.onArray[i].dir) > -1) tf.onChoice = incNav.onArray[i];
		}
		tf.onArray[incNav.onArray[i].dir] = incNav.onArray[i];
	}
	if(tf.onChoice == null) tf.onChoice = {dir : '', index : 0, layer : 0, next : '', back : ''};
	window.document.write(tf.createTag());
};
tf.createTag = function(){
	var result = '';
	var layer = '';
	for(var i = 0; i < tf.onChoice.layer; i++){
			layer += '../';
	}

	// href="' + layer + ' // パス（../）の変数
	// if(tf.onChoice.index == 0) result += 'on '; それぞれ固有の処理をさせたい時（番号はindexに基づく
	// if(tf.onArray._template.off) result += 'off '; off処理
	// next back
	// if(tf.onChoice.back != '') result += '<li class="back"><a href="../' + tf.onChoice.back + '/index.html">BACK</a></li>';
	// if(tf.onChoice.next != '') result += '<li class="next"><a href="../' + tf.onChoice.next + '/index.html">NEXT</a></li>';

result += '<footer class="p-footer">';
result += '<p>footer</p>';
result += '</footer>';


	return result;
};
tf.init();
