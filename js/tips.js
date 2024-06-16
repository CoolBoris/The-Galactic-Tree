
// A side layer with achievements, with no prestige
addLayer("t", {
    resource: "Tips", 
    startData() { return {
        unlocked: true,
        points: new Decimal(0)
    }},
    color: "blue",
    symbol: "💡",
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Tips")
    },
    tabFormat: {
        "Main": {
            content: [
            "blank",
            "infoboxes",
        ],
     },
     infoboxes: {
        lore: {
            title: "coming soon",
            body() { return "bar" },
            unlocked() { return (hasMilestone("ro", 1))},
        },
    }
  },
},)