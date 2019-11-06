const browserSync = require('browser-sync');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const ejs = require('gulp-ejs');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sassglob = require('gulp-sass-glob');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const htmlbeautify = require('gulp-html-beautify');
const gulpStylelint = require('gulp-stylelint');

const filePath = {
	css: './src/**/*.css',
	dest: './dist/',
	ejs: ['./src/**/*.ejs', '!' + './src/**/_*.ejs'],
	font: './src/**/*.woff',
	img: ['./src/**/*.svg', './src/**/*.jpg', './src/**/*.png', './src/**/*.gif'],
	js: './src/**/*.js',
	sass: './src/**/*.scss',
};

// ビルド前にdist内を削除
gulp.task('clean', () => {
	return del('./dist', { force: true });
});

// sass以外のcssをコピー
gulp.task('css', () => {
	return gulp.src(filePath.css, { base: './src' }).pipe(gulp.dest(filePath.dest));
});

// ejsをコンパイル
gulp.task('ejs', () => {
	var json = JSON.parse(fs.readFileSync('./src/_include/data.json'));
	return gulp
		.src(filePath.ejs, { base: './src' })
		.pipe(ejs({ json }))
		.pipe(rename({ extname: '.html' }))
		.pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
		.pipe(
			htmlbeautify({
				indentSize: 2,
				indent_with_tabs: true,
			})
		)
		.pipe(gulp.dest(filePath.dest));
});

// fontをコピー
gulp.task('font', () => {
	return gulp.src(filePath.font, { base: './src' }).pipe(gulp.dest(filePath.dest));
});

// 画像圧縮処理
gulp.task('image', () => {
	return gulp
		.src(filePath.img, { base: './src' })
		.pipe(
			imagemin([
				pngquant({ quality: [0.7, 0.8], speed: 1 }),
				mozjpeg({ quality: 80 }),
				imagemin.svgo(),
				imagemin.gifsicle(),
			])
		)
		.pipe(gulp.dest(filePath.dest));
});

// jsをコンパイル
gulp.task('js', () => {
	return gulp
		.src(filePath.js, { base: './src' })
		.pipe(
			plumber({
				errorHandler: notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(gulp.dest(filePath.dest));
});

// sassをコンパイル
gulp.task('sass', () => {
	return gulp
		.src(filePath.sass, { base: './src' })
		.pipe(
			sassglob()
		)
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(
			plumber({
				errorHandler: notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(
			prefix({
				cascade: false,
			})
		)

		.pipe(
			gulpStylelint({
				fix: true,
			})
		)
		.pipe(gulp.dest(filePath.dest));
});

// htmlのフォーマットを整える
gulp.task('htmlbeautify', () => {
	return gulp
		.src(filePath.html, { base: './dist' })
		.pipe(plumber()) // エラーによる監視解除の対応
		.pipe(
			htmlbeautify({
				indentSize: 2,
				indent_with_tabs: true,
			})
		)
		.pipe(gulp.dest(filePath.dest));
});

// サーバを立ち上げる
gulp.task('build-server', done => {
	browserSync.init({
		server: {
			baseDir: './dist',
			index: 'index.html',
		},
	});
	done();
	console.log('Server was launched');
});

// ブラウザのリロード
gulp.task('browser-reload', done => {
	browserSync.reload();
	done();
	console.log('Browser reload completed');
});

// 監視ファイル
gulp.task('watch', done => {
	gulp.watch('./dist/**/*.html', gulp.task('browser-reload'));
	gulp.watch('./dist/**/*.woff', gulp.task('browser-reload'));
	gulp.watch(['./src/**/*.svg', './src/**/*.jpg', './src/**/*.png', './src/**/*.gif'], gulp.task('browser-reload'));
	gulp.watch('./dist/**/*.js', gulp.task('browser-reload'));
	gulp.watch('./dist/**/*.css', gulp.task('browser-reload'));

	gulp.watch(filePath.css, gulp.series('css'));
	gulp.watch(filePath.ejs, gulp.series('ejs'));
	gulp.watch(filePath.font, gulp.series('font'));
	gulp.watch(filePath.img, gulp.series('image'));
	gulp.watch(filePath.js, gulp.series('js'));
	gulp.watch(filePath.sass, gulp.series('sass'));

	done();
	console.log('gulp watch started');
});

// タスクの実行
gulp.task(
	'default',
	gulp.series(
		'clean',
		gulp.series('css', 'font', 'ejs', 'image', 'js', 'sass', 'build-server', 'watch', done => {
			done();
			console.log('Default all task done!');
		})
	)
);
