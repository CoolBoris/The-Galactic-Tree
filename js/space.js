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
        if (hasMilestone("s", 1) ) keep.push("upgrades")
        if (hasMilestone("s", 1) ) keep.push("milestones")
        if (layers[reset].row > this.row) layerDataReset("r", keep)
    },
    passiveGeneration() {
        if (hasMilestone('s', 3)) return 30
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
            "prestige-button",
            ["display-text",
              '(One time reset)', { "color": "white", "font-size": "16px"}],
         ],
     },
        "Upgrades": {
            content: [
            "main-display",
            ["display-text",
                '(Upgrades never resets)', { "color": "white", "font-size": "16px"}],
            "blank",
            "upgrades",
        ],
     },
     "Milestones": {
        content: [
        "main-display",
        ["display-text",
            '(Milestones never resets)', { "color": "white", "font-size": "16px"}],
        "blank",
        "milestones",
    ],
 },
 },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "s", description: "S: Press for Space Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
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
        41: {
            title: "Mega Booster",
            description: "x100 Money, x50 Rocket Fuel, /25 Rocket Price & x25 Astronauts",
            cost: new Decimal(100000),
            unlocked() {return (hasUpgrade(this.layer, 31)) && (hasUpgrade(this.layer, 32)) && (hasUpgrade(this.layer, 33))},
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
            requirementDescription: "20,000 Space Distance & 18 Rockets",
            effectDescription: "30 Space Distance/s & 25% of Astronauts/s",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.s.points.gte(20000) && player.ro.points.gte(18)}
         },
    }
})