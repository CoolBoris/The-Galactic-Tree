addLayer("darkmatter", {
    name: "Dark Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    branches: ["galaxy", "unstablefuel"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    doReset(reset) {
        let keep = [];
        if (hasMilestone("blackhole", 2)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("darkmatter", keep)
    },

    symbol(){
        if (options.emojisEnabled == true) symbol = "⚫"
        else symbol = "DM"
        return symbol
    },

    automate() {
        if (hasMilestone('unstablefuel', 15)) {
            if (getBuyableAmount('darkmatter', 11) < layers.darkmatter.buyables[11].purchaseLimit) {
        if (layers.darkmatter.buyables[11].canAfford()) {
            layers.darkmatter.buyables[11].buy();
            };
        };
        if (layers.darkmatter.buyables[12].canAfford()) {
            if (getBuyableAmount('darkmatter', 12) < layers.darkmatter.buyables[12].purchaseLimit) {
                layers.darkmatter.buyables[12].buy();
                };
            };
        if (layers.darkmatter.buyables[13].canAfford()) {
            if (getBuyableAmount('darkmatter', 13) < layers.darkmatter.buyables[13].purchaseLimit) {
            layers.darkmatter.buyables[13].buy();
                };
            };
        if (layers.darkmatter.buyables[21].canAfford()) {
            if (getBuyableAmount('darkmatter', 21) < layers.darkmatter.buyables[21].purchaseLimit) {
            layers.darkmatter.buyables[21].buy();
                };
        };
    }
},

    passiveGeneration() {
        if (! inChallenge("real", 11)) return 0
        if (hasMilestone('supernova', 9)) return (player.darkenergy.points.pow(0.4).add(1)).divide(100)
        return 0
    },

    layerShown(){
        let visible = false
        if (inChallenge('real', 11) && hasMilestone("galaxy", 3) || inChallenge('real', 11) && player.supernova.points.gte(1)) visible = true
       return visible
     },
    color: "#450080",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "Dark Matter", // Name of prestige currency
    baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.unstablefuel.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone("unstablefuel", 6)) mult = mult.times(3)
        if (hasUpgrade('galaxy', 31)) mult = mult.times(upgradeEffect('galaxy', 31))
        if (hasUpgrade('galaxy', 34)) mult = mult.times(2)
        if (hasUpgrade('galaxy', 41)) mult = mult.times(3)
        if (hasUpgrade('galaxy', 42)) mult = mult.times(upgradeEffect('galaxy', 42))
        if (hasMilestone("supernova", 1)) mult = mult.times(3)
        if (hasMilestone("supernova", 2)) mult = mult.times(3)
        if (hasMilestone("unstablefuel", 10)) mult = mult.times(5)
        if (hasUpgrade('galaxy', 52)) mult = mult.times(5)
        if (hasMilestone("unstablefuel", 14)) mult = mult.times(10)
        if (hasUpgrade('galaxy', 61)) mult = mult.times(10)
        if (hasMilestone("supernova", 10)) mult = mult.times(player.darkenergy.points.pow(0.585).add(1))
        if (hasUpgrade('unstablefuel', 73)) mult = mult.times(upgradeEffect('unstablefuel', 73))
        if (hasUpgrade("blackhole", 11)) mult = mult.times(10)
        if (hasUpgrade("blackhole", 21)) mult = mult.times(10)
        if (hasUpgrade("blackhole", 34)) mult = mult.times(10)
        if (hasUpgrade("blackhole", 43)) mult = mult.times(10)






        return mult
    },
    
    
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "d", description: "D: Press for Dark Matter Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
    "Main": {
            content: [
            "main-display",
            "blank",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
         ],
        },
        "Buyables": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
           "buyables",
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
     },
     milestones: {
        1: {
            requirementDescription: "Dark Milestone I (10)",
            effectDescription: "Improve Cosmic Rays Formula",
            done() {return (player.darkmatter.points.gte(10))},
        },
        2: {
            requirementDescription: "Dark Milestone II (250)",
            effectDescription: "Unlock 5 Unstable Rocket Fuel Upgrades",
            unlocked() {return hasMilestone("darkmatter", 1)},
            done() {return (player.darkmatter.points.gte(250))},
        },
        3: {
            requirementDescription: "Dark Milestone III (1e29)",
            effectDescription: "Unlock 5 Unstable Rocket Fuel Upgrades",
            unlocked() {return hasMilestone("darkmatter", 2)},
            done() {return (player.darkmatter.points.gte(1e29))},
        },
    },
    buyables: {
        11: {
            title: "Dark Money<br>",
            purchaseLimit: 1000,
            cost(x) { return new Decimal(1).times(Decimal.pow(1.2, x)); },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Matter" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1,000<br>" + "<br>Effect: " + "+"+ getBuyableAmount(this.layer, this.id) +" Money/s"},
            canAfford() { return player.darkmatter.points.gte(this.cost()) },
            buy() {
                if (this.canAfford()) {
                    if (! hasMilestone("unstablefuel", 20)) {
                        player.darkmatter.points = player.darkmatter.points.sub(this.cost());
                    }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
                }
            },
        },
        12: {
            title: "Dark Fuel<br>",
            cost(x) { return new Decimal(1).times(Decimal.pow(1.5, x)); },
            effect(x) {
                let base1 = new Decimal(1.1)
                let base2 = x
                let expo = new Decimal(0.82)
                let eff = base1.pow(base2).pow(expo)
                return eff
            },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Matter" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1,000<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id)) + "x"},
            canAfford() { return player.darkmatter.points.gte(this.cost()) },
            buy() {
                if (this.canAfford()) {
                    if (! hasMilestone("unstablefuel", 20)) {
                        player.darkmatter.points = player.darkmatter.points.sub(this.cost());
                    }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
                }
            },
        },
        13: {
            title: "Dark Dust<br>",
            purchaseLimit: 1000,
            cost(x) { return new Decimal(1).times(Decimal.pow(1.3, x)); },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Matter" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1,000<br>" + "<br>Effect: " + (new Decimal(1).add((getBuyableAmount(this.layer, this.id))/100)) +"x"},
            canAfford() { return player.darkmatter.points.gte(this.cost()) },
            buy() {
                if (this.canAfford()) {
                    if (! hasMilestone("unstablefuel", 20)) {
                        player.darkmatter.points = player.darkmatter.points.sub(this.cost());
                    }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
                }
            },
        },
        21: {
            title: "Unstable Generation<br>",
            purchaseLimit: 88,
            unlocked() { return hasUpgrade("galaxy", 35) || hasMilestone("unstablefuel", 7); },
            cost(x) { return new Decimal(10).times(Decimal.pow(1.2, x)); },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dark Matter" +
                       "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/88<br>" +
                       "<br>Effect: Generate " + format(getBuyableAmount('darkmatter', 21).add(12)) + "% of Unstable Rocket Fuel/s";
            },
            canAfford() { return player.darkmatter.points.gte(this.cost()); },
            buy() {
                if (this.canAfford()) {
                    if (! hasMilestone("unstablefuel", 20)) {
                        player.darkmatter.points = player.darkmatter.points.sub(this.cost());
                    }
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
                }
            },
        }
        
    },
  })
