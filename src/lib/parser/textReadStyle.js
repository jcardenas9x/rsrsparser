import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { StyleInfo } from '../datablocks';
import { Typevars } from '../consts';

const JUTSUS = 1;
const WAZA = 2;

export const textReadStyle = (file) => {
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
    let StyleInfoList = [];

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
                    StyleInfoList[size] = new StyleInfo(
                        [], [], [], [], [], [], [], []
                    ); 
            } else {
                if (StyleInfoList.length === 0) {
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
                        switch(key) {
                            case "int id": StyleInfoList[fileListIndex].id = parseInt(value); break;
                            case "string name": StyleInfoList[fileListIndex].name = value.replace(/"/g, ''); break;
                            case "string another_name": StyleInfoList[fileListIndex].altName = value.replace(/"/g, ''); break;
                            case "int rarity": StyleInfoList[fileListIndex].rarity = Typevars.styleRarities[parseInt(value)]; break;
                            case "int lp": StyleInfoList[fileListIndex].lp = parseInt(value); break;
                            case "int weapon_type": StyleInfoList[fileListIndex].weaponType = Typevars.weaponTypes[parseInt(value)]; break;
                            case "int style_bonus_id": StyleInfoList[fileListIndex].bonusId = parseInt(value); break;
                            case "int role": StyleInfoList[fileListIndex].role = parseInt(value); break;
                            case "int character_id": StyleInfoList[fileListIndex].charId = parseInt(value); break;
                            // strCast
                            case "int bonus_rate_min_wanryoku": StyleInfoList[fileListIndex].strCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_wanryoku": StyleInfoList[fileListIndex].strCast.push(parseInt(value)); break;
                            case "int promote_wanryoku": StyleInfoList[fileListIndex].strCast.push(parseInt(value)); break;
                            // conCast
                            case "int bonus_rate_min_tairyoku": StyleInfoList[fileListIndex].conCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_tairyoku": StyleInfoList[fileListIndex].conCast.push(parseInt(value)); break;
                            case "int promote_tairyoku": StyleInfoList[fileListIndex].conCast.push(parseInt(value)); break;
                            // dexCast
                            case "int bonus_rate_min_kiyousa": StyleInfoList[fileListIndex].dexCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_kiyousa": StyleInfoList[fileListIndex].dexCast.push(parseInt(value)); break;
                            case "int promote_kiyousa": StyleInfoList[fileListIndex].dexCast.push(parseInt(value)); break;
                            // spdCast
                            case "int bonus_rate_min_subayasa": StyleInfoList[fileListIndex].spdCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_subayasa": StyleInfoList[fileListIndex].spdCast.push(parseInt(value)); break;
                            case "int promote_subayasa": StyleInfoList[fileListIndex].spdCast.push(parseInt(value)); break;
                            // intCast
                            case "int bonus_rate_min_chiryoku": StyleInfoList[fileListIndex].intCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_chiryoku": StyleInfoList[fileListIndex].intCast.push(parseInt(value)); break;
                            case "int promote_chiryoku": StyleInfoList[fileListIndex].intCast.push(parseInt(value)); break;
                            // sprCast
                            case "int bonus_rate_min_seishin": StyleInfoList[fileListIndex].sprCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_seishin": StyleInfoList[fileListIndex].sprCast.push(parseInt(value)); break;
                            case "int promote_seishin": StyleInfoList[fileListIndex].sprCast.push(parseInt(value)); break;
                            // loveCast
                            case "int bonus_rate_min_ai": StyleInfoList[fileListIndex].loveCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_ai": StyleInfoList[fileListIndex].loveCast.push(parseInt(value)); break;
                            case "int promote_ai": StyleInfoList[fileListIndex].loveCast.push(parseInt(value)); break;
                            // chaCast
                            case "int bonus_rate_min_miryoku": StyleInfoList[fileListIndex].chaCast.push(parseInt(value)); break;
                            case "int bonus_rate_max_miryoku": StyleInfoList[fileListIndex].chaCast.push(parseInt(value)); break;
                            case "int promote_miryoku": StyleInfoList[fileListIndex].chaCast.push(parseInt(value)); break;
                            // resistances
                            case "int resist_zan": StyleInfoList[fileListIndex].slashRes = parseInt(value);
                            case "int resist_da": StyleInfoList[fileListIndex].bashRes = parseInt(value);
                            case "int resist_totsu": StyleInfoList[fileListIndex].pierceRes = parseInt(value);
                            case "int resist_netsu": StyleInfoList[fileListIndex].heatRes = parseInt(value);
                            case "int resist_rei": StyleInfoList[fileListIndex].coldRes = parseInt(value);
                            case "int resist_rai": StyleInfoList[fileListIndex].elecRes = parseInt(value);
                            case "int resist_yoi": StyleInfoList[fileListIndex].sunRes = parseInt(value);
                            case "int resist_inn": StyleInfoList[fileListIndex].shadowRes = parseInt(value);
                            // jutsus/skills
                            case "int size": 
                                if (inVector) vectorTotal = parseInt(value); 
                                break;
                            case "int data":
                                if (inVector && vectorTotal > 0) {
                                    switch (vectorMarker) {
                                        case JUTSUS:
                                            StyleInfoList[fileListIndex].jutsuList.push(parseInt(value)); break;
                                        case WAZA:
                                            StyleInfoList[fileListIndex].skillRefs.push(parseInt(value)); break;
                                    }
                                    if (vectorIndex + 1 === vectorTotal) {
                                        vectorIndex = 0;
                                        vectorTotal = 0;
                                        inVector = false;
                                    }
                                }
                                break;
                            case "string gacha_text":
                                fileListIndex++;
                                break;
                            default:
                                console.log("Discarding string "+key+" at style index: "+fileListIndex);
                        }
                    }
                    /**
                    * Parse in order
                    * 1. jutsus/spell arts
                    * 2. weapon skill
                    */
                    else if (
                        line.trim() === 'vector proper_jutsus'
                    ) {
                        inVector = true;
                        vectorMarker = JUTSUS;
                        StyleInfoList[fileListIndex].jutsuList = [];
                    } else if (
                        line.trim() === 'vector skill_ids'
                    ) {
                        inVector = true;
                        vectorMarker = WAZA;
                        StyleInfoList[fileListIndex].skillRefs = [];
                    }
                }                 
            }
        }
    });

    reader.on('close', () => {
        if (StyleInfoList.length > 0) {
            console.log("Status of StyleInfoList Array: ", StyleInfoList.length);
            console.log("===> Writing to style.json");
            const jsonData = JSON.stringify(StyleInfoList, null, 2);
            fs.writeFile(path.resolve('./output/style.json'), jsonData, (err) => {
                if (err) throw err;
                console.log("<=== style.json successfully dumped");
            })
        } else {
            console.log("[style.json] ==X Parse failure due to invalid or missing asset file");
        }
    });
}
