'use strict';

let managerItems = require('../config/additionalInfo.json');
let _ = require('lodash');

module.exports = addBasicManagerItem;

let lastId = _.chain(managerItems)
    .map((item)=>Number(item.id))
    .reduce((max, id) => Math.max(max, id))
    .value();

function addBasicManagerItem(apiItem) {
    apiItem.managerItem = _.chain(managerItems)
        .filter((managerItem) => managerItem.blizId === apiItem.blizzId)
        .first()
        .value();

    if (_.isUndefined(apiItem.managerItem.id)) {
        let nextId = lastId + 1;
        console.error(`No previous data found for ${apiItem.blizzId}. Using id ${nextId}`);
        apiItem.managerItem = {
            id: nextId,
            blizId: apiItem.blizzId
        };
        lastId = nextId;
    }

    return apiItem;
}