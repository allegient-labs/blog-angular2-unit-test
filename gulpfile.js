var gulp = require('gulp');

// Include Our Plugins
var Server = require('karma').Server;
var del = require('del');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean', function () {
  return del([
    // clean all js files in app folder
    'app/**/*.js'
  ]);
});