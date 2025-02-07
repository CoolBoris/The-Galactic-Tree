addLayer("as", {
    name: "Astronauts", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "🧑‍🚀"
        else symbol = "A"
        return symbol
    },
    milestonePopups(){
        let popup = true
        if (options.AstronautMilestonePopup == true) popup = true;
        else popup = false
        return popup
    },
    layerShown(){
        let visible = false
        if (hasMilestone('ro', 8) || player.as.unlocked) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11) || inChallenge("x", 11)) visible = false
       return visible
     },
     passiveGeneration() {
        if (inChallenge('x', 11)) return 0
        if (inChallenge("stars", 11) || inChallenge("planets", 11)) return 0
        if (hasMilestone('s', 10)) return 1
        if (hasMilestone('ast', 4)) return 0.5
        if (hasMilestone('s', 4)) return 0.25
        if (hasMilestone('ro', 13)) return 0.1
        return 0
    },
    doReset(reset) {
        let keep = [];
        if (hasMilestone("ast", 3)) keep.push("milestones")
        if (layers[reset].row > this.row) layerDataReset("as", keep)
    },
    autoUpgrade() {
        if (inChallenge('x', 11)) return false
        
        if (hasMilestone("stars", 5)) return true
        if (hasMilestone("omegainf", 4)) return true
        else return false
    },
 branches: ["ro", "r"], 
    color: "#EFEFEF",
    requires: new Decimal(1e13), // Can be a function that takes requirement increases into account
    resource: "Astronauts", // Name of prestige currency
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone('ro', 9)) mutl = mult.times(1.5)
        if (hasMilestone('ro', 10)) mult = mult.times(1.5)
        if (hasMilestone('ro', 12)) mult = mult.times(2)
        if (hasMilestone('ro', 17)) mult = mult.times(2)
        if (hasMilestone('ro', 19)) mult = mult.times(3)
        if (hasMilestone('s', 2) && ! inChallenge("x", 11)) mult = mult.times(2)
        if (hasUpgrade('ro', 14)) mult = mult.times(upgradeEffect('ro', 14))
        if (hasUpgrade('s', 14)  && ! inChallenge("x", 11)) mult = mult.times(2)
        if (hasUpgrade('s', 24) && ! inChallenge("x", 11)) mult = mult.times(4)
        if (hasUpgrade('s', 34) && ! inChallenge("x", 11)) mult = mult.times(10)
        if (hasUpgrade('s', 43) && ! inChallenge("x", 11)) mult = mult.times(25)
        if (hasMilestone('s', 2) && ! inChallenge("x", 11)) mult = mult.times(5)
        if (hasUpgrade('as', 12)) mult = mult.times(3)
        if (hasUpgrade('as', 13)) mult = mult.times(5)
        if (hasUpgrade('as', 14)) mult = mult.times(3)
        if (hasUpgrade('as', 22)) mult = mult.times(5)
        if (hasUpgrade('as', 23)) mult = mult.times(8)
        if (hasUpgrade('s', 51) && ! inChallenge("x", 11)) mult = mult.times(75)
        if (hasUpgrade('ast', 11)) mult = mult.times(5) 
        if (hasUpgrade('ast', 13)) mult = mult.times(upgradeEffect('ast', 13))
        if (hasUpgrade('ast', 14)) mult = mult.times(10)
        if (hasUpgrade('ast', 23)) mult = mult.times(upgradeEffect('ast', 23))
        if (hasUpgrade('ast', 24)) mult = mult.times(100)
        if (hasUpgrade('stars', 14)) mult = mult.times(upgradeEffect('stars', 14))
        if (hasUpgrade('planets', 14)) mult = mult.times(upgradeEffect('planets', 14))
        if (hasMilestone('s', 14) && ! inChallenge("x", 11)) mult = mult.times(1e6)
        if (hasUpgrade('boosts', 13) && inChallenge("x", 11)) mult = mult.times(10)


        // Inf
	    if (hasMilestone('inf', 7)) mult = mult.times(3)

        // Challenges
        
        // Softcaps
        if (player.as.points.gte(10000)) mult = mult.pow(0.88)
        if (player.as.points.gte(1e10)) mult = mult.pow(0.82)
        if (player.as.points.gte(1e12)) mult = mult.pow(0.7)
        if (player.as.points.gte(1e15)) mult = mult.pow(0.65)
        if (player.as.points.gte(1e20)) mult = mult.pow(0.1)
        if (player.as.points.gte(1e30)) mult = mult.pow(0.0001)
        if (player.as.points.gte(1e35)) mult = mult.pow(0.01)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "a", description: "A: Press for Astronaut Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
         ],
     },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
            "upgrades"
         ],
     },
        "Milestones": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
            "milestones",
        ],
     },
 },
    milestones: {
        1: {
            requirementDescription: "750 Astronauts",
            effectDescription: "100% of Rocket Fuel/s & 1 New Rocket Upgrade",
            done() {return player.as.points.gte(750)}
        },
        2: {
            requirementDescription: "500,000 Astronauts",
            effectDescription: "Keep Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 1))},
            done() {return player.as.points.gte(500000)}
        },
        3: {
            requirementDescription: "500,000,000 Astronauts",
            effectDescription: "Unlock 1 Rocket Upgrade",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.as.points.gte(5e8)}
        },
        4: {
            requirementDescription: "1e29 Astronauts",
            effectDescription: "Unlock Asteroids",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.as.points.gte(1e29)}
        },
    },
    upgrades: {
    11: {
        title: "The First Astronaut",
        description: "5x Money & 2x Rocket Fuel",
        cost: new Decimal(1),
    },
    12: {
        title: "Basic Training Facility",
        description: "10x Money & 3x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 11))},
        cost: new Decimal(8),
    },
    13: {
        title: "Trained Astronauts",
        description: "5x Rocket fuel & 5x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 12))},
        cost: new Decimal(75),
    },
    14: {
        title: "Basic Space School",
        description: "Rocket cost is greatly decreased based on money",
        unlocked() { return (hasUpgrade(this.layer, 13))},
        cost: new Decimal(1500),
        effect() {
            return player.points.add(1).pow(0.47)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
    },
    15: {
        title: "Skilled Astronauts",
        description: "3x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 14))},
        cost: new Decimal(60000),
    },
    21: {
        title: "Increase Salary",
        description: "Money gain is increased based on Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 15))},
        cost: new Decimal(200000),
        effect() {
            return player.as.points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
    },
    22: {
        title: "Enhanced Training Facility",
        description: "5x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 21))},
        cost: new Decimal(1e6),
    },
    23: {
        title: "Professional Astronauts",
        description: "8x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 22))},
        cost: new Decimal(7e6),
    },
    24: {
        title: "Enhanced Space School",
        description: "Rocket cost is decreased based on Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 23))},
        cost: new Decimal(1e8),
        effect() {
            return player.as.points.add(1).pow(0.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
    },
    25: {
        title: "Scientist Astronauts",
        description: "100x Money & 10x Rocket Fuel",
        unlocked() { return (hasUpgrade(this.layer, 24))},
        cost: new Decimal(1e11),
    },
    31: {
        title: "Outer Space Explorers",
        description: "10,000x Rocket Fuel",
        unlocked() { return (hasUpgrade(this.layer, 25) && hasUpgrade("boosts", 14))},
        cost: new Decimal(5e15),
    },
    32: {
        title: "Advanced Training Facility",
        description: "100x Rocket Fuel",
        unlocked() { return (hasUpgrade(this.layer, 31) && hasUpgrade("boosts", 15))},
        cost: new Decimal(1e22),
    },
},
infoboxes: {
    main: {
        title: "Introducing: Astronauts",
        body() { return "This layer is nothing new, it's the same as Rocket Fuel. Astronauts also use Rocket Fuel instead of Money." },
    },
}
})
