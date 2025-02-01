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
let gapBetweenPoles = 180; // Space between poles for bird to pass

let topPoleImg;
let bottomPoleImg;

// Game motion
let velocityX = -2; // Pole movement speed
let velocityY = 0; // Bird vertical speed
let gravity = 0.4;
let gameOver = false;

// Score counter
let score = 0;

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

    // Add event listeners for jumping
    document.addEventListener("keydown", moveBird);
    document.addEventListener("mousedown", moveBird); // Left mouse click
    document.addEventListener("keydown", restartGame); // Restart game on "Enter"
    document.addEventListener("mousedown", restartGame); // Restart game on click
};

// Game update loop
function update() {
    if (gameOver) return; // Stop game loop when game is over
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Apply gravity to bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // Prevent flying off the top

    if (bird.y > board.height) {  
        gameOver = true;
    }

    // Draw bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Move and draw poles
    for (let i = 0; i < poleArray.length; i++) {
        let pole = poleArray[i];
        pole.x += velocityX; // Move pole left

        context.drawImage(pole.img, pole.x, pole.y, pole.width, pole.height);

        // Collision detection
        if (collision(bird, pole)) {
            gameOver = true;
        }

        // Score update (increase score when passing the first pole in a pair)
        if (!pole.passed && pole.x + pole.width < bird.x) {
            pole.passed = true;
            score += 0.5; // Add 1 point for passing a pair
        }
    }

    // Remove off-screen poles
    if (poleArray.length > 0 && poleArray[0].x + poleWidth < 0) {
        poleArray.shift(); // Remove first pole
        poleArray.shift(); // Remove paired bottom pole
    }

    // Draw score in the top-left corner
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
}

// Function to place new poles
function placePole() {
    if (gameOver) return;

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
        passed: false // Track if the pole is passed
    };

    let bottomPole = {
        img: bottomPoleImg,
        x: poleX,
        y: bottomPoleY,
        width: poleWidth,
        height: poleHeight,
        passed: false // Track if the pole is passed
    };

    poleArray.push(topPole, bottomPole);
}

// Function for bird jump (Space, ArrowUp, Left Click)
function moveBird(e) {
    if (gameOver) return; // Disable jumping when game over

    if (e.code === "Space" || e.code === "ArrowUp" || e.button === 0) {
        velocityY = -6; // Jump upwards
    }
}

// Function to detect collision
function collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Function to restart game on click or "Enter"
function restartGame(e) {
    if (!gameOver) return; // Restart only when game is over

    if (e.code === "Enter" || e.button === 0 || e.code === "Space") {
        location.reload(); // Reload the game
    }
}
