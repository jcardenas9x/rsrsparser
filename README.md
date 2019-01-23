# rsrsparser

Parses files extracted from the game into readable JSON format

## How to use

The parser expects five files in a folder at the root of this project called `input`:

* `Ability.txt`
* `Character.txt`
* `Skill.txt`
* `Style.txt`
* `StyleBonus.txt`

The result will be fed to a folder called `output`.

Please run `npm start` at the root of this folder after cloning the repo.

**The five asset files parsed by this application must follow Monobehaviour script format** otherwise the parser won't work properly and will produce garbage.