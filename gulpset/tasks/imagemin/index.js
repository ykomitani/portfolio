const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('imagemin', () => gulpset.tasks.imagemin());

gulpset.confs.imagemin = {
  src: [`${gulpset.paths.src}**/*.{svg,SVG}`],
  dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');

gulpset.tasks.imagemin = conf => {
  conf = conf || gulpset.confs.imagemin || {};
  return gulp
    .src(conf.src, { base: gulpset.paths.src })
    .pipe(plumber())
    .pipe(
      imagemin({
        plugins: [imagemin.svgo()]
      })
    )
    .pipe(gulp.dest(conf.dest));
};
