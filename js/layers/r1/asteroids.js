addLayer("ast", {
	name: "Asteroids",

	symbol() {
		if (options.emojisEnabled) return "☄️";
		return "AS";
	},

	color: "#F1DD4A",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.background = "radial-gradient(#E99A19, #F1DD4A)";
		return style;
	},

	hotkeys: [
		{
			key: "s",
			description: "S: Asteroid reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (hasMilestone("as", 4) || player.ast.unlocked) visible = true;
		if (player.infinity.points.gte(1)) visible = true;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	milestonePopups() {
		let popup = true;
		if (options.ComAstMilestonePopup == true) popup = true;
		else popup = false;
		return popup;
	},

	position: 2,
	row: 3,
	branches: ["as", "s"],

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
		Milestones: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
		},
		Upgrades: {
			content: ["main-display", "prestige-button", "blank", "upgrades"],
		},
		Asteroids: {
			content: ["main-display", "prestige-button", "blank", "challenges"],
			unlocked() {
				return hasChallenge("c", 14);
			},
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "Asteroids",
	baseResource: "Astronauts",
	baseAmount() {
		return player.as.points;
	},

	requires: new Decimal(1e25),
	type: "normal",
	exponent: 0.25,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("s", 15) && !inChallenge("real", 11)) mult = mult.times(3);
		if (hasUpgrade("s", 25) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasUpgrade("s", 35) && !inChallenge("real", 11)) mult = mult.times(10);
		if (hasUpgrade("s", 45) && !inChallenge("real", 11)) mult = mult.times(25);
		if (hasUpgrade("s", 44) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasMilestone("s", 7) && !inChallenge("real", 11)) mult = mult.times(3);
		if (hasUpgrade("c", 15)) mult = mult.times(upgradeEffect("c", 15));
		if (hasChallenge("ast", 12)) mult = mult.times(100);
		if (hasMilestone("planets", 1))
			mult = mult.times(buyableEffect("planets", 12));
		if (hasUpgrade("planets", 15))
			mult = mult.times(upgradeEffect("planets", 15));
		if (hasUpgrade("x", 15) && !inChallenge("real", 11))
			mult = mult.times(1000);

		mult = mult.times(player.infinity.points.add(1));

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (hasUpgrade("infinity", 62)) return 1;
		if (hasMilestone("planets", 1))
			return getBuyableAmount("planets", 11) / 100;
		if (hasMilestone("ast", 5)) return 0.01;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (hasUpgrade("infinity", 63)) keep.push("challenges");
		if (hasMilestone("planets", 3)) keep.push("challenges");
		if (hasMilestone("x", 3)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("ast", keep);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 61)) return true;
		if (hasMilestone("planets", 5)) return true;
		else return false;
	},

	infoboxes: {
		main: {
			title: "Introducing: Asteroids",
			body() {
				return "Asteroids Reset everything from layer 1 & 2. Asteroids are Used for Upgrades & Milestones. After a while, you will unlock Challenges. Challenges are objectives you need to complete while having a debuff, in return you get rewards!";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "100 Asteroids",
			effectDescription: "Unlock 1 New Space Upgrade",
			done() {
				return player.ast.points.gte(100);
			},
		},
		2: {
			requirementDescription: "10,000 Asteroids",
			effectDescription: "Unlock 3 New Space Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ast.points.gte(10000);
			},
		},
		3: {
			requirementDescription: "500,000 Asteroids",
			effectDescription: "Keep Astronaut Milestones on Reset",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ast.points.gte(500000);
			},
		},
		4: {
			requirementDescription: "1,000,000 Asteroids",
			effectDescription: "Unlock 1 New Space Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ast.points.gte(1e6);
			},
		},
		5: {
			requirementDescription: "1e10 Asteroids",
			effectDescription: "1% of Asteroids & Comets/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ast.points.gte(1e10);
			},
		},
	},

	upgrades: {
		11: {
			title: "Search for Asteroids",
			description: "5x Astronauts",
			cost: new Decimal(1),
		},
		12: {
			title: "Asteroids Research Equipment",
			description: "x10 Rocket Fuel",
			cost: new Decimal(12),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		13: {
			title: "Astronaut Enhancement",
			description: "Astronaut gain is increased based on Asteroids",
			cost: new Decimal(20),
			effect() {
				return new Decimal(1.5).add(player.ast.points.add(1).log(10).pow(2.5));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		14: {
			title: "Tracking Asteroids",
			description: "10x Astronauts",
			cost: new Decimal(60),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		15: {
			title: "Comet Infusion",
			description: "Comet gain is increased based on Asteroids",
			cost: new Decimal(1500),
			effect() {
				let base = new Decimal(1.2).add(
					player.ast.points.add(1).log(10).pow(2.5)
				);
				let result = base;

				result = base;
				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		21: {
			title: "Halley's Asteroid",
			description: "Money gain is Increased based on Asteroids",
			cost: new Decimal(1e8),
			effect() {
				let base = player.ast.points.add(1).pow(0.3);
				let result;

				result = base;

				//Softcap
				if (result.gte(1e6))
					result = new Decimal(1e6).times(base.add(1).log(2).pow(3));

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
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("c", 11)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		22: {
			title: "Sell Asteroids",
			description: "1000x Money",
			cost: new Decimal(1e10),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("c", 14)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		23: {
			title: "Astronaut Asteroids",
			description: "Rocket cost is decreased based on Asteroids",
			cost: new Decimal(5e10),
			effect() {
				return new Decimal(1.5).add(player.ast.points.add(1).log(10).pow(3.5));
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("c", 14)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		24: {
			title: "Astronauts Discovery",
			description: "100x Astronauts",
			cost: new Decimal(1e16),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("ast", 13)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		25: {
			title: "Money Asteroids",
			description: "100x Money",
			cost: new Decimal(1e17),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("ast", 13)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},

	challenges: {
		11: {
			name: "Asteroid Icarus",
			challengeDescription: "^0.25 Money & ^0.25 Rocket Fuel",
			canComplete: function () {
				return player.ro.points.gte(11);
			},
			goalDescription: "11 Rockets",
			rewardDescription: "Unlock Asteroid Eros & Unlock 1 New Comet Upgrade",
		},
		12: {
			name: "Asteroid Eros",
			challengeDescription: "^0.1 Rocket Fuel",
			canComplete: function () {
				return player.ro.points.gte(20);
			},
			goalDescription: "20 Rockets",
			unlocked() {
				return hasChallenge(this.layer, 11);
			},
			rewardDescription: "Unlock Asteroid Pallas & 100x Asteroids",
		},
		13: {
			name: "Asteroid Pallas",
			challengeDescription: "You cant earn Rockets",
			canComplete: function () {
				return player.points.gte(1e36);
			},
			goalDescription: "1e36 Money",
			unlocked() {
				return hasChallenge(this.layer, 12);
			},
			rewardDescription:
				"Unlock Asteroid Ceres & Unlock 2 New Asteroid Upgrades",
		},
		14: {
			name: "Asteroid Ceres",
			challengeDescription: "^0.1 Money",
			canComplete: function () {
				return player.ro.points.gte(19);
			},
			goalDescription: "19 Rockets",
			unlocked() {
				return hasChallenge(this.layer, 13);
			},
			rewardDescription: "Unlock Stars & Unlock 2 New Comet Upgrades",
		},
	},
});
