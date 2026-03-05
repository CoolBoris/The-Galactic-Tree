addLayer("real", {
	symbol() {
		if (options.emojisEnabled == true) symbol = "🌀";
		else symbol = "R";
		return symbol;
	},

	color: "#0d67a3",

	nodeStyle() {
		const style = {
			"border-radius": "100px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
			style["background"] = "radial-gradient(#0d67a3, #100da3)";
		}

		return style;
	},

	row: "side",
	position: "5",
	branches: [],

	layerShown() {
		let visible = false;
		if (hasMilestone("x", 5) || player.infinity.points.gte(1)) visible = true;
		return visible;
	},

	tooltip() {
		return "";
	},

	tabFormat: {
		Main: {
			content: [["infobox", "main"], "blank", "challenges"],
		},
	},

	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},

	infoboxes: {
		main: {
			title: "Realities",
			body() {
				return "Here you can hop to different realities, you unlock realities at some milestones. There are currently 2 Realities<br>You might need to reload after entering/leaving a reality.";
			},
		},
	},
	challenges: {
		11: {
			name: "Fracture",
			canComplete: function () {
				return player.sun.points.gte("1e5000000");
			},
			fullDisplay() {
				return "Reality cracks, Fractured.";
			},
			onEnter() {
				player.points = new Decimal(10);
			},
			onExit() {
				player.points = new Decimal(10);
			},
			resetsNothing: true,
			style() {
				return {
					width: "450px",
					height: "450px",
					color: "#7f05a8", // Bright pink for better pop
					"text-shadow": "0 0 15px #5c05a8, 0 0 30px #7f05a8, 0 0 45px #24115c", // Multilayer glow effect
					"font-size": "2.5em", // Slightly larger text
					"line-height": "1.2", // Better text spacing
					background: "#0F2027",
					border: "5px solid #194859", // Border to define the container
					"border-radius": "12px", // Rounded corners
					"box-shadow": "0px 20px 60px rgba(0, 0, 0, 0.7)", // Subtle shadow for depth
					"align-items": "center",
					"justify-content": "center",
					animation: "fracture 3s infinite alternate", // Adding border animation
				};
			},
		},
	},
});
