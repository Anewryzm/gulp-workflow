var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

gulp.task('sass', function(){
  // Get all files ending with .scss
  // in app/scss and children dirs
  return gulp.src('app/scss/**/*.scss')
  // Check for errors all plugins
    .pipe(customPlumber('Error Running Sass'))
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    // Tells Browser Sync to reload files task is done
    .pipe(browserSync.reload({
      stream: true
    }))
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

gulp.task('watch', ['browserSync','sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
})

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
})