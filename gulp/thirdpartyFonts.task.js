'use strict';

var config = require('./config.json');
var gulp = require('gulp');

function task() {
    gulp.src(config.thirdParty.fonts)
        .pipe(gulp.dest(config.buildTarget + '/fonts'));
}

module.exports = task;