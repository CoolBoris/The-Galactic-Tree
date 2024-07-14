addLayer("ast", {
    name: "Asteroids", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☄️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('as', 4) || player.ast.unlocked) visible = true
       return visible
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

        // Softcaps
        if (player.ast.points.gte(100000)) mult = mult.pow(0.88)
        if (player.ast.points.gte(5e6)) mult = mult.pow(0.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "t", description: "T: Press for Asteroid Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Milestones": {
            content: [
            "main-display",
            "prestige-button",
            "blank",
            "milestones",
        ],
        },
        "Upgrades": {
            content: [
            "main-display",
            "prestige-button",
            "blank",
            "upgrades"
         ],
         "Asteroids": {
            content: [
            "main-display",
            "challenges"
         ],
         unlocked() { return (hasMilestone('ast', 5))}
        }
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
            requirementDescription: "??? Asteroids",
            effectDescription: "Unlock Asteroid Psyche (coming soon)",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.ast.points.gte(1e100)}
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
            description: "Comets gain is increased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(175),
            effect() {
                return player.ast.points.add(1).pow(0.17)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    }
})
