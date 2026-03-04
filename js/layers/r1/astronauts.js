addLayer("as", {
	name: "Astronauts",

	symbol() {
		if (options.emojisEnabled) return "🧑‍🚀";
		return "A";
	},

	color: "#EFEFEF",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}
		return style;
	},

	hotkeys: [
		{
			key: "a",
			description: "A: Astronaut reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (player.infinity.points.gte(1)) visible = true;
		if (hasMilestone("ro", 8) || player.as.unlocked) visible = true;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	milestonePopups() {
		let popup = true;
		if (options.AstronautMilestonePopup == true) popup = true;
		else popup = false;
		return popup;
	},

	position: 1,
	row: 1,
	branches: ["ro", "r"],

	tabFormat: {
		Main: {
			content: [
				"main-display",
				"resource-display",
				"prestige-button",
				"blank",
				["infobox", "main"],
			],
		},
		Upgrades: {
			content: ["main-display", "prestige-button", "blank", "upgrades"],
		},
		Milestones: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "Astronauts",
	baseResource: "Rocket Fuel",
	baseAmount() {
		return player.r.points;
	},

	requires: new Decimal(1e12),
	type: "normal",
	exponent: 0.5,

	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("ro", 9)) mult = mult.times(1.5);
		if (hasMilestone("ro", 10)) mult = mult.times(1.5);
		if (hasMilestone("ro", 12)) mult = mult.times(2);
		if (hasMilestone("ro", 17)) mult = mult.times(2);
		if (hasMilestone("ro", 19)) mult = mult.times(3);
		if (hasMilestone("s", 2) && !inChallenge("real", 11)) mult = mult.times(2);
		if (hasUpgrade("ro", 14)) mult = mult.times(upgradeEffect("ro", 14));
		if (hasUpgrade("s", 14) && !inChallenge("real", 11)) mult = mult.times(2);
		if (hasUpgrade("s", 24) && !inChallenge("real", 11)) mult = mult.times(4);
		if (hasUpgrade("s", 34) && !inChallenge("real", 11)) mult = mult.times(10);
		if (hasUpgrade("s", 43) && !inChallenge("real", 11)) mult = mult.times(25);
		if (hasMilestone("s", 2) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasUpgrade("as", 12)) mult = mult.times(3);
		if (hasUpgrade("as", 13)) mult = mult.times(5);
		if (hasUpgrade("as", 15)) mult = mult.times(3);
		if (hasUpgrade("as", 22)) mult = mult.times(5);
		if (hasUpgrade("as", 23)) mult = mult.times(8);
		if (hasUpgrade("s", 51) && !inChallenge("real", 11)) mult = mult.times(75);
		if (hasUpgrade("ast", 11)) mult = mult.times(5);
		if (hasUpgrade("ast", 13)) mult = mult.times(upgradeEffect("ast", 13));
		if (hasUpgrade("ast", 14)) mult = mult.times(10);
		if (hasUpgrade("ast", 23)) mult = mult.times(upgradeEffect("ast", 23));
		if (hasUpgrade("ast", 24)) mult = mult.times(100);
		if (hasUpgrade("stars", 14)) mult = mult.times(upgradeEffect("stars", 14));
		if (hasUpgrade("planets", 14))
			mult = mult.times(upgradeEffect("planets", 14));
		if (hasMilestone("s", 14)) mult = mult.times(1e6);

		mult = mult.times(player.infinity.points.add(1));

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) return 0;
		if (hasUpgrade("infinity", 32)) return 1;
		if (hasMilestone("s", 10)) return 1;
		if (hasMilestone("ast", 4)) return 0.5;
		if (hasMilestone("s", 4)) return 0.25;
		if (hasMilestone("ro", 13)) return 0.1;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (hasMilestone("ast", 3)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset("as", keep);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 31)) return true;
		if (hasMilestone("stars", 5)) return true;
		if (hasMilestone("stars", 5)) return true;
		else return false;
	},

	infoboxes: {
		main: {
			title: "Introducing: Astronauts",
			body() {
				return "This layer is nothing new, it's the same as Rocket Fuel. Astronauts also use Rocket Fuel instead of Money.";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "1,000 Astronauts",
			effectDescription: "100% of Rocket Fuel/s & 1 New Rocket Upgrade",
			done() {
				return player.as.points.gte(1000);
			},
		},
		2: {
			requirementDescription: "500,000 Astronauts",
			effectDescription: "Auto-Buy Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.as.points.gte(500000);
			},
		},
		3: {
			requirementDescription: "500,000,000 Astronauts",
			effectDescription: "Unlock 1 Rocket Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.as.points.gte(5e8);
			},
		},
		4: {
			requirementDescription: "1e25 Astronauts",
			effectDescription: "Unlock Asteroids",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.as.points.gte(1e25);
			},
		},
	},

	upgrades: {
		11: {
			title: "The First Astronaut",
			description: "5x Money & 2x Rocket Fuel",
			cost: new Decimal(1),
		},
		12: {
			title: "Basic Training Facility",
			description: "10x Money & 3x Astronauts",
			cost: new Decimal(3),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		13: {
			title: "Trained Astronauts",
			description: "5x Rocket fuel & 5x Astronauts",
			cost: new Decimal(25),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		14: {
			title: "Basic Space School",
			description: "Rocket cost is decreased based on money",
			cost: new Decimal(400),
			effect() {
				let base = player.points.add(1).pow(0.3);
				let result;

				result = base;

				// Softcaps
				if (result.gte(1e6)) {
					result = new Decimal(1e6).add(base.pow(0.333));
				}
				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(1e6)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		15: {
			title: "Skilled Astronauts",
			description: "3x Astronauts",
			cost: new Decimal(15000),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		21: {
			title: "Increase Salary",
			description: "Money gain is increased based on Astronauts",
			cost: new Decimal(60000),
			effect() {
				let base = player.as.points.add(1).pow(0.5);
				let result;

				result = base;

				// Softcaps
				if (result.gte(500)) {
					result = new Decimal(500).add(base.pow(0.475));
				}

				if (result.gte(100000)) {
					result = new Decimal(100000).add(base.pow(0.25));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(500) && effect.lte(100000)) display += " (Softcapped)";
				if (effect.gt(100000)) display += " (Softcapped+)";

				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		22: {
			title: "Enhanced Training Facility",
			description: "5x Astronauts",
			cost: new Decimal(2e6),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		23: {
			title: "Professional Astronauts",
			description: "8x Astronauts",
			cost: new Decimal(1e7),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		24: {
			title: "Enhanced Space School",
			description: "Rocket cost is decreased based on Astronauts",
			cost: new Decimal(2.5e8),
			effect() {
				let base = player.as.points.add(1).pow(0.333);
				let result;

				result = base;

				// Softcaps
				if (result.gte(10000)) {
					result = new Decimal(10000).add(base.pow(0.825));
				}
				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(10000)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		25: {
			title: "Scientist Astronauts",
			description: "100x Money & 10x Rocket Fuel",
			cost: new Decimal(1e11),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},
});
