'use strict';

var gulp = require("gulp");

gulp.task('clean', require('./gulp/clean.task'));

gulp.task('app:html', require('./gulp/appHtml.task'));
gulp.task('app:js', require('./gulp/appJs.task'));
gulp.task('app:less', require('./gulp/appLess.task'));
gulp.task('app:json', require('./gulp/appJson.task'));
gulp.task('app:version', require('./gulp/appVersion.task'));

gulp.task('app', ['app:html', 'app:js', 'app:less', 'app:json', 'app:version']);

gulp.task('default', ['clean', 'app']);

gulp.task('serve', ['default'], require('./gulp/serve.task'));
gulp.task('chrome', ['serve'], require('./gulp/chrome.task'));

gulp.task('watch', ['chrome'], require('./gulp/watch.task'));
