'use strict';

let saveItemToFile = require('./saveItemToFile');
let config = require('../config/config.json');

module.exports = saveItemsToFileThrottled;

function saveItemsToFileThrottled(source){
    let controlledSource = source.controlled();

    controlledSource.subscribe(saveItemToFile);

    let interval = setInterval(() => controlledSource.request(1), 1000 / config.itemsPerSecond);

    controlledSource.subscribeOnCompleted(() => clearInterval(interval));
}