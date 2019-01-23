import {
    AbilityInfo,
} from './lib/datablocks';

const sample = new AbilityInfo(0, "1", "1:desc");
const sample2 = new AbilityInfo(1, "2", "2:desc");
const sample3 = new AbilityInfo(2, "3", "3:desc");

const list = [sample, sample2, sample3];

console.log(list);
