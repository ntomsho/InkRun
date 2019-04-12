import Player from './player.js';
import Game from './game.js';
import Terrain from './terrain.js';

var rightPressed = false;
var leftPressed = false;
var upPressed = false;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("inkRunCanvas");
    const ctx = canvas.getContext("2d");

    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);

    const player = new Player(96, canvas.height-192, ctx);
    const platform = new Terrain(128, canvas.height - 32, 32, 128, ctx);
    const wall = new Terrain(236, canvas.height - 64, 96, 32, ctx);
    const game = new Game(canvas, ctx, player);

    function frameHandler() {
        ctx.clearRect(0,0, canvas.clientWidth, canvas.height);
        player.collisionCheck(platform);
        player.collisionCheck(wall);
        player.update(leftPressed, rightPressed, upPressed);
        player.draw();
        platform.draw();
        wall.draw();
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

    frameHandler();
})