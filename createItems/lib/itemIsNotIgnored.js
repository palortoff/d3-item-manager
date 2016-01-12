'use strict';

let ignoredItems = require('../config/ignoredItems.json');
let _ = require('lodash');

module.exports = itemIsNotIgnored;

function itemIsNotIgnored(item) {
    if (_.contains(ignoredItems, item.blizzId)) {
        return false;
    }
    if (!_.isUndefined(item.data)) {
        switch (item.data.displayColor) {
            case 'white':
            case 'blue':
                return false;
            case 'orange':
            case 'green':
                return true;
            default:
                console.warn(`unknown item color: ${item.data.displayColor}`);
                return true;
        }
    }

    return true;

}