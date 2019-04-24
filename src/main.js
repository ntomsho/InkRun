import Player from './player.js';
import Game from './game.js';
import Terrain from './terrain.js';
import Drawing from './drawing.js';
import Levels from './levels.js';
import Goal from './goal.js';
import Hazard from './hazard.js';

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var mousePressed = false;
var paused = false;
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;

document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("inkRunCanvas");
    var ctx = canvas.getContext("2d");

    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    document.body.addEventListener("mousemove", mouseMoveHandler);
    document.body.addEventListener("mousedown", mouseDownHandler);
    document.body.addEventListener("mouseup", mouseUpHandler);
    
    var player = new Player(96, canvas.height - 96, ctx);
    var game = new Game(canvas, ctx, player, Levels);
    var goal = new Goal(game.currentLevel.goal.x, game.currentLevel.goal.y, ctx);

    let currentLevelTerrain = [];
    let currentLevelHazards = [];
    let currentLevelDrawings = [];

    startLevel();

    function frameHandler() {
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

        if (mousePressed && mouseOffPlayer()) {
            if (game.inkGauge > 0) {
                currentLevelDrawings.push(new Drawing(mouseX, mouseY, ctx))
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

        game.drawInkGauge();
        currentLevelDrawings.forEach(drawing => {
            drawing.draw();
            drawing.hazardCollisionCheck(currentLevelHazards);
        });
        goal.draw();
        player.collisionCheck(currentLevelTerrain, currentLevelDrawings);
        player.hazardCollisionCheck(currentLevelHazards);
        if (player.dead === false && game.won === false && paused === false) {
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
            if (player.dead === false) {
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
        if (e.which === 1) {
            mousePressed = true;
        }
    }

    function mouseUpHandler(e) {
        if (e.which === 1) {
            mousePressed = false;
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

    function reset() {
        player.dead = false;
        player.x = 96
        player.y = canvas.height - 96;
        currentLevelDrawings = [];
        game.inkGauge = 75;
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
        game.inkGauge = 75;
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

    frameHandler();
});

var audio = document.getElementById("audio");
var audioStartStop = document.getElementById("audio-button");

audioStartStop.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
})