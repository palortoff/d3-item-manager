'use strict';

let qfs = require('q-io/fs');
let rx = require('rx');

module.exports = checkItemFileAvailability;

function checkItemFileAvailability(item) {
    let promise = qfs.exists(item.filePath)
        .then((exists) => item.fileExists = exists)
        .then(() => item);

    return rx.Observable.fromPromise(promise);
}