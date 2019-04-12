import Player from './player.js';
import Game from './game.js';
import Terrain from './terrain.js';
import Drawing from './drawing.js';
import Levels from './levels.js';

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

    const player = new Player(96, canvas.height-192, ctx);
    const game = new Game(canvas, ctx, player, Levels);
    
    let currentLevelTerrain = [];
    game.currentLevel.terrain.forEach(terrain => {
        currentLevelTerrain.push(new Terrain(terrain.x, terrain.y, terrain.height, terrain.width, ctx));
    });

    let currentLevelDrawings = [];

    function frameHandler() {
        ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
        currentLevelTerrain.forEach(terrain => {
            terrain.draw();
        });
        if (mousePressed) {
            currentLevelDrawings.push(new Drawing(mouseX, mouseY, ctx));
        }
        currentLevelDrawings.forEach(drawing => {
            drawing.draw();
        })
        player.collisionCheck(currentLevelTerrain);
        player.update(leftPressed, rightPressed, upPressed);
        player.draw();
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

    frameHandler();
})