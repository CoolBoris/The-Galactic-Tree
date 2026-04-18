addLayer("negativeinf", {
	name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "-♾️", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) {
			layerDataReset("negativeinf", keep);
		}
	},
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},
	layerShown() {
		return false;
	},

	row: 3, // Row the layer is in on the tree (0 is the first row)
	color: "#18c381",
	requires: new Decimal("1eeee9999999"), // Can be a function that takes requirement increases into accoun
	baseResource: "Unstable Rocket Fuel", // Name of resource prestige is based on
	baseAmount() {
		return player.unstablefuel.points;
	}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.0000001, // Prestige currency exponent
	gainMult() {
		let mult = new Decimal(1);
		return mult;
	},
	gainExp() {
		// Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
});
