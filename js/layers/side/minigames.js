addLayer("minigames", {
	symbol() {
		if (options.emojisEnabled == true) symbol = "🎮";
		else symbol = "MG";
		return symbol;
	},

	color: "#464646",

	nodeStyle() {
		const style = {
			"border-radius": "100px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
		}

		return style;
	},

	row: "side",
	position: "3",
	branches: [],

	tooltip() {
		return "";
	},

	tabFormat: {
		"Space Fishing": {
			buttonStyle() {
				return { "border-color": "#9213dc" };
			},
			embedLayer: "fishing",
		},
	},

	startData() {
		return {
			unlocked: true,
			paused: false,
		};
	},
});
