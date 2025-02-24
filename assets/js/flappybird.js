// Board properties
let board;
let boardWidth = 430;
let boardHeight = 750;
let context;

// Bird properties
let birdWidth = 45;
let birdHeight = 45;
let birdX = 50;
let birdY = 200;
let birdImg;
// Bird object
let bird = {
    height: birdHeight,
    width: birdWidth,
    x: birdX,
    y: birdY
};

// Pole properties
let poleArray = [];
let poleWidth = 64;
let poleHeight = 512;
let poleX = boardWidth;
let gapBetweenPoles = 180;

let topPoleImg;
let bottomPoleImg;

// Game motion
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let gameStarted = false;

// Score counter
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

// Responsiveness for different screen sizes
function setScreenDimensions() {
    let screenWidth = window.innerWidth;

    if (screenWidth <= 320) {
        boardWidth = 320;
        boardHeight = 668;
        birdWidth = 30;
        birdHeight = 30;
        poleWidth = 50;
        gapBetweenPoles = 140;
    } else if (screenWidth <= 480) {
        boardWidth = 375;
        boardHeight = 668;
        birdWidth = 35;
        birdHeight = 35;
        poleWidth = 55;
        gapBetweenPoles = 160;
    } else if (screenWidth <= 768) {
        boardWidth = 768;
        boardHeight = 668;
        birdWidth = 40;
        birdHeight = 40;
        poleWidth = 60;
        gapBetweenPoles = 170;
    } else {
        boardWidth = 430;
        boardHeight = 750;
        birdWidth = 45;
        birdHeight = 45;
        poleWidth = 64;
        gapBetweenPoles = 180;
    }
    // Resets Bird and Pole starting position
    birdX = 50;
    birdY = boardHeight / 3;
    poleX = boardWidth;
    poleHeight = 512;
    bird = {
        height: birdHeight,
        width: birdWidth,
        x: birdX,
        y: birdY
    };
}

// Prevent zooming and text selection while playing
document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Load images and set up event listeners
window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load the Blue Bird image
    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird1.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        drawPlayButton();
    };
    // Load Tree trunk images
    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/treedown.png";
    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/tree.png";

    // Game controls (event listeners for starting the game)
    document.addEventListener("keydown", startGame);
    document.addEventListener("mousedown", startGame);
    document.addEventListener("touchstart", startGame);
};

// Function to start the game
function startGame(e) {
    let isStartKey = e.code === "Space" || e.code === "ArrowUp" ||
        e.button === 0 || e.type === "touchstart";
    // Game controls (event listeners for bumping the bird)
    if (!gameStarted && isStartKey) {
        gameStarted = true;
        requestAnimationFrame(update);
        setInterval(placePole, 1600);
        document.addEventListener("keydown", moveBird);
        document.addEventListener("mousedown", moveBird);
        document.addEventListener("touchstart", moveBird);
    }
}
// Loop of the game function
function update() {
    if (gameOver) {
        drawGameOverMessage();
        return;
    }

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // This is applying velocity 
    velocityY += gravity;

    // This is ment to prevent bird from flying off the top of the board canvas
    bird.y = Math.max(bird.y + velocityY, 0);

    // This code is checking if bird fell below game canvas
    if (bird.y > board.height) {
        bird.y = board.height;
        velocityY = 0;
        gameOver = true;
        drawGameOverMessage();
        return;
    }
    // Draw Bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    // Move and draw poles
    for (i = 0; i < poleArray.length; i += 1) {
        let pole = poleArray[i];
        pole.x += velocityX;
        context.drawImage(pole.img, pole.x, pole.y, pole.width, pole.height);

        // Collision detection if bird strikes pole
        if (collision(bird, pole)) {
            gameOver = true;
            drawGameOverMessage();
            return;
        }

        // Score update after passed pole
        if (!pole.passed && pole.x + pole.width < bird.x && pole.y > 0) {
            pole.passed = true;
            score += 1;
        }
    }
    // Removes passed poles from the screen
    if (poleArray.length > 0 && poleArray[0].x + poleWidth < 0) {
        poleArray.shift();
        poleArray.shift();
    }
    // Display Score (left corner)
    context.fillStyle = "white";
    context.font = "bold 20px Arial";
    context.fillText("Score: " + score, 60, 80);
    // Display Best Score (right corner)
    context.fillStyle = "white";
    context.fillText("Best: " + bestScore, boardWidth - 60, 80);
}

// Placing poles randomly
function placePole() {
    if (gameOver) return;

    const minPoleHeight = 100;
    const maxPoleHeight = boardHeight - minPoleHeight - gapBetweenPoles;
    const randomTopHeight = Math.floor(
        Math.random() * (maxPoleHeight - minPoleHeight + 1) + minPoleHeight
    );

    const bottomPoleY = randomTopHeight + gapBetweenPoles;

    const topPole = {
        img: topPoleImg,
        x: poleX,
        y: 0,
        width: poleWidth,
        height: randomTopHeight,
        passed: false
    };

    const bottomPole = {
        img: bottomPoleImg,
        x: poleX,
        y: bottomPoleY,
        width: poleWidth,
        height: poleHeight,
        passed: false
    };

    poleArray.push(topPole, bottomPole);
}
// Function for keeping bird flying
function moveBird(e) {
    if (gameOver) return;

    if (e.code === "Space" || e.code === "ArrowUp" || e.button === 0) {
        velocityY = -6;
    }
}
// Collision Function taken from Youtube tutorial
function collision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
// Function to restart the game
function restartGame(e) {
    if (!gameOver) return;

    if (e.code === "Enter" || e.button === 0 || e.code === "Space") {
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
        }
        location.reload();
    }
}

// Game over message
function drawGameOverMessage() {
    context.fillStyle = "white";
    context.font = "bold 40px Arial";
    context.textAlign = "center";
    context.fillText("!!! GAME OVER !!!", boardWidth / 2, boardHeight / 2 - 40);
    context.font = "bold 30px Arial";
    context.fillText("Score: " + score, boardWidth / 2, boardHeight / 2 + 20);
    context.fillText("Best Score: " + bestScore, boardWidth / 2,
        boardHeight / 2 + 60);
}

// Start game message
function drawPlayButton() {
    context.fillStyle = "white";
    context.font = "bold 25px Arial";
    context.textAlign = "center";
    context.fillText(
        "Press Space or Tap screen to Play!",
        boardWidth / 2,
        boardHeight / 2 - 60
    );
}
// Adjust game screen dimentions
window.addEventListener("resize", setScreenDimensions);

// Module for JEST TESTING (IT RETURNING CONSOLE ERROR but there is no error here)
module.exports = { collision, restartGame, moveBird, placePole };