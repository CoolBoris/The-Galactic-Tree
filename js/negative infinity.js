addLayer("negativeinf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "-♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    symbol(){
        if (options.emojisEnabled == true) symbol = "-♾️"
        else symbol = "NINF"
        return symbol
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) {
            layerDataReset("negativeinf", keep);
        }
    },
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasMilestone("unstablefuel", 23) && inChallenge("real", 11)) visible = true
        if (player.negativeinf.unlocked && inChallenge("real", 11)) visible = true
       return visible
     },
     nodeStyle() {return {
        "background": "radial-gradient(#1188ad, #18c381, #dc592a, #dc2a54)",
        "width": "175px",
        "height": "175px",
}
},
componentStyles: {
    "prestige-button"() {return {"background": "radial-gradient(#1188ad, #18c381, #dc592a, #dc2a54)",
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
        title: "Introducing: Negative Infinity",
        body() { return "Infinity resets <b>EVERYTHING from Reality II</b>. Negative Infinity is not required to progress, you've basically beaten Reality II. Negative Infinity is just a way to replay the game, but it will make the game easier."},
    },
    },
 branches: ["supernova", "blackhole"], 
 row: 3, // Row the layer is in on the tree (0 is the first row)
     color: "#18c381",
    requires: new Decimal(1e69), // Can be a function that takes requirement increases into account
    resource: "Negative Infinities", // Name of prestige currency
    baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.unstablefuel.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
   
    milestones: {
        1: {
            requirementDescription: "First Negative Infinity",
            effectDescription: "3x Money",
            done() {return player.negativeinf.points.gte(1)}
        },
        2: {
            requirementDescription: "Second Negative Infinity",
            effectDescription: "3x Unstable Rocket Fuel",
            done() {return player.negativeinf.points.gte(2)}
        },
        3: {
            requirementDescription: "Third Negative Infinity",
            effectDescription: "3x Cosmic Dust",
            done() {return player.negativeinf.points.gte(3)}
        },
        4: {
            requirementDescription: "Fourth Negative Infinity",
            effectDescription: "3x Energy",
            done() {return player.negativeinf.points.gte(4)}
        },
        5: {
            requirementDescription: "Fifth Negative Infinity",
            effectDescription: "/5 Galaxy Cost",
            done() {return player.negativeinf.points.gte(5)}
        },
        6: {
            requirementDescription: "Sixth Negative Infinity",
            effectDescription: "2x Money",
            done() {return player.negativeinf.points.gte(6)}
        },
        7: {
            requirementDescription: "Seventh Negative Infinity",
            effectDescription: "2x Unstable Rocket Fuel",
            done() {return player.negativeinf.points.gte(7)}
        },
        8: {
            requirementDescription: "Eigth Negative Infinity",
            effectDescription: "2x Cosmic Dust",
            done() {return player.negativeinf.points.gte(8)}
        },
        9: {
            requirementDescription: "Ninth Negative Infinity",
            effectDescription: "2x Energy",
            done() {return player.negativeinf.points.gte(9)}
        },
        10: {
            requirementDescription: "Tenth Negative Infinity",
            effectDescription: "Unlock ??? Infinity (coming soon) & Recieve a Special role in the Discord Server",
            done() {return player.negativeinf.points.gte(10)}
        },
    }
})

  
