'use strict';

// TODO: karma
// TODO: eslint
// TODO: test = parallel(eslint, karma)

// TODO: remove jshint package
// TODO: update package.json (script test)


var gulp = require("gulp");

gulp.task('clean', require('./gulp/clean.task'));

gulp.task('app:html', require('./gulp/appHtml.task'));
gulp.task('app:js', require('./gulp/appJs.task'));
gulp.task('app:less', require('./gulp/appLess.task'));
gulp.task('app:json', require('./gulp/appJson.task'));
gulp.task('app:version', require('./gulp/appVersion.task'));
gulp.task('app:images', require('./gulp/appImages.task'));

gulp.task('thirdparty:js', require('./gulp/thirdPartyJs.task'));
gulp.task('thirdparty:less', require('./gulp/thirdPartyLess.task'));
gulp.task('thirdparty:fonts', require('./gulp/thirdPartyFonts.task'));

gulp.task('startServer', require('./gulp/serve.task'));
gulp.task('startChrome', require('./gulp/chrome.task'));
gulp.task('_watch', require('./gulp/watch.task'));
gulp.task('eslint', require('./gulp/eslint.task'));

gulp.task('app', gulp.parallel('app:html', 'app:js', 'app:less', 'app:json', 'app:version', 'app:images'));
gulp.task('thirdparty', gulp.parallel('thirdparty:js', 'thirdparty:less', 'thirdparty:fonts'));
gulp.task('build', gulp.parallel('app', 'thirdparty'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('serve', gulp.series('default', 'startServer'));
gulp.task('chrome', gulp.series('serve', 'startChrome'));


gulp.task('watch', gulp.series('chrome', '_watch'));
