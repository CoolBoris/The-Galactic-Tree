addLayer("ast", {
    name: "Asteroids", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☄️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('planets', 1)) return getBuyableAmount('planets', 11) /100
        if (hasMilestone('ast', 5)) return 0.01
        return 0
    },
    layerShown(){
        let visible = false
        if (hasMilestone('as', 4) || player.ast.unlocked) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11)) visible = false
       return visible
     },
     autoUpgrade() {
        if (hasMilestone("planets", 5)) return true
        if (hasMilestone("omegainf", 7)) return true
        else return false
    },
    doReset(reset) {
        let keep = [];
        if (hasMilestone("planets", 3)) keep.push("challenges")
        if (hasMilestone("x", 3)) keep.push("milestones")
        if (layers[reset].row > this.row) layerDataReset("ast", keep)
    },
     color: "#F1DD4A",
     nodeStyle() {return {
        "background": "radial-gradient(#E99A19, #F1DD4A)" ,
    }},
 branches: ["as", "s"], 
    requires: new Decimal(1e29), // Can be a function that takes requirement increases into account
    resource: "Asteroids", // Name of prestige currency
    baseResource: "Astronauts", // Name of resource prestige is based on
    baseAmount() {return player.as.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 15)) mult = mult.times(3)
        if (hasUpgrade('s', 25)) mult = mult.times(5)
        if (hasUpgrade('s', 35)) mult = mult.times(10)
        if (hasUpgrade('s', 45)) mult = mult.times(25)
        if (hasUpgrade('s', 44)) mult = mult.times(5)        
        if (hasMilestone('s', 7)) mult = mult.times(3)
        if (hasUpgrade('c', 15)) mult = mult.times(upgradeEffect('c', 15))
        if (hasChallenge('ast', 12)) mult = mult.times(100)
        if (hasMilestone('planets', 1)) mult = mult.times(buyableEffect("planets", 12))
        if (hasUpgrade('planets', 15)) mult = mult.times(upgradeEffect('planets', 15))
        if (hasUpgrade('x', 15)) mult = mult.times(1000)   

        // Inf
	    if (hasMilestone('inf', 9)) mult = mult.times(3)
            if (hasMilestone('megainf', 6)) mult = mult.times(5)

        // Softcaps
        if (player.ast.points.gte(100000)) mult = mult.pow(0.88)
        if (player.ast.points.gte(5e6)) mult = mult.pow(0.5)
        if (player.ast.points.gte(1e9)) mult = mult.pow(0.9)
        if (player.ast.points.gte(1e20)) mult = mult.pow(0.5)
        if (player.ast.points.gte(1e30)) mult = mult.pow(0.5)
        if (player.ast.points.gte(1e40)) mult = mult.pow(0.4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "t", description: "T: Press for Asteroid Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
            "main-display",
            "blank",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
            ["infobox", "main"],
            ]
        },
        "Milestones": {
            content: [
            "main-display",
            "blank",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
            "milestones",
        ],
        },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
            "upgrades"
         ],
        },
         "Asteroids": {
            content: [
            "main-display",
            "challenges"
         ],
         unlocked() { return (hasChallenge('c', 14))}
        },
  },
    milestones: {
        1: {
            requirementDescription: "40 Asteroids",
            effectDescription: "Unlock 1 New Space Upgrade",
            done() {return player.ast.points.gte(40)}
        },
        2: {
            requirementDescription: "600 Asteroids",
            effectDescription: "Unlock 3 New Space Upgrades",
            unlocked() { return (hasMilestone(this.layer, 1))},
            done() {return player.ast.points.gte(600)}
        },
        3: {
            requirementDescription: "100,000 Asteroids",
            effectDescription: "Keep Astronaut Milestones on Reset",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.ast.points.gte(100000)}
        },
        4: {
            requirementDescription: "500,000 Asteroids",
            effectDescription: "Unlock 1 New Space Upgrade",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.ast.points.gte(500000)}
        },
        5: {
            requirementDescription: "1e10 Asteroids",
            effectDescription: "1% of Asteroids & Comets/s",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.ast.points.gte(1e10)}
        },
    },
    upgrades: {
        11: {
            title: "Search for Asteroids",
            description: "5x Astronauts",
            cost: new Decimal(1),
        },
        12: {
            title: "Asteroids Research Equipment",
            description: "x10 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(8),
        },
        13: {
            title: "Astronaut Enhancement",
            description: "Astronaut gain is increased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(14),
            effect() {
                return player.ast.points.add(1).pow(0.26)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        14: {
            title: "Tracking Asteroids",
            description: "10x Astronauts",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(30),
        },
        15: {
            title: "Comet Infusion",
            description: "Comet gain is increased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(175),
            effect() {
                return player.ast.points.add(1).pow(0.17)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "Halley's Asteroid",
            description: "Money gain is Increased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 15)) && (hasChallenge("c", 11))},
            cost: new Decimal(1e7),
            effect() {
                return player.ast.points.add(1).pow(0.34)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        22: {
            title: "Sell Asteroids",
            description: "1000x Money",
            cost: new Decimal(1.5e7),
            unlocked() { return (hasUpgrade(this.layer, 21)) && (hasChallenge("c", 14))},
        },
        23: {
            title: "Astronaut Asteroids",
            description: "Rocket cost is decreased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 22)) && (hasChallenge("c", 14))},
            cost: new Decimal(5e7),
            effect() {
                return player.c.points.add(1).pow(0.32)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        24: {
            title: "Astronauts Discovery",
            description: "100x Astronauts",
            cost: new Decimal(5e13),
            unlocked() { return (hasUpgrade(this.layer, 23)) && (hasChallenge("ast", 13))},
        },
        25: {
            title: "Money Asteroids",
            description: "100x Money",
            cost: new Decimal(1e14),
            unlocked() { return (hasUpgrade(this.layer, 24)) && (hasChallenge("ast", 13))},
        },
    },
    challenges: {
        11: {
            name: "Asteroid Icarus",
            challengeDescription: "^0.25 Money & ^0.25 Rocket Fuel",
            canComplete: function() {return player.ro.points.gte(11)},
            goalDescription: "11 Rockets",
            rewardDescription: "Unlock Asteroid Eros & Unlock 1 New Comet Upgrade",
        },
        12: {
            name: "Asteroid Eros",
            challengeDescription: "^0.005 Rocket Fuel",
            canComplete: function() {return player.ro.points.gte(18)},
            goalDescription: "18 Rockets",
            unlocked() { return (hasChallenge(this.layer, 11))},
            rewardDescription: "Unlock Asteroid Pallas & 100x Asteroids",
        },
        13: {
            name: "Asteroid Pallas",
            challengeDescription: "You cant earn Rockets",
            canComplete: function() {return player.points.gte(1e68)},
            goalDescription: "1e68 Money",
            unlocked() { return (hasChallenge(this.layer, 12))},
            rewardDescription: "Unlock Asteroid Ceres & Unlock 2 New Asteroid Upgrades",
        },
        14: {
            name: "Asteroid Ceres",
            challengeDescription: "^0.1 Money",
            canComplete: function() {return player.ro.points.gte(16)},
            goalDescription: "16 Rockets",
            unlocked() { return (hasChallenge(this.layer, 13))},
            rewardDescription: "Unlock Stars & Unlock 2 New Comet Upgrades",
        },
    },
    infoboxes: {
        main: {
            title: "Introducing: Asteroids",
            body() { return "Asteroids Reset everything from layer 1 & 2. Asteroids are Used for Upgrades & Milestones. After a while, you will unlock Challenges. Challenges are objectives you need to complete while having a debuf, in return you get rewards!" },
        },
    },
})
