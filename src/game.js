class Game {
    constructor(canvas, ctx, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.inkGauge = 75;
        this.gameOver = false;
        this.levels = levels;
        this.currentLevelIdx = 0;
        this.currentLevel = this.levels[this.currentLevelIdx];
        this.won = false;
    };

    nextLevel() {
        this.currentLevelIdx += 1;
        this.currentLevel = this.levels[this.currentLevelIdx];
    }

    drawInkGauge() {
        this.ctx.beginPath();
        this.ctx.rect(772, 532, 32, -(this.inkGauge));
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.rect(772,532,32, -75);
        this.ctx.stroke();

        this.ctx.font = "20px Times New Roman";
        this.ctx.fillStyle = "white";
        this.ctx.fillText('I', 784, 480);
        this.ctx.fillText('N', 781, 500);
        this.ctx.fillText('K', 781, 520);
    }

    drawLevelMarker() {
        this.ctx.font = "30px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Level ${this.currentLevelIdx + 1}`, 96, 96);
    }

    //Change alpha modal
    drawPause() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.2;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "gray";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();

        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Paused', 300, 305);
    }

    //Change alpha modal
    drawDeathText() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.2;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle ="gray";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        
        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Press R to try again', 106, 305);
    }

    //Change alpha modal
    drawWinText() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.2;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "gray";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();

        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = "gold";
        this.ctx.fillText('You Win!', 106, 305);
    }

};

export default Game;