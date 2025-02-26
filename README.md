# Flappy Bird Game
![Mock-up](assets/readme/images/mockup1.png)

[Click here to view the application](https://grzegorzstary.github.io/MILESTONE-2/)

This documentation covers my web application: Flappy Bird. It is a browser-based game built using HTML5, CSS3, and JavaScript
---
## Table of Contents

---
## Project Development & Planning

In developing this game, I followed User Experience (UX) best practices. My goal was to create a seamless, responsive, and accessible experience, ensuring the website is intuitive and easy to use while effectively meeting both user and client objectives.
---
### Project Goals

## Project Purpose

A web-based game that challenges players' reflexes and coordination, inspired by the mechanics of the popular game Flappy Bird.

#### Client Goals

This project was developed as part of my Diploma in Web Application Development with Code Institute, serving as a key learning milestone in frontend interactivity and JavaScript development. There was no real life client for this project. However, I approached the game as a real-world product, ensuring it was well-structured, engaging, and had clear objectives that aligned with a potential client’s needs. 

* Providing an engaging gameplay experience that tests users' reflexes, precision, and reaction time.
* Appealing to both existing fans of Flappy Bird and new players, offering a familiar yet polished and refined version of the classic gameplay.
* Encouraging replayability by designing an intuitive yet progressively challenging game that keeps users coming back.
* Expanding the client’s content portfolio with a simple yet effective web-based game that can drive user engagement and retention.
* Enhancing accessibility by ensuring the game is lightweight, browser-friendly, and easy to play on multiple devices.
* Creating a fun and time-killing experience that players can enjoy casually while promoting the client’s platform or brand.

#### User Goals:

The target audience for this game includes players of all ages who enjoy casual, fast-paced challenges.

* Challenge their reflexes and coordination by navigating obstacles with precise timing.
* Enjoy a fun, fast-paced game that is easy to pick up but difficult to master.
* Experience a game with simple yet addictive mechanics, encouraging repeated playthroughs.
* Compete against themselves or others by improving their high scores and striving for better performance.
* Engage in a lightweight, browser-friendly game that requires no downloads or installations.
* Pass time in an entertaining way, whether during short breaks, commutes, or leisure moments.

---

### User Stories:

The game is designed to be an engaging, quick-play experience, likely discovered by users casually rather than as a long-term commitment. It fits seamlessly into a gaming or entertainment website, attracting users for short, repeated sessions before they explore other content.

#### User

I want to play a fun and fast-paced game.
I want to test my reflexes and reaction time.
I want to improve my coordination and timing skills.
I want a game that is easy to learn but challenging to master.
I want to access and play the game on any device without issues.
I want the game controls to be simple and responsive.
I want a smooth, frustration-free experience with minimal lag or glitches.

#### Client

I want to entertain visitors and keep them engaged for longer.
I want to offer an addictive, replayable experience that encourages return visits.
I want the game to be accessible and optimized for all modern browsers.
I want to attract a broad audience, including casual and competitive players.
I want the site and game to function efficiently, with no technical issues.

---

#### Content

The game consists of a simple yet engaging mechanic, where players control a bird navigating through obstacles by tapping or clicking to stay airborne.

Key elements of the game include:

* The Bird: A small, pixel-art character, requiring precise timing to avoid crashing.
* Obstacles: Moving tree trunks that create gaps the player must navigate through.
* Scoring System: Players earn points for each obstacle they successfully pass through, encouraging them to improve their performance.
* The Best Score feature records the highest score achieved, motivating players to beat their personal best or challenge others for a higher score.

Overview of Page Content

* When the game starts, the bird is placed at the starting position, and the player begins tapping to keep it airborne.
* The player must navigate the bird through a series of obstacles (pipes) by tapping or clicking to control its flight.
* Each successful passage through a pair of pipes earns the player one point.
* There is a Best Score tracker that displays the highest score the player has achieved.
* The game ends when the bird collides with an obstacle, and the player’s final score is displayed.
* Highest score is recorded once new score exceedes the old one.

---

### Design, Layout & Structure

#### **Wireframes**

---

#### **Structure**

The site's structure is guided by its scope, user needs, and business objectives, while also adhering to interaction design (IXD) principles. This ensures alignment with user expectations and maximizes intuitiveness.

The site follows a simple structure, consisting of two main pages plus a 404 page. The Flappy Bird game is contained within a single page, with minimal HTML usage where possible. JavaScript dynamically generates and manages game elements through functions as the player interacts with the game.

* Start Page - An introduction with clear instructions to read and a button to begin the game.
* Game Page - the main game area, current score as well as best score counter.

404 Page - Displays an error message for users who land on a non-existent page, with a button to return to index.html and restart the game.

---

#### **Colour & Design**

The design of the site is fully customized by me. I haven’t used any images from the tutorials, as I wanted to create something original.

In the game, you can see the bird flying deep through the forest, avoiding tree trunks. The start page has been modified to include an image of the blue bird, which is our game character.

On the 404 page, our original blue bird character is clickable, allowing the user to return to safety if they land on an incorrect link.

All pages have a blue background to enhance the feeling of consistency. I tried to maintain the best contrast between the text and background, though I do wonder how someone with poor eyesight would enjoy playing Flappy Bird.
  
---

## Technologies Used

### Languages

* HTML
* CSS
* JavaScript

### Tools

* [GitHub](https://github.com/)
  * Used to store the project code after being created in GitPod/Git.
* [Gitpod](https://www.gitpod.io/)
  * Used for creating, editing, and previewing the project's code.
* [Balsamiq](https://www.balsamiq.com/)
  * Used to develop wireframes into a full mockup, including colors, fonts, and proportions.
* [Techsini Mockup](https://techsini.com/multi-mockup/)
  * Used to generate mockup images for the README.md.
* [Google Chrome](https://google.com/chrome)
  * Used as the default web browser, for development tools, and for testing via the Lighthouse service.
* [WAVE](https://https://wave.webaim.org/)
  * Used for accessibility testing and generating accessibility reports.
* [JSLint](https://jslint.com)
  * Used to verify JavaScript code and identify errors during testing.
* [W3C HTML Validator](https://https://validator.w3.org/)
  * Used to validate HTML code and detect errors or warnings.
* [W3C CSS Validation](https://jigsaw.w3.org/css-validator/)
  * Used to validate CSS code and ensure compliance with web standards.
* [Youtube](https://www.youtube.com/watch?v=jj5ADM2uywg)
  * Used for tutorials, including "Create Flappy Bird in JavaScript, HTML, and CSS."
* [Cleanpng](https://www.cleanpng.com/)
* [PngEgg](https://www.pngegg.com/)
* [Freepik](https://www.freepik.com/)
  * Used to source images for the project.
* [VSCode](https://code.visualstudio.com/)
  *  Used as the primary code editor.
* [ChatGPT](https://chatgpt.com)
  * Used for solving minor code issues and checking grammar in the README file.

---

## Features

### All Sections/Pages

#### **Favicon**
![TAB FAV ICON](assets/readme/images/fav.png)

The favicon remains consistent across all three pages.
#### **Index.html**
![INDEX.html](assets/readme/images/game1.png)

#### **Game.html**
![Game.html](assets/readme/images/game2.png)

#### **Game.html - in game**
![Game.html](assets/readme/images/game3.png)

#### **Game.html - after obsticle strike**
![Game.html](assets/readme/images/game4.png)

#### **404.html**
![404.html](assets/readme/images/game5.png)

---

### Future Features

#### Multiple Difficulty Levels
Allow the player to choose a difficulty level at the start, adjusting game mechanics accordingly. Alternatively, make the game progressively harder as the player advances, increasing speed, obstacle frequency, or other challenges.

#### Change the bird's skin and background
This means the player can select different bird designs and background themes before playing, giving them control over the game's appearance.

#### Life system that allows the player to continue after hitting a tree
This means the player gets extra chances (e.g., 3 lives) before the game fully ends, making it more forgiving and allowing them to resume after a mistake.

#### Add support for landscape mode
This will allow the game to adapt to different screen orientations, giving players more flexibility. Currently, the game is designed for portrait mode only. Due to time constraints, I couldn't resolve the issue. I explored a few ideas, but after testing, I decided to abandon them.

#### Best score board
Implement a feature where multiple players can enter their names, and their scores will be saved after the game ends. This will include a Top 10 leaderboard to display the highest scores.

---

## Testing & Bugs

### BUGS 
* 1 Bird was not appearing on designed location.
* 2 Poles are not visible
* 3 Poles are not moving
* 4 Game not stops when the bird colided the pole
* 5 The best score counter not saving/updating the best score
* 6 Game restart on the touchscreen is not working
* 7. Best score counter not working on the smallscreen. 
* 8. JEST TERSTING FAILS DUE TO WRONG VALUE PROVIDED AND RECEIVED. AS WELL AS WRONG FILE NAME (not linked to the testing file).
---
### HTML VALIDATOR

![INDEX](assets/readme/images/indexvalid.png)
![GAME](assets/readme/images/gamevalid.png)
![404](assets/readme/images/404valid.png)

### CSS VALIDATOR

![CSS](assets/readme/images/cssvalid.png)

### JS LINT

![JS Lint](assets/readme/images/jslintvalid.png)
#### Warning: Due to JEST testing, I was unable to find a proper solution for this issue. A similar issue also appears in the console.

### JEST

![JEST](assets/readme/images/jest.png)

### WAVE Accessibility

![WAVE](assets/readme/images/wave1.png)
![WAVE](assets/readme/images/wave2.png)
![WAVE](assets/readme/images/wave3.png)

#### No errors or contrast issues present on any of the pages.

### LIGHTHOUSE PERFORMANCE

![LIGHT](assets/readme/images/lighthouse1.png)
![LIGHT](assets/readme/images/lighthouse2.png)
![LIGHT](assets/readme/images/lighthouse3.png)

---

## Deployment

### GitHub Pages

The site has been deployed to GitHub Pages. Follow these steps to deploy:

Go to the Settings tab in the GitHub repository.
Select Pages from the left-hand menu.
Under Source, choose Branch: main.
Click Save.
Once published successfully, a live link will be generated.

You can find the live link here: [CLICK!](https://grzegorzstary.github.io/MILESTONE-2/)

### Forking the GitHub Repo

To fork the repository, follow these steps:

Navigate to the GitHub repository.
Click the Fork button in the upper-right corner.

### Cloning the GitHub Repo

To clone the repository for local use, follow these steps:

1. Open the GitHub repository you want to clone.
2. Click the Code dropdown button.
3. Select HTTPS.
4. Copy the repository link.
5. Open your preferred IDE (ensure Git is installed).
6. In the terminal, run:   git clone copied-git-url

The project will now be cloned locally for you to use.


1. Navigate to the GitHub Repository you want to clone
2. Click on the code drop down button
3. Click on HTTPS
4. Copy the repository link to the clipboard
5. Open your IDE of choice (git must be installed for the next steps)
6. Type git clone copied-git-url into the IDE terminal

The project will now be cloned locally for you to use.