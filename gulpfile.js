var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('sass', function(){
  // Get all files ending with .scss
  // in app/scss and children dirs
  return gulp.src('app/scss/**/*.scss')
  // Check for errors all plugins
    .pipe(customPlumber('Error Running Sass'))
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})

function errorHandler(err){
  console.log(err.toString());
  this.emit('end');
}

function customPlumber(errTitle){
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
    })
  });
}

gulp.task('watch', ['sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})

