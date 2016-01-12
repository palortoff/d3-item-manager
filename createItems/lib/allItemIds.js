'use strict';

let rx = require('rx');
let itemTypes = require('./itemTypes');
let idsForType = require('./idsForType');
let idLowerCaseToRealId = require('./idLowerCaseToRealId');

module.exports = allItemIds;

function allItemIds() {
    let source =
            rx.Observable.fromPromise(itemTypes())
                .flatMap((itemTypes) => rx.Observable.fromArray(itemTypes))
                .flatMap((itemType) => rx.Observable.fromPromise(idsForType(itemType)))
                .flatMap((itemIds) => rx.Observable.fromArray(itemIds));

    return source
        .map(idLowerCaseToRealId);
}