# ![Gulp Starter](gulp-intro.jpg)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Gulp Flexbox Perfect Starter is a delicious blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site or app structure. [Check out the compiled demo]() and play with [the source files](/src)!

```bash
git clone https://github.com/Buda9/gulp-flexbox-perfect-starter MyApp
cd MyApp
npm install
gulp
```

Features | Tools Used
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**JavaScript** | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/)
**HTML** | [Nunjucks](https://mozilla.github.io/nunjucks/), [gulp-data](https://github.com/colynb/gulp-data), or bring your own
**Images** | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)
**Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
**Fonts** | Folder and `.sass` mixin for including WebFonts
**Live Updating** | [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
**Production Builds** | JS and CSS are [uglified](https://github.com/terinjokes/gulp-uglify) and [minified](http://cssnano.co/), [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport), local production [Express](http://expressjs.com/) server for testing builds.
**JS Testing** | [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), Example [Travis CI](https://travis-ci.org/) integration
**Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)

## Usage
Make sure Node installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions. 

This has been tested on Node `0.12.x` - `5.10.0`, and should work on newer versions as well. [File an issue](https://github.com/Buda9/gulp-flexbox-perfect-starter/issues) if it doesn't!

#### Install Dependencies
```bash
npm install
```

#### Start compiling, serving, and watching files:
```
gulp
```

This is where the magic happens. The perfect front-end workflow. This runs the default gulp task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

Why run this as an npm script? NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

#### Compile Sass to CSS:
```bash
gulp compileSass
```

#### Generate & Inline Critical-path CSS:
```bash
gulp critical
```

#### Minify and concat scripts
```bash
gulp minifyConcatScripts
```

#### Compress images
```bash
gulp imgOptimize
```

#### Compress and minify HTML
```bash
gulp compressHtml
```

#### Open BrowserSync
```bash
gulp run
```

#### Manually remove compiled files and folders
```bash
gulp clean
```

#### Watch for file changes for html, images, scripts and sass/css
```bash
gulp watch
```

### Running the Demo
By default, the files in `src` are pretty minimal. If you're just exploring and would like to play with the [demo]() files, the files available in `demo`. Just replace `src` and `config.json` with the ones in `demo`, or simply check out the `demo` branch.

```
git checkout demo
gulp
```

### Starting a fresh project
If you plan on using this to start a new project, be sure and clear out the `git` data start a fresh history:

```bash
rm -rf .git && git init
git commit -m "Initialized with Gulp Starter"
```

## Configuration
Directory and top level settings are convienently exposed in `gulpfile.js`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `public` directories specfied. These are relative to `root.src` and `root.public` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile.js`.

### Start compiling, serving, and watching files
```
gulp
```

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile.js`, last few lines of a code.

All files will compile in development mode (compressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

## Asset Task Details
A `README.md` with details about each asset task are available in their respective folders in the `src` directory:

- [JavaScript](src/javascripts)
- [Stylesheets](src/sass)
- [HTML](src/)
- [Images](src/images)
- [Static Files (favicons, app icons, etc.)](src/static)

## Additional Task Details

### Build production-ready files
```
gulp
```

This will compile revisioned and compressed files to `./public`. To build production files and preview them localy, run

## Notable changes from 0.3
- 

## Questions

Drop me a line at [davor@davor.pro](mailto:davor@davor.pro) with any questions or thoughts. Pull requests welcomed!

### License

MIT

### TO-DO

Integrate: 

- https://www.npmjs.com/package/gulp-changed
- https://www.npmjs.com/package/gulp-newer
- https://www.npmjs.com/package/gulp-rev
- https://www.npmjs.com/package/psi
- https://www.npmjs.com/package/gulp-iconfont


***

[npm-url]: https://www.npmjs.com/package/gulp
[npm-image]: https://img.shields.io/npm/v/gulp.svg

[travis-url]: https://travis-ci.org/gulpjs/gulp
[travis-image]: https://img.shields.io/travis/gulpjs/gulp.svg
