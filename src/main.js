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
var mouseX = 0;
var mouseY = 0;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("inkRunCanvas");
    const ctx = canvas.getContext("2d");

    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);
    document.body.addEventListener("mousemove", mouseMoveHandler);
    document.body.addEventListener("mousedown", mouseDownHandler);
    document.body.addEventListener("mouseup", mouseUpHandler);
    
    var player = new Player(96, canvas.height - 192, ctx);
    var game = new Game(canvas, ctx, player, Levels);
    var goal = new Goal(game.currentLevel.goal.x, game.currentLevel.goal.y, ctx);
    
    let currentLevelTerrain = [];
    game.currentLevel.terrain.forEach(terrain => {
        currentLevelTerrain.push(new Terrain(terrain.x, terrain.y, terrain.height, terrain.width, ctx));
    });

    let currentLevelHazards = [];
    game.currentLevel.hazards.forEach(hazard => {
        currentLevelHazards.push(new Hazard(hazard.x, hazard.y, hazard.type, ctx));
    });

    let currentLevelDrawings = [];

    function frameHandler() {
        ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
        if (player.x < goal.x + 32 && player.x > goal.x &&
            player.y < goal.y + 32 && player.y > goal.y) {
            game.nextLevel();
            startLevel();
        }
        currentLevelTerrain.forEach(terrain => {
            terrain.draw();
        });
        currentLevelHazards.forEach(hazard => {
            hazard.update();
            hazard.draw();
        })
        if (mousePressed && mouseOffPlayer()) {
            if (game.inkGauge > 0) {
                currentLevelDrawings.push(new Drawing(mouseX, mouseY, ctx))
                game.inkGauge -= 1;
            } else {
                game.inkGauge = 0;
            }
        }
        game.drawInkGauge();
        currentLevelDrawings.forEach(drawing => {
            drawing.draw();
            drawing.hazardCollisionCheck(currentLevelHazards);
        })
        goal.draw();
        player.collisionCheck(currentLevelTerrain, currentLevelDrawings);
        player.hazardCollisionCheck(currentLevelHazards);
        player.update(leftPressed, rightPressed, upPressed);
        player.draw();
        game.drawLevelMarker();
        requestAnimationFrame(frameHandler);
    }

    function keyDownHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        else if (e.key == "w" || e.key == "ArrowUp" || e.key == "Space") {
            upPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
        else if (e.key == "w" || e.key == "ArrowUp") {
            upPressed = false;
        }
        else if (e.key == "r") {
            reset();
        }
    }

    function mouseMoveHandler(e) {
        if (e.clientX > 0 && e.clientX < 900) {
            mouseX = e.clientX;
        }
        
        if (e.clientY > 0 && e.clientY < 600) {
            mouseY = e.clientY;
        }
    }

    function mouseDownHandler() {
        mousePressed = true;
    }

    function mouseUpHandler() {
        mousePressed = false;
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
        player.y = canvas.height - 192;
        currentLevelDrawings = [];
        game.inkGauge = 100;
    }

    function startLevel() {
        player.x = 96;
        player.y = canvas.height - 192;
        currentLevelTerrain = [];
        currentLevelDrawings = [];
        game.inkGauge = 100;
        game.currentLevel.terrain.forEach(terrain => {
            currentLevelTerrain.push(new Terrain(terrain.x, terrain.y, terrain.height, terrain.width, ctx));
        });
        game.currentLevel.hazards.forEach(hazard => {
            currentLevelHazards.push(new Hazard(hazard.x, hazard.y, hazard.height, hazard.width, ctx));
        })
    }

    frameHandler();
})