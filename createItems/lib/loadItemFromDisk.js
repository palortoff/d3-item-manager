'use strict';

let rx = require('rx');
let qfs = require('q-io/fs');

module.exports = loadItemFromDisk;

function loadItemFromDisk(item) {
    let promise = qfs.read(item.filePath)
        .then((data) => item.data = JSON.parse(data))
        .catch((error)=>console.error(`failed to load item ${item.blizzId} from ${item.filePath}: ${error.message}`))
        .then(()=>item);

    return rx.Observable.fromPromise(promise);
}