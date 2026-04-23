addLayer("darkenergy", {
	name: "dark energy",
	symbol: "",
	position: 1,
	row: 2,

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
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");

		if (layers[reset].row > this.row) {
			layerDataReset(this.layer, keep);

			const keepMilestonesFromUnstablefuel =
				hasMilestone("galaxy", 1) || hasMilestone("supernova", 1);

			const milestoneUpgrades = [15, 25, 35, 45, 55];
			const keptUpgrades = keepMilestonesFromUnstablefuel
				? milestoneUpgrades.filter((id) => hasUpgrade(this.layer, id))
				: [];

			keptUpgrades.forEach((id) => {
				player[this.layer].upgrades.push(id);
			});
		}
	},

	darkenergy() {
		if (
			player.energy.points.gt(1e6) &&
			player.darkmatter.points.gt(1e10) &&
			inChallenge("real", 11) &&
			player.supernova.points.gte(5)
		) {
			let baseValue = player.energy.points.add(1).pow(0.1);
			let DMmult = player.darkmatter.points.add(1).log10();
			let totalValue = baseValue.times(DMmult);

			if (hasUpgrade("galaxy", 62))
				totalValue = totalValue.times(upgradeEffect("galaxy", 62));
			if (hasUpgrade("blackhole", 44))
				totalValue = totalValue.times(upgradeEffect("blackhole", 44));
			if (hasUpgrade("galaxy", 81))
				totalValue = totalValue.times(upgradeEffect("galaxy", 81));
			if (hasUpgrade("blackhole", 54))
				totalValue = totalValue.times(upgradeEffect("blackhole", 54));
			if (hasUpgrade("universe", 163))
				totalValue = totalValue.times(upgradeEffect("universe", 163));
			if (totalValue.isNan()) {
				player.darkenergy.points = new Decimal(0);
			} else {
				player.darkenergy.points = new Decimal(totalValue);
			}
			return totalValue;
		} else {
			player.darkenergy.points = new Decimal(0);
			return new Decimal(0);
		}
	},

	requires: new Decimal(2),
	resource: "Dark Energy",
	baseResource: "Supernova Tiers",
	baseAmount() {
		return player.supernova.points;
	},
	type: "normal",
	exponent: 0.000000000000001,

	gainMult() {
		return new Decimal(1);
	},
});

addLayer("energy", {
	name: "energy",
	symbol: "",
	position: 1,
	row: 2,

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
		if (hasMilestone("supernova", 2)) return 1;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	requires: new Decimal(2),
	resource: "Energy",
	baseResource: "Supernova Tiers",
	baseAmount() {
		return player.supernova.points;
	},
	type: "normal",
	exponent: 0.000000000000001,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("supernova", 11))
			mult = mult.times(upgradeEffect("supernova", 11));
		if (hasUpgrade("supernova", 21))
			mult = mult.times(upgradeEffect("supernova", 21));
		if (hasUpgrade("supernova", 31))
			mult = mult.times(upgradeEffect("supernova", 31));
		if (hasUpgrade("supernova", 41))
			mult = mult.times(upgradeEffect("supernova", 41));
		if (hasUpgrade("supernova", 51))
			mult = mult.times(upgradeEffect("supernova", 51));
		mult = mult.times(buyableEffect("blackhole", 11));
		if (hasMilestone("universe", 1)) mult = mult.times(2);
		if (hasUpgrade("universe", 43)) mult = mult.times(3);
		if (hasMilestone("universe", 2)) mult = mult.times(2);
		if (hasUpgrade("universe", 101)) mult = mult.times(5);
		if (hasUpgrade("universe", 172)) mult = mult.times(100);
		if (hasUpgrade("universe", 181)) mult = mult.times(99999);
		mult = mult.times(player.negativeinfinity.points.add(1));

		return mult;
	},
});

addLayer("supernova", {
	name: "Supernova",
	position: 1,
	row: 2,

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			bulkBuy: false,
			supernovaColors: [
				"#eaad22",
				"#ff6b35",
				"#ff2e63",
				"#ff00ae",
				"#b5179e",
				"#8f1add",
				"#3a0ca3",
				"#2c78bb",
				"#0088ff",
				"#21d4db",
				"#09f45f",
				"#9eff66",
				"#d4ffbb",
				"#ffffff",
				"#ffffff",
			],
		};
	},

	symbol() {
		if (options.emojisEnabled) return "🌟";
		return "SN";
	},

	milestonePopups() {
		if (options.SupernovaPopup == true) return true;
		return false;
	},

	nodeStyle() {
		const style = {
			"border-radius": "100px",
			width: "125px",
			height: "125px",
			"font-size": "50px",
		};

		const colors = player.supernova.supernovaColors;
		const tier = player.supernova.points.sub(1).toNumber();
		const currentColor = colors[tier] ?? "#eaad22";
		const prevColor = colors[tier - 1] ?? "#ea6222";

		style.background = `radial-gradient(${currentColor}, ${prevColor})`;

		if (options.emojisEnabled) style.color = "white";
		return style;
	},

	tooltip() {
		return "Supernova Tier " + player[this.layer].points;
	},

	shouldNotify() {
		if (canReset(this.layer) && player.supernova.points.gte(10)) return true;
	},

	glowColor() {
		const colors = player.supernova.supernovaColors;
		const tier = player.supernova.points.sub(1).toNumber();
		if (canReset(this.layer) && inChallenge("real", 11))
			return colors[tier] ?? "#eaad22";
		else return "red";
	},

	layerShown() {
		if (inChallenge("real", 11) && inChallenge("universe", 22)) return false;

		if (hasMilestone("unstablefuel", 9) && inChallenge("real", 11)) return true;
		if (player[this.layer].points.gte(1) && inChallenge("real", 11))
			return true;
		if (player.supernova.unlocked && inChallenge("real", 11)) return true;
		return false;
	},

	update(diff) {
		if (inChallenge("real", 11) && hasMilestone("unstablefuel", 9))
			player[this.layer].unlocked = true;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	resetsNothing() {
		if (hasUpgrade("negativeinfinity", 42)) return true;
		return false;
	},

	autoPrestige() {
		if (hasUpgrade("negativeinfinity", 43)) return true;
		return false;
	},
	autoUpgrade() {
		if (hasUpgrade("negativeinfinity", 41)) return true;
		if (hasMilestone("universe", 3)) return true;
		return false;
	},

	branches: ["darkmatter", "galaxy"],
	color() {
		const colors = player.supernova.supernovaColors;
		const tier = player.supernova.points.sub(1).toNumber();
		return colors[tier] ?? "#eaad22";
	},

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);

		if (player[this.layer].bulkBuy && canResetNow)
			return `+<b>${getResetGain(
				this.layer,
				"static",
			)}</b> Supernova Tiers<br><br>Next at ${format(
				getNextAt(this.layer, (canMax = true), "normal"),
			)} Unstable Rocket Fuel`;

		if (canResetNow) return `+<b>1</b> Supernova Tier`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "normal"),
		)} Unstable Rocket Fuel`;
	},

	requires() {
		const pts = player[this.layer].points;
		if (inChallenge("real", 11) && inChallenge("universe", 22))
			return new Decimal("1eeeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffee9999");

		if (pts.gte(15)) return new Decimal("1eee9999");
		if (pts.gte(14)) return new Decimal("1eee9999");
		if (pts.gte(13)) return new Decimal("1eee9999");
		if (pts.gte(12)) return new Decimal("1e565");
		if (pts.gte(11)) return new Decimal("1e457");
		if (pts.gte(10)) return new Decimal("1e400");
		if (pts.gte(9)) return new Decimal(1e300);
		if (pts.gte(8)) return new Decimal(1e227);
		if (pts.gte(7)) return new Decimal(1e154);
		if (pts.gte(6)) return new Decimal(1e107);
		if (pts.gte(5)) return new Decimal(1e85);
		if (pts.gte(4)) return new Decimal(1e54);
		if (pts.gte(3)) return new Decimal(1e31);
		if (pts.gte(2)) return new Decimal(1e29);
		if (pts.gte(1)) return new Decimal(1e25);
		return new Decimal(1e22);
	},

	resource: "Supernova Tier",
	baseResource: "Unstable Rocket Fuel",
	baseAmount() {
		return player.unstablefuel.points;
	},
	type: "normal",

	gainMult() {
		return new Decimal(1);
	},

	hotkeys: [
		{
			key: "n",
			description: "N: Press for Supernova Reset",
			onPress() {
				if (canReset(this.layer) && inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	tabFormat: {
		Main: {
			content: [
				[
					"display-text",
					function () {
						const index = player.supernova.points.sub(1);
						const color = player.supernova.supernovaColors[index];
						return `You are Supernova Tier 
						<h2><span style="color: ${color}; text-shadow: 0px 0px 10px ${color}; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.supernova.points)}
						</span></h2>`;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						if (!player.supernova.points.gte(2)) return "";

						return `You are gaining ${format(
							getResetGain("energy"),
						)} Energy per second`;
					},
				],
				"blank",
				"prestige-button",
				"blank",
			],
		},
		Tiers: {
			content: [
				[
					"display-text",
					function () {
						const index = player.supernova.points.sub(1);
						const color = player.supernova.supernovaColors[index];
						return `You are Supernova Tier 
						<h2><span style="color: ${color}; text-shadow: 0px 0px 10px ${color}; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.supernova.points)}
						</span></h2>`;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				["milestones", [1, 2, 3, 4, 5, 6, 7, 50, 51, 52, 53, 54, 55, 56, 57]],
			],
			unlocked() {
				return player.supernova.unlocked;
			},
		},
		Energy: {
			content: [
				[
					"display-text",
					function () {
						const index = player.supernova.points.sub(1);
						const color = player.supernova.supernovaColors[index];
						return `You are Supernova Tier 
						<h2><span style="color: ${color}; text-shadow: 0px 0px 10px ${color}; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.supernova.points)}
						</span></h2>`;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						return `You have 
						<h2><span style="color:rgb(248, 255, 48); text-shadow: 0px 0px 10px rgb(248, 255, 48); font-family: Lucida Console, Courier New, monospace">
							${format(player.energy.points)}</span></h2> Energy`;
					},
				],
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.supernova.points.gte(2);
			},
			buttonStyle() {
				return { "border-color": "rgb(202, 209, 0)" };
			},
		},
		"Dark Energy": {
			content: [
				[
					"display-text",
					function () {
						const index = player.supernova.points.sub(1);
						const color = player.supernova.supernovaColors[index];
						return `You are Supernova Tier 
						<h2><span style="color: ${color}; text-shadow: 0px 0px 10px ${color}; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.supernova.points)}
						</span></h2>`;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						return `You have ${format(
							player.energy.points,
						)} Energy and ${format(
							player.darkmatter.points,
						)} Dark Matter which grants you<br>
						<h2><span style="color:rgb(29, 8, 122); text-shadow: 0px 0px 10px rgb(29, 8, 122); font-family: Lucida Console, Courier New, monospace">
							${format(player.darkenergy.points)}</span></h2> Dark Energy`;
					},
				],
				"blank",
				["milestones", [8, 9, 10, 11, 12, 13, 14, 15]],
				"blank",
				[
					"display-text",
					function () {
						return `<div style="font-size: 1.5em;">Dark Distortions</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 8)) return "";
						return `<div style="font-size: 1.3em;">I: ${format(
							player.darkenergy.points.pow(0.7).add(1),
						)}x Unstable Rocket Fuel</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 9)) return "";
						return `<div style="font-size: 1.3em;">II: ${format(
							player.darkenergy.points.pow(0.4).add(1),
						)}% of Dark Matter/s</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 10)) return "";
						return `<div style="font-size: 1.3em;">III: ${format(
							player.darkenergy.points.pow(0.585).add(1),
						)}x Dark Matter</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 11)) return "";
						return `<div style="font-size: 1.3em;">IV: ${format(
							player.darkenergy.points.pow(0.9).add(1),
						)}x Unstable Rocket Fuel</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 12)) return "";
						return `<div style="font-size: 1.3em;">V: ${format(
							player.darkenergy.points.pow(0.1).add(1),
						)}x Void</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 13)) return "";
						return `<div style="font-size: 1.3em;">VI: ${format(
							player.darkenergy.points.pow(0.275).add(1),
						)}x Void</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 14)) return "";
						return `<div style="font-size: 1.3em;">VII: ${format(
							player.darkenergy.points.pow(1.3).add(1),
						)}x Unstable Rocket Fuel</div>`;
					},
				],
				[
					"display-text",
					function () {
						if (!hasMilestone("supernova", 15)) return "";
						return `<div style="font-size: 1.3em;">VIII: ${format(
							player.darkenergy.points.pow(0.2).add(1),
						)}% of Void/s</div>`;
					},
				],
				"blank",
			],
			unlocked() {
				return player.supernova.points.gte(5);
			},
			buttonStyle() {
				return { "border-color": "rgb(29, 8, 122)" };
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "Supernova Tier 1",
			effectDescription:
				"Keep Unstable Rocket Fuel Milestones, 3x Unstable Rocket Fuel, 3x Cosmic Dust, 3x Dark Matter",
			done() {
				return player[this.layer].points.gte(1);
			},
			unlocked() {
				return player[this.layer].points.gte(1);
			},
		},
		2: {
			requirementDescription: "Supernova Tier 2",
			effectDescription:
				"Unlock Energy, 2x Unstable Rocket Fuel, 3x Cosmic Dust, 3x Dark Matter",
			done() {
				return player[this.layer].points.gte(2);
			},
			unlocked() {
				return player[this.layer].points.gte(1);
			},
		},
		3: {
			requirementDescription: "Supernova Tier 3",
			effectDescription:
				"Auto-buy Unstable Rocket Fuel Upgrades, 3x Unstable Rocket Fuel, 3x Cosmic Dust",
			done() {
				return player[this.layer].points.gte(3);
			},
			unlocked() {
				return player[this.layer].points.gte(2);
			},
		},
		4: {
			requirementDescription: "Supernova Tier 4",
			effectDescription:
				"Bulk buy Galaxies, Unlock 5 Cosmos Upgrades, 5x Unstable Rocket Fuel",
			done() {
				return player[this.layer].points.gte(4);
			},
			unlocked() {
				return player[this.layer].points.gte(3);
			},
		},
		5: {
			requirementDescription: "Supernova Tier 5",
			effectDescription: "Unlock Dark Energy, 5x Unstable Rocket Fuel",
			done() {
				return player[this.layer].points.gte(5);
			},
			unlocked() {
				return player[this.layer].points.gte(4);
			},
		},
		6: {
			requirementDescription: "Supernova Tier 6",
			effectDescription: "Keep Galaxy Milestones, 5x Unstable Rocket Fuel",
			done() {
				return player[this.layer].points.gte(6);
			},
			unlocked() {
				return player[this.layer].points.gte(5);
			},
		},
		7: {
			requirementDescription: "Supernova Tier 7",
			effectDescription: "Unlock The Black Hole",
			done() {
				return player[this.layer].points.gte(7);
			},
			unlocked() {
				return player[this.layer].points.gte(6);
			},
		},
		8: {
			requirementDescription() {
				return formatWhole(new Decimal(10)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion I",
			done() {
				return player.darkenergy.points.gte(10);
			},
			unlocked() {
				return player.darkenergy.points.gte(0);
			},
		},
		9: {
			requirementDescription() {
				return formatWhole(new Decimal(100)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion II",
			done() {
				return player.darkenergy.points.gte(100);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		10: {
			requirementDescription() {
				return formatWhole(new Decimal(200)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion III",
			done() {
				return player.darkenergy.points.gte(200);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		11: {
			requirementDescription() {
				return formatWhole(new Decimal(1000)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion IV",
			done() {
				return player.darkenergy.points.gte(1000);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		12: {
			requirementDescription() {
				return formatWhole(new Decimal(5000)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion V",
			done() {
				return player.darkenergy.points.gte(5000);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		13: {
			requirementDescription() {
				return formatWhole(new Decimal(30000)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion VI",
			done() {
				return player.darkenergy.points.gte(30000);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		14: {
			requirementDescription() {
				return formatWhole(new Decimal(750000)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion VII",
			done() {
				return player.darkenergy.points.gte(750000);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		15: {
			requirementDescription() {
				return formatWhole(new Decimal(3e6)) + " Dark Energy";
			},
			effectDescription: "Unlock Dark Distortion VIII",
			done() {
				return player.darkenergy.points.gte(3e6);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
		50: {
			requirementDescription: "Supernova Tier 8",
			effectDescription: "Unlock 5 Cosmos Upgrades, 10x Void",
			done() {
				return player[this.layer].points.gte(8);
			},
			unlocked() {
				return player[this.layer].points.gte(7);
			},
		},
		51: {
			requirementDescription: "Supernova Tier 9",
			effectDescription() {
				return (
					"Bulk buy Dark Matter Buyables, " +
					formatWhole(new Decimal(1e10)) +
					"x Unstable Rocket Fuel, 10x Void"
				);
			},
			done() {
				return player[this.layer].points.gte(9);
			},
			unlocked() {
				return player[this.layer].points.gte(8);
			},
		},
		52: {
			requirementDescription: "Supernova Tier 10",
			effectDescription: "Unlock Universes",
			done() {
				return player[this.layer].points.gte(10);
			},
			unlocked() {
				return player[this.layer].points.gte(9);
			},
		},
		53: {
			requirementDescription: "Supernova Tier 11",
			effectDescription() {
				return formatWhole(new Decimal(1e15)) + "x Unstable Rocket Fuel";
			},
			done() {
				return player[this.layer].points.gte(11);
			},
			unlocked() {
				return player[this.layer].points.gte(10);
			},
		},
		54: {
			requirementDescription: "Supernova Tier 12",
			effectDescription() {
				return formatWhole(new Decimal(1e20)) + "x Unstable Rocket Fuel";
			},
			done() {
				return player[this.layer].points.gte(12);
			},
			unlocked() {
				return player[this.layer].points.gte(11);
			},
		},
		55: {
			requirementDescription: "Supernova Tier 13",
			effectDescription() {
				return formatWhole(new Decimal(1e25)) + "x Unstable Rocket Fuel";
			},
			done() {
				return player[this.layer].points.gte(13);
			},
			unlocked() {
				return player[this.layer].points.gte(12);
			},
		},
		56: {
			requirementDescription: "Supernova Tier 14",
			effectDescription() {
				return formatWhole(new Decimal(1e30)) + "x Unstable Rocket Fuel";
			},
			done() {
				return player[this.layer].points.gte(14);
			},
			unlocked() {
				return player[this.layer].points.gte(13);
			},
		},
		57: {
			requirementDescription: "Supernova Tier 15",
			effectDescription() {
				return formatWhole(new Decimal(1e35)) + "x Unstable Rocket Fuel";
			},
			done() {
				return player[this.layer].points.gte(15);
			},
			unlocked() {
				return player[this.layer].points.gte(14);
			},
		},
	},

	upgrades: {
		11: {
			title: "Energetic Energy",
			description: "Energy gain is increased based on Energy",
			cost: new Decimal(10),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			effect() {
				let baseEffect = player.energy.points.add(1).pow(0.2);
				if (baseEffect.gt(10))
					baseEffect = new Decimal(10).plus(baseEffect.minus(10).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = format(effectValue) + "x";
				if (effectValue.gt(10)) display += " (Softcapped)";
				return display;
			},
		},
		12: {
			title: "Charged Money",
			description: "Money gain is increased based on Energy",
			cost: new Decimal(50),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.4);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
		},
		13: {
			title: "Cosmic Energy",
			description: "Cosmic Rays formula is increased based on Energy",
			cost: new Decimal(100),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).log10().div(3.5).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		14: {
			title: "Charged Fuel",
			description: "Unstable Rocket Fuel gain is increased based on Energy",
			cost: new Decimal(200),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.14);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		15: {
			title: "Milestone",
			description: "Unlock Unstable Milestone X",
			cost: new Decimal(300),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
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
			title: "Energetic Energy II",
			description: "Energy gain is increased based on Energy",
			cost: new Decimal(100),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasMilestone("supernova", 3) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				let baseEffect = player.energy.points.add(1).pow(0.3);
				if (baseEffect.gt(25))
					baseEffect = new Decimal(25).plus(baseEffect.minus(25).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = format(effectValue) + "x";
				if (effectValue.gt(25)) display += " (Softcapped)";
				return display;
			},
		},
		22: {
			title: "Charged Money II",
			description: "Money gain is increased based on Energy",
			cost: new Decimal(500),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.43);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
		},
		23: {
			title: "Cosmic Energy II",
			description: "Cosmic Rays formula is increased based on Energy",
			cost: new Decimal(1000),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).log10().div(8).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		24: {
			title: "Charged Fuel II",
			description: "Unstable Rocket Fuel gain is increased based on Energy",
			cost: new Decimal(1500),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.19);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		25: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XI",
			cost: new Decimal(2000),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
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
			title: "Energetic Energy III",
			description: "Energy gain is increased based on Energy",
			cost: new Decimal(1000),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasMilestone("supernova", 4) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				let baseEffect = player.energy.points.add(1).pow(0.34);
				if (baseEffect.gt(50))
					baseEffect = new Decimal(50).plus(baseEffect.minus(50).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = format(effectValue) + "x";
				if (effectValue.gt(50)) display += " (Softcapped)";
				return display;
			},
		},
		32: {
			title: "Charged Money III",
			description: "Money gain is increased based on Energy",
			cost: new Decimal(100000),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.46);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
		},
		33: {
			title: "Cosmic Energy III",
			description: "Cosmic Rays formula is increased based on Energy",
			cost: new Decimal(200000),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).log10().div(10).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		34: {
			title: "Charged Fuel III",
			description: "Unstable Rocket Fuel gain is increased based on Energy",
			cost: new Decimal(3e5),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.2);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		35: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XII",
			cost: new Decimal(5e5),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
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
			title: "Energetic Energy IV",
			description: "Energy gain is increased based on Energy",
			cost: new Decimal(1e6),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasMilestone("supernova", 5) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				let baseEffect = player.energy.points.add(1).pow(0.25);
				if (baseEffect.gt(100))
					baseEffect = new Decimal(100).plus(baseEffect.minus(100).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = format(effectValue) + "x";
				if (effectValue.gt(100)) display += " (Softcapped)";
				return display;
			},
		},
		42: {
			title: "Charged Money IV",
			description: "Money gain is increased based on Energy",
			cost: new Decimal(1e7),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.49);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
		},
		43: {
			title: "Cosmic Energy IV",
			description: "Cosmic Rays formula is increased based on Energy",
			cost: new Decimal(2.5e7),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).log10().div(15).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		44: {
			title: "Charged Fuel IV",
			description: "Unstable Rocket Fuel gain is increased based on Energy",
			cost: new Decimal(5e7),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.22);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		45: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XV",
			cost: new Decimal(1e8),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
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
			title: "Energetic Energy V",
			description: "Energy gain is increased based on Energy",
			cost: new Decimal(1e8),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					(hasMilestone("supernova", 6) &&
						hasUpgrade(this.layer, previousUpgradeID(this.id))) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				let baseEffect = player.energy.points.add(1).pow(0.21);
				if (baseEffect.gt(250))
					baseEffect = new Decimal(250).plus(baseEffect.minus(250).log2());
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = format(effectValue) + "x";
				if (effectValue.gt(250)) display += " (Softcapped)";
				return display;
			},
		},
		52: {
			title: "Charged Money V",
			description: "Money gain is increased based on Energy",
			cost: new Decimal(5e9),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.52);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
		},
		53: {
			title: "Cosmic Energy V",
			description: "Cosmic Rays formula is increased based on Energy",
			cost: new Decimal(1e10),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).log10().div(22).add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		54: {
			title: "Charged Fuel V",
			description: "Unstable Rocket Fuel gain is increased based on Energy",
			cost: new Decimal(2e10),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			effect() {
				return player.energy.points.add(1).pow(0.234);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
		},
		55: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XVII",
			cost: new Decimal(5e10),
			currencyDisplayName: "Energy",
			currencyLocation() {
				return player.energy;
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
