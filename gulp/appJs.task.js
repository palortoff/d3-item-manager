'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

function task() {
    return gulp.src(config.app.js)
        .pipe(sourceMaps.init())
        .pipe(babel())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/js'));
}

module.exports = task;