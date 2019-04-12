class Game {
    constructor(canvas, ctx, player, levels) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.gameOver = false;
        this.levels = levels;
        this.currentLevel = this.levels[0];
    };

};

export default Game;