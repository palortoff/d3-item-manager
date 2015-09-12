'use strict';

var config = require('./config.json');

var connect = require('gulp-connect');
var gulp_watch = require('gulp-watch');

function task(done) {
    connect.server({
        root: config.buildTarget,
        port: config.port,
        livereload: true
    });

    gulp_watch([config.buildTarget + '/**/*']).pipe(connect.reload());

    done();
}

module.exports = task;