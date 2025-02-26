addLayer("real", {
    name: "Realities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: "5", // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: "side",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    symbol(){
        if (options.emojisEnabled == true) symbol = "🌀"
        else symbol = "RE"
        return symbol
    },
    layerShown() {
        let visible = false
        if (hasMilestone('x', 5) || player.inf.points.gte(1)) visible = true
        return visible
    },
    glow: false,
    color: "#00ac03",
    resetDescription: "",
    requires: new Decimal(10000000), // Can be a function that takes requirement increases into account
    resource: "Realities", // Name of prestige currency
    baseResource: "X", // Name of resource prestige is based on
    baseAmount() { return player.x.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {return "Switch to a different reality"},
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "main"],
                "blank",
                "challenges",
            ],
        },
    },
    infoboxes: {
        main: {
            title: "Realities",
            body() {
                return "Here you can hop to different realities, you unlock realities at some milestones. There are currently 2 Realities"
            },
        },
    },
    challenges: {
        11: {
            name: "Fracture",
            canComplete: function () { return player.sun.points.gte("1e5000000") },
            challengeDescription: "Reality cracks, Fractured.<br>",
            goalDescription: "???",
            rewardDescription: "???",
            onEnter() { player.points = new Decimal(10) },
            onExit() { player.points = new Decimal(10) },
            resetsNothing: true,
            style() {
                return {
                    "width": "450px",
                    "height": "450px",
                    "color": "#7f05a8", // Bright pink for better pop
                    "text-shadow": "0 0 15px #5c05a8, 0 0 30px #7f05a8, 0 0 45px #24115c", // Multilayer glow effect
                    "font-size": "30px", // Slightly larger text
                    "line-height": "1.2", // Better text spacing
                    "background": "#0F2027",
                    "border": "5px solid #194859", // Border to define the container
                    "border-radius": "12px", // Rounded corners
                    "box-shadow": "0px 20px 60px rgba(0, 0, 0, 0.7)", // Subtle shadow for depth
                    "align-items": "center",
                    "justify-content": "center",
                    "animation": "borderAnimation 3s infinite alternate", // Adding border animation
                }
            }
        },
    },
})