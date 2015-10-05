'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

function task() {
    return gulp.src(config.thirdParty.js)
        .pipe(sourceMaps.init())
        .pipe(concat('thirdParty.js'))
        .pipe(sourceMaps.write('./'))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/js'));
}

module.exports = task;