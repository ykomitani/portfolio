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
result += '<div class="p-footer__inner">';
result += '<nav class="p-footer__nav">';
result += '<ul class="p-footer__navList">';
result += '<li class="p-footer__navItem"><a href="' + layer + 'index.html" class="p-footer__navLink">トップ</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'parkfront/index.html" class="p-footer__navLink">公園隣接</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'design/index.html" class="p-footer__navLink">デザイン</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'plan/index.html" class="p-footer__navLink">プラン</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'access/index.html" class="p-footer__navLink">アクセス</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'location/index.html" class="p-footer__navLink">周辺環境</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'modelroom/index.html" class="p-footer__navLink is-off">モデルルーム</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'equipment/index.html" class="p-footer__navLink is-off">設備・仕様</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'structure/index.html" class="p-footer__navLink is-off">構造</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'map/index.html" class="p-footer__navLink">現地案内図</a></li>';
result += '<li class="p-footer__navItem"><a href="' + layer + 'outline/index.html" class="p-footer__navLink">物件概要</a></li>';
result += '</ul>';
result += '</nav>';
result += '<div class="p-footer__caption">';
result += '<div class="c-wrap">';
result += '<p class="c-caption">';
	// top
	if (tf.onChoice.index == 0) {
		result += '※1.外観完成予想CGは、2019年4月に撮影した現地隣接の大横川親水公園（現地より約40m）の写真に一部CG加工を施した画像と計画段階の図面を基に描き起こした外観完成予想CGを合成したもので、形状・色彩・外溝・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。周辺の公園は敷地隣接の大横川親水公園であり、計画敷地ではありません。なお、周辺環境等は将来的に保証されるものではありません。<br>※2.東京メトロ半蔵門線利用（通勤時13分）<br>※3.JR総武線快速利用（通勤時8分）<br>※4.計画段階の図面を基に描き起こしたもので、形状・色彩・外溝・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。<br>※5.ソラノマ完成予想CGは、2019年7月に撮影した現地（3階相当の高さ）より北東方向を撮影した写真に一部CG加工を施した画像と計画段階の図面を基に描き起こしたソラノマ完成予想CGを合成したもので、実際とは異なります。CG内の家具調度品等は販売価格に含まれておりません。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。周辺の公園は敷地隣接の大横川親水公園であり、計画敷地ではありません。なお、周辺環境等は将来的に保証されるものではありません。<br>※6.「大手町」駅へ12分（東京メトロ半蔵門線利用）（通勤時13分）、「東京」駅へ7分（JR総武線快速利用）（通勤時8分）、「秋葉原」駅へ6分（JR総武線利用）（通勤時7分）。<br>※7.掲載の現地周辺航空写真は2019年4月に撮影したものに、光等CG処理を加えたもので、実際とは異なります。現地の位置を表現した光は建物の高さや規模、向きを正確に表したものではありません。また、周辺環境は将来変わる場合があります。';
	// parkfront
	} else if (tf.onChoice.index == 1) {
		result += '※1.現地（4階相当の高さ）より東方向を望む。（2019年8月撮影）眺望・周辺景観等は将来に亘り保証されるものではありません。<br>※2.掲載の立地概念図は周辺建物や構造物・植栽等の一部を省略・簡略化の上、表現しているため、建物の高さや規模、位置関係、距離など実際とは異なります。<br>※3.エントランスホール完成予想CGは、計画段階の図面を基に描き起こしたもので、形状・色彩・外構・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。<br>※4.掲載の1F敷地配置イラストは計画段階の図面を基に描き起こしたものであり実際とは異なります。今後行政指導・施工上の理由等により計画に変更が生じる場合があります。掲載の1F敷地配置イラストの計画敷地外の内容は航空写真（2019年8月撮影）を参考に描いたイメージであり将来、形状等が変更となる可能性があります。<br>※5.掲載の大横川親水公園イラストマップは空撮写真（2019年7月撮影）及び公園内の看板等を基に書き起こしたものであり、実際の状況とは異なる場合があります。また公園内の施設・形状等は将来変更になる場合があります。<br>※現地からの距離は80ｍを1分として算出しており端数は切り上げております。 <br>※掲載の情報は2019年8月現在のものです。'
	// design
	} else if (tf.onChoice.index == 2) {
		result += '※1.エントランスホール完成予想CGは、計画段階の図面を基に描き起こしたもので、形状・色彩・外構・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。<br>※2掲載の1F敷地配置イラストは計画段階の図面を基に描き起こしたものであり実際とは異なります。今後行政指導・施工上の理由等により計画に変更が生じる場合があります。掲載の1F敷地配置イラストの計画敷地外の内容は航空写真（2019年8月撮影）を参考に描いたイメージであり将来、形状等が変更となる可能性があります。<br>※3.計画段階の図面を基に描き起こしたもので、形状・色彩・外構・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。周辺の公園は敷地隣接の法恩寺橋児童遊園（約10m）であり、計画敷地ではありません。なお、周辺環境等は将来的に保証されるものではありません。<br>※4.掲載の外壁サンプルにつきましては、実際とは質感・色等の見え方が異なる場合があります。素材は計画段階のもので今後変更になる場合があります。ご覧になる環境により、色合い等実際とは異なります。<br>※5.計画段階の図面を基に描き起こしたもので、形状・色彩・外構・植栽等は実際とは異なります。形状の細部・設備機器・配管等は省略または簡略化の上、表現しております。今後、行政指導・施工上の理由等により、計画に変更が生じる場合があります。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地内のみを表現しております。<br>※掲載の植栽はイメージ写真です。樹種は計画段階のものであり、今後変更となる場合があります。';
	// plan
	} else if (tf.onChoice.index == 3) {
		result += '※1.ソラノマ完成予想CGは、2019年7月に撮影した現地（3階相当の高さ）より北東方向を撮影した写真を基に描き起こした大横川親水公園（現地より約40m）と街並みのCGと計画段階の図面を基に描き起こしたソラノマ完成予想CGを合成したもので、実際とは異なります。CG内の家具調度品等は販売価格に含まれておりません。樹木・植栽は、特定の季節やご入居時の状態を想定して描かれたものではありません。実際に植樹する樹形・枝ぶり・葉や色合い等が異なる場合があります。本マンション敷地外の護岸基礎・フェンスや近隣建物や電柱・標識等は省略、または簡略化して表現しております。将来形状等が変更となる場合があります。周辺の公園は敷地隣接の大横川親水公園であり、計画敷地ではありません。なお、周辺環境等は将来的に保証されるものではありません。<br>※掲載の間取り図は計画中のもので、今後変更になる場合がございます。予めご了承ください。';
	// access
	} else if (tf.onChoice.index == 4) {
		result += '※1.掲載の現地周辺航空写真は2019年4月に撮影したものに、光等CG処理を加えたもので、実際とは異なります。現地の位置を表現した光は建物の高さや規模、向きを正確に表したものではありません。また、周辺環境は将来変わる場合があります。<br>※2.本シミュレーションは2019年4月時点の運行ダイヤをもとに算出しています。通勤シミュレーションは9:00の出勤を想定し8:45前後に目標に目的地駅到着の設定ルートです。終電シミュレーションは、通勤時ルートの定期券を所有している際に利用可能なルートを示しているため、実際の終電とは異なる場合があります。<br>※3.掲載の所要時間は時間帯・交通事情等により変動する可能性があります。<br>※4.全国タクシー料金検索にて算出したもので、走行ルートや交通事情等により料金が異なります。高速料金は含まれておりません。深夜料金は午後10時から午前5時までの適用となります。';
	// location
	} else if (tf.onChoice.index == 5) {
		result += '※現地からの徒歩分数は、80mを1分として算出しています。<br>※掲載の情報は2019年8月時点のものです。';
	// modelroom
	} else if (tf.onChoice.index == 6) {
	// equipment
	} else if (tf.onChoice.index == 7) {
	// structure
	} else if (tf.onChoice.index == 8) {
	// map
	} else if (tf.onChoice.index == 9) {
		result += '※掲載の現地周辺航空写真は2018年4月に撮影したものに、光等CG処理を加えたもので、実際とは異なります。現地の位置を表現した光は建物の高さや規模を示すものではありません。';
	// outline
	} else if (tf.onChoice.index == 10) {
		result += '※掲載の現地周辺航空写真は2018年4月に撮影したものに、光等CG処理を加えたもので、実際とは異なります。現地の位置を表現した光は建物の高さや規模を示すものではありません。';
	}
result += '</p>';
result += '</div>';
result += '</div>';
result += '</footer>';


	return result;
};
tf.init();
