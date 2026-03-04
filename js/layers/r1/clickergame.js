addLayer("sun", {
	position: 2,
	row: 10,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			background: "radial-gradient(#FF2A00, #FF9300, #FF6C00, #23d5ab)",
			width: "190px",
			height: "190px",
		};
	},
	symbol: "",
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	resource: "Light",
	requires: new Decimal(10),
	baseResource: "Stars",
	baseAmount() {
		return player.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#FF6C00",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("sun", 1)) mult = mult.times(buyableEffect("sun", 11));
		if (hasUpgrade("sun", 11)) mult = mult.times(2);
		if (hasUpgrade("sun", 12)) mult = mult.times(3);
		if (hasUpgrade("sun", 13)) mult = mult.times(4);
		if (hasUpgrade("sun", 14)) mult = mult.times(5);
		if (hasUpgrade("sun", 15)) mult = mult.times(6);
		if (hasUpgrade("sun", 21)) mult = mult.pow(1.05);
		if (hasUpgrade("sun", 22)) mult = mult.pow(1.1);
		if (hasUpgrade("sun", 23)) mult = mult.pow(1.2);
		if (hasUpgrade("sun", 24)) mult = mult.pow(1.5);
		if (hasUpgrade("sun", 25)) mult = mult.pow(2);
		if (hasMilestone("sun", 4)) mult = mult.times(buyableEffect("sun", 13));
		if (hasUpgrade("sun", 31)) mult = mult.times(upgradeEffect("sun", 31));
		if (hasUpgrade("sun", 32)) mult = mult.times(upgradeEffect("sun", 32));
		if (hasUpgrade("sun", 33)) mult = mult.times(upgradeEffect("sun", 33));
		if (hasUpgrade("sun", 34)) mult = mult.times(upgradeEffect("sun", 34));
		if (hasUpgrade("sun", 35)) mult = mult.times(upgradeEffect("sun", 35));
		if (hasMilestone("sun", 6)) mult = mult.times(buyableEffect("sun", 21));
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	automate() {
		if (hasMilestone("sun", 6)) {
			if (layers.sun.buyables[11].canAfford()) {
				layers.sun.buyables[11].buy();
			}
		}
	},

	passiveGeneration() {
		if (hasMilestone("sun", 1)) return getBuyableAmount("sun", 12) / 100;
		return 0;
	},

	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("sun", 1);
			},
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("sun", 2);
			},
		},
	},

	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Light"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},

	milestones: {
		1: {
			requirementDescription: "25 Light",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.sun.points.gte(25);
			},
		},
		2: {
			requirementDescription: "10,000 Light",
			effectDescription: "Unlock Upgrades",
			unlocked() {
				return hasMilestone("sun", 1);
			},
			done() {
				return player.sun.points.gte(10000);
			},
		},
		3: {
			requirementDescription: "5e10 Light",
			effectDescription: "Unlock a Buyable & Unlock 5 New Upgrades",
			unlocked() {
				return hasMilestone("sun", 2);
			},
			done() {
				return player.sun.points.gte(5e10);
			},
		},
		4: {
			requirementDescription: "1e150 Light",
			effectDescription: "Unlock a Buyable",
			unlocked() {
				return hasMilestone("sun", 3);
			},
			done() {
				return player.sun.points.gte(1e150);
			},
		},
		5: {
			requirementDescription: "1e235 Light",
			effectDescription: "Unlock 5 New Upgrades",
			unlocked() {
				return hasMilestone("sun", 4);
			},
			done() {
				return player.sun.points.gte(1e235);
			},
		},
		6: {
			requirementDescription: "1e2,500 Light",
			effectDescription: "Auto-buy Sunlight Buyable",
			unlocked() {
				return hasMilestone("sun", 5);
			},
			done() {
				return player.sun.points.gte("1e2500");
			},
		},
		7: {
			requirementDescription: "1e37,000 Light",
			effectDescription: "Unlock a Buyable",
			unlocked() {
				return hasMilestone("sun", 6);
			},
			done() {
				return player.sun.points.gte("1e37000");
			},
		},
		8: {
			requirementDescription: "1e100,000 Light",
			effectDescription: "Complete The Sun",
			unlocked() {
				return hasMilestone("sun", 7);
			},
			done() {
				return player.sun.points.gte("1e100000");
			},
		},
	},

	buyables: {
		11: {
			title: "Sunlight<br>",
			cost(x) {
				let base1 = new Decimal(1.4);
				let base2 = x;
				let expo = new Decimal(1.3);
				if (hasUpgrade("sun", 24)) expo = 1.35;
				if (hasUpgrade("sun", 25)) expo = 1.47;
				if (hasUpgrade("sun", 32)) expo = 1.49;
				if (hasUpgrade("sun", 33)) expo = 1.525;
				if (hasUpgrade("sun", 34)) expo = 1.582;
				if (hasUpgrade("sun", 35)) expo = 1.964;
				if (hasUpgrade("sun", 41)) expo = 2.78;
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1.3);
				let base2 = x;
				let expo = new Decimal(1.2);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Light" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/inf<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Light"
				);
			},
			canAfford() {
				return player.sun.points.gte(this.cost());
			},
			buy() {
				player.sun.points = player.sun.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "Lightwave Generator<br>",
			purchaseLimit: 1000,
			cost(x) {
				let base1 = new Decimal(1.22);
				let base2 = x;
				let expo = new Decimal(1.05);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Light" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/1000<br>" +
					"<br>Effect: " +
					getBuyableAmount("sun", 12) / 100 +
					" CPS"
				);
			},
			canAfford() {
				return player.sun.points.gte(this.cost());
			},
			buy() {
				player.sun.points = player.sun.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("sun", 3);
			},
		},
		13: {
			title: "Solar Core<br>",
			purchaseLimit: 250,
			cost(x) {
				let base1 = new Decimal(1e5);
				let base2 = x;
				let expo = new Decimal(1.04);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(2);
				let base2 = x;
				let expo = new Decimal(2);
				let eff = base1.pow(Decimal.times(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Light" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/250<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Light"
				);
			},
			canAfford() {
				return player.sun.points.gte(this.cost());
			},
			buy() {
				player.sun.points = player.sun.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("sun", 4);
			},
		},
		21: {
			title: "Sunlight+<br>",
			cost(x) {
				let base1 = new Decimal(1e10);
				let base2 = x;
				let expo = new Decimal(1.48);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(3);
				let base2 = x;
				let expo = new Decimal(1.27);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Light" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/inf<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Light"
				);
			},
			canAfford() {
				return player.sun.points.gte(this.cost());
			},
			buy() {
				player.sun.points = player.sun.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("sun", 7);
			},
		},
	},

	upgrades: {
		11: {
			title: "Double Light",
			description: "2x Light",
			cost: new Decimal(10000),
		},
		12: {
			title: "Triple Light",
			description: "3x Light",
			cost: new Decimal(100000),
			unlocked() {
				return hasUpgrade("sun", 11);
			},
		},
		13: {
			title: "Quadruple Light",
			description: "4x Light",
			cost: new Decimal(2.5e6),
			unlocked() {
				return hasUpgrade("sun", 12);
			},
		},
		14: {
			title: "Quintuple Light",
			description: "5x Light",
			cost: new Decimal(1e8),
			unlocked() {
				return hasUpgrade("sun", 13);
			},
		},
		15: {
			title: "Sextuple Light",
			description: "6x Light",
			cost: new Decimal(2.5e9),
			unlocked() {
				return hasUpgrade("sun", 14);
			},
		},
		21: {
			title: "Solar Flare",
			description: "^1.05 Light",
			cost: new Decimal(1e11),
			unlocked() {
				return hasUpgrade("sun", 15) && hasMilestone("sun", 3);
			},
		},
		22: {
			title: "Solar Flare+",
			description: "^1.1 Light",
			cost: new Decimal(5e11),
			unlocked() {
				return hasUpgrade("sun", 21) && hasMilestone("sun", 3);
			},
		},
		23: {
			title: "Solar Flare++",
			description: "^1.2 Light",
			cost: new Decimal(5e13),
			unlocked() {
				return hasUpgrade("sun", 22) && hasMilestone("sun", 3);
			},
		},
		24: {
			title: "Solar Flare+++",
			description: "^1.5 Light",
			cost: new Decimal(1e22),
			unlocked() {
				return hasUpgrade("sun", 23) && hasMilestone("sun", 3);
			},
		},
		25: {
			title: "Solar Flare Deluxe",
			description: "^2 Light",
			cost: new Decimal(1e52),
			unlocked() {
				return hasUpgrade("sun", 24) && hasMilestone("sun", 3);
			},
		},
		31: {
			title: "Solar Glare",
			description: "Light is increased based on Light",
			cost: new Decimal(1e235),
			unlocked() {
				return hasUpgrade("sun", 25) && hasMilestone("sun", 5);
			},
			effect() {
				return player.sun.points.add(1).pow(0.1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			}, // Add formatting to the effect
		},
		32: {
			title: "Solar Glare+",
			description: "Light is increased based on Light",
			cost: new Decimal("1e391"),
			unlocked() {
				return hasUpgrade("sun", 31) && hasMilestone("sun", 5);
			},
			effect() {
				return player.sun.points.add(1).pow(0.14);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			}, // Add formatting to the effect
		},
		33: {
			title: "Solar Glare++",
			description: "Light is increased based on Light",
			cost: new Decimal("1e623"),
			unlocked() {
				return hasUpgrade("sun", 32) && hasMilestone("sun", 5);
			},
			effect() {
				return player.sun.points.add(1).pow(0.17);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			}, // Add formatting to the effect
		},
		34: {
			title: "Solar Glare+++",
			description: "Light is increased based on Light",
			cost: new Decimal("1e1145"),
			unlocked() {
				return hasUpgrade("sun", 33) && hasMilestone("sun", 5);
			},
			effect() {
				return player.sun.points.add(1).pow(0.21);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			}, // Add formatting to the effect
		},
		35: {
			title: "Solar Glare Deluxe",
			description: "Light is increased based on Light",
			cost: new Decimal("1e2398"),
			unlocked() {
				return hasUpgrade("sun", 34) && hasMilestone("sun", 5);
			},
			effect() {
				return player.sun.points.add(1).pow(0.35);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			}, // Add formatting to the effect
		},
	},
});

addLayer("mercury", {
	position: 1,
	row: 9,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "50px",
			height: "50px",
		};
	},
	image: "https://i.ibb.co/GR49tbP/mercury.png",
	symbol: "",
	branches: ["sun"],
	resource: "Iron",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#8FB2BB",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("mercury", 1))
			mult = mult.times(buyableEffect("mercury", 11));
		if (hasMilestone("mercury", 2))
			mult = mult.times(buyableEffect("mercury", 12));
		if (hasMilestone("megainf", 5)) mult = mult.times(3);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("mercury", 1);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Iron"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "10 Iron",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.mercury.points.gte(10);
			},
		},
		2: {
			requirementDescription: "5e10 Iron",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.mercury.points.gte(5e10);
			},
			unlocked() {
				return hasMilestone("mercury", 1);
			},
		},
		3: {
			requirementDescription: "2e441 Iron",
			effectDescription: "Unlock Mars",
			done() {
				return player.mercury.points.gte("2e441");
			},
			unlocked() {
				return hasMilestone("mercury", 2);
			},
		},
	},
	buyables: {
		11: {
			title: "Iron Forge<br>",
			purchaseLimit: 40,
			cost(x) {
				let base1 = new Decimal(10);
				let base2 = x;
				let expo = new Decimal(1.52);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(4.5);
				let base2 = x;
				let expo = new Decimal(1.62);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Iron" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/40<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Iron"
				);
			},
			canAfford() {
				return player.mercury.points.gte(this.cost());
			},
			buy() {
				player.mercury.points = player.mercury.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "Iron Core<br>",
			purchaseLimit: 15,
			cost(x) {
				let base1 = new Decimal(1e6);
				let base2 = x;
				let expo = new Decimal(1.082);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(2.87);
				let base2 = x;
				let expo = new Decimal(2.21);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Iron" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/15<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Iron"
				);
			},
			canAfford() {
				return player.mercury.points.gte(this.cost());
			},
			unlocked() {
				return hasMilestone("mercury", 2);
			},
			buy() {
				player.mercury.points = player.mercury.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
	},
});

addLayer("mars", {
	position: 1,
	row: 10,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("mercury", 3) && inChallenge("planets", 11))
			visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "63px",
			height: "63px",
		};
	},
	passiveGeneration() {
		if (hasMilestone("mars", 4)) return 5;
		if (hasMilestone("mars", 2)) return 1;
		return 0;
	},
	image: "https://i.ibb.co/7yFgbW2/mars.png",
	branches: ["sun"],
	resource: "Silicon",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#E16236",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("mars", 1)) mult = mult.times(5);
		if (hasUpgrade("mars", 11)) mult = mult.times(5);
		if (hasUpgrade("mars", 12)) mult = mult.pow(1.5);
		if (hasUpgrade("mars", 13)) mult = mult.pow(2.25);
		if (hasUpgrade("mars", 14)) mult = mult.times(100);
		if (hasUpgrade("mars", 15)) mult = mult.pow(2);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("mars", 3);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" +
					formatWhole(getResetGain(this.layer, "normal")) +
					" " +
					"Silicon"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "25 Silicon",
			effectDescription: "5x Sillicon",
			done() {
				return player.mars.points.gte(25);
			},
		},
		2: {
			requirementDescription: "250 Silicon",
			effectDescription: "1 CPS",
			done() {
				return player.mars.points.gte(250);
			},
			unlocked() {
				return hasMilestone("mars", 1);
			},
		},
		3: {
			requirementDescription: "500 Silicon",
			effectDescription: "Unlock 3 Upgrades",
			done() {
				return player.mars.points.gte(500);
			},
			unlocked() {
				return hasMilestone("mars", 2);
			},
		},
		4: {
			requirementDescription: "2,500,000 Silicon",
			effectDescription: "5 CPS",
			done() {
				return player.mars.points.gte(2.5e6);
			},
			unlocked() {
				return hasMilestone("mars", 3);
			},
		},
		5: {
			requirementDescription: "10,000,000 Silicon",
			effectDescription: "Unlock 2 Upgrades",
			done() {
				return player.mars.points.gte(1e7);
			},
			unlocked() {
				return hasMilestone("mars", 4);
			},
		},
		6: {
			requirementDescription: "5e15 Silicon",
			effectDescription: "Unlock Venus",
			done() {
				return player.mars.points.gte(5e15);
			},
			unlocked() {
				return hasMilestone("mars", 5);
			},
		},
	},
	upgrades: {
		11: {
			title: "Silicon Mine",
			description: "5x Sillicon",
			cost: new Decimal(750),
			unlocked() {
				return hasMilestone("mars", 3);
			},
		},
		12: {
			title: "Silicon Factory",
			description: "^1.5 Sillicon",
			cost: new Decimal(3000),
			unlocked() {
				return hasUpgrade("mars", 11);
			},
		},
		13: {
			title: "Silicon Stabilizer",
			description: "^2.25 Sillicon",
			cost: new Decimal(15000),
			unlocked() {
				return hasUpgrade("mars", 12);
			},
		},
		14: {
			title: "Silicon Synthesizer",
			description: "100x Silicon",
			cost: new Decimal(1.25e7),
			unlocked() {
				return hasMilestone("mars", 5) && hasUpgrade("mars", 13);
			},
		},
		15: {
			title: "Silicon Accelerator",
			description: "^2 Silicon",
			cost: new Decimal(1e9),
			unlocked() {
				return hasUpgrade("mars", 14);
			},
		},
	},
});

addLayer("venus", {
	position: 1,
	row: 9,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("mars", 6) && inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "70px",
			height: "70px",
		};
	},
	image: "https://i.ibb.co/9rCqScD/venus.png",
	branches: ["sun"],
	resource: "Sulfur",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#DD9438",
	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("venus", 11)) mult = mult.times(2);
		if (hasUpgrade("venus", 12)) mult = mult.times(20);
		if (hasUpgrade("venus", 13)) mult = mult.pow(1.5);
		if (hasUpgrade("venus", 14)) mult = mult.pow(2);
		if (hasUpgrade("venus", 15)) mult = mult.times(1e6);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	passiveGeneration() {
		if (hasMilestone("venus", 2)) return getBuyableAmount("venus", 11);
		return 0;
	},
	gainExp() {
		return new Decimal(1);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("venus", 1);
			},
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("venus", 2);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Sulfur"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "100 Sulfur",
			effectDescription: "Unlock 3 Upgrades",
			done() {
				return player.venus.points.gte(100);
			},
		},
		2: {
			requirementDescription: "10,000 Sulfur",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.venus.points.gte(10000);
			},
			unlocked() {
				return hasMilestone("venus", 1);
			},
		},
		3: {
			requirementDescription: "30,000 Sulfur",
			effectDescription: "Unlock 2 Upgrades",
			done() {
				return player.venus.points.gte(30000);
			},
			unlocked() {
				return hasMilestone("venus", 2);
			},
		},
		4: {
			requirementDescription: "2e13 Sulfur",
			effectDescription: "Unlock Earth",
			done() {
				return player.venus.points.gte(2e13);
			},
			unlocked() {
				return hasMilestone("venus", 3);
			},
		},
	},
	buyables: {
		11: {
			title: "Sulfur Extractor<br>",
			purchaseLimit: 20,
			cost(x) {
				let base1 = new Decimal(50);
				let base2 = x;
				let expo = new Decimal(0.479);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Sulfur" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/20<br>" +
					"<br>Effect: " +
					getBuyableAmount("venus", 11) +
					" CPS"
				);
			},
			canAfford() {
				return player.venus.points.gte(this.cost());
			},
			buy() {
				player.venus.points = player.venus.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("venus", 2);
			},
		},
	},
	upgrades: {
		11: {
			title: "Sulfur Dectector",
			description: "2x Sulfur",
			cost: new Decimal(67),
			unlocked() {
				return hasMilestone("venus", 1);
			},
		},
		12: {
			title: "Sulfur Mine",
			description: "20x Sulfur",
			cost: new Decimal(250),
			unlocked() {
				return hasUpgrade("venus", 11);
			},
		},
		13: {
			title: "Sulfur Refinery",
			description: "^1.5 Sulfur",
			cost: new Decimal(4000),
			unlocked() {
				return hasUpgrade("venus", 12);
			},
		},
		14: {
			title: "Sulfur Processor",
			description: "^2 Sulfur",
			cost: new Decimal(50000),
			unlocked() {
				return hasMilestone("venus", 3);
			},
		},
		15: {
			title: "Ultimate Sulfur Processor",
			description: "1,000,000x Sulfur",
			cost: new Decimal(3e7),
			unlocked() {
				return hasUpgrade("venus", 14);
			},
		},
	},
});

addLayer("earth", {
	position: 3,
	row: 11,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("venus", 4) && inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "80px",
			height: "80px",
		};
	},
	image: "https://i.ibb.co/9Yss9bH/earth.png",
	branches: ["sun"],
	resource: "Oxygen",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#29ABE4",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("earth", 1)) mult = mult.times(2);
		if (hasMilestone("earth", 2)) mult = mult.times(3);
		if (hasMilestone("earth", 4)) mult = mult.times(5);
		if (hasMilestone("earth", 6)) mult = mult.times(10);
		if (hasMilestone("earth", 8)) mult = mult.times(25);
		if (hasUpgrade("earth", 11)) mult = mult.pow(2);
		if (hasUpgrade("earth", 12)) mult = mult.pow(3);
		if (hasUpgrade("earth", 13)) mult = mult.times(upgradeEffect("earth", 13));
		if (hasUpgrade("earth", 14)) mult = mult.times(upgradeEffect("earth", 14));
		if (hasUpgrade("earth", 15)) mult = mult.times(upgradeEffect("earth", 15));
		if (hasUpgrade("earth", 21)) mult = mult.pow(1.1);
		if (hasUpgrade("earth", 22)) mult = mult.pow(1.2);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	passiveGeneration() {
		if (hasMilestone("earth", 15)) return 40;
		if (hasMilestone("earth", 13)) return 15;
		if (hasMilestone("earth", 11)) return 5;
		if (hasMilestone("earth", 9)) return 1;
		if (hasMilestone("earth", 7)) return 0.5;
		if (hasMilestone("earth", 5)) return 0.25;
		if (hasMilestone("earth", 3)) return 0.1;
		return 0;
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("earth", 10);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Oxygen"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "100 Oxygen",
			effectDescription: "2x Oxygen",
			done() {
				return player.earth.points.gte(100);
			},
		},
		2: {
			requirementDescription: "250 Oxygen",
			effectDescription: "3x Oxygen",
			done() {
				return player.earth.points.gte(250);
			},
			unlocked() {
				return hasMilestone("earth", 1);
			},
		},
		3: {
			requirementDescription: "255 Oxygen",
			effectDescription: "0.1 CPS",
			done() {
				return player.earth.points.gte(255);
			},
			unlocked() {
				return hasMilestone("earth", 2);
			},
		},
		4: {
			requirementDescription: "500 Oxygen",
			effectDescription: "5x Oxygen",
			done() {
				return player.earth.points.gte(500);
			},
			unlocked() {
				return hasMilestone("earth", 3);
			},
		},
		5: {
			requirementDescription: "2,500 Oxygen",
			effectDescription: "0.25 CPS",
			done() {
				return player.earth.points.gte(2500);
			},
			unlocked() {
				return hasMilestone("earth", 4);
			},
		},
		6: {
			requirementDescription: "5,000 Oxygen",
			effectDescription: "10x Oxygen",
			done() {
				return player.earth.points.gte(5000);
			},
			unlocked() {
				return hasMilestone("earth", 5);
			},
		},
		7: {
			requirementDescription: "10,000 Oxygen",
			effectDescription: "0.5 CPS",
			done() {
				return player.earth.points.gte(10000);
			},
			unlocked() {
				return hasMilestone("earth", 6);
			},
		},
		8: {
			requirementDescription: "20,000 Oxygen",
			effectDescription: "20x Oxygen",
			done() {
				return player.earth.points.gte(20000);
			},
			unlocked() {
				return hasMilestone("earth", 7);
			},
		},
		9: {
			requirementDescription: "250,000 Oxygen",
			effectDescription: "1 CPS",
			done() {
				return player.earth.points.gte(250000);
			},
			unlocked() {
				return hasMilestone("earth", 8);
			},
		},
		10: {
			requirementDescription: "1,000,000 Oxygen",
			effectDescription: "Unlock 2 Upgrades",
			done() {
				return player.earth.points.gte(1e6);
			},
			unlocked() {
				return hasMilestone("earth", 9);
			},
		},
		11: {
			requirementDescription: "1e25 Oxygen",
			effectDescription: "5 CPS",
			done() {
				return player.earth.points.gte(1e25);
			},
			unlocked() {
				return hasMilestone("earth", 10);
			},
		},
		12: {
			requirementDescription: "2.5e25 Oxygen",
			effectDescription: "Unlock 3 Upgrades",
			done() {
				return player.earth.points.gte(2.5e25);
			},
			unlocked() {
				return hasMilestone("earth", 11);
			},
		},
		13: {
			requirementDescription: "1e57 Oxygen",
			effectDescription: "15 CPS",
			done() {
				return player.earth.points.gte(1e57);
			},
			unlocked() {
				return hasMilestone("earth", 12);
			},
		},
		14: {
			requirementDescription: "1.1e57 Oxygen",
			effectDescription: "Unlock 2 Upgrades",
			done() {
				return player.earth.points.gte(1.1e57);
			},
			unlocked() {
				return hasMilestone("earth", 13);
			},
		},
		15: {
			requirementDescription: "1e125 Oxygen",
			effectDescription: "40 CPS",
			done() {
				return player.earth.points.gte(1e125);
			},
			unlocked() {
				return hasMilestone("earth", 14);
			},
		},
		16: {
			requirementDescription: "1e130 Oxygen",
			effectDescription: "Unlock Neptune",
			done() {
				return player.earth.points.gte("1e130");
			},
			unlocked() {
				return hasMilestone("earth", 15);
			},
		},
	},
	upgrades: {
		11: {
			title: "Water",
			description: "^2 Oxygen",
			cost: new Decimal(1.5e6),
			unlocked() {
				return hasMilestone("earth", 10);
			},
		},
		12: {
			title: "Plants",
			description: "^3 Oxygen",
			cost: new Decimal(5e9),
			unlocked() {
				return hasUpgrade("earth", 11);
			},
		},
		13: {
			title: "Trees",
			description: "Oxygen is Increased based on Oxygen",
			cost: new Decimal(4e25),
			unlocked() {
				return hasUpgrade("earth", 12) && hasMilestone("earth", 12);
			},
			effect() {
				return player.earth.points.add(1).pow(0.14);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		14: {
			title: "Forest",
			description: "Oxygen is Increased based on Oxygen",
			cost: new Decimal(2e29),
			unlocked() {
				return hasUpgrade("earth", 13);
			},
			effect() {
				return player.earth.points.add(1).pow(0.175);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		15: {
			title: "Jungle",
			description: "Oxygen is Increased based on Oxygen",
			cost: new Decimal(1e37),
			unlocked() {
				return hasUpgrade("earth", 14);
			},
			effect() {
				return player.earth.points.add(1).pow(0.25);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		21: {
			title: "Bacteria",
			description: "^1.1 Oxygen",
			cost: new Decimal(1e58),
			unlocked() {
				return hasUpgrade("earth", 15) && hasMilestone("earth", 14);
			},
		},
		22: {
			title: "Virus",
			description: "^1.2 Oxygen",
			cost: new Decimal(1e73),
			unlocked() {
				return hasUpgrade("earth", 21);
			},
		},
	},
});

addLayer("neptune", {
	position: 1,
	row: 11,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("earth", 16) && inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "105x",
			height: "105px",
		};
	},
	passiveGeneration() {
		if (hasMilestone("neptune", 2)) return getBuyableAmount("neptune", 11);
		return 0;
	},
	image: "https://i.ibb.co/p3rNyP2/neptune2.png",
	symbol: "",
	branches: ["sun"],
	resource: "Neon",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#5B63D8",
	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("neptune", 11)) mult = mult.times(100);
		if (hasUpgrade("neptune", 12)) mult = mult.times(10000);
		if (hasMilestone("neptune", 3))
			mult = mult.times(buyableEffect("neptune", 12));
		if (hasUpgrade("neptune", 13)) mult = mult.times(1e6);
		if (hasUpgrade("neptune", 14)) mult = mult.times(1e8);
		if (hasUpgrade("neptune", 15)) mult = mult.times(1e10);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("neptune", 1);
			},
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("neptune", 2);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Neon"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "100 Neon",
			effectDescription: "Unlock 5 Upgrades",
			done() {
				return player.neptune.points.gte(100);
			},
		},
		2: {
			requirementDescription: "250 Neon",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.neptune.points.gte(250);
			},
			unlocked() {
				return hasMilestone("neptune", 1);
			},
		},
		3: {
			requirementDescription: "100,000,000 Neon",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.neptune.points.gte(1e8);
			},
			unlocked() {
				return hasMilestone("neptune", 2);
			},
		},
		4: {
			requirementDescription: "1e55 Neon",
			effectDescription: "Unlock Uranus",
			done() {
				return player.neptune.points.gte(1e55);
			},
			unlocked() {
				return hasMilestone("neptune", 3);
			},
		},
	},

	buyables: {
		11: {
			title: "Neon Ionizer<br>",
			purchaseLimit: 100,
			cost(x) {
				let base1 = new Decimal(5);
				let base2 = x;
				let expo = new Decimal(0.793);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Neon" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/100<br>" +
					"<br>Effect: " +
					getBuyableAmount("neptune", 11) +
					" CPS"
				);
			},
			canAfford() {
				return player.neptune.points.gte(this.cost());
			},
			buy() {
				player.neptune.points = player.neptune.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("neptune", 2);
			},
		},
		12: {
			title: "Neon Plasma<br>",
			purchaseLimit: 75,
			unlocked() {
				return hasMilestone("neptune", 3);
			},
			cost(x) {
				let base1 = new Decimal(10000);
				let base2 = x;
				let expo = new Decimal(0.4787);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1.3277);
				let base2 = x;
				let expo = new Decimal(1.1954);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Neon" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/75<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Neon"
				);
			},
			canAfford() {
				return player.neptune.points.gte(this.cost());
			},
			buy() {
				player.neptune.points = player.neptune.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
	},

	upgrades: {
		11: {
			title: "Neon Extractor",
			description: "100x Neon",
			cost: new Decimal(100),
			unlocked() {
				return hasMilestone("neptune", 1);
			},
		},
		12: {
			title: "Neon Refinery",
			description: "10,000x Neon",
			cost: new Decimal(25000),
			unlocked() {
				return hasUpgrade("neptune", 11);
			},
		},
		13: {
			title: "Neon Condenser",
			description: "1,000,000x Neon",
			cost: new Decimal(1e10),
			unlocked() {
				return hasUpgrade("neptune", 12);
			},
		},
		14: {
			title: "Neon Gas Amplifier",
			description: "100,000,000x Neon",
			cost: new Decimal(3.636e36),
			unlocked() {
				return hasUpgrade("neptune", 13);
			},
		},
		15: {
			title: "Neon Energy",
			description: "1e10x Neon",
			cost: new Decimal(1e45),
			unlocked() {
				return hasUpgrade("neptune", 14);
			},
		},
	},
});

addLayer("uranus", {
	position: 3,
	row: 10,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("neptune", 4) && inChallenge("planets", 11))
			visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "110px",
			height: "110px",
		};
	},
	image: "https://i.ibb.co/7ztk9yb/uranus.png",
	branches: ["sun"],
	resource: "Carbon",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#7E959C",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("uranus", 1))
			mult = mult.times(buyableEffect("uranus", 11));
		if (hasMilestone("uranus", 4))
			mult = mult.times(buyableEffect("uranus", 13));
		if (hasUpgrade("uranus", 11)) mult = mult.pow(1.1);
		if (hasUpgrade("uranus", 12)) mult = mult.pow(1.2);
		if (hasUpgrade("uranus", 13)) mult = mult.pow(1.35);
		if (hasUpgrade("uranus", 14)) mult = mult.times(1e20);
		if (hasUpgrade("uranus", 15)) mult = mult.times(1e44);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	passiveGeneration() {
		if (hasMilestone("uranus", 2)) return getBuyableAmount("uranus", 12);
		return 0;
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("uranus", 1);
			},
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("uranus", 3);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Carbon"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "25 Carbon",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.uranus.points.gte(25);
			},
		},
		2: {
			requirementDescription: "1e10 Carbon",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.uranus.points.gte(1e10);
			},
			unlocked() {
				return hasMilestone("uranus", 1);
			},
		},
		3: {
			requirementDescription: "1e34 Carbon",
			effectDescription: "Unlock 3 Upgrades",
			done() {
				return player.uranus.points.gte(1e34);
			},
			unlocked() {
				return hasMilestone("uranus", 2);
			},
		},
		4: {
			requirementDescription: "1.5e60 Carbon",
			effectDescription: "Unlock a Buyable",
			done() {
				return player.uranus.points.gte(1.5e60);
			},
			unlocked() {
				return hasMilestone("uranus", 3);
			},
		},
		5: {
			requirementDescription: "2e116 Carbon",
			effectDescription: "Unlock 2 Upgrades",
			done() {
				return player.uranus.points.gte(2e116);
			},
			unlocked() {
				return hasMilestone("uranus", 4);
			},
		},
		6: {
			requirementDescription: "1e231 Carbon",
			effectDescription: "Unlock Saturn",
			done() {
				return player.uranus.points.gte(1e231);
			},
			unlocked() {
				return hasMilestone("uranus", 5);
			},
		},
	},
	buyables: {
		11: {
			title: "Carbon Transformer<br>",
			purchaseLimit: 150,
			unlocked() {
				return hasMilestone("uranus", 1);
			},
			cost(x) {
				let base1 = new Decimal(1.5);
				let base2 = x;
				let expo = new Decimal(1);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1.2);
				let base2 = x;
				let expo = new Decimal(1.2);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Carbon" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/150<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Carbon"
				);
			},
			canAfford() {
				return player.uranus.points.gte(this.cost());
			},
			buy() {
				player.uranus.points = player.uranus.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "Carbon Fabricator<br>",
			purchaseLimit: 12,
			cost(x) {
				let base1 = new Decimal(1e10);
				let base2 = x;
				let expo = new Decimal(0.693);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Carbon" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/12<br>" +
					"<br>Effect: " +
					getBuyableAmount("uranus", 12) +
					" CPS"
				);
			},
			canAfford() {
				return player.uranus.points.gte(this.cost());
			},
			buy() {
				player.uranus.points = player.uranus.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("uranus", 2);
			},
		},
		13: {
			title: "Carbon Producer<br>",
			purchaseLimit: 250,
			unlocked() {
				return hasMilestone("uranus", 4);
			},
			cost(x) {
				let base1 = new Decimal(1.5);
				let base2 = x;
				let expo = new Decimal(1.3);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1.2);
				let base2 = x;
				let expo = new Decimal(1.2);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Carbon" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/250<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Carbon"
				);
			},
			canAfford() {
				return player.uranus.points.gte(this.cost());
			},
			buy() {
				player.uranus.points = player.uranus.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
	},
	upgrades: {
		11: {
			title: "Carbon Producer",
			description: "^1.1 Carbon",
			cost: new Decimal(1e34),
			unlocked() {
				return hasMilestone("uranus", 3);
			},
		},
		12: {
			title: "Carbon Emmision",
			description: "^1.2 Carbon",
			cost: new Decimal(1e38),
			unlocked() {
				return hasUpgrade("uranus", 11);
			},
		},
		13: {
			title: "Carbon Refinery",
			description: "^1.35 Carbon",
			cost: new Decimal(1e45),
			unlocked() {
				return hasUpgrade("uranus", 12);
			},
		},
		14: {
			title: "Cars",
			description: "1e20x Carbon",
			cost: new Decimal(5e116),
			unlocked() {
				return hasMilestone("uranus", 5);
			},
		},
		15: {
			title: "Factory",
			description: "1e40x Carbon",
			cost: new Decimal(1e153),
			unlocked() {
				return hasUpgrade("uranus", 14);
			},
		},
	},
});

addLayer("saturn", {
	position: 2,
	row: 11,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("uranus", 6) && inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "118px",
			height: "118px",
		};
	},
	image: "https://i.ibb.co/s9NzWFL/saturn.png",
	branches: ["sun"],
	resource: "Helium",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#B2BA65",
	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("saturn", 1))
			mult = mult.times(buyableEffect("saturn", 11));
		if (hasUpgrade("saturn", 11)) mult = mult.times(5);
		if (hasUpgrade("saturn", 12)) mult = mult.times(10);
		if (hasUpgrade("saturn", 13)) mult = mult.times(20);
		if (hasUpgrade("saturn", 14)) mult = mult.times(40);
		if (hasUpgrade("saturn", 15)) mult = mult.times(80);
		if (hasUpgrade("saturn", 21)) mult = mult.pow(1.1);
		if (hasUpgrade("saturn", 22)) mult = mult.pow(1.2);
		if (hasUpgrade("saturn", 23)) mult = mult.pow(1.3);
		if (hasUpgrade("saturn", 24)) mult = mult.pow(1.4);
		if (hasUpgrade("saturn", 25)) mult = mult.pow(1.5);
		if (hasMilestone("saturn", 4))
			mult = mult.times(buyableEffect("saturn", 13));
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	passiveGeneration() {
		if (hasMilestone("saturn", 3)) return getBuyableAmount("saturn", 12);
		return 0;
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "blank", "clickables", "blank", "upgrades"],
			unlocked() {
				return hasMilestone("saturn", 1);
			},
		},
		Buyables: {
			content: ["main-display", "blank", "clickables", "blank", "buyables"],
			unlocked() {
				return hasMilestone("saturn", 2);
			},
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" + formatWhole(getResetGain(this.layer, "normal")) + " " + "Helium"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "25 Helium",
			effectDescription: "Unlock 5 Upgrades",
			done() {
				return player.saturn.points.gte(25);
			},
		},
		2: {
			requirementDescription: "10,000 Helium",
			effectDescription: "Unlock a buyable",
			unlocked() {
				return hasMilestone("saturn", 1);
			},
			done() {
				return player.saturn.points.gte(10000);
			},
		},
		3: {
			requirementDescription: "100,000,000 Helium",
			effectDescription: "Unlock a Buyable",
			unlocked() {
				return hasMilestone("saturn", 2);
			},
			done() {
				return player.saturn.points.gte(1e8);
			},
		},
		4: {
			requirementDescription: "1e17 Helium",
			effectDescription: "Unlock 5 Upgrades",
			unlocked() {
				return hasMilestone("saturn", 3);
			},
			done() {
				return player.saturn.points.gte(1e17);
			},
		},
		5: {
			requirementDescription: "1e70 Helium",
			effectDescription: "Unlock a Buyable",
			unlocked() {
				return hasMilestone("saturn", 4);
			},
			done() {
				return player.saturn.points.gte(1e70);
			},
		},
		6: {
			requirementDescription: "1e200 Helium",
			effectDescription: "Unlock Jupiter",
			unlocked() {
				return hasMilestone("saturn", 5);
			},
			done() {
				return player.saturn.points.gte(1e200);
			},
		},
	},
	buyables: {
		11: {
			title: "Balloon Inflation<br>",
			purchaseLimit: 150,
			cost(x) {
				let base1 = new Decimal(5);
				let base2 = x;
				let expo = new Decimal(0.865);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1.3);
				let base2 = x;
				let expo = new Decimal(1.17);
				let eff = base1.pow(Decimal.pow(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Helium" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/150<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Helium"
				);
			},
			canAfford() {
				return player.saturn.points.gte(this.cost());
			},
			buy() {
				player.saturn.points = player.saturn.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "Helium Generator<br>",
			purchaseLimit: 20,
			cost(x) {
				let base1 = new Decimal(1000);
				let base2 = x;
				let expo = new Decimal(0.925);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Helium" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/20<br>" +
					"<br>Effect: " +
					getBuyableAmount("saturn", 12) +
					" CPS"
				);
			},
			canAfford() {
				return player.saturn.points.gte(this.cost());
			},
			buy() {
				player.saturn.points = player.saturn.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("saturn", 3);
			},
		},
		13: {
			title: "Balloon Gas<br>",
			purchaseLimit: 50,
			cost(x) {
				let base1 = new Decimal(1e8);
				let base2 = x;
				let expo = new Decimal(0.7511);
				let cost = base1.pow(Decimal.pow(base2, expo));
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(2);
				let base2 = x;
				let expo = new Decimal(2);
				let eff = base1.pow(Decimal.times(base2, expo));
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Helium" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/50<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Helium"
				);
			},
			canAfford() {
				return player.saturn.points.gte(this.cost());
			},
			buy() {
				player.saturn.points = player.saturn.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
			unlocked() {
				return hasMilestone("saturn", 5);
			},
		},
	},
	upgrades: {
		11: {
			title: "Red Balloon",
			description: "5x Helium",
			cost: new Decimal(50),
		},
		12: {
			title: "Blue Balloon",
			description: "10x Helium",
			cost: new Decimal(500),
			unlocked() {
				return hasUpgrade("saturn", 11);
			},
		},
		13: {
			title: "Yellow Balloon",
			description: "20x Helium",
			cost: new Decimal(1e6),
			unlocked() {
				return hasUpgrade("saturn", 12);
			},
		},
		14: {
			title: "Green Balloon",
			description: "40x Helium",
			cost: new Decimal(5e8),
			unlocked() {
				return hasUpgrade("saturn", 13);
			},
		},
		15: {
			title: "Black Balloon",
			description: "80x Helium",
			cost: new Decimal(1e12),
			unlocked() {
				return hasUpgrade("saturn", 14);
			},
		},
		21: {
			title: "Pink Balloon",
			description: "^1.1 Helium",
			cost: new Decimal(1.5e17),
			unlocked() {
				return hasUpgrade("saturn", 15) && hasMilestone("saturn", 4);
			},
		},
		22: {
			title: "Cyan Balloon",
			description: "^1.2 Helium",
			cost: new Decimal(1e25),
			unlocked() {
				return hasUpgrade("saturn", 21) && hasMilestone("saturn", 3);
			},
		},
		23: {
			title: "Orange Balloon",
			description: "^1.3 Helium",
			cost: new Decimal(1e64),
			unlocked() {
				return hasUpgrade("saturn", 22) && hasMilestone("saturn", 3);
			},
		},
		24: {
			title: "Light Green Balloon",
			description: "^1.4 Helium",
			cost: new Decimal(1e100),
			unlocked() {
				return hasUpgrade("saturn", 23) && hasMilestone("saturn", 3);
			},
		},
		25: {
			title: "White Balloon",
			description: "^1.5 Helium",
			cost: new Decimal(1e143),
			unlocked() {
				return hasUpgrade("saturn", 24) && hasMilestone("saturn", 3);
			},
		},
	},
});

addLayer("jupiter", {
	position: 1,
	row: 9,
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	layerShown() {
		let visible = false;
		if (hasMilestone("saturn", 6) && inChallenge("planets", 11)) visible = true;
		return visible;
	},
	nodeStyle() {
		return {
			width: "140px",
			height: "140px",
		};
	},
	image: "https://i.ibb.co/PQd9T2Y/jupiter.png",
	branches: ["sun"],
	resource: "Hydrogen",
	requires: new Decimal(0),
	baseResource: "Light",
	baseAmount() {
		return player.sun.points;
	},
	type: "normal",
	resetsNothing: true,
	color: "#9E7D2F",
	gainMult() {
		let mult = new Decimal(1);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},
	gainExp() {
		return new Decimal(1);
	},
	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "blank", "clickables"],
		},
		Milestones: {
			content: ["main-display", "blank", "clickables", "blank", "milestones"],
		},
	},
	clickables: {
		11: {
			title() {
				return (
					"+" +
					formatWhole(getResetGain(this.layer, "normal")) +
					" " +
					"Hydrogen"
				);
			},
			onClick() {
				doReset(this.layer);
			},
			canClick: true,
		},
	},
	milestones: {
		1: {
			requirementDescription: "1 Hydrogen",
			effectDescription: "Complete The Solar System",
			unlocked() {
				return player.jupiter.points.gte(1);
			},
			done() {
				return player.jupiter.points.gte(1);
			},
		},
	},
});
