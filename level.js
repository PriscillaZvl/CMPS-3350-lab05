// Reference to canvas and context
var canvas = document.getElementById('Canvas');
var context = canvas.getContext('2d');
var score = document.getElementById('score');
var gameOver = document.getElementById('gameOver');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.removeEventListener("keydown",jump);
document.addEventListener("keydown", jump);
document.addEventListener("keydown", reset_game);

// Obstacle properties
var obstacles = [];
var obstacleWidth = 50;
var obstacleHeight = 100;
var obstacleSpeed = 2;

// Create obstacle
function createObstacle() {

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

// flag for collisions
var collision_detected = false;

// Update and move obstacles
function updateObstacles() {

    // Loop through each obstacle
    for (var i = 0; i < obstacles.length; i++) {
        // Move the obstacle to the left
        obstacles[i].x -= obstacleSpeed;

        // Fill color in the obstacle
        context.fillStyle = 'black';
        context.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // sets collision flag if checkCollision function returns true
        if(checkCollision(obstacles[i], charY)) {
            collision_detected = true;
        }

        // Remove if it's offscreen
        if (obstacles[i] < -obstacleWidth) {
            obstacles.splice(i, 1);
            i--;
        }
    }

    // Increase obstacle speed overtime
    obstacleSpeed += 0.0005;
}

// Obstacle spawn intervals
var obstacleMinFrame = 125;
var obstacleMaxFrame = 175;

// Randomize the obstacle spawn iterval by frame
var framesUntilNextObstacle = Math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;

// Scoreboard
var score = 0;

// Score increment interval. 10 ms = 0.01 seconds
setInterval(function() {
    if(!collision_detected) {
        score++;
        document.getElementById('score').innerText = "Score: " + score;
    }
}, 10);

function gameLoop() {
    // Debugging
    if(!collision_detected) {

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn Character
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

    } else {
        // game ends and canvas is cleared
        document.removeEventListener("keyup",jump);
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('Score: ' + score);
        console.log('Game Over!');
        document.getElementById('gameOver').innerText = "Game Over! Press any key to retry.";

        // Store score
        //storeScore(score);
        //displayTopScores();
    }
}


//setting up attributes for character
var charHeight = 35;
var charWidth = 35;
var charX = 10;
var charY = canvas.height - charHeight;

//generates character
function spawnCharacter() {    
    if(!collision_detected) {
        console.log('Spawning Character!');
        context.fillStyle = 'red';
        context.fillRect(charX, charY, charWidth, charHeight);
    }
}

//Sets isJumping to false
var isJumping = false;

function jump(e) {
    //checks if isJumping is set to true and if the key pressed was not spacebar
    if(e.code !== "Space" || isJumping || collision_detected) {
        return;
    }

    //if key pressed was a spacebar set isJumping and velocity
    isJumping = true; 
    var jumpVelocity = -15;

    //function to animate the character jumping
    function jumpAnimation() {

        charY += jumpVelocity;
        spawnCharacter();
        jumpVelocity += 0.5;

        if (charY >= canvas.height - charHeight) {
            charY = canvas.height - charHeight;
            isJumping = false;
            clearInterval(jumpInterval);    
        }
    }

    var jumpInterval = setInterval(jumpAnimation, 15);
}

//checks for collisions
function checkCollision(obstacles, charY) {
    return (
        obstacles.x < charX + charWidth &&
        obstacles.x + obstacles.width > charX &&
        obstacles.y < charY + charHeight &&
        obstacles.y + obstacles.height > charY
    )
}

function reset_game() {
    if(collision_detected) {
        obstacles = [];
        obstacleSpeed = 2;
        collision_detected = false;
        score = 0;
        charY = canvas.height - charHeight;
        isJumping = false;
        frameCount = 0;
        framesUntilNextObstacle = Math.random() * (obstacleMaxFrame - obstacleMinFrame) + obstacleMinFrame;
        document.getElementById('gameOver').innerText = "";
        gameLoop();
    }
}

// Start
var frameCount = 0;
gameLoop();
