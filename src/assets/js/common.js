(function($) {
	var config = function() {
		//ポップアップリンクに置換
		$('.commonPop').easyPop();
		//アンカーリンクをスムージング
		$('a[href^="#"]').smoothScroll();
		// 判別用
		var _ua = Fourdigit.set()._ua,
			_browser = Fourdigit.set()._browser,
			_breakP = Fourdigit.set()._breakP,
			_winSize = Fourdigit.set()._winSize;
		// ブラウザを判別し、bodyにそのブラウザ名のクラスを付与
		for (var key in _browser) {
			if (_browser.hasOwnProperty(key)) {
				if (_browser[key] == true) {
					$('body').addClass(key);
				}
			}
		}
	};

	$(function() {
		/**
		 * 共通系処理
		 * @description
		 * サイト共通で機能させる処理はここに書きます。
		 */
		config();

		// 共通変数
		var $html = $('html'),
			$body = $('body'),
			$gHdr = $('#gHeader'),
			$gNav = $('#gNav'),
			$pNav = $('#pNav'),
			$spNav = $('#spNav'),
			// $spMenu = $('#spMenu'),
			$gFtr = $('#gFooter'),
			$fNav = $('#fNav'),
			$pagetop = $('#pagetop');

		/**
		 * VIEWPORT 切り替え
		 * @description
		 * TBとSPの場合で、それぞれviewportの値を切り替えます。
		 */
		function updateMetaViewport() {
			var viewportContent;
			if (_ua.SP) {
				viewportContent = 'width=device-width,initial-scale=1.0,maximum-scale=1.5,user-scalable=yes';
			} else if (_ua.TB) {
				viewportContent = 'width=1000px';
			}
			document.querySelector("meta[name='viewport']").setAttribute('content', viewportContent);
		}
		if (_ua.SP || _ua.TB) {
			window.addEventListener('load', updateMetaViewport, false);
		}
		/**
		 * android tel設定
		 * @description
		 * androidで電話がかけられないバグ用の記述です。
		 */
		if (_ua.SP) {
			$('a[href^=tel]').on('click', function() {
				location.href = $(this).attr('href');
				return false;
			});
		}
		/**
		 * PAGE TOP
		 * @description
		 */
		$pagetop.on('click', function() {
			$body.animate(
				{
					scrollTop: 0,
				},
				500,
				'linear'
			);
			return false;
		});
		/**
		 * SP NAVI
		 * @description
		 */
		var $spNavFlag = false,
			$spMenu = document.getElementById('js-spMenu'),
			$headerInner = document.getElementById('js-headerInner'),
			$globalNav = document.getElementById('js-spGlobalNav');

		if (_breakP) {
			$spMenu.addEventListener('click', function() {
				if ($spNavFlag === true) {
					document.documentElement.style.overflow = 'visible';
					document.documentElement.style.height = 'auto';
					document.body.style.overflow = 'visible';
					document.body.style.height = 'auto';
					$headerInner.classList.remove('is-active');
					$globalNav.classList.remove('is-active');
					$spMenu.classList.remove('is-active');
					$spNavFlag = false;
				} else {
					document.documentElement.style.overflow = 'hidden';
					document.documentElement.style.height = 100 + '%';
					document.body.style.overflow = 'hidden';
					document.body.style.height = 100 + '%';
					$headerInner.classList.add('is-active');
					$globalNav.classList.add('is-active');
					$spMenu.classList.add('is-active');
					$spNavFlag = true;
				}
			});
		}


		/**
		 * 各ページ固有の処理
		 * 基本的にローカルにJSは置かずにcommon内で完結させる。
		 */
		switch ($('.l-page').attr('id')) {
			case 'top':
				AOS.init({
					offset: 300,
					duration: 1000,
					easing: 'ease-in-sine',
					delay: 500,
					once: true,
				});
				break;
			default:
				break;
		}
	});
})(jQuery);
