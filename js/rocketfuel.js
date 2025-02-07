addLayer("r", {
    name: "Rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "⛽"
        else symbol = "RF"
        return symbol
    },
    layerShown(){
        let visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11)) visible = false
        if (inChallenge('x', 11)) visible = false
       return visible
     },
    passiveGeneration() {
        if (inChallenge('x', 11)) return 0
        if (hasMilestone('s', 11)) return 10
        if (hasMilestone('s', 8)) return 5
        if (hasMilestone('ro', 14)) return 2.5
        if (hasMilestone('as', 1)) return 1
        if (hasMilestone('ro', 9)) return 0.5
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
    autoUpgrade() {
        if (inChallenge('x', 11)) return false
        if (inChallenge("stars", 11) || inChallenge("planets", 11)) return false
        if (hasMilestone("stars", 4)) return true
        if (hasMilestone("omegainf", 2)) return true
        else return false
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
        if (hasUpgrade('r', 41)) mult = mult.times(upgradeEffect('r', 41))
        if (hasUpgrade('r', 42)) mult = mult.times(upgradeEffect('r', 42))
        if (hasUpgrade('r', 43)) mult = mult.times(1.1)
        if (hasUpgrade('r', 44)) mult = mult.times(1.01)
        if (hasUpgrade('r', 45)) mult = mult.times(upgradeEffect('r', 45))
        if (hasUpgrade('s', 12) && ! inChallenge("x", 11)) mult = mult.times(5)
        if (hasUpgrade('s', 22) && ! inChallenge("x", 11)) mult = mult.times(10)
        if (hasUpgrade('s', 32) && ! inChallenge("x", 11)) mult = mult.times(20)
        if (hasUpgrade('s', 43) && ! inChallenge("x", 11)) mult = mult.times(50)
        if (hasUpgrade('as', 11)) mult = mult.times(2)
        if (hasUpgrade('as', 13)) mult = mult.times(5)
        if (hasUpgrade('as', 25)) mult = mult.times(10)
        if (hasUpgrade('s', 51) && ! inChallenge("x", 11)) mult = mult.times(200)
        if (hasUpgrade('c', 12)) mult = mult.times(10)
        if (hasUpgrade('ast', 12)) mult = mult.times(10)
        if (hasUpgrade('stars', 12)) mult = mult.times(upgradeEffect('stars', 12))
        if (hasUpgrade('planets', 12)) mult = mult.times(upgradeEffect('planets', 12))
        if (hasUpgrade('x', 11) && ! inChallenge("x", 11)) mult = mult.times(upgradeEffect('x', 11))
        if (hasUpgrade('r', 52)) mult = mult.times(1e6)
        if (hasUpgrade('r', 54)) mult = mult.times(1e10)
        if (hasUpgrade('boosts', 11) && inChallenge("x", 11)) mult = mult.times(3)
        if (hasUpgrade('boosts', 12) && inChallenge("x", 11)) mult = mult.times(3)
        if (hasUpgrade('as', 31)) mult = mult.times(10000)
        if (hasUpgrade('as', 32)) mult = mult.times(100)
        if (hasUpgrade('boosts', 21) && inChallenge("x", 11)) mult = mult.times(10)
        if (hasUpgrade('boosts', 31) && inChallenge("x", 11)) mult = mult.times(10)

        // Inf
	    if (hasMilestone('inf', 3)) mult = mult.times(3)
        if (hasMilestone('megainf', 2)) mult = mult.times(5)
        if (hasMilestone('megainf', 8)) mult = mult.times(5)

	    // Challenges
        if (inChallenge('c', 11)) mult = mult.pow(0.45)
        if (inChallenge('c', 12)) mult = mult.pow(0.01)
        if (inChallenge('ast', 11)) mult = mult.pow(0.22)
        if (inChallenge('ast', 12)) mult = mult.pow(0.1)


        // Softcaps
        if (player.r.points.gte(1e60)) mult = mult.pow(0.88)

        return mult
    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Press for Rocket Fuel Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
    "Main": {
            content: [
            ["display-text",
            'Reality I: Launch', { "color": "LightBlue", "font-size": "32px", "text-shadow": "0px 0px 20px LightBlue"}],
            "blank",
            "blank",
            "main-display",
            "blank",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
            ["infobox", "main"],
            ["infobox", "main2"],
         ],
        },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
           "upgrades",
         ],
         unlocked() {return player.r.points.gte(1)},
        },
     },
    upgrades: {
        11: {
            title: "Discover Rocket Fuel",
            description: "+1 money/s",
            cost: new Decimal(1),
        },
        12: {
            title: "Rocket Fuel Factory",
            description: "2x Money",
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(2),
        },
        13: {
            title: "Basic Research Lab",
            description: "Money gain is increased based on your Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.28)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Basic Rocket Fuel Formula",
            description: "1.75x Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(10),
        },
        15: {
            title: "Basic Rocket Fuel Refinery",
            description: "Rocket Fuel gain is increased based on money",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "Improve Rocket Fuel Formula",
            description: "1.5x Rocket Fuel and 2x Money",
            unlocked() { return (hasUpgrade(this.layer, 15))},
            cost: new Decimal(40),
        },
        22: {
            title: "Mega Rocket Fuel Factory",
            description: "1.2x Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 21))},
            cost: new Decimal(50),
        },
        23: {
            title: "Enhanced Research Lab",
            description: "1.5x Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 22))},
            cost: new Decimal(80),
        },
        24: {
            title: "Enchaned Rocket Fuel Formula",
            description: "^1.05 Money",
            unlocked() { return (hasUpgrade(this.layer, 23))},
            cost: new Decimal(150),
        },
        25: {
            title: "Advanced Rocket Fuel Refinery",
            description: "Unlock Rockets & 3x Money",
            unlocked() { return (hasUpgrade(this.layer, 24))},
            cost: new Decimal(250),
        },
        31: {
            title: "Discover Superfuel",
            description: "5x Money",
            unlocked() { return (hasMilestone('ro', 2)) && (hasUpgrade(this.layer, 25))},
            cost: new Decimal(1000),
        },
        32: {
            title: "Superfuel Factory",
            description: "Rocket Fuel gain is increased based Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 31))},
            cost: new Decimal(2200),
            effect() {
                return player.r.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        33: {
            title: "Advanced Research Lab",
            description: "10x Money",
            unlocked() { return (hasMilestone('ro', 3)) && (hasUpgrade(this.layer, 32))},
            cost: new Decimal(10000),
        },
        34: {
            title: "Basic Superfuel Formula",
            description: "4x Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 33))},
            cost: new Decimal(70000),
        },
        35: {
            title: "Superfuel Engine",
            description: "Rocket Fuel gain is increased based on Money",
            unlocked() { return (hasMilestone('ro', 6)) && (hasUpgrade(this.layer, 34))},
            cost: new Decimal(100000000),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
         41: {
            title: "Improve Superfuel Formula",
            description: "Rocket Fuel gain is increased based on Astronauts",
            unlocked() { return (hasMilestone("ro", 16)) && (hasUpgrade(this.layer, 35))},
            cost: new Decimal(1e39),
            effect() {
                return player.as.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        42: {
            title: "Mega Superfuel Factory",
            description: "Rocket Fuel gain is increased based on Rockets",
            unlocked() {return (hasUpgrade(this.layer, 41))},
            cost: new Decimal(5e43),
            effect() {
                return player.ro.points.add(1).pow(1.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        43: {
            title: "Next-gen Research Lab",
            description: "1.1x Rocket Fuel",
            unlocked() { return (hasMilestone("ro", 18)) && (hasUpgrade(this.layer, 42))},
            cost: new Decimal(1e46),
        },
        44: {
            title: "Enhanced Superfuel Formula",
            description: "1.01x Rocket Fuel",
            unlocked() {return (hasUpgrade(this.layer, 43))},
            cost: new Decimal(4e46),
        },
        45: {
            title: "Superfuel Engine v3000",
            description: "Rocket Fuel gain is increased based on Rocket Fuel",
            unlocked() {return (hasUpgrade(this.layer, 44))},
            cost: new Decimal(1e48),
            effect() {
                return player.r.points.add(1).pow(0.07)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        51: {
            title: "Discover Ultrafuel",
            description: "1e9x Money",
            unlocked() {return (hasUpgrade(this.layer, 45) && hasUpgrade("x", 12))},
            cost: new Decimal(1e100),
        },
        52: {
            title: "Ultrafuel Factory",
            description: "1,000,000x Rocket Fuel",
            unlocked() {return (hasUpgrade(this.layer, 51) && hasUpgrade("x", 12))},
            cost: new Decimal(1e140),
        },
        53: {
            title: "Futuristic Research Lab",
            description: "10x Stardust & Planetoids",
            unlocked() {return (hasUpgrade(this.layer, 52) && hasUpgrade("x", 12))},
            cost: new Decimal(1e170),
        },
        54: {
            title: "Basic Ultrafuel Formula",
            description: "1e10x Rocket Fuel",
            unlocked() {return (hasUpgrade(this.layer, 53) && hasUpgrade("x", 12))},
            cost: new Decimal(1e200),
        },
        55: {
            title: "Ultrafuel Engine",
            description: "Rocket cost is decreased based on Rocket Fuel",
            unlocked() {return (hasUpgrade(this.layer, 54) && hasUpgrade("x", 12))},
            cost: new Decimal(1e250),
            effect() {
                return player.r.points.add(1).pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
    infoboxes: {
        main: {
            title: "Welcome!",
            body() { return "<b>Welcome to The Galactic Tree</b>.<br>What you are reading right now is called an infobox. these will help you through out the game. To start playing, read the infobox below me and click on 'Upgrades' at the top" },
        },
        main2: {
            title: "Introducing: Rocket Fuel", 
            body() { return "Welcome to Chapter 0! At this stage, it's fairly simple, just click the red button and you will earn Rocket Fuel. you can spend Rocket Fuel on upgrades. Try getting 500 Rocket Fuel!" },
        },
    }
})
