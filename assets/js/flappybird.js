// Board 
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird
let birdWidth = 34;
let birdHeight = 24;
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

// Score counter
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

window.onload = function () {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird.gif";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/treedown.png";
    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/tree.png";

    requestAnimationFrame(update);
    setInterval(placePole, 1500);

    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird);
    document.addEventListener("keydown", restartGame);
    document.addEventListener("mousedown", restartGame);
};

function update() {
    if (gameOver) {
        drawGameOverMessage();
        return;
    }

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

        if (collision(bird, pole)) {
            gameOver = true;
            drawGameOverMessage();
            return;
        }

        if (!pole.passed && pole.x + pole.width < bird.x && pole.y > 0) {
            pole.passed = true;
            score += 1;
        }
    }

    if (poleArray.length > 0 && poleArray[0].x + poleWidth < 0) {
        poleArray.shift();
        poleArray.shift();
    }

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 40);
    
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Best: " + bestScore, boardWidth - 100, 40);
}

function placePole() {
    if (gameOver) return;

    let minPoleHeight = 100;
    let maxPoleHeight = boardHeight - minPoleHeight - gapBetweenPoles;
    let randomTopHeight = Math.floor(Math.random() * (maxPoleHeight - minPoleHeight + 1) + minPoleHeight);
    let bottomPoleY = randomTopHeight + gapBetweenPoles;

    let topPole = { img: topPoleImg, x: poleX, y: 0, width: poleWidth, height: randomTopHeight, passed: false };
    let bottomPole = { img: bottomPoleImg, x: poleX, y: bottomPoleY, width: poleWidth, height: poleHeight, passed: false };

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

function drawGameOverMessage() {
    context.fillStyle = "white";
    context.font = "bold 40px Arial";
    context.textAlign = "center";
    context.fillText("!!! GAME OVER !!!", boardWidth / 2, boardHeight / 2 - 40);
    context.font = "bold 30px Arial";
    context.fillText("Score: " + score, boardWidth / 2, boardHeight / 2 + 20);
    context.fillText("Best: " + bestScore, boardWidth / 2, boardHeight / 2 + 60);
}