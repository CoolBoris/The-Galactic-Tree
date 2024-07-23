addLayer("megainf", {
    name: "Mega Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (player.inf.points.gte(10) || player.megainf.unlocked) visible = true
       return visible
     },
     nodeStyle() {return {
        "background": "radial-gradient( #53ff64, #05ff0e, #00afff, #0015ff)",
        "width": "175px",
        "height": "175px",
}
},
componentStyles: {
    "prestige-button"() {return { "background": "radial-gradient( #00afff, #05ff0e)",
        "width": "200px",
        "height": "200px",
    }},
},
tabFormat: {
    "Mega Infinity": {
        content: [
        "blank",
        "prestige-button",
        "blank",
        ["display-text",
            'IMPORTANT:', { "color": "red", "font-size": "32px"}],
        ["display-text",
            'This Layer will reset everything, even space and infinity', { "color": "white", "font-size": "16px"}],
        ["display-text",
            "This reset is not needed to progress, it will just make the game easier in the future", { "color": "white", "font-size": "16px"}],
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
 branches: ["inf",], 
 row: 98, // Row the layer is in on the tree (0 is the first row)
     color: "#05ff0e",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Mega Infinities", // Name of prestige currency
    baseResource: "Infinities", // Name of resource prestige is based on
    baseAmount() {return player.inf.points}, // Get the current amount of baseResource
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
        {key: "m", description: "M: Press for Mega Infinity", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "First Mega Infinity",
            effectDescription: "3x Money",
            done() {return player.megainf.points.gte(1)}
        },
        2: {
            requirementDescription: "Second Mega Infinity",
            effectDescription: "3x Money",
            done() {return player.megainf.points.gte(2)}
        },
        3: {
            requirementDescription: "Third Mega Infinity",
            effectDescription: "2x Rocket Fuel",
            done() {return player.megainf.points.gte(3)}
        },
        4: {
            requirementDescription: "Fourth Mega Infinity",
            effectDescription: "2x Rocket Fuel",
            done() {return player.megainf.points.gte(4)}
        },
        5: {
            requirementDescription: "Fifth Mega Infinity",
            effectDescription: "3x Astronauts",
            done() {return player.megainf.points.gte(5)}
        },
        6: {
            requirementDescription: "Sixth Mega Infinity",
            effectDescription: "3x Astronauts",
            done() {return player.megainf.points.gte(6)}
        },
        7: {
            requirementDescription: "Seventh Mega Infinity",
            effectDescription: "2x Comets & Asteroids",
            done() {return player.megainf.points.gte(7)}
        },
        8: {
            requirementDescription: "Eigth Mega Infinity",
            effectDescription: "2x Comets & Asteroids",
            done() {return player.megainf.points.gte(8)}
        },
        9: {
            requirementDescription: "Ninth Mega Infinity",
            effectDescription: "3x Comets & Asteroids",
            done() {return player.megainf.points.gte(9)}
        },
        10: {
            requirementDescription: "Tenth Mega Infinity",
            effectDescription: "Unlock Omega-Infinity & Recieve a Special role in the Discord Server",
            done() {return player.megainf.points.gte(10)}
        },
    }
})

  
