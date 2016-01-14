'use strict';

module.exports = getPassive;

function getPassive(item) {
    let passive = item.data.attributes.passive.length ? item.data.attributes.passive[0].text : undefined;

    if (item.blizzId === 'Unique_Helm_002_p1' ||
        item.blizzId === 'Unique_Ring_107_x1') {
        passive = passive || item.data.attributes.secondary.length ? item.data.attributes.secondary[0].text : undefined;
    }

    if (passive) {passive = passive.replace(/’/mg, "'");}
    return passive;
}