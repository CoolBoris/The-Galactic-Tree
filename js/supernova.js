addLayer("darkenergy", {
    name: "dark energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 2,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("energy", keep)
    },

    passiveGeneration() {
        return 0
    },

    layerShown() {
        let visible = false
        return visible
    },

    darkenergy() {
        if (!(player.energy?.points?.gt(1e6) &&
              player.darkmatter?.points?.gt(1e10) &&
              inChallenge("real", 11) &&
              player.supernova?.points?.gte(5))) {
            player.darkenergy.points = new Decimal(0);
            return 0;
        }
    
        // Base calculations with safety checks
        let baseValue = new Decimal(player.energy.points || 0).pow(0.1);
        let DMmult = new Decimal(player.darkmatter.points || 0).max(1).log10().add(1);
        let totalValue = baseValue.times(DMmult);
    
        // Apply upgrades safely
        if (hasUpgrade('galaxy', 62)) totalValue = totalValue.times(upgradeEffect("galaxy", 62) || 1);
        if (hasUpgrade('galaxy', 63)) totalValue = totalValue.times(upgradeEffect("galaxy", 63) || 1);
        if (hasUpgrade('blackhole', 23)) totalValue = totalValue.times(2);
        if (hasUpgrade('blackhole', 24)) totalValue = totalValue.times(1.5);
        if (hasUpgrade('blackhole', 42)) totalValue = totalValue.times(upgradeEffect("blackhole", 42) || 1);
        player.darkenergy.points = new Decimal(totalValue || 0);
    
        return totalValue;
    },
    
    

    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Dark Energy", // Name of prestige currency
    baseResource: "Supernova Tiers", // Name of resource prestige is based on
    baseAmount() { return player.supernova.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000000000000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
})

addLayer("energy", {
    name: "energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 2,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("energy", keep)
    },

    passiveGeneration() {
        if (! inChallenge('real', 11)) return 0
        if (hasMilestone('supernova', 2)) return 1
        return 0
    },

    layerShown() {
        let visible = false
        return visible
    },
    requires: new Decimal(2), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of prestige currency
    baseResource: "Supernova Tiers", // Name of resource prestige is based on
    baseAmount() { return player.supernova.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000000000000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('supernova', 11)) mult = mult.times(upgradeEffect('supernova', 11))
        if (hasUpgrade('supernova', 21)) mult = mult.times(upgradeEffect('supernova', 21))
        if (hasUpgrade('supernova', 31)) mult = mult.times(upgradeEffect('supernova', 31))
        if (hasUpgrade('supernova', 41)) mult = mult.times(upgradeEffect('supernova', 41))
        if (hasUpgrade('supernova', 51)) mult = mult.times(upgradeEffect('supernova', 51))


        
        // Inf Reality II
        if (hasMilestone('negativeinf', 4)) mult = mult.times(3)
        if (hasMilestone('negativeinf', 9)) mult = mult.times(2)




        return mult
    },
})

addLayer("supernova", {
    name: "Supernova", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌟", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 2,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    tooltip() {return "Supernova Tier " + player.supernova.points},

    symbol(){
        if (options.emojisEnabled == true) symbol = "🌟"
        else symbol = "SN"
        return symbol
    },
    passiveGeneration() {
        return 0
    },
    layerShown() {
        let visible = false
        if (hasMilestone("unstablefuel", 9) && inChallenge("real", 11)) visible = true
        if (player.supernova.points.gte(1) && inChallenge("real", 11)) visible = true
        return visible
    },

    doReset(reset) {
        let keep = [];
        if (! inChallenge("real", 11)) keep.push("upgrades")
        if (! inChallenge("real", 11)) keep.push("points")
        if (! inChallenge("real", 11)) keep.push("milestones")
        if (! inChallenge("real", 11)) keep.push("buyables")
        if (layers[reset].row > this.row) layerDataReset("supernova", keep)
    },

    cap() {
        if (player.galaxy.points > 10) { 
            player.galaxy.points = new Decimal(10);
        }
    },

    branches: ["darkmatter", "galaxy"],
    color: "#eaad22",
    nodeStyle() {
        return {
            "background": "radial-gradient(#eaad22, #ea6222)",
            "width": "125px",
            "height": "125px",
        }
    },
    resetDescription: "Increase your Supernova Tier<br>",

    componentStyles: {
        "prestige-button"() {return {
            "width": "200px",
            "height": "150px",
        }},
    },

    requires() {
        let req = new Decimal(1)
        if (player.supernova.points.gte(0)) {
            req = new Decimal(1e10)
        }
        if (player.supernova.points.gte(1)) {
            req = new Decimal(1e11)
        }
        if (player.supernova.points.gte(2)) {
            req = new Decimal(1e13)
        }
        if (player.supernova.points.gte(3)) {
            req = new Decimal(1e17)
        }
        if (player.supernova.points.gte(4)) {
            req = new Decimal(1e28)
        }
        if (player.supernova.points.gte(5)) {
            req = new Decimal(1e36)
        }
        if (player.supernova.points.gte(6)) {
            req = new Decimal(1e50)
        }
        if (player.supernova.points.gte(7)) {
            req = new Decimal("1e9999999999")
        }


        return req
    },
    resource: "Supernova Tier", // Name of prestige currency
    baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
    baseAmount() { return player.unstablefuel.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)

        return mult
    },

    hotkeys: [
        {key: "u", description: "U: Press for Supernova Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: {
        "Main": {
                content: [
                    ["display-text", function () {
                        let txt = "";
                        let tier = Math.round(player.supernova.points);
                        txt += `<div style="font-size: 1.3em;">Supernova Tier 
                                <h2><span class="rainbow-text" style="text-shadow: 0px 0px 20px rgb(221, 255, 0); font-family: Lucida Console, Courier New, monospace">
                                    ${tier}</span></h2></div>`;
                        return txt;
                    }],
                    ["display-text",
                        function(){
                            let txt = ""
                            let resetgain = getResetGain("energy")
                            txt = txt + `You are gaining ${format(resetgain)}</span></h2> Energy per second`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
             ],
            },
        "Tiers": {
                content: [
                    ["display-text", function () {
                        let txt = "";
                        let tier = Math.round(player.supernova.points);
                        txt += `<div style="font-size: 1.3em;">Supernova Tier 
                                <h2><span class="rainbow-text" style="text-shadow: 0px 0px 20px rgb(221, 255, 0); font-family: Lucida Console, Courier New, monospace">
                                    ${tier}</span></h2></div>`;
                        return txt;
                    }],
                "blank",
                "prestige-button",
                "blank",
                ["milestones",[1,2, 3, 4, 5, 6, 7]],
             ],
            },
        "Energy": {
                content: [
                    ["display-text", function () {
                        let txt = "";
                        let tier = Math.round(player.supernova.points);
                        txt += `<div style="font-size: 1.3em;">Supernova Tier 
                                <h2><span class="rainbow-text" style="text-shadow: 0px 0px 20px rgb(221, 255, 0); font-family: Lucida Console, Courier New, monospace">
                                    ${tier}</span></h2></div>`;
                        return txt;
                    }],
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(202, 209, 0); text-shadow: 0px 0px 20pxrgb(184, 184, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.energy.points)}</span></h2> Energy`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
                "upgrades",
             ],
             unlocked() { return player.supernova.points.gte(2) },
             buttonStyle() { return {"border-color": "rgb(202, 209, 0)"} },

            },
            "Dark Energy": {
                content: [
                    ["display-text", function () {
                        let txt = "";
                        let tier = Math.round(player.supernova.points);
                        txt += `<div style="font-size: 1.3em;">Supernova Tier 
                                <h2><span class="rainbow-text" style="text-shadow: 0px 0px 20px rgb(221, 255, 0); font-family: Lucida Console, Courier New, monospace">
                                    ${tier}</span></h2></div>`;
                        return txt;
                    }],
                    ["display-text",
                        function(){
                            let txt = ""
                            txt = txt + `You have 
                            <h2><span style="color:rgb(202, 209, 0); text-shadow: 0px 0px 20pxrgb(184, 184, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.energy.points)}</span></h2> Energy and
                            <h2><span style="color: #450080; text-shadow: 0px 0px 20pxrgb(184, 184, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.darkmatter.points)}</span></h2> Dark Matter which grants you<br>
                            <h2><span style="color:rgb(29, 8, 122); text-shadow: 0px 0px 20pxrgb(184, 184, 0); font-family: Lucida Console, Courier New, monospace">
                                ${format(player.darkenergy.points)}</span></h2> Dark Energy`
                            return txt
                        }
                    ],
                "blank",
                "prestige-button",
                "blank",
                ["milestones",[8,9,10,11,12]],
                "blank",
                ["display-text", function () {
                    let txt = "";
                    txt += `<div style="font-size: 1.5em;">Dark Distortions </div>`;
                    return txt;
                }],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 8)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">I: ${format(player.darkenergy.points.pow(0.7).add(1))}</span></h2>x Unstable Rocket Fuel</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 9)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">II: ${format(player.darkenergy.points.pow(0.4).add(1))}</span></h2>% of Dark Matter/s</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 10)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">III: ${format(player.darkenergy.points.pow(0.585).add(1))}</span></h2>x Dark Matter</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 11)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">IV: ${format(player.darkenergy.points.pow(0.9).add(1))}</span></h2>x Unstable Rocket Fuel</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 12)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">V: ${format(player.darkenergy.points.pow(0.1).add(1))}</span></h2>x Void</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                ["display-text",
                    function(){
                        if (hasMilestone("supernova", 13)) {
                            let txt = ""
                            txt = txt + `<div style="font-size: 1.3em;">VI: ${format(player.darkenergy.points.pow(0.175).add(1))}</span></h2>x Void</div>`
                            return txt
                        }
                        return ""; // Return an empty string if the milestone condition is not met
                    }
                ],
                "blank",
            ],
             unlocked() { return player.supernova.points.gte(2) },
             buttonStyle() { return {"border-color": "rgb(29, 8, 122)"} },

            },
        },
        milestones: {
            1: {
                requirementDescription: "Supernova Tier 1",
                effectDescription:  "Keep Unstable Rocket Fuel Milestones, 3x Unstable Rocket Fuel, 3x Cosmic Dust, 3x Dark Matter",
                done() { return player.supernova.points.gte(1) },
                unlocked() { return player.supernova.points.gte(1) }
            },
            2: {
                requirementDescription: "Supernova Tier 2",
                effectDescription: "Unlock Energy, 2x Unstable Rocket Fuel, 3x Cosmic Dust, 3x Dark Matter",
                done() { return player.supernova.points.gte(2) },
                unlocked() { return player.supernova.points.gte(1) }
            },
            3: {
                requirementDescription: "Supernova Tier 3",
                effectDescription: "Auto-buy Unstable Rocket Fuel Upgrades, 3x Unstable Rocket Fuel, 3x Cosmic Dust",
                done() { return player.supernova.points.gte(3) },
                unlocked() { return player.supernova.points.gte(2) }
            },
            4: {
                requirementDescription: "Supernova Tier 4",
                effectDescription: "Bulk buy Galaxies, 5x Unstable Rocket Fuel",
                done() { return player.supernova.points.gte(4) },
                unlocked() { return player.supernova.points.gte(3) }
            },
            5: {
                requirementDescription: "Supernova Tier 5",
                effectDescription: "Unlock Dark Energy, 5x Unstable Rocket Fuel",
                done() { return player.supernova.points.gte(5) },
                unlocked() { return player.supernova.points.gte(4) }
            },
            6: {
                requirementDescription: "Supernova Tier 6",
                effectDescription: "Keep Galaxy Milestones, 5x Unstable Rocket Fuel",
                done() { return player.supernova.points.gte(6) },
                unlocked() { return player.supernova.points.gte(5) }
            },
            7: {
                requirementDescription: "Supernova Tier 7",
                effectDescription: "Unlock The Black Hole",
                done() { return player.supernova.points.gte(7) },
                unlocked() { return player.supernova.points.gte(6) }
            },
            8: {
                requirementDescription: "Dark Energy Milestone I (10)",
                effectDescription: "Unlock Dark Distortion I",
                done() { return player.darkenergy.points.gte(10) },
                unlocked() { return player.darkenergy.points.gte(0) }
            },
            9: {
                requirementDescription: "Dark Energy Milestone II (100)",
                effectDescription: "Unlock Dark Distortion II",
                done() { return player.darkenergy.points.gte(100) },
                unlocked() { return hasMilestone("supernova", 8) }
            },
            10: {
                requirementDescription: "Dark Energy Milestone III (250)",
                effectDescription: "Unlock Dark Distortion III",
                done() { return player.darkenergy.points.gte(250) },
                unlocked() { return hasMilestone("supernova", 9) }
            },
            11: {
                requirementDescription: "Dark Energy Milestone IV (750)",
                effectDescription: "Unlock Dark Distortion IV",
                done() { return player.darkenergy.points.gte(750) },
                unlocked() { return hasMilestone("supernova", 10) }
            },
            12: {
                requirementDescription: "Dark Energy Milestone V (3,000)",
                effectDescription: "Unlock Dark Distortion V",
                done() { return player.darkenergy.points.gte(3000) },
                unlocked() { return hasMilestone("supernova", 11) }
            },
            13: {
                requirementDescription: "Dark Energy Milestone VI (10,000)",
                effectDescription: "Unlock Dark Distortion VI",
                done() { return player.darkenergy.points.gte(10000) },
                unlocked() { return hasMilestone("supernova", 12) }
            },
        },
        upgrades: {
            11: {
                title: "Energetic Energy",
                description: "Energy gain is increased based on Energy",
                cost: new Decimal(10),
                currencyDisplayName: "Energy",
                currencyLocation() { return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.18);
                    if (baseEffect.gt(10)) {
                        baseEffect = new Decimal(10).plus(baseEffect.minus(10).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    if (effectValue.gt(10)) display += " (Softcapped)";
                    return display;
                }
            },
            12: {
                title: "Charged Money",
                description: "Money gain is increased based on Energy",
                cost: new Decimal(100),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.62);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    return display;
                }
            },     
            13: {
                title: "Cosmic Energy",
                description: "Cosmic Rays formula is increased based on Energy",
                cost: new Decimal(250),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = Math.log10(player.energy.points)/3.5+1;
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },     
            14: {
                title: "Charged Fuel",
                description: "Unstable Rocket Fuel gain is increased based on Energy",
                cost: new Decimal(300),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.14);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            }, 
            15: {
                title: "Milestone",
                description: "Unlock Unstable Milestone X",
                cost: new Decimal(500),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
            }, 
            21: {
                title: "Energetic Energy II",
                description: "Energy gain is increased based on Energy",
                cost: new Decimal(500),
                currencyDisplayName: "Energy",
                currencyLocation() { return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasMilestone("supernova", 3)},
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.23);
                    if (baseEffect.gt(25)) {
                        baseEffect = new Decimal(25).plus(baseEffect.minus(25).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    if (effectValue.gt(25)) display += " (Softcapped)";
                    return display;
                }
            },
            22: {
                title: "Charged Money II",
                description: "Money gain is increased based on Energy",
                cost: new Decimal(2500),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.67);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    return display;
                }
            },  
            23: {
                title: "Cosmic Energy II",
                description: "Cosmic Rays formula is increased based on Energy",
                cost: new Decimal(3000),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = Math.log10(player.energy.points)/8+1;
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            24: {
                title: "Charged Fuel II",
                description: "Unstable Rocket Fuel gain is increased based on Energy",
                cost: new Decimal(5000),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.19);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            }, 
            25: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XI",
                cost: new Decimal(1e4),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
            },   
            31: {
                title: "Energetic Energy III",
                description: "Energy gain is increased based on Energy",
                cost: new Decimal(10000),
                currencyDisplayName: "Energy",
                currencyLocation() { return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasMilestone("supernova", 4)},
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.26);
                    if (baseEffect.gt(50)) {
                        baseEffect = new Decimal(50).plus(baseEffect.minus(50).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    if (effectValue.gt(50)) display += " (Softcapped)";
                    return display;
                }
            },
            32: {
                title: "Charged Money III",
                description: "Money gain is increased based on Energy",
                cost: new Decimal(75000),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.7);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    return display;
                }
            },  
            33: {
                title: "Cosmic Energy III",
                description: "Cosmic Rays formula is increased based on Energy",
                cost: new Decimal(1.5e5),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = Math.log10(player.energy.points)/10+1;
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
                title: "Charged Fuel III",
                description: "Unstable Rocket Fuel gain is increased based on Energy",
                cost: new Decimal(2.5e5),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.2);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            }, 
            35: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XII",
                cost: new Decimal(5e5),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
            },         
            41: {
                title: "Energetic Energy IV",
                description: "Energy gain is increased based on Energy",
                cost: new Decimal(5e5),
                currencyDisplayName: "Energy",
                currencyLocation() { return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasMilestone("supernova", 5)},
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.25);
                    if (baseEffect.gt(100)) {
                        baseEffect = new Decimal(100).plus(baseEffect.minus(100).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    if (effectValue.gt(100)) display += " (Softcapped)";
                    return display;
                }
            },
            42: {
                title: "Charged Money IV",
                description: "Money gain is increased based on Energy",
                cost: new Decimal(5e7),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.77);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    return display;
                }
            },  
            43: {
                title: "Cosmic Energy IV",
                description: "Cosmic Rays formula is increased based on Energy",
                cost: new Decimal(1e8),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = Math.log10(player.energy.points)/15+1;
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            44: {
                title: "Charged Fuel IV",
                description: "Unstable Rocket Fuel gain is increased based on Energy",
                cost: new Decimal(2.5e8),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.22);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            }, 
            45: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XV",
                cost: new Decimal(5e8),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
            },    
            51: {
                title: "Energetic Energy IV",
                description: "Energy gain is increased based on Energy",
                cost: new Decimal(5e8),
                currencyDisplayName: "Energy",
                currencyLocation() { return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasMilestone("supernova", 6)},
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.21);
                    if (baseEffect.gt(250)) {
                        baseEffect = new Decimal(250).plus(baseEffect.minus(250).log2());
                    }
                    return baseEffect;
                },
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    if (effectValue.gt(250)) display += " (Softcapped)";
                    return display;
                }
            },
            52: {
                title: "Charged Money V",
                description: "Money gain is increased based on Energy",
                cost: new Decimal(1e10),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.79);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = "+" + format(effectValue);
                    return display;
                }
            },  
            53: {
                title: "Cosmic Energy V",
                description: "Cosmic Rays formula is increased based on Energy",
                cost: new Decimal(2.5e10),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = Math.log10(player.energy.points)/22+1;
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            },
            54: {
                title: "Charged Fuel V",
                description: "Unstable Rocket Fuel gain is increased based on Energy",
                cost: new Decimal(5e10),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                effect() {
                    let baseEffect = player.energy.points.add(1).pow(0.234);
                    return baseEffect;
                },
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
                effectDisplay() { 
                    let effectValue = upgradeEffect(this.layer, this.id);
                    let display = format(effectValue) + "x";
                    return display;
                }
            }, 
            55: {
                title: "Milestone",
                description: "Unlock Unstable Milestone XVI",
                cost: new Decimal(1e11),
                currencyDisplayName: "Energy",
                currencyLocation() {return player.energy },
                currencyInternalName: "points",
                unlocked() {return hasUpgrade(this.layer, (this.id-1))},
            },             
        },
})