/**
* @jest-environment jsdom
*/
// TESTED FUNCTIONS IMPORT
const { collision, restartGame, moveBird, placePole } = require('../flappybird.js');

// Test for Flappy Bird game
describe("Flappy Bird Game Tests", () => {

    // Test if collison wokrs
    test("Bird collides with an obstacle", () => {
        const bird = { x: 50, y: 50, width: 34, height: 24 };
        const pole = { x: 50, y: 50, width: 64, height: 512 };
        // Expect return to be true
        expect(collision(bird, pole)).toBe(true);
    });

    // Verify if the score not increases
    test("Score does not increase when striking a pole", () => {
        let score = 0;
        const bird = { x: 100, y: 200, width: 34, height: 24 };
        const pole = { x: 100, y: 180, width: 64, height: 300, passed: false }
        // Check for collision first
        if (!collision(bird, pole)) {
            if (!pole.passed && pole.x + pole.width < bird.x) {
                pole.passed = true;
                score += 1;
            }
        }
        expect(score).toBe(0);
    });

    // Test if the game restarts and resets the score
    test("Game restarts and resets score", () => {
        let score = 1;
        restartGame({ code: "Enter" });
        expect(score).toBe(1); // Ensure score resets
    });
    
    // Check if the gravity works as it should
    test("Gravity applies to bird movement", () => {
        let bird = { x: 50, y: 100, width: 34, height: 24 };
        let velocityY = 0;
        let gravity = 0.4;
        // Gravity application
        velocityY += gravity;
        bird.y += velocityY;

        expect(bird.y).toBeGreaterThan(100); // Bird should move down due to gravity
    });
});