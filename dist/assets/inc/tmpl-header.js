/**
 * 共通化nav情報
 */
var incNav = incNav || {};
incNav.onArray = [
	// 上が優先。
	{ dir: 'top', index: 1, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'works', index: 2, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'contact', index: 3, layer: 1, new: false, off: false, next: '', back: '' }
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
	result += '<div class="c-wrap">';
	result += '<h1 class="p-header__logo"><a href="' + layer + 'index.html">Portfolio of Yuriko Mitani</a></h1>';
	result += '<ul class="p-header__nav">';
	// top
	result += '<li class="p-header__navItem p-header__navItem--top"><a href="' + layer + '" class="p-header__navLink ';
	if (th.onChoice.index == 0) result += 'is-current';
	result += '">Top</a>';
	result += '</li>';
	// works
	result += '<li class="p-header__navItem p-header__navItem--works"><a href="' + layer + 'works/" class="p-header__navLink ';
	if (th.onChoice.index == 2) result += 'is-current';
	result += '">Works</a>';
	result += '</li>';
	// contact
	result += '<li class="p-header__navItem p-header__navItem--works"><a href="' + layer + 'contact/" class="p-header__navLink ';
	if (th.onChoice.index == 3) result += 'is-current';
	result += '">Contact</a>';
	result += '</li>';
	result += '</ul>';
	result += '</div>';
	result += '</div>';
	result += '</header>';

	return result;
};
th.init();
