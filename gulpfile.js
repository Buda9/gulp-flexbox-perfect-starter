/*=============================================
=            Gulp Starter by @Buda9           =
=============================================*/

'use strict';

/**
*
* The packages we are using
*
**/
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    minifyHTML   = require('gulp-minify-html'),
    minifyInline = require('gulp-minify-inline'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    concat       = require('gulp-concat'),
    eslint       = require('gulp-eslint'),
    plumber      = require('gulp-plumber'),
    cssshrink    = require('gulp-cssshrink'),
    changed      = require('gulp-changed'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    size         = require('gulp-size'),
    notify       = require('gulp-notify'),
    critical 	   = require('critical').stream;


/**
*
* A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.
* - Manually enter gulp lint to call eslint
*
**/
gulp.task('jslint', function(){
  return gulp.src('src/js/*.js').pipe(eslint()).pipe(eslint.format());
});


/**
*
* Compile Sass to CSS
* - Compile
* - Compress/Minify
* - Autoprefixer
* - Sourcemaps
*
**/
gulp.task('compileSass', function() {
  var onError = function(err) {
      notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Beep"
      })(err);
      this.emit('end');
  };

  return gulp.src('./src/sass/style.scss')
    // Initialize css.map
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass())
    .pipe(size({ gzip: true, showFiles: true }))
    // Initialize autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // Directory of compiled Sass
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    // Minify compiled CSS
    .pipe(minifycss({ processImport: false }))
    .pipe(cssshrink())
    // Use this-> ('./') if you want to add css.map in the same folder as compiled CSS, otherwise write folder name
    .pipe(sourcemaps.write('./maps'))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}));
});

/**
*
* Generate & Inline Critical-path CSS
*
**/
gulp.task('critical', ['run'], function () {
    return gulp.src('public/*.html')
        .pipe(critical({base: './public', inline: true, css: ['public/css/style.css']}))
        .pipe(gulp.dest('public/'));
});

/**
*
* Minify and concat scripts
* - Sourcemaps
* - Concat
* - Uglify
*
**/
gulp.task('minifyConcatScripts', function() {
  return gulp.src(['./src/javascripts/**'])
    // Initialize source maps for Javascript
    .pipe(sourcemaps.init())
    .pipe(plumber())
    // Name and location of the compiled file
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(size({ gzip: true, showFiles: true }))
    // Path for maps. This in brackets (./) means it will stay in same location
    // If you wish to add maps in one directory up we can use this: '../maps'
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({stream:true}));
});

/**
*
* Images
* - Compress them!
*
**/
gulp.task('imgOptimize', function () {
  return gulp.src('src/images/**')
    .pipe(changed('public/images'))
    .pipe(imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/images'))
    .pipe(size({title: 'imgOptimize'}));
});

/**
*
* Compress and minify HTML
* - Shrink HTML file size!
*
**/
gulp.task('compressHtml', function() {
  return gulp.src('./src/*.html')
    .pipe(minifyInline())
    .pipe(minifyHTML())
    .pipe(gulp.dest('public/'));
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
* - Serving content from /public/ folder
*
**/
gulp.task('run', ['compileSass', 'minifyConcatScripts'], function() {
  browserSync({
    server: {
      baseDir: "./public/",
      injectChanges: true
    }
  });
});

/**
*
* Use gulp clean if you want to manually remove compiled files and folders
*
**/
gulp.task('clean', function() {
  del(['public']);
});

/**
*
* Watch for file changes for html, images, scripts and sass/css
*
**/
gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('src/**/*.html', ['compressHtml', browserSync.reload]);
  gulp.watch("public/*.html").on('change', browserSync.reload);
  // Watch .sass files
  gulp.watch('src/sass/**/*.scss', ['compileSass', browserSync.reload]);
  // Watch .js files
  gulp.watch('src/js/*.js', ['minifyConcatScripts', 'jslint', browserSync.reload]);
  // Watch image files
  gulp.watch('src/images/**/*', ['imgOptimize', browserSync.reload]);
});

/**
*
* Default task
* - Clean previous build and create new on every gulp call
* - Runs compileSass, browserSync, minifyConcatScripts and imgOptimize tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/
gulp.task('default', function() {
    gulp.start('clean', 'compileSass', 'minifyConcatScripts', 'imgOptimize', 'compressHtml', 'jslint', 'run', 'watch');
});