

addLayer("xpo", {
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 5,
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
    name: "XPO", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "XPO", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "X", // Name of resource prestige is based on
    baseAmount() { return player.x.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 9999999999999, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    passiveGeneration() {
        let base1 = new Decimal(1)
        if (getBuyableAmount('x', 11) == 0) base1 = new Decimal(0)
        let base2 = new Decimal(10).pow((getBuyableAmount('x', 11) - 1))
        let generation = (base1.times(base2))
        if (hasMilestone('x', 1)) generation
        return generation
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
})

addLayer("xge", {
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 5,
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
    name: "XGE", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "XGE", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "X", // Name of resource prestige is based on
    baseAmount() { return player.x.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 99999999, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let base1 = new Decimal(1)
        if (getBuyableAmount('x', 12) == 0) base1 = new Decimal(0)
        let base2 = new Decimal(10).pow((getBuyableAmount('x', 12) - 1))
        let generation = (base1.times(base2))
        if (hasMilestone('x', 1)) generation
        return generation
    },
})
addLayer("xla", {
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 5,
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
    name: "XLA", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "XLA", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "X", // Name of resource prestige is based on
    baseAmount() { return player.x.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 999999999, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)

        // Softcaps
        if (player.x.points.gte(3)) mult = mult.times(-1e999)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let base1 = new Decimal(1)
        if (getBuyableAmount('x', 13) == 0) base1 = new Decimal(0)
        let base2 = new Decimal(10).pow((getBuyableAmount('x', 13) - 1))
        let generation = (base1.times(base2))
        if (hasMilestone('x', 1)) generation
        return generation
    },
})


addLayer("charge", {
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 5,
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    layerShown() {
        let visible = false
        if (inChallenge('x', 11)) visible = true
        return visible
    },
    name: "Charge", // This is optional, only used in a few places, If absent it just uses the layer id.
    resource: "Charge", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() { return player.r.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.16, // Prestige currency exponent
    passiveGeneration() {
        return 1
    },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "Charged Fuel",
            description: "100x Rocket Fuel",
            cost: new Decimal(25),
            currencyDisplayName: "Rocket Fuel",
            currencyLocation() { return player.r },
            currencyInternalName: "points",
        },
    }
})



addLayer("x", {
    name: "X", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌑", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 5,
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    layerShown() {
        let visible = false
        if (hasChallenge('planets', 11)) visible = true
        if (inChallenge('stars', 11) || inChallenge('planets', 11)) visible = false
        return visible
    },
    hotkeys: [
        { key: "x", description: "X: Press for X Reset", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    branches: ["stars", "planets"],
    color: "#810081",
    nodeStyle() {
        return {
            "background": "radial-gradient(#49002F, #810081)",
            "width": "125px",
            "height": "125px",
        }
    },
    resetDescription: "",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "X", // Name of prestige currency
    baseResource: "Planets", // Name of resource prestige is based on
    baseAmount() { return player.planets.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (player.x.points.gte(3)) mult = mult.times(-1e99999999999999)
        return mult
    },
    tabFormat: {
        "Main": {
            content: [
                ["display-text",
                    'Chapter 2: Outer Space!', { "color": "#A1004C", "font-size": "32px", "text-shadow": "0px 0px 20px #A1004C" }],
                "blank",
                "blank",
                "main-display",
                "blank",
                "prestige-button",
                "blank",
                "blank",
                ["infobox", "main"],
            ],
        },
        "Xtra": {
            content: [
                "main-display",
                "blank",
                "milestones",
            ],
            unlocked() { return player.x.points.gte(1) }
        },
        "X-Define": {
            content: [
                "main-display",
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                    <h2><span style="color: #27006C; text-shadow: 0px 0px 20px #27006C; font-family: Lucida Console, Courier New, monospace">
                        ${format(player.xpo.points)}</span></h2> XPO`
                        return txt
                    }
                ],
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                <h2><span style="color: #BFDA00; text-shadow: 0px 0px 20px #BFDA00; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.xge.points)}</span></h2> XGE`
                        return txt
                    }
                ],
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                <h2><span style="color: #3BB696; text-shadow: 0px 0px 20px #3BB696; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.xla.points)}</span></h2> XLA`
                        return txt
                    }
                ],
                "blank",
                "buyables",
                "blank",
                ["infobox", "respec"],
            ],
            unlocked() { return player.x.points.gte(1) }
        },
        "X-More": {
            content: [
                "main-display",
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
            <h2><span style="color: #27006C; text-shadow: 0px 0px 20px #27006C; font-family: Lucida Console, Courier New, monospace">
                ${format(player.xpo.points)}</span></h2> XPO`
                        return txt
                    }
                ],
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
        <h2><span style="color: #BFDA00; text-shadow: 0px 0px 20px #BFDA00; font-family: Lucida Console, Courier New, monospace">
            ${format(player.xge.points)}</span></h2> XGE`
                        return txt
                    }
                ],
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
        <h2><span style="color: #3BB696; text-shadow: 0px 0px 20px #3BB696; font-family: Lucida Console, Courier New, monospace">
            ${format(player.xla.points)}</span></h2> XLA`
                        return txt
                    }
                ],
                "blank",
                "upgrades",
            ],
            unlocked() { return player.x.points.gte(1) }
        },
        "X-Ultimate": {
            content: [
                "main-display",
                "blank",
                "challenges",
            ],
            unlocked() { return player.x.points.gte(100000)}
        },
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        main: {
            title: "Introducing: Planet X",
            body() { return "Wow! you made it to Outer Space. This is a really big layer (not currently). It has tons of upgrades, milestones, buyables, and more! Good luck!<br> This does not reset The Sun & The Solar System! <br>don't complain, the layer is meant to be weird. You're on your own now!" },
        },
        respec: {
            title: "Respec Info",
            body() { return "The Respec Button is really dangerous! it will do a layer 5 reset and it will also reset some features of X!" },
        },
    },
    milestones: {
        1: {
            requirementDescription: "X-R+M",
            effectDescription: "Keep Rocket Milestones",
            done() { return player.x.points.gte(1) }
        },
        2: {
            requirementDescription: "X-STB",
            effectDescription: "Bulk buy Stars",
            done() { return player.x.points.gte(1) },
        },
        3: {
            requirementDescription: "XX-C04S",
            effectDescription: "Keep Comets & Asteroid Milestones",
            unlocked() { return (hasMilestone("x", 1)) },
            done() { return player.x.points.gte(2) },
        },
        4: {
            requirementDescription: "XX-PL4",
            effectDescription: "Bulk buy Planets",
            unlocked() { return (hasMilestone("x", 1)) },
            done() { return player.x.points.gte(2) },
        },
        5: {
            requirementDescription: "XXX-ULT",
            effectDescription: "Unlock X-Ultimate",
            unlocked() { return (hasMilestone("x", 3)) },
            done() { return player.x.points.gte(3) },
        },
    },
    challenges: {
        11: {
            name: "X-Ultimate",
            canComplete: function () { return player.sun.points.gte("1e53100") },
            challengeDescription: "Disables all automation, Unlocks Charge, Nerfs to almost everything",
            goalDescription: "???",
            rewardDescription: "Unlock Unstable Fuel",
            style() {
                return {
                    "width": "500px",
                    "height": "500px",
                    "color": "#861951",
                    "text-shadow": "#861951 0px 0px 20px",
                    "font-size": "32px",
                    "font-family": "Lucida Console",
                    "TextSize": 50,
                    "backgroundColor": "Black",
                    resetsNothing: true,
                }
            },
        },
    },
    buyables: {
        respec() {
            player.x.buyables[11] = decimalZero
            player.x.buyables[12] = decimalZero
            player.x.buyables[13] = decimalZero
            player.xpo.points = decimalZero
            player.xge.points = decimalZero
            player.xla.points = decimalZero
            doReset(this.layer, true)

        },
        showRespec() { return player.subtabs.x.mainTabs == "X-Define" },
        respecText: () => "Respec",
        11: {
            title: "X-XPO<br>",
            style() {
                return {
                    "width": "175px",
                    "height": "175px",
                }
            },
            cost() {
                let mult = new Decimal(1)
                mult = mult.add(getBuyableAmount(this.layer, 11))
                mult = mult.add(getBuyableAmount(this.layer, 12))
                mult = mult.add(getBuyableAmount(this.layer, 13))
                let cost = new Decimal(mult)
                return cost
            },
            effect(x) {
                let base1 = new Decimal(1)
                if (getBuyableAmount('x', 11) == 0) base1 = new Decimal(0)
                let base2 = new Decimal(10).pow(x)
                let eff = base1.times(base2)
                return eff
            },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " X" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/inf<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id) / 10) + " XPO/s" },
            canAfford() { return player.x.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "X-XGE<br>",
            style() {
                return {
                    "width": "175px",
                    "height": "175px",
                }
            },
            cost() {
                let mult = new Decimal(1)
                mult = mult.add(getBuyableAmount(this.layer, 11))
                mult = mult.add(getBuyableAmount(this.layer, 12))
                mult = mult.add(getBuyableAmount(this.layer, 13))
                let cost = new Decimal(mult)
                return cost
            },
            effect(x) {
                let base1 = new Decimal(1)
                if (getBuyableAmount('x', 12) == 0) base1 = new Decimal(0)
                let base2 = new Decimal(10).pow(x)
                let eff = base1.times(base2)
                return eff
            },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " X" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/inf<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id) / 10) + " XGE/s" },
            canAfford() { return player.x.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title: "X-XLA<br>",
            style() {
                return {
                    "width": "175px",
                    "height": "175px",
                }
            },
            cost() {
                let mult = new Decimal(1)
                mult = mult.add(getBuyableAmount(this.layer, 11))
                mult = mult.add(getBuyableAmount(this.layer, 12))
                mult = mult.add(getBuyableAmount(this.layer, 13))
                let cost = new Decimal(mult)
                return cost
            },
            effect(x) {
                let base1 = new Decimal(1)
                if (getBuyableAmount('x', 13) == 0) base1 = new Decimal(0)
                let base2 = new Decimal(10).pow(x)
                let eff = base1.times(base2)
                return eff
            },
            display() { return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " X" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/inf<br>" + "<br>Effect: " + format(buyableEffect(this.layer, this.id) / 10) + " XLA/s" },
            canAfford() { return player.x.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: {
        11: {
            title: "XPO-B00",
            description: "Rocket Fuel gain is increased based on XPO",
            cost: new Decimal(19),
            unlocked() { return player.xpo.points.gte(0.1) },
            effect() {
                return player.xpo.points.add(10).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XPO",
            currencyLocation() { return player.xpo },
            currencyInternalName: "points",
        },
        12: {
            title: "XPO-XTR",
            description: "Unlock 5 Rocket Fuel Upgrades",
            unlocked() { return (hasUpgrade(this.layer, 11)) },
            cost: new Decimal(171),
            currencyDisplayName: "XPO",
            currencyLocation() { return player.xpo },
            currencyInternalName: "points",
        },
        13: {
            title: "XPO-SDU",
            description: "Stardust gain is increased based on XPO",
            unlocked() { return (hasUpgrade(this.layer, 12)) },
            cost: new Decimal(104),
            effect() {
                return player.xpo.points.add(1).pow(0.227)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XPO",
            currencyLocation() { return player.xpo },
            currencyInternalName: "points",
        },
        14: {
            title: "XPO-SPD",
            description: "Unlock 2 Space Milestones",
            unlocked() { return (hasUpgrade(this.layer, 13)) },
            cost: new Decimal(334),
            currencyDisplayName: "XPO",
            currencyLocation() { return player.xpo },
            currencyInternalName: "points",
        },
        15: {
            title: "XPO-AAA",
            description: "1,000x Asteroids",
            unlocked() { return (hasUpgrade(this.layer, 14)) },
            cost: new Decimal(322),
            currencyDisplayName: "XPO",
            currencyLocation() { return player.xpo },
            currencyInternalName: "points",
        },
        21: {
            title: "XGE-MMM",
            description: "Money gain is greatly increased based on XGE",
            cost: new Decimal(65),
            unlocked() { return player.xge.points.gte(0.1) },
            effect() {
                return player.xge.points.add(10).pow(1.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XGE",
            currencyLocation() { return player.xge },
            currencyInternalName: "points",
        },
        22: {
            title: "XGE-RO+",
            description: "Unlock 2 Rocket Upgrades",
            cost: new Decimal(228),
            unlocked() { return (hasUpgrade(this.layer, 21)) },
            currencyDisplayName: "XGE",
            currencyLocation() { return player.xge },
            currencyInternalName: "points",
        },
        23: {
            title: "XGE-ROD",
            description: "Rocket cost is decreased based on XGE",
            cost: new Decimal(112),
            unlocked() { return (hasUpgrade(this.layer, 22)) },
            effect() {
                return player.xge.points.add(10).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XGE",
            currencyLocation() { return player.xge },
            currencyInternalName: "points",
        },
        24: {
            title: "XGE-SRO",
            description: "Unlock 1 Space Milestone",
            cost: new Decimal(378),
            unlocked() { return (hasUpgrade(this.layer, 23)) },
            currencyDisplayName: "XGE",
            currencyLocation() { return player.xge },
            currencyInternalName: "points",
        },
        25: {
            title: "XGE-ROX",
            description: "Rocket cost is decreased based on XGE",
            cost: new Decimal(304),
            unlocked() { return (hasUpgrade(this.layer, 24)) },
            effect() {
                return player.xge.points.add(10).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XGE",
            currencyLocation() { return player.xge },
            currencyInternalName: "points",
        },
        31: {
            title: "XLA-RO1",
            description: "Rocket cost is decreased based on XLA",
            cost: new Decimal(105),
            unlocked() { return player.xla.points.gte(0.1) },
            effect() {
                return player.xla.points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XLA",
            currencyLocation() { return player.xla },
            currencyInternalName: "points",
        },
        32: {
            title: "XLA-RO2",
            description: "Rocket cost is decreased based on XLA",
            cost: new Decimal(208),
            unlocked() { return (hasUpgrade(this.layer, 31)) },
            effect() {
                return player.xla.points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XLA",
            currencyLocation() { return player.xla },
            currencyInternalName: "points",
        },
        33: {
            title: "XLA-RO3",
            description: "Rocket cost is decreased based on XLA",
            cost: new Decimal(209),
            unlocked() { return (hasUpgrade(this.layer, 32)) },
            effect() {
                return player.xla.points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XLA",
            currencyLocation() { return player.xla },
            currencyInternalName: "points",
        },
        34: {
            title: "XLA-RO4",
            description: "Rocket cost is decreased based on XLA",
            cost: new Decimal(302),
            unlocked() { return (hasUpgrade(this.layer, 33)) },
            effect() {
                return player.xla.points.add(1).pow(4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XLA",
            currencyLocation() { return player.xla },
            currencyInternalName: "points",
        },
        35: {
            title: "XLA-RO5",
            description: "Rocket cost is decreased based on XLA",
            cost: new Decimal(303),
            unlocked() { return (hasUpgrade(this.layer, 34)) },
            effect() {
                return player.xla.points.add(1).pow(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" }, // Add formatting to the effect 
            currencyDisplayName: "XLA",
            currencyLocation() { return player.xla },
            currencyInternalName: "points",
        },
    }
})