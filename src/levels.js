var levels = [

    //Level 0
    {
        terrain: [
            {
                x: 128,
                y: 568,
                height: 32,
                width: 128
            },
            {
                x: 204,
                y: 536,
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
                y: 592,
                height: 32,
                width: 32
            },
            {
                x: 474,
                y: 300,
                height: 32,
                width: 32
            },
            {
                x: 490,
                y: 236,
                height: 32,
                width: 32
            },
            {
                x: 240,
                y: 408,
                height: 32,
                width: 32
            }
        ],

        hazards: [
            {
                x: 300,
                y: 568,
                type: 'spikesup'
            },
            {
                x: 450,
                y: 300,
                type: 'spikesleft'
            },
            {
                x: 514,
                y: 236,
                type: 'spikesright'
            },
            {
                x: 240,
                y: 432,
                type: 'spikesdown'
            },
            {
                x: 450,
                y: 364,
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