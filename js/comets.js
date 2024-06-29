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
        if (hasMilestone('ro', 20) || player.c.unlocked || player.ast.unlocked) visible = true
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
    exponent: 7.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 41)) mult = mult.times(5)
        if (hasMilestone('s', 5)) mult = mult.times(2)
        if (hasUpgrade('s', 10)) mult = mult.times(3)
        if (hasUpgrade('s', 20)) mult = mult.times(5)
        if (hasUpgrade('s', 30)) mult = mult.times(10)
        if (hasUpgrade('s', 40)) mult = mult.times(25)
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
     "Comets": {
        content: [
        "main-display",
        "blank",
        "challenges",
    ],
 },
 },
 milestones: {
    1: {
        requirementDescription: "First Comet",
        effectDescription: "/5 Rocket Cost",
        done() {return player.c.points.gte(1)}
    },
    2: {
        requirementDescription: "3 Comets",
        effectDescription: "Keep Rocket Upgrades on layer 3 reset",
        unlocked() { return (hasMilestone(this.layer, 1))},
        done() {return player.c.points.gte(3)}
    },
    3: {
        requirementDescription: "8 Comets",
        effectDescription: "Unlock a new Space Upgrade",
        unlocked() { return (hasMilestone(this.layer, 2))},
        done() {return player.c.points.gte(8)}
    },
    4: {
        requirementDescription: "75 Comets",
        effectDescription: "Unlock a new Space Upgrade",
        unlocked() { return (hasMilestone(this.layer, 3))},
        done() {return player.c.points.gte(75)}
    },
    5: {
        requirementDescription: "500 Comets",
        effectDescription: "Unlock 4 New Space Upgrades",
        unlocked() { return (hasMilestone(this.layer, 4))},
        done() {return player.c.points.gte(500)}
    },
    6: {
        requirementDescription: "75,000 Comets & 10,000,000 Space",
        effectDescription: "Research your first Comet",
        unlocked() { return (hasMilestone(this.layer, 5))},
        done() {return player.c.points.gte(75000) && player.s.points.gte(10000000)}
    },
 },
})
