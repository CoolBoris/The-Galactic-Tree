addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (player.points.gte(1e64) || player.inf.unlocked) visible = true
       return visible
     },
     nodeStyle() {return {
        "background": "radial-gradient(#ee7752, #e73c7e, #23a6d5, #23d5ab)",
        "width": "200px",
        "height": "200px",
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
        ["display-text",
            'IMPORTANT:', { "color": "red", "font-size": "32px"}],
        ["display-text",
            'This Layer will reset everything, even space', { "color": "white", "font-size": "16px"}],
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
 branches: ["s", "c", "ast",], 
 row: 100, // Row the layer is in on the tree (0 is the first row)
     color: "#e73c7e",
    requires: new Decimal(1e64), // Can be a function that takes requirement increases into account
    resource: "Infinities", // Name of prestige currency
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
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
        {key: "r", description: "R: Press for Rocket Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        1: {
            requirementDescription: "First Infinity",
            effectDescription: "2x Money",
            done() {return player.inf.points.gte(1)}
        },
        2: {
            requirementDescription: "Second Infinity",
            effectDescription: "2x Money",
            done() {return player.inf.points.gte(2)}
        },
        3: {
            requirementDescription: "Third Infinity",
            effectDescription: "2x Money",
            done() {return player.inf.points.gte(3)}
        },
        4: {
            requirementDescription: "Fourth Infinity",
            effectDescription: "/2 Rocket Price",
            done() {return player.inf.points.gte(4)}
        },
        5: {
            requirementDescription: "Fifth Infinity",
            effectDescription: "/2 Rocket Price",
            done() {return player.inf.points.gte(5)}
        },
        6: {
            requirementDescription: "Sixth Infinity",
            effectDescription: "/2 Rocket Price",
            done() {return player.inf.points.gte(6)}
        },
        7: {
            requirementDescription: "Seventh Infinity",
            effectDescription: "2x Astronauts",
            done() {return player.inf.points.gte(6)}
        },
        8: {
            requirementDescription: "Eigth Infinity",
            effectDescription: "2x Astronauts",
            done() {return player.inf.points.gte(8)}
        },
        9: {
            requirementDescription: "Ninth Infinity",
            effectDescription: "2x Astronauts",
            done() {return player.inf.points.gte(9)}
        },
        10: {
            requirementDescription: "Tenth Infinity",
            effectDescription: "Unlock Mega-Infinity (coming soon) & Recieve a Special role in the Discord Server",
            done() {return player.inf.points.gte(10)}
        },
    }
})

  
