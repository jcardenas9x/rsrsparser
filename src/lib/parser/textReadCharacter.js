import * as fs from 'fs';
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

    let line_no = 0;

    reader.on('line', (line) => {
        line_no++;
    });

    reader.on('close', (line) => {
        console.log("Read file with total lines: ", line_no);
        // Display undefined CharacterInfo class object
        console.log(new CharacterInfo());
    });
}