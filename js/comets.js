addLayer("c", {
    name: "Comets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☄️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 3,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone('ro', 20) || player.c.unlocked) visible = true
       return visible
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
        if (hasUpgrade('s', 11)) mult = mult.times(3)
        if (hasUpgrade('s', 21)) mult = mult.times(5)
        if (hasUpgrade('s', 31)) mult = mult.times(10)
        if (hasUpgrade('s', 41)) mult = mult.times(25)
        if (hasUpgrade('s', 42)) mult = mult.times(5)      
        if (hasMilestone('s', 7)) mult = mult.times(3)
        if (hasUpgrade('ast', 15)) mult = mult.times(upgradeEffect('ast', 15))
        if (hasMilestone('megainf', 7)) mult = mult.times(2)
        if (hasMilestone('megainf', 8)) mult = mult.times(2)
        if (hasMilestone('megainf', 9)) mult = mult.times(3)

        // Softcaps
        if (player.c.points.gte(100000)) mult = mult.pow(0.92)
        if (player.c.points.gte(1e6)) mult = mult.pow(0.3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "c", description: "C: Press for Comet Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
         "Comets": {
            content: [
            "main-display",
            "challenges"
         ],
         unlocked() { return (hasMilestone('c', 5))}
        }
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
            requirementDescription: "??? Comets",
            effectDescription: "Unlock Halley's Comet (coming soon)",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.c.points.gte(1e100)}
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
    }
})
