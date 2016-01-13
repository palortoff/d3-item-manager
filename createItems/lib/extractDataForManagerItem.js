'use strict';

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

function getPassive(item) {
    let passive = item.data.attributes.passive.length ? item.data.attributes.passive[0].text : undefined;

    if (item.blizzId === 'Unique_Helm_002_p1' ||
        item.blizzId === 'Unique_Ring_107_x1') {
        passive = passive || item.data.attributes.secondary.length ? item.data.attributes.secondary[0].text : undefined;
    }

    if (passive) {passive = passive.replace(/’/mg, "'");}
    return passive;
}