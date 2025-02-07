addLayer("ro", {
    name: "Rockets", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "🚀"
        else symbol = "R"
        return symbol
    },
    milestonePopups(){
        let popup = true
        if (options.RocketMilestonePopup == true) popup = true;
        else popup = false
        return popup
    },

    layerShown(){
        let visible = false
        if (hasUpgrade('r', 25) || player.ro.unlocked) visible = true
        if (inChallenge('c', 13) || (inChallenge("ast", 13))) visible = false
        if (inChallenge('stars', 11) || inChallenge('planets', 11) || inChallenge("x", 11)) visible = false
       return visible
     },
     canBuyMax(){
        let buyMaxRockets = false
        if (inChallenge('x', 11)) buyMaxRockets = false

        if (hasMilestone("ro", 7) || hasMilestone("stars", 2)) buyMaxRockets = true
       return buyMaxRockets
     },
     doReset(reset) {
        let keep = [];
        if (hasMilestone("c", 3)) keep.push("upgrades");
        if (hasMilestone("x", 1) && !inChallenge("x", 11)) {
            keep.push("milestones");
        }
        if (layers[reset].row > this.row) {
            layerDataReset("ro", keep);
        }
    },
    
    autoUpgrade() {
        if (inChallenge('x', 11)) return false

        if (hasMilestone("stars", 3)) return true
        if (hasMilestone("omegainf", 3)) return true

        
        else return false
    },
    cap() {
        if (player.ro.points > 50) { 
            player.ro.points = new Decimal(50);
        }
    },
 branches: ["r"], 
 row: 1, // Row the layer is in on the tree (0 is the first row)
     color: "#6D6D6D",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
    resource: "Rockets", // Name of prestige currency
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('ro', 11)) mult = mult.divide(upgradeEffect('ro', 11))
        if (hasUpgrade('ro', 21)) mult = mult.divide(upgradeEffect('ro', 21))
        if (hasUpgrade('s', 13) && ! inChallenge("x", 11)) mult = mult.divide(3)
        if (hasUpgrade('s', 23) && ! inChallenge("x", 11)) mult = mult.divide(5)
        if (hasUpgrade('s', 33) && ! inChallenge("x", 11)) mult = mult.divide(10)
        if (hasUpgrade('s', 43) && ! inChallenge("x", 11)) mult = mult.divide(25)
        if (hasMilestone('c', 1)) mult = mult.divide(5)
        if (hasUpgrade('as', 14)) mult = mult.divide(upgradeEffect('as', 14))
        if (hasUpgrade('as', 24)) mult = mult.divide(upgradeEffect('as', 24))
        if (hasUpgrade('s', 51) && ! inChallenge("x", 11)) mult = mult.divide(100)
        if (hasUpgrade('c', 13)) mult = mult.divide(upgradeEffect('c', 13))
        if (hasUpgrade('c', 14)) mult = mult.divide(10)
        if (hasUpgrade('c', 22)) mult = mult.divide(upgradeEffect('c', 22))
        if (hasUpgrade('ast', 23)) mult = mult.divide(upgradeEffect('ast', 23))
        if (hasUpgrade('c', 24)) mult = mult.divide(100)
        if (hasUpgrade('stars', 13)) mult = mult.divide(upgradeEffect('stars', 13))
        if (hasUpgrade('planets', 13)) mult = mult.divide(upgradeEffect('planets', 13))
        if (hasUpgrade('r', 55)) mult = mult.divide(upgradeEffect('r', 55))
        if (hasUpgrade('x', 23) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 23))
        if (hasMilestone('s', 16) && ! inChallenge("x", 11)) mult = mult.divide(1e12)
        if (hasUpgrade('x', 25) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 25))
        if (hasUpgrade('x', 31) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 31))
        if (hasUpgrade('x', 32) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 32))
        if (hasUpgrade('x', 33) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 33))
        if (hasUpgrade('x', 34) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 34))
        if (hasUpgrade('x', 35) && ! inChallenge("x", 11)) mult = mult.divide(upgradeEffect('x', 35))

        // Inf
	    if (hasMilestone('inf', 5)) mult = mult.divide(3)
        if (hasMilestone('megainf', 9)) mult = mult.divide(5)


        //Challenges
        if (inChallenge('c', 13)) mult = mult.times("-1e9999999999999999999")
        if (inChallenge('ast', 13)) mult = mult.times("-1e9999999999999999999")
        
        if (player.ro.points.gte(50)) mult = mult.times("-1e9999999999999999999")

        return mult

    },

    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "r", description: "R: Press for Rocket Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
            ["infobox", "main"],
        ],
    },
        "Milestones": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
            "milestones",
        ],
        },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
            "upgrades"
         ],
         unlocked() { return (hasMilestone('ro', 4)) || (hasMilestone('c', 2))}
     },
  },
    milestones: {
        1: {
            requirementDescription: "1 Rocket",
            effectDescription: "3x Money",
            done() {return player.ro.points.gte(1)}
        },
        2: {
            requirementDescription: "2 Rockets",
            effectDescription: "2x Rocket Fuel & 2 Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 1))},
            done() {return player.ro.points.gte(2)}
        },
        3: {
            requirementDescription: "3 Rockets",
            effectDescription: "2x Rocket Fuel & 2 Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 2))},
            done() {return player.ro.points.gte(3)}
        },
        4: {
            requirementDescription: "4 Rockets",
            effectDescription: "5% of Rocket Fuel/s & Rocket Upgrades",
            unlocked() { return (hasMilestone(this.layer, 3))},
            done() {return player.ro.points.gte(4)}
        },
        5: {
            requirementDescription: "5 Rockets",
            effectDescription: "10% of Rocket Fuel/s & 3x Money",
            unlocked() { return (hasMilestone(this.layer, 4))},
            done() {return player.ro.points.gte(5)}
        },
        6: {
            requirementDescription: "6 Rockets",
            effectDescription: "20% of Rocket Fuel/s & 1 Rocket Fuel Upgrade",
            unlocked() { return (hasMilestone(this.layer, 5))},
            done() {return player.ro.points.gte(6)}
        },
        7: {
            requirementDescription: "7 Rockets",
            effectDescription: "Bulk buy rockets",
            unlocked() { return (hasMilestone(this.layer, 6))},
            done() {return player.ro.points.gte(7)}
        },
        8: {
            requirementDescription: "8 Rockets",
            effectDescription: "Unlock Astronauts",
            unlocked() { return (hasMilestone(this.layer, 7))},
            done() {return player.ro.points.gte(8)}
        },
        9: {
            requirementDescription: "9 Rockets",
            effectDescription: "50% of Rocket Fuel/s & 1.5x Astronauts",
            unlocked() { return (hasMilestone(this.layer, 8))},
            done() {return player.ro.points.gte(9)}
        },
        10: {
            requirementDescription: "10 Rockets",
            effectDescription: "2x Money & 1.5x Astronauts",
            unlocked() { return (hasMilestone(this.layer, 9))},
            done() {return player.ro.points.gte(10)}
        },
        11: {
            requirementDescription: "11 Rockets",
            effectDescription: "2x Money",
            unlocked() { return (hasMilestone(this.layer, 10))},
            done() {return player.ro.points.gte(11)}
        },
        12: {
            requirementDescription: "12 Rockets",
            effectDescription: "2x Astronauts",
            unlocked() { return (hasMilestone(this.layer, 11))},
            done() {return player.ro.points.gte(12)}
        },
        13: {
            requirementDescription: "13 Rockets",
            effectDescription: "10% of Astronauts/s",
            unlocked() { return (hasMilestone(this.layer, 12))},
            done() {return player.ro.points.gte(13)}
        },
        14: {
            requirementDescription: "14 Rockets",
            effectDescription: "250% of Rocket Fuel/s",
            unlocked() { return (hasMilestone(this.layer, 13))},
            done() {return player.ro.points.gte(14)}
        },
        15: {
            requirementDescription: "15 Rockets",
            effectDescription: "Unlock Space",
            unlocked() { return (hasMilestone(this.layer, 14))},
            done() {return player.ro.points.gte(15)}
        },
        16: {
            requirementDescription: "16 Rockets",
            effectDescription: "2 New Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 15))},
            done() {return player.ro.points.gte(16)}
        },
        17: {
            requirementDescription: "17 Rockets",
            effectDescription: "2x Astronauts",
            unlocked() { return (hasMilestone(this.layer, 16))},
            done() {return player.ro.points.gte(17)}
        },
        18: {
            requirementDescription: "18 Rockets",
            effectDescription: "3 New Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 17))},
            done() {return player.ro.points.gte(18)}
        },
        19: {
            requirementDescription: "19 Rockets",
            effectDescription: "3x Astronauts",
            unlocked() { return (hasMilestone(this.layer, 18))},
            done() {return player.ro.points.gte(19)}
        },
        20: {
            requirementDescription: "20 Rockets",
            effectDescription: "Unlock Comets",
            unlocked() { return (hasMilestone(this.layer, 19))},
            done() {return player.ro.points.gte(20)}
        },
        21: {
            requirementDescription: "50 Rockets",
            effectDescription: "1e20x Money & Hardcaps Rockets",
            unlocked() { return (hasMilestone(this.layer, 21))},
            done() {return player.ro.points.gte(50)}
        },
    },
    upgrades: {
        11: {
            title: "Rocket Engineers",
            description: "Rockets cost is decreased based on money",
            cost: new Decimal(4),
            unlocked() { return (hasMilestone(this.layer, 4))},
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        12: {
            title: "Rocket Market",
            description: "Money gain is increased based on Rockets",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() {
                return player.ro.points.add(1).pow(2.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        13: {
            title: "Rocket Factory",
            description: "Rocket Fuel gain is increased based on Rockets",
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effect() {
                return player.ro.points.add(1).pow(1.7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        14: {
            title: "Astrorocket",
            description: "Astronauts gain is increased based on Astronauts",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade(this.layer, 13)) && (hasMilestone("as", 1))},
            effect() {
                return player.as.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        15: {
            title: "Rocket Market+",
            description: "Money gain is greatly increased based on Rockets",
            cost: new Decimal(12),
            unlocked() { return (hasUpgrade(this.layer, 14)) && (hasMilestone("as", 3))},
            effect() {
                return player.ro.points.add(1).pow(3.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        21: {
            title: "Superfuel Engine v9000",
            description: "Rockets cost is decreased based on Space Distance",
            cost: new Decimal(15),
            unlocked() { return (hasUpgrade(this.layer, 15)) && (hasMilestone("s", 3))},
            effect() {
                return player.s.points.add(1).pow(0.68)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        22: {
            title: "Rocket Market Deluxe",
            description: "Money gain is greatly increased based on Rockets",
            cost: new Decimal(30),
            unlocked() { return (hasUpgrade(this.layer, 21)) && (hasUpgrade("x", 22)  && ! (inChallenge("x", 11)))},
            effect() {
                return player.ro.points.add(1).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        23: {
            title: "Buy the Rocket Market",
            description: "Money gain is greatly increased based on X",
            cost: new Decimal(46),
            unlocked() { return (hasUpgrade(this.layer, 22)) && (hasUpgrade("x", 22) && ! (inChallenge("x", 11)))},
            effect() {
                return player.x.points.add(1).pow(35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
    infoboxes: {
        main: {
            title: "Introducing: Rockets",
            body() { return "Oh wow! a new feature already? This reset layer is a little bit different, instead of Money it costs Rocket Fuel and it will reset all progress you have made so far. The price of Rockets increase each Rocket. To see what benefits you get from Rockets, go to the 'Milestones' tab at the top" },
        },
    }
  })

  
