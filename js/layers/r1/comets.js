addLayer("c", {
	name: "Comets",

	symbol() {
		if (options.emojisEnabled) return "☄️";
		return "C";
	},

	color: "#2D6CD3",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.background = "radial-gradient(#4AEAF1, #2D6CD3)";
		return style;
	},

	hotkeys: [
		{
			key: "c",
			description: "C: Comet reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (player.infinity.points.gte(1)) visible = true;
		if (hasMilestone("ro", 20) || player.c.unlocked) visible = true;
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

	position: 0,
	row: 3,
	branches: ["ro", "s"],

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
		Comets: {
			unlocked() {
				return hasMilestone("c", 5);
			},
			content: ["main-display", "prestige-button", "blank", "challenges"],
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "Comets",
	baseResource: "Rockets",
	baseAmount() {
		return player.ro.points;
	},

	requires: new Decimal(20),
	type: "normal",
	exponent: 19,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("s", 11) && !inChallenge("real", 11)) mult = mult.times(3);
		if (hasUpgrade("s", 21) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasUpgrade("s", 31) && !inChallenge("real", 11)) mult = mult.times(10);
		if (hasUpgrade("s", 41) && !inChallenge("real", 11)) mult = mult.times(25);
		if (hasUpgrade("s", 42) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasMilestone("s", 7) && !inChallenge("real", 11)) mult = mult.times(3);
		if (hasUpgrade("ast", 15)) mult = mult.times(upgradeEffect("ast", 15));
		if (hasChallenge("c", 12)) mult = mult.times(100);
		if (hasMilestone("stars", 1)) mult = mult.times(buyableEffect("stars", 12));
		if (hasUpgrade("stars", 15)) mult = mult.times(upgradeEffect("stars", 15));

		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (hasUpgrade("infinity", 52)) return 1;
		if (hasMilestone("stars", 1)) return getBuyableAmount("stars", 11) / 100;
		if (hasMilestone("ast", 5)) return 0.01;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (hasUpgrade("infinity", 53)) keep.push("challenges");
		if (hasMilestone("planets", 2)) keep.push("challenges");
		if (hasMilestone("x", 3)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("c", keep);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 51)) return true;
		if (hasMilestone("planets", 4)) return true;
		else return false;
	},

	infoboxes: {
		main: {
			title: "Introducing: Comets",
			body() {
				return "Comets Reset everything from layer 1 & 2. Comets are used for Upgrades & Milestones. After a while, you will unlock Challenges. Challenges are objectives you need to complete while having a debuf, in return you get rewards!";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "15 Comets",
			effectDescription: "Unlock 1 New Space Upgrade",
			done() {
				return player.c.points.gte(15);
			},
		},
		2: {
			requirementDescription: "2,500 Comets",
			effectDescription: "Unlock 3 New Space Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.c.points.gte(2500);
			},
		},
		3: {
			requirementDescription: "100,000 Comets",
			effectDescription: "Auto-Buy Rocket Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.c.points.gte(100000);
			},
		},
		4: {
			requirementDescription: "500,000 Comets",
			effectDescription: "Unlock 1 New Space Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.c.points.gte(500000);
			},
		},
		5: {
			requirementDescription: "2,500,000 Comets",
			effectDescription: "Unlock Halley's Comet",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.c.points.gte(2.5e6);
			},
		},
	},

	upgrades: {
		11: {
			title: "Search for Comets",
			description: "/5 Rocket Price",
			cost: new Decimal(1),
		},
		12: {
			title: "Comets Research Equipment",
			description: "x10 Rocket Fuel",
			cost: new Decimal(5),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		13: {
			title: "Rocket Enhancement",
			description: "Rocket Price is decreased based on comets",
			cost: new Decimal(15),
			effect() {
				return new Decimal(1.5).add(player.c.points.add(1).log(10).pow(3.75));
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		14: {
			title: "Tracking Comets",
			description: "/10 Rocket Price",
			cost: new Decimal(35),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		15: {
			title: "Asteroid Infusion",
			description: "Asteroids gain is increased based on Comets",
			cost: new Decimal(150),
			effect() {
				let base = new Decimal(1.2).add(
					player.c.points.add(1).log(10).pow(2.5)
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
			title: "Sell Comets",
			description: "1000x Money",
			cost: new Decimal(1e10),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge(this.layer, 13)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		22: {
			title: "Rocket Comets",
			description: "Rocket cost is decreased based on Comets",
			cost: new Decimal(5e10),
			effect() {
				return new Decimal(1.5).add(player.c.points.add(1).log(10).pow(4.1));
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge(this.layer, 13)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		23: {
			title: "Comet Icarus",
			description: "Money gain is Increased based on Asteroids",
			cost: new Decimal(2e11),
			effect() {
				return new Decimal(1.5).add(player.ast.points.add(1).log(2).pow(3));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("ast", 11)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		24: {
			title: "Rocket Discovery",
			description: "/100 Rocket Cost",
			cost: new Decimal(1e12),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("ast", 14)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		25: {
			title: "Money Comets",
			description: "100x Money",
			cost: new Decimal(3e12),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasChallenge("ast", 14)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},

	challenges: {
		11: {
			name: "Halley's Comet",
			challengeDescription: "^0.5 Money & ^0.75 Rocket Fuel",
			canComplete: function () {
				return player.ro.points.gte(15);
			},
			goalDescription: "15 Rockets",
			rewardDescription: "Unlock Encke's Comet & Unlock 1 New Asteroid Upgrade",
		},
		12: {
			name: "Encke's Comet",
			challengeDescription: "^0.01 Rocket Fuel",
			canComplete: function () {
				return player.ro.points.gte(9);
			},
			goalDescription: "9 Rockets",
			unlocked() {
				return hasChallenge(this.layer, 11);
			},
			rewardDescription: "Unlock Comet Hyakutake & 100x Comets",
		},
		13: {
			name: "Comet Hyakutake",
			challengeDescription: "You cant earn Rockets",
			canComplete: function () {
				return player.points.gte(1e19);
			},
			goalDescription: "1e19 Money",
			unlocked() {
				return hasChallenge(this.layer, 12);
			},
			rewardDescription: "Unlock Biela's Comet & Unlock 2 New Comets Upgrade",
		},
		14: {
			name: "Biela's Comet",
			challengeDescription: "^0.175 Money",
			canComplete: function () {
				return player.ro.points.gte(16);
			},
			goalDescription: "16 Rockets",
			unlocked() {
				return hasChallenge(this.layer, 13);
			},
			rewardDescription:
				"Unlock Asteroid Icarus & Unlock 2 New Asteroid Upgrades",
		},
	},
});
