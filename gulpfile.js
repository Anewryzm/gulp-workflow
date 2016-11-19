var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function(){
  // Get all files ending with .scss
  // in app/scss and children dirs
  return gulp.src('app/scss/**/*.scss')
  // Check for errors all plugins
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})

function errorHandler(err){
  console.log(err.toString());
  this.emit('end');
}

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})

