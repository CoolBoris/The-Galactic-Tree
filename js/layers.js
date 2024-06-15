addLayer("r", {
    name: "rockets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#949494",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Rockets", // Name of prestige currency
    baseResource: "Rocket Fuel", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('r', 14)) mult = mult.times(upgradeEffect('r', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Press for Rocket reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Launch your first Rocket!",
            description: "+1 Rocket Fuel/s",
            cost: new Decimal(1),
        },
        12: {
            title: "Launch a second Rocket!",
            description: "x1.5 Rocket Fuel",
            cost: new Decimal(1),
        },
        13: {
            title: "Rocket Fuel Mayhem",
            description: "Rocket Fuel is boosted based on your Rockets",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Rockets+",
            description: "Rockets price is decreased",
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return "/"+ format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
    },
})