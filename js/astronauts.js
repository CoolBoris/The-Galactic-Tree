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
 branches: ["ro", "r"], 
    color: "#EFEFEF",
    requires: new Decimal(1e13), // Can be a function that takes requirement increases into account
    resource: "Astronauts", // Name of prestige currency
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone('ro', 9)) mutl = mult.times(1.5)
        if (hasMilestone('ro', 10)) mult = mult.times(1.5)
        if (hasUpgrade('as', 13)) mult = mult.times(upgradeEffect('as', 13))
        if (hasMilestone('as', 2)) mult = mult.pow(-2.1)
        if (hasMilestone('as', 3)) mult = mult.pow(-0.5)
        if (hasMilestone('ro', 12)) mult = mult.times(2)
        if (hasMilestone('ro', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "A", description: "A: Press for Astronaut Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Upgrades": {
            content: [
            "main-display",
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
            requirementDescription: "250 Astronauts",
            effectDescription: "100% of Rocket Fuel/s & 1 New Rockets Upgrade",
            done() {return player.as.points.gte(250)}
        },
        2: {
            requirementDescription: "500,000 Astronauts",
            effectDescription: "Keep Rocket Fuel Upgrades on reset",
            done() {return player.as.points.gte(500000)}
        },
        3: {
            requirementDescription: "20,000,000 Astronauts",
            effectDescription: "Unlock 1 Rockets Upgrade",
            done() {return player.as.points.gte(20000000)}
        },
    },
    upgrades: {
        11: {
            title: "Rocket men!",
            description: "Money gain is increased based on Astronauts",
            cost: new Decimal(1),
            effect() {
                return player.as.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        12: {
            title: "More Rocket men",
            description: "Money gain is increased based on Astronauts",
            cost: new Decimal(8),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() {
                return player.as.points.add(1).pow(0.73)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        13: {
            title: "Trained Astronauts",
            description: "Astronauts gain is increased based on Rockets & x2 Rocket Fuel",
            cost: new Decimal(50),
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effect() {
                return player.ro.points.add(1).pow(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        14: {
            title: "Skilled Astronauts",
            description: "Rocket Fuel gain is increased based on Astronauts",
            cost: new Decimal(300000),
            unlocked() { return (hasUpgrade(this.layer, 13))},
            effect() {
                return player.as.points.add(1).pow(0.22)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        15: {
            title: "Rocket Astronauts",
            description: "Rocket cost is decreased based on Astronauts [COMING SOON, BETTER SOFTCAP NEEDED]",
            cost: new Decimal(1e999999999999999999),
            unlocked() { return (hasUpgrade(this.layer, 14))},
            effect() {
                return player.as.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
})
