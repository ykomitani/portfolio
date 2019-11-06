/**
 * 共通化nav情報
 */
var incNav = incNav || {};
incNav.onArray = [
	// 上が優先。
	{ dir: 'parkfront', index: 1, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'design', index: 2, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'plan', index: 3, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'access', index: 4, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'location', index: 5, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'modelroom', index: 6, layer: 1, new: false, off: true, next: '', back: '' },
	{ dir: 'equipment', index: 7, layer: 1, new: false, off: true, next: '', back: '' },
	{ dir: 'structure', index: 8, layer: 1, new: false, off: true, next: '', back: '' },
	{ dir: 'map', index: 9, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: 'outline', index: 10, layer: 1, new: false, off: false, next: '', back: '' },
	{ dir: '_template', index: 99, layer: 1, new: false, off: false, next: '', back: '' },
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
	result += '<h1 class="p-header__logo"><a href="' + layer + 'index.html"><img src="' + layer + 'assets/imgs/logo-header.svg" alt="クレヴィア錦糸町"></a></h1>';
	result += '<ul class="p-header__nav">';
	// top
	result += '<li class="p-header__navItem p-header__navItem--top"><a href="' + layer + '" class="p-header__navLink ';
	if (th.onChoice.index == 0) result += 'is-current';
	result += '">トップ</a>';
	result += '</li>';
	// parkfront
	result += '<li class="p-header__navItem p-header__navItem--parkfront ';
	if (th.onArray.parkfront.new) result += 'is-new ';
	if (th.onArray.parkfront.off) result += 'is-off ';
	result += '"><a href="' + layer + 'parkfront/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 1) result += 'is-current';
	result += '">公園隣接</a>';
	result += '</li>';
	// design
	result += '<li class="p-header__navItem p-header__navItem--design ';
	if (th.onArray.design.new) result += 'is-new ';
	if (th.onArray.design.off) result += 'is-off ';
	result += '"><a href="' + layer + 'design/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 2) result += 'is-current';
	result += '">デザイン</a>';
	result += '</li>';
	// plan
	result += '<li class="p-header__navItem p-header__navItem--plan ';
	if (th.onArray.plan.new) result += 'is-new ';
	if (th.onArray.plan.off) result += 'is-off ';
	result += '"><a href="' + layer + 'plan/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 3) result += 'is-current';
	result += '">プラン</a>';
	result += '</li>';
	// access
	result += '<li class="p-header__navItem p-header__navItem--access ';
	if (th.onArray.access.new) result += 'is-new ';
	if (th.onArray.access.off) result += 'is-off ';
	result += '"><a href="' + layer + 'access/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 4) result += 'is-current';
	result += '">アクセス</a>';
	result += '</li>';
	// location
	result += '<li class="p-header__navItem p-header__navItem--location ';
	if (th.onArray.location.new) result += 'is-new ';
	if (th.onArray.location.off) result += 'is-off ';
	result += '"><a href="' + layer + 'location/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 5) result += 'is-current';
	result += '">周辺環境</a>';
	result += '</li>';
	// modelroom
	result += '<li class="p-header__navItem p-header__navItem--modelroom ';
	if (th.onArray.modelroom.new) result += 'is-new ';
	if (th.onArray.modelroom.off) result += 'is-off ';
	result += '"><a href="' + layer + 'modelroom/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 6) result += 'is-current';
	result += '">モデルルーム</a>';
	result += '</li>';
	// equipment
	result += '<li class="p-header__navItem p-header__navItem--equipment ';
	if (th.onArray.equipment.new) result += 'is-new ';
	if (th.onArray.equipment.off) result += 'is-off ';
	result += '"><a href="' + layer + 'structure/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 7) result += 'is-current';
	result += '">設備・仕様</a>';
	result += '</li>';
	// structure
	result += '<li class="p-header__navItem p-header__navItem--structure ';
	if (th.onArray.structure.new) result += 'is-new ';
	if (th.onArray.structure.off) result += 'is-off ';
	result += '"><a href="' + layer + 'structure/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 8) result += 'is-current';
	result += '">構造</a>';
	result += '</li>';
	// map
	result += '<li class="p-header__navItem p-header__navItem--map ';
	if (th.onArray.map.new) result += 'is-new ';
	if (th.onArray.map.off) result += 'is-off ';
	result += '"><a href="' + layer + 'map/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 9) result += 'is-current';
	result += '">現地案内図</a>';
	result += '</li>';
	// outline
	result += '<li class="p-header__navItem p-header__navItem--outline ';
	if (th.onArray.outline.new) result += 'is-new ';
	if (th.onArray.outline.off) result += 'is-off ';
	result += '"><a href="' + layer + 'outline/index.html" class="p-header__navLink ';
	if (th.onChoice.index == 10) result += 'is-current';
	result += '">物件概要</a>';
	result += '</li>';
	result += '</ul>';
	result += '<div class="p-header__conversion">';
	result += '<a href="{$request}" class="p-header__conversionButton p-header__conversionButton--request" target="_blank">資料請求</a>';
	// result += '<a href="{$reserve}" class="p-header__conversionButton p-header__conversionButton--reserve" target="_blank">来場予約</a>';
	result += '</div>';
	result += '</div>';
	result += '</header>';

	result += '<div class="p-spGlobalNav" id="js-spGlobalNav">';
	result += '<div class="p-spGlobalNav__inner">';
	result += '<p class="p-spGlobalNav__heading">CREVIA KINSHICHO GARDENCOAST</p>';
	result += '<ul class="p-spGlobalNav__list">';
	// top
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--top"><a href="' + layer + '" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 0) result += 'is-current';
	result += '"><span class="p-spGlobalNav__name">トップ</span>';
	result += '</a>';
	result += '</li>';
	// parkfront
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--parkfront ';
	if (th.onArray.parkfront.new) result += 'is-new ';
	if (th.onArray.parkfront.off) result += 'is-off ';
	result += '"><a href="' + layer + 'parkfront/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 1) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-parkfront.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">公園隣接</span>';
	result += '</a>';
	result += '</li>';
	// design
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--design ';
	if (th.onArray.design.new) result += 'is-new ';
	if (th.onArray.design.off) result += 'is-off ';
	result += '"><a href="' + layer + 'design/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 2) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-design.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">デザイン</span>';
	result += '</a>';
	result += '</li>';
	// plan
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--plan ';
	if (th.onArray.plan.new) result += 'is-new ';
	if (th.onArray.plan.off) result += 'is-off ';
	result += '"><a href="' + layer + 'plan/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 3) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-plan.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">プラン</span>';
	result += '</a>';
	result += '</li>';
	// access
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--access ';
	if (th.onArray.access.new) result += 'is-new ';
	if (th.onArray.access.off) result += 'is-off ';
	result += '"><a href="' + layer + 'access/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 4) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-access.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">アクセス</span>';
	result += '</a>';
	result += '</li>';
	// location
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--location ';
	if (th.onArray.location.new) result += 'is-new ';
	if (th.onArray.location.off) result += 'is-off ';
	result += '"><a href="' + layer + 'location/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 5) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-location.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">周辺環境</span>';
	result += '</a>';
	result += '</li>';
	// modelroom
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--modelroom ';
	if (th.onArray.modelroom.new) result += 'is-new ';
	if (th.onArray.modelroom.off) result += 'is-off ';
	result += '"><a href="' + layer + 'modelroom/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 6) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-modelroom.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">モデルルーム</span>';
	result += '</a>';
	result += '</li>';
	// equipment
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--equipment ';
	if (th.onArray.equipment.new) result += 'is-new ';
	if (th.onArray.equipment.off) result += 'is-off ';
	result += '"><a href="' + layer + 'structure/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 7) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-equipment.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">設備・仕様</span>';
	result += '</a>';
	result += '</li>';
	// structure
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--structure ';
	if (th.onArray.structure.new) result += 'is-new ';
	if (th.onArray.structure.off) result += 'is-off ';
	result += '"><a href="' + layer + 'structure/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 8) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-structure.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">構造</span>';
	result += '</a>';
	result += '</li>';
	// map
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--map ';
	if (th.onArray.map.new) result += 'is-new ';
	if (th.onArray.map.off) result += 'is-off ';
	result += '"><a href="' + layer + 'map/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 9) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-map.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">現地案内図</span>';
	result += '</a>';
	result += '</li>';
	// outline
	result += '<li class="p-spGlobalNav__item p-spGlobalNav__item--outline ';
	if (th.onArray.outline.new) result += 'is-new ';
	if (th.onArray.outline.off) result += 'is-off ';
	result += '"><a href="' + layer + 'outline/index.html" class="p-spGlobalNav__link ';
	if (th.onChoice.index == 10) result += 'is-current';
	result += '"><img src="' + layer + 'assets/imgs/sp/thum-nav-outline.jpg" alt="image" class="p-spGlobalNav__thumbnail">';
	result += '<span class="p-spGlobalNav__name">物件概要</span>';
	result += '</a>';
	result += '</li>';
	result += '</ul>';
	result += '</div>';
	result += '</div>';

	result += '<nav class="p-spNav">';
	result += '<div class="p-spMenu" id="js-spMenu">';
	result += '<span class="p-spMenu__object">';
	result += '<span class="p-spMenu__bar p-spMenu__bar--top"></span>';
	result += '<span class="p-spMenu__bar p-spMenu__bar--middle"></span>';
	result += '<span class="p-spMenu__bar p-spMenu__bar--bottom"></span>';
	result += '</span>';
	result += '</div>';
	result += '<ul class="p-spNav__list">';
	result += '<li class="p-spNav__item p-spNav__item--request">';
	result += '<a href="{$request}" class="p-spNav__link" target="_blank">';
	result += '<div class="p-spNav__linkInner">';
	result += '<img src="' + layer + 'assets/imgs/sp/icn-req.svg" alt="image" class="p-spNav__requestIcon">';
	result += '<span class="p-spNav__text p-spNav__text--beige">資料請求</span>';
	result += '</div>';
	result += '</a>';
	result += '</li>';
	result += '<li class="p-spNav__item">';
	result += '<a href="' + layer + 'outline/index.html" class="p-spNav__link">';
	result += '<div class="p-spNav__linkInner">';
	result += '<img src="' + layer + 'assets/imgs/sp/icn-outline.svg" alt="image" class="p-spNav__outlineIcon">';
	result += '<span class="p-spNav__text">物件概要</span>';
	result += '</div>';
	result += '</a>';
	result += '</li>';
	// result += '<li class="p-spNav__item">';
	// result += '<a href="{$reserve}" class="p-spNav__link" target="_blank">';
	// result += '<div class="p-spNav__linkInner">';
	// result += '<img src="' + layer + 'assets/imgs/sp/icn-res.svg" alt="image" class="p-spNav__reserveIcon">';
	// result += '<span class="p-spNav__text">来場予約</span>';
	// result += '</div>';
	// result += '</a>';
	// result += '</li>';
	result += '<li class="p-spNav__item">';
	result += '<a href="' + layer + 'map/index.html" class="p-spNav__link">';
	result += '<div class="p-spNav__linkInner">';
	result += '<img src="' + layer + 'assets/imgs/sp/icn-map.svg" alt="image" class="p-spNav__mapIcon">';
	result += '<span class="p-spNav__text">現地案内図</span>';
	result += '</div>';
	result += '</a>';
	result += '</li>';
	result += '<li class="p-spNav__item">';
	result += '<a href="tel:0120798041" class="p-spNav__link">';
	result += '<div class="p-spNav__linkInner">';
	result += '<img src="' + layer + 'assets/imgs/sp/icn-tel.svg" alt="image" class="p-spNav__telIcon">';
	result += '<span class="p-spNav__text">お問い合わせ</span>';
	result += '</div>';
	result += '</a>';
	result += '</li>';
	result += '</ul>';
	result += '</nav>';

	return result;
};
th.init();
