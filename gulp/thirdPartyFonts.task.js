'use strict';

var gulp = require('gulp');
var config = require('./config.json');

function task() {
    return gulp.src(config.thirdParty.fonts)
        .pipe(gulp.dest(config.buildTarget + '/fonts'));
}

module.exports = task;