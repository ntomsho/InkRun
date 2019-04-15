class Drawing {
    constructor(x, y, prevX, prevY, ctx) {
        this.x = x;
        this.y = y;
            this.prevX = prevX;
            this.prevY = prevY;
        this.height = 16;
        this.width = 16;
        this.color = "black";
        this.ctx = ctx;
        this.draw = this.draw.bind(this);
    }

    hazardCollisionCheck(drawingHazards) {
        const drawingTop = this.y - this.height / 2;
        const drawingBottom = this.y + this.height / 2;
        const drawingLeft = this.x - this.width / 2;
        const drawingRight = this.x + this.width / 2;

        drawingHazards.forEach(hazard => {
            const hazardTop = hazard.y - hazard.height / 2;
            const hazardBottom = hazard.y + hazard.height / 2;
            const hazardLeft = hazard.x - hazard.width / 2;
            const hazardRight = hazard.x + hazard.width / 2;

            if (drawingRight >= hazardLeft && drawingLeft <= hazardRight && drawingTop <= hazardBottom && drawingBottom >= hazardTop) {
                if (hazard.type === 'eraser' || hazard.type === 'drop') {
                    this.y = 800;
                    this.prevY = 800;
                }
            }
        })
    }

    draw() {
        this.ctx.beginPath();

        //Change this to take prevX/Y and make
        //a for loop creating circles with X and Y getting
        //closer to this.x/y by one pixel each until they're
        //both equal.

        this.ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Drawing;