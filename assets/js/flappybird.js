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

// Pole 
let poleArray = [];
let poleWidth = 64;
let poleHeight = 512;
let poleX = boardWidth;
let gapBetweenPoles = 150; // Gap for bird to pass through

let topPoleImg;
let bottomPoleImg;

// Game motion
let velocityX = -2; // Speed of poles moving toward the bird

window.onload = function () {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // Drawing on the board

    // Load bird image
    birdImg = new Image();
    birdImg.src = "./assets/images/flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    // Load pole images
    topPoleImg = new Image();
    topPoleImg.src = "./assets/images/toppipe.png";
    bottomPoleImg = new Image();
    bottomPoleImg.src = "./assets/images/bottompipe.png";

    // Start game loop
    requestAnimationFrame(update);
    setInterval(placePole, 1500); // Place a new pair of poles every 1.5 seconds
};

// Game update loop
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Draw bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Move and draw poles
    for (let i = 0; i < poleArray.length; i++) {
        let pole = poleArray[i];
        pole.x += velocityX; // Pole moving left

        context.drawImage(pole.img, pole.x, pole.y, pole.width, pole.height);
    }

    // Remove poles that go off screen
    if (poleArray.length > 0 && poleArray[0].x + poleWidth < 0) {
        poleArray.shift(); // Remove the first (oldest) pole
        poleArray.shift(); // Remove its pair (top + bottom poles)
    }
}

// Function to place new poles
function placePole() {
    let minPoleHeight = 100;
    let maxPoleHeight = boardHeight - minPoleHeight - gapBetweenPoles;

    let randomTopHeight = Math.floor(Math.random() * (maxPoleHeight - minPoleHeight + 1) + minPoleHeight);
    let bottomPoleY = randomTopHeight + gapBetweenPoles;

    let topPole = {
        img: topPoleImg,
        x: poleX,
        y: 0,
        width: poleWidth,
        height: randomTopHeight,
        passed: false
    };

    let bottomPole = {
        img: bottomPoleImg,
        x: poleX,
        y: bottomPoleY,
        width: poleWidth,
        height: poleHeight,
        passed: false
    };

    poleArray.push(topPole, bottomPole);
}
