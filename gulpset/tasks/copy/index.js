const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('copy', () => gulpset.tasks.copy());

gulpset.confs.copy = {
  src: [gulpset.paths.src + '**/*.{html,htm,txt,inc,css,js,ico,json,xml,php,woff,woff2,ttf,eot,mp4,webm,map,mp3,pdf,zip,exe,swf,gif,jpg,png,GIF,JPG,PNG}', `!${gulpset.paths.src}assets/**/*.{js,jsx}`],
  base: gulpset.paths.src,
  dest: gulpset.paths.dest
};

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

gulpset.tasks.copy = conf => {
  conf = conf || gulpset.confs.copy || {};
  return gulp
    .src(conf.src, { base: conf.base })
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
