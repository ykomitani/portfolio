const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  context: __dirname + '/../../src',
  watch: true,
  entry: {
    head: '../../src/assets/js/head.js',
    main: '../../src/assets/js/main.js',
    head_legacy: '../../src/assets/js/head_legacy.js'
  },
  output: {
    filename: 'assets/js/[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    loose: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
