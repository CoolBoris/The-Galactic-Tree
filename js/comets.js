addLayer("c", {
    name: "Comets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☄️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    milestonePopups(){
        let popup = true
        if (options.ComAstMilestonePopup == true) popup = true;
        else popup = false
        return popup
    },

    symbol(){
        if (options.emojisEnabled == true) symbol = "☄️"
        else symbol = "C"
        return symbol
    },
    layerShown(){
        let visible = false
        if (hasMilestone('ro', 20) || player.c.unlocked) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11) || inChallenge("x", 11)) visible = false
       return visible
     },
     passiveGeneration() {
        if (inChallenge('x', 11)) return 0
        if (hasMilestone('stars', 1)) return getBuyableAmount('stars', 11) /100
        if (hasMilestone('ast', 5)) return 0.01
        return 0
    },
    autoUpgrade() {
        if (inChallenge('x', 11)) return false
        if (hasMilestone("planets", 4)) return true
        if (hasMilestone("omegainf", 6)) return true
        else return false
    },
    doReset(reset) {
        let keep = [];
        if (hasMilestone("planets", 2)) keep.push("challenges")
        if (hasMilestone("x", 3)) keep.push("milestones")
        if (layers[reset].row > this.row) layerDataReset("c", keep)
    },
     color: "#2D6CD3",
     nodeStyle() {return {
        "background": "radial-gradient(#4AEAF1, #2D6CD3)" ,
    }},
 branches: ["ro", "s"], 
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "Comets", // Name of prestige currency
    baseResource: "Rockets", // Name of resource prestige is based on
    baseAmount() {return player.ro.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 19, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 11) && ! inChallenge("x", 11)) mult = mult.times(3)
        if (hasUpgrade('s', 21) && ! inChallenge("x", 11)) mult = mult.times(5)
        if (hasUpgrade('s', 31) && ! inChallenge("x", 11)) mult = mult.times(10)
        if (hasUpgrade('s', 41) && ! inChallenge("x", 11)) mult = mult.times(25)
        if (hasUpgrade('s', 42) && ! inChallenge("x", 11)) mult = mult.times(5)      
        if (hasMilestone('s', 7) && ! inChallenge("x", 11)) mult = mult.times(3)
        if (hasUpgrade('ast', 15)) mult = mult.times(upgradeEffect('ast', 15))
        if (hasChallenge('c', 12)) mult = mult.times(100)
        if (hasMilestone('stars', 1)) mult = mult.times(buyableEffect("stars", 12))
        if (hasUpgrade('stars', 15)) mult = mult.times(upgradeEffect('stars', 15))

        // Inf
        if (hasMilestone('inf', 9)) mult = mult.times(3)
        if (hasMilestone('megainf', 6)) mult = mult.times(5)

        // Softcaps
        if (player.c.points.gte(100000)) mult = mult.pow(0.92)
        if (player.c.points.gte(1e6)) mult = mult.pow(0.7)
        if (player.c.points.gte(1e10)) mult = mult.pow(0.75)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "c", description: "C: Press for Comet Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
        "Milestones": {
            content: [
            "main-display",
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
            "prestige-button",
            "blank",
            "upgrades"
         ],
        },
         "Comets": {
            unlocked() { return (hasMilestone('c', 5))},
            content: [
            "main-display",
            "challenges"
         ],
     },
  },
    milestones: {
        1: {
            requirementDescription: "15 Comets",
            effectDescription: "Unlock 1 New Space Upgrade",
            done() {return player.c.points.gte(15)}
        },
        2: {
            requirementDescription: "250 Comets",
            effectDescription: "Unlock 3 New Space Upgrades",
            unlocked() { return (hasMilestone(this.layer, 1))},
            done() {return player.c.points.gte(250)}
        },
        3: {
            requirementDescription: "50,000 Comets",
            effectDescription: "Keep Rocket Upgrades on Reset",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.c.points.gte(50000)}
        },
        4: {
            requirementDescription: "100,000 Comets",
            effectDescription: "Unlock 1 New Space Upgrade",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.c.points.gte(100000)}
        },
        5: {
            requirementDescription: "1,000,000 Comets",
            effectDescription: "Unlock Halley's Comet",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.c.points.gte(1e6)}
        },
    },
    upgrades: {
        11: {
            title: "Search for Comets",
            description: "/5 Rocket Price",
            cost: new Decimal(1),
        },
        12: { 
            title: "Comets Research Equipment",
            description: "x10 Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(3),
        },
        13: {
            title: "Rocket Enhancement",
            description: "Rocket Price is decreased based on comets",
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(6),
            effect() {
                return player.c.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        14: {
            title: "Tracking Comets",
            description: "/10 Rocket Price",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(9),
        },
        15: {
            title: "Asteroid Infusion",
            description: "Asteroids gain is increased based on Comets",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(150),
            effect() {
                return player.c.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "Sell Comets",
            description: "1000x Money",
            cost: new Decimal(1.5e7),
            unlocked() { return (hasUpgrade(this.layer, 15)) && (hasChallenge(this.layer, 13))},
        },
        22: {
            title: "Rocket Comets",
            description: "Rocket cost is decreased based on Comets",
            unlocked() { return (hasUpgrade(this.layer, 21)) && (hasChallenge(this.layer, 13))},
            cost: new Decimal(5e7),
            effect() {
                return player.c.points.add(1).pow(0.41)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        23: {
            title: "Comet Icarus",
            description: "Money gain is Increased based on Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 22)) && (hasChallenge("ast", 11))},
            cost: new Decimal(1.5e8),
            effect() {
                return player.ast.points.add(1).pow(0.38)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        24: {
            title: "Rocket Discovery",
            description: "/100 Rocket Cost",
            cost: new Decimal(1.5e9),
            unlocked() { return (hasUpgrade(this.layer, 23)) && (hasChallenge("ast", 14))},
        },
        25: {
            title: "Money Comets",
            description: "100x Money",
            cost: new Decimal(3e9),
            unlocked() { return (hasUpgrade(this.layer, 24)) && (hasChallenge("ast", 14))},
        },
    },
    challenges: {
        11: {
            name: "Halley's Comet",
            challengeDescription: "^0.5 Money & ^0.5 Rocket Fuel",
            canComplete: function() {return player.ro.points.gte(14)},
            goalDescription: "14 Rockets",
            rewardDescription: "Unlock Encke's Comet & Unlock 1 New Asteroid Upgrade",
        },
        12: {
            name: "Encke's Comet",
            challengeDescription: "^0.01 Rocket Fuel",
            canComplete: function() {return player.ro.points.gte(11)},
            goalDescription: "11 Rockets",
            unlocked() { return (hasChallenge(this.layer, 11))},
            rewardDescription: "Unlock Comet Hyakutake & 100x Comets",
        },
        13: {
            name: "Comet Hyakutake",
            challengeDescription: "You cant earn Rockets",
            canComplete: function() {return player.points.gte(1e49)},
            goalDescription: "1e49 Money",
            unlocked() { return (hasChallenge(this.layer, 12))},
            rewardDescription: "Unlock Biela's Comet & Unlock 2 New Comets Upgrade",
        },
        14: {
            name: "Biela's Comet",
            challengeDescription: "^0.125 Money",
            canComplete: function() {return player.ro.points.gte(15)},
            goalDescription: "15 Rockets",
            unlocked() { return (hasChallenge(this.layer, 13))},
            rewardDescription: "Unlock Asteroid Icarus & Unlock 2 New Asteroid Upgrades",
        },
    },
    infoboxes: {
        main: {
            title: "Introducing: Comets",
            body() { return "Comets Reset everything from layer 1 & 2. Comets are Used for Upgrades & Milestones. After a while, you will unlock Challenges. Challenges are objectives you need to complete while having a debuf, in return you get rewards!" },
        },
    },
})
