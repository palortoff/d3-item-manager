'use strict';

let getPassive = require('./getPassive');

module.exports = extractDataForManagerItem;

function extractDataForManagerItem(item) {
    let manItem = item.managerItem;
    let data = item.data;

    manItem.name = data.name.replace(/’/mg, "'");

    manItem.type = data.type;
    manItem.season = data.seasonRequiredToDrop;
    manItem.crafted = !!data.craftedBy.length;
    manItem.setItem = !!data.set;
    manItem.tooltipParams = data.tooltipParams;
    manItem.displayColor = data.displayColor;
    manItem.requiredLevel = data.requiredLevel;
    manItem.slots = data.slots;

    manItem.passive = getPassive(item);

    return item;
}

