import * as path from 'path';

import Parser from './lib/parser';

// Invoked the parser for each file.
Parser.textReadCharacter(path.resolve('./input/Character.txt'));
Parser.textReadAbility(path.resolve('./input/Ability.txt'));
Parser.textReadSkill(path.resolve('./input/Skill.txt'));
Parser.textReadStyle(path.resolve('./input/Style.txt'));
Parser.textReadStyleBonus(path.resolve('./input/StyleBonus.txt'));
