export default class SkillInfo {
    constructor (
        id, name, flavorText,
        attackAttributes, criticalTargets, powerGrade,
        bp, lp, kakuseiCount, kakuseiMaterialSetIds
    ) {
        this.id = id;
        this.name = name;
        this.flavorText = flavorText;
        this.attackAttributes = attackAttributes;
        this.criticalTargets = criticalTargets;
        this.powerGrade = powerGrade;
        this.bp = bp;
        this.lp = lp;
        this.kakuseiCount = kakuseiCount;
        this.kakuseiMaterialSetIds = kakuseiMaterialSetIds;
    }
}
