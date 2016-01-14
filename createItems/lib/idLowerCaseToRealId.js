'use strict';

let _ = require('lodash');

module.exports = idLowerCaseToRealId;

function idLowerCaseToRealId(string) {
    if (string.match(/Unique_Xbow_101_x1/i)) {return ('Unique_Xbow_101_x1');}
    if (string.match(/Unique_Xbow_102_x1/i)) {return ('Unique_Xbow_102_x1');}
    if (string.match(/p2_Unique_Ring_Wizard_001/i)) {return ('p2_Unique_Ring_Wizard_001');}
    if (string.match(/P2_handXbow_norm_unique_03/i)) {return ('P2_handXbow_norm_unique_03');}
    if (string.match(/P1_fistWeapon_norm_unique_01/i)) {return ('P1_fistWeapon_norm_unique_01');}
    if (string.match(/P1_fistWeapon_norm_unique_02/i)) {return ('P1_fistWeapon_norm_unique_02');}
    if (string.match(/P4_fistWeapon_norm_unique_02/i)) {return ('P4_fistWeapon_norm_unique_02');}
    if (string.match(/P2_mojo_norm_unique_02/i)) {return ('P2_mojo_norm_unique_02');}
    if (string.match(/P1_flail1H_norm_unique_01/i)) {return ('P1_flail1H_norm_unique_01');}
    if (string.match(/P4_flail2h_norm_unique_01/i)) {return ('P4_flail2H_norm_unique_01');}

    let matches = string.match(/^HandXBow_(\d+)$/im);
    if (matches) {
        return `HandXbow_${matches[1]}`;
    }

    matches = string.match(/^amulet(\d+)$/im);
    if (matches) {
        return `Amulet${matches[1]}`;
    }

    var tokens = string.split('_');

    var pn = tokens[0].match(/^p(\d)$/m);
    if (pn != null) {
        tokens[0] = 'P' + pn[1];
    }

    tokens = _.map(tokens, function(token) {
        if (token === 'xbow') {return 'XBow';}
        if (token === 'wizardhat') {return 'WizardHat';}
        if (token === 'voodoomask') {return 'VoodooMask';}
        if (token === 'spiritstone') {return 'SpiritStone';}
        if (token === 'handxbow') {return 'HandXBow';}
        if (token === 'combatstaff') {return 'CombatStaff';}
        if (token === 'chestarmor') {return 'ChestArmor';}
        if (token === 'ceremonialdagger') {return 'CeremonialDagger';}
        if (token === 'barbbelt') {return 'BarbBelt';}
        if (token === 'crushield') {return 'CruShield';}
        if (token === 'followeritem') {return 'FollowerItem';}
        if (token === 'fistweapon') {return 'FistWeapon';}
        if (token === 'mightyweapon1h') {return 'MightyWeapon1H';}
        if (token === 'mightyweapon2h') {return 'MightyWeapon2H';}
        if (token === 'staffofcow') {return 'StaffOfCow';}
        if (token === 'crusadershield') {return 'CrusaderShield';}
        if (/^[a-z]+$/m.test(token)) {
            return capitalizeFirstLetter(token);
        }
        var xHanded = token.match(/^(\d)h$/m);
        if (xHanded != null) {
            return xHanded[1] + 'H';
        }

        return token;
    });
    var joined = tokens.join('_');

    matches = joined.match(/^(.*)_norm_unique_(.*)$/im);
    if (matches) {
        return `${matches[1]}_norm_unique_${matches[2]}`;
    }

    return joined;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
