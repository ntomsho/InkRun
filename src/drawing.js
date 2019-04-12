class Drawing {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
        this.color = "black";
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 16, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Drawing;