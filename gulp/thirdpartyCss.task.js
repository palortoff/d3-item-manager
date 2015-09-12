'use strict';

var config = require('./config.json');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');

function task() {
    gulp.src(config.thirdParty.css)
        .pipe(sourceMaps.init())
        .pipe(concat('thirdParty.css'))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/css'))
}

module.exports = task;