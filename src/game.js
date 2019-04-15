class Game {
    constructor(canvas, ctx, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.inkGauge = 100;
        this.gameOver = false;
        this.levels = levels;
        this.currentLevelIdx = 0;
        this.currentLevel = this.levels[this.currentLevelIdx];
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
    }

    drawLevelMarker() {
        this.ctx.font = "30px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Level ${this.currentLevelIdx + 1}`, 96, 96);
    }

    drawDeathText() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.2;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle ="gray";
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        this.ctx.closePath();
        
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.font = "50px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText('Press R to try again', 106, 305);
    }

};

export default Game;