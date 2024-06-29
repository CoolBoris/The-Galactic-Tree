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
        if (hasMilestone('as', 4) || player.ast.unlocked || player.c.unlocked) visible = true
       return visible
     },
     color: "#F1DD4A",
     nodeStyle() {return {
        "background": "radial-gradient(#E99A19, #F1DD4A)" ,
    }},
 branches: ["as", "s"], 
    requires: new Decimal(5e11), // Can be a function that takes requirement increases into account
    resource: "Asteroids", // Name of prestige currency
    baseResource: "Astronauts", // Name of resource prestige is based on
    baseAmount() {return player.as.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.45, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('s', 43)) mult = mult.times(5)
        if (hasMilestone('s', 5)) mult = mult.times(2)
        if (hasUpgrade('s', 14)) mult = mult.times(3)
        if (hasUpgrade('s', 24)) mult = mult.times(5)
        if (hasUpgrade('s', 34)) mult = mult.times(10)
        if (hasUpgrade('s', 44)) mult = mult.times(25)
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
     "Asteroids": {
        content: [
        "main-display",
        "blank",
        "challenges",
    ],
 },
 },
 milestones: {
    1: {
        requirementDescription: "First Asteroid",
        effectDescription: "x5 Astronauts",
        done() {return player.ast.points.gte(1)}
    },
    2: {
        requirementDescription: "5 Asteroids",
        effectDescription: "Keep Astronaut Milestones on layer 3 reset",
        unlocked() { return (hasMilestone(this.layer, 1))},
        done() {return player.ast.points.gte(5)}
    },
    3: {
        requirementDescription: "10 Asteroids",
        effectDescription: "Unlock a new Space Upgrade",
        unlocked() { return (hasMilestone(this.layer, 2))},
        done() {return player.ast.points.gte(10)}
    },
    4: {
        requirementDescription: "100 Asteroids",
        effectDescription: "50% of Astronauts/s",
        unlocked() { return (hasMilestone(this.layer, 3))},
        done() {return player.ast.points.gte(100)}
    },
    5: {
        requirementDescription: "1,000 Asteroids",
        effectDescription: "Unlock 4 New Space Upgrades",
        unlocked() { return (hasMilestone(this.layer, 4))},
        done() {return player.ast.points.gte(1000)}
    }, 
    6: {
        requirementDescription: "200,000 Asteroids",
        effectDescription: "Research your first Asteroid",
        unlocked() { return (hasMilestone(this.layer, 5))},
        done() {return player.ast.points.gte(200000) && player.s.points.gte(10000000)}
    },
},

})
