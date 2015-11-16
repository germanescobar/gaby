var gulp = require('gulp')
    connect = require('gulp-connect')
    sass = require('gulp-ruby-sass')
    browserify = require('browserify')
    source = require('vinyl-source-stream');

gulp.task('webserver', ['browserify', 'views', 'images', 'audio', 'sass'], function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('views', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('dist/'));

  gulp.src('./app/views/*.html')
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('images', function() {
  gulp.src('./app/images/*')
    .pipe(gulp.dest('dist/images/'));

  gulp.src('./app/images/stickers/*')
    .pipe(gulp.dest('dist/images/stickers/'));

  gulp.src('./node_modules/bootstrap-sass/assets/fonts/**/*')
    .pipe(gulp.dest('dist/css/fonts/'));
});

gulp.task('audio', function() {
  gulp.src('./app/audio/*')
    .pipe(gulp.dest('dist/audio/'));
});

gulp.task('sass', function () {
  return sass('./app/sass/style.scss', {
    loadPath: ['./node_modules/bootstrap-sass/assets/stylesheets/']
  }).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('browserify', function() {
  return browserify('./app/js/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
})

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['views']);
  gulp.watch(['./app/views/*.html'], ['views']);
  gulp.watch(['./app/js/*.js'], ['browserify']);
  gulp.watch(['./app/sass/*.scss'], ['sass']);
  gulp.watch(['./app/images/**/*'], ['images']);
  gulp.watch(['./app/audio/*'], ['audio']);
});
 
gulp.task('default', ['webserver', 'watch']);