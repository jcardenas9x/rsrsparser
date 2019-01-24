import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

import { StyleBonusInfo } from '../datablocks';

export const textReadStyleBonus = (file) => {
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
    let StyleBonusInfoList = [];

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
                    StyleBonusInfoList[size] = new StyleBonusInfo(); 
            } else {
                if (StyleBonusInfoList.length === 0) {
                    return parsed;
                } else if (!(line.trim() === "[" + fileListIndex.toString() + "]")) {
                    let dataString = line.split('=');
                    if (
                        dataString.length === 2
                    ) {
                        let key = dataString[0].trim();
                        let value = dataString[1].trim();
                        switch (key) {
                            case "int id": StyleBonusInfoList[fileListIndex].id = parseInt(value); break;
                            case "int style_id": StyleBonusInfoList[fileListIndex].styleId = parseInt(value); break;
                            case "int reached_level": StyleBonusInfoList[fileListIndex].level = parseInt(value); break;
                            case "int style_bonus_type": StyleBonusInfoList[fileListIndex].type = parseInt(value); break;
                            case "int style_bonus_value": 
                                StyleBonusInfoList[fileListIndex].value = parseInt(value);
                                fileListIndex++;
                                break;
                            default: 
                                console.log("Discarding string "+key+" at stylebonus index: "+fileListIndex);
                        }
                    }
                }
            }
        }
    });

    reader.on('close', () => {
        if (StyleBonusInfoList.length > 0) {
            console.log("Status of StyleBonusInfoList Array: ", StyleBonusInfoList.length);
            console.log("===> Writing to stylebonus.json");
            const jsonData = JSON.stringify(StyleBonusInfoList, null, 2);
            fs.writeFile(path.resolve('./output/stylebonus.json'), jsonData, (err) => {
                if (err) throw err;
                console.log("<=== stylebonus.json successfully dumped");
            })
        } else {
            console.log("[stylebonus.json] ==X Parse failure due to invalid or missing asset file");
        }
    });
}
