
// A side layer with achievements, with no prestige
addLayer("a", {
    resource: "Achievements",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "yellow",
    symbol: "🏆",
    row: "side",
    position: "1",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    tabFormat: {
        "Achievements": {
            content: [
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: Yellow; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${(player.a.points)}/42</span></h2> Achievements`
                        return txt
                    }
                ],
                "blank",
                ["display-text",
                    'Achievements contain spoilers!',
                    { "color": "red", "font-size": "18px", }],
                "blank",
                "achievements",
            ],
        },
    },

    achievementPopups: true,
    achievements: {
        11: {
            name: "ROCKET FUEL!",
            done() { return player.r.points.gte(1) },
            tooltip: "1 Rocket Fuel",
            goalTooltip: "Get 1 Rocket Fuel", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#97192E",
                    "border-width": "3px"
                }
            }
        },
        12: {
            name: "weak upgrade",
            done() { return (hasUpgrade("r", 22)) },
            tooltip: "Rocket Fuel Upgrade 7",
            goalTooltip: "Buy Rocket Fuel Upgrade 7", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        13: {
            name: "thousandaire",
            done() { return player.points.gte(1000) },
            tooltip: "1,000 Money",
            goalTooltip: "Get 1,000 Money", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        14: {
            name: "Rocket engineer!",
            done() { return player.ro.points.gte(1) },
            tooltip: "1 Rocket",
            goalTooltip: "Get 1 Rocket", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#6D6D6D",
                    "border-width": "3px"
                }
            }
        },
        15: {
            name: "Automation!",
            done() { return player.ro.points.gte(4) },
            tooltip: "Rocket Milestone 4",
            goalTooltip: "Get Rocket Milestone 4", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        16: {
            name: "Rocket Fuel Millionaire",
            done() { return player.r.points.gte(1000000) },
            tooltip: "1,000,000 Rocket Fuel",
            goalTooltip: "Get 1,000,000 Rocket Fuel", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        21: {
            name: "Scientific Notation",
            done() { return player.points.gte(1e9) },
            tooltip: "1e9 Money",
            goalTooltip: "Get 1e9 Money", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        22: {
            name: "welcome to the worst feature!",
            done() { return player.as.points.gte(1) },
            tooltip: "1 Astronaut",
            goalTooltip: "Get 1 Astronaut", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#EFEFEF",
                    "border-width": "3px"
                }
            }
        },
        23: {
            name: "(Softcapped)",
            done() { return player.as.points.gte(10000) },
            tooltip: "10,000 Astronauts",
            goalTooltip: "Get 10,000 Astronauts", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        24: {
            name: "Astronauts pro",
            done() { return player.as.points.gte(500000) },
            tooltip: "Astronaut Milestone 2",
            goalTooltip: "Get Astronaut Milestone 2", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        25: {
            name: "More RF Upgrades",
            done() { return hasMilestone("ro", 16) },
            tooltip: "Rocket Milestone 16",
            goalTooltip: "Get Rocket Milestone 16", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        26: {
            name: "and leaving Earth!",
            done() { return player.s.points.gte(1) },
            tooltip: "Space Reset",
            goalTooltip: "Trigger the Space reset", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#AC00AC",
                    "border-width": "3px"
                }
            }
        },
        31: {
            name: "almost at the end",
            done() { return player.s.points.gte(100) },
            tooltip: "100 Space Distance",
            goalTooltip: "Get 100 Space Distance", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        32: {
            name: "almost at the end²",
            done() { return player.s.points.gte(10000) },
            tooltip: "10000 Space Distance",
            goalTooltip: "Get 10000 Space Distance", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        33: {
            name: "yaay more rf!",
            done() { return (hasMilestone("ro", 16)) },
            tooltip: "Rocket Milestone 16",
            goalTooltip: "Get Rocket Milestone 16", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        34: {
            name: "final steps ...",
            done() { return player.r.points.gte(1e50) },
            tooltip: "1e50 Rocket Fuel",
            goalTooltip: "Get 1e50 Rocket Fuel", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        35: {
            name: "woah 2 features?",
            done() { return (hasMilestone("ro", 20)) },
            tooltip: "Rocket Milestone 20",
            goalTooltip: "Get Rocket Milestone 20", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        36: {
            name: "Super Mega",
            done() { return (hasUpgrade("s", 42)) },
            tooltip: "Space Distance Upgrade 10",
            goalTooltip: "Get Space Distance Upgrade 10", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        41: {
            name: "tough decision 1",
            done() { return player.c.points.gte(1) },
            tooltip: "1 Comet",
            goalTooltip: "Get 1 Comet", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#2D6CD3",
                    "border-width": "3px"
                }
            }
        },
        42: {
            name: "tough decision 2",
            done() { return player.ast.points.gte(1) },
            tooltip: "1 Asteroid",
            goalTooltip: "Get 1 Asteroid", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#F1DD4A",
                    "border-width": "3px"
                }
            }
        },
        43: {
            name: "What is your favorite?",
            done() { return player.ast.points.gte(20) || player.c.points.gte(20) },
            tooltip: "20 Asteroids or 20 Comets",
            goalTooltip: "Get 20 Asteroids or 20 Comets", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        44: {
            name: "No crash yet?",
            done() { return player.c.points.gte(50000) },
            tooltip: "50,000 Comets",
            goalTooltip: "Get 50,000 Comets", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        45: {
            name: "Millionoid",
            done() { return player.ast.points.gte(1e6) },
            tooltip: "1,000,000 Comets",
            goalTooltip: "Get 1,000,000 Asteroids", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        46: {
            name: "Super Mega Ultra",
            done() { return hasUpgrade("s", 51) },
            tooltip: "Space Distance Upgrade 21",
            goalTooltip: "Get Space Distance Upgrade 21", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        51: {
            name: "Research",
            done() { return hasChallenge("c", 11) },
            tooltip: "Halley's Comet",
            goalTooltip: "Complete Halley's Comet", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        52: {
            name: "Finished",
            done() { return hasChallenge("ast", 14) },
            tooltip: "Asteroid Ceres",
            goalTooltip: "Complete Asteroid Ceres", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        53: {
            name: "ST4R",
            done() { return player.stars.points.gte(1) },
            tooltip: "1 Star",
            goalTooltip: "Get 1 Star", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#FFFEA5",
                    "border-width": "3px"
                }
            }
        },
        54: {
            name: "Max",
            done() {
                if (getBuyableAmount('stars', 11) == 100) {
                    return true
                }
            },
            tooltip: "Star Buyable 1",
            goalTooltip: "Complete Star Buyable 1", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        55: {
            name: "Stardust is cool",
            done() { return hasUpgrade("stars", 15) },
            tooltip: "Star Upgrade 5",
            goalTooltip: "Unlock Star Upgrade 5", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        56: {
            name: "Sunlight",
            done() { return hasMilestone("s", 13) },
            tooltip: "The Sun",
            goalTooltip: "Unlock The Sun", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#FF6C00",
                    "border-width": "3px"
                }
            }
        },
        61: {
            name: "Light years",
            done() { return player.sun.points.gte(1e100) },
            tooltip: "1e100 Light",
            goalTooltip: "Get 1e100 Light", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        62: {
            name: "Infinite Light",
            done() { return hasChallenge("stars", 11) },
            tooltip: "The Sun",
            goalTooltip: "Complete The Sun", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#5E37B0",
                    "border-width": "3px"
                }
            }
        },
        63: {
            name: "Planetoid Mayhem",
            done() { return player.planetoid.points.gte(250) },
            tooltip: "250 Planetoids",
            goalTooltip: "Get 250 Planetoids", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        64: {
            name: "Automation+++",
            done() { return hasMilestone("planets", 5) },
            tooltip: "Planet Milestone 5",
            goalTooltip: "Get Planet Milestone 5", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        65: {
            name: "Prepare for 8",
            done() { return hasMilestone("planets", 6) },
            tooltip: "The Solar System",
            goalTooltip: "Unlock The Solar System", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#620A8A",
                    "border-width": "3px"
                }
            }
        },
        66: {
            name: "Easy, right?",
            done() { return hasMilestone("mercury", 3) },
            tooltip: "Mercury",
            goalTooltip: "Complete Mercury", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        71: {
            name: "100CPS",
            done() {
                if (getBuyableAmount('neptune', 11) == 100) {
                    return true
                }
            },
            tooltip: "Neptune Buyable 1",
            goalTooltip: "Complete Neptune Buyable 1", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) }
        },
        72: {
            name: "oh, that was easy..",
            done() { return hasMilestone("jupiter", 1) },
            tooltip: "The Solar System",
            goalTooltip: "Complete The Solar System", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
            style() {
                return {
                    "border-color": "#A1004C",
                    "border-width": "3px"
                }
            }
        },
        73: {
            name: "Ultrafuel",
            done() { return hasUpgrade("r", 51) },
            tooltip: "Rocket Fuel Upgrade 21",
            goalTooltip: "Unlock Rocket Fuel Upgrade 21", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
        },
        74: {
            name: "XPRO",
            done() { return player.xpo.points.gte(1000) },
            tooltip: "1,000 XPO",
            goalTooltip: "Get 1,000 XPO", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
        },
        75: {
            name: "TRIPLE X",
            done() { return player.x.points.gte(3) },
            tooltip: "XXX",
            goalTooltip: "Get XXX", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
        },
        76: {
            name: "The Final Rocket",
            done() { return hasMilestone("ro", 21) },
            tooltip: "Rocket Milestone 21",
            goalTooltip: "Unlock Rocket Milestone 21", // Shows when achievement is not completed
            onComplete() { addPoints("a", 1) },
        },
    }
},)

addLayer("sa", {
    resource: "Secret Achievements",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#3E3E3E",
    symbol: "🏆",
    row: "side",
    position: "2",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Secret Achievements")
    },
    tabFormat: {
        "Secret Achievements": {
            content: [
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: #3E3E3E; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${(player.sa.points)}/12</span></h2> Secret Achievements`
                        return txt
                    }
                ],
                "blank",
                "achievements",
            ],
        },
        "Secrets": {
            content: [
                ["infobox", "main"],
            ],
        },
    },
    infoboxes: {
        main: {
            title: "Introducing: Secrets",
            body() { return "There are currently 3 Secrets in The Galactic Tree, each give a special role in CoolBoris' Studio. <br>To claim the role you need to send a screenshot of the secret to @coolboris08 or any staff and you will recieve your role asap.<br>Good luck!" },
        },
    },

    achievementPopups: true,
    achievements: {
        11: {
            name: "The First one is always free",
            done() { return player.sa.points.gte(0) },
            tooltip: "Free Achievement<br>Reward: Secrets",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "you can't see me?", // Shows when achievement is not completed
        },
        12: {
            name: "fruity",
            done() {
                if (options.theme == "strawberry") {
                    return true
                }
            },
            tooltip: "Switch the theme",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "Whatever the title says", // Shows when achievement is not completed
        },
        13: {
            name: "last",
            done() {
                if (options.theme == "blackberry") {
                    return true
                }
            },
            tooltip: "Go through all the themes",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "actually default", // Shows when achievement is not completed
        },
        14: {
            name: "9,882 Inches",
            done() { return player.s.points.gte(251) },
            tooltip: "251 Space Distance",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "Convert", // Shows when achievement is not completed
        },
        15: {
            name: "Keep clicking!",
            done() { return player.sun.points.gte("1e53150") },
            tooltip: "1e53,150 Light",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "keep going!", // Shows when achievement is not completed
        },
        16: {
            name: "tap tap tap",
            done() { return player.sun.points.gte("1e53250") },
            tooltip: "1e53,250 Light",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "even further!!", // Shows when achievement is not completed
        },
        21: {
            name: "Endgame",
            done() { return player.points.gte("1e350") },
            tooltip: "You beat the game! congrats!<br>Reward: Infinity",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "Beat the game (changes every update)", // Shows when achievement is not completed
        },
        22: {
            name: "Mega Endgame",
            done() { return player.points.gte("1e366") },
            tooltip: "You definitely beat the game now..",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "1e366 Money (changes every update)", // Shows when achievement is not completed
        },
        23: {
            name: "Infinite",
            done() { return player.inf.points.gte(1) },
            tooltip: "You reached Infinity once",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "Infinity", // Shows when achievement is not completed
        },
        24: {
            name: "Mega Infinite",
            done() { return player.megainf.points.gte(1) },
            tooltip: "You reached Mega Infinity once",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "even more?", // Shows when achievement is not completed
        },
        25: {
            name: "Omega Infinite",
            done() { return player.omegainf.points.gte(10) },
            goalTooltip: "Beat Infinity. (10 Omega Infinities)",
            onComplete() { addPoints("sa", 1) },
            tooltip: "Congratulations, Few have reached this milestone, but your journey is far from over. The path you've chosen is only the beginning. What lies beyond is known only to those who dare to seek it. The game is never truly over.", // Shows when achievement is not completed
        },
        26: {
            name: "blobs",
            done() { return player.blob.points.gte(10) },
            tooltip: "10 Blobs<br>Reward: Secret Role)",
            onComplete() { addPoints("sa", 1) },
            goalTooltip: "blob blob", // Shows when achievement is not completed
        },
    },
},)

addLayer("save", {
    resource: "save",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#48FFD0",
    symbol: "💾",
    row: "side",
    position: "3",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Savebank")
    },
    tabFormat: {
        "Savebank": {
            content: [
                ["display-text",
                    "If you have a save that isn't added yet, send them to any staff in CoolBoris' Studio!",
                    { "color": "white", "font-size": "13px", }],
                "blank",
                "clickables",
            ],
        },
    },
    clickables: {
        11: {
            title: "Full Reset",
            display: "Chapter 0: Earth",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMDYzMTY5MjE3OCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLlByZTIuMCIsInRpbWVQbGF5ZWQiOjM2NjUuMDM4NTc0NzcxODU5LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiIxMCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sInJvIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJzIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYXN0Ijp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJjIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9fSwibGFzdFNhZmVUYWIiOiJyIiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM2NjUuMDM4NTc0NzcxODU5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM2NjUuMDM4NTc0NzcxODU5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInJvIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM2NjUuMDM4NTc0NzcxODU5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzY2NS4wMzg1NzQ3NzE4NTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhcyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzY2NS4wMzg1NzQ3NzE4NTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzY2NS4wMzg1NzQ3NzE4NTksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXN0Ijp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNjY1LjAzODU3NDc3MTg1OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {
                return {
                    'background-color': "Red",
                }
            },
        },
        12: {
            title: "Unlock Rockets",
            display: "Chapter 0: Earth",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMDYzMjkxMTEyMCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLlByZTIuMCIsInRpbWVQbGF5ZWQiOjQ4OS40NTIwMDAwMDAwMTYyLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiI1MDguMTc3NDUzMTcxMDkzMTMiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwicyI6eyJtYWluVGFicyI6Ik1haW4ifSwiYSI6eyJtYWluVGFicyI6IkFjaGlldmVtZW50cyJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImFzdCI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifX0sImxhc3RTYWZlVGFiIjoicm8iLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ4OS40NTIwMDAwMDAwMTYyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDg5LjQ1MjAwMDAwMDAxNjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ4OS40NTIwMDAwMDAwMTYyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInJvIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0ODkuNDUyMDAwMDAwMDE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1MDAiLCJ0b3RhbCI6IjEyODIiLCJiZXN0IjoiNTAwIiwicmVzZXRUaW1lIjo2LjM1Mjk5OTk5OTk5OTk5OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDg5LjQ1MjAwMDAwMDAxNjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMiIsInRvdGFsIjoiMiIsImJlc3QiOiIyIiwicmVzZXRUaW1lIjo0ODkuNDUyMDAwMDAwMDE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhcyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDg5LjQ1MjAwMDAwMDAxNjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0ODkuNDUyMDAwMDAwMDE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ4OS40NTIwMDAwMDAwMTYyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzdCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDg5LjQ1MjAwMDAwMDAxNjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDg5LjQ1MjAwMDAwMDAxNjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0=")
            },
            style() {
                return {
                    'background-color': "#6D6D6D",
                }
            },
        },
        13: {
            title: "Unlock Astronauts",
            display: "Chapter 0: Earth",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMDY4OTM0OTg3NCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjIuMCIsInRpbWVQbGF5ZWQiOjYzNjEuNTU1OTIyNjU1NjEyLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiIxMjAxNTY5NzAzMzQuODQwMTIiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwicyI6eyJtYWluVGFicyI6Ik1haW4ifSwiYSI6eyJtYWluVGFicyI6IkFjaGlldmVtZW50cyJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImFzdCI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiciI6eyJtYWluVGFicyI6Ik1haW4ifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9fSwibGFzdFNhZmVUYWIiOiJyIiwiaW5mb2JveGVzIjp7fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2MzYxLjU1NTkyMjY1NTYxMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjYzNjEuNTU1OTIyNjU1NjEyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2MzYxLjU1NTkyMjY1NTYxMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjYzNjEuNTU1OTIyNjU1NjEyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjM2MS41NTU5MjI2NTU2MTIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiciI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNzg1MDY4Nzk1NzMyMy4zOTYiLCJ0b3RhbCI6Ijc4NTA3ODgwNDEzMDUuMzk2IiwiYmVzdCI6Ijc4NTA2ODc5NTczMjMuMzk2IiwicmVzZXRUaW1lIjo1Ny42OTM5OTk5OTk5OTk5MjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyLDMzLDM0LDM1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI4IiwidG90YWwiOiIyNCIsImJlc3QiOiI4IiwicmVzZXRUaW1lIjo2OS4xMDY5OTk5OTk5OTk3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTNdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4Il0sImxhc3RNaWxlc3RvbmUiOiI4IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiOCIsInRvdGFsIjoiOCIsImJlc3QiOiI4IiwicmVzZXRUaW1lIjo2MzYxLjU1NTkyMjY1NTYxMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE2IiwiMTUiLCIyMSIsIjIyIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMyIsInRvdGFsIjoiMyIsImJlc3QiOiIzIiwicmVzZXRUaW1lIjo1ODcyLjEwMzkyMjY1NTU4NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhdmUiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTg3Mi4xMDM5MjI2NTU1ODUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIyMSI6IiIsIjIyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjYzNjEuNTU1OTIyNjU1NjEyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjM2MS41NTU5MjI2NTU2MTIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjM2MS41NTU5MjI2NTU2MTIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXN0Ijp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo2MzYxLjU1NTkyMjY1NTYxMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {
                return {
                    'background-color': "#EFEFEF",
                }
            },
        },
        21: {
            title: "Unlock Space",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMDczNDI2MzczMiwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjIuMCIsInRpbWVQbGF5ZWQiOjEyNjU0LjAyMTgwOTExNjYsImtlZXBHb2luZyI6ZmFsc2UsImhhc05hTiI6ZmFsc2UsInBvaW50cyI6IjYuMzc3NTMyODYxMjUwMjA4NWUzMSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sInJvIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwicyI6eyJtYWluVGFicyI6Ik1haW4ifSwiYSI6eyJtYWluVGFicyI6IkFjaGlldmVtZW50cyJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImFzdCI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiciI6eyJtYWluVGFicyI6Ik1haW4ifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9LCJzb2Z0Y2FwcyI6eyJtYWluVGFicyI6ImluZm8ifX0sImxhc3RTYWZlVGFiIjoicyIsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTI2NTQuMDIxODA5MTE2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyNjU0LjAyMTgwOTExNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyNjU0LjAyMTgwOTExNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjY1NC4wMjE4MDkxMTY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTI2NTQuMDIxODA5MTE2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhc3QiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyNjU0LjAyMTgwOTExNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiciI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiOS4yNTcwNjAxMzkwMTY5OTNlMzEiLCJ0b3RhbCI6IjkuMjU3MDYwMTM5MDE2OTkzZTMxIiwiYmVzdCI6IjkuMjU3MDYwMTM5MDE2OTkzZTMxIiwicmVzZXRUaW1lIjoxMC4xNTkwMDAwMDAwMDAwMDgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyLDMzLDM0LDM1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxNSIsInRvdGFsIjoiNTMiLCJiZXN0IjoiMTUiLCJyZXNldFRpbWUiOjEwLjE1OTAwMDAwMDAwMDAwOCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSJdLCJsYXN0TWlsZXN0b25lIjoiMTUiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxMSIsInRvdGFsIjoiMTEiLCJiZXN0IjoiMTEiLCJyZXNldFRpbWUiOjEyNjU0LjAyMTgwOTExNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNiIsIjE1IiwiMjEiLCIyMiIsIjIzIiwiMjQiLCIyNSJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2EiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMiLCJ0b3RhbCI6IjMiLCJiZXN0IjoiMyIsInJlc2V0VGltZSI6MTIxNjQuNTY5ODA5MTE2NTcyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F2ZSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjE2NC41Njk4MDkxMTY1NzIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIyMSI6IiIsIjIyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic29mdGNhcHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NjI5Mi40NjU4ODY0NTk5MTgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMwODc5MDEyNTA5MzczNy44IiwidG90YWwiOiIzMDg4MDAyMzMzNTUzMjEuOCIsImJlc3QiOiIzMDg3OTAxMjUwOTM3MzcuOCIsInJlc2V0VGltZSI6NzIuMDU4OTk5OTk5OTk5ODYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiXSwibGFzdE1pbGVzdG9uZSI6IjMiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMjY1NC4wMjE4MDkxMTY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImMiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEyNjU0LjAyMTgwOTExNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0=")
            },
            style() {
                return {
                    'background-color': "#AC00AC",
                }
            },

        },
        22: {
            title: "Unlock Comets & Asteroids",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMDk2Nzk3Mzg0Nywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjIuMCIsInRpbWVQbGF5ZWQiOjIwNDY5Ljg5MTYzNzA4MDQwNywia2VlcEdvaW5nIjpmYWxzZSwiaGFzTmFOIjpmYWxzZSwicG9pbnRzIjoiNi4xNzg5MTk5MTYwMjA1MTFlNDgiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sInMiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYXMiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJhc3QiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sImMiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sInIiOnsibWFpblRhYnMiOiJNYWluIn0sInNhIjp7Im1haW5UYWJzIjoiU2VjcmV0IEFjaGlldmVtZW50cyJ9LCJzYXZlIjp7Im1haW5UYWJzIjoiU2F2ZWJhbmsifSwic29mdGNhcHMiOnsibWFpblRhYnMiOiJpbmZvIn19LCJsYXN0U2FmZVRhYiI6ImMiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIwNDY5Ljg5MTYzNzA4MDQwNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIwNDY5Ljg5MTYzNzA4MDQwNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA0NjkuODkxNjM3MDgwNDA3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA0NjkuODkxNjM3MDgwNDA3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA0NjkuODkxNjM3MDgwNDA3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzdCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjA0NjkuODkxNjM3MDgwNDA3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuMDI2MTI2OTUzMzkxMTUxNWU2MCIsInRvdGFsIjoiMS4wMjYxMjY5NTMzOTExNTE1ZTYwIiwiYmVzdCI6IjEuMDI2MTI2OTUzMzkxMTUxNWU2MCIsInJlc2V0VGltZSI6MTYuMjUxMDAwMDAwMDAwMDMzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNSwzMSwzMiwzMywzNCwzNSw0MSw0Miw0Myw0NCw0NV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJybyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjAiLCJ0b3RhbCI6IjczIiwiYmVzdCI6IjIwIiwicmVzZXRUaW1lIjoxNi4yNTEwMDAwMDAwMDAwMzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiLCI3IiwiOCIsIjkiLCIxMCIsIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjE3IiwiMTgiLCIxOSIsIjIwIl0sImxhc3RNaWxlc3RvbmUiOiIyMCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE3IiwidG90YWwiOiIxNyIsImJlc3QiOiIxNyIsInJlc2V0VGltZSI6MjA0NjkuODkxNjM3MDgwNDA3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTYiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzIiwidG90YWwiOiIzIiwiYmVzdCI6IjMiLCJyZXNldFRpbWUiOjE5OTgwLjQzOTYzNzA4MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhdmUiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk5ODAuNDM5NjM3MDgyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMjEiOiIiLCIyMiI6IiIsIjIzIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic29mdGNhcHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQxMDguMzM1NzE0NDI3NDg1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjUyNDA2NjYyOTgwNjIyMzVlMjkiLCJ0b3RhbCI6IjEuNTI0MDY2NjI5ODA2MjIzNWUyOSIsImJlc3QiOiIxLjUyNDA2NjYyOTgwNjIyMzVlMjkiLCJyZXNldFRpbWUiOjEwOC45MDYwMDAwMDAwMDAwOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiXSwibGFzdE1pbGVzdG9uZSI6IjQiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0NjQ4LjcwMTc1MDU4NDE3IiwidG90YWwiOiIxMzc5OC43MDE3NTA1ODQwMDUiLCJiZXN0IjoiMTEzMTEuNDU3NzUwNTg0MjIzIiwicmVzZXRUaW1lIjo0Mjc5LjYyOTY0MTA0MDUxNywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMjIsMjMsMjQsMzJdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiXSwibGFzdE1pbGVzdG9uZSI6IjQiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJjIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMDQ2OS44OTE2MzcwODA0MDcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0=")
            },
            style() {
                return {
                    'background-color': "#43A05F",
                }
            },
        },
        23: {
            title: "Unlock Stars",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMTc2NDY5NzgzOCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjIuMiIsInRpbWVQbGF5ZWQiOjMyMTI5Ljg5OTYzNzAyNTk3NCwia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiI3LjQ1MTAyOTExMjczNTM2N2UxMDgiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwicyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYSI6eyJtYWluVGFicyI6IkFjaGlldmVtZW50cyJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImFzdCI6eyJtYWluVGFicyI6IkFzdGVyb2lkcyJ9LCJjIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwiciI6eyJtYWluVGFicyI6Ik1haW4ifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9LCJzb2Z0Y2FwcyI6eyJtYWluVGFicyI6IkFzdHJvbmF1dHMifSwiaW5mIjp7Im1haW5UYWJzIjoiSW5maW5pdHkifSwibWVnYWluZiI6eyJtYWluVGFicyI6Ik1lZ2EgSW5maW5pdHkifSwib21lZ2FpbmYiOnsibWFpblRhYnMiOiJPbWVnYSBJbmZpbml0eSJ9fSwibGFzdFNhZmVUYWIiOiJpbmYiLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyMTI5Ljg5OTYzNzAyNTk3NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyMTI5Ljg5OTYzNzAyNTk3NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzIxMjkuODk5NjM3MDI1OTc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzIxMjkuODk5NjM3MDI1OTc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzIxMjkuODk5NjM3MDI1OTc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuMjcyNzQ4NDYzNzQ1OTE3ZTExNSIsInRvdGFsIjoiMi4yNzI3NDg0NjM3NDU5MTdlMTE1IiwiYmVzdCI6IjIuMjcyNzQ4NDYzNzQ1OTE3ZTExNSIsInJlc2V0VGltZSI6MzIyLjA0ODAwMDAwMDAwMTQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyLDMzLDM0LDM1LDQxLDQyLDQzLDQ0LDQ1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjI2IiwidG90YWwiOiIyNiIsImJlc3QiOiIyNiIsInJlc2V0VGltZSI6MzIxMjkuODk5NjM3MDI1OTc0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTYiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiLCI0MiIsIjQxIiwiMzYiLCI0MyIsIjQ0IiwiNDUiLCI0NiIsIjUxIiwiNTIiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI2IiwidG90YWwiOiI2IiwiYmVzdCI6IjYiLCJyZXNldFRpbWUiOjMxNjQwLjQ0NzYzNzAyNzU2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMjEiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhdmUiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE2NDAuNDQ3NjM3MDI3NTY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMjEiOiIiLCIyMiI6IiIsIjIzIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic29mdGNhcHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjU3NjguMzQzNzE0MzczMDUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjYuNjUyMjY1MDcxNjIyMjllNjIiLCJ0b3RhbCI6IjYuNjUyMjY1MDcxNjIyMjllNjIiLCJiZXN0IjoiNi42NTIyNjUwNzE2MjIyOWU2MiIsInJlc2V0VGltZSI6NDE3LjEzMzAwMDAwMDAwNDI0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJybyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjkiLCJ0b3RhbCI6IjI5IiwiYmVzdCI6IjI5IiwicmVzZXRUaW1lIjozMjIuMDQ4MDAwMDAwMDAxNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjFdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMTciLCIxOCIsIjE5IiwiMjAiXSwibGFzdE1pbGVzdG9uZSI6IjIwIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTA1MjYwNDUwMy43MDE3NTA1IiwidG90YWwiOiIyMjA1NzI4NjUzLjcwMTc1MDgiLCJiZXN0IjoiMTM0MTI3NDUwMy43MDE3NTA1IiwicmVzZXRUaW1lIjoxNTkzOS42Mzc2NDEwNDY0NjUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzEyLDEzLDE0LDIyLDIzLDI0LDMyLDMzLDM0LDQzLDQyLDQ0LDExLDIxLDMxLDE1LDI1LDM1LDQ1LDQxLDUxXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiLCI3IiwiOCIsIjkiXSwibGFzdE1pbGVzdG9uZSI6IjkiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJjIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0MTg2MjAyMjIzLjQ4NDI2OSIsInRvdGFsIjoiODQwMTIwMjM5Mi40ODQyNjQiLCJiZXN0IjoiNDE4NjIwMjIyMy40ODQyNjkiLCJyZXNldFRpbWUiOjQxNy4xMzMwMDAwMDAwMDQyNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIxNCI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYXN0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxMDQzNjYwMDQ3MTQ5MTMyLjgiLCJ0b3RhbCI6IjExOTM2NjAxMjIxNDkzNTkuOCIsImJlc3QiOiIxMDQzNjYwMDQ3MTQ5MTMyLjgiLCJyZXNldFRpbWUiOjc4Ny4yNTEwMDAwMDAwMTE1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiXSwibGFzdE1pbGVzdG9uZSI6IjUiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjE0IjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMwNTYuNzU5OTk5OTk5OTg0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm1lZ2FpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMwNTYuNzU5OTk5OTk5OTg0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9tZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMDU2Ljc1OTk5OTk5OTk4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {
                return {
                    'background-color': "#FFFEA5",
                }
            },
        },
        31: {
            title: "Unlock The Sun",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMjM3NDI2NTc3Nywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjMiLCJ0aW1lUGxheWVkIjozMjUxOC45Mjc2MzcwMjE4NjUsImtlZXBHb2luZyI6dHJ1ZSwiaGFzTmFOIjpmYWxzZSwicG9pbnRzIjoiNC41MDgwNjI1NjA3NTAzNWU2MSIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sInJvIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJzIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwiYSI6eyJtYWluVGFicyI6IkFjaGlldmVtZW50cyJ9LCJhcyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImFzdCI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sImMiOnsibWFpblRhYnMiOiJDb21ldHMifSwiciI6eyJtYWluVGFicyI6Ik1haW4ifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9LCJzb2Z0Y2FwcyI6eyJtYWluVGFicyI6IkFzdHJvbmF1dHMifSwiaW5mIjp7Im1haW5UYWJzIjoiSW5maW5pdHkifSwibWVnYWluZiI6eyJtYWluVGFicyI6Ik1lZ2EgSW5maW5pdHkifSwib21lZ2FpbmYiOnsibWFpblRhYnMiOiJPbWVnYSBJbmZpbml0eSJ9LCJzdGFycyI6eyJtYWluVGFicyI6Ik1haW4ifSwic3VuIjp7Im1haW5UYWJzIjoiTWFpbiJ9fSwibGFzdFNhZmVUYWIiOiJzIiwiaW5mb2JveGVzIjp7InIiOnsibWFpbiI6ZmFsc2UsIm1haW4yIjpmYWxzZX0sInN0YXJzIjp7Im1haW4iOmZhbHNlfSwic3VuIjp7Im1haW4iOmZhbHNlfSwicm8iOnsibWFpbiI6ZmFsc2V9LCJhcyI6eyJtYWluIjpmYWxzZX0sInMiOnsibWFpbiI6ZmFsc2UsIm1haW4yIjpmYWxzZX0sImMiOnsibWFpbiI6ZmFsc2V9LCJhc3QiOnsibWFpbiI6ZmFsc2V9fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjUxOC45Mjc2MzcwMjE4NjUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMjUxOC45Mjc2MzcwMjE4NjUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNTE4LjkyNzYzNzAyMTg2NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNTE4LjkyNzYzNzAyMTg2NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyNTE4LjkyNzYzNzAyMTg2NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjIzNjAyMTM4NDkyNTkxOTRlNzMiLCJ0b3RhbCI6IjEuMjM2MDIxMzg0OTI1OTE5NGU3MyIsImJlc3QiOiIxLjIzNjAyMTM4NDkyNTkxOTRlNzMiLCJyZXNldFRpbWUiOjYuOTQ5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIzMSIsIjMyIiwiMzMiLCIzNCIsIjM1IiwiNDEiLCI0MiIsIjQzIiwiNDQiLCI0NSJdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIyIiwidG90YWwiOiIyMiIsImJlc3QiOiIyMiIsInJlc2V0VGltZSI6Ni45NDksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMjEiXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiLCI3IiwiOCIsIjkiLCIxMCIsIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjE3IiwiMTgiLCIxOSIsIjIwIl0sImxhc3RNaWxlc3RvbmUiOiIyMCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMwIiwidG90YWwiOiIzMCIsImJlc3QiOiIzMCIsInJlc2V0VGltZSI6MzI1MTguOTI3NjM3MDIxODY1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTYiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiLCI0MiIsIjQxIiwiMzYiLCI0MyIsIjQ0IiwiNDUiLCI0NiIsIjUxIiwiNTIiLCI1MyIsIjU1IiwiNTQiLCI1NiJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2EiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjciLCJ0b3RhbCI6IjciLCJiZXN0IjoiNyIsInJlc2V0VGltZSI6MzIwMjkuNDc1NjM3MDIzNDU3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjE2Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYXZlIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMyMDI5LjQ3NTYzNzAyMzQ1NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjIxIjoiIiwiMjIiOiIiLCIyMyI6IiIsIjMxIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic29mdGNhcHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjYxNTcuMzcxNzE0MzY4OTQzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjYzNjU0MTExMTg4MzY4MzVlMzYiLCJ0b3RhbCI6IjEuNjM2NTQxMTExODgzNjgzNWUzNiIsImJlc3QiOiIxLjYzNjU0MTExMTg4MzY4MzVlMzYiLCJyZXNldFRpbWUiOjEyLjAwNSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1Il0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCJdLCJsYXN0TWlsZXN0b25lIjoiNCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sIm1lZ2FpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NDUuNzg3OTk5OTk5OTMyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9tZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozNDQ1Ljc4Nzk5OTk5OTkzMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMTgwNzIyNTU5MDMuNzAxOCIsInRvdGFsIjoiMzE3MDA2OTE1MDAwIiwiYmVzdCI6IjMxODA3MjI1NTkwMy43MDE4IiwicmVzZXRUaW1lIjozODIuODc0MDAwMDAwMDEyMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMjIsMjMsMjQsMzIsMzMsMzQsNDMsNDIsNDQsMTEsMjEsMzEsMTUsMjUsMzUsNDUsNDEsNTFdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIl0sImxhc3RNaWxlc3RvbmUiOiIxMyIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEwMTk2MzAxMTAwLjI0OTg4NyIsInRvdGFsIjoiMTAxOTYzMDEyNjkuMjQ5ODg3IiwiYmVzdCI6IjEwMTk2MzAxMTAwLjI0OTg4NyIsInJlc2V0VGltZSI6MTIuMDA1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiXSwibGFzdE1pbGVzdG9uZSI6IjUiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MCwiMTMiOjAsIjE0IjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhc3QiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzgyLjg3NDAwMDAwMDAxMjMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjowLCIxMiI6MCwiMTMiOjAsIjE0IjowfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzdGFyZHVzdCI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjI0MDQwLjM4Nzk5OTk5NTc4MyIsInRvdGFsIjoiMjQxNjUxLjg4Nzk5OTk5MzU3IiwiYmVzdCI6IjE4ODcxMy43ODc5OTk5OTU3IiwicmVzZXRUaW1lIjozODkuMDI4MDAwMDAwMDEyMjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhcnMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEwIiwidG90YWwiOiIxMCIsImJlc3QiOiIxMCIsInJlc2V0VGltZSI6MzgyLjg3NDAwMDAwMDAxMjMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTAwIiwiMTIiOiI5NiJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInN1biI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozODkuMDI4MDAwMDAwMDEyMjQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM0NDUuNzg3OTk5OTk5OTMyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn19")
            },
            style() {
                return {
                    'background-color': "#FFB50B",
                }
            },
        },
        32: {
            title: "Unlock Planets",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMjc2NTA5NzUzOCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjMiLCJ0aW1lUGxheWVkIjo0MjA5Ny41NTQ2MzcwODUyMiwia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjIuNTA2Njc4MTkxNDk0MDc1N2UxMTUiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sInMiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYXMiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJhc3QiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJjIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwiciI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sInNhIjp7Im1haW5UYWJzIjoiU2VjcmV0IEFjaGlldmVtZW50cyJ9LCJzYXZlIjp7Im1haW5UYWJzIjoiU2F2ZWJhbmsifSwic29mdGNhcHMiOnsibWFpblRhYnMiOiJBc3Ryb25hdXRzIn0sImluZiI6eyJtYWluVGFicyI6IkluZmluaXR5In0sIm1lZ2FpbmYiOnsibWFpblRhYnMiOiJNZWdhIEluZmluaXR5In0sIm9tZWdhaW5mIjp7Im1haW5UYWJzIjoiT21lZ2EgSW5maW5pdHkifSwic3RhcnMiOnsibWFpblRhYnMiOiJUaGUgU3VuIn0sInN1biI6eyJtYWluVGFicyI6Ik1haW4ifSwicGxhbmV0cyI6eyJtYWluVGFicyI6Ik1haW4ifX0sImxhc3RTYWZlVGFiIjoiYXMiLCJpbmZvYm94ZXMiOnsiciI6eyJtYWluIjpmYWxzZSwibWFpbjIiOmZhbHNlfSwicm8iOnsibWFpbiI6ZmFsc2V9LCJhcyI6eyJtYWluIjpmYWxzZX0sInMiOnsibWFpbiI6ZmFsc2UsIm1haW4yIjpmYWxzZX0sImMiOnsibWFpbiI6ZmFsc2V9LCJhc3QiOnsibWFpbiI6ZmFsc2V9LCJzdGFycyI6eyJtYWluIjpmYWxzZX0sInN1biI6eyJtYWluIjpmYWxzZX0sInBsYW5ldHMiOnsibWFpbiI6ZmFsc2V9fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MjA5Ny41NTQ2MzcwODUyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQyMDk3LjU1NDYzNzA4NTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MjA5Ny41NTQ2MzcwODUyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQyMDk3LjU1NDYzNzA4NTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDIwOTcuNTU0NjM3MDg1MjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiciI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiOS4yMzY5MTM3ODk2NjI3NGUxMjEiLCJ0b3RhbCI6IjkuMjM2OTEzNzg5NjYyNzRlMTIxIiwiYmVzdCI6IjkuMjM2OTEzNzg5NjYyNzRlMTIxIiwicmVzZXRUaW1lIjoyNi45OTI5OTk5OTk5OTk5OSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1IiwiMzEiLCIzMiIsIjMzIiwiMzQiLCIzNSIsIjQxIiwiNDIiLCI0MyIsIjQ0IiwiNDUiXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMCIsInRvdGFsIjoiMzAiLCJiZXN0IjoiMzAiLCJyZXNldFRpbWUiOjI2Ljk5Mjk5OTk5OTk5OTk5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIl0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiLCI2IiwiNyIsIjgiLCI5IiwiMTAiLCIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIxNyIsIjE4IiwiMTkiLCIyMCJdLCJsYXN0TWlsZXN0b25lIjoiMjAiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzMiIsInRvdGFsIjoiMzIiLCJiZXN0IjoiMzIiLCJyZXNldFRpbWUiOjQyMDk3LjU1NDYzNzA4NTIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTYiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiLCI0MiIsIjQxIiwiMzYiLCI0MyIsIjQ0IiwiNDUiLCI0NiIsIjUxIiwiNTIiLCI1MyIsIjU1IiwiNTQiLCI1NiIsIjYxIiwiNjIiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI4IiwidG90YWwiOiI4IiwiYmVzdCI6IjgiLCJyZXNldFRpbWUiOjQxNjA4LjEwMjYzNzA4NjgyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjYiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhdmUiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDE2MDguMTAyNjM3MDg2ODIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIyMSI6IiIsIjIyIjoiIiwiMjMiOiIiLCIzMSI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNvZnRjYXBzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM1NzM1Ljk5ODcxNDM0MDI0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsb2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIiLCJ0b3RhbCI6IjIiLCJiZXN0IjoiMiIsInJlc2V0VGltZSI6OTk2Ny42NTUwMDAwMDE1MDksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuMTE4MTUxNzgzMjM5MzUwNGU2NiIsInRvdGFsIjoiMS4xMTgxNTE3ODMyMzkzNTA0ZTY2IiwiYmVzdCI6IjEuMTE4MTUxNzgzMjM5MzUwNGU2NiIsInJlc2V0VGltZSI6NTQuOTAxOTk5OTk5OTk5NTc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0Il0sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInN0YXJkdXN0Ijp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMTIxNTgxOS43MDQwMDAyMjM0IiwidG90YWwiOiIxNDM5MDQ3LjIwNDAwMDAxMzYiLCJiZXN0IjoiMTIxNTgxOS43MDQwMDAyMjM0IiwicmVzZXRUaW1lIjo5OTY3LjY1NTAwMDAwMTUwOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTAiLCJ0b3RhbCI6IjEwIiwiYmVzdCI6IjEwIiwicmVzZXRUaW1lIjoyMzUuODAyMDAwMDAwMDAyNzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTAwIiwiMTIiOiIxMDAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInN1biI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMi44OTA1NTA5NzExNzgxNjAzZTUzMjAwIiwidG90YWwiOiIyLjg5MDU1MDk3MTE3ODE2MDNlNTMyMDAiLCJiZXN0IjoiMi44OTA1NTA5NzExNzgxNjAzZTUzMjAwIiwicmVzZXRUaW1lIjo5OTY3LjY1NTAwMDAwMTUwOSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2NzkiLCIxMiI6IjEwMDAiLCIxMyI6IjI1MCIsIjIxIjoiMzI5In0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNSwzMSwzMiwzMywzNCwzNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiLCI2IiwiNyIsIjgiXSwibGFzdE1pbGVzdG9uZSI6IjgiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicGxhbmV0b2lkIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjk5NjcuNjU1MDAwMDAxNTA5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInBsYW5ldHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6OTk2Ny42NTUwMDAwMDE1MDksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEzMDI0LjQxNTAwMDAwODg2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm1lZ2FpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEzMDI0LjQxNTAwMDAwODg2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9tZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxMzAyNC40MTUwMDAwMDg4NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyMzY3MjI4MDk2ODEwMy43IiwidG90YWwiOiIyMzU4MDIwMDAwMDAwIiwiYmVzdCI6IjIzNjcyMjgwOTY4MTAzLjciLCJyZXNldFRpbWUiOjIzNS44MDIwMDAwMDAwMDI3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMjIsMjMsMjQsMzIsMzMsMzQsNDMsNDIsNDQsMTEsMjEsMzEsMTUsMjUsMzUsNDUsNDEsNTFdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIl0sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjQzOTA1NjU4MDgwNjIwLjMzIiwidG90YWwiOiI0MzkxMDM3MzA4MDc4OS4zMyIsImJlc3QiOiI0MzkwNTY1ODA4MDYyMC4zMyIsInJlc2V0VGltZSI6OTMuMjAyOTk5OTk5OTk5OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMTQiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImFzdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNS45NTgzNDMyMjMwNTE5OTJlMTciLCJ0b3RhbCI6IjUuOTU5ODQzMjIzODAyMDI0ZTE3IiwiYmVzdCI6IjUuOTU4MzQzMjIzMDUxOTkyZTE3IiwicmVzZXRUaW1lIjo1NC45MDE5OTk5OTk5OTk1NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMTQiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH19")
            },
            style() {
                return {
                    'background-color': "#5E37B0",
                }
            },
        },
        33: {
            title: "Unlock The Solar System",
            display: "Chapter 1: Space",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyMzA1Njg0MTQwOCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIwLjMiLCJ0aW1lUGxheWVkIjo0MjMyMS4zOTQ2MzcwODYxMywia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjEuNzMzNTYxOTI0NTQ5NjY1MmUxMzQiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJybyI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sInMiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYXMiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJhc3QiOnsibWFpblRhYnMiOiJBc3Rlcm9pZHMifSwiYyI6eyJtYWluVGFicyI6IkNvbWV0cyJ9LCJyIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9LCJzb2Z0Y2FwcyI6eyJtYWluVGFicyI6IkFzdHJvbmF1dHMifSwiaW5mIjp7Im1haW5UYWJzIjoiSW5maW5pdHkifSwibWVnYWluZiI6eyJtYWluVGFicyI6Ik1lZ2EgSW5maW5pdHkifSwib21lZ2FpbmYiOnsibWFpblRhYnMiOiJPbWVnYSBJbmZpbml0eSJ9LCJzdGFycyI6eyJtYWluVGFicyI6IlRoZSBTdW4ifSwic3VuIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJwbGFuZXRzIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJlYXJ0aCI6eyJtYWluVGFicyI6Ik1haW4ifX0sImxhc3RTYWZlVGFiIjoicGxhbmV0cyIsImluZm9ib3hlcyI6eyJyIjp7Im1haW4iOmZhbHNlLCJtYWluMiI6ZmFsc2V9LCJybyI6eyJtYWluIjpmYWxzZX0sImFzIjp7Im1haW4iOmZhbHNlfSwicyI6eyJtYWluIjpmYWxzZSwibWFpbjIiOmZhbHNlfSwiYyI6eyJtYWluIjpmYWxzZX0sImFzdCI6eyJtYWluIjpmYWxzZX0sInN0YXJzIjp7Im1haW4iOmZhbHNlfSwic3VuIjp7Im1haW4iOmZhbHNlfSwicGxhbmV0cyI6eyJtYWluIjpmYWxzZX0sImVhcnRoIjp7Im1haW4iOmZhbHNlfX0sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDIzMjEuMzk0NjM3MDg2MTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MjMyMS4zOTQ2MzcwODYxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDIzMjEuMzk0NjM3MDg2MTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0MjMyMS4zOTQ2MzcwODYxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQyMzIxLjM5NDYzNzA4NjEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImluZiI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTMyNDguMjU1MDAwMDA4OTA1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm1lZ2FpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjEzMjQ4LjI1NTAwMDAwODkwNSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvbWVnYWluZiI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTMyNDguMjU1MDAwMDA4OTA1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjcuOTI4NjY5NjQxNzcxMDY0ZTE0MCIsInRvdGFsIjoiNy45Mjg2Njk2NDE3NzEwNjRlMTQwIiwiYmVzdCI6IjcuOTI4NjY5NjQxNzcxMDY0ZTE0MCIsInJlc2V0VGltZSI6MTIyLjM2NDAwMDAwMDAwMDY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIzMSIsIjMyIiwiMzMiLCIzNCIsIjM1IiwiNDEiLCI0MiIsIjQzIiwiNDQiLCI0NSJdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicm8iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMzIiwidG90YWwiOiIzMyIsImJlc3QiOiIzMyIsInJlc2V0VGltZSI6MTIyLjM2NDAwMDAwMDAwMDY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIl0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiLCI2IiwiNyIsIjgiLCI5IiwiMTAiLCIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIxNyIsIjE4IiwiMTkiLCIyMCJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzNCIsInRvdGFsIjoiMzQiLCJiZXN0IjoiMzQiLCJyZXNldFRpbWUiOjQyMzIxLjM5NDYzNzA4NjEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTYiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiLCI0MiIsIjQxIiwiMzYiLCI0MyIsIjQ0IiwiNDUiLCI0NiIsIjUxIiwiNTIiLCI1MyIsIjU1IiwiNTQiLCI1NiIsIjYxIiwiNjIiLCI2NCIsIjYzIl0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiOCIsInRvdGFsIjoiOCIsImJlc3QiOiI4IiwicmVzZXRUaW1lIjo0MTgzMS45NDI2MzcwODc3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMjEiLCIyMiIsIjI2Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYXZlIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQxODMxLjk0MjYzNzA4NzczLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMjEiOiIiLCIyMiI6IiIsIjIzIjoiIiwiMzEiOiIiLCIzMiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNvZnRjYXBzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjM1OTU5LjgzODcxNDM0MTE1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsb2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIiLCJ0b3RhbCI6IjIiLCJiZXN0IjoiMiIsInJlc2V0VGltZSI6MTAxOTEuNDk1MDAwMDAxNTU0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0LjIwNDg4NzU4NTc1MDYzNmU3NyIsInRvdGFsIjoiNC4yMDQ4ODc1ODU3NTA2MzZlNzciLCJiZXN0IjoiNC4yMDQ4ODc1ODU3NTA2MzZlNzciLCJyZXNldFRpbWUiOjEyMi4zNjQwMDAwMDAwMDA2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1Il0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyNTkxMDY4MDk2ODEwMy43IiwidG90YWwiOiIxNTE1NjkwMDAwMDAwIiwiYmVzdCI6IjI1OTEwNjgwOTY4MTAzLjciLCJyZXNldFRpbWUiOjE1MS41NjkwMDAwMDAwMDA1MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMjIsMjMsMjQsMzIsMzMsMzQsNDMsNDIsNDQsMTEsMjEsMzEsMTUsMjUsMzUsNDUsNDEsNTFdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIl0sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEzMzY1NDgzNjM1ODg2MTIiLCJ0b3RhbCI6IjEzMzY1NTMwNzg1ODg3ODEiLCJiZXN0IjoiMTMzNjU0ODM2MzU4ODYxMiIsInJlc2V0VGltZSI6MTUxLjU2OTAwMDAwMDAwMDUzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMTQiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImFzdCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMi44ODA3NDc3MzA4NDMxMzZlMjQiLCJ0b3RhbCI6IjIuODgwNzQ3NzMwOTkzMDM4ZTI0IiwiYmVzdCI6IjIuODgwNzQ3NzMwODQzMTM2ZTI0IiwicmVzZXRUaW1lIjoxMjIuMzY0MDAwMDAwMDAwNjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMjEiLCIyMiIsIjIzIiwiMjQiLCIyNSJdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIxNCI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwic3RhcmR1c3QiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIxMzIyODE1LjIyNDAwMDE1NSIsInRvdGFsIjoiMTU0NjA0Mi43MjM5OTk5NDUyIiwiYmVzdCI6IjEzMjI4MTUuMjI0MDAwMTU1IiwicmVzZXRUaW1lIjoxMDE5MS40OTUwMDAwMDE1NTQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhcnMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEwIiwidG90YWwiOiIxMCIsImJlc3QiOiIxMCIsInJlc2V0VGltZSI6NDU5LjY0MjAwMDAwMDAwNTQ1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjEwMCIsIjEyIjoiMTAwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiXSwibGFzdE1pbGVzdG9uZSI6IjUiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJwbGFuZXRvaWQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6Ijc4NTkwNC4yNTE5OTk5OTU0IiwidG90YWwiOiIxMDAyMTUyLjI1MTk5OTk5NTYiLCJiZXN0IjoiOTk2MDA3LjI0Nzk5OTk5OTgiLCJyZXNldFRpbWUiOjEwMTkxLjQ5NTAwMDAwMTU1NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJwbGFuZXRzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxMCIsInRvdGFsIjoiMTAiLCJiZXN0IjoiMTAiLCJyZXNldFRpbWUiOjE1MS41NjkwMDAwMDAwMDA1MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMDAiLCIxMiI6IjEwMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdW4iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMuMjA3ODkxOTY4MzE4OTU1N2U1MzIxMyIsInRvdGFsIjoiMy4yMDc4OTE5NjgzMTg5NTU3ZTUzMjEzIiwiYmVzdCI6IjMuMjA3ODkxOTY4MzE4OTU1N2U1MzIxMyIsInJlc2V0VGltZSI6MTAxOTEuNDk1MDAwMDAxNTU0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjY3OSIsIjEyIjoiMTAwMCIsIjEzIjoiMjUwIiwiMjEiOiIzMjkifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyLDMzLDM0LDM1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiLCI3IiwiOCJdLCJsYXN0TWlsZXN0b25lIjoiOCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJlYXJ0aCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMjMuODQwMDAwMDAwMDAyMDgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWVyY3VyeSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMjMuODQwMDAwMDAwMDAyMDgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMjMuODQwMDAwMDAwMDAyMDgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidmVudXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjIzLjg0MDAwMDAwMDAwMjA4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm5lcHR1bmUiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjIzLjg0MDAwMDAwMDAwMjA4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInVyYW51cyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMjMuODQwMDAwMDAwMDAyMDgsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F0dXJuIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIyMy44NDAwMDAwMDAwMDIwOCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJqdXBpdGVyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIyMy44NDAwMDAwMDAwMDIwOCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==")
            },
            style() {
                return {
                    'background-color': "#4F0778",
                }
            },
        },
        41: {
            title: "Unlock X",
            display: "Chapter 2: Outer Space<br>",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyODUyOTIwNzg3NCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIxLjAuMiIsInRpbWVQbGF5ZWQiOjMxNDc0LjI5ODk5OTg4NTU5Niwia2VlcEdvaW5nIjpmYWxzZSwiaGFzTmFOIjp0cnVlLCJwb2ludHMiOiIxLjMxNzE2MTUyODY3MDMxNjllMzUiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJyIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwicyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYXMiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJjIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwicm8iOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJhc3QiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJzdGFycyI6eyJtYWluVGFicyI6Ik1haW4ifSwicGxhbmV0cyI6eyJtYWluVGFicyI6IkJ1eWFibGVzIn0sInN1biI6eyJtYWluVGFicyI6Ik1haW4ifSwibWVyY3VyeSI6eyJtYWluVGFicyI6IkJ1eWFibGVzIn0sIm1hcnMiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sInZlbnVzIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJlYXJ0aCI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwibmVwdHVuZSI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwidXJhbnVzIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJzYXR1cm4iOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sIngiOnsibWFpblRhYnMiOiJNYWluIn0sImEiOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwic2EiOnsibWFpblRhYnMiOiJTZWNyZXQgQWNoaWV2ZW1lbnRzIn0sInNhdmUiOnsibWFpblRhYnMiOiJTYXZlYmFuayJ9LCJzb2Z0Y2FwcyI6eyJtYWluVGFicyI6IlJvY2tldCBGdWVsIn0sImJsb2IiOnsibWFpblRhYnMiOiJibG9iIDEifSwiaW5mIjp7Im1haW5UYWJzIjoiSW5maW5pdHkifSwib21lZ2FpbmYiOnsibWFpblRhYnMiOiJPbWVnYSBJbmZpbml0eSJ9LCJtZWdhaW5mIjp7Im1haW5UYWJzIjoiTWVnYSBJbmZpbml0eSJ9fSwibGFzdFNhZmVUYWIiOiJwbGFuZXRzIiwiaW5mb2JveGVzIjp7InIiOnsibWFpbiI6dHJ1ZSwibWFpbjIiOnRydWV9LCJzIjp7Im1haW4iOnRydWUsIm1haW4yIjp0cnVlfSwiYXMiOnsibWFpbiI6ZmFsc2V9LCJjIjp7Im1haW4iOnRydWV9LCJybyI6eyJtYWluIjp0cnVlfSwiYXN0Ijp7Im1haW4iOnRydWV9LCJzdGFycyI6eyJtYWluIjp0cnVlfSwicGxhbmV0cyI6eyJtYWluIjpmYWxzZX0sInN1biI6eyJtYWluIjpmYWxzZX0sIm1lcmN1cnkiOnsibWFpbiI6ZmFsc2V9LCJ4Ijp7Im1haW4iOnRydWUsInJlc3BlYyI6ZmFsc2V9LCJzYSI6eyJtYWluIjpmYWxzZX0sImluZiI6eyJtYWluIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMuNjEwMTc5ODIwNjM2NDQyNGUzMyIsInRvdGFsIjoiMy42MTAxNzk4MjA2MzY0NDI0ZTMzIiwiYmVzdCI6IjMuNjEwMTc5ODIwNjM2NDQyNGUzMyIsInJlc2V0VGltZSI6MjQwLjgwMjk5OTk5OTk5NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1IiwiMjEiLCIyMiIsIjIzIiwiMjQiLCIyNSJdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNzE4MjgzNzkxMTgzMDguNzgiLCJ0b3RhbCI6IjI0MDgwMzAwMDAwMDAiLCJiZXN0IjoiNzE4MjgzNzkxMTgzMDguNzgiLCJyZXNldFRpbWUiOjI0MC44MDI5OTk5OTk5OTc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMiwxMywxNCwyMywyMiwyNCwzMiwzMywzNCw0Myw0NCw0MiwxNSwyNSwzNSwxMSwyMSwzMSw0MSw0NSw1MV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiLCI2IiwiNyIsIjgiLCI5IiwiMTAiLCIxMSIsIjEyIiwiMTMiXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MH0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuMjY4NTg4NzAxMjYzMjM0NGUxOCIsInRvdGFsIjoiMi4yNjg1ODg4MDEzNzEzMjZlMTgiLCJiZXN0IjoiMi4yNjg1ODg3MDEyNjMyMzQ0ZTE4IiwicmVzZXRUaW1lIjoyNDAuODAyOTk5OTk5OTk3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1Il0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIl0sImxhc3RNaWxlc3RvbmUiOiIzIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyNDAuODAyOTk5OTk5OTk3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MSwiMTQiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI0MC44MDI5OTk5OTk5OTc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYXN0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjI0MC44MDI5OTk5OTk5OTc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjEzIjoxLCIxNCI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwic3RhcmR1c3QiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiI3NjI2NzYwLjc5NjAwNDAxNyIsInRvdGFsIjoiNzg0OTk4OC4yOTYwMDM3ODQiLCJiZXN0IjoiNzYyNjc2MC43OTYwMDQwMTciLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTUiLCJ0b3RhbCI6IjE1IiwiYmVzdCI6IjE1IiwicmVzZXRUaW1lIjozMjkxLjk0NjAwMDAwMDA4NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMDAiLCIxMiI6IjEwMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1Il0sImxhc3RNaWxlc3RvbmUiOiI1IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwicGxhbmV0b2lkIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyNjUuNTI5MDAwMDIyMTQ3NjciLCJ0b3RhbCI6IjE3NDEyNC4zNjkwMDAwMTkwNyIsImJlc3QiOiIxMDk0NjkuMjczMDAwMDIyMTMiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJwbGFuZXRzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxMCIsInRvdGFsIjoiMTAiLCJiZXN0IjoiMTAiLCJyZXNldFRpbWUiOjI0MC44MDI5OTk5OTk5OTc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6Ijc4IiwiMTIiOiI3NyJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInN1biI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNS4wOTU4MDA4NjU5MDA4MDhlNTMzNDMiLCJ0b3RhbCI6IjUuMDk1ODAwODY1OTAwODA4ZTUzMzQzIiwiYmVzdCI6IjUuMDk1ODAwODY1OTAwODA4ZTUzMzQzIiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiNjgwIiwiMTIiOiIxMDAwIiwiMTMiOiIyNTAiLCIyMSI6IjMzMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjUsMzEsMzIsMzMsMzQsMzVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4Il0sImxhc3RNaWxlc3RvbmUiOiI4IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm1lcmN1cnkiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjUuODgxOTY1OTQ0NDI1NzM4ZTQ0MSIsInRvdGFsIjoiNS44ODE5NjU5NDQ0MjU3MzhlNDQxIiwiYmVzdCI6IjUuODgxOTY1OTQ0NDI1NzM4ZTQ0MSIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjQwIiwiMTIiOiIxNSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiXSwibGFzdE1pbGVzdG9uZSI6IjMiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMS43OTMyNjUzNzg3ODI3NTA4ZTE3IiwidG90YWwiOiIxLjc5MzI2NTM4ODkzMTk2NWUxNyIsImJlc3QiOiIxLjc5MzI2NTM3ODc4Mjc1MDhlMTciLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ2ZW51cyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMTQ1NjE5NTg0NDQ1NjI3MC41IiwidG90YWwiOiIxNDU2MTk1OTIwNjMyMzIzLjIiLCJiZXN0IjoiMTQ1NjE5NTg0NDQ1NjI3MC41IiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0Il0sImxhc3RNaWxlc3RvbmUiOiI0IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImVhcnRoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjk2MDg1NTI0MDQwNDYyMTNlMTM2IiwidG90YWwiOiIxLjk2MDg1NTI0MDQwNDYyMTNlMTM2IiwiYmVzdCI6IjEuOTYwODU1MjQwNDA0NjIxM2UxMzYiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjJdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2Il0sImxhc3RNaWxlc3RvbmUiOiIxNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXB0dW5lIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjk1OTUzNzk0NTYxMzUwMmU1NiIsInRvdGFsIjoiMS45NTk1Mzc5NDU2MjM1MzY3ZTU2IiwiYmVzdCI6IjEuOTU5NTM3OTQ1NjEzNTAyZTU2IiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTAwIiwiMTIiOiI3NSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiXSwibGFzdE1pbGVzdG9uZSI6IjQiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidXJhbnVzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI3LjcxMzI5OTQyNTc3MTUxNGUyMzEiLCJ0b3RhbCI6IjcuNzQ3NjU2NDQwMzQwMDQyZTIzMSIsImJlc3QiOiI3LjcxMzI5OTQyNTc3MTUxNGUyMzEiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNTAiLCIxMiI6IjEyIiwiMTMiOiIyNTAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiXSwibGFzdE1pbGVzdG9uZSI6IjYiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F0dXJuIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0LjE5NzEzODU0NTM0ODIzMmUyMDEiLCJ0b3RhbCI6IjQuMTk3MTM4NTQ1MzQ4MjMyZTIwMSIsImJlc3QiOiI0LjE5NzEzODU0NTM0ODIzMmUyMDEiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNTAiLCIxMiI6IjIwIiwiMTMiOiI1MCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJqdXBpdGVyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxODMiLCJ0b3RhbCI6IjE4MyIsImJlc3QiOiIxODMiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIl0sImxhc3RNaWxlc3RvbmUiOiIxIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInhwbyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInhnZSI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInhsYSI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIngiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIwIiwiMTIiOiIwIiwiMTMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjM4IiwidG90YWwiOiIzOCIsImJlc3QiOiIzOCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjYiLCIzMSIsIjI1IiwiMzMiLCIzNCIsIjM1IiwiNDEiLCIzMiIsIjQyIiwiNDMiLCIzNiIsIjQ0IiwiNDUiLCI0NiIsIjUxIiwiNTIiLCI1MyIsIjU0IiwiNTUiLCI1NiIsIjYxIiwiNjIiLCI2MyIsIjY0IiwiNjUiLCI2NiIsIjcxIiwiNzIiXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI3IiwidG90YWwiOiI3IiwiYmVzdCI6IjciLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjI2IiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F2ZSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIiwiMTMiOiIiLCIyMSI6IiIsIjIyIjoiIiwiMjMiOiIiLCIzMSI6IiIsIjMyIjoiIiwiMzMiOiIiLCI0MSI6IiIsIjQyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic29mdGNhcHMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsb2IiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjI0NTQ4IiwidG90YWwiOiIyNDU0OCIsImJlc3QiOiIyNDU0OCIsInJlc2V0VGltZSI6MzE0NzQuMjk4OTk5ODg1NTk2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib21lZ2FpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjMxNDc0LjI5ODk5OTg4NTU5NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJtZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjozMTQ3NC4yOTg5OTk4ODU1OTYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0")
            },
            style() {
                return {
                    'background-color': "#49002F",
                }
            },
        },
        42: {
            title: "Infinity",
            display: "Chapter 2: Outer Space<br>",
            canClick: true,
            onClick() {
                if (!confirm("WARNING: Your save file will be fully changed. Are you sure?")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcyODU4NTUzNTMxMywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJnYWxhY3RpY3RyZWUxMSIsInZlcnNpb24iOiIxLjAuMiIsInRpbWVQbGF5ZWQiOjU2NTIwLjQ4Mjk5OTkzNjcsImtlZXBHb2luZyI6dHJ1ZSwiaGFzTmFOIjp0cnVlLCJwb2ludHMiOiI1LjU1NDMxNDE5MzY5MjU2OGUzNjciLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJyIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwicyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiYXMiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJjIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifSwicm8iOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sImFzdCI6eyJtYWluVGFicyI6IlVwZ3JhZGVzIn0sInN0YXJzIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJwbGFuZXRzIjp7Im1haW5UYWJzIjoiTWFpbiJ9LCJzdW4iOnsibWFpblRhYnMiOiJNYWluIn0sIm1lcmN1cnkiOnsibWFpblRhYnMiOiJCdXlhYmxlcyJ9LCJtYXJzIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJ2ZW51cyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwiZWFydGgiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sIm5lcHR1bmUiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn0sInVyYW51cyI6eyJtYWluVGFicyI6Ik1pbGVzdG9uZXMifSwic2F0dXJuIjp7Im1haW5UYWJzIjoiTWlsZXN0b25lcyJ9LCJ4Ijp7Im1haW5UYWJzIjoiTWFpbiJ9LCJhIjp7Im1haW5UYWJzIjoiQWNoaWV2ZW1lbnRzIn0sInNhIjp7Im1haW5UYWJzIjoiU2VjcmV0IEFjaGlldmVtZW50cyJ9LCJzYXZlIjp7Im1haW5UYWJzIjoiU2F2ZWJhbmsifSwic29mdGNhcHMiOnsibWFpblRhYnMiOiJSb2NrZXQgRnVlbCJ9LCJibG9iIjp7Im1haW5UYWJzIjoiYmxvYiAxIn0sImluZiI6eyJtYWluVGFicyI6IkluZmluaXR5In0sIm9tZWdhaW5mIjp7Im1haW5UYWJzIjoiT21lZ2EgSW5maW5pdHkifSwibWVnYWluZiI6eyJtYWluVGFicyI6Ik1lZ2EgSW5maW5pdHkifX0sImxhc3RTYWZlVGFiIjoieCIsImluZm9ib3hlcyI6eyJyIjp7Im1haW4iOnRydWUsIm1haW4yIjp0cnVlfSwicyI6eyJtYWluIjp0cnVlLCJtYWluMiI6dHJ1ZX0sImFzIjp7Im1haW4iOmZhbHNlfSwiYyI6eyJtYWluIjp0cnVlfSwicm8iOnsibWFpbiI6dHJ1ZX0sImFzdCI6eyJtYWluIjp0cnVlfSwic3RhcnMiOnsibWFpbiI6dHJ1ZX0sInBsYW5ldHMiOnsibWFpbiI6dHJ1ZX0sInN1biI6eyJtYWluIjpmYWxzZX0sIm1lcmN1cnkiOnsibWFpbiI6ZmFsc2V9LCJ4Ijp7Im1haW4iOnRydWUsInJlc3BlYyI6ZmFsc2V9LCJzYSI6eyJtYWluIjpmYWxzZX0sImluZiI6eyJtYWluIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImFzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjEzNjAzMDkzODMyMDc5MDNlMjEyIiwidG90YWwiOiIzLjEzNjAzMDkzODMyMDc5MDNlMjEyIiwiYmVzdCI6IjMuMTM2MDMwOTM4MzIwNzkwM2UyMTIiLCJyZXNldFRpbWUiOjIxOS40MDE5OTk5OTk5OTk3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbIjExIiwiMTIiLCIxMyIsIjE0IiwiMTUiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1Il0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI2LjMwMDQ3NTkxNjQ2MDkyMmUzNjQiLCJ0b3RhbCI6IjYuMzAwNDc1OTE2NDYwOTIyZTM2NCIsImJlc3QiOiI2LjMwMDQ3NTkxNjQ2MDkyMmUzNjQiLCJyZXNldFRpbWUiOjIxMy45NTM5OTk5OTk5OTk5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiLCIzMSIsIjMyIiwiMzMiLCIzNCIsIjM1IiwiNDEiLCI0MiIsIjQzIiwiNDQiLCI0NSIsIjUxIiwiNTIiLDUzLDQ0LCI1MyIsIjU0Iiw0NSwiNTUiXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjQuMTg4NTU1MjA2Njg4NDM3ZTIzIiwidG90YWwiOiI0LjE4ODU1NTIwNjY4ODY0M2UyMyIsImJlc3QiOiI0LjE4ODU1NTIwNjY4ODQzN2UyMyIsInJlc2V0VGltZSI6MjE5LjQwMTk5OTk5OTk5OTczLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjE0IjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJzdW4iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjYuNjQzMDQxNDExNDI4NTIxZTUzMzczIiwidG90YWwiOiI2LjY0MzA0MTQxMTQyODUyMWU1MzM3MyIsImJlc3QiOiI2LjY0MzA0MTQxMTQyODUyMWU1MzM3MyIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI2ODAiLCIxMiI6IjEwMDAiLCIxMyI6IjI1MCIsIjIxIjoiMzMwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNSwzMSwzMiwzMywzNCwzNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCIsIjUiLCI2IiwiNyIsIjgiXSwibGFzdE1pbGVzdG9uZSI6IjgiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWVyY3VyeSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNS44ODE5NjU5NDQ0MjU3MzhlNDQxIiwidG90YWwiOiI1Ljg4MTk2NTk0NDQyNTczOGU0NDEiLCJiZXN0IjoiNS44ODE5NjU5NDQ0MjU3MzhlNDQxIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjQwIiwiMTIiOiIxNSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiXSwibGFzdE1pbGVzdG9uZSI6IjMiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwibWFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMy41OTc1OTg2MzI2NTY4OGUxOCIsInRvdGFsIjoiMy41OTc1OTg2MzM2NzMwNjQzZTE4IiwiYmVzdCI6IjMuNTk3NTk4NjMyNjU2ODhlMTgiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSIsIjYiXSwibGFzdE1pbGVzdG9uZSI6IjYiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidmVudXMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMuMzUxNTMxMTM2NDM4MTg0ZTE2IiwidG90YWwiOiIzLjM1MTUzMTE0NDA1NzczOGUxNiIsImJlc3QiOiIzLjM1MTUzMTEzNjQzODE4NGUxNiIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIyMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiXSwibGFzdE1pbGVzdG9uZSI6IjQiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZWFydGgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjguNzg2ODM1NDUwNjM0ODQxZTE0MSIsInRvdGFsIjoiOC43ODY4MzU0NTA2MzQ4NDFlMTQxIiwiYmVzdCI6IjguNzg2ODM1NDUwNjM0ODQxZTE0MSIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjJdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2Il0sImxhc3RNaWxlc3RvbmUiOiIxNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJuZXB0dW5lIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI3LjQ4MjQzMTk0MjE4Mjk3OGU1NyIsInRvdGFsIjoiNy40ODI0MzE5NDIxODM3MTJlNTciLCJiZXN0IjoiNy40ODI0MzE5NDIxODI5NzhlNTciLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTAwIiwiMTIiOiI3NSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiXSwibGFzdE1pbGVzdG9uZSI6IjQiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidXJhbnVzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjcyMjg5MzM1NTg4OTY2N2UyMzMiLCJ0b3RhbCI6IjMuNzIzMjM2OTI2MDc1MjgyN2UyMzMiLCJiZXN0IjoiMy43MjI4OTMzNTU4ODk2NjdlMjMzIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjE1MCIsIjEyIjoiMTIiLCIxMyI6IjI1MCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYXR1cm4iOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjQuMDgzNTIyMDE0NTkyODg0NmUyMDMiLCJ0b3RhbCI6IjQuMDgzNTIyMDE0NTkyODg0NmUyMDMiLCJiZXN0IjoiNC4wODM1MjIwMTQ1OTI4ODQ2ZTIwMyIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxNTAiLCIxMiI6IjIwIiwiMTMiOiI1MCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJqdXBpdGVyIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxODMiLCJ0b3RhbCI6IjE4MyIsImJlc3QiOiIxODMiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOlsiMSJdLCJsYXN0TWlsZXN0b25lIjoiMSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhc3QiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuMTg1NDMwNzQxNzI0MjgyNGU3NiIsInRvdGFsIjoiMS4xODU0MzA3NDE3MjQyODI0ZTc2IiwiYmVzdCI6IjEuMTg1NDMwNzQxNzI0MjgyNGU3NiIsInJlc2V0VGltZSI6MjE5LjQwMTk5OTk5OTk5OTczLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiXSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjE0IjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJtZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9tZWdhaW5mIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInhwbyI6eyJ1bmxvY2tlZCI6ZmFsc2UsInBvaW50cyI6IjIzOTAyLjQzMjk5OTk0NDk3MyIsInRvdGFsIjoiMjQ4NTIuNDMyOTk5OTQ0OTczIiwiYmVzdCI6IjIzOTAyLjQzMjk5OTk0NDk3MyIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ4Z2UiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIxNTU2LjI3ODAwMDAwMDA5NzMiLCJ0b3RhbCI6IjI2NDMuMjc3OTk5OTk5NzAyNCIsImJlc3QiOiIxNTU2LjI3ODAwMDAwMDA5NzMiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwieGxhIjp7InVubG9ja2VkIjpmYWxzZSwicG9pbnRzIjoiMjQuMjU2MDAwMDAwMDA2NDAyIiwidG90YWwiOiIxMTUxLjI1NjAwMDAwMDExNiIsImJlc3QiOiIzMzQuMDAyMDAwMDAwMDA0NiIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ4Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzIiwidG90YWwiOiIzIiwiYmVzdCI6IjMiLCJyZXNldFRpbWUiOjExNzYuNjE1MDAwMDAwMTE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxIiwiMTIiOiIxIiwiMTMiOiIxIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyMywyNCwyNSwzMSwzMiwzMywzNCwzNV0sIm1pbGVzdG9uZXMiOlsiMSIsIjIiLCIzIiwiNCJdLCJsYXN0TWlsZXN0b25lIjoiNCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJpbmYiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwicGxhbmV0b2lkIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1NjQyNjYzLjYzMjAwMDIzOCIsInRvdGFsIjoiNTg1ODkxMS42MzIwMDAyNDkiLCJiZXN0IjoiNTY0MjY2My42MzIwMDAyMzgiLCJyZXNldFRpbWUiOjExNzYuNjE1MDAwMDAwMTE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJwbGFuZXRzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1NyIsInRvdGFsIjoiNTciLCJiZXN0IjoiNTciLCJyZXNldFRpbWUiOjI1NC4xMDA5OTk5OTk5OTg0NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMDAiLCIxMiI6IjEwMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiJdLCJsYXN0TWlsZXN0b25lIjoiNiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NTY1MjAuNDgyOTk5OTM2NywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic3RhcmR1c3QiOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiI0ODI3ODkxMTEuODU1MDAwNDQiLCJ0b3RhbCI6IjQ4MzAxMjMzOS4zNTUwMDA0NCIsImJlc3QiOiI0ODI3ODkxMTEuODU1MDAwNDQiLCJyZXNldFRpbWUiOjExNzYuNjE1MDAwMDAwMTE2MiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGFycyI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMzAiLCJ0b3RhbCI6IjMwIiwiYmVzdCI6IjMwIiwicmVzZXRUaW1lIjoyMTkuNDAxOTk5OTk5OTk5NzMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTAwIiwiMTIiOiIxMDAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6WyIxIiwiMiIsIjMiLCI0IiwiNSJdLCJsYXN0TWlsZXN0b25lIjoiNSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjF9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjguNDk5MDczNzk4OTExMTE0ZTE2IiwidG90YWwiOiIxLjA5NzAxMDAwMDAwMDAzMTZlMTYiLCJiZXN0IjoiOC40OTkwNzM3OTg5MTExMTRlMTYiLCJyZXNldFRpbWUiOjIxOS40MDE5OTk5OTk5OTk3MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTIsMTMsMTQsMjMsMjIsMjQsMzIsMzMsMzQsNDMsNDQsNDIsMTUsMjUsMzUsMTEsMjEsMzEsNDEsNDUsNTFdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2Il0sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjB9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInJvIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1MCIsInRvdGFsIjoiNTAiLCJiZXN0IjoiNTAiLCJyZXNldFRpbWUiOjIxMy45NTM5OTk5OTk5OTk5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwyMiwiMjIiLCIyMyJdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMTciLCIxOCIsIjE5IiwiMjAiLCIyMSJdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI0MiIsInRvdGFsIjoiNDIiLCJiZXN0IjoiNDIiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMjEiLCIyMiIsIjIzIiwiMjQiLCIyNiIsIjMxIiwiMjUiLCIzMyIsIjM0IiwiMzUiLCI0MSIsIjMyIiwiNDIiLCI0MyIsIjM2IiwiNDQiLCI0NSIsIjQ2IiwiNTEiLCI1MiIsIjUzIiwiNTQiLCI1NSIsIjU2IiwiNjEiLCI2MiIsIjYzIiwiNjQiLCI2NSIsIjY2IiwiNzEiLCI3MiIsIjc0IiwiNzMiLCI3NSIsIjc2Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiOSIsInRvdGFsIjoiOSIsImJlc3QiOiI5IiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMjYiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMjEiLCIyMiJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F2ZSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMjEiOiIiLCIyMiI6IiIsIjIzIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjMzIjoiIiwiNDEiOiIiLCI0MiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNvZnRjYXBzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjU2NTIwLjQ4Mjk5OTkzNjcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxvYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMjUwNjciLCJ0b3RhbCI6IjI1MDY3IiwiYmVzdCI6IjI1MDY3IiwicmVzZXRUaW1lIjo1NjUyMC40ODI5OTk5MzY3LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbIjExIiwiMTIiLCIxMyJdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifX0")
            },
            style() {
                return {
                    'background-color': "#23a6d5",
                }
            },
        },
    },
},)

addLayer("softcaps", {
    resource: "softcaps",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#052880",
    symbol: "⬇️",
    row: "side",
    position: "4",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Softcaps")
    },
    tabFormat: {
        "Softcaps?": {
            content: [
                ["display-text",
                    "Softcaps are nerfs that are required for balancing the game",
                    { "color": "white", "font-size": "20px", }],
                ["display-text",
                    "You will unlock softcaps at some features",
                    { "color": "white", "font-size": "20px", }],
            ],
        },
        "Rocket Fuel": {
            content: [
                ["display-text",
                    "Softcap at 1e60 Rocket Fuel (^0.88)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
            ]
        },
        "Astronauts": {
            content: [
                ["display-text",
                    "Softcap at 10,000 Astronauts (^0.88)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e10 Astronauts (^0.82)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e12 Astronauts (^0.7)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e15 Astronauts (^0.65)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e20 Astronauts (^0.1)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e30 Astronauts (^0.0001)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e35 Astronauts (^0.01)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
            ],
            unlocked() { return player.as.points.gte(1) || player.as.unlocked }
        },
        "Comets": {
            content: [
                ["display-text",
                    "Softcap at 100,000 Comets (^0.92)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1,000,000 Comets (^0.7)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e10 Comets (^0.75)",
                    { "color": "white", "font-size": "16px", }],
                "blank",

            ],
            unlocked() { return player.c.points.gte(1) || player.c.unlocked }
        },
        "Asteroids": {
            content: [
                ["display-text",
                    "Softcap at 100,000 Asteroids (^0.92)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 5,000,000 Asteroids (^0.5)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e9 Asteroids (^0.9)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e20 Asteroids (^0.5)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e30 Asteroids (^0.5)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
                ["display-text",
                    "Softcap at 1e40 Asteroids (^0.4)",
                    { "color": "white", "font-size": "16px", }],
                "blank",
            ],
            unlocked() { return player.ast.points.gte(1) || player.ast.unlocked }
        },
        "X": {
            content: [
                ["display-text",
                    "Max 3 X [Might change next update]",
                    { "color": "white", "font-size": "16px", }],
                "blank",
            ],
            unlocked() { return player.x.points.gte(1) || player.x.unlocked }
        },
    }
},)


addLayer("blob", {
    resource: "blobs",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    nodeStyle() {
        return {
            "width": "0px",
            "height": "0px",
        }
    },
    color: "#24003F",
    symbol: "",
    row: "side",
    position: "5",
    layerShown() {
        let visible = true
        return visible
    },
    resetDescription: "blob ",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "Blobs", // Name of prestige currency
    baseResource: "blobbers", // Name of resource prestige is based on
    baseAmount() { return player.blob.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    resetsNothing: true,
    shouldNotify: false,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('blob', 11)) mult = mult.times(5)
        if (hasUpgrade('blob', 12)) mult = mult.times(5)
        if (hasUpgrade('blob', 13)) mult = mult.times(5)
        if (hasUpgrade('blob', 14)) mult = mult.times(5)
        if (hasUpgrade('blob', 15)) mult = mult.times(5)
        if (hasUpgrade('blob', 21)) mult = mult.times(5)
        if (hasUpgrade('blob', 22)) mult = mult.times(5)
        if (hasUpgrade('blob', 23)) mult = mult.times(5)
        if (hasUpgrade('blob', 24)) mult = mult.times(5)
        if (hasUpgrade('blob', 25)) mult = mult.times(5)
        return mult
    },
    tabFormat: {
        "blob 1": {
            content: [
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: Purple; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${(player.blob.points)}</span></h2> blobs`
                        return txt
                    }
                ],
                "blank",
                "prestige-button",
                "blank",
                "achievements",
            ]
        },
        "blob 2": {
            content: [
                ["display-text",
                    function () {
                        let txt = ""
                        txt = txt + `You have 
                        <h2><span style="color: Purple; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${(player.blob.points)}</span></h2> blobs`
                        return txt
                    }
                ],
                "blank",
                "prestige-button",
                "blank",
                "upgrades",
                ["display-text",
                    'more blob 2 maybe',
                    { "color": "green", "font-size": "13px", }],
                "blank",
            ],
            unlocked() { return (hasAchievement('blob', 15)) }
        },
    },
    achievements: {
        11: {
            name: "blobber",
            done() { return player.blob.points.gte(1) },
            tooltip: "1 blob",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        12: {
            name: "blobber noob",
            done() { return player.blob.points.gte(10) },
            tooltip: "10 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        13: {
            name: "blobber pro",
            done() { return player.blob.points.gte(100) },
            tooltip: "100 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        14: {
            name: "blobber king",
            done() { return player.blob.points.gte(1000) },
            tooltip: "1,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        15: {
            name: "blobber champion",
            done() { return player.blob.points.gte(10000) },
            tooltip: "10,000 blobs<br>Reward: Blob 2",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        16: {
            name: "blobber winner",
            done() { return player.blob.points.gte(100000) },
            tooltip: "100,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        21: {
            name: "blobber beast",
            done() { return player.blob.points.gte(1e6) },
            tooltip: "1,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        22: {
            name: "blobber emperor",
            done() { return player.blob.points.gte(1e7) },
            tooltip: "10,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        23: {
            name: "blobber god",
            done() { return player.blob.points.gte(1e8) },
            tooltip: "100,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        24: {
            name: "blobber creator",
            done() { return player.blob.points.gte(1e9) },
            tooltip: "1,000,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        25: {
            name: "blobber blobber",
            done() { return player.blob.points.gte(1e10) },
            tooltip: "10,000,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
        26: {
            name: "The Blobber",
            done() { return player.blob.points.gte(1e11) },
            tooltip: "100,000,000,000 blobs",
            goalTooltip: "amount of blobs", // Shows when achievement is not completed
        },
    },
    upgrades: {
        11: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e4),
        },
        12: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e4),
        },
        13: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e4),
        },
        14: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e4),
        },
        15: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e4),
        },
        21: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e6),
        },
        22: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e6),
        },
        23: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e6),
        },
        24: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e6),
        },
        25: {
            title: "blobber blob",
            description: "5x blob",
            cost: new Decimal(1e6),
        },
        31: {
            title: "infinity blob",
            description: "+1 Infinity",
            cost: new Decimal(1e10),
        },
    }
},)
