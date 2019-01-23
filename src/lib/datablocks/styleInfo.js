'use strict';

export default class styleInfo {
    constructor (
        strCast, conCast, dexCast, spdCast,
        intCast, sprCast, loveCast, chaCast,
        id, name, altName, rarity, weaponType,
        lp, jutsuList, role, skillRefs, bonusId,
        slashRes, bashRes, pierceRes, heatRes,
        coldRes, elecRes, sunRes, shadowRes, charId
    ) {
        /**
         * Stats:
         * [0] - min
         * [1] - max
         * [2] - promote
         */
        this.strCast = strCast;
        this.conCast = conCast;
        this.dexCast = dexCast;
        this.spdCast = spdCast;
        this.intCast = intCast;
        this.sprCast = sprCast;
        this.loveCast = loveCast;
        this.chaCast = chaCast;
        /**
         * Style info
         */
        this.id = id;
        this.name = name;
        this.altName = altName;
        this.rarity = rarity;
        this.weaponType = weaponType;
        this.lp = lp;
        this.jutsuList = jutsuList // Array[3]
        this.role = role;
        this.skillRefs = skillRefs; // Array[3]
        this.bonusId = bonusId;
        /**
         * Resistances
         */
        this.slashRes = slashRes;
        this.bashRes = bashRes;
        this.pierceRes = pierceRes;
        this.heatRes = heatRes;
        this.coldRes = coldRes;
        this.elecRes = elecRes;
        this.sunRes = sunRes;
        this.shadowRes = shadowRes;
        this.charId = charId; // Owner of style
    }
}
