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
        if (hasMilestone("s", 1)) keep.push("milestones")
        if (hasMilestone("s", 1)) keep.push("upgrades")
        if (hasMilestone("s", 1)) keep.push(player.s.points)
        if (layers[reset].row > this.row) layerDataReset("s", keep)
    },
    passiveGeneration() {
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
    requires: new Decimal(1e50), // Can be a function that takes requirement increases into account
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
        "Main": {
            content: [
            "main-display",
            "resource-display",
            "blank",
            ["display-text",
                'Chapter 1: Space!', { "color": "MediumOrchid", "font-size": "32px"}],
              "blank",
              "blank",
            "prestige-button",
            ["display-text",
              '(One time reset)', { "color": "white", "font-size": "16px"}],
            "blank",
            ["display-text",
              'This layer never resets', { "color": "white", "font-size": "14px"}],
         ],
     },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "upgrades",
        ],
     },
     "Milestones": {
        content: [
        "main-display",
        "blank",
        "milestones",
    ],
 },
 },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        10: {
            title: "Comet Booster",
            description: "x3 Comets",
            cost: new Decimal(3.5e6),
            unlocked() {return (hasMilestone("c", 4))},
        },
        11: {
            title: "Rocket Fuel Booster",
            description: "x5 Rocket Fuel",
            cost: new Decimal(50),
        },
        12: {
            title: "Rocket Booster",
            description: "/3 Rocket Price",
            cost: new Decimal(50),
        },
        13: {
            title: "Astronaut Booster",
            description: "x2 Astronauts",
            cost: new Decimal(50),
        },
        14: {
            title: "Asteroid Booster",
            description: "x3 Asteroids",
            cost: new Decimal(3.5e6),
            unlocked() {return (hasMilestone("ast", 5))},
        },
        20: {
            title: "Comet Booster+",
            description: "x5 Comets",
            cost: new Decimal(1e7),
            unlocked() {return (hasMilestone("c", 4)) && (hasUpgrade("s", 10))},
        },
        21: {
            title: "Rocket Fuel Booster+",
            description: "x10 Rocket Fuel",
            cost: new Decimal(750),
            unlocked() {return (hasUpgrade(this.layer, 11))},
        },
        22: {
            title: "Rocket Booster+",
            description: "/5 Rocket Price",
            cost: new Decimal(750),
            unlocked() {return (hasUpgrade(this.layer, 12))},
        },
        23: {
            title: "Rocket Booster+",
            description: "x4 Astronauts",
            cost: new Decimal(750),
            unlocked() {return (hasUpgrade(this.layer, 13))},
        },
        24: {
            title: "Asteroid Booster+",
            description: "x5 Asteroids",
            cost: new Decimal(1e7),
            unlocked() {return (hasMilestone("ast", 5)) && (hasUpgrade("s", 14))},
        },
        30: {
            title: "Comet Booster++",
            description: "x10 Comets",
            cost: new Decimal(3e7),
            unlocked() {return (hasMilestone("c", 4)) && (hasUpgrade("s", 20))},
        },
        31: {
            title: "Rocket Fuel Booster++",
            description: "x20 Rocket Fuel",
            cost: new Decimal(10000),
            unlocked() {return (hasUpgrade(this.layer, 21))},
        },
        32: {
            title: "Rocket Booster++",
            description: "/10 Rocket Price",
            cost: new Decimal(10000),
            unlocked() {return (hasUpgrade(this.layer, 22))},
        },
        33: {
            title: "Rocket Booster++",
            description: "x10 Astronauts",
            cost: new Decimal(10000),
            unlocked() {return (hasUpgrade(this.layer, 23))},
        },
        34: {
            title: "Asteroid Booster++",
            description: "x10 Asteroids",
            cost: new Decimal(3e7),
            unlocked() {return (hasMilestone("ast", 5)) && (hasUpgrade("s", 24))},
        },
        40: {
            title: "Comet Booster 3000",
            description: "x25 Comets",
            cost: new Decimal(1e8),
            unlocked() {return (hasMilestone("c", 4)) && (hasUpgrade("s", 30))},
        },
        41: {
            title: "Space Comets",
            description: "x5 Comets",
            cost: new Decimal(125000),
            unlocked() {return (hasMilestone("c", 3))},
        },
        42: {
            title: "Mega Booster",
            description: "x100 Money, x50 Rocket Fuel, /25 Rocket Price & x25 Astronauts",
            cost: new Decimal(100000),
            unlocked() {return (hasUpgrade(this.layer, 31)) && (hasUpgrade(this.layer, 32)) && (hasUpgrade(this.layer, 33))},
        },
        43: {
            title: "Space Asteroids",
            description: "x5 Asteroids",
            cost: new Decimal(125000),
            unlocked() {return (hasMilestone("ast", 3))},
        },
        44: {
            title: "Asteroid Booster 3000",
            description: "x25 Asteroids",
            cost: new Decimal(1e8),
            unlocked() {return (hasMilestone("ast", 5)) && (hasUpgrade("s", 34))},
        },
        52: {
            title: "Mega Ultra Booster",
            description: "x499 Money, x199 Rocket Fuel, /99 Rocket Price & x74.99 Astronauts",
            cost: new Decimal(749999),
            unlocked() {return (hasUpgrade(this.layer, 41)) && (hasUpgrade(this.layer,42)) && (hasUpgrade(this.layer, 43)) && (hasMilestone("s", 8))},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Enter Space",
            effectDescription: "1 Space Distance/s & x5 Money",
            done() {return player.s.points.gte(1)}
        },
         2: {
           requirementDescription: "250 Space Distance & 1 Astronaut",
           effectDescription: "3 Space Distance/s & x2 Astronauts",
           unlocked() { return (hasMilestone(this.layer, 1))},
           done() {return player.s.points.gte(250) && player.as.points.gte(1)}
        },
        3: {
            requirementDescription: "1,000 Space Distance & 15 Rockets",
            effectDescription: "10 Space Distance/s & 1 New Rockets Upgrade",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.s.points.gte(1000) && player.ro.points.gte(15)}
         },
         4: {
            requirementDescription: "5,000 Space Distance & 18 Rockets",
            effectDescription: "50 Space Distance/s & 25% of Astronauts/s",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.s.points.gte(5000) && player.ro.points.gte(18)}
         },
         5: {
            requirementDescription: "44,444 Space Distance & 1e80 Rocket Fuel",
            effectDescription: "250 Space Distance/s & x2 Comets & Asteroids",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.s.points.gte(44444) && player.r.points.gte(1e80)}
         },
         6: {
            requirementDescription: "151,515 Space Distance & 5e14 Astronauts",
            effectDescription: "1,000 Space Distance/s & x10 Astronauts",
            unlocked() { return (hasMilestone(this.layer, 5))},
            done() {return player.s.points.gte(151515) && player.as.points.gte(5e14)}
         },
         7: {
            requirementDescription: "999,999 Space Distance",
            effectDescription: "7,500 Space Distance/s & x3 Comets & Asteroids",
            unlocked() { return (hasMilestone(this.layer, 6))},
            done() {return player.s.points.gte(999999)}
         },
         8: {
            requirementDescription: "15,000,000 Space Distance & 22 Rockets",
            effectDescription: "40,000 Space Distance/s & 1 New Space Upgrade",
            unlocked() { return (hasMilestone(this.layer, 7))},
            done() {return player.s.points.gte(15000000) && player.ro.points.gte(22)}
         },
    }
})