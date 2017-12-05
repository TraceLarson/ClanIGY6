const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');

gulp.task('default', () => {
	gulp.src('./js/indexES6.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('./js/index.js'))
});

gulp.task('scss', () =>{
	let processors = [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	];
	return gulp.src('./scss/*.scss')
		.pipe(sass())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browser-sync', () =>{
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
});

gulp.task('watch',['browser-sync', 'scss'], () => {
	gulp.watch('./scss/*.scss', ['scss']);
	gulp.watch('./scss/**/*.scss', ['scss']);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('./js/*.js').on('change', browserSync.reload);
});



//-----------------------------------------------------
//npm init                                            |
//npm install --global gulp-cli                       |
//npm install --save-dev gulp                         |
//touch gulpfile.js                                   |
//npm install gulp-sass --save-dev                    |
//npm install browser-sync --save-dev                 |
//npm install gulp-postcss                            |
//npm install autoprefixer                            |
//npm install --save-dev gulp-babel babel-preset-env  |
//-----------------------------------------------------