class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
        this.speed = 3;
        this.gravity = 1;
        this.jumpSpeed = -6;
        this.vspeed = 0;
        this.color = "blue";
        this.ctx = ctx;
        this.onGround = true;
        this.jumping = false;
        this.jumpCounter = 0;
        this.blockedLeft = false;
        this.blockedRight = false;
        this.draw = this.draw.bind(this);
    }

    update(leftPressed, rightPressed, upPressed) {
        if (leftPressed === true && this.blockedLeft === false) {
            this.x -= this.speed;
        }
        if (rightPressed === true && this.blockedRight === false) {
            this.x += this.speed;
        }
        if (upPressed === true && this.onGround === true) {
            this.onGround = false;
            this.jumping = true;  
        }
        
        if (this.onGround === false && this.jumping === false) {
            this.vspeed = this.gravity;
        } else if (this.onGround === true) {
            this.vspeed = 0;
            this.jumpCounter = 0;
        } else if (this.jumping === true) {
            this.vspeed = this.jumpSpeed;
            this.jumpCounter += 1;
            if (this.jumpCounter >= 10) {
                this.jumping = false;
            }
        }

        this.y += this.vspeed;
    }

    collisionCheck(terrain) {
        const playerLeft = this.x - this.width / 2;
        const playerRight = this.x + this.width / 2;
        const terrainLeft = terrain.x - terrain.width / 2;
        const terrainRight = terrain.x + terrain.width / 2;

        const playerTop = this.y - this.height / 2;
        const playerBottom = this.y + this.height / 2;
        const terrainTop = terrain.y - terrain.height / 2;
        const terrainBottom = terrain.y + terrain.height / 2;
        
        if (playerRight >= terrainLeft && playerLeft <= terrainRight && playerTop <= terrainBottom && playerBottom >= terrainTop) {
                this.collisionHandler(terrain);
            } else {
                this.onGround = false;
                this.blockedLeft = false;
                this.blockedRight = false;
            }
    }

    collisionHandler(terrain) {
        const playerLeft = this.x - this.width / 2;
        const playerRight = this.x + this.width / 2;
        const terrainLeft = terrain.x - terrain.width / 2;
        const terrainRight = terrain.x + terrain.width / 2;

        const playerTop = this.y - this.height / 2;
        const playerBottom = this.y + this.height / 2;
        const terrainTop = terrain.y - terrain.height / 2;
        const terrainBottom = terrain.y + terrain.height / 2;

        if (this.y < terrainTop && this.jumping === false) {
            this.y = (terrain.y - (this.height / 2) - (terrain.height / 2));
            this.onGround = true;
        } else {
            this.onGround = false;
        }

        if (this.x < terrainLeft && playerTop <= terrainBottom && playerBottom >= terrainTop) {
            this.blockedRight = true;
        } else {
            this.blockedRight = false;
        }

        if (this.x > terrainRight && playerTop <= terrainBottom && playerBottom >= terrainTop) {
            this.blockedLeft = true;
        } else {
            this.blockedLeft = false;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Player;