const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('clean', () => gulpset.tasks.clean());

//----------------------------------------------------------------------------------------------------
//

const del = require('del');

gulpset.tasks.clean = path => {
  path = path || gulpset.paths.dest + '/!(.git|README.md)*';
  return del(path);
};
