addLayer("r", {
	name: "Rocket Fuel",

	symbol() {
		if (options.emojisEnabled) return "⛽";
		return "RF";
	},

	color: "#961515",

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
			key: "f",
			description: "F: Rocket Fuel reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = true;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	position: 0,
	row: 0,
	branches: [],

	tabFormat: {
		Main: {
			content: [
				[
					"display-text",
					"Reality I: Launch",
					{
						color: "LightBlue",
						"font-size": "32px",
						"text-shadow": "0px 0px 20px LightBlue",
					},
				],
				"blank",
				"main-display",
				"resource-display",
				"prestige-button",
				"blank",
				["infobox", "main"],
				["infobox", "main2"],
			],
		},
		Upgrades: {
			content: ["main-display", "prestige-button", "blank", "upgrades"],
		},
	},

	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},

	resource: "Rocket Fuel",
	baseResource: "Money",
	baseAmount() {
		return player.points;
	},

	requires: new Decimal(10),
	type: "normal",
	exponent: 0.4,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("r", 15)) mult = mult.times(upgradeEffect("r", 15));
		if (hasUpgrade("r", 14)) mult = mult.times(1.75);
		if (hasUpgrade("r", 21)) mult = mult.times(1.5);
		if (hasUpgrade("r", 22)) mult = mult.times(1.2);
		if (hasUpgrade("r", 23)) mult = mult.times(1.5);
		if (hasMilestone("ro", 2)) mult = mult.times(2);
		if (hasUpgrade("r", 32)) mult = mult.times(upgradeEffect("r", 32));
		if (hasMilestone("ro", 3)) mult = mult.times(2);
		if (hasUpgrade("r", 34)) mult = mult.times(4);
		if (hasUpgrade("r", 35)) mult = mult.times(upgradeEffect("r", 35));
		if (hasUpgrade("ro", 13)) mult = mult.times(upgradeEffect("ro", 13));
		if (hasUpgrade("r", 41)) mult = mult.times(upgradeEffect("r", 41));
		if (hasUpgrade("r", 42)) mult = mult.times(upgradeEffect("r", 42));
		if (hasUpgrade("r", 43)) mult = mult.times(1.1);
		if (hasUpgrade("r", 44)) mult = mult.times(1.01);
		if (hasUpgrade("r", 45)) mult = mult.times(upgradeEffect("r", 45));
		if (hasUpgrade("s", 12) && !inChallenge("real", 11)) mult = mult.times(5);
		if (hasUpgrade("s", 22) && !inChallenge("real", 11)) mult = mult.times(10);
		if (hasUpgrade("s", 32) && !inChallenge("real", 11)) mult = mult.times(20);
		if (hasUpgrade("s", 43) && !inChallenge("real", 11)) mult = mult.times(50);
		if (hasUpgrade("as", 11)) mult = mult.times(2);
		if (hasUpgrade("as", 13)) mult = mult.times(5);
		if (hasUpgrade("as", 25)) mult = mult.times(10);
		if (hasUpgrade("s", 51) && !inChallenge("real", 11)) mult = mult.times(200);
		if (hasUpgrade("c", 12)) mult = mult.times(10);
		if (hasUpgrade("ast", 12)) mult = mult.times(10);
		if (hasUpgrade("stars", 12)) mult = mult.times(upgradeEffect("stars", 12));
		if (hasUpgrade("planets", 12))
			mult = mult.times(upgradeEffect("planets", 12));
		if (hasUpgrade("x", 11) && !inChallenge("real", 11))
			mult = mult.times(upgradeEffect("x", 11));
		if (hasUpgrade("r", 52)) mult = mult.times(1e6);
		if (hasUpgrade("r", 54)) mult = mult.times(1e20);
		if (hasUpgrade("as", 31)) mult = mult.times(10000);
		if (hasUpgrade("as", 32)) mult = mult.times(100);

		mult = mult.times(player.infinity.points.add(1));

		// Challenges
		if (inChallenge("c", 11)) mult = mult.pow(0.75);
		if (inChallenge("c", 12)) mult = mult.pow(0.01);
		if (inChallenge("ast", 11)) mult = mult.pow(0.22);
		if (inChallenge("ast", 12)) mult = mult.pow(0.1);

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (hasMilestone("s", 11)) return 10;
		if (hasMilestone("s", 8)) return 5;
		if (hasMilestone("ro", 14)) return 2.5;
		if (hasUpgrade("infinity", 12)) return 1;
		if (hasMilestone("as", 1)) return 1;
		if (hasMilestone("ro", 9)) return 0.5;
		if (hasMilestone("ro", 6)) return 0.2;
		if (hasMilestone("ro", 5)) return 0.1;
		if (hasMilestone("ro", 4)) return 0.05;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset("r", keep);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) return false;
		if (hasUpgrade("infinity", 11)) return true;
		if (hasMilestone("stars", 4)) return true;
		if (hasMilestone("as", 2)) return true;
		else return false;
	},

	infoboxes: {
		main: {
			title: "Welcome!",
			body() {
				return "<b>Welcome to The Galactic Tree</b>.<br><br>Join <a>CoolBoris Studio</a> for leaks, updates and more!<br>Have Fun!";
			},
		},
		main2: {
			title: "Introducing: Rocket Fuel",
			body() {
				return "What you are reading right now is called an infobox. these will help you throughout the game.<br><br>Welcome in Reality 1! At this stage, it's fairly simple, just click the red button and you will earn Rocket Fuel. You can spend Rocket Fuel on upgrades (click on 'Upgrades' at the top). Try getting the 10th Rocket Fuel Upgrade!";
			},
		},
	},

	upgrades: {
		11: {
			title: "Discover Rocket Fuel",
			description: "+1 money/s",
			cost: new Decimal(1),
		},

		12: {
			title: "Rocket Fuel Factory",
			description: "2x Money",
			cost: new Decimal(2),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		13: {
			title: "Basic Research Lab",
			description: "Money gain is increased based on your Rocket Fuel",
			cost: new Decimal(4),
			effect() {
				let base = new Decimal(0.5).add(
					player[this.layer].points.add(1).pow(0.28),
				);
				let result;

				result = base;

				// Softcaps
				if (result.gte(1000)) {
					result = new Decimal(1000).add(base.log2().pow(2.5));
				}

				if (result.gte(1e6)) {
					result = new Decimal(1e6).add(base.log2().pow(1.5));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(1000) && effect.lte(1e6)) display += " (Softcapped)";
				if (effect.gt(1e6)) display += " (Softcapped+)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		14: {
			title: "Basic Rocket Fuel Formula",
			description: "1.75x Rocket Fuel",
			cost: new Decimal(8),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		15: {
			title: "Basic Rocket Fuel Refinery",
			description: "Rocket Fuel gain is increased based on money",
			cost: new Decimal(15),
			effect() {
				let base = player.points.add(1).pow(0.12);
				let result;

				result = base;

				// Softcaps
				if (result.gte(250)) {
					result = new Decimal(250).add(base.pow(0.7));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(250)) display += " (Softcapped)";
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
			title: "Improve Rocket Fuel Formula",
			description: "1.5x Rocket Fuel and 2x Money",
			cost: new Decimal(35),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		22: {
			title: "Mega Rocket Fuel Factory",
			description: "1.2x Rocket Fuel",
			cost: new Decimal(50),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		23: {
			title: "Enhanced Research Lab",
			description: "1.5x Rocket Fuel",
			cost: new Decimal(75),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		24: {
			title: "Enchaned Rocket Fuel Formula",
			description: "^1.05 Money",
			cost: new Decimal(120),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		25: {
			title: "Advanced Rocket Fuel Refinery",
			description: "Unlock Rockets & 3x Money",
			cost: new Decimal(200),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		31: {
			title: "Discover Superfuel",
			description: "5x Money",
			cost: new Decimal(1000),
			unlocked() {
				return (
					(hasMilestone("ro", 2) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasMilestone("ro", 2) && hasUpgrade(this.layer, this.id))
				);
			},
		},

		32: {
			title: "Superfuel Factory",
			description: "Rocket Fuel gain is increased based on Rocket Fuel",
			cost: new Decimal(2200),
			effect() {
				let base = new Decimal(1.25).add(player.r.points.add(1).pow(0.135));
				let result;

				result = base;

				// Softcaps
				if (result.gte(10000)) {
					result = new Decimal(10000).add(base.pow(0.775));
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

		33: {
			title: "Advanced Research Lab",
			description: "10x Money",
			cost: new Decimal(25000),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("ro", 3)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		34: {
			title: "Basic Superfuel Formula",
			description: "4x Rocket Fuel",
			cost: new Decimal(70000),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		35: {
			title: "Superfuel Engine",
			description: "Rocket Fuel gain is increased based on Money",
			cost: new Decimal(100000000),
			effect() {
				let base = player.points.add(1).pow(0.15);
				let result;

				result = base;

				// Softcaps
				if (result.gte(1e6)) {
					result = new Decimal(1e6).add(base.pow(0.8));
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
					(hasMilestone("ro", 6) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasMilestone("ro", 6) && hasUpgrade(this.layer, this.id))
				);
			},
		},

		41: {
			title: "Improve Superfuel Formula",
			description: "Rocket Fuel gain is increased based on Astronauts",
			cost: new Decimal(2.8e28),
			effect() {
				let base = player.as.points.add(1).pow(0.15);
				let result;

				result = base;

				// Softcaps
				if (result.gte(1e6)) {
					result = new Decimal(1e6).add(base.log2().pow(2.2));
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
					(hasMilestone("ro", 16) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasMilestone("ro", 16) && hasUpgrade(this.layer, this.id))
				);
			},
		},

		42: {
			title: "Mega Superfuel Factory",
			description: "Rocket Fuel gain is increased based on Rockets",
			cost: new Decimal(1e32),
			effect() {
				return player.ro.points.add(1).pow(1.35);
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

		43: {
			title: "Next-gen Research Lab",
			description: "1.1x Rocket Fuel",
			cost: new Decimal(1e35),
			unlocked() {
				return (
					(hasMilestone("ro", 18) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasMilestone("ro", 18) && hasUpgrade(this.layer, this.id))
				);
			},
		},

		44: {
			title: "Enhanced Superfuel Formula",
			description: "1.01x Rocket Fuel",
			cost: new Decimal(6.7e35),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		45: {
			title: "Superfuel Engine v3000",
			description: "Rocket Fuel gain is increased based on Rocket Fuel",
			cost: new Decimal(1e37),
			effect() {
				let base = player.r.points.add(1).pow(0.07);
				let result = base;

				// Softcaps
				if (result.gte(1e9)) {
					result = new Decimal(1e9).add(base.log10().pow(1.75));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(1e9)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		51: {
			title: "Discover Ultrafuel",
			description: "1e9x Money",
			cost: new Decimal(1e90),
			unlocked() {
				return (
					(hasUpgrade("x", 12) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasUpgrade("x", 12) && hasUpgrade(this.layer, this.id))
				);
			},
		},
		52: {
			title: "Ultrafuel Factory",
			description: "1,000,000x Rocket Fuel",
			cost: new Decimal(1.01e101),
			unlocked() {
				return (
					(hasUpgrade("x", 12) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasUpgrade("x", 12) && hasUpgrade(this.layer, this.id))
				);
			},
		},
		53: {
			title: "Futuristic Research Lab",
			description: "100x Stardust & Planetoids",
			cost: new Decimal(1e110),
			unlocked() {
				return (
					(hasUpgrade("x", 12) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasUpgrade("x", 12) && hasUpgrade(this.layer, this.id))
				);
			},
		},
		54: {
			title: "Basic Ultrafuel Formula",
			description: "1e20x Rocket Fuel",
			cost: new Decimal(6.66e116),
			unlocked() {
				return (
					(hasUpgrade("x", 12) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasUpgrade("x", 12) && hasUpgrade(this.layer, this.id))
				);
			},
		},
		55: {
			title: "Ultrafuel Engine",
			description: "Rocket cost is decreased based on Rocket Fuel",
			cost: new Decimal(1e250),
			effect() {
				return player.r.points.add(1).pow(0.07);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade("x", 12) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					(hasUpgrade("x", 12) && hasUpgrade(this.layer, this.id))
				);
			},
		},
	},
});

function previousUpgradeID(id) {
	if (id % 10 == 1) return id - 6;
	return id - 1;
}
