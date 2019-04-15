var levels = [

    //Level 0
    {
        terrain: [
            {
                x: 128,
                y: 518,
                height: 32,
                width: 128
            },
            {
                x: 204,
                y: 486,
                height: 64,
                width: 32
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
            },
            {
                x: 474,
                y: 250,
                height: 32,
                width: 32
            },
            {
                x: 490,
                y: 186,
                height: 32,
                width: 32
            },
            {
                x: 240,
                y: 358,
                height: 32,
                width: 32
            }
        ],

        hazards: [
            {
                x: 300,
                y: 518,
                type: 'spikesup'
            },
            {
                x: 450,
                y: 250,
                type: 'spikesleft'
            },
            {
                x: 514,
                y: 186,
                type: 'spikesright'
            },
            {
                x: 240,
                y: 382,
                type: 'spikesdown'
            },
            {
                x: 450,
                y: 314,
                type: 'eraser'
            },
            {
                x: 384,
                y: 96,
                type: 'whiteout'
            }
        ],
        
        goal:
            {
                x: 740,
                y: 96
            }
    },

    //Level 1
    {
        terrain: [
            {
                x: 128,
                y: 568,
                height: 32,
                width: 128
            },
        ]
    }

]

export default levels;