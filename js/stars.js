

addLayer("stardust", {
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 4,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    layerShown(){
        let visible = false
       return visible
     },

     doReset(reset) {
        let keep = [];
        if ( inChallenge("real", 11)) keep.push("upgrades")
        if ( inChallenge("real", 11)) keep.push("points")
        if ( inChallenge("real", 11)) keep.push("milestones")
        if ( inChallenge("real", 11)) keep.push("buyables")
        if ( inChallenge("real", 11)) keep.push("challenges")
        if (layers[reset].row > this.row) layerDataReset("stardust", keep)
    },
    name: "Stardust", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Stardust", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "Stars", // Name of resource prestige is based on
    baseAmount() {return player.stars.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.68, // Prestige currency exponent
    passiveGeneration() {
        if (inChallenge("real", 11)) return 0
        if (hasMilestone('stars', 1)) return 1
        return 0
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('x', 13)) mult = mult.times(upgradeEffect('x', 13))
        if (hasUpgrade('r', 53)) mult = mult.times(10)

        // Inf
	    if (hasMilestone('megainf', 4)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
})

addLayer("stars", {
    name: "Stars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌟", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 4,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "🌟"
        else symbol = "ST"
        return symbol
    },
    layerShown(){
        let visible = false
        if (hasChallenge('ast', 14) || player.stars.points.gte(1) || player.x.unlocked) visible = true
        if (inChallenge("real", 11)) visible = false
       return visible
     },
     doReset(reset) {
        let keep = [];
        if (hasMilestone("jupiter", 1)) keep.push("challenges")
        if ( inChallenge("real", 11)) keep.push("upgrades")
        if ( inChallenge("real", 11)) keep.push("points")
        if ( inChallenge("real", 11)) keep.push("milestones")
        if ( inChallenge("real", 11)) keep.push("buyables")
        if ( inChallenge("real", 11)) keep.push("challenges")
        if (layers[reset].row > this.row) layerDataReset("stars", keep)
    },
    autoUpgrade() {
        if (hasMilestone("omegainf", 8)) return true
        else return false
    },
    cap() {
        if (player.stars.points > 30) { 
            player.stars.points = new Decimal(30);
        }
    },
     nodeStyle() {return {
        "width": "100px",
        "height": "100px",
    }},
     color: "#FFFEA5",
 branches: ["c", "s"], 
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "Stars", // Name of prestige currency
    baseResource: "Comets", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone('s', 15)) mult = mult.times(1.5)
        if (player.stars.points.gte(30)) mult = mult.times("-1e9999999999999999999")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    canBuyMax(){
        let buyMax = false
        if (hasMilestone("x", 4)) buyMax = true
       return buyMax
     },
    hotkeys: [
        {key: "u", description: "U: Press for Star Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.stardust.points)}</span></h2> Stardust`
                        return txt
                    }
                ],
                ["display-text",
                    function(){
                        let txt = ""
                        let resetgain = getResetGain("stardust")
                        txt = txt + `You are gaining ${format(resetgain)}</span></h2> Stardust per second`
                        return txt
                    }
                ],
                "blank",
                "prestige-button",
                "blank",
                "blank",
                    "blank",
                    ["infobox", "main"],
         ],
     },
     "Milestones": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.stardust.points)}</span></h2> Stardust`
                        return txt
                    }
                ],
                "blank",
                "milestones",
         ],
         unlocked() {return player.stars.points.gte(1)}
     },
     "Upgrades": {
        content: [
            "main-display",
            ["display-text",
                function(){
                    let txt = ""
                    txt = txt + `You have 
                    <h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                        ${format(player.stardust.points)}</span></h2> Stardust`
                    return txt
                }
            ],
            "blank",
            "upgrades",
     ],
     unlocked() {return player.stars.points.gte(1)}
 },
 "Buyables": {
    content: [
        "main-display",
        ["display-text",
            function(){
                let txt = ""
                txt = txt + `You have 
                <h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.stardust.points)}</span></h2> Stardust`
                return txt
            }
        ],
        "blank",
        "buyables",
 ],
 unlocked() {return player.stars.points.gte(1)}
},
"The Sun": {
    content: [
        ["infobox", "sun"],
        "blank",
        "challenges",
 ],
 unlocked() {return (hasMilestone("s", 13) || hasChallenge("stars", 11))},
 buttonStyle() { return {"border-color": "#FFB50B"} },
},
  },
  challenges: {
    11: {
        name: "The Sun",
        canComplete: function() {return player.sun.points.gte("1e53100")},
        goalDescription: "???",
        rewardDescription: "Unlock Planets",
        style() {return {
            'background-image': "none",
            "width": "500px",
            "height": "500px",
            "color": "#880000", 
            "button-text": "Enter",
            "text-shadow": "#FF0B88 0px 0px 20px",
            "font-size": "32px",
            "font-family": "Lucida Console",
            "TextSize": 50,
            "backgroundColor": "#FFB50B",
            resetsNothing: true,
        }},
    },
  },
  buyables: {
        11: {
            title: "Comet Generation<br>",
            purchaseLimit: 100,
            cost(x) { return new Decimal(5).mul(Decimal.times(1.65, x)) },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stardust" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/100<br>" + "<br>Effect: Generate " + format(getBuyableAmount('stars', 11)) +"% of Comets/s"},
            canAfford() { return player.stardust.points.gte(this.cost()) },
            buy() {
                player.stardust.points = player.stardust.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Comet Multiplier<br>",
            purchaseLimit: 100,
            cost(x) { return new Decimal(8).mul(Decimal.times(1.8, x)) },
            effect(x) {
                let base1 = new Decimal(1.09)
                let base2 = x
                let expo = new Decimal(1.15)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
            },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Stardust" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/100<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x"},
            canAfford() { return player.stardust.points.gte(this.cost()) },
            buy() {
                player.stardust.points = player.stardust.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
  },
  milestones: {
    1: {
        requirementDescription: "1 Star",
        effectDescription: "Begin forming Stardust based on Stars",
        done() {return player.stars.points.gte(1)},
    },
    2: {
        requirementDescription: "2 Stars",
        effectDescription: "Bulk Buy Rockets",
        unlocked() {return (hasMilestone("stars", 1))},
        done() {return player.stars.points.gte(2)},
     },
     3: {
        requirementDescription: "3 Stars",
        effectDescription: "Auto-Buy Rocket Upgrades",
        unlocked() {return (hasMilestone("stars", 2))},
        done() {return player.stars.points.gte(3)},
     },
     4: {
        requirementDescription: "4 Stars",
        effectDescription: "Auto-Buy Rocket Fuel Upgrades",
        unlocked() {return (hasMilestone("stars", 3))},
        done() {return player.stars.points.gte(4)},
     },
     5: {
        requirementDescription: "5 Stars",
        effectDescription: "Auto-Buy Astronaut Upgrades",
        unlocked() {return (hasMilestone("stars", 4))},
        done() {return player.stars.points.gte(5)},
     },
  },
    upgrades: {
      11: {
        title: "Stardust Boost",
        description: "Money gain is increased based on Stardust",
        cost: new Decimal(10),
        effect() {
            return player.stardust.points.add(1).pow(0.34)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        currencyDisplayName: "Stardust",
        currencyLocation() {return player.stardust},
        currencyInternalName: "points",
    },
    12: {
        title: "Stardust Boost+",
        description: "Rocket Fuel gain is increased based on Stardust",
        cost: new Decimal(100),
        effect() {
            return player.stardust.points.add(1).pow(0.3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        currencyDisplayName: "Stardust",
        currencyLocation() {return player.stardust},
        unlocked() {return (hasUpgrade("stars", 11))},
        currencyInternalName: "points",
    },
    13: {
        title: "Stardust Boost++",
        description: "Rocket Cost is decreased based on Stardust",
        cost: new Decimal(1000),
        effect() {
            return player.stardust.points.add(1).pow(0.26)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        unlocked() {return (hasUpgrade("stars", 12))},
        currencyDisplayName: "Stardust",
        currencyLocation() {return player.stardust},
        currencyInternalName: "points",
    },
    14: {
        title: "Stardust Boost+++",
        description: "Astronaut gain is increased based on Stardust",
        cost: new Decimal(10000),
        unlocked() {return (hasUpgrade("stars", 13))},
        effect() {
            return player.stardust.points.add(1).pow(0.22)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        currencyDisplayName: "Stardust",
        currencyLocation() {return player.stardust},
        currencyInternalName: "points",
    },
    15: {
        title: "Mega Stardust Booster",
        description: "Comet gain is increased based on Stardust",
        cost: new Decimal(100000),
        unlocked() {return (hasUpgrade("stars", 14))},
        effect() {
            return player.stardust.points.add(1).pow(0.18)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        currencyDisplayName: "Stardust",
        currencyLocation() {return player.stardust},
        currencyInternalName: "points",
    },
},
infoboxes: {
    main: {
        title: "Introducing: Stars",
        body() { return "Stars are the Same as Rockets, but they cost Comets. Once you got your first Star, you start generating Stardust. the more Stars you have, the more Stardust you will generate. Stardust can be spent on Upgrades, Milestones & Buyables. Buyables are Upgrades you can buy more than once." },
    },
    sun: {
        title: "Introducing: The Sun",
        body() { return "Welcome to The Sun! The Sun is basically a clicker game, it contains tons of upgrades, buyables and milestones. Once you beat The Sun, You unlock a new feature.<br> Pro Tip: Hold buyables to Fast buy!<br> CPS = Clicks Per Second<br>Scroll down in the tree to begin playing." },
    },
}
})
