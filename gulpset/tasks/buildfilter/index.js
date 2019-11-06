const gulpset = require('./../../gulpset');
const pages = require('../ejs/_tdk');

gulpset.confs.buildfilter = {};

gulpset.tasks.buildfilter = (cb, type) => {
  const formDir = `${gulpset.paths.dest}_form`;
  const searchDir = `${gulpset.paths.dest}search`;
  const cmsPages = [];
  for (let i = 0, len = pages.length; i < len; i++) {
    const thisPage = pages[i];
    if (!thisPage.CMS) continue;

    let thisPagePath = thisPage.path.slice(-1) === '/' ? `${thisPage.path}index.html` : thisPage.path;
    if (type.includes('cms')) thisPagePath = gulpset.paths.src + thisPagePath.replace('.html', '.ejs');
    else thisPagePath = gulpset.paths.dest + thisPagePath;

    cmsPages.push(thisPagePath);
  }

  gulpset.confs.buildfilter.delSrc = [
    `${gulpset.paths.dest}_components`,
    `${gulpset.paths.dest}_list`,
    `${gulpset.paths.dest}_dummy`,
    formDir,
    searchDir
  ];

  if (type === 'form') {
    //`assets` `_form` フォルダのみbuild（`_form`には実際はhtmlしか入ってない）
    gulpset.confs.imagemin.src = [`${gulpset.paths.src}+(assets|_form)/**/*.{gif,jpg,png,svg}`];
    gulpset.confs.sass[0].src = [`${gulpset.paths.src}+(assets|_form)/**/!(_)*.scss`];
    gulpset.confs.ejs.src = `${gulpset.paths.src}_form/**/!(_)*.ejs`;
    gulpset.confs.copy.src = `${gulpset.paths.src}assets/js/data/**`;
  } else if (type === 'search') {
    //`assets` `search` フォルダのみbuild
    gulpset.confs.imagemin.src = [`${gulpset.paths.src}+(assets|search)/**/*.{gif,jpg,png,svg}`];
    gulpset.confs.sass[0].src = [`${gulpset.paths.src}+(assets|search)/**/!(_)*.scss`];
    gulpset.confs.ejs.src = `${gulpset.paths.src}search/index.ejs`;
    gulpset.confs.copy.src = `${gulpset.paths.src}assets/js/data/**`;
  } else if (type === 'cms') {//cms
    //`assets` と、各htmlと同階層にある画像・scssをbuild
    const imageminSrc = [`${gulpset.paths.src}+(assets|search)/**/*.{gif,jpg,png,svg}`];
    const sassSrc = [`${gulpset.paths.src}+(assets|search)/**/!(_)*.scss`];
    const ejsSrc = cmsPages;
    for (let i = 0, len = ejsSrc.length; i < len; i++) {
      const thisPage = ejsSrc[i];
      let thisPageDir = thisPage.split('/');
      thisPageDir.pop();
      thisPageDir = thisPageDir.join('/');

      imageminSrc.push(`${thisPageDir}/img/**/*.{gif,jpg,png,svg}`);
      sassSrc.push(`${thisPageDir}/css/*(local.scss)`);
      sassSrc.push(`${thisPageDir}/css/*(local_sp.scss)`);
    }
    gulpset.confs.imagemin.src = imageminSrc;
    gulpset.confs.sass[0].src = sassSrc;
    gulpset.confs.ejs.src = ejsSrc;
    gulpset.confs.copy.src = `${gulpset.paths.src}assets/js/data/**`;
  }

  //全ファイルbuildした後に不要なファイルを削除
  if (type === 'static' || type === 'tup') {
    //cmsテンプレhtmlを削除対象に
    gulpset.confs.buildfilter.delSrc = gulpset.confs.buildfilter.delSrc.concat(cmsPages);
  }
  if (type === 'tup') {
    //フォームと検索のディレクトリを削除対象から除外
    let index = gulpset.confs.buildfilter.delSrc.indexOf(formDir);
    gulpset.confs.buildfilter.delSrc.splice(index, 1);
    index = gulpset.confs.buildfilter.delSrc.indexOf(searchDir);
    gulpset.confs.buildfilter.delSrc.splice(index, 1);
  }

  cb();
};
