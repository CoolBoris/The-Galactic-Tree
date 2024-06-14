
// A side layer with achievements, with no prestige
addLayer("a", {
    resource: "achievement power", 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
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
            name: "Get me!",
            done() {return true},
            goalTooltip: "How did this happen?", // Shows when achievement is not completed
        },
    },
},
)