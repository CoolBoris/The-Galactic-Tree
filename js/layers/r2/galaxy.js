addLayer("cosmicdust", {
	name: "cosmicdust",
	symbol: "",
	position: 1,
	row: 1,

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	layerShown() {
		return false;
	},

	passiveGeneration() {
		if (!inChallenge("real", 11)) return 0;
		if (hasMilestone("unstablefuel", 8)) return 0.07;
		if (hasMilestone("unstablefuel", 5)) return 0.04;
		return 0.01;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	requires: new Decimal(3),
	resource: "Cosmic Dust",
	baseResource: "Galaxies",
	baseAmount() {
		return player.galaxy.points;
	},
	type: "normal",
	exponent: 2.5,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("galaxy", 12)) mult = mult.times(2);
		if (hasUpgrade("galaxy", 24)) mult = mult.times(3);
		mult = mult.times(buyableEffect("darkmatter", 13));
		if (hasMilestone("supernova", 1)) mult = mult.times(3);
		if (hasMilestone("supernova", 2)) mult = mult.times(3);
		if (hasMilestone("unstablefuel", 12)) mult = mult.times(10);
		if (hasUpgrade("blackhole", 23))
			mult = mult.times(upgradeEffect("blackhole", 23));
		if (hasUpgrade("blackhole", 32))
			mult = mult.times(upgradeEffect("blackhole", 32));
		if (hasUpgrade("universe", 81))
			mult = mult.times(upgradeEffect("universe", 81));

		if (challengeCompletions("blackhole", 11) >= 3) {
			mult = mult.times(
				new Decimal(50).pow(challengeCompletions("blackhole", 11)),
			);
		}
		if (hasMilestone("unstablefuel", 22)) mult = mult.times(5e6);
		if (hasMilestone("unstablefuel", 23)) mult = mult.times(5e8);
		if (hasUpgrade("universe", 131))
			mult = mult.times(upgradeEffect("universe", 131));
		if (hasUpgrade("universe", 132))
			mult = mult.times(upgradeEffect("universe", 132));
		if (hasUpgrade("universe", 171))
			mult = mult.times(upgradeEffect("universe", 171));
		if (hasMilestone("unstablefuel", 26)) mult = mult.times(1e10);
		if (hasUpgrade("universe", 181)) mult = mult.times(9.99e15);
		mult = mult.times(player.negativeinfinity.points.add(1));

		return mult;
	},

	logCosmicRays() {
		if (player[this.layer].points > 0.01 && inChallenge("real", 11)) {
			let baseLog = player[this.layer].points.log10().add(1);
			let logarithmicValue = baseLog;

			if (hasUpgrade("galaxy", 22)) logarithmicValue *= baseLog;
			if (hasMilestone("darkmatter", 1))
				logarithmicValue *= player[this.layer].points.log10().div(2.435).add(1);
			if (hasUpgrade("galaxy", 43)) {
				let log2Effect = new Decimal(player[this.layer].points).add(1).log(2);
				logarithmicValue = new Decimal(logarithmicValue).add(
					log2Effect.times(log2Effect.div(6.3)),
				);
			}
			if (hasUpgrade("galaxy", 22))
				logarithmicValue = new Decimal(logarithmicValue).times(baseLog);
			if (hasMilestone("darkmatter", 1))
				logarithmicValue = new Decimal(logarithmicValue).times(
					player[this.layer].points.log10().div(2.435).add(1),
				);
			if (hasUpgrade("supernova", 13))
				logarithmicValue = new Decimal(logarithmicValue).times(
					upgradeEffect("supernova", 13),
				);
			if (hasUpgrade("supernova", 23))
				logarithmicValue = new Decimal(logarithmicValue).times(
					upgradeEffect("supernova", 23),
				);
			if (hasUpgrade("supernova", 33))
				logarithmicValue = new Decimal(logarithmicValue).times(
					upgradeEffect("supernova", 33),
				);
			if (hasUpgrade("supernova", 43))
				logarithmicValue = new Decimal(logarithmicValue).times(
					upgradeEffect("supernova", 43),
				);
			if (hasUpgrade("supernova", 53))
				logarithmicValue = new Decimal(logarithmicValue).times(
					upgradeEffect("supernova", 53),
				);
			if (hasUpgrade("galaxy", 51))
				logarithmicValue = new Decimal(logarithmicValue).times(
					player.points.log10().pow(0.15).add(1),
				);
			if (hasUpgrade("galaxy", 72))
				logarithmicValue = new Decimal(logarithmicValue).times(
					player.points.log2().pow(0.01).add(1),
				);

			player.cosmicrays.points = new Decimal(logarithmicValue);
			return logarithmicValue;
		} else {
			player.cosmicrays.points = new Decimal(0);
			return 0;
		}
	},
});

addLayer("cosmicrays", {
	name: "cosmicrays",
	symbol: "",
	position: 1,
	row: 1,

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	layerShown() {
		return false;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	requires: new Decimal(1),
	resource: "Cosmic Rays",
	baseResource: "Cosmic Dust",
	baseAmount() {
		return player.cosmicdust.points;
	},
	type: "normal",
	exponent: 0.01,

	gainMult() {
		return new Decimal(1);
	},
});

addLayer("galaxy", {
	name: "Galaxy",
	position: 1,
	row: 1,

	startData() {
		return {
			unlocked: false,
			bulkBuy: false,
			points: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled) return "🌌";
		return "G";
	},

	nodeStyle() {
		const style = { "border-radius": "100px" };
		if (options.emojisEnabled) style.color = "white";
		return style;
	},

	layerShown() {
		if (inChallenge("real", 11) && inChallenge("universe", 12)) return false;

		if (hasMilestone("unstablefuel", 3) && inChallenge("real", 11)) return true;
		if (player[this.layer].points.gte(1) && inChallenge("real", 11))
			return true;
		if (player.galaxy.unlocked && inChallenge("real", 11)) return true;

		return false;
	},

	milestonePopups() {
		if (options.GalaxyMilestonePopup == true) return true;
		return false;
	},

	doReset(reset) {
		let keep = [];
		if (hasMilestone("supernova", 6)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");

		if (layers[reset].row > this.row) {
			const milestoneUpgrades = [15, 25, 35, 45, 55, 65, 75];

			// Check if supernova/galaxy are being reset by this reset chain
			const supernovaIsReset = layers[reset].row > layers["supernova"].row;
			const galaxyIsReset = layers[reset].row > layers["galaxy"].row;

			const keepMilestonesFromUnstablefuel =
				(!galaxyIsReset && hasMilestone("galaxy", 1)) ||
				(!supernovaIsReset && hasMilestone("supernova", 1));

			const keptUpgrades = keepMilestonesFromUnstablefuel
				? milestoneUpgrades.filter((id) => hasUpgrade(this.layer, id))
				: [];

			layerDataReset(this.layer, keep);

			keptUpgrades.forEach((id) => {
				player[this.layer].upgrades.push(id);
			});
		}
	},

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);

		if (player.galaxy.bulkBuy && canResetNow)
			return `+<b>${getResetGain(
				this.layer,
				"static",
			)}</b> Galaxies<br><br>Next at ${format(
				getNextAt(this.layer, (canMax = true), "static"),
			)} Unstable Rocket Fuel`;

		if (canResetNow) return `+<b>1</b> Galaxy`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "static"),
		)} Unstable Rocket Fuel`;
	},

	canBuyMax() {
		if (hasMilestone("supernova", 4)) {
			player.galaxy.bulkBuy = true;
			return true;
		}

		if (hasUpgrade("negativeinfinity", 21)) {
			player.galaxy.bulkBuy = true;
			return true;
		}
	},

	resetsNothing() {
		if (hasMilestone("blackhole", 2)) return true;
		if (hasUpgrade("negativeinfinity", 22)) return true;
		return false;
	},

	autoUpgrade() {
		if (hasUpgrade("negativeinfinity", 24)) return true;

		if (hasMilestone("blackhole", 1)) return true;
		return false;
	},

	autoPrestige() {
		if (hasUpgrade("negativeinfinity", 23)) return true;

		if (hasMilestone("blackhole", 4)) return true;
		return false;
	},

	branches: ["unstablefuel"],
	color: "#1b1357",
	requires: new Decimal(2500),
	resource: "Galaxies",
	baseResource: "Unstable Rocket Fuel",
	baseAmount() {
		return player.unstablefuel.points;
	},
	type: "static",
	exponent() {
		let exp = 1.25;

		// Always consider what points will be after any pending reset
		const pts = player.galaxy.points.add(getResetGain("galaxy", "static"));

		if (pts.gte(10)) exp = 1.275;
		if (pts.gte(20)) exp = 1.3;

		return exp;
	},

	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("unstablefuel", 4)) mult = mult.divide(5);
		if (hasUpgrade(this.layer, 21))
			mult = mult.divide(upgradeEffect(this.layer, 21));

		mult = mult.divide(buyableEffect("blackhole", 12));

		if (inChallenge("real", 11) && inChallenge("universe", 12))
			mult = mult.times("fffff9");
		if (hasUpgrade("universe", 141))
			mult = mult.divide(upgradeEffect("universe", 141));
		mult = mult.divide(player.negativeinfinity.points.add(1));

		return mult;
	},

	effect() {
		return new Decimal(2).pow(player[this.layer].points);
	},

	effectDescription() {
		return (
			"which multiply Unstable Rocket Fuel gain by " +
			format(tmp.galaxy.effect) +
			"x"
		);
	},

	hotkeys: [
		{
			key: "g",
			description: "G: Press for Galaxy Reset",
			onPress() {
				if (canReset(this.layer) && inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	tabFormat: {
		Main: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						if (!player.galaxy.points.gte(3)) return "";

						let resetGain = getResetGain("cosmicdust");
						let passive = tmp.cosmicdust.passiveGeneration;
						let dustPerSecond = new Decimal(resetGain).times(passive);

						return `You are gaining ${format(
							dustPerSecond,
						)} Cosmic Dust per second`;
					},
				],
				"blank",
				"prestige-button",
				"blank",
			],
		},
		Galaxies: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
			unlocked() {
				return player.galaxy.unlocked;
			},
		},
		"The Cosmos": {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						return `You have 
                        <h2><span style="color:rgb(111, 250, 255); text-shadow: 0px 0px 20px rgb(105, 164, 173); font-family: Lucida Console, Courier New, monospace">
                            ${format(
															player.cosmicdust.points,
														)}</span></h2> Cosmic Dust which grants you
                        <h2><span style="color:rgb(250, 211, 111); text-shadow: 0px 0px 20px rgb(173, 146, 105); font-family: Lucida Console, Courier New, monospace">
                            ${format(
															player.cosmicrays.points,
														)}</span></h2> Cosmic Rays`;
					},
				],
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.galaxy.points.gte(3) || hasMilestone("galaxy", 2);
			},
			buttonStyle() {
				return { "border-color": "rgb(111, 250, 255)" };
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "Milky Way Galaxy (1 Galaxy)",
			effectDescription: "Keep Unstable Rocket Fuel Milestones",
			done() {
				return player.galaxy.points.gte(1);
			},
		},
		2: {
			requirementDescription: "Andromeda Galaxy (3 Galaxies)",
			effectDescription: "Unlock The Cosmos",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.galaxy.points.gte(3);
			},
		},
		3: {
			requirementDescription: "Sombrero Galaxy (10 Galaxies)",
			effectDescription: "Unlock Dark Matter",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.galaxy.points.gte(10);
			},
		},
		4: {
			requirementDescription: "Whirlpool Galaxy (15 Galaxies)",
			effectDescription:
				"Auto-buy Unstable Rocket Fuel Upgrades, Keep Dark Matter Milestones",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.galaxy.points.gte(15);
			},
		},
	},

	upgrades: {
		11: {
			title: "Cosmic Boost",
			description: "Money gain is increased based on Cosmic Dust",
			cost: new Decimal(0.2),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			effect() {
				let baseEffect = player.cosmicdust.points.add(1).pow(0.4);
				if (baseEffect.gt(100))
					baseEffect = new Decimal(100).plus(baseEffect.minus(100).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effectValue);
				if (effectValue.gt(100)) display += " (Softcapped)";
				return display;
			},
		},
		12: {
			title: "Cosmic Travel",
			description: "2x Cosmic Dust",
			cost: new Decimal(0.5),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		13: {
			title: "Unstable Cosmos",
			description: "Unlock 5 Unstable Rocket Fuel Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		14: {
			title: "Unstable Galaxy",
			description: "2x Unstable Rocket Fuel",
			cost: new Decimal(1.4),
			stringCost: "1.40 Cosmic Rays",
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		15: {
			title: "Milestone",
			description: "Unlock Unstable Milestone IV",
			cost: new Decimal(1.8),
			stringCost: "1.80 Cosmic Rays",
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		21: {
			title: "Space Smoothie",
			description: "Galaxy Cost is decreased based on Cosmic Dust",
			cost: new Decimal(2),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicdust.points.add(1).log10().add(1);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
		},
		22: {
			title: "Cosmic Rays Deluxe",
			description: "Better Cosmic Rays Formula",
			cost: new Decimal(2.2),
			stringCost: "2.20 Cosmic Rays",
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		23: {
			title: "Unstable Rays",
			description:
				"Unstable Rocket Fuel gain is increased based on Cosmic Rays",
			cost: new Decimal(5.4),
			stringCost: "5.40 Cosmic Rays",

			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).log2();
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		24: {
			title: "Cosmic Travel II",
			description: "3x Cosmic Dust",
			cost: new Decimal(7),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		25: {
			title: "Milestone",
			description: "Unlock Unstable Milestone VI",
			cost: new Decimal(10),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		31: {
			title: "Dark Rays",
			description: "Dark Matter gain is increased based on Cosmic Rays",
			cost: new Decimal(25),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.div(1.5).add(1).log(10);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		32: {
			title: "Unstable Rays II",
			description:
				"Unstable Rocket Fuel gain is increased based on Cosmic Rays",
			cost: new Decimal(28),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).times(0.8).log2();
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		33: {
			title: "Cosmic Travel III",
			description: "4x Cosmic Dust",
			cost: new Decimal(40),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		34: {
			title: "Dark Travel",
			description: "2x Dark Matter",
			cost: new Decimal(43),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		35: {
			title: "Milestone",
			description: "Unlock Unstable Milestone VII",
			cost: new Decimal(50),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		41: {
			title: "Dark Travel II",
			description: "3x Dark Matter",
			cost: new Decimal(60),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		42: {
			title: "Dark Rays II",
			description: "Dark Matter gain is increased based on Cosmic Rays",
			cost: new Decimal(65),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.div(1.2).add(1).log10();
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		43: {
			title: "Cosmic Rays Deluxe II",
			description: "Better Cosmic Rays Formula",
			cost: new Decimal(77),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		44: {
			title: "Cosmic Boost II",
			description: "Money gain is increased based on Cosmic Dust",
			cost: new Decimal(111),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				let baseEffect = player.cosmicdust.points.add(1).pow(0.43);
				if (baseEffect.gt(1000))
					baseEffect = new Decimal(1000).plus(baseEffect.minus(250).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effectValue);
				if (effectValue.gt(1000)) display += " (Softcapped)";
				return display;
			},
		},
		45: {
			title: "Milestone",
			description: "Unlock Unstable Milestone IX",
			cost: new Decimal(133),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		51: {
			title: "Cosmic Rays Deluxe III",
			description: "Better Cosmic Rays Formula",
			cost: new Decimal(750),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("supernova", 4)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		52: {
			title: "Dark Travel III",
			description: "4x Dark Matter",
			cost: new Decimal(3500),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		53: {
			title: "Unstable Rays III",
			description:
				"Unstable Rocket Fuel gain is increased based on Cosmic Rays",
			cost: new Decimal(4444),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).log2();
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		54: {
			title: "Ultimate",
			description: "2000x Unstable Rocket Fuel",
			cost: new Decimal(7500),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		55: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XIV",
			cost: new Decimal(8888),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		61: {
			title: "Dark Travel IV",
			description: "10x Dark Matter",
			cost: new Decimal(30000),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("darkmatter", 3)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		62: {
			title: "Cosmic Energy",
			description: "Dark Energy gain is increased based on Cosmic Rays",
			cost: new Decimal(37500),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).log10().pow(0.5);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		63: {
			title: "Unstable Cosmos II",
			description: "Unlock 5 Unstable Rocket Fuel Upgrades",
			cost: new Decimal(40000),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		64: {
			title: "Ultimate II",
			description: "5000x Unstable Rocket Fuel",
			cost: new Decimal(47777),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		65: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XVII",
			cost: new Decimal(50000),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		71: {
			title: "Unstable Rays IV",
			description:
				"Unstable Rocket Fuel gain is increased based on Cosmic Rays",
			cost: new Decimal(300000),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("supernova", 50)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).log2().pow(5);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		72: {
			title: "Cosmic Rays Deluxe IV",
			description: "Better Cosmic Rays Formula",
			cost: new Decimal(425000),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		73: {
			title: "Void Galaxy",
			description: "Void Gain is increased based on your Galaxies",
			cost: new Decimal(1e7),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			effect() {
				return new Decimal(2).pow(player.galaxy.points.add(1).pow(0.5));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		74: {
			title: "Void Galaxy II",
			description: "Void Gain is increased based on your Galaxies",
			cost: new Decimal(6e9),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			effect() {
				return new Decimal(2).pow(player.galaxy.points.add(1).pow(0.55));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		75: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XXI",
			cost: new Decimal(5e10),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		81: {
			title: "Cosmic Energy II",
			description: "Dark Energy gain is increased based on Cosmic Rays",
			cost: new Decimal(3e12),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("universe", 14)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).log10().pow(0.82);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		82: {
			title: "Dark Rays III",
			description: "Dark Matter gain is increased based on Cosmic Rays",
			cost: new Decimal(5e12),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.cosmicrays.points.add(1).pow(0.625);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		83: {
			title: "Unstable Galaxy",
			description:
				"Unstable Rocket Fuel Gain is increased based on your Galaxies",
			cost: new Decimal(7.7e12),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			effect() {
				return new Decimal(2).pow(player.galaxy.points.add(1).pow(0.6));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		84: {
			title: "Void Galaxy III",
			description: "Void Gain is increased based on your Galaxies",
			cost: new Decimal(1.03e13),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			effect() {
				return new Decimal(2).pow(player.galaxy.points.add(1).pow(0.5675));
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		85: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XXV",
			cost: new Decimal(1.8e13),
			currencyDisplayName: "Cosmic Rays",
			currencyLocation() {
				return player.cosmicrays;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},
});
