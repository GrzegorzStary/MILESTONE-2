// board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = 50; // Adjusted to better starting position
let birdY = 200;
let birdImg = null;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// poles
let poleArray = [];
let poleWidth = 64;
let poleHeight = 512;
let poleX = boardWidth;
let poleY = 0;

let topPoleImg;
let bottomPoleImg;

window.onload = function () {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // Drawing on the board

    // Drawing the bird (rectangle as fallback)
    context.fillStyle = "green";
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Bird image
    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird.png";

    // Draw image after loading
    birdImg.onload = function () {
        context.clearRect(bird.x, bird.y, bird.width, bird.height); // Clear rectangle
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    // Poles images load
    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/toppipe.png";

    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePole, 1500);
};

// For the game loop 
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Bird loop
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Pole loop
    for (let i = 0; i < poleArray.length; i++) {
        let pole = poleArray[i];
        context.drawImage(pole.Image, pole.x, pole.y, pole.width, pole.height);
    }
}

// Function for the poles

function placePole() {
    let topPole = {
        img: topPoleImg,
        x: poleX,
        y: poleY,
        width: poleWidth,
        height: poleHeight,
        passed: false
    }
    poleArray.push(topPole);
}
