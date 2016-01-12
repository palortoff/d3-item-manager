'use strict';

var config = require('./config.json');

var connect = require('gulp-connect');
var gulpWatch = require('gulp-watch');

function task(done) {
    connect.server({
        root: config.buildTarget,
        port: config.port,
        livereload: true
    });

    gulpWatch([config.buildTarget + '/**/*']).pipe(connect.reload());

    done();
}

module.exports = task;