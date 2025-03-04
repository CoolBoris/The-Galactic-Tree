addLayer("cosmicdust", {
    name: "cosmicdust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    passiveGeneration() {
        if (! inChallenge('real', 11)) return 0
        if (hasMilestone('unstablefuel', 8)) return 0.07
        if (hasMilestone('unstablefuel', 5)) return 0.04
        return 0.01
    },
    layerShown() {
        let visible = false
        return visible
    },


    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("cosmicdust", keep)
    },

    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "Cosmic Dust", // Name of prestige currency
    baseResource: "Galaxies", // Name of resource prestige is based on
    baseAmount() { return player.galaxy.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('galaxy', 12)) mult = mult.times(2)
        if (hasUpgrade('galaxy', 24)) mult = mult.times(3)
        if (hasMilestone('unstablefuel', 1)) mult = mult.times(new Decimal(1).add((getBuyableAmount("darkmatter", 13))/100))
        if (hasUpgrade('galaxy', 33)) mult = mult.times(4)
        if (hasMilestone("supernova", 1)) mult = mult.times(3)
        if (hasMilestone("supernova", 2)) mult = mult.times(3)
        if (hasMilestone("unstablefuel", 12)) mult = mult.times(10)
        if (hasUpgrade('blackhole', 12)) mult = mult.times(10)


        // Inf Reality II
        if (hasMilestone('negativeinf', 3)) mult = mult.times(3)
        if (hasMilestone('negativeinf', 8)) mult = mult.times(2)

        return mult
    },

    logCosmicRays() {
        if ((player.cosmicdust.points > 0.99) && inChallenge("real", 11)) {
            let baseLog = Math.log10(player.cosmicdust.points)+1;
            let logarithmicValue = baseLog;
    
            if (hasUpgrade('galaxy', 22)) {
                logarithmicValue *= baseLog;
            }

            if (hasMilestone('darkmatter', 1)) {
                logarithmicValue *= Math.log10(player.cosmicdust.points)/2.435+1;
            }

            if (hasUpgrade('galaxy', 43)) {
                logarithmicValue += Math.log2(player.cosmicdust.points)*(Math.log2(player.cosmicdust.points)/6.3);
            }

            if (hasUpgrade('supernova', 13)) {
                logarithmicValue *= upgradeEffect("supernova", 13);
            }

            if (hasUpgrade('supernova', 23)) {
                logarithmicValue *= upgradeEffect("supernova", 23);
            }

            if (hasUpgrade('supernova', 33)) {
                logarithmicValue *= upgradeEffect("supernova", 33);
            }

            if (hasUpgrade('supernova', 43)) {
                logarithmicValue *= upgradeEffect("supernova", 43);
            }

            if (hasUpgrade('supernova', 53)) {
                logarithmicValue *= upgradeEffect("supernova", 53);
            }
    
            player.cosmicrays.points = new Decimal(logarithmicValue);
            return logarithmicValue;
        } else {
            player.cosmicrays.points = new Decimal(0);
            return 0;
        }
    },
    
    
})

addLayer("cosmicrays", {
    name: "cosmicrays", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    layerShown() {
        let visible = false
        return visible
    },
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Cosmic Rays", // Name of prestige currency
    baseResource: "Cosmic Dust", // Name of resource prestige is based on
    baseAmount() { return player.cosmicdust.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("cosmicrays", keep)
    },
})

addLayer("galaxy", {
    name: "Galaxy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌌", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    doReset(reset) {
        let keep = [];
        if (hasMilestone("supernova", 6)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("galaxy", keep)
    },

    symbol(){
        if (options.emojisEnabled == true) symbol = "🌌"
        else symbol = "G"
        return symbol
    },

    autoPrestige() {
        if (hasMilestone("blackhole", 7)) return true
        else return false
    },

    autoUpgrade() {
        if (hasMilestone("blackhole", 1)) return true
        else return false
    },

    canBuyMax(){
        let buyMax = false
        if (hasMilestone('supernova', 4)) buyMax = true
       return buyMax
     },

    passiveGeneration() {
        return 0
    },
    layerShown() {
        let visible = false
        if (hasMilestone("unstablefuel", 3) && inChallenge("real", 11)) visible = true
        if (player.galaxy.points.gte(1) && inChallenge("real", 11)) visible = true
        return visible
    },

    cap() {
        if (player.galaxy.points.gt(10)) {
            player.galaxy.points = new Decimal(10);
        }
    },

    branches: ["unstablefuel"],
    color: "#1b1357",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Galaxies", // Name of prestige currency
    baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
    baseAmount() { return player.unstablefuel.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone("unstablefuel", 4)) mult = mult.divide(5)
        if (hasUpgrade('galaxy', 21)) mult = mult.divide(upgradeEffect('galaxy', 21))

        if (player.galaxy.points.gte(10)) mult = mult.times("-1e9999999999999999999")
        
            // Inf Reality II
        if (hasMilestone('negativeinf', 5)) mult = mult.divide(5)

        return mult
    },

    hotkeys: [
        {key: "g", description: "G: Press for Galaxy Reset", onPress(){if (canReset(this.layer) && (inChallenge("real", 11))) doReset(this.layer)}},
    ],

    effect() {
        let effectboost = new Decimal(2).pow(player.galaxy.points)
        return effectboost
    },

    effectDescription() {
        return "which multiplies Unstable Rocket Fuel gain by " + format(tmp.galaxy.effect) + "x"
    },

    tabFormat: {
        "Main": {
                content: [
                "main-display",
                "blank",
                "prestige-button",
                "blank",
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
             unlocked() {return player.galaxy.points.gte(1)},
            },
            "The Cosmos": {
                content: [
                ["display-text",
                    function () {
                        let txt = "";
                        txt += `You have 
                        <h2><span style="color:rgb(111, 250, 255); text-shadow: 0px 0px 20px rgb(105, 164, 173); font-family: Lucida Console, Courier New, monospace">
                            ${format(player.cosmicdust.points)}</span></h2> Cosmic Dust which grants you
                        <h2><span style="color:rgb(250, 211, 111); text-shadow: 0px 0px 20px rgb(173, 146, 105); font-family: Lucida Console, Courier New, monospace">
                            ${format(player.cosmicrays.points)}</span></h2> Cosmic Rays`;
                        return txt;
                    }],
                "blank",
               "upgrades",
             ],
             unlocked() {return player.galaxy.points.gte(3)},
             buttonStyle() { return {"border-color": "rgb(111, 250, 255)"} },

            },
         },

         milestones: {
            1: {
                requirementDescription: "Milky Way Galaxy (1)",
                effectDescription: "Keep Unstable Rocket Fuel Milestones",
                done() {return player.galaxy.points.gte(1)}
            },
            2: {
                requirementDescription: "Andromeda Galaxy (3)",
                effectDescription: "Unlock The Cosmos",
                unlocked() {return hasMilestone("galaxy", 1)},
                done() {return player.galaxy.points.gte(3)}
            },
            3: {
                requirementDescription: "Sombrero Galaxy (10)",
                effectDescription: "Unlock Dark Matter & Hardcaps Galaxies",
                unlocked() {return hasMilestone("galaxy", 2)},
                done() {return player.galaxy.points.gte(10)}
            },
        }, 
        upgrades: {
            11: {
                title: "Cosmic Boost",
                description: "Money gain is increased based on Cosmic Dust",
                cost: new Decimal(0.3),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.cosmicdust.points.add(1).pow(0.4);
                    if (baseEffect.gt(100)) {
                        baseEffect = new Decimal(100).plus(baseEffect.minus(100).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    if (effectValue.gt(100)) display += " (Softcapped)";
                    return display;
                }
            },            
            12: {
                title: "Cosmic Travel",
                description: "2x Cosmic Dust gain",
                cost: new Decimal(0.5),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 11)},
            },
            13: {
                title: "Unstable Cosmos",
                description: "Unlock 5 Unstable Rocket Fuel Upgrades",
                cost: new Decimal(1),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 12)},
            },
            14: {
                title: "Unstable Galaxy",
                description: "2x Unstable Rocket Fuel<br>Cost: 1.40",
                cost: new Decimal(1.4),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 13)},
            },
            15: {
                title: "Milestone",
                description: "Unlock Unstable Milestone IV<br>Cost: 1.80",
                cost: new Decimal(1.8),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 14)},
            },
            21: {
                title: "Space Smoothie",
                description: "Galaxy Cost is decreased based on Cosmic Dust",
                cost: new Decimal(2),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 15)},
                effect() {
                    return (Math.log10(player.cosmicdust.points) + 1)
                },
                effectDisplay() { return "/"+ format(upgradeEffect(this.layer, this.id)) }
            },
            22: {
                title: "Cosmic Rays Deluxe",
                description: "Better Cosmic Rays Formula<br>Cost: 2.20",
                cost: new Decimal(2.2),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 21)},
            },
            23: {
                title: "Unstable Rays",
                description: "Unstable Rocket Fuel gain is increased based on Cosmic Rays<br>Cost: 5.40",
                cost: new Decimal(5.4),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 22)},
                effect() {
                    return (Math.log2(player.cosmicrays.points+1))
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            24: {
                title: "Cosmic Travel II",
                description: "3x Cosmic Dust<br>",
                cost: new Decimal(8),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 23)},
            },
            25: {
                title: "Milestone",
                description: "Unlock Unstable Milestone VI",
                cost: new Decimal(11),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy",24)},
            },
            31: {
                title: "Dark Rays",
                description: "Dark Matter gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(15),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 25)},
                effect() {
                    return ((Math.log10(player.cosmicrays.points)/1.5)+1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            32: {
                title: "Unstable Rays II",
                description: "Unstable Rocket Fuel gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(20),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() {return player.cosmicrays},
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 31)},
                effect() {
                    return ((Math.log2(player.cosmicrays.points)+1)*0.8)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            33: {
                title: "Cosmic Travel III",
                description: "4x Cosmic Dust<br>",
                cost: new Decimal(22),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 32)},
            },
            34: {
                title: "Dark Travel",
                description: "2x Dark Matter<br>",
                cost: new Decimal(25),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 33)},
            },
            35: {
                title: "Milestone",
                description: "Unlock Unstable Milestone VII",
                cost: new Decimal(28),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy",34)},
            },
            41: {
                title: "Dark Travel II",
                description: "3x Dark Matter<br>",
                cost: new Decimal(31),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 35)},
            },
            42: {
                title: "Dark Rays II",
                description: "Dark Matter gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(34),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 41)},
                effect() {
                    return ((Math.log10(player.cosmicrays.points)/1.2)+1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            43: {
                title: "Cosmic Rays Deluxe II",
                description: "Better Cosmic Rays Formula",
                cost: new Decimal(38),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 42)},
            },
            44: {
                title: "Cosmic Boost II",
                description: "Money gain is increased based on Cosmic Dust",
                cost: new Decimal(80),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 43)},
                effect() {
                    let baseEffect = player.cosmicdust.points.add(1).pow(0.43);
                    if (baseEffect.gt(250)) {
                        baseEffect = new Decimal(250).plus(baseEffect.minus(250).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    if (effectValue.gt(250)) display += " (Softcapped)";
                    return display;
                }
            },
            45: {
                title: "Milestone",
                description: "Unlock Unstable Milestone IX",
                cost: new Decimal(85),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy",44)},
            },
            51: {
                title: "Unstable Cosmos II",
                description: "Unlock 5 Unstable Rocket Fuel Upgrades",
                cost: new Decimal(150),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, 45)},
            },
            52: {
                title: "Dark Travel III",
                description: "4x Dark Matter<br>",
                cost: new Decimal(200),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 51)},
            },
            53: {
                title: "Unstable Rays III",
                description: "Unstable Rocket Fuel gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(300),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() {return player.cosmicrays},
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 52)},
                effect() {
                    return ((Math.log2(player.cosmicrays.points)+1))
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            54: {
                title: "Ultimate",
                description: "2000x Unstable Rocket Fuel",
                cost: new Decimal(450),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 53)},
            },
            55: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XIII",
                cost: new Decimal(1000),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy",54)},
            },
            61: {
                title: "Dark Travel IV",
                description: "10x Dark Matter<br>",
                cost: new Decimal(3200),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 55)},
            },
            62: {
                title: "Cosmic Energy",
                description: "Dark Energy gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(4000),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() {return player.cosmicrays},
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 61)},
                effect() {
                    return ((Math.log10(player.cosmicrays.points)/13)+1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            63: {
                title: "Cosmic Energy II",
                description: "Dark Energy gain is increased based on Cosmic Rays<br>",
                cost: new Decimal(8000),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() {return player.cosmicrays},
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 62)},
                effect() {
                    return ((Math.log10(player.cosmicrays.points)/9)+1)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }
            },
            64: {
                title: "Ultimate II",
                description: "5000x Unstable Rocket Fuel",
                cost: new Decimal(10000),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy", 63)},
            },
            65: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XVIII",
                cost: new Decimal(20000),
                currencyDisplayName: "Cosmic Rays",
                currencyLocation() { return player.cosmicrays },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade("galaxy",64)},
            },
            
        },
})