
// A side layer with achievements, with no prestige
addLayer("a", {
    resource: "Achievements", 
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "yellow",
    symbol: "🏆",
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "ROCKET FUEL!",
            done() {return player.r.points.gte(1)},
            tooltip: "1 Rocket Fuel",
            goalTooltip: "Get 1 Rocket Fuel", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        12: {
            name: "funni",
            done() {return (hasUpgrade("r", 21))},
            tooltip: "Rocket Fuel Upgrade 6",
            goalTooltip: "Buy Rocket Fuel Upgrade 6", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        13: {
            name: "1K",
            done() {return player.points.gte(1000)},
            tooltip: "1,000 Money",
            goalTooltip: "Get 1,000 Money", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        14: {
            name: "first space plane",
            done() {return player.ro.points.gte(1)},
            tooltip: "1 Rocket",
            goalTooltip: "Get 1 Rocket", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        15: {
            name: "auto rocketfuel??",
            done() {return player.ro.points.gte(4)},
            tooltip: "Rocket Milestone 4",
            goalTooltip: "Get Rocket Milestone 4", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        16: {
            name: "Rocket Fuel Millionaire",
            done() {return player.r.points.gte(1000000)},
            tooltip: "1,000,000 Rocket Fuel",
            goalTooltip: "Get 1,000,000 Rocket Fuel", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        17: {
            name: "wtf are e's?",
            done() {return player.points.gte(1e9)},
            tooltip: "1e9 Money",
            goalTooltip: "Get 1e9 Money", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        18: {
            name: "finally bro",
            done() {return player.ro.points.gte(8)},
            tooltip: "Rocket Milestone 8",
            goalTooltip: "Get Rocket Milestone 8", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        21: {
            name: "10 space dudes",
            done() {return player.as.points.gte(10)},
            tooltip: "10 Astronauts",
            goalTooltip: "Get 10 Astronauts", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        22: {
            name: "unbalanced ahh game",
            done() {return player.as.points.gte(500000)},
            tooltip: "500,000 Astronauts (softcaps astronaut gain)",
            goalTooltip: "Get 500,000 Astronauts", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
    },
},
)