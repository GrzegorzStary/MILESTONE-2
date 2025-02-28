// Board properties taken from the Youtube tutorial however adjusted by me for better game experience
let board;
let boardWidth = 430;
let boardHeight = 750;
let context;

// Bird properties taken from the Youtube tutorial however adjusted by me for better game experience
let birdWidth = 45;
let birdHeight = 45;
let birdX = 50;
let birdY = 200;
let birdImg;
// Bird object taken from the Youtube tutorial entirely fixed for JS Lint
let bird = {
    height: birdHeight,
    width: birdWidth,
    x: birdX,
    y: birdY
};

// Pole properties partially taken from Youtube tutorial
let poleArray = [];
let poleWidth = 64;
let poleHeight = 512;
let poleX = boardWidth;
let gapBetweenPoles = 200; //

let topPoleImg; //taken from Youtube tutorial
let bottomPoleImg; // taken from Youtube tutorial

// Game motion taken from Youtube tutorial
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let gameStarted = false;

// Score counter
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

// Responsiveness for different screen sizes
function screenDimensions() {
    let screenWidth = window.innerWidth;

    if (screenWidth <= 320) {
        boardWidth = 320;
        boardHeight = 668;
        birdWidth = 30;
        birdHeight = 30;
        poleWidth = 50;
        gapBetweenPoles = 180;
    } else if (screenWidth <= 480) {
        boardWidth = 375;
        boardHeight = 668;
        birdWidth = 35;
        birdHeight = 35;
        poleWidth = 55;
        gapBetweenPoles = 180;
    } else if (screenWidth <= 768) {
        boardWidth = 768;
        boardHeight = 668;
        birdWidth = 40;
        birdHeight = 40;
        poleWidth = 60;
        gapBetweenPoles = 180;
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
// Prevent zooming and text selection while playing on touchscreen shorthand version
["gesturestart", "contextmenu"].forEach(event => 
    document.addEventListener(event, e => e.preventDefault())
);

// Load images and set up event listeners taken from Youtube tutorial
window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load the Blue Bird image taken from Youtube tutorial (image changed)
    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird1.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        playButton();
    };
    // Load Tree trunk images
    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/treedown.png";
    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/tree.png";

    // Game controls (event listeners for starting and restarting the game)
    document.addEventListener("keydown", startGame);
    document.addEventListener("mousedown", startGame);
    document.addEventListener("touchstart", startGame);
    document.addEventListener("keydown", restartGame);
    document.addEventListener("mousedown", restartGame);
    document.addEventListener("touchstart", restartGame); // I dont know how adding this restartGame "Fixed" -
    // Best score update on the small/touch screen BUT IT WORKS... (I am guessing that touchstart restartGame is directly corelated 
    // with localStorage that after pressing will restart the game and update Best score!)
};
// Function to start the game (BUTTONS)
function startGame(e) {
    let isStartKey = e.code === "Space" || e.code === "ArrowUp" ||
        e.button === 0 || e.type === "touchstart";
    // Game controls (event listeners for bumping the bird)
    if (!gameStarted && isStartKey) {
        gameStarted = true;
        requestAnimationFrame(update); 
        setInterval(placePole, 1700); //taken from Youtube tutorial adjusted for easier game play
        document.addEventListener("keydown", moveBird); //taken from Youtube tutorial
        document.addEventListener("mousedown", moveBird); // added by me    
        document.addEventListener("touchstart", moveBird); // added by me
    }
}
// Loop of the game function
function update() {
    if (gameOver) {
        drawGameOverMessage();
        return;
    }
    // taken from Youtube tutorial
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // This is applying velocity taken from Youtube tutorial
    velocityY += gravity;

    // This is ment to prevent bird from flying off the top of the board canvas
    bird.y = Math.max(bird.y + velocityY, 0);

    // This code is checking if bird fell below game canvas taken from Youtube tutorial
    if (bird.y > board.height) {
        bird.y = board.height;
        velocityY = 0;
        gameOver = true;
        drawGameOverMessage();
        return;
    }
    // Draw Bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); //taken from Youtube tutorial
    // Move and draw  poles taken from Youtube tutorial
    for (let i = 0; i < poleArray.length; i += 1) {
        let pole = poleArray[i];
        pole.x += velocityX;
        context.drawImage(pole.img, pole.x, pole.y, pole.width, pole.height);

        // Collision detection if bird strikes pole
        if (collision(bird, pole)) {
            gameOver = true;
            drawGameOverMessage();
            return;
        }

        // Score update after passed pole taken from Youtube tutorial adjusted so 
        // that score would increment only 1 (one) only
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

    //taken from Youtube tutorial adjusted for Lint by me
    const topPole = {
        height: randomTopHeight,
        img: topPoleImg,
        passed: false,
        width: poleWidth,
        x: poleX,
        y: 0
    };
    //taken from Youtube tutorial adjusted for Lint by me
    const bottomPole = {
        height: poleHeight,
        img: bottomPoleImg,
        passed: false,
        width: poleWidth,
        x: poleX,
        y: bottomPoleY
    };

    poleArray.push(topPole, bottomPole); // taken partly from Youtube tutorial but adjusted by me
}
// Function for keeping bird flying
function moveBird(e) {
    if (gameOver) return;

    //taken from Youtube tutorial but updated by me by adding additional buttons to bump the bird
    if (e.code === "Space" || e.code === "ArrowUp" || e.button === 0 || e.type === "touchstart") {
        velocityY = -6;
    }
}
// Collision Function taken from Youtube tutorial but lack of brackets on the tutorial so it did not worked
function collision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
// Function to restart the game (BUTTONS)
function restartGame(e) {
    if (!gameOver) return;

    // ONLY ENTER / RIHT MOUSE CLICK / TOUCH SCREEN WILL RESTART THE GAME - TO PREVENT ACCIDENTAL GAME RESTART
    if (e.code === "Enter" || e.button === 2 || e.type === "touchstart") {
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
    context.fillText("Nice try! Play again?", boardWidth / 2, boardHeight / 2 - 60);

    context.font = "bold 30px Arial";
    context.fillText("Your Score: " + score, boardWidth / 2, boardHeight / 2 - 10);
    context.fillText("Best Score: " + bestScore, boardWidth / 2, boardHeight / 2 + 30);

    context.font = "bold 25px Arial"; 
    context.fillText("!!! PRESS ENTER !!!", boardWidth / 2, boardHeight / 2 + 80);

    context.font = "bold 25px Arial"; 
    context.fillText("OR RIGHT MOUSE BUTTON", boardWidth / 2, boardHeight / 2 + 120);
}

// Start game message
function playButton() {
    context.fillStyle = "white";
    context.font = "bold 25px Arial";
    context.textAlign = "center";
    context.fillText(
        "Press Space or Tap screen!",
        boardWidth / 2,
        boardHeight / 2 - 60
    );
}
// Adjust game screen dimentions
window.addEventListener("resize", screenDimensions);

// Module for JEST TESTING (IT RETURNING CONSOLE ERROR but there is no error here)
module.exports = { collision, restartGame, moveBird, placePole };