var gulp     = require('gulp');
var nodemon  = require('gulp-nodemon');
var jshint   = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha    = require('gulp-mocha');

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint());
});
 
gulp.task('develop', function () {
  nodemon({ script: 'app.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('test', function (cb) {
  gulp.src(['lib/**/*.js', 'app.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('default', ['develop']);