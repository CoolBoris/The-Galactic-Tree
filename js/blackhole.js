addLayer("blackhole", {
    name: "blackhole", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 2,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            betAmount: new Decimal(0.01),
            winAmount: new Decimal(0),
            betColor: "BLACK",
            cooldown: new Decimal(1),
            maxCooldown: new Decimal(10),
            rolledNumber: new Decimal(0),
            rolledColor: "GREEN",
            winstreak: new Decimal(0),
            losestreak: new Decimal(0),
            winChance: new Decimal(0.4865),
            greenWinchance: new Decimal(1.0270),
            totalRolls: new Decimal(0),
        }
    },

    symbol(){
        if (options.emojisEnabled == true) symbol = "✴"
        else symbol = "BH"
        return symbol
    },
    passiveGeneration() {
        if (! inChallenge("real", 11)) return 0
        if (hasMilestone('unstablefuel', 21)) return 0.01
        return 0
    },
    layerShown() {
        let visible = false
        if (hasMilestone("supernova", 7) && inChallenge("real", 11)) visible = true
        if (player.blackhole.points.gte(1) && inChallenge("real", 11)) visible = true
        return visible
    },

    calculateBetAmount() {
        if (hasMilestone('unstablefuel', 23)) player.blackhole.betAmount = new Decimal(1);
    },

    calculateWinAmount() {
        if (player.blackhole.betColor === "GREEN") {
            player.blackhole.winAmount = player.blackhole.points.times(player.blackhole.betAmount).times(35);
        } else {
            player.blackhole.winAmount = player.blackhole.points.times(player.blackhole.betAmount).times(2);
        }

        if (hasUpgrade('blackhole', 41)) player.blackhole.winAmount = player.blackhole.winAmount.times(2);

        if (hasUpgrade('blackhole', 44)) player.blackhole.winAmount = player.blackhole.winAmount.times(1.5);

        if (hasUpgrade('blackhole', 52)) player.blackhole.winAmount = player.blackhole.winAmount.times(2);


    },

    calculateWinChance() {
        if (hasUpgrade('blackhole', 51)) {
            player.blackhole.winChance = new Decimal(0.5);
         }

         if (hasUpgrade('blackhole', 52)) {
            player.blackhole.winChance = new Decimal(0.55);
         }

         if (hasUpgrade('blackhole', 54)) {
            player.blackhole.winChance = new Decimal(0.6);
         }
    },

    calculateGreenWinChance() {
         if (hasUpgrade('blackhole', 52)) {
            player.blackhole.greenWinchance = new Decimal(0.03);
         }
    },

    maxCooldown() {
        if (hasUpgrade('blackhole', 31)) {
           player.blackhole.maxCooldown = new Decimal(9);
        }

        if (hasUpgrade('blackhole', 41)) {
            player.blackhole.maxCooldown = new Decimal(8);
        }

        if (hasUpgrade('blackhole', 44)) {
            player.blackhole.maxCooldown = new Decimal(7);
        }

        if (hasUpgrade('blackhole', 54)) {
            player.blackhole.maxCooldown = new Decimal(6);
        }
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("blackhole", keep)
    },


    branches: ["darkmatter", "galaxy"],
    color: "rgb(0, 0, 0)",
    nodeStyle() {
        return {
            "background": "radial-gradient(circle, #130023, #000000)",
            "width": "125px",
            "height": "125px",
        };
    },

    componentStyles: {
        "prestige-button"() {return {
            "color": "white",
            "width": "200px",
            "height": "150px",
        }},
        "milestone-popup"() {return {
            "color": "white",
        }
    },
    "upgrade"() {return {
        "background-color": "radial-gradient(#130023,rgb(0, 0, 0))",
    }}
        
    },

    resource: "Void", // Name of prestige currency
    requires: new Decimal(1e40), // Can be a function that takes requirement increases into account
    baseResource: "Dark Matter", // Name of resource prestige is based on
    baseAmount() { return player.darkmatter.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasMilestone('unstablefuel', 17)) mult = mult.times(2);
        if (hasMilestone('unstablefuel', 18)) mult = mult.times(2);
        if (hasMilestone("supernova", 12)) mult = mult.times(player.darkenergy.points.pow(0.1).add(1));
        if (hasMilestone('unstablefuel', 19)) mult = mult.times(3);
        if (hasMilestone('blackhole', 6)) mult = mult.times(player.blackhole.winstreak.pow(0.275).add(1));
        if (hasUpgrade('blackhole', 31)) mult = mult.times(1.5);
        if (hasUpgrade('blackhole', 32)) mult = mult.times(upgradeEffect('blackhole', 32));
        if (hasUpgrade('blackhole', 33)) mult = mult.times(upgradeEffect('blackhole', 33));
        if (hasMilestone("supernova", 12)) mult = mult.times(player.darkenergy.points.pow(0.175).add(1));




        return mult
    },

    hotkeys: [
        {key: "b", description: "B: Press for Black Hole Reset", onPress(){if (canReset(this.layer) && (inChallenge("real", 11))) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
                content: [
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(0, 0, 0); text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.blackhole.points)}</span></h2> Void`
                            return txt
                        }
                    ],
                "blank",
                "resource-display",
                "blank",
                "prestige-button",
                "blank",
             ],
            },
        "Milestones": {
                content: [
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(0, 0, 0); text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.blackhole.points)}</span></h2> Void`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
                "milestones",
             ],
             unlocked() {return player.blackhole.unlocked},
            },
            "Upgrades": {
                content: [
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(0, 0, 0); text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.blackhole.points)}</span></h2> Void`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
                "upgrades",
             ],
             unlocked() {return player.blackhole.unlocked},
            },
            "Void Roulette": {
                content: [
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(0, 0, 0); text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.blackhole.points)}</span></h2> Void`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
                ["display-text",
                    function(){
                        let txt = ""
                        txt = txt + `You are betting 
                        <h2><span style="color:rgb(0, 0, 0); text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                            ${format(player.blackhole.points*player.blackhole.betAmount)}</span></h2> Void on
                        <h2><span style="color: ${(player.blackhole.betColor)}; text-shadow: 0px 0px 20pxrgb(0, 0, 0); font-family: Lucida Console, Courier New, monospace">
                            ${(player.blackhole.betColor)}</span></h2> (Win Amount: ${format(player.blackhole.winAmount)} Void)`
                        return txt
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("blackhole", 5)) {
                            let txt = ""
                            txt = txt + `Total Rolls: ${(player.blackhole.totalRolls)}`
                            return txt
                        }
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("blackhole", 6)) {
                            let txt = ""
                            txt = txt + `Winstreak: ${(player.blackhole.winstreak)} (${format(player.blackhole.winstreak.pow(0.275).add(1))}x Void) | Losestreak: ${(player.blackhole.losestreak)}`
                            return txt
                        }
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("blackhole", 8)) {
                            let txt = ""
                            txt = txt + `Win Chance: ${format((player.blackhole.winChance)*100)}% | Green Win Chance: ${format((player.blackhole.greenWinchance)*100)}%`
                            return txt
                        }
                    }
                ],
                "blank",
                "clickables",
             ],
             unlocked() {return hasMilestone("blackhole", 3)},
             buttonStyle() { return {"border-color": "rgb(0, 29, 73)"} },
            },
        },
        milestones: {
            1: {
                requirementDescription: "Black Hole Stage 1 (3)",
                effectDescription: "Auto-buy Galaxy Upgrades",
                done() {return player.blackhole.points.gte(3)}
            },
            2: {
                requirementDescription: "Black Hole Stage 2 (100)",
                effectDescription: "Keep Dark Matter Milestones",
                unlocked() { return hasMilestone("blackhole", 1) },
                done() {return player.blackhole.points.gte(100)}
            },
            3: {
                requirementDescription: "Black Hole Stage 3 (1,000)",
                effectDescription: "Unlock Void Roulette",
                unlocked() { return hasMilestone("blackhole", 2) },
                done() {return player.blackhole.points.gte(1000)}
            },
            4: {
                requirementDescription: "Black Hole Stage 4 (1,500)",
                effectDescription: "Unlock Bet Amount & Bet Color",
                unlocked() { return hasMilestone("blackhole", 3) },
                done() {return player.blackhole.points.gte(1500)}
            },
            5: {
                requirementDescription: "Black Hole Stage 5 (2,500)",
                effectDescription: "Unlock Total Rolls",
                unlocked() { return hasMilestone("blackhole", 5) },
                done() {return player.blackhole.points.gte(2500)}
            },
            6: {
                requirementDescription: "Black Hole Stage 6 (50,000)",
                effectDescription: "Unlock Winstreak & Losestreak",
                unlocked() { return hasMilestone("blackhole", 5) },
                done() {return player.blackhole.points.gte(50000)}
            },
            7: {
                requirementDescription: "Black Hole Stage 7 (1,000,000)",
                effectDescription: "Auto-gain Galaxies",
                unlocked() { return hasMilestone("blackhole", 6) },
                done() {return player.blackhole.points.gte(1e6)}
            },
            8: {
                requirementDescription: "Black Hole Stage 8 (100,000,000)",
                effectDescription: "Unlock Win Chance",
                unlocked() { return hasMilestone("blackhole", 7) },
                done() {return player.blackhole.points.gte(1e8)}
            },
            9: {
                requirementDescription: "Black Hole Stage 9 (Coming Soon)",
                effectDescription: "Unlock Autoroll",
                unlocked() { return hasMilestone("blackhole", 8) },
                done() {return player.blackhole.points.gte("1e500")}
            },
    
        },
        upgrades: {
            11: {
                title: "Expansion",
                description: "10x Dark Matter",
                cost: new Decimal(1),
            },
            12: {
                title: "Expansion II",
                description: "10x Cosmic Dust",
                unlocked() { return hasUpgrade("blackhole", 11) },
                cost: new Decimal(1),
            },
            13: {
                title: "Expansion III",
                description: "10x Money",
                unlocked() { return hasUpgrade("blackhole", 12) },
                cost: new Decimal(1),
            },
            14: {
                title: "Expansion IV",
                description: "100x Unstable Rocket Fuel",
                unlocked() { return hasUpgrade("blackhole", 13)},
                cost: new Decimal(3),
            },
            15: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XVII",
                unlocked() { return hasUpgrade("blackhole", 14)},
                cost: new Decimal(5),
            },
            21: {
                title: "Expansion V",
                description: "10x Dark Matter",
                unlocked() { return hasUpgrade("blackhole", 15)},
                cost: new Decimal(10),
            },
            22: {
                title: "Expansion VI",
                description: "10x Cosmic Dust",
                unlocked() { return hasUpgrade("blackhole", 21)},
                cost: new Decimal(15),
            },
            23: {
                title: "Expansion VII",
                description: "2x Dark Energy",
                unlocked() { return hasUpgrade("blackhole", 22)},
                cost: new Decimal(50),
            },
            24: {
                title: "Expansion VII",
                description: "1.5x Dark Energy",
                unlocked() { return hasUpgrade("blackhole", 23)},
                cost: new Decimal(200),
            },
            25: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XIX",
                unlocked() { return hasUpgrade("blackhole", 24)},
                cost: new Decimal(500),
            },
            31: {
                title: "Roulette Improver",
                description: "-1s Cooldown, 1.5x Void",
                unlocked() { return hasUpgrade("blackhole", 25)},
                cost: new Decimal(2500),
            },
            32: {
                title: "Roulette Booster",
                description: "Void gain is increased based on Total Rolls",
                unlocked() { return hasUpgrade("blackhole", 31)},
                cost: new Decimal(5000),
                effect() {
                    let baseEffect = player.blackhole.totalRolls.add(1).pow(0.25);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            33: {
                title: "Dark Void",
                description: "Void gain is increased based on Dark Energy",
                unlocked() { return hasUpgrade("blackhole", 32)},
                cost: new Decimal(10000),
                effect() {
                    let baseEffect = player.darkenergy.points.add(1).pow(0.2);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            34: {
                title: "Expansion VIII",
                description: "10x Dark Matter",
                unlocked() { return hasUpgrade("blackhole", 33)},
                cost: new Decimal(50000),
            },
            35: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XX",
                unlocked() { return hasUpgrade("blackhole", 34)},
                cost: new Decimal(150000),
            },
            41: {
                title: "Roulette Improver II",
                description: "2x Win Amount, -1s Cooldown",
                unlocked() { return hasUpgrade("blackhole", 35)},
                cost: new Decimal(250000),
            },
            42: {
                title: "Void Energy",
                description: "Dark Energy gain is increased based on Void",
                unlocked() { return hasUpgrade("blackhole", 41)},
                cost: new Decimal(1e6),
                effect() {
                    let baseEffect = player.blackhole.points.add(1).pow(0.06);
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            43: {
                title: "Expansion IX",
                description: "10x Dark Matter",
                unlocked() { return hasUpgrade("blackhole", 42)},
                cost: new Decimal(2.5e6),
            },
            44: {
                title: "Roulette Improver III",
                description: "1.5x Win Amount, -1s Cooldown",
                unlocked() { return hasUpgrade("blackhole", 43)},
                cost: new Decimal(5e6),
            },
            45: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XXI",
                unlocked() { return hasUpgrade("blackhole", 44)},
                cost: new Decimal(5e7),
            },
            51: {
                title: "Roulette Improver IV",
                description: "50% Win Chance (Doesn't affect Green Win Chance)",
                unlocked() { return hasUpgrade("blackhole", 45)},
                cost: new Decimal(2.5e8),
            },
            52: {
                title: "Roulette Improver V",
                description: "2x Win Amount, 55% Win Chance, 3% Green Win Chance",
                unlocked() { return hasUpgrade("blackhole", 51)},
                cost: new Decimal(1e9),
            },
            53: {
                title: "Void Fuel",
                description: "Unstable Rocket Fuel gain is increased based on Void",
                unlocked() { return hasUpgrade("blackhole", 52)},
                cost: new Decimal(1e10),
                effect() {
                    let baseEffect = player.blackhole.points.add(1).pow(0.36);
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            54: {
                title: "Roulette Improver VI",
                description: "60% Win Chance, 3.5% Green Win Chance, -1s Cooldown",
                unlocked() { return hasUpgrade("blackhole", 53)},
                cost: new Decimal(2.5e10),
            },
            55: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XXII",
                unlocked() { return hasUpgrade("blackhole", 54)},
                cost: new Decimal(1e12),
            },
        },

        
         clickables: {
                12: {
                    title() {
                        return player.blackhole.rolledNumber
                    },
                    style() {
                        return {
                            "color": "white",
                            "background-color": player.blackhole.rolledColor,
                            "font-size": "1.5em",
                            "font-weight": "bold",
                        };
                    },
                },        
            
                22: {
                    title: "Roll",
                    display() {
                        return "Cooldown: " + formatTime(player.blackhole.cooldown);
                    },
                    cooldown() {
                        if (player.blackhole.cooldown > 0) player.blackhole.cooldown -= 0.05;

                        if (player.blackhole.cooldown < 0) player.blackhole.cooldown = 0;
                    },  
                    onClick() {
                        let WinChanceCalculator = new Decimal(Math.random());
                        console.log(WinChanceCalculator + " < " + player.blackhole.winChance)
                        if (
                            WinChanceCalculator < player.blackhole.winChance &&
                            (player.blackhole.betColor == "RED" || player.blackhole.betColor == "BLACK")
                        ) {
                            player.blackhole.rolledColor = player.blackhole.betColor;
                    
                            if (player.blackhole.rolledColor == "BLACK") {
                                player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 1);
                                player.blackhole.points = player.blackhole.points.sub(player.blackhole.points.times(player.blackhole.betAmount));
                                player.blackhole.points = player.blackhole.points.add(player.blackhole.winAmount);
                                player.blackhole.winstreak = player.blackhole.winstreak.add(1);
                                player.blackhole.losestreak = new Decimal(0);
                            } else if (player.blackhole.rolledColor == "RED") {
                                player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 2);
                                player.blackhole.points = player.blackhole.points.sub(player.blackhole.points.times(player.blackhole.betAmount));
                                player.blackhole.points = player.blackhole.points.add(player.blackhole.winAmount);
                                player.blackhole.winstreak = player.blackhole.winstreak.add(1);
                                player.blackhole.losestreak = new Decimal(0);
                            }


                        } else {
                            let GreenWinChanceCalculator = new Decimal(Math.random());
                            if (GreenWinChanceCalculator < player.blackhole.greenWinchance && player.blackhole.betColor == "GREEN") {
                                player.blackhole.rolledNumber = new Decimal(0);
                                player.blackhole.points = player.blackhole.points.sub(player.blackhole.points.times(player.blackhole.betAmount));
                                player.blackhole.points = player.blackhole.points.add(player.blackhole.winAmount);
                                player.blackhole.winstreak = player.blackhole.winstreak.add(1);
                                player.blackhole.losestreak = new Decimal(0);
                                player.blackhole.rolledColor = "GREEN";
                            } else {
                                let randomcolor = new Decimal(Math.round(Math.random()));
                    
                                if (randomcolor == 0 && player.blackhole.betColor == "GREEN") {
                                    player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 1);
                                    player.blackhole.rolledColor = "BLACK";
                                } else if (player.blackhole.betColor == "GREEN") {
                                    player.blackhole.rolledColor = "RED";
                                    player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 2);
                                } else {
                                    player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 37));
                    
                                    if (player.blackhole.rolledNumber.eq(0) && player.blackhole.betColor !== "GREEN") {
                                        player.blackhole.rolledColor = "GREEN";
                                    } 
                                    
                                    else if (player.blackhole.betColor == "RED") {
                                        player.blackhole.rolledColor = "BLACK";
                                        player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 1);
                                    } 
                                    
                                    else if (player.blackhole.betColor == "BLACK") {
                                        let newColor = Math.random() > player.blackhole.greenWinchance ? "RED" : "GREEN";
                                        player.blackhole.rolledColor = newColor;
                                        if (newColor == "RED") {
                                            player.blackhole.rolledNumber = new Decimal(Math.floor(Math.random() * 18) * 2 + 2);
                                        } else {
                                            player.blackhole.rolledNumber = new Decimal(0);
                                        }
                                    }
                                }
                    
                                player.blackhole.points = player.blackhole.points.sub(player.blackhole.points.times(player.blackhole.betAmount));
                                player.blackhole.winstreak = new Decimal(0);
                                player.blackhole.losestreak = player.blackhole.losestreak.add(1);
                            }
                        }

                        player.blackhole.totalRolls = player.blackhole.totalRolls.add(1)
                        player.blackhole.cooldown = player.blackhole.maxCooldown
                    },
                                                     
                    canClick() {
                        if (player.blackhole.cooldown == 0 && player.blackhole.points >= 1) return true
                        else return false
                    },
                    style() {
                        return {
                            "background-color": player.blackhole.cooldown  == 0  && player.blackhole.points >= 1 ? "rgb(0, 29, 73)" : "", // Apply color only if cooldown is 0
                            "color": "white",
                        };
                    },                    
                },

                31: {
                    title() {
                        return "Bet Amount"
                    },
                    display() {
                        return player.blackhole.betAmount*100 + "%"
                    },
                    style() {
                        return {
                            "background-color": "rgb(0, 29, 73)",
                            "font-weight": "bold",
                            color: "white",
                        };
                    },
                    canClick() {
                        if (hasMilestone("unstablefuel", 23)) return false
                        else return true
                    },
                    onClick() {
                       if (player.blackhole.betAmount == 1) player.blackhole.betAmount = 0.001
                       if (player.blackhole.betAmount == 0.5) player.blackhole.betAmount = 1
                       if (player.blackhole.betAmount == 0.1) player.blackhole.betAmount = 0.5
                       if (player.blackhole.betAmount == 0.05) player.blackhole.betAmount = 0.1
                       if (player.blackhole.betAmount == 0.01) player.blackhole.betAmount = 0.05
                       if (player.blackhole.betAmount == 0.001) player.blackhole.betAmount = 0.01
                    },
                    unlocked() {return hasMilestone("blackhole", 4)},
                },

                32: {
                    title() {
                        return "Bet Color"
                    },
                    display() {
                        return player.blackhole.betColor
                    },
                    style() {
                        return {
                            "background-color": player.blackhole.betColor,
                            "font-weight": "bold",
                            "color": "white",
                        };
                    },
                    canClick: true,
                    onClick() {
                        if (player.blackhole.betColor === "RED") {
                            player.blackhole.betColor = "BLACK";
                        } else if (player.blackhole.betColor === "BLACK") {
                            player.blackhole.betColor = "GREEN";
                        } else if (player.blackhole.betColor === "GREEN") {
                            player.blackhole.betColor = "RED";
                        }
                    },   
                    unlocked() {return hasMilestone("blackhole", 4)},
                }
            }   
})