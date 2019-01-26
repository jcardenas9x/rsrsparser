import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { CharacterInfo } from '../datablocks';

export const textReadCharacter = (file) => {
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', (error) => {
        console.log(error);
    });

    const reader = readline.createInterface({
        input: fileStream
    });

    let parsed = false;
    let line_no = 0;
    let fileListIndex = 0;
    let result = 0;
    let CharacterInfoList = [];

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
                    CharacterInfoList[size] = new CharacterInfo(); 
            } else {
                if (CharacterInfoList.length === 0) {
                    return parsed;
                } else if (!(line.trim() === "[" + fileListIndex.toString() + "]")) {
                    let dataString = line.split('=');
                    if (
                        dataString.length === 2
                    ) {
                        let key = dataString[0].trim();
                        let value = dataString[1].trim();
                        switch (key) {
                            case "int id": CharacterInfoList[fileListIndex].objId = parseInt(value); break;
                            case "string name": CharacterInfoList[fileListIndex].name = value.replace(/"/g, ''); break;
                            case "int promote_wanryoku": CharacterInfoList[fileListIndex].str = parseInt(value); break;
                            case "int promote_tairyoku": CharacterInfoList[fileListIndex].con = parseInt(value); break;
                            case "int promote_kiyousa": CharacterInfoList[fileListIndex].dex = parseInt(value); break;
                            case "int promote_subayasa": CharacterInfoList[fileListIndex].spd = parseInt(value); break;
                            case "int promote_chiryoku": CharacterInfoList[fileListIndex].int = parseInt(value); break;
                            case "int promote_seishin": CharacterInfoList[fileListIndex].spr = parseInt(value); break;
                            case "int promote_ai": CharacterInfoList[fileListIndex].love = parseInt(value); break;
                            case "int promote_miryoku": CharacterInfoList[fileListIndex].cha = parseInt(value); break;
                            case "int dot_id": 
                                fileListIndex++;
                                break;
                            default: 
                                console.log("Discarding string "+key+" at character index: "+fileListIndex);
                        }
                    }
                }
            }
        }
    });

    reader.on('close', () => {
        if (CharacterInfoList.length > 0) {
            console.log("Status of CharacterInfoList Array: ", CharacterInfoList.length);
            console.log("===> Writing to character.json");
            const jsonData = JSON.stringify(CharacterInfoList, null, 2);
            fs.writeFile(path.resolve('./output/character.json'), jsonData, (err) => {
                if (err) throw err;
                console.log("<=== character.json successfully dumped");
            })
        } else {
            console.log("[character.json] ==X Parse failure due to invalid or missing asset file");
        }
    });
}
