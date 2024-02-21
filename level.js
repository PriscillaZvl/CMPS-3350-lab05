const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'black';

ctx.fillRect(50, 50, 100, 100);
level.js
function createFloor(game, x, y) {
    // Rectangle segment for floor
    var floor = game.add.rectangle(x, y, 100, 50, 0x000000);

    // Physics
    game.physics.add.existing(floor, true);
    return floor;
}

function createWall(game, x, y) {
    // Rectangle segment for wall
    var wall = game.add.rectangle(x, y, 50, 100, 0x000000);

    // Physics 
    game.physics.add.existing(wall, true);
    return wall;
}

function generateSection() {
    // Random generation
    var rand = Math.random();
    if (rand < 0.5) {
        // 75% chance of generating a floor
        if (rand < 0.75) {
            createFloor();
        } else {
            createWall();
        }
    }
}

function updateLevel(playerX, nextX, nextSection, sectionWidth) {
    // Check if player has moved far enough
    if (playerX > nextSectionX) {
        generateSection();
        nextSectionX += sectionWidth;
    }

    return nextSectionX;
}

// Export the functions
export {generateSection, updateLevel}