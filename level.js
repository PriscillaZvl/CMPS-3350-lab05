// Reference to canvas and context
var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Obstacle properties
var obstacles = [];
var obstacleWidth = 50;
var obstacleHeight = 100;
var obstacleSpeed = 2;

// Create obstacle
function createObstacle() {
    console.log("Creating obstacle!");

    // Assign the obstacle's position to right side of the screen
    var obstaclePosition = canvas.width;

    // 30% chance for obstacle to be a wall
    var isWall = Math.random() < 0.3;

    // Create the obstacle object, randomize it a bit
    var obstacle = {
        x: obstaclePosition,
        y: isWall ? canvas.height - 3 * obstacleHeight : canvas.height - obstacleHeight,
        isWall: isWall,
        width: obstacleWidth + (Math.random() * 50 - 25),
        height: obstacleHeight + (Math.random() * 100 - 50)
    };

    // Spawn the obstacle
    obstacles.push(obstacle);
}

// Update and move obstacles
function updateObstacles() {
    console.log("Updating obstacles!");

    // Loop through each obstacle
    for (var i = 0; i < obstacles.length; i++) {
        // Move the obstacle to the left
        obstacles[i].x -= obstacleSpeed;

        // Fill color in the obstacle
        context.fillStyle = 'black';
        context.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Remove if it's offscreen
        if (obstacles[i] < -obstacleWidth) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    // Increase obstacle speed overtime
    obstacleSpeed += 0.001;
}

// Obstacle spawn intervals
var obstacleMinFrame = 100;
var obstacleMaxFrame = 250;

// Randomize the obstacle spawn iterval by frame
var framesUntilNextObstacle = Math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;

function gameLoop() {
    // Debugging
    console.log('Game loop started!');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    spawnCharacter();
    // Update and draw obstacles
    updateObstacles();

    // Create a new obstacle 
    if (frameCount >= framesUntilNextObstacle) {
        createObstacle();

        framesUntilNextObstacle = frameCount + Math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;
    }

    // Increment
    frameCount++;

    requestAnimationFrame(gameLoop);

    // Debugging
    console.log('Game loop ended!');
}

function spawnCharacter() {
    
    //setting up attributes for character
    var charHeight = 35;
    var charWidth = 35;
    var charX = 10;
    var charY = canvas.height - charHeight;

    context.fillStyle = 'red';
    context.fillRect(charX, charY, charWidth, charHeight);
}

// Start
var frameCount = 0;
gameLoop();
