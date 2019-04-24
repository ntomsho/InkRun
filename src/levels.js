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
    

    //Level 2
    {
        terrain: [
            {
                x: 128,
                y: 518,
                height: 32,
                width: 128
            },
            {
                x: 350,
                y: 300,
                height: 128,
                width: 128
            },
            {
                x: 630,
                y: 250,
                height: 160,
                width: 32
            },
            {
                x: 740,
                y: 144,
                height: 32,
                width: 128
            }
        ],

        hazards: [
            {
                x: 278,
                y: 344,
                type: 'spikesleft'
            },
            {
                x: 278,
                y: 314,
                type: 'spikesleft'
            },
            {
                x: 278,
                y: 284,
                type: 'spikesleft'
            },
            {
                x: 278,
                y: 254,
                type: 'spikesleft'
            },

            {
                x: 422,
                y: 344,
                type: 'spikesright'
            },
            {
                x: 422,
                y: 314,
                type: 'spikesright'
            },
            {
                x: 422,
                y: 284,
                type: 'spikesright'
            },
            {
                x: 422,
                y: 254,
                type: 'spikesright'
            },

            {
                x: 306,
                y: 230,
                type: 'spikesup'
            },
            {
                x: 336,
                y: 230,
                type: 'spikesup'
            },
            {
                x: 366,
                y: 230,
                type: 'spikesup'
            },
            {
                x: 396,
                y: 230,
                type: 'spikesup'
            },

            {
                x: 306,
                y: 371,
                type: 'spikesdown'
            },
            {
                x: 336,
                y: 371,
                type: 'spikesdown'
            },
            {
                x: 366,
                y: 371,
                type: 'spikesdown'
            },
            {
                x: 396,
                y: 371,
                type: 'spikesdown'
            },

            {
                x: 606,
                y: 188,
                type: 'spikesleft'
            },
            {
                x: 606,
                y: 218,
                type: 'spikesleft'
            },
            {
                x: 606,
                y: 248,
                type: 'spikesleft'
            },
            {
                x: 606,
                y: 278,
                type: 'spikesleft'
            },
            {
                x: 606,
                y: 308,
                type: 'spikesleft'
            },
        ],

        goal:
        {
            x: 740,
            y: 96
        }
    },
    
    //Level 3
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
                x: 225,
                y: 300,
                width: 320,
                height: 32
            }
        ],

        hazards: [
            {
                x: 300,
                y: 200,
                type: 'eraser'
            },
            {
                x: 600,
                y: 400,
                type: 'eraser'
            }
        ],

        goal:
        {
            x: 740,
            y: 96
        }
    },
    
    //Level 4
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
                x: 208,
                y: 470,
                height: 64,
                width: 32
            },
            {
                x: 416,
                y: 518,
                height: 32,
                width: 384
            },
            {
                x: 624,
                y: 470,
                height: 64,
                width: 32
            }
        ],

        hazards: [
            {
                x: 300,
                y: 100,
                type: 'whiteout'
            },
            {
                x: 400,
                y: 250,
                type: 'whiteout'
            },
            {
                x: 500,
                y: 100,
                type: 'whiteout'
            },

            {
                x: 256,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 286,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 316,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 346,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 376,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 406,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 436,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 466,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 496,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 526,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 556,
                y: 494,
                type: 'spikesup'
            },
            {
                x: 586,
                y: 494,
                type: 'spikesup'
            }
        ],
        
        goal:
        {
            x: 740,
            y: 96
        }
    },
    
    //Level 5
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
            },
            {
                x: 600,
                y: 450,
                height: 124,
                width: 124
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
                y: 251,
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
            },
            {
                x: 556,
                y: 96,
                type: 'whiteout'
            },

            {
                x: 530,
                y: 406,
                type: 'spikesleft'
            },
            {
                x: 530,
                y: 436,
                type: 'spikesleft'
            },
            {
                x: 530,
                y: 466,
                type: 'spikesleft'
            },
            {
                x: 530,
                y: 496,
                type: 'spikesleft'
            },
            {
                x: 554,
                y: 381,
                type: 'spikesup'
            },
            {
                x: 584,
                y: 381,
                type: 'spikesup'
            },
            {
                x: 614,
                y: 381,
                type: 'spikesup'
            },
            {
                x: 644,
                y: 381,
                type: 'spikesup'
            }
        ],
        
        goal:
            {
                x: 740,
                y: 96
            }
    }

]

export default levels;