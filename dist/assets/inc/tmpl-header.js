/**
 * 共通化nav情報
 */
var incNav = incNav || {};
incNav.onArray = [
	// 上が優先。
	{ dir: 'top', index: 1, layer: 1, new: false, off: false, next: '', back: '' }
];

/**
 * Template Header.
 */
var th = {};
th.onChoice = null;
th.onArray = {};
th.init = function() {
	for (var i = 0; i < incNav.onArray.length; i++) {
		if (th.onChoice == null) {
			if (location.href.indexOf(incNav.onArray[i].dir) > -1) th.onChoice = incNav.onArray[i];
		}
		th.onArray[incNav.onArray[i].dir] = incNav.onArray[i];
	}
	if (th.onChoice == null) th.onChoice = { dir: '', index: 0, layer: 0, next: '', back: '' };
	window.document.write(th.createTag());
};
th.createTag = function() {
	var result = '';
	var layer = '';
	for (var i = 0; i < th.onChoice.layer; i++) {
		layer += '../';
	}

	// href="' + layer + ' // パス（../）の変数
	// if(th.onChoice.index == 1) result += 'on '; それぞれ固有の処理をさせたい時（番号はindexに基づく
	// if(th.onArray._template.new) result += 'new '; NEWマーク
	// if(th.onArray._template.off) result += 'off '; off処理

	result += '<header class="p-header">';
	result += '<div class="p-header__inner" id="js-headerInner">';
	result += '<h1 class="p-header__logo"><a href="' + layer + 'index.html">logo</a></h1>';
	result += '<ul class="p-header__nav">';
	// top
	result += '<li class="p-header__navItem p-header__navItem--top"><a href="' + layer + '" class="p-header__navLink ';
	if (th.onChoice.index == 0) result += 'is-current';
	result += '">トップ</a>';
	result += '</li>';
	result += '</ul>';
	result += '</div>';
	result += '</header>';

	return result;
};
th.init();
