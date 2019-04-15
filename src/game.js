class Game {
    constructor(canvas, ctx, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.inkGauge = 150;
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
        this.ctx.rect(772, 568, 32, -(this.inkGauge));
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawLevelMarker() {
        this.ctx.font = "30px Zapfino";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Level ${this.currentLevelIdx + 1}`, 96, 96);
    }

};

export default Game;