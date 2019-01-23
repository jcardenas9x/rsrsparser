import * as path from 'path';

import {
    AbilityInfo,
} from './lib/datablocks';
import {
    Typevars
} from './lib/consts';
import Parser from './lib/parser';

const sample = new AbilityInfo(0, "1", "1:desc");
const sample2 = new AbilityInfo(1, "2", "2:desc");
const sample3 = new AbilityInfo(2, "3", "3:desc");

const list = [sample, sample2, sample3];

console.log(list);
console.log(Typevars.styleRarities);
console.log(Typevars.weaponTypes);

Parser.textReadCharacter(path.resolve('./input/Character.txt'));