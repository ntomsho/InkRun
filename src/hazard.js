class Hazard {
    constructor(x,y,type,ctx) {
        this.x = x;
        this.y = y;
        this.type = type;
        if (this.type === 'spikesup' || this.type === 'spikesdown') {
            this.width = 32;
            this.height = 16;
        } else if (this.type === 'spikesleft' || this.type === 'spikesright') {
            this.width = 16;
            this.height = 32;
        } else if (this.type === 'eraser') {
            this.width = 64;
            this.height = 32;
            this.speed = 4;
        }
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    update() {
        switch (this.type) {
            case 'eraser':
                this.x += this.speed;
                if (this.x > 916) {
                    this.speed = -4;
                } else if (this.x < -16) {
                    this.speed = 4;
                }
            break;
        }
    }

    draw() {
        switch (this.type) {
            case 'eraser':
                this.ctx.beginPath();
                this.ctx.rect(this.x - 32, this.y - 16, this.width, this.height);
                this.ctx.fillStyle = 'pink';
                this.ctx.fill();
                this.ctx.closePath();
                break;
            case 'spikesup':
                this.ctx.beginPath();
                this.ctx.moveTo(this.x - 16, this.y + 8);
                this.ctx.lineTo(this.x - 8, this.y - 8);
                this.ctx.lineTo(this.x, this.y + 8);
                this.ctx.lineTo(this.x + 8, this.y - 8);
                this.ctx.lineTo(this.x + 16, this.y + 8);
                this.ctx.stroke();
                break;
            case 'spikesdown':
                this.ctx.beginPath();
                this.ctx.moveTo(this.x - 16, this.y - 8);
                this.ctx.lineTo(this.x - 8, this.y + 8);
                this.ctx.lineTo(this.x, this.y - 8);
                this.ctx.lineTo(this.x + 8, this.y + 8);
                this.ctx.lineTo(this.x + 16, this.y - 8);
                this.ctx.stroke();
                break;
            case 'spikesleft':
                this.ctx.beginPath();
                this.ctx.moveTo(this.x + 8, this.y - 16);
                this.ctx.lineTo(this.x - 8, this.y - 8);
                this.ctx.lineTo(this.x + 8, this.y);
                this.ctx.lineTo(this.x - 8, this.y + 8);
                this.ctx.lineTo(this.x + 8, this.y + 16);
                this.ctx.stroke();
                break;
            case 'spikesright':
                this.ctx.beginPath();
                this.ctx.moveTo(this.x - 8, this.y - 16);
                this.ctx.lineTo(this.x + 8, this.y - 8);
                this.ctx.lineTo(this.x - 8, this.y);
                this.ctx.lineTo(this.x + 8, this.y + 8);
                this.ctx.lineTo(this.x - 8, this.y + 16);
                this.ctx.stroke();
                break;
        }
    }
}

export default Hazard;