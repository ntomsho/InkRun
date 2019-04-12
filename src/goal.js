class Goal {
    constructor(x,y,ctx) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 64;
        this.color = "gold";
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 4, this.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = "gray";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Goal;