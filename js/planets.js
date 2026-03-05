addLayer("planetoid", {
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 4,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    layerShown(){
        let visible = false
       return visible
     },
    name: "Planetoids", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Planetoids", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "Planets", // Name of resource prestige is based on
    baseAmount() {return player.planets.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount ganed. static: cost depends on how much you already have
    exponent: 1.72, // Prestige currency exponent
    passiveGeneration() {
        if (inChallenge("real", 11)) return 0
        if (hasMilestone('planets', 1)) return 1
        return 0
    },

    doReset(reset) {
        let keep = [];
        if ( inChallenge("real", 11)) keep.push("upgrades")
        if ( inChallenge("real", 11)) keep.push("points")
        if ( inChallenge("real", 11)) keep.push("milestones")
        if ( inChallenge("real", 11)) keep.push("buyables")
        if ( inChallenge("real", 11)) keep.push("challenges")
        if (layers[reset].row > this.row) layerDataReset("planetoid", keep)
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('r', 53)) mult = mult.times(10)
        // Inf
	    if (hasMilestone('megainf', 4)) mult = mult.times(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
})

addLayer("planets", {
    name: "Planets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🪐", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 4,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasChallenge('stars', 11)) visible = true
        if (inChallenge("real", 11)) visible = false
       return visible
     },

     symbol(){
        if (options.emojisEnabled == true) symbol = "🪐"
        else symbol = "P"
        return symbol
    },
     autoUpgrade() {
        if (hasMilestone("omegainf", 9)) return true
        else return false
    },
    cap() {
        if (player.planets.points > 40) { 
            player.planets.points = new Decimal(40);
        }
    },
     nodeStyle() {return {
        "width": "100px",
        "height": "100px",
    }},
     color: "#5E37B0",
 branches: ["ast", "s"], 
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "Planets", // Name of prestige currency
    baseResource: "Asteroids", // Name of resource prestige is based on
    baseAmount() {return player.ast.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.3, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone('s', 15)) mult = mult.times(1.5)
        if (hasMilestone('s', 16)) mult = mult.divide(10000)
        if (player.planets.points.gte(40)) mult = mult.times("-1e9999999999999999999")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    canBuyMax(){
        let buyMax = false
        if (hasMilestone("x", 2)) buyMax = true
       return buyMax
     },
    doReset(reset) {
        let keep = [];
        if (hasMilestone("sun", 8)) keep.push("challenges")
        if ( inChallenge("real", 11)) keep.push("upgrades")
        if ( inChallenge("real", 11)) keep.push("points")
        if ( inChallenge("real", 11)) keep.push("milestones")
        if ( inChallenge("real", 11)) keep.push("buyables")
        if ( inChallenge("real", 11)) keep.push("challenges")
        if (layers[reset].row > this.row) layerDataReset("planets", keep)
    },
    hotkeys: [
        {key: "p", description: "P: Press for Planet Reset", onPress(){if (canReset(this.layer) && ! (inChallenge("real", 11))) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text",
                    function(){
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.planetoid.points)}</span></h2> Planetoids`
                        return txt
                    }
                ],
                ["display-text",
                    function(){
                        let txt = ""
                        let resetgain = getResetGain("planetoid")
                        txt = txt + `You are gaining ${format(resetgain)}</span></h2> Planetoids per second`
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
                        <h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${format(player.planetoid.points)}</span></h2> Planetoids`
                        return txt
                    }
                ],
                "blank",
                "milestones",
         ],
         unlocked() {return player.planets.points.gte(1)}
     },
     "Upgrades": {
        content: [
            "main-display",
            ["display-text",
                function(){
                    let txt = ""
                    txt = txt + `You have 
                    <h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                        ${format(player.planetoid.points)}</span></h2> Planetoids`
                    return txt
                }
            ],
            "blank",
            "upgrades",
     ],
     unlocked() {return player.planets.points.gte(1)}
 },
 "Buyables": {
    content: [
        "main-display",
        ["display-text",
            function(){
                let txt = ""
                txt = txt + `You have 
                <h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.planetoid.points)}</span></h2> Planetoids`
                return txt
            }
        ],
        "blank",
        "buyables",
 ],
 unlocked() {return player.planets.points.gte(1)}
},
"The Solar System": {
    content: [
        ["infobox", "solarsystem"],
        "blank",
        "challenges",
 ],
 unlocked() {return (hasMilestone("planets", 6)) || (hasChallenge("planets", 11))},
 buttonStyle() { return {"border-color": "#620A8A"} },

},
  },
  challenges: {
    11: {
        name: "The Solar System",
        canComplete: function() {return player.jupiter.points.gte("1")},
        goalDescription: "???",
        rewardDescription: "Unlock X",
        style() {return {
            'background-image': "none",
            "width": "500px",
            "height": "500px",
            "color": "#F80BFF", 
            "button-text": "Enter",
            "text-shadow": "#C817C0 0px 0px 20px",
            "font-size": "32px",
            "font-family": "Lucida Console",
            "TextSize": 50,
            "backgroundColor": "#620A8A",
            resetsNothing: true,
        }},
    },
  },
  milestones: {
    1: {
        requirementDescription: "1 Planet",
        effectDescription: "Begin forming Planetoids based on Planets",
        done() {return player.planets.points.gte(1)},
     },
     2: {
        requirementDescription: "2 Planets",
        effectDescription: "Keep Comet Challenges",
        unlocked() {return (hasMilestone("planets", 1))},
        done() {return player.planets.points.gte(2)},
     },
     3: {
        requirementDescription: "3 Planets",
        effectDescription: "Keep Asteroid Challenges",
        unlocked() {return (hasMilestone("planets", 2))},
        done() {return player.planets.points.gte(3)},
     },
     4: {
        requirementDescription: "4 Planets",
        effectDescription: "Auto-buy Comet Upgrades",
        unlocked() {return (hasMilestone("planets", 3))},
        done() {return player.planets.points.gte(4)},
     },
     5: {
        requirementDescription: "5 Planets",
        effectDescription: "Auto-Buy Asteroid Upgrades",
        unlocked() {return (hasMilestone("planets", 4))},
        done() {return player.planets.points.gte(5)},
    },
     6: {
        requirementDescription: "10 Planets",
        effectDescription: "Unlock The Solar System",
        unlocked() {return (hasMilestone("planets", 5))},
        done() {return player.planets.points.gte(10)},
     },
  },
  buyables: {
    11: {
        title: "Asteroid Generation<br>",
        purchaseLimit: 100,
        cost(x) { return new Decimal(5).mul(Decimal.times(1.56, x)) },
        display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Planetoids" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/100<br>" + "<br>Effect: Generate " + format(getBuyableAmount('planets', 11)) +"% of Asteroids/s"},
        canAfford() { return player.planetoid.points.gte(this.cost()) },
        buy() {
            player.planetoid.points = player.planetoid.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    12: {
        title: "Asteroid Multiplier<br>",
        purchaseLimit: 100,
        cost(x) { return new Decimal(8).mul(Decimal.times(1.68, x)) },
        effect(x) {
            let base1 = new Decimal(1.09)
            let base2 = x
            let expo = new Decimal(1.15)
            let eff = base1.pow(Decimal.pow(base2, expo))
            return eff
        },
        display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Planetoids" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/100<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x"},
        canAfford() { return player.planetoid.points.gte(this.cost()) },
        buy() {
            player.planetoid.points = player.planetoid.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
},
infoboxes: {
    main: {
        title: "Introducing: Planets",
        body() { return "Planets are the same as Stars, but they cost Asteroids. Once you get your first Planet, you start generating Planetoids on a slow rate. The more Planets you have, the more Planetoids you will generate. Planetoids can be spent on Upgrades, Milestones & Buyables." },
    },
    solarsystem: {
        title: "Introducing: The Solar System",
        body() { return "Welcome to The Solar System! You already know how this works, it's the same as The Sun. Good Luck!" },
    },
},
    upgrades: {
            11: {
              title: "Planetoid Boost",
              description: "Money gain is increased based on Planetoids",
              cost: new Decimal(10),
              effect() {
                  return player.planetoid.points.add(1).pow(0.38)
              },
              effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
              currencyDisplayName: "Planetoids",
              currencyLocation() {return player.planetoid},
              currencyInternalName: "points",
          },
          12: {
              title: "Planetoid Boost+",
              description: "Rocket Fuel gain is increased based on Planetoids",
              cost: new Decimal(100),
              effect() {
                  return player.planetoid.points.add(1).pow(0.34)
              },
              effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
              currencyDisplayName: "Planetoids",
              currencyLocation() {return player.planetoid},
              unlocked() {return (hasUpgrade("planets", 11))},
              currencyInternalName: "points",
          },
          13: {
              title: "Planetoid Boost++",
              description: "Rocket Cost is decreased based on Planetoids",
              cost: new Decimal(1000),
              effect() {
                  return player.planetoid.points.add(1).pow(0.3)
              },
              effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
              unlocked() {return (hasUpgrade("planets", 12))},
              currencyDisplayName: "Planetoids",
              currencyLocation() {return player.planetoid},
              currencyInternalName: "points",
          },
          14: {
              title: "Planetoid Boost+++",
              description: "Astronaut gain is increased based on Planetoids",
              cost: new Decimal(10000),
              unlocked() {return (hasUpgrade("planets", 13))},
              effect() {
                  return player.planetoid.points.add(1).pow(0.26)
              },
              effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
              currencyDisplayName: "Planetoids",
              currencyLocation() {return player.planetoid},
              currencyInternalName: "points",
          },
          15: {
              title: "Mega Planetoid Booster",
              description: "Asteroid gain is increased based on Planetoids",
              cost: new Decimal(100000),
              unlocked() {return (hasUpgrade("planets", 14))},
              effect() {
                  return player.planetoid.points.add(1).pow(0.22)
              },
              effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
              currencyDisplayName: "Planetoids",
              currencyLocation() {return player.planetoid},
              currencyInternalName: "points",
    },
}
})