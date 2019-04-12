class Game {
    constructor(canvas, ctx, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.inkGauge = 100;
        this.gameOver = false;
        this.levels = levels;
        this.currentLevel = this.levels[0];
    };

    nextLevel() {
        this.currentLevel += 1;
    }

};

export default Game;