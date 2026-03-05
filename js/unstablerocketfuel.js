addLayer("unstablefuel", {
    name: "Unstable Rocket Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⛽", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},

    symbol(){
        if (options.emojisEnabled == true) symbol = "⛽"
        else symbol = "URF"
        return symbol
    },
    layerShown(){
        let visible = false
        if (inChallenge('real', 11)) visible = true
       return visible
     },

     autoUpgrade() {
        if (hasMilestone("supernova", 3)) return true
        else return false
    },

      doReset(reset) {
        let keep = [];
        if (hasMilestone("galaxy", 1)) keep.push("milestones");
        if (hasMilestone("supernova", 1)) keep.push("milestones");
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) {
            layerDataReset("unstablefuel", keep);
        }
    },

     passiveGeneration() {
        if (! inChallenge("real", 11)) return 0
        if (hasMilestone('unstablefuel', 7)) return (getBuyableAmount('darkmatter', 21).add(12) ?? new Decimal(0)) /100
        if (hasMilestone('unstablefuel', 2)) return 0.12
        return 0
    },
    color: "#4b063d",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Unstable Rocket Fuel", // Name of prestige currency
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1);
        if ((layers.galaxy.effect()?.gte(1)) ?? false) mult = mult.times(layers.galaxy.effect());
         if (hasMilestone('unstablefuel', 1)) mult = mult.times(2);
        if (hasUpgrade('unstablefuel', 21)) mult = mult.times(1.5);
        if (hasUpgrade('unstablefuel', 22)) mult = mult.times(1.25);
        if (hasUpgrade('unstablefuel', 23)) mult = mult.times(upgradeEffect('unstablefuel', 23));
        if (hasUpgrade('unstablefuel', 31)) mult = mult.times(2);
        if (hasUpgrade('unstablefuel', 32)) mult = mult.times(1.5);
        if (hasUpgrade('unstablefuel', 33)) mult = mult.times(1.2);
        if (hasUpgrade('unstablefuel', 34)) mult = mult.times(upgradeEffect('unstablefuel', 34));
        if (hasUpgrade('unstablefuel', 41)) mult = mult.times(3);
        if (hasUpgrade('unstablefuel', 44)) mult = mult.times(upgradeEffect('unstablefuel', 44));
        if (hasUpgrade('galaxy', 14)) mult = mult.times(2);
        if (hasUpgrade('galaxy', 23)) mult = mult.times(upgradeEffect('galaxy', 23));
        if (hasMilestone('unstablefuel', 1)) mult = mult.times(buyableEffect("darkmatter", 12));
        if (hasUpgrade('galaxy', 32)) mult = mult.times(upgradeEffect('galaxy', 32));
        if (hasUpgrade('unstablefuel', 52)) mult = mult.times(upgradeEffect('unstablefuel', 52));
        if (hasUpgrade('unstablefuel', 54)) mult = mult.times(upgradeEffect('unstablefuel', 54));
        if (hasMilestone("supernova", 1)) mult = mult.times(3);
        if (hasMilestone("supernova", 2)) mult = mult.times(2);
        if (hasUpgrade('supernova', 14)) mult = mult.times(upgradeEffect('supernova', 14));
        if (hasUpgrade('galaxy', 53)) mult = mult.times(upgradeEffect('galaxy', 53));
        if (hasUpgrade('unstablefuel', 61)) mult = mult.times(upgradeEffect('unstablefuel', 61));
        if (hasUpgrade('unstablefuel', 64)) mult = mult.times(upgradeEffect('unstablefuel', 64));
        if (hasMilestone('unstablefuel', 11)) mult = mult.times(5);
        if (hasUpgrade('supernova', 24)) mult = mult.times(upgradeEffect('supernova', 24));
        if (hasUpgrade('supernova', 34)) mult = mult.times(upgradeEffect('supernova', 34));
        if (hasMilestone("supernova", 4)) mult = mult.times(5);
        if (hasUpgrade('galaxy', 54)) mult = mult.times(2000);
        if (hasMilestone('unstablefuel', 13)) mult = mult.times(1000);
        if (hasMilestone("supernova", 5)) mult = mult.times(5);
        if (hasUpgrade('supernova', 44)) mult = mult.times(upgradeEffect('supernova', 44));
        if (hasMilestone("supernova", 6)) mult = mult.times(5);
        if (hasMilestone("supernova", 8)) mult = mult.times(player.darkenergy.points.pow(0.7).add(1));
        if (hasUpgrade('supernova', 54)) mult = mult.times(upgradeEffect('supernova', 54));
        if (hasUpgrade('unstablefuel', 71)) mult = mult.times(upgradeEffect('unstablefuel', 71));
        if (hasMilestone('unstablefuel', 16)) mult = mult.times(1000);
        if (hasUpgrade('galaxy', 64)) mult = mult.times(5000);
        if (hasUpgrade('blackhole', 14)) mult = mult.times(100);
        if (hasMilestone('unstablefuel', 19)) mult = mult.times(100);
        if (hasUpgrade('blackhole', 53)) mult = mult.times(('blackhole', 53));
        if (hasUpgrade('unstablefuel', 74)) mult = mult.times(upgradeEffect('unstablefuel', 74));

        // Inf Reality II
        if (hasMilestone('negativeinf', 2)) mult = mult.times(3);
        if (hasMilestone('negativeinf', 7)) mult = mult.times(2);
    
        return mult;
    },
    
    

    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (player.unstablefuel.points.gte(5e5)) exp = exp.times(0.85)
        if (player.unstablefuel.points.gte(1e8)) exp = exp.times(0.88)
        return exp
    },
    hotkeys: [
        {key: "n", description: "N: Press for Unstable Rocket Fuel Reset", onPress(){if (canReset(this.layer) && (inChallenge("real", 11))) doReset(this.layer)}},
    ],
    tabFormat: {
    "Main": {
            content: [
            ["display-text",
            'Reality II: Abyss', { "color": "#5e4158", "font-size": "32px", "text-shadow": "0px 0px 20px #5e4158"}],
            "blank",
            "blank",
            "main-display",
            "resource-display",
            "blank",
            "prestige-button",
            "blank",
         ],
        },
        "Upgrades": {
            content: [
            "main-display",
            "blank",
            "prestige-button",
            "blank",
           "upgrades",
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
         unlocked() { return hasUpgrade("unstablefuel", 15) || hasMilestone("unstablefuel", 1)},
        },
     },
     milestones: {
        1: {
            requirementDescription: "Unstable Milestone I",
            effectDescription: "2x Unstable Rocket Fuel",
            unlocked() {return hasUpgrade(this.layer, 11) || hasMilestone(this.layer, 1)},
            done() {return (hasUpgrade(this.layer, 15))}
        },
        2: {
            requirementDescription: "Unstable Milestone II",
            effectDescription: "12% of Unstable Rocket Fuel/s",
            unlocked() {return hasUpgrade(this.layer, 25) || hasMilestone(this.layer, 2)},
            done() {return (hasUpgrade(this.layer, 25))}
        },
        3: {
            requirementDescription: "Unstable Milestone III",
            effectDescription: "Unlock Galaxies",
            unlocked() {return hasUpgrade(this.layer, 35) || hasMilestone(this.layer, 3)},
            done() {return (hasUpgrade(this.layer, 35))}
        },
        4: {
            requirementDescription: "Unstable Milestone IV",
            effectDescription: "/5 Galaxy Price",
            unlocked() {return hasUpgrade("galaxy", 15) || hasMilestone(this.layer, 4)},
            done() {return (hasUpgrade("galaxy", 15))}
        },
        5: {
            requirementDescription: "Unstable Milestone V",
            effectDescription: "Improve Cosmic Dust Formula",
            unlocked() {return hasUpgrade(this.layer, 45) || hasMilestone(this.layer, 5)},
            done() {return (hasUpgrade(this.layer, 45))}
        },
        6: {
            requirementDescription: "Unstable Milestone VI",
            effectDescription: "3x Dark Matter",
            unlocked() {return hasUpgrade("galaxy", 25) || hasMilestone(this.layer, 6)},
            done() {return (hasUpgrade("galaxy", 25))}
        },
        7: {
            requirementDescription: "Unstable Milestone VII",
            effectDescription: "Unlock a new Dark Matter Buyable",
            unlocked() {return hasUpgrade("galaxy", 35) || hasMilestone(this.layer, 7)},
            done() {return (hasUpgrade("galaxy", 35))}
        },
        8: {
            requirementDescription: "Unstable Milestone VIII",
            effectDescription: "Improve Cosmic Dust Formula",
            unlocked() {return hasUpgrade("unstablefuel", 55) || hasMilestone(this.layer, 8)},
            done() {return (hasUpgrade("unstablefuel", 55))}
        },
        9: {
            requirementDescription: "Unstable Milestone IX",
            effectDescription: "Unlock Supernova",
            unlocked() {return hasUpgrade("galaxy", 45) || hasMilestone(this.layer, 9)},
            done() {return (hasUpgrade("galaxy", 45))}
        },
        10: {
            requirementDescription: "Unstable Milestone X",
            effectDescription: "5x Dark Matter",
            unlocked() {return hasUpgrade("supernova", 15) || hasMilestone(this.layer, 10)},
            done() {return (hasUpgrade("supernova", 15))}
        },
        11: {
            requirementDescription: "Unstable Milestone XI",
            effectDescription: "5x Unstable Rocket Fuel",
            unlocked() {return hasUpgrade("supernova", 25) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("supernova", 25))}
        },
        12: {
            requirementDescription: "Unstable Milestone XII",
            effectDescription: "10x Cosmic Dust",
            unlocked() {return hasUpgrade("supernova", 35) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("supernova", 35))}
        },
        13: {
            requirementDescription: "Unstable Milestone XIII",
            effectDescription: "1000x Unstable Rocket Fuel",
            unlocked() {return hasUpgrade("galaxy", 55) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("galaxy", 55))}
        },
        14: {
            requirementDescription: "Unstable Milestone XIV",
            effectDescription: "10x Dark Matter",
            unlocked() {return hasUpgrade("unstablefuel", 65) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("unstablefuel", 65))}
        },
        15: {
            requirementDescription: "Unstable Milestone XV",
            effectDescription: "Auto-buy Dark Matter Buyables",
            unlocked() {return hasUpgrade("supernova", 45) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("supernova", 45))}
        },
        16: {
            requirementDescription: "Unstable Milestone XVI",
            effectDescription: "1000x Unstable Rocket Fuel",
            unlocked() {return hasUpgrade("supernova", 55) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("supernova", 55))}
        },
        17: {
            requirementDescription: "Unstable Milestone XVII",
            effectDescription: "2x Void",
            unlocked() {return hasUpgrade("blackhole", 15) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("blackhole", 15))}
        },
        18: {
            requirementDescription: "Unstable Milestone XVIII",
            effectDescription: "2x Void",
            unlocked() {return hasUpgrade("galaxy", 65) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("galaxy", 65))}
        },
        19: {
            requirementDescription: "Unstable Milestone XIX",
            effectDescription: "3x Void, 100x Unstable Rocket Fuel",
            unlocked() {return hasUpgrade("blackhole", 25) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("blackhole", 25))}
        },
        20: {
            requirementDescription: "Unstable Milestone XX",
            effectDescription: "Dark Matter Buyables cost nothing",
            unlocked() {return hasUpgrade("blackhole", 35) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("blackhole", 35))}
        },
        21: {
            requirementDescription: "Unstable Milestone XXI",
            effectDescription: "1% of Void/s",
            unlocked() {return hasUpgrade("blackhole", 45) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("blackhole", 45))}
        },
        22: {
            requirementDescription: "Unstable Milestone XXII",
            effectDescription: "1e12x Money",
            unlocked() {return hasUpgrade("blackhole", 55) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("blackhole", 55))}
        },
        23: {
            requirementDescription: "Unstable Milestone XXIII",
            effectDescription: "Unlock Negative Infinity & Bet Amount is always 100%",
            unlocked() {return hasUpgrade("unstablefuel", 75) || hasMilestone(this.layer, this.id)},
            done() {return (hasUpgrade("unstablefuel", 75))}
        },
    },
    upgrades: {
        11: {
            title: "Expiremental Rocket Fuel",
            description: "+1 money/s",
            cost: new Decimal(1),
        },
        12: {
            title: "Decayed Rocket Fuel",
            description: "+2 money/s",
            unlocked() { return (hasUpgrade(this.layer, 11))},
            cost: new Decimal(3),
        },
        13: {
            title: "Corrosive Rocket Fuel",
            description: "+3 money/s",
            unlocked() { return (hasUpgrade(this.layer, 12))},
            cost: new Decimal(9),
        },
        14: {
            title: "Unstable Rocket Fuel",
            description: "+4 money/s",
            unlocked() { return (hasUpgrade(this.layer, 13))},
            cost: new Decimal(27),
        },
        15: {
            title: "Milestone",
            description: "Unlock Unstable Milestone I",
            unlocked() { return (hasUpgrade(this.layer, 14))},
            cost: new Decimal(50),
        },
        21: {
            title: "Fuel Tanks Error",
            description: "1.5x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 15))},
            cost: new Decimal(111),
        },
        22: {
            title: "Leaking Fuel",
            description: "1.25x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 21))},
            cost: new Decimal(171),
        },
        23: {
            title: "Fuel Overflow",
            description: "Unstable Rocket Fuel gain is increased based on your Achievements",
            unlocked() { return (hasUpgrade(this.layer, 22))},
            cost: new Decimal(222),
            effect() {
                return player.a.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Unstable Profit",
            description: "Money gain is increased based on your Secret Achievements",
            unlocked() { return (hasUpgrade(this.layer, 23))},
            cost: new Decimal(383),
            effect() {
                return (player.sa.points)
            },
            effectDisplay() { return "+"+ format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        25: {
            title: "Milestone",
            description: "Unlock Unstable Milestone II",
            unlocked() { return (hasUpgrade(this.layer, 24))},
            cost: new Decimal(500),
        },
        31: {
            title: "Unstable Rockets",
            description: "2x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 25))},
            cost: new Decimal(777),
        },
        32: {
            title: "Unpowered Rockets",
            description: "1.5x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 31))},
            cost: new Decimal(1414),
        },
        33: {
            title: "Corrupted Rocket Fuel",
            description: "1.2x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 32))},
            cost: new Decimal(2545),
        },
        34: {
            title: "Destroy Rocket Fuel",
            description: "Unstable Rocket Fuel gain is increased based on your Money",
            unlocked() { return (hasUpgrade(this.layer, 33))},
            cost: new Decimal(3333),
            effect() {
                return new Decimal(player.points.add(1).pow(0.11))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        35: {
            title: "Milestone",
            description: "Unlock Unstable Milestone III",
            unlocked() { return (hasUpgrade(this.layer, 34))},
            cost: new Decimal(5000),
        },
        41: {
            title: "Unstable Rockets II",
            description: "3x Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 35) && (hasUpgrade("galaxy", 13)))},
            cost: new Decimal(545454),
        },
        42: {
            title: "Galactic Money",
            description: "Money gain is increased based on your Galaxies",
            unlocked() { return (hasUpgrade(this.layer, 41))},
            cost: new Decimal(1111111),
            effect() {
                return (player.galaxy.points.add(1).times(2))
            },
            effectDisplay() { return "+"+ format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        43: {
            title: "Unstable Money",
            description: "Money gain is increased based on your Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 42))},
            cost: new Decimal(2222222),
            effect() {
                let fuel = new Decimal(player.unstablefuel?.points || 0);
                return fuel.add(1).log10().max(0); 
            },            
            effectDisplay() { return "+"+ format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        44: {
            title: "Galactic Fuel",
            description: "Unstable Rocket Fuel gain is increased based on your Galaxies",
            unlocked() { return (hasUpgrade(this.layer, 43)) },
            cost: new Decimal(3333333),
            effect() {
                let galaxies = new Decimal(player.galaxy?.points || 0); // Ensure it's defined
                return galaxies.add(1).log2().max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },
        
        45: {
            title: "Milestone",
            description: "Unlock Unstable Milestone V",
            unlocked() { return (hasUpgrade(this.layer, 44))},
            cost: new Decimal(5e6),
        },
        51: {
            title: "Unstable Money",
            description: "Money gain is increased based on your Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 45)) && hasMilestone("darkmatter", 2)},
            cost: new Decimal(111111111),
            effect() {
                let fuel = new Decimal(player.unstablefuel?.points || 0); // Ensure it's defined
                return fuel.add(1).log2().add(1).max(1); // Prevent NaN and negative values
            },            
            effectDisplay() { return "+"+ format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        52: {
            title: "Dark Fuel",
            description: "Unstable Rocket Fuel gain is increased based on your Dark Matter",
            unlocked() { return (hasUpgrade(this.layer, 51)) },
            cost: new Decimal(282828282),
            effect() {
                let darkMatter = new Decimal(player.darkmatter?.points || 0); // Ensure it's defined
                return darkMatter.add(1).log10().max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },        
        53: {
            title: "Dark Money",
            description: "Money gain is increased based on your Dark Matter",
            unlocked() { return (hasUpgrade(this.layer, 52))},
            cost: new Decimal(989898989),
            effect() {
                let eff = new Decimal(player.darkmatter?.points || 0); // Ensure it's defined
                return eff.add(1).log2().max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        54: {
            title: "Secret Fuel",
            description: "Unstable Rocket Fuel gain is increased based on your Secret Achievements",
            unlocked() { return (hasUpgrade(this.layer, 53)) },
            cost: new Decimal(2222222222),
            effect() {
                let secretAchievements = new Decimal(player.sa?.points || 0); // Ensure it's defined
                return secretAchievements.add(1).log2().div(1.5).max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },        
        55: {
            title: "Milestone",
            description: "Unlock Unstable Milestone VIII",
            unlocked() { return (hasUpgrade(this.layer, 54))},
            cost: new Decimal(5e9),
        },
        61: {
            title: "Dark Fuel II",
            description: "Unstable Rocket Fuel gain is increased based on your Dark Matter",
            unlocked() { return (hasUpgrade(this.layer, 55) && hasUpgrade("galaxy", 21)) },
            cost: new Decimal(1.1111e11),
            effect() {
                let darkMatter = new Decimal(player.darkmatter?.points || 0); // Ensure it's defined
                return darkMatter.add(1).log10().times(2.32).max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },        
        62: {
            title: "Unstable Money II",
            description: "Money gain is increased based on Unstable Rocket Fuel",
            cost: new Decimal(1.313e13),
            unlocked() {return hasUpgrade("unstablefuel", 61)},
            effect() {
                let baseEffect = player.unstablefuel.points.add(1).pow(0.2);
                if (baseEffect.gt(10000)) {
                    baseEffect = new Decimal(10000).plus(baseEffect.minus(10000).log2());
                }
                return baseEffect;
            },
            effectDisplay() { 
                let effectValue = upgradeEffect(this.layer, this.id);
                let display = "+" + format(effectValue);
                if (effectValue.gt(10000)) display += " (Softcapped)";
                return display;
            }
        },
        63: {
            title: "Unstable Money III",
            description: "Money gain is increased based on Unstable Rocket Fuel",
            cost: new Decimal(1.51e15),
            unlocked() {return hasUpgrade("unstablefuel", 62)},
            effect() {
                let baseEffect = player.unstablefuel.points.add(1).pow(0.35);
                if (baseEffect.gt(1e6)) {
                    baseEffect = new Decimal(1e6).plus(baseEffect.minus(1e6).log2());
                }
                return baseEffect;
            },
            effectDisplay() { 
                let effectValue = upgradeEffect(this.layer, this.id);
                let display = "+" + format(effectValue);
                if (effectValue.gt(1e6)) display += " (Softcapped)";
                return display;
            }
        },
        64: {
            title: "Dark Fuel III",
            description: "Unstable Rocket Fuel gain is increased based on your Dark Matter",
            unlocked() { return (hasUpgrade(this.layer, 63)) },
            cost: new Decimal(2.22222e20),
            effect() {
                let darkMatter = new Decimal(player.darkmatter?.points || 0); // Ensure it's defined
                return darkMatter.add(1).log2().add(1).times(darkMatter.add(1).log10()).max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },        
        65: {
            title: "Milestone",
            description: "Unlock Unstable Milestone XIV",
            unlocked() { return (hasUpgrade(this.layer, 64))},
            cost: new Decimal(1e27),
        },
        71: {
            title: "Unstable Energy",
            description: "Unstable Rocket Fuel gain is increased based on your Dark Energy",
            unlocked() { return (hasUpgrade(this.layer, 55) && hasMilestone("darkmatter", 3))},
            cost: new Decimal(1e37),
            effect() {
                return (player.darkenergy.points.add(1))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"}, // Add formatting to the effect
        },
        72: {
            title: "Unstable Money IV",
            description: "Money gain is increased based on Unstable Rocket Fuel",
            cost: new Decimal(1e42),
            unlocked() {return hasUpgrade("unstablefuel", 71)},
            effect() {
                let baseEffect = player.unstablefuel.points.add(1).pow(0.195);
                if (baseEffect.gt(1e10)) {
                    baseEffect = new Decimal(1e10).plus(baseEffect.minus(1e6).log2());
                }
                return baseEffect;
            },
            effectDisplay() { 
                let effectValue = upgradeEffect(this.layer, this.id);
                let display = "+" + format(effectValue);
                if (effectValue.gt(1e10)) display += " (Softcapped)";
                return display;
            }
        },
        73: {
            title: "Unstable Matter",
            description: "Dark Matter gain is increased based on your Unstable Rocket Fuel",
            unlocked() { return (hasUpgrade(this.layer, 72)) },
            cost: new Decimal(5.55e55),
            effect() {
                let unstableFuel = new Decimal(player.unstablefuel?.points || 0); // Ensure it's defined
                return unstableFuel.add(1).log10().max(0); // Prevent NaN and negative values
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect
        },        
        74: {
            title: "Unstable Rolls",
            description: "Unstable Rocket Fuel gain is increased based on your Total rolls",
            unlocked() { return (hasUpgrade(this.layer, 73))},
            cost: new Decimal(1e63),
            effect() {
                return ((player.blackhole.totalRolls.pow(0.9).add(1)))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"}, // Add formatting to the effect
        },
        75: {
            title: "Milestone",
            description: "Unlock Unstable Milestone XXIII",
            unlocked() { return (hasUpgrade(this.layer, 74))},
            cost: new Decimal(1e69),
        },
    },
  })
