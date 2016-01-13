'use strict';

let rx = require('rx');
let itemTypes = require('./itemTypes');
let idsForType = require('./idsForType');
let idLowerCaseToRealId = require('./idLowerCaseToRealId');
let _ = require('lodash');
let q = require('q');

module.exports = allItemIds;

let loadFromTmpFile = true;

function allItemIds() {
    let source =loadFromTmpFile ?
                allItemsFromTempFile() :
                allItemsFromWeb();

    return source
        .map((itemIds)=> {itemIds.push('Unique_CeremonialDagger_003_x1'); return itemIds;})
        .map((itemIds)=>_.unique(itemIds))
        .flatMap((itemIds) => rx.Observable.fromArray(itemIds))
        .map(idLowerCaseToRealId);
}

function allItemsFromTempFile(){
    console.log('fetching all items from temp file...');
    return rx.Observable.fromPromise(q.when(require('../temp/allIds.json')));
}

function allItemsFromWeb(){
    console.log('fetching all items from web...');
    return rx.Observable.fromPromise(itemTypes())
        .flatMap((itemTypes) => rx.Observable.fromArray(itemTypes))
        .flatMap((itemType) => rx.Observable.fromPromise(idsForType(itemType)));
}