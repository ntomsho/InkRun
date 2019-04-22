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
        } else if (this.type === 'whiteout') {
            this.width = 32;
            this.height = 96;
            this.dropCounter = 0;
            this.numDrops = 3;
            this.currentDrop = 0;
            this.drops = []
        } else if (this.type === 'drop') {
            this.width = 28;
            this.height = 28;
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
            case 'whiteout':
                this.dropCounter += 1
                if (this.dropCounter >= 100) {
                    this.dropCounter = 0;
                    this.drops[this.currentDrop].y = this.y + 48;
                    this.currentDrop === 2 ? this.currentDrop = 0 : this.currentDrop += 1;
                }
                break;
            case 'drop':
                this.y += 6;
                break;
        }
    }

    draw() {
        switch (this.type) {
            case 'whiteout':
                this.ctx.beginPath();
                this.ctx.rect(this.x - 16, this.y - 48, this.width, this.height);
                this.ctx.fillStyle = "gray";
                this.ctx.stroke();

                this.ctx.save();
                this.ctx.translate(this.x, this.y);
                this.ctx.rotate(270 * Math.PI / 180);
                this.ctx.font = "12px Arial";
                this.ctx.fillStyle = "black";
                this.ctx.fillText(`Titanium`, -24,-5);
                this.ctx.fillText(`Whiteout`, -25, 10);
                this.ctx.restore();
                break;
            case 'drop':
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
                this.ctx.stroke();
                break;
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