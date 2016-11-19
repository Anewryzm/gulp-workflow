var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function(){
  // Get all files ending with .scss
  // in app/scss and children dirs
  return gulp.src('app/scss/**/*.scss')
  // Check for errors all plugins
    .pipe(customPlumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
})

function errorHandler(err){
  console.log(err.toString());
  this.emit('end');
}

function customPlumber(){
  return plumber({
    errorHandler: function(err){
      // Logs error in console
      console.log(err.stack);
      // Ends the current pipe, so Gulp watch doesn't break
      this.emit('end');
    }
  });
}

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})

