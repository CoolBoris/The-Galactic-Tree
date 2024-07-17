addLayer("s", {
    name: "Space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌌", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    doReset(reset) {
        let keep = [];
        if (hasMilestone("inf", 11)) keep.push("milestones")
        if (hasMilestone("inf", 11)) keep.push("upgrades")
        if (hasMilestone("inf", 11)) keep.push(player.s.points)
        if (layers[reset].row > this.row) layerDataReset("s", keep)
    },

    passiveGeneration() {
        if (hasMilestone('s', 10)) return 5e6
        if (hasMilestone('s', 8)) return 200000
        if (hasMilestone('s', 8)) return 40000
        if (hasMilestone('s', 7)) return 7500
        if (hasMilestone('s', 6)) return 1000
        if (hasMilestone('s', 5)) return 250
        if (hasMilestone('s', 4)) return 50
        if (hasMilestone('s', 3)) return 10
        if (hasMilestone('s', 2)) return 3
        if (hasMilestone('s', 1)) return 1
        return 0
    },
    layerShown(){
        let visible = false
        if (hasMilestone('ro', 15) || player.s.unlocked) visible = true
       return visible
     },
     branches: ["ro", "as", "r"], 
    color: "#8E00FF",
    nodeStyle() {return {
        "background": "radial-gradient(#8E00FF, #810081)" ,
        "width": "125px",
        "height": "125px",
    }},
    resetDescription: "Launch a Rocket into space! ",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Space Distance", // Name of prestige currency
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    tabFormat: {
        "Enter Space": {
            content: [
            "blank",
            "prestige-button",
            "blank",
            ["display-text",
                '(One time reset)', { "color": "white", "font-size": "16px"}],
            ],
     },
        "Main": {
            content: [
            ["display-text",
            'Chapter 1: Space!', { "color": "MediumOrchid", "font-size": "32px"}],
            "blank",
            "blank",
            "main-display",
            "resource-display",
           "blank",
            ["display-text",
              '1 Space Distance = 1m (1000 Space Distance = 1km)', { "color": "white", "font-size": "16px"}],
            "blank",
            ["display-text",
              'This layer never resets', { "color": "white", "font-size": "14px"}],
         ],
         unlocked() {return player.s.points.gte(1)}
     },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "upgrades",
        ],
        unlocked() {return player.s.points.gte(1)}
     },
     "Milestones": {
        content: [
        "main-display",
        "blank",
        "milestones",
    ],
    unlocked() {return player.s.points.gte(1)}
 },
 },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "Comet Booster",
            description: "3x Comets",
            cost: new Decimal(1e6),
            unlocked() {return (hasMilestone("c", 2))},
        },
        12: {
            title: "Rocket Fuel Booster",
            description: "5x Rocket Fuel",
            cost: new Decimal(50),
        },
        13: {
            title: "Rocket Booster",
            description: "/3 Rocket Price",
            cost: new Decimal(50),
        },
        14: {
            title: "Astronaut Booster",
            description: "2x Astronauts",
            cost: new Decimal(50),
        },
        15: {
            title: "Asteroid Booster",
            description: "3x Asteroids",
            cost: new Decimal(1e6),
            unlocked() {return (hasMilestone("ast", 2))},
        },
        21: {
            title: "Comet Booster+",
            description: "5x Comets",
            cost: new Decimal(5e6),
            unlocked() {return (hasMilestone("c", 2)) && (hasUpgrade("s", 11))},
        },
        22: {
            title: "Rocket Fuel Booster+",
            description: "10x Rocket Fuel",
            cost: new Decimal(500),
            unlocked() {return (hasUpgrade(this.layer, 12))},
        },
        23: {
            title: "Rocket Booster+",
            description: "/5 Rocket Price",
            cost: new Decimal(500),
            unlocked() {return (hasUpgrade(this.layer, 13))},
        },
        24: {
            title: "Rocket Booster+",
            description: "4x Astronauts",
            cost: new Decimal(500),
            unlocked() {return (hasUpgrade(this.layer, 14))},
        },
        25: {
            title: "Asteroid Booster+",
            description: "5x Asteroids",
            cost: new Decimal(5e6),
            unlocked() {return (hasMilestone("ast", 2)) && (hasUpgrade("s", 15))},
        },
        31: {
            title: "Comet Booster++",
            description: "10x Comets",
            cost: new Decimal(2e7),
            unlocked() {return (hasMilestone("c", 2)) && (hasUpgrade("s", 21))},
        },
        32: {
            title: "Rocket Fuel Booster++",
            description: "20x Rocket Fuel",
            cost: new Decimal(7500),
            unlocked() {return (hasUpgrade(this.layer, 22))},
        },
        33: {
            title: "Rocket Booster++",
            description: "/10 Rocket Price",
            cost: new Decimal(7500),
            unlocked() {return (hasUpgrade(this.layer, 23))},
        },
        34: {
            title: "Rocket Booster++",
            description: "10x Astronauts",
            cost: new Decimal(7500),
            unlocked() {return (hasUpgrade(this.layer, 24))},
        },
        35: {
            title: "Asteroid Booster++",
            description: "10x Asteroids",
            cost: new Decimal(2e7),
            unlocked() {return (hasMilestone("ast", 2)) && (hasUpgrade("s", 25))},
        },
        41: {
            title: "Comet Booster 3000",
            description: "25x Comets",
            cost: new Decimal(5e7),
            unlocked() {return (hasMilestone("c", 4)) && (hasUpgrade("s", 31))},
        },
        42: {
            title: "Space Comets",
            description: "5x Comets",
            cost: new Decimal(500000),
            unlocked() {return (hasMilestone("c", 1))},
        },
        43: {
            title: "Mega Booster",
            description: "100x Money, 50x Rocket Fuel, /25 Rocket Price & 25x Astronauts",
            cost: new Decimal(100000),
            unlocked() {return (hasUpgrade(this.layer, 32)) && (hasUpgrade(this.layer, 33)) && (hasUpgrade(this.layer, 34))},
        },
        44: {
            title: "Space Asteroids",
            description: "5x Asteroids",
            cost: new Decimal(500000),
            unlocked() {return (hasMilestone("ast", 1))},
        },
        45: {
            title: "Asteroid Booster 3000",
            description: "25x Asteroids",
            cost: new Decimal(5e7),
            unlocked() {return (hasMilestone("ast", 4)) && (hasUpgrade("s", 35))},
        },
        51: {
            title: "Mega Ultra Booster",
            description: "500x Money, 200x Rocket Fuel, /100 Rocket Price & 75x Astronauts",
            cost: new Decimal(1e9),
            unlocked() {return (hasUpgrade(this.layer, 42)) && (hasUpgrade(this.layer,43)) && (hasUpgrade(this.layer, 44)) && (hasMilestone("s", 9))},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Entering Space",
            effectDescription: "1 Space Distance/s & 3x Money",
            done() {return player.s.points.gte(1)}
        },
         2: {
           requirementDescription: "250 Space Distance (250m) & 5 Rockets",
           effectDescription: "3 Space Distance/s & 2x Astronauts",
           unlocked() { return (hasMilestone(this.layer, 1))},
           done() {return player.s.points.gte(250) && player.ro.points.gte(5)}
        },
        3: {
            requirementDescription: "1,000 Space Distance (1km) & 1e9 Astronauts",
            effectDescription: "10 Space Distance/s & 1 New Rockets Upgrade",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.s.points.gte(1000) && player.as.points.gte(1e9)}
         },
         4: {
            requirementDescription: "3,333 Space Distance (3.333km) & 15 Rockets",
            effectDescription: "50 Space Distance/s & 25% of Astronauts/s",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.s.points.gte(3333) && player.ro.points.gte(15)}
         },
         5: {
            requirementDescription: "15,000 Space Distance (15km) & 1e40 Rocket Fuel",
            effectDescription: "250 Space Distance/s",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.s.points.gte(15000) && player.r.points.gte(1e40)}
         },
         6: {
            requirementDescription: "50,000 Space Distance (50km)",
            effectDescription: "1,000 Space Distance/s",
            unlocked() { return (hasMilestone(this.layer, 5))},
            done() {return player.s.points.gte(50000)}
         },
         7: {
            requirementDescription: "300,000 Space Distance (300km) & 1e30 Astronauts",
            effectDescription: "7,500 Space Distance/s & 3x Comets & Asteroids",
            unlocked() { return (hasMilestone(this.layer, 6))},
            done() {return player.s.points.gte(300000) && player.as.points.gte(1e30)}
         },
         8: {
            requirementDescription: "1,500,000 Space Distance (1,500km) & 10 Comets & Asteroids",
            effectDescription: "40,000 Space Distance/s & 500% of Rocket Fuel/s",
            unlocked() { return (hasMilestone(this.layer, 7))},
            done() {return player.s.points.gte(1500000) && player.c.points.gte(10) && player.ast.points.gte(10)}
         },
         9: {
            requirementDescription: "10,000,000 Space Distance (10,000km) & 1,000,000 Comets & Asteroids",
            effectDescription: "200,000 Space Distance/s & 1 New Space Upgrade",
            unlocked() { return (hasMilestone(this.layer, 8))},
            done() {return player.s.points.gte(1e7) && player.c.points.gte(1e6) && player.ast.points.gte(1e6)}
         },
         10: {
            requirementDescription: "???",
            effectDescription: "5,000,000 Space Distance/s & Unlock ??? (coming soon)",
            unlocked() { return (hasMilestone(this.layer, 9))},
            done() {return player.s.points.gte(1e100)}
         },
    }
})