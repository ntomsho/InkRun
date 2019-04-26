class Game {
    constructor(canvas, ctx, difficultyMod, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.inkGauge = 75 * difficultyMod;
        this.gameOver = false;
        this.levels = levels;
        this.currentLevelIdx = 0;
        this.currentLevel = this.levels[this.currentLevelIdx];
        this.started = false;
        this.won = false;
        this.colors = {"black": 0, "cyan": 0, "red": 0, "yellow": 0, "purple": 0, "green": 0}
    };

    nextLevel() {
        this.currentLevelIdx += 1;
        this.currentLevel = this.levels[this.currentLevelIdx];
    }

    drawInkGauge(color, difficultyMod) {
        this.ctx.beginPath();
        this.ctx.rect(772, 532, 32, -(this.inkGauge / difficultyMod));
        this.ctx.fillStyle = color;
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
        this.ctx.rect(this.canvas.width / 4, this.canvas.height / 4, this.canvas.width / 2, this.canvas.height / 2);
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
        this.ctx.rect(75, this.canvas.height / 4, this.canvas.width - 150, this.canvas.height / 2);
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
        this.ctx.globalAlpha = 0.6;
        this.ctx.rect(0, 175, 900, 235);
        this.ctx.fillStyle = "gray";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();

        let favoriteColor = null;
        let colorCount = 0;
        Object.keys(this.colors).forEach(color => {
            if (this.colors[color] > colorCount) {
                favoriteColor = color;
                colorCount = this.colors[color];
            }
        })

        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = "gold";
        this.ctx.fillText('You Win!', 106, 315);

        this.ctx.font = "20px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Your favorite color was:', 500, 250);
        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = favoriteColor;
        this.ctx.fillText(favoriteColor, 500, 350);
    }

};

export default Game;