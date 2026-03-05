addLayer("megainf", {
	name: "Mega Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled == true) symbol = "♾️";
		else symbol = "MINF";
		return symbol;
	},

	layerShown() {
		let visible = false;
		return visible;
	},
	nodeStyle() {
		return {
			background: "radial-gradient( #53ff64, #05ff0e, #00afff, #0015ff)",
			width: "175px",
			height: "175px",
		};
	},

	doReset(reset) {
		let keep = [];
		keep.push("points");
		if (layers[reset].row > this.row) layerDataReset("megainf", keep);
	},
	componentStyles: {
		"prestige-button"() {
			return {
				background: "radial-gradient( #00afff, #05ff0e)",
				width: "200px",
				height: "200px",
			};
		},
	},

	branches: ["infinity"],
	row: 7, // Row the layer is in on the tree (0 is the first row)
	color: "#05ff0e",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "Mega Infinities", // Name of prestige currency
	baseResource: "Infinities", // Name of resource prestige is based on
	baseAmount() {
		return player.infinity.points;
	}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.00000000000001, // Prestige currency exponent
	gainMult() {
		let mult = new Decimal(1);

		return mult;
	},
	gainExp() {
		// Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
});

addLayer("inf", {
	name: "inf", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled == true) symbol = "♾️";
		else symbol = "inf";
		return symbol;
	},

	layerShown() {
		let visible = false;
		return visible;
	},
	nodeStyle() {
		return {
			background: "radial-gradient( #53ff64, #05ff0e, #00afff, #0015ff)",
			width: "175px",
			height: "175px",
		};
	},

	doReset(reset) {
		let keep = [];
		keep.push("points");
		if (layers[reset].row > this.row) layerDataReset("inf", keep);
	},
	componentStyles: {
		"prestige-button"() {
			return {
				background: "radial-gradient( #00afff, #05ff0e)",
				width: "200px",
				height: "200px",
			};
		},
	},

	branches: ["infinity"],
	row: 7, // Row the layer is in on the tree (0 is the first row)
	color: "#05ff0e",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "Mega Infinities", // Name of prestige currency
	baseResource: "Infinities", // Name of resource prestige is based on
	baseAmount() {
		return player.megainf.points;
	}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.00000000000001, // Prestige currency exponent
	gainMult() {
		let mult = new Decimal(1);

		return mult;
	},
	gainExp() {
		// Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
});

addLayer("omegainf", {
	name: "Omega Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled == true) symbol = "♾️";
		else symbol = "OINF";
		return symbol;
	},

	layerShown() {
		let visible = false;
		return visible;
	},
	nodeStyle() {
		return {
			background: "radial-gradient( #FF8000, #FF5100, #FF0093, #0015ff)",
			width: "175px",
			height: "175px",
		};
	},
	doReset(reset) {
		let keep = [];
		keep.push("points");
		if (layers[reset].row > this.row) layerDataReset("omegainf", keep);
	},
	componentStyles: {
		"prestige-button"() {
			return {
				background: "radial-gradient( #FF5100, #FF0093)",
				width: "200px",
				height: "200px",
			};
		},
	},

	branches: ["megainf"],
	row: 8, // Row the layer is in on the tree (0 is the first row)
	color: "#FF5100",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "Omega Infinities", // Name of prestige currency
	baseResource: "Mega Infinities", // Name of resource prestige is based on
	baseAmount() {
		return player.megainf.points;
	}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.00000000000001, // Prestige currency exponent
	gainMult() {
		let mult = new Decimal(1);

		return mult;
	},
	gainExp() {
		// Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
});
