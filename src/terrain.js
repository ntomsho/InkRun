class Terrain {
    constructor(x, y, height, width, ctx) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = "gray";
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Terrain;