'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');

function task() {
    gulp.src(config.thirdParty.js)
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(concat('thirdParty.js'))
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest(config.buildTarget + '/js'))
}

module.exports = task;