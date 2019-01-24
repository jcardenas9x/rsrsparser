import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { SkillInfo } from '../datablocks';

const ATTACK_ATTTRIBUTES = 1;
const CRITICAL_TARGETS = 2;
const KAKUSEI_MATERIALS = 3;

export const textReadSkill = (file) => {
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', (error) => {
        console.log(error);
    });

    const reader = readline.createInterface({
        input: fileStream
    });

    let parsed = false;
    let inVector = false;
    let result = 0;
    let line_no = 0;
    let fileListIndex = 0;
    let vectorMarker = 0;
    let vectorIndex = 0;
    let vectorTotal = 0;
    let SkillInfoList = [];

    reader.on('line', (line) => {
        ++line_no;
        if (line_no >= 11) {
            if (line_no === 11) {
                let decomposedArray = line.split('=');
                if (
                    decomposedArray.length !== 2 ||
                    !(decomposedArray[0].trim() == "int size") ||
                    isNaN(parseInt(decomposedArray[1].trim()))
                ) {
                    return parsed;
                }
                result = parseInt(decomposedArray[1].trim());
                for (let size = 0; size < result; size++) 
                    SkillInfoList[size] = new SkillInfo(); 
            } else {
                if (SkillInfoList.length === 0) {
                    return parsed;
                } else if (
                    !(line.trim() === "[" + fileListIndex.toString() + "]") ||
                    inVector
                ) {
                    let dataString = line.split('=');
                    if (
                        dataString.length === 2
                    ) {
                        let key = dataString[0].trim();
                        let value = dataString[1].trim();
                        switch (key) {
                            case "int id": 
                                SkillInfoList[fileListIndex].id = parseInt(value); break;
                            case "string name": SkillInfoList[fileListIndex].name = value.replace(/"/g, ''); break;
                            case "string flavor_text": SkillInfoList[fileListIndex].flavorText = value.replace(/"/g, ''); break;
                            case "int size": 
                                if (inVector) vectorTotal = parseInt(value); 
                                break;
                            case "int data":
                                if (inVector && vectorTotal > 0) {
                                    switch (vectorMarker) {
                                        case ATTACK_ATTTRIBUTES:
                                            SkillInfoList[fileListIndex].attackAttributes.push(parseInt(value)); break;
                                        case CRITICAL_TARGETS:
                                            SkillInfoList[fileListIndex].criticalTargets.push(parseInt(value)); break;
                                        case KAKUSEI_MATERIALS:
                                            SkillInfoList[fileListIndex].kakuseiMaterialSetIds.push(parseInt(value)); break;
                                    }
                                    if (vectorIndex + 1 === vectorTotal) {
                                        vectorIndex = 0;
                                        vectorTotal = 0;
                                        inVector = false;
                                    }
                                }
                                break;
                            case "string power_grade": SkillInfoList[fileListIndex].powerGrade = value.replace(/"/g, ''); break;
                            case "int consume_bp": SkillInfoList[fileListIndex].bp = parseInt(value); break;
                            case "int consume_lp": SkillInfoList[fileListIndex].lp = parseInt(value); break;
                            case "int max_kakusei_count": SkillInfoList[fileListIndex].kakuseiCount = parseInt(value); break;
                            case "string skill_se_cue_sheet_name": 
                                fileListIndex++;
                                break;
                            default: 
                                console.log("Discarding string "+key+" at ability index: "+fileListIndex);
                        }
                    } 
                    /**
                     * Parse in order:
                     * 1. Attack attributes
                     * 2. Critical targets
                     * 3. Awakening materials
                     */
                    else if (
                        line.trim() === 'vector attack_attributes'
                    ) {
                        inVector = true;
                        vectorMarker = ATTACK_ATTTRIBUTES;
                        SkillInfoList[fileListIndex].attackAttributes = [];
                    } else if (
                        line.trim() === 'vector critical_targets'
                    ) {
                        inVector = true;
                        vectorMarker = CRITICAL_TARGETS;
                        SkillInfoList[fileListIndex].criticalTargets = [];
                    } else if (
                        line.trim() === 'vector kakusei_material_set_ids'
                    ) {
                        inVector = true;
                        vectorMarker = KAKUSEI_MATERIALS;
                        SkillInfoList[fileListIndex].kakuseiMaterialSetIds = [];
                    }
                }
            }
        } 
    });

    reader.on('close', () => {
        if (SkillInfoList.length > 0) {
            console.log("Status of SkillInfoList Array: ", SkillInfoList.length);
            console.log("===> Writing to skill.json");
            const jsonData = JSON.stringify(SkillInfoList, null, 2);
            fs.writeFile(path.resolve('./output/skill.json'), jsonData, (err) => {
                if (err) throw err;
                console.log("<=== skill.json successfully dumped");
            })
        } else {
            console.log("[skill.json] ==X Parse failure due to invalid or missing asset file");
        }
    });
}
