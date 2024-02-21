import {generateSection, updateLevel} from './level.js';

function creation() {

    var section = generateSection(game, 0, -10)

    game.add.existing(section);
}

creation();