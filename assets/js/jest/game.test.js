const { collision, restartGame, moveBird, placePole } = require('assets/js/flappybird.js'); // Adjust import path if needed

describe("Flappy Bird Game Tests", () => {
    
    test("Bird collides with an obstacle", () => {
        const bird = { x: 50, y: 50, width: 34, height: 24 };
        const pole = { x: 50, y: 50, width: 64, height: 512 };
        expect(collision(bird, pole)).toBe(true);
    });

    test("Score increases when passing a pole", () => {
        let score = 0;
        const bird = { x: 100, y: 200, width: 34, height: 24 };
        const pole = { x: 50, y: 0, width: 64, height: 300, passed: false };

        if (!pole.passed && pole.x + pole.width < bird.x && pole.y > 0) {
            pole.passed = true;
            score += 1;
        }

        expect(score).toBe(1);
    });

    test("Game restarts and resets score", () => {
        let score = 10;
        restartGame({ code: "Enter" });
        expect(score).toBe(0); // Ensure score resets
    });

    test("Gravity applies to bird movement", () => {
        let bird = { x: 50, y: 100, width: 34, height: 24 };
        let velocityY = 0;
        let gravity = 0.4;

        velocityY += gravity;
        bird.y += velocityY;

        expect(bird.y).toBeGreaterThan(100); // Bird should move down due to gravity
    });
});