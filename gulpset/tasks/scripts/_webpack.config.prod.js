const devConfig = require('./_webpack.config');

module.exports = {
  ...devConfig,
  watch: false,
  mode: 'production'
};
