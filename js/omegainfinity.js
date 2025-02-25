addLayer("omegainf", {
    name: "Omega Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "♾️"
        else symbol = "OINF"
        return symbol
    },

    layerShown(){
        let visible = false
        if (player.megainf.points.gte(10) || player.omegainf.unlocked) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11)) visible = false
        if (inChallenge('x', 11)) visible = false
       return visible
     },
     nodeStyle() {return {
        "background": "radial-gradient( #FF8000, #FF5100, #FF0093, #0015ff)",
        "width": "175px",
        "height": "175px",
}
},
doReset(reset) {
    let keep = [];
    if ( inChallenge("real", 11)) keep.push("upgrades")
    if ( inChallenge("real", 11)) keep.push("points")
    if ( inChallenge("real", 11)) keep.push("milestones")
    if ( inChallenge("real", 11)) keep.push("buyables")
    if ( inChallenge("real", 11)) keep.push("challenges")
    if (layers[reset].row > this.row) layerDataReset("omegainf", keep)
},
componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient( #FF5100, #FF0093)",
        "width": "200px",
        "height": "200px",
    }},
},
tabFormat: {
    "Omega Infinity": {
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
        title: "Introducing: Omega Infinity",
        body() { return "Omega Infinity is the same as Mega Infinity but it also resets Mega Infinity! Again, infinity is not required to progress."},
    },
    },
 branches: ["megainf",], 
 row: 8, // Row the layer is in on the tree (0 is the first row)
     color: "#FF5100",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Omega Infinities", // Name of prestige currency
    baseResource: "Mega Infinities", // Name of resource prestige is based on
    baseAmount() {return player.megainf.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
      
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "o", description: "O: Press for Omega Infinity", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "First Omega Infinity",
            effectDescription: "2x Infinity",
            done() {return player.omegainf.points.gte(1)}
        },
        2: {
            requirementDescription: "Second Omega Infinity",
            effectDescription: "Auto-buy Rocket Fuel Upgrades",
            done() {return player.omegainf.points.gte(2)}
        },
        3: {
            requirementDescription: "Third Omega Infinity",
            effectDescription: "Auto-Buy Rocket Upgrades",
            done() {return player.omegainf.points.gte(3)}
        },
        4: {
            requirementDescription: "Fourth Omega Infinity",
            effectDescription: "Auto-Buy Astronaut Upgrades",
            done() {return player.omegainf.points.gte(4)}
        },
        5: {
            requirementDescription: "Fifth Omega Infinity",
            effectDescription: "1.5x Infinity",
            done() {return player.omegainf.points.gte(5)}
        },
        6: {
            requirementDescription: "Sixth Omega Infinity",
            effectDescription: "Auto-Buy Comet Upgrades",
            done() {return player.omegainf.points.gte(6)}
        },
        7: {
            requirementDescription: "Seventh Omega Infinity",
            effectDescription: "Auto-Buy Asteroid Upgrades",
            done() {return player.omegainf.points.gte(7)}
        },
        8: {
            requirementDescription: "Eigth Omega Infinity",
            effectDescription: "Auto-buy Star Upgrades",
            done() {return player.omegainf.points.gte(8)}
        },
        9: {
            requirementDescription: "Ninth Omega Infinity",
            effectDescription: "Auto-Buy Planet Upgrades",
            done() {return player.omegainf.points.gte(9)}
        },
        10: {
            requirementDescription: "Tenth Omega Infinity",
            effectDescription: "Recieve a Special role in the Discord Server",
            done() {return player.omegainf.points.gte(10)}
        },
    }
})

  
