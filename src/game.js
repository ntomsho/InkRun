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
    }

    drawInkGauge() {
        this.ctx.beginPath();
        this.ctx.rect(772, 568, 32, -(this.inkGauge));
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

};

export default Game;