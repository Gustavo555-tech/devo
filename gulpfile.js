const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

// Compile Sass
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

// Concatenate and Minify JS
gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

// Watch for changes
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
});

// Default task
gulp.task('default', gulp.series('sass', 'scripts', 'images', 'watch'));
