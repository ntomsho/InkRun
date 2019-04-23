# InkRun

InkRun is a 2d platformer where the player must guide their character from a starting zone to the goal of each level by using their mouse to draw terrain that interacts with the player character and obstacles. Some obstacles may interact with the player's drawn terrain and the player's drawing ability is limited by an ink gauge that depletes as they draw. Moving the mouse slowly while drawing produces smooth lines that consume less ink.


## Technologies

InkRun runs in HTML5 Canvas, utilizing the built-in requestAnimationFrame() function to create an animated UI within the HTML page. CSS is used to style the page around the Canvas, including the background which is incorporated into the canvas to create the illusion of drawing on a piece of paper. Game logic is written in JavaScript and Webpack was used to bundle the JS files.

Below is an example of the game's collision logic, using simple math to calculate the bounding box of the player as well as each piece of terrain and drawing on the game board and checking for overlaps which are then resolved by the collisionHandler() function.
````collisionCheck(currentLevelTerrain, currentLevelDrawings) {
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
````

Levels are constructed through a series of nested arrays and objects that the engine iterates through when the level begins, creating instances of the Terrain, Hazard, and Goal classes, and adding them to an array to be rendered onto the canvas.
````
var levels = [

    //Level 1
    {
        terrain: [
            {
                x: 128,
                y: 518,
                height: 32,
                width: 128
            },
            {
                x: 740,
                y: 144,
                height: 32,
                width: 128
            },
            {
                x: 300,
                y: 542,
                height: 32,
                width: 32
            }
        ],
        
        hazards: [
            {
                x: 300,
                y: 518,
                type: 'spikesup'
            }
        ],
        
        goal:
        {
            x: 740,
            y: 96
        }
    },
````

## Running the Game

To play Inkrun, simply visit the [live site](http://ntomsho.github.io/InkRun). The game is already ready to play!

Control the blue square with either the WASD keys or the arrow keys.

Press "E" or "P" to pause the game.

Press "R" to restart the current level.
