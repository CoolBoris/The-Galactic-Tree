addLayer("r", {
    name: "Rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⛽", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    passiveGeneration() {
        if (hasMilestone('ro', 14)) return 2.5
        if (hasMilestone('as', 1)) return 1
        if (hasMilestone('ro', 7)) return 0.5
        if (hasMilestone('ro', 6)) return 0.2
        if (hasMilestone('ro', 5)) return 0.1
        if (hasMilestone('ro', 4)) return 0.05
        return 0
    },
    doReset(reset) {
        let keep = [];
        if (hasMilestone("as", 2) ) keep.push("upgrades")
        if (layers[reset].row > this.row) layerDataReset("r", keep)
    },
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
        if (hasUpgrade('r', 14)) mult = mult.times(1.75)
        if (hasUpgrade('r', 21)) mult = mult.times(1.5)
        if (hasUpgrade('r', 22)) mult = mult.times(1.2)
        if (hasUpgrade('r', 23)) mult = mult.times(1.5)
        if (hasMilestone('ro', 2)) mult = mult.times(2)
        if (hasUpgrade('r', 32)) mult = mult.times(upgradeEffect('r', 32))
        if (hasMilestone('ro', 3)) mult = mult.times(2)
        if (hasUpgrade('r', 34)) mult = mult.times(4)
        if (hasUpgrade('r', 35)) mult = mult.times(upgradeEffect('r', 35))
        if (hasUpgrade('ro', 13)) mult = mult.times(upgradeEffect('ro', 13))
        if (hasUpgrade('as', 13)) mult = mult.times(2)
        if (hasUpgrade('as', 14)) mult = mult.times(upgradeEffect('as', 14))
        if (hasUpgrade('as', 25)) mult = mult.times(5)
        if (hasUpgrade('r', 41)) mult = mult.times(upgradeEffect('r', 41))
        if (hasUpgrade('r', 42)) mult = mult.times(upgradeEffect('r', 42))
        if (hasUpgrade('r', 43)) mult = mult.times(1.1)
        if (hasUpgrade('r', 44)) mult = mult.times(1.01)
        if (hasUpgrade('r', 45)) mult = mult.times(upgradeEffect('r', 45))
        if (hasUpgrade('as', 33)) mult = mult.times(upgradeEffect('as', 33))
        if (hasUpgrade('s', 11)) mult = mult.times(5)
        if (hasUpgrade('s', 21)) mult = mult.times(10)
        if (hasUpgrade('s', 31)) mult = mult.times(20)
        if (hasUpgrade('s', 41)) mult = mult.times(50)
        if (hasUpgrade('as', 34)) mult = mult.times(upgradeEffect('as', 34))
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
            description: "x1.75 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(10),
        },
        15: {
            title: "Better Rocket Fuel",
            description: "Rocket Fuel gain is increased based on money",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.1)
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
            description: "x1.2 Rocket Fuel lol",
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
            title: "Unlock something new",
            description: "x3 Money & a new feature..",
            unlocked() { return (hasUpgrade(this.layer, 24))},
            cost: new Decimal(400),
        },
        31: {
            title: "Fuel the Rockets",
            description: "x5 Money",
            unlocked() { return (hasMilestone('ro', 2)) && (hasUpgrade(this.layer, 25))},
            cost: new Decimal(1000),
        },
        32: {
            title: "Enhance Rocket Fuel",
            description: "Rocket Fuel gain is increased based Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 31))},
            cost: new Decimal(2200),
            effect() {
                return player.r.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        33: {
            title: "Superfuel the Rockets",
            description: "x10 Money",
            unlocked() { return (hasMilestone('ro', 3)) && (hasUpgrade(this.layer, 32))},
            cost: new Decimal(10000),
        },
        34: {
            title: "Superfuel the Rockets",
            description: "x4 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 33))},
            cost: new Decimal(70000),
        },
        35: {
            title: "Rocketed Rocket Fuel",
            description: "Rocket Fuel gain is increased based on Money",
            unlocked() { return (hasMilestone('ro', 6)) && (hasUpgrade(this.layer, 34))},
            cost: new Decimal(10000000),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
         41: {
            title: "MOAR Rocket Fuel!",
            description: "Rocket Fuel gain is increased based on Astronauts",
            unlocked() { return (hasUpgrade('as', 25)) && (hasUpgrade(this.layer, 35))},
            cost: new Decimal(5e40),
            effect() {
                return player.as.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        42: {
            title: "I SAID MORE",
            description: "Rocket Fuel gain is increased based on Rockets",
            unlocked() { return (hasUpgrade('as', 25)) && (hasUpgrade(this.layer, 41))},
            cost: new Decimal(1e43),
            effect() {
                return player.ro.points.add(1).pow(1.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        43: {
            title: "maybe a little bit more",
            description: "x1.1 Rocket Fuel",
            unlocked() { return (hasUpgrade('as', 25)) && (hasUpgrade(this.layer, 42))},
            cost: new Decimal(1e46),
        },
        44: {
            title: "a tiny bit more",
            description: "x1.01 Rocket Fuel",
            unlocked() { return (hasUpgrade('as', 25)) && (hasUpgrade(this.layer, 43))},
            cost: new Decimal(1.5e46),
        },
        45: {
            title: "MOREEEEEE!!!!",
            description: "Rocket Fuel gain is increased based on Rocket Fuel",
            unlocked() { return (hasUpgrade('as', 25)) && (hasUpgrade(this.layer, 44))},
            cost: new Decimal(4e46),
            effect() {
                return player.r.points.add(1).pow(0.07)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
})
