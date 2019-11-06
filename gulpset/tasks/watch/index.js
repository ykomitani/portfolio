const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('watch', cb => gulpset.tasks.watch(cb));

gulpset.confs.watch = [
  {
    watch: [gulpset.paths.src + '**/*.ejs'],
    run: ['ejs']
  },
  {
    watch: [gulpset.paths.src + '**/*.scss'],
    run: ['sass']
  },
  {
    watch: gulpset.confs.eslint.src,
    run: ['eslint']
  },
  {
    watch: gulpset.confs.copy.src,
    run: ['copy']
  },
  {
    watch: gulpset.confs.imagemin.src,
    run: ['imagemin']
  }
];

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');

gulpset.tasks.watch = (cb, conf) => {
  conf = conf || gulpset.confs.watch || {};
  for (let i = 0, iLen = conf.length; i < iLen; i++) {
    const node = conf[i];
    gulp.watch(node.watch, gulp.series(...node.run));
  }
  cb();
};
