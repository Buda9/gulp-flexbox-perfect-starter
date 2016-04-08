'use strict';

var     gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
  minifyHTML = require('gulp-minify-html'),
minifyInline = require('gulp-minify-inline'),
  sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
	  eslint = require('gulp-eslint'),
      useref = require('gulp-useref'),
         iff = require('gulp-if'),
        csso = require('gulp-csso'),
         del = require('del'),
	 jasmine = require('gulp-jasmine-phantom'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	   gutil = require('gulp-util');

var paths = {
  src: './src',
  public: './public'
};

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// ***************************************
// Browser-Sync Tasks
// ***************************************
gulp.task('run', ['watchFiles'], function(){
	browserSync.init({
		server: 'public/'
	});
	browserSync.stream();
});


// ***************************************
// Lint / TBD
// ***************************************
gulp.task('lint', function(){
	return gulp.src('src/js/*.js').pipe(eslint()).pipe(eslint.format());
});


// ***************************************
// Tests / TBD
// ***************************************
gulp.task('tests', function(){
	gulp.src('src/js/*.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});


// ***************************************
// Merge all scripts into one script
// ***************************************
gulp.task('concatScripts', function() {
	return gulp.src('src/js/*.js')
	// Initialize source maps for Javascript
	.pipe(sourcemaps.init())
	// Name and location of the compiled file
	.pipe(concat('app.js'))
	// Path for maps. This in brackets (./) means it will stay in same location
	// If you wish to add maps in one directory up we can use this: '../maps'
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('public/js'))
});


// ***************************************
// Here we're using gulp uglify to minify script + gulp rename which is used to rename the file
// ***************************************
gulp.task('minifyScripts', ['concatScripts'], function(){
  return gulp.src('src/js/*.js')
    .pipe(uglify().on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'SASS ERROR:' +
        '\n*********************************** \n\n'
        ))))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'));
});


// ***************************************
// Gulp Sass package + gulp autoprefixer package + gulp Sass sourcemaps package
// ***************************************
gulp.task('compileSass', function() {
  return gulp.src(paths.src + "/scss/style.scss")
		// Initialize css.map
		.pipe(sourcemaps.init())
		// Initialize Sass
		.pipe(sass({outputStyle: 'compressed'}).on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'SASS ERROR:' +
        '\n*********************************** \n\n'
        ))))
		// Initialize autoprefixer
		.pipe(autoprefixer({
			browsers: ['last 4 versions']
		}))
		// When this-> ('./') is used it means that we want to insert css.map in the same folder as compiled CSS
		.pipe(sourcemaps.write('./maps'))
		// Directory of compiled Sass
		.pipe(gulp.dest(paths.src + '/../public/css'))
		.pipe(browserSync.reload({stream:true}));
});


// ***************************************
// Minify and inline HTML compiled file
// ***************************************
gulp.task('compressHtml', function() {
	return gulp.src('src/*.html')
	.pipe(minifyInline())
	.pipe(minifyHTML())
	.pipe(gulp.dest('public/'))
	.pipe(reload({stream:true}));
});


// ***************************************
// Watch method for live coding and live compiling of Scss and Javascript
// ***************************************
gulp.task('watchFiles', function(){
	gulp.watch(paths.src + '/src/scss/**/*.scss', ['compileSass']);
	gulp.watch('src/js/**', ['concatScripts']);
	gulp.watch(['src/js/**'], ['eslint']);
})


// ***************************************
// command $ gulp clean
// Use if you wish to manually remove compiled files and folders
// ***************************************
gulp.task('clean', function() {
  del(['public/css','public/js']);
});


// ***************************************
// command $ gulp serve
// When this command is used it will automatically compile Scss and Javascript files
// ***************************************
gulp.task('serve', ['watchFiles']);


// ***************************************
// command $ gulp build
// This build task will compile all files into new /public folder. {base: means that the files will keep their starting directory, e.g. styles/main.css will be in styles folder}
// ***************************************
gulp.task("build", ['html'], function() {
  return gulp.src([paths.src + '/js/*.js', paths.src + '/index.html', paths.src + "/img/**", paths.src + "/fonts/**"], { base: paths.src})
            .pipe(gulp.dest(paths.public));
});


// ***************************************
// command $ gulp html
// Gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->", located in HTML file
// ***************************************
gulp.task('html', ['compileSass', 'minifyScripts', 'compressHtml'], function() {
	gulp.src(paths.src + '/index.html')
		.pipe(iff('*.js', uglify()))
		// gulp-csso is being used for CSS optimization
		.pipe(iff('*.css', csso()))
		.pipe(useref())
		.pipe(gulp.dest(paths.public));
});


// ***************************************
// Lossless image optimizer
// ***************************************
gulp.task('optimize', function(){
	return gulp.src('src/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/img'));
});


// ***************************************
// command $ gulp
// It will call clean task that will remove previously compiled files before creating new ones
// ***************************************
gulp.task('default', ['clean'], function(){
	// Warning! gulp.series will replace gulp.start in gulp v4
	gulp.start('build');
})