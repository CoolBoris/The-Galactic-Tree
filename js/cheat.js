
// A side layer with achievements, with no prestige
addLayer("c", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    
    resource: "cheat points", // Name of prestige currency
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    baseResource: "Money", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.000001, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    layerShown(){return false},
    color: "white",
    symbol: "C",
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Cheat layer")
    },
    upgrades: {
        11: {
            title: "TEMP UPGRADE",
            description: "+1000 money/s",
            cost: new Decimal(1),
        },
        12: {
            title: "TEMP UPGRADE",
            description: "x1e9 Rocket fuel",
            cost: new Decimal(1),
        },
    },
    },
)