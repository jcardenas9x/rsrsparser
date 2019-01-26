'use strict';

export default class CharacterInfo {
    constructor (
        id, name, str, con, dex,
        spd, int, spr, love, cha
    ) {
        this.objId = id;
        this.name = name;
        this.str = str;
        this.con = con;
        this.dex = dex;
        this.spd = spd;
        this.int = int;
        this.spr = spr;
        this.love = love;
        this.cha = cha;
    }
}
