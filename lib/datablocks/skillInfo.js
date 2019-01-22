'use strict';

export class skillInfo {
    constructor (
        id, name, flavorText,
        attackAttributes, powerGrade,
        bp, lp, kakuseiCount
    ) {
        this.id = id;
        this.name = name;
        this.flavorText = flavorText;
        this.attackAttributes = attackAttributes
        this.powerGrade = powerGrade;
        this.bp = bp;
        this.lp = lp;
        this.kakuseiCount = kakuseiCount;
    }
}