class Player {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
        this.xAcceleration = 0;
        this.speed = 3;
        this.gravity = 5;
        this.jumpSpeed = -6;
        this.vspeed = 0;
        this.color = "blue";
        this.ctx = ctx;
        this.collisionObject = {};
        this.onGround = false;
        this.blockedLeft = false;
        this.blockedRight = false;
        this.blockedTop = false;
        this.jumping = false;
        this.jumpCounter = 0;
        this.didJump = false;
        this.dead = false;
        this.draw = this.draw.bind(this);
    }

    update(leftPressed, rightPressed, upPressed) {
        if (this.y > 600) {
            this.dead = true;
        }
        
        if (this.xAcceleration) {
            this.x += this.speed * this.xAcceleration;
        }

        if (leftPressed && !this.blockedLeft) {
            this.xAcceleration >= -1 ? this.xAcceleration -= 0.1 : this.xAcceleration = -1;
        } else if (rightPressed && !this.blockedRight) {
            this.xAcceleration <= 1 ? this.xAcceleration += 0.1 : this.xAcceleration = 1;
        } else if ((this.xAcceleration > 0 && this.blockedRight) || this.xAcceleration < 0 && this.blockedLeft) {
            this.xAcceleration = 0;
        } else {
            if (Math.abs(this.xAcceleration) < 0.1 || this.dead) {
                this.xAcceleration = 0;
            } else {
                this.xAcceleration < 0 ? this.xAcceleration += 0.1 : this.xAcceleration -= 0.1;
            }
        }

        if (upPressed === true && this.onGround !== false && this.didJump === false) {
            this.onGround = false;
            this.jumping = true;  
            this.didJump = true;
        }

        if (upPressed === false) {
            this.didJump = false;
        }
        
        if (this.onGround === false && this.jumping === false) {
            this.vspeed = this.gravity;
        } else if (this.onGround !== false) {
            this.vspeed = 0;
            this.jumpCounter = 0;
            if (this.blockedRight === false && this.blockedLeft === false) {
                this.y = this.collisionObject.groundCol;
            }
        } else if (this.jumping === true) {
            this.vspeed = this.jumpSpeed;
            this.jumpCounter += 1;
            if (this.jumpCounter >= 15 || this.blockedTop === true) {
                this.jumping = false;
            }
        }

        this.y += this.vspeed;
    }

    collisionCheck(currentLevelTerrain, currentLevelDrawings) {
        const playerTop = this.y - this.height / 2;
        const playerBottom = this.y + this.height / 2;
        const playerLeft = this.x - this.width / 2;
        const playerRight = this.x + this.width / 2;
        
        const totalTerrain = currentLevelTerrain.concat(currentLevelDrawings);

        this.collisionObject = {};

        totalTerrain.forEach(terrain => {
            const terrainTop = terrain.y - terrain.height / 2;
            const terrainBottom = terrain.y + terrain.height / 2;
            const terrainLeft = terrain.x - terrain.width / 2;
            const terrainRight = terrain.x + terrain.width / 2;
            
            if (playerRight >= terrainLeft && playerLeft <= terrainRight && playerTop <= terrainBottom && playerBottom >= terrainTop) {
                    this.collisionHandler(terrain);
                }
            })

        this.collisionObject.groundCol ? this.onGround = true : this.onGround = false;
        this.collisionObject.topCol ? this.blockedTop = true : this.blockedTop = false;
        this.collisionObject.leftCol ? this.blockedLeft = true : this.blockedLeft = false;
        this.collisionObject.rightCol ? this.blockedRight = true : this.blockedRight = false;
    }

    hazardCollisionCheck(currentLevelHazards) {
        const playerTop = this.y - this.height / 2;
        const playerBottom = this.y + this.height / 2;
        const playerLeft = this.x - this.width / 2;
        const playerRight = this.x + this.width / 2;

        currentLevelHazards.forEach(hazard => {
            const hazardTop = hazard.y - hazard.height / 2 + 3;
            const hazardBottom = hazard.y + hazard.height / 2 - 3;
            const hazardLeft = hazard.x - hazard.width / 2 + 3;
            const hazardRight = hazard.x + hazard.width / 2 - 3;

            if (playerRight >= hazardLeft && playerLeft <= hazardRight && playerTop <= hazardBottom && playerBottom >= hazardTop) {
                this.dead = true;
            }
        })
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

        let thisCollision = {};

        if (this.y < terrainTop - this.gravity 
            && this.jumping === false
            && playerRight > terrainLeft
            && playerLeft < terrainRight) {
            thisCollision.groundCol = terrainTop - this.height / 2;
        } 

        if (playerTop > terrainBottom + this.jumpSpeed) {
            thisCollision.topCol = true;
        } 

        if (this.x < terrainLeft && this.y <= terrainBottom && this.y >= terrainTop) {
            thisCollision.rightCol = true;
        } 

        if (this.x > terrainRight && this.y <= terrainBottom && this.y >= terrainTop) {
            thisCollision.leftCol = true;
        } 

        Object.assign(this.collisionObject, thisCollision);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        this.ctx.fillStyle = this.dead ? "gray" : this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Player;