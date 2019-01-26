import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { AbilityInfo } from '../datablocks';

export const textReadAbility = (file) => {
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', (error) => {
        console.log(error);
    });

    const reader = readline.createInterface({
        input: fileStream
    });

    let parsed = false;
    let result = 0;
    let line_no = 0;
    let fileListIndex = 0;
    let AbilityInfoList = [];

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
                    AbilityInfoList[size] = new AbilityInfo(); 
            } else {
                if (AbilityInfoList.length === 0) {
                    return parsed;
                } else if (!(line.trim() === "[" + fileListIndex.toString() + "]")) {
                    let dataString = line.split('=');
                    if (
                        dataString.length === 2
                    ) {
                        let key = dataString[0].trim();
                        let value = dataString[1].trim();
                        switch (key) {
                            case "int id": AbilityInfoList[fileListIndex].objId = parseInt(value); break;
                            case "string name": AbilityInfoList[fileListIndex].name = value.replace(/"/g, ''); break;
                            case "string flavor_text": AbilityInfoList[fileListIndex].flavorText = value.replace(/"/g, ''); break;
                            case "int icon": 
                                fileListIndex++;
                                break;
                            default: 
                                console.log("Discarding string "+key+" at ability index: "+fileListIndex);
                        }
                    }
                }
            }
        } 
    });

    reader.on('close', () => {
        if (AbilityInfoList.length > 0) {
            console.log("Status of AbilityInfoList Array: ", AbilityInfoList.length);
            console.log("===> Writing to ability.json");
            const jsonData = JSON.stringify(AbilityInfoList, null, 2);
            fs.writeFile(path.resolve('./output/ability.json'), jsonData, (err) => {
                if (err) throw err;
                console.log("<=== ability.json successfully dumped");
            })
        } else {
            console.log("[ability.json] ==X Parse failure due to invalid or missing asset file");
        }
    });
}
