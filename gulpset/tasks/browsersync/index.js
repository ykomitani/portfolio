const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('browsersync', cb => gulpset.tasks.browsersync(cb));

const fs = require('fs');
const path = require('path');
const iconvLite = require('iconv-lite');
const jschardet = require('jschardet');
gulpset.confs.browsersync = {
  port: 3000,
  open: 'external',
  server: {
    baseDir: gulpset.paths.dest,
    directory: false,
    middleware: [
      (req, res, next) => {
        if (/(\.html|\/)(\?.+=.+|#.+)?$/.test(req.url)) {//.htmlもしくは/で終わる（index.html）場合
          let absPath = '';
          if (/\/$/.test(req.url)) absPath = path.join(gulpset.paths.dest, req.url, 'index.html');
          else absPath = path.join(gulpset.paths.dest, req.url);

          absPath = absPath.split('?')[0];
          absPath = absPath.split('#')[0];
          if (/\/$/.test(absPath)) absPath = path.join(absPath, 'index.html');

          const data = fs.readFileSync(absPath);
          // 文字コード判定
          const charset = jschardet.detect(data);
          if (charset.encoding === 'EUC-JP' || charset.encoding === 'SHIFT_JIS') {
            const encoding = charset.encoding;
            const source = iconvLite.decode(new Buffer(data, 'binary'), encoding);
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.end(source);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    ]
  },
  rewriteRules: [//https://qiita.com/matsuoshi/items/f4d99ccf939b37f5d989
    {
      match: /<!--#include virtual="(.+)" -->/g,
      fn: function (req, res, match, filename) {
        const filePath = path.join(gulpset.paths.dest, filename);
        if (!fs.existsSync(filePath)) return `<span style="color: red">${filename} could not be found</span>`;

        const data = fs.readFileSync(filePath);
        // 文字コード判定
        const charset = jschardet.detect(data);
        if (charset.encoding === 'EUC-JP' || charset.encoding === 'SHIFT_JIS') {
          const encoding = charset.encoding;
          const source = iconvLite.decode(new Buffer(data, 'binary'), encoding);
          return source;
        } else {
          return data;
        }
      }
    }
  ],
  startPath: '/_list/inner/index.html',
  ghostMode: false
};

//----------------------------------------------------------------------------------------------------
///
const sync = require('browser-sync');
const gutil = require('gulp-util');

gulpset.tasks.browsersync = (cb, conf) => {
  conf = conf || gulpset.confs.browsersync || {};
  if (!Array.isArray(conf)) conf = [conf];

  conf.forEach(conf => {
    const bs = sync.create();
    bs.init(conf);
    gulpset.syncs.push(bs);
  });
  gulpset.stream = opt => {
    opt = opt || null;
    const queue = gutil.noop();
    // gulpset.syncs.forEach(bs => {
    //   queue.pipe(bs.stream(opt));
    // });
    // return queue;
    return queue.pipe(gulpset.syncs[0].stream(opt));
  };

  gulpset.reload = function() {
    gulpset.syncs.forEach(function(bs) {
      bs.reload();
    });
  };

  cb();
};
