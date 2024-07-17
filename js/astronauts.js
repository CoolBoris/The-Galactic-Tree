addLayer("as", {
    name: "Astronauts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧑‍🚀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    layerShown(){
        let visible = false
        if (hasMilestone('ro', 8) || player.as.unlocked) visible = true
       return visible
     },
     passiveGeneration() {
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
        if (hasMilestone('s', 2)) mult = mult.times(2)
        if (hasUpgrade('ro', 14)) mult = mult.times(upgradeEffect('ro', 14))
        if (hasUpgrade('s', 14)) mult = mult.times(2)
        if (hasUpgrade('s', 24)) mult = mult.times(4)
        if (hasUpgrade('s', 34)) mult = mult.times(10)
        if (hasUpgrade('s', 43)) mult = mult.times(25)
        if (hasMilestone('s', 2)) mult = mult.times(5)
        if (hasUpgrade('as', 12)) mult = mult.times(3)
        if (hasUpgrade('as', 13)) mult = mult.times(5)
        if (hasUpgrade('as', 14)) mult = mult.times(3)
        if (hasUpgrade('as', 22)) mult = mult.times(5)
        if (hasUpgrade('as', 23)) mult = mult.times(8)
        if (hasUpgrade('s', 51)) mult = mult.times(75)
        if (hasUpgrade('ast', 11)) mult = mult.times(5) 
        if (hasUpgrade('ast', 13)) mult = mult.times(upgradeEffect('ast', 13))
        if (hasUpgrade('ast', 14)) mult = mult.times(10)
        if (hasMilestone('inf', 7)) mult = mult.times(2)
        if (hasMilestone('inf', 8)) mult = mult.times(2)
        if (hasMilestone('inf', 9)) mult = mult.times(2)

        // Softcaps
        if (player.as.points.gte(10000)) mult = mult.pow(0.88)
        if (player.as.points.gte(1e10)) mult = mult.pow(0.82)
        if (player.as.points.gte(1e12)) mult = mult.pow(0.7)
        if (player.as.points.gte(1e15)) mult = mult.pow(0.65)
        if (player.as.points.gte(1e20)) mult = mult.pow(0.1)
        if (player.as.points.gte(1e30)) mult = mult.pow(0.0001)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "a", description: "A: Press for Astronaut Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Upgrades": {
            content: [
            "main-display",
            "resource-display",
            "prestige-button",
            "blank",
            "upgrades"
         ],
     },
        "Milestones": {
            content: [
            "main-display",
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
            effectDescription: "Keep Rocket Fuel Upgrades on Layer 2 reset",
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
            effectDescription: "Unlock something new",
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
        title: "Untrained Astronauts",
        description: "10x Money & 3x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 11))},
        cost: new Decimal(8),
    },
    13: {
        title: "Training Astronauts",
        description: "5x Rocket fuel & 5x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 12))},
        cost: new Decimal(75),
    },
    14: {
        title: "Rocket Astronauts",
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
        title: "Engineering Astronauts",
        description: "Money gain is increased based on Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 15))},
        cost: new Decimal(200000),
        effect() {
            return player.as.points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
    },
    22: {
        title: "Higher Salary",
        description: "5x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 21))},
        cost: new Decimal(1e6),
    },
    23: {
        title: "Astronaut Benefits",
        description: "8x Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 22))},
        cost: new Decimal(7e6),
    },
    24: {
        title: "Rocket Astronauts+",
        description: "Rocket cost is decreased based on Astronauts",
        unlocked() { return (hasUpgrade(this.layer, 23))},
        cost: new Decimal(1e8),
        effect() {
            return player.as.points.add(1).pow(0.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
    },
    25: {
        title: "Scientific Astronauts",
        description: "100x Money & 10x Rocket Fuel",
        unlocked() { return (hasUpgrade(this.layer, 24))},
        cost: new Decimal(1e11),
    },
}
})
