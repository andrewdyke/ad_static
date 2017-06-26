{
	'use strict'

	let gulp 					= require('gulp'),
			browserSync 	= require('browser-sync').create();
			autoprefixer 	= require('gulp-autoprefixer'),
			concat 				= require('gulp-concat'),
			imageMin 			= require('gulp-imagemin'),
			notify 				= require('gulp-notify'),
			plumber 			= require('gulp-plumber'),
			sass 					= require('gulp-sass'),
			sourcemaps 		= require('gulp-sourcemaps'),
			uglify 				= require('gulp-uglify'),
			cssnano				= require('gulp-cssnano'),
			babel 				= require('gulp-babel'),
			clean 				= require('gulp-clean')

	// Clean Build Folder
	gulp.task('clean', () => {
		return gulp.src('./build', {read: false})
		  .pipe(clean())
	})

	// BrowserSync Server
	gulp.task('bs', () => {
		browserSync.init({
			notify: false,
			// Uncomment this if you want to use a different server
			// proxy: 'http://182.0.0.1:8080/',
			server: {
	      baseDir: './build'
	  	}
		})
	})

	// MARKUP
	gulp.task('markup', function buildHTML() {
	  return gulp.src('./source/markup/*.html')
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.reload({stream:true}))
	})

	// STYLES
	gulp.task('styles', () => {
		return gulp.src('./source/styles/main.scss')
			.pipe(plumber({
			  errorHandler: notify.onError("Error: <%= error.message %>")
			}))
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
			.pipe(cssnano())
			.pipe(concat('./main.min.css'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build'))
			.pipe(browserSync.reload({ stream: true }))
	})

	// SCRIPTS
	gulp.task('scripts', () => {
		return gulp.src('./source/scripts/**/*.js')
			.pipe(plumber({
			  errorHandler: notify.onError("Error: <%= error.message %>")
			}))
			.pipe(sourcemaps.init())
			.pipe(babel({
					presets: ['es2015']
			}))
			.pipe(uglify())
			.pipe(concat('./app.min.js'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build'))
			.pipe(browserSync.reload({stream:true}))
	})

	// Image processing
	gulp.task('images', () => {
		return gulp.src('./source/assets/images/*')
			.pipe(imageMin())
			.pipe(gulp.dest('./build/images/'))
	})

	// Watching Files for changes and reloading
	gulp.task('watch', () => {
		gulp.watch('./source/styles/**/*.scss', ['styles'])
		gulp.watch('./source/scripts/**/*.js', ['scripts'])
		gulp.watch('./source/markup/**/*.html', ['markup'], browserSync.reload)
	})

	// Setting a default task to run all processes
	gulp.task('default', ['markup' , 'styles', 'scripts', 'images', 'bs', 'watch'])
}
