'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('./config.json');

function task() {
    return gulp.src(config.app.eslint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

module.exports = task;