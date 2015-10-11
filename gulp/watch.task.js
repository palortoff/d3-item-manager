'use strict';

var watch = require('gulp-watch');
var batch = require('gulp-batch');
var gutil = require('gulp-util');

var config = require('./config.json');

module.exports = task;

function task() {
    watchAndRun(config.app.js, require('./appJs.task'), 'updating app:js');
    watchAndRun(config.app.json, require('./appJson.task'), 'updating app:json');
    watchAndRun(config.app.html, require('./appHtml.task'), 'updating app:html');
    watchAndRun(config.app.less, require('./appLess.task'), 'updating app:less');
    watchAndRun(config.thirdParty.less, require('./thirdPartyLess.task'), 'updating thirdparty:less');
}

function watchAndRun(glob, task, message) {
    watch(glob, batch(runTask.bind(null, task, message), handleError.bind(null, message)));
}

function runTask(task, message, events, done){
    logStart(message);
    task()
        .on('end', logFinish.bind(null, message))
        .on('end', done);
}

function logStart(message){
    gutil.log('Starting', gutil.colors.cyan(message));
}
function logFinish(message){
    gutil.log('Finished', gutil.colors.cyan(message));
}

function handleError(message, e) {
    gutil.beep();
    gutil.log(gutil.colors.cyan(message), gutil.colors.red('failed:'), gutil.colors.bold.red(e.message));
}