addLayer("extra", {
	symbol() {
		if (options.emojisEnabled == true) symbol = "➕";
		else symbol = "E";
		return symbol;
	},

	color: "#25ff6a",

	nodeStyle() {
		const style = {
			"border-radius": "100px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
		}

		return style;
	},

	hotkeys: [
		{
			key: "1",
			description: "1: Pause/Unpause the game",
			onPress() {
				if (player.isPaused == false) {
					player.devSpeed = 0.000000000000000000000000000000000000000000000000000000001;
					player.isPaused = true;
				} else {
					player.devSpeed = 1;
					player.isPaused = false;
				}
			},
		},
		{
			key: "&",
			description: "",
			onPress() {
				if (player.isPaused == false) {
					player.devSpeed = 0.000000000000000000000000000000000000000000000000000000001;
					player.isPaused = true;
				} else {
					player.devSpeed = 1;
					player.isPaused = false;
				}
			},
		},
	],

	row: "side",
	position: "2",
	branches: [],

	tooltip() {
		return "";
	},

	update(diff) {
		if (Math.random() < 1 / 1000000) {
			doPopup(
				"none",
				"Reward: Secret Role<br>Click me to disappear!",
				"RNGesus! (1/1,000,000)",
				9999999,
				"lime"
			);
		}
	},

	tabFormat: {
		Extra: {
			content: ["clickables"],
		},
		Savebank: {
			buttonStyle() {
				return { "border-color": "#dc8c13" };
			},
			embedLayer: "save",
		},
	},

	startData() {
		return {
			unlocked: true,
			paused: false,
		};
	},

	clickables: {
		11: {
			title() {
				if (player.isPaused) return "Paused";
				else return "Running";
			},
			display() {
				if (player.isPaused) return "Resume the game";
				else return "Pause the game";
			},
			style() {
				return {
					"background-color": "#FF69B4",
					height: "200px",
					width: "200px",
					"font-size": "20px",
				};
			},
			canClick: () => true,
			onClick() {
				if (player.isPaused == false) {
					player.devSpeed = 0.000000000000000000000000000000000000000000000000000000000000000000000001;
					player.isPaused = true;
				} else {
					player.devSpeed = 1;
					player.isPaused = false;
				}
			},
		},
	},
});
