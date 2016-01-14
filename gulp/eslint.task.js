'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('./config.json');
var formatter = require('eslint-format-with-full-path')('stylish');

function task() {
    return gulp.src(config.app.eslint)
        .pipe(eslint())
        .pipe(eslint.format(formatter))
        .pipe(eslint.failAfterError());
}

module.exports = task;