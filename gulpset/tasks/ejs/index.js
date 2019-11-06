const gulpset = require('./../../gulpset');
const PAGES = require('./_tdk');

gulpset.gulp.task('ejs', () => gulpset.tasks.ejs());
gulpset.confs.ejs = {
  src: [gulpset.paths.src + '**/!(_)*.ejs'],
  dest: gulpset.paths.dest,
  data: {},
  options: {
    root: process.cwd() + '/src'
  },
  settings: {
    ext: '.html'
  }
};

//----------------------------------------------------------------------------------------------------//
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const ejs = require('gulp-ejs');
const changed = require('gulp-changed');
const beautify = require('gulp-jsbeautifier');
const gulpData = require('gulp-data');
const gulpIf = require('gulp-if');
const convertEncoding = require('gulp-convert-encoding');

const currentPageDataJson = file => {
  let currentPagePath;
  const tmpPath = file.path.split(process.cwd() + '/src')[1];
  if (tmpPath.match(/index\.ejs$/)) {
    currentPagePath = tmpPath.split('index.ejs')[0]; //index.ejs(index.html)なしのパスに
  } else {
    currentPagePath = tmpPath.split('.ejs')[0] + '.html'; //xxx.ejs -> xxx.htmlに書き換え
  }

  const PAGE_SETTINGS = (() => {
    let obj = {};
    for (let i = 0, len = PAGES.length; i < len; i++) {
      if (PAGES[i]['path'] === currentPagePath) {
        obj = PAGES[i];
        break;
      }
    }
    return obj;
  })();

  const pathArr = currentPagePath.split('/');
  pathArr.shift();
  const lastPath = pathArr[pathArr.length - 1];
  if (lastPath === '') pathArr.pop();
  else pathArr[pathArr.length - 1] = lastPath.split('.html')[0];
  PAGE_SETTINGS.pathArr = pathArr;

  const depth = pathArr.length;
  PAGE_SETTINGS.depth = depth;

  return { PAGES, PAGE_SETTINGS }; //ページ一覧、ページ固有の情報、量産系ページの変数の値
};
const isForm = file => file.path.match('/_form/');//フォーム用ページがどうか
gulpset.tasks.ejs = () => {
  const conf = gulpset.confs.ejs;
  const data = conf.data;
  const options = conf.options;
  const settings = conf.settings;

  const src = conf.src;
  const dest = conf.dest;
  return gulp
    .src(src, { base: gulpset.paths.src })
    .pipe(plumber())
    .pipe(changed(dest))
    .pipe(gulpData(file => currentPageDataJson(file)))
    .pipe(ejs(data, options, settings))
    .pipe(
      beautify({
        indent_size: 2,
        indent_char: ' ',
        eol: '\n',
        end_with_newline: true
      })
    )
    .pipe(gulpIf(file => isForm(file), convertEncoding({ to: 'shift_jis' })))
    .pipe(gulp.dest(dest))
    .pipe(gulpset.stream());
};
