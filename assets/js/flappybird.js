// Board 
let board;
let boardWidth = 430;
let boardHeight = 750;
let context;

// Bird
let birdWidth = 45;
let birdHeight = 45;
let birdX = 50;
let birdY = 200;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// Poles 
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

// Responsivnes
function setScreenDimensions() {
    let screenWidth = window.innerWidth;

    if (screenWidth <= 320) {
        boardWidth = 300;
        boardHeight = 500;
        birdWidth = 30;
        birdHeight = 30;
        poleWidth = 50;
        gapBetweenPoles = 140;
    } else if (screenWidth <= 480) {
        boardWidth = 350;
        boardHeight = 600;
        birdWidth = 35;
        birdHeight = 35;
        poleWidth = 55;
        gapBetweenPoles = 160;
    } else if (screenWidth <= 768) {
        boardWidth = 400;
        boardHeight = 700;
        birdWidth = 40;
        birdHeight = 40;
        poleWidth = 60;
        gapBetweenPoles = 170;
    } else {
        boardWidth = 450;
        boardHeight = 780;
        birdWidth = 45;
        birdHeight = 45;
        poleWidth = 64;
        gapBetweenPoles = 180;
    }
    birdX = 50;
    birdY = boardHeight / 3;
    poleX = boardWidth;
    poleHeight = 512;
    bird = { x: birdX, y: birdY, width: birdWidth, height: birdHeight };
}

// Preven zooming and prevent selecting entire screen while playing the game.
document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
// Images of Bird and trees as well as starting the game event listeners.
window.onload = function () {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird1.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
        drawPlayButton();
    };

    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/treedown.png";
    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/tree.png";

    document.addEventListener("keydown", startGame);
    document.addEventListener("mousedown", startGame);
    document.addEventListener("touchstart", startGame);
};

// Function for starting and restarting the game.
function startGame(e) {
    if (!gameStarted && (e.code === "Space" || e.code === "ArrowUp" || e.button === 0 || e.type === "touchstart")) {
        gameStarted = true;
        requestAnimationFrame(update);
        setInterval(placePole, 1600);
        document.addEventListener("keydown", moveBird);
        document.addEventListener("mousedown", moveBird);
        document.addEventListener("touchstart", moveBird);
        document.addEventListener("keydown", restartGame);
        document.addEventListener("mousedown", restartGame);
        document.addEventListener("touchstart", restartGame);
    }
}

function update() {
    if (gameOver) {
        drawGameOverMessage();
        return;
    }
// Animation pole movement
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);

    if (bird.y > board.height) {
        bird.y = board.height;
        velocityY = 0;
        gameOver = true;
        drawGameOverMessage();
        return;
    }

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for (let i = 0; i < poleArray.length; i++) {
        let pole = poleArray[i];
        pole.x += velocityX;
        context.drawImage(pole.img, pole.x, pole.y, pole.width, pole.height);
// Collision 
        if (collision(bird, pole)) {
            gameOver = true;
            drawGameOverMessage();
            return;
        }
// Score update
        if (!pole.passed && pole.x + pole.width < bird.x && pole.y > 0) {
            pole.passed = true;
            score += 1;
        }
    }

    if (poleArray.length > 0 && poleArray[0].x + poleWidth < 0) {
        poleArray.shift();
        poleArray.shift();
    }

    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 60, 80);

    context.fillStyle = "blue";
    context.font = "20px Arial";
    context.fillText("Best: " + bestScore, boardWidth - 60, 80);
}
// Placing poles randomly
function placePole() {
    if (gameOver) return;

    const minPoleHeight = 100;
    const maxPoleHeight = boardHeight - minPoleHeight - gapBetweenPoles;
    const randomTopHeight = Math.floor(Math.random() * (maxPoleHeight - minPoleHeight + 1) + minPoleHeight);
    const bottomPoleY = randomTopHeight + gapBetweenPoles;

    const topPole = { img: topPoleImg, x: poleX, y: 0, width: poleWidth, height: randomTopHeight, passed: false };
    const bottomPole = { img: bottomPoleImg, x: poleX, y: bottomPoleY, width: poleWidth, height: poleHeight, passed: false };

    poleArray.push(topPole, bottomPole);
}

function moveBird(e) {
    if (gameOver) return;

    if (e.code === "Space" || e.code === "ArrowUp" || e.button === 0) {
        velocityY = -6;
    }
}

function collision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

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
    context.fillStyle = "red";
    context.font = "bold 40px Arial";
    context.textAlign = "center";
    context.fillText("!!! GAME OVER !!!", boardWidth / 2, boardHeight / 2 - 40);
    context.font = "bold 30px Arial";
    context.fillText("Score: " + score, boardWidth / 2, boardHeight / 2 + 20);
    context.fillText("Best: " + bestScore, boardWidth / 2, boardHeight / 2 + 60);
}
// Start the game button
function drawPlayButton() {
    context.fillStyle = "white";
    context.font = "bold 25px Arial";
    context.textAlign = "center";
    context.border = "1px";
    context.fillText("Press Space or Tap screen to Play!", boardWidth / 2, boardHeight / 2);
}

window.addEventListener("resize", function () {
    setScreenDimensions();
    board.width = boardWidth;
    board.height = boardHeight;
});

module.exports = { collision, restartGame, moveBird, placePole }