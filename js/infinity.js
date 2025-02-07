addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    symbol(){
        if (options.emojisEnabled == true) symbol = "♾️"
        else symbol = "INF"
        return symbol
    },

    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone("unstablefuel", 14) || player.inf.unlocked) visible = true
        if (player.inf.unlocked) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11)) visible = false
       return visible
     },
     nodeStyle() {return {
        "background": "radial-gradient(#ee7752, #e73c7e, #23a6d5, #23d5ab)",
        "width": "175px",
        "height": "175px",
}
},
componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient( #e73c7e, #23a6d5)",
        "width": "200px",
        "height": "200px",
    }},
},
tabFormat: {
    "Infinity": {
        content: [
        "blank",
        "prestige-button",
        "blank",
        ["infobox", "main"],
        ],
 },
    "Perks": {
        content: [
        "main-display",
        "blank",
       "milestones",
     ],
 },
},
infoboxes: {
    main: {
        title: "Introducing: Infinity",
        body() { return "Infinity resets <b>EVERYTHING</b>, even Space, but it keeps The Sun and The Solar System. Infinity is not required to progress, you've basically beat the game. Infinity is just a way to replay the game, but it will make the game easier in the future!"},
    },
    },
 branches: ["supernova"], 
 row: 6, // Row the layer is in on the tree (0 is the first row)
     color: "#e73c7e",
    requires: new Decimal(1e28), // Can be a function that takes requirement increases into account
    resource: "Infinities", // Name of prestige currency
    baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.unstablefuel.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        // Inf
	    if (hasMilestone('megainf', 3)) mult = mult.times(2)
        if (hasMilestone('omegainf', 1)) mult = mult.times(2)
        if (hasMilestone('omegainf', 5)) mult = mult.times(1.5)
        if (hasUpgrade('blob', 31)) mult = mult.add(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "i", description: "I: Press for Infinity Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "First Infinity",
            effectDescription: "3x Money",
            done() {return player.inf.points.gte(1)}
        },
        2: {
            requirementDescription: "Second Infinity",
            effectDescription: "1,000 Space Distance/s",
            done() {return player.inf.points.gte(2)}
        },
        3: {
            requirementDescription: "Third Infinity",
            effectDescription: "3x Rocket Fuel",
            done() {return player.inf.points.gte(3)}
        },
        4: {
            requirementDescription: "Fourth Infinity",
            effectDescription: "100,000 Space Distance/s",
            done() {return player.inf.points.gte(4)}
        },
        5: {
            requirementDescription: "Fifth Infinity",
            effectDescription: "/3 Rocket Cost",
            done() {return player.inf.points.gte(5)}
        },
        6: {
            requirementDescription: "Sixth Infinity",
            effectDescription: "10,000,000 Space Distance/s",
            done() {return player.inf.points.gte(6)}
        },
        7: {
            requirementDescription: "Seventh Infinity",
            effectDescription: "3x Astronauts",
            done() {return player.inf.points.gte(7)}
        },
        8: {
            requirementDescription: "Eigth Infinity",
            effectDescription: "1e9 Space Distance/s",
            done() {return player.inf.points.gte(8)}
        },
        9: {
            requirementDescription: "Ninth Infinity",
            effectDescription: "3x Comets & Asteroids",
            done() {return player.inf.points.gte(9)}
        },
        10: {
            requirementDescription: "Tenth Infinity",
            effectDescription: "Unlock Mega Infinity & Recieve a Special role in the Discord Server",
            done() {return player.inf.points.gte(10)}
        },
    }
})

  
