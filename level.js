// Reference to canvas and context
var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');

// Obstacle properties
var obstacles = [];
var obstacleWidth = 50;
var obstacleHeight = 100;
var obstacleSpeed = 2;

// Create obstacle
function createObstacle() {
    var obstaclePosition = canvas.width;
    obstacles.push(obstaclePosition);
}

// Update and move obstacles
function updateObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        // Move the obstacle to the left
        obstacles[i] -= obstacleSpeed;

        // Fill in the obstacle
        context.fillStyle = 'black';
        context.fillRect(obstacles[i], canvas.height - obstacleHeight, obstacleWidth, obstacleHeight);

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
var obstacleMinFrame = 75;
var obstacleMaxFrame = 300;

// Randomize the obstacle spawn iterval by frame
var framesUntilNextObstacle = math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;

function gameLoop() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw obstacles
    updateObstacles();

    // Create a new obstacle 
    if (frameCount >= framesUntilNextObstacle) {
        createObstacle();

        framesUntilNextObstacle = frameCount + math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;
    }

    requestAnimationFrame(gameLoop);
}

// Start
var frameCount = 0;
gameLoop();