
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
    tabFormat: {
        "Achievements": {
            content: [
            "main-display",
            "blank",
            "achievements",
        ],
        },
        "Milestones": {
            content: [
            "main-display",
            "blank",
            "milestones"
         ],
     },
  },

  milestones: {
    1: {
        requirementDescription: "7 Achievements",
        effectDescription: "Money gain is increased based on Achievements [COMING SOON]",
        done() {return player.a.points.gte(7)}
    },
    2: {
        requirementDescription: "12 Achievements",
        effectDescription: "Rocket Fuel gain is increased based on Achievements [COMING SOON]",
        done() {return player.a.points.gte(12)}
    },
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
            done() {return (hasUpgrade("r", 22))},
            tooltip: "Rocket Fuel Upgrade 7",
            goalTooltip: "Buy Rocket Fuel Upgrade 7", // Shows when achievement is not completed
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
        21: {
            name: "wtf are e's?",
            done() {return player.points.gte(1e9)},
            tooltip: "1e9 Money",
            goalTooltip: "Get 1e9 Money", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        22: {
            name: "finally bro",
            done() {return player.ro.points.gte(8)},
            tooltip: "Rocket Milestone 8",
            goalTooltip: "Get Rocket Milestone 8", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        23: {
            name: "10 space dudes",
            done() {return player.as.points.gte(10)},
            tooltip: "10 Astronauts",
            goalTooltip: "Get 10 Astronauts", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        24: {
            name: "unbalanced ahh game",
            done() {return player.as.points.gte(500000)},
            tooltip: "Astronaut Milestone 2 (softcaps astronaut gain)",
            goalTooltip: "Get Astronaut Milestone 2", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        25: {
            name: "softcapped again???",
            done() {return player.as.points.gte(1e8)},
            tooltip: "1e8 Astronauts (softcaps astronaut gain)",
            goalTooltip: "Get 1e8 Astronauts", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        25: {
            name: "even more rf upgrades?",
            done() {return (hasUpgrade("as", 25))},
            tooltip: "Astronaut Upgrade 10",
            goalTooltip: "Get Astronaut Upgrade 10", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        26: {
            name: "something new!",
            done() {return (hasMilestone("ro", 15))},
            tooltip: "Rocket Milestone 15",
            goalTooltip: "Get Rocket Milestone 15", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        31: {
            name: "almost at the end",
            done() {return player.s.points.gte(100)},
            tooltip: "100 Space Distance",
            goalTooltip: "Get 100 Space Distance", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        32: {
            name: "almost at the end²",
            done() {return player.s.points.gte(10000)},
            tooltip: "10000 Space Distance",
            goalTooltip: "Get 10000 Space Distance", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        33: {
            name: "more upgrades in the worst feature :(",
            done() {return (hasMilestone("ro", 16))},
            tooltip: "Rocket Milestone 16",
            goalTooltip: "Get Rocket Milestone 16", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        34: {
            name: "final steps cuh",
            done() {return player.r.points.gte(1e70)},
            tooltip: "1e70 Rocket Fuel",
            goalTooltip: "Get 1e70 Rocket Fuel", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        35: {
            name: "Mega super!1!1!!",
            done() {return (hasUpgrade("s", 41))},
            tooltip: "Space Distance Upgrade 10",
            goalTooltip: "Get Space Distance Upgrade 10", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
        36: {
            name: "woah another feature",
            done() {return (hasMilestone("ro", 20))},
            tooltip: "Rocket Milestone 20",
            goalTooltip: "Get Rocket Milestone 20", // Shows when achievement is not completed
            onComplete() {addPoints("a",1)}
        },
    },
},)