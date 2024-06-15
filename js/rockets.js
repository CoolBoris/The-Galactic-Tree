addLayer("ro", {
    name: "Rockets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🚀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    layerShown(){
        let visible = false
        if (hasUpgrade('r', 25) || player.ro.unlocked) visible = true
       return visible
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "r", description: "R: Press for Rocket Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
        "Upgrades": {
            content: [
            "main-display",
            "prestige-button",
            "blank",
            "upgrades"
         ],
         unlocked() { return (hasMilestone('ro', 4))}
     },
  },
    milestones: {
        1: {
            requirementDescription: "1 Rocket",
            effectDescription: "x3 Money",
            done() {return player.ro.points.gte(1)}
        },
        2: {
            requirementDescription: "2 Rockets",
            effectDescription: "x2 Rocket Fuel & 2 Rocket Fuel Upgrades",
            unlocked() { return (hasMilestone(this.layer, 1))},
            done() {return player.ro.points.gte(2)}
        },
        3: {
            requirementDescription: "3 Rockets",
            effectDescription: "x2 Rocket Fuel & 2 Rocket Fuel Upgrades",
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
            effectDescription: "50% of Rocket Fuel/s",
            unlocked() { return (hasMilestone(this.layer, 6))},
            done() {return player.ro.points.gte(7)}
        },
        8: {
            requirementDescription: "8 Rockets",
            effectDescription: "Unlock something new",
            unlocked() { return (hasMilestone(this.layer, 7))},
            done() {return player.ro.points.gte(8)}
        },
        9: {
            requirementDescription: "9 Rockets",
            effectDescription: "x1.5 Astronauts",
            unlocked() { return (hasMilestone(this.layer, 8))},
            done() {return player.ro.points.gte(9)}
        },
        10: {
            requirementDescription: "10 Rockets",
            effectDescription: "x2 Money & x1.5 Astronauts",
            unlocked() { return (hasMilestone(this.layer, 9))},
            done() {return player.ro.points.gte(10)}
        },
        11: {
            requirementDescription: "11 Rockets",
            effectDescription: "x2 Money",
            unlocked() { return (hasMilestone(this.layer, 10))},
            done() {return player.ro.points.gte(11)}
        },
        12: {
            requirementDescription: "12 Rockets",
            effectDescription: "x2 Astronauts",
            unlocked() { return (hasMilestone(this.layer, 11))},
            done() {return player.ro.points.gte(12)}
        },
        13: {
            requirementDescription: "13 Rockets",
            effectDescription: "x2 Astronauts",
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
            effectDescription: "Unlock something new",
            unlocked() { return (hasMilestone(this.layer, 14))},
            done() {return player.ro.points.gte(15)}
        },
    },
    upgrades: {
        11: {
            title: "Rocket Tech+",
            description: "Rockets cost is decreased based on money",
            cost: new Decimal(4),
            unlocked() { return (hasMilestone(this.layer, 4))},
            effect() {
                return player.points.add(1).pow(0.27)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        12: {
            title: "SpaceX",
            description: "Money gain is increased based on Rockets",
            cost: new Decimal(5),
            unlocked() { return (hasUpgrade(this.layer, 11))},
            effect() {
                return player.ro.points.add(1).pow(2.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        13: {
            title: "Reinforced Rockets",
            description: "Rocket Fuel gain is increased based on Rockets",
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade(this.layer, 12))},
            effect() {
                return player.ro.points.add(1).pow(1.7)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        14: {
            title: "Astronauts+",
            description: "Astronauts gain is increased based on Astronauts",
            cost: new Decimal(9),
            unlocked() { return (hasUpgrade(this.layer, 13)) && (hasMilestone("as", 1))},
            effect() {
                return player.as.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
        15: {
            title: "Rocket Market",
            description: "Money gain is increased based on Rockets",
            cost: new Decimal(9),
            unlocked() { return (hasUpgrade(this.layer, 14)) && (hasMilestone("as", 3))},
            effect() {
                return player.ro.points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect 
        },
    },
  })

  
