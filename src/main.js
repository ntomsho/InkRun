import Player from './player.js';
import Game from './game.js';
import Terrain from './terrain.js';
import Drawing from './drawing.js';
import Levels from './levels.js';
import Goal from './goal.js';
import Hazard from './hazard.js';

//Iniitalize variables & event listeners
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var mousePressed = false;
var paused = false;
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var difficultyMod = 1;

document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("inkRunCanvas");
    var ctx = canvas.getContext("2d");
    setColorSelectors();
    var penColor = "black";

    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    document.body.addEventListener("mousemove", mouseMoveHandler);
    document.body.addEventListener("mousedown", mouseDownHandler);
    document.body.addEventListener("mouseup", mouseUpHandler);
    
    var player = new Player(96, canvas.height - 96, ctx);
    var game = new Game(canvas, ctx, difficultyMod, player, Levels);
    var goal = new Goal(game.currentLevel.goal.x, game.currentLevel.goal.y, ctx);

    let currentLevelTerrain = [];
    let currentLevelHazards = [];
    let currentLevelDrawings = [];

    startLevel();

    function frameHandler() {
        //per frame logic
        ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
        
        if (player.x < goal.x + 32 && player.x > goal.x &&
            player.y < goal.y + 32 && player.y > goal.y) {
            if (game.currentLevelIdx < 4) {
                game.nextLevel();
                startLevel();
            } else {
                game.won = true;;
            }
        }

        currentLevelTerrain.forEach(terrain => {
            terrain.draw();
        });

        currentLevelHazards.forEach(hazard => {
            if (player.dead === false && paused == false) {
                hazard.update();
            }
            hazard.draw();
        })
        
        if (game.started === true && mousePressed && mouseOffPlayer()) {
            if (game.inkGauge > 0) {
                currentLevelDrawings.push(new Drawing(mouseX, mouseY, penColor, ctx));
                game.colors[penColor] += 1;
                if (prevMouseX < mouseX + 8 && prevMouseX > mouseX - 8 &&
                prevMouseY < mouseY + 4 && prevMouseY > mouseY - 4) {
                    game.inkGauge -= 0.2;
                } else {
                    game.inkGauge -= 1.5;
                }
            } else {
                game.inkGauge = 0;
            }
        }

        game.drawInkGauge(penColor, difficultyMod);
        currentLevelDrawings.forEach(drawing => {
            drawing.draw();
            drawing.hazardCollisionCheck(currentLevelHazards);
        });
        goal.draw();
        player.collisionCheck(currentLevelTerrain, currentLevelDrawings);
        player.hazardCollisionCheck(currentLevelHazards);
        if (game.started === true && player.dead === false && game.won === false && paused === false) {
            player.update(leftPressed, rightPressed, upPressed);
        }
        player.draw();
        game.drawLevelMarker();
        if (paused === true) {
            game.drawPause();
        }
        if (player.dead === true) {
            game.drawDeathText();
        }
        if (game.won === true) {
            game.drawWinText()
        }
        requestAnimationFrame(frameHandler);
    }

    //Control handlers
    function keyDownHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        else if (e.key == "w" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if (e.key == "p" || e.key == "e") {
            if (player.dead === false && game.won === false) {
                paused === true ? paused = false : paused = true;
            }
        }
    }

    function keyUpHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
        else if (e.key == "w" || e.key == "ArrowUp" || e.key == ' ') {
            upPressed = false;
        }
        else if (e.key == "r" && paused === false) {
            reset();
        }
    }

    function mouseMoveHandler(e) {
        var rect = canvas.getBoundingClientRect();
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }

    function mouseDownHandler(e) {
        if (e.which === 1 &&
            mouseX > 0 && mouseX < 800 &&
            mouseY > 25 && mouseY < 535) {
            mousePressed = true;
            sound.play();
        }
    }

    function mouseUpHandler(e) {
        if (e.which === 1) {
            mousePressed = false;
            sound.pause();
        }
    }

    function mouseOffPlayer() {
        if ((mouseX < player.x + 32 && mouseX > player.x - 32) &&
        (mouseY < player.y + 32 && mouseY > player.y - 32)) {
            return false;
        } else {
            return true;
        }
    }

    //Game admin
    var startButtons = Array.from(document.getElementsByClassName("start-button"));
    var startModal = document.getElementById("gif-modal");
    startButtons.forEach(button => {
        button.addEventListener("click", () => {
            switch(button.id){
                case "easy":
                    difficultyMod = 2;
                    break
                case "medium":
                    difficultyMod = 1;
                    break
                case "hard":
                    difficultyMod = 0.33;
                    break
            }
            startModal.style = "display: none";
            startButtons.forEach(button => {
                button.style = "display: none";
            })
            game.inkGauge = 75 * difficultyMod;
            game.started = true;
        })
    })

    function reset() {
        player.dead = false;
        player.x = 96
        player.y = canvas.height - 96;
        currentLevelDrawings = [];
        game.inkGauge = 75 * difficultyMod;
        if (game.won) {
            game.won = false;
            game.currentLevelIdx = 0;
            game.currentLevel = game.levels[game.currentLevelIdx];
            startLevel();
        }
    }

    function startLevel() {
        player.x = 96;
        player.y = canvas.height - 96;
        currentLevelTerrain = [];
        currentLevelHazards = [];
        currentLevelDrawings = [];
        game.inkGauge = 75 * difficultyMod;
        game.currentLevel.terrain.forEach(terrain => {
            currentLevelTerrain.push(new Terrain(terrain.x, terrain.y, terrain.height, terrain.width, ctx));
        });
        game.currentLevel.hazards.forEach(hazard => {
            currentLevelHazards.push(new Hazard(hazard.x, hazard.y, hazard.type, ctx));
            if (hazard.type === 'whiteout') {
                const whiteout = currentLevelHazards.slice(-1)[0];
                for (let i = 0; i < whiteout.numDrops; i++) {
                    const drop = new Hazard(hazard.x, 800, 'drop', ctx);
                    currentLevelHazards.push(drop);
                    whiteout.drops.push(drop);
                }
            }
        });
    }

    //Color
    function setColorSelectors() {
        var colorArray = []
        colorArray.push(document.getElementById("choice-black"));
        colorArray.push(document.getElementById("choice-cyan"));
        colorArray.push(document.getElementById("choice-red"));
        colorArray.push(document.getElementById("choice-yellow"));
        colorArray.push(document.getElementById("choice-purple"));
        colorArray.push(document.getElementById("choice-green"));

        colorArray.forEach(ele => {
            ele.addEventListener("click", () => {
                colorArray.forEach(subele => {
                    subele.classList.remove("active-color");
                })
                ele.classList.add("active-color");
                if (ele.id === "choice-black") {
                    penColor = "black";
                } else if (ele.id === "choice-cyan") {
                    penColor = "cyan";
                } else if (ele.id === "choice-red") {
                    penColor = "red";
                } else if (ele.id === "choice-yellow") {
                    penColor = "yellow";
                } else if (ele.id === "choice-purple") {
                    penColor = "purple";
                } else if (ele.id === "choice-green") {
                    penColor = "green";
                }
            })
        })
    }

    frameHandler();
});

//Audio
var audio = document.getElementById("audio");
audio.volume = 0.2;
var audioStartStop = document.getElementById("audio-button");
var sound = document.getElementById("sound");

audioStartStop.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
})