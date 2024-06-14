addLayer("r", {
    name: "rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⛽", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#97192E",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Rocket Fuel", // Name of prestige currency
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('r', 15)) mult = mult.times(upgradeEffect('r', 15))
        if (hasUpgrade('r', 14)) mult = mult.times(2)
        if (hasUpgrade('r', 21)) mult = mult.times(1.5)
        if (hasUpgrade('r', 22)) mult = mult.times(1.1)
        if (hasUpgrade('r', 23)) mult = mult.times(1.5)
        
        if (hasMilestone('ro', 1)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Press for Rocket Fuel Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Discover Rocket Fuel",
            description: "+1 money/s",
            cost: new Decimal(1),
        },
        12: {
            title: "Small Rocket Fuel Factory",
            description: "x2 Money",
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(2),
        },
        13: {
            title: "Upgrade Rocket Fuel Factory",
            description: "Money gain is increased based on your Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.28)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "New Rocket Fuel Recipe",
            description: "x2 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(10),
        },
        15: {
            title: "Better Rocket Fuel",
            description: "Rocket Fuel gain is increased based on money",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(20),
            effect() {
                return player[this.layer].points.add(1).pow(0.16)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "Rocket Fuel Factory+",
            description: "x1.5 Rocket Fuel and x2 Money",
            unlocked() { return (hasUpgrade(this.layer, 15))},
            cost: new Decimal(40),
        },
        22: {
            title: "lueF tekcoR",
            description: "x1.1 Rocket Fuel lol",
            unlocked() { return (hasUpgrade(this.layer, 21))},
            cost: new Decimal(69),
        },
        23: {
            title: "Hire Rocket Fuel Scientists",
            description: "x1.5 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 22))},
            cost: new Decimal(80),
        },
        24: {
            title: "Prepare...",
            description: "^1.05 Money",
            unlocked() { return (hasUpgrade(this.layer, 23))},
            cost: new Decimal(150),
        },
        25: {
            title: "Unlock Rockets",
            description: "what the title says.",
            unlocked() { return (hasUpgrade(this.layer, 24))},
            cost: new Decimal(500),
        },
    },
})
