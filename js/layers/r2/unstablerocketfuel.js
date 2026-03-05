addLayer("unstablefuel", {
	name: "Unstable Rocket Fuel",
	symbol: "⛽",
	position: 1,
	row: 0,

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	update(diff) {
		if (inChallenge("real", 11)) {
			player[this.layer].unlocked = true;
		} else {
			player[this.layer].unlocked = false;
		}
	},

	symbol() {
		if (options.emojisEnabled == true) symbol = "⛽";
		else symbol = "URF";
		return symbol;
	},

	nodeStyle() {
		const style = {
			"border-radius": "100px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
		}

		return style;
	},

	layerShown() {
		return inChallenge("real", 11);
	},

	autoUpgrade() {
		if (hasMilestone("supernova", 3)) return true;
		if (hasMilestone("galaxy", 4)) return true;
		return false;
	},

	doReset(reset) {
		let keep = [];
		const keepMilestonesFromUnstablefuel =
			hasMilestone("galaxy", 1) || hasMilestone("supernova", 1);
		if (keepMilestonesFromUnstablefuel) keep.push("milestones");
		if (hasMilestone("supernova", 6)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");

		const milestoneUpgrades = [15, 25, 35, 45, 55, 65];
		const keptUpgrades = keepMilestonesFromUnstablefuel
			? milestoneUpgrades.filter((id) => hasUpgrade(this.layer, id))
			: [];

		if (layers[reset].row > this.row) {
			layerDataReset(this.layer, keep);
			keptUpgrades.forEach((id) => {
				player[this.layer].upgrades.push(id);
			});
		}
	},

	passiveGeneration() {
		if (!inChallenge("real", 11)) return 0;
		if (hasMilestone(this.layer, 7))
			return (
				(getBuyableAmount("darkmatter", 21).add(12) ?? new Decimal(0)) / 100
			);
		if (hasMilestone(this.layer, 2)) return 0.12;
		return 0;
	},

	color: "#7b3b6e",
	requires: new Decimal(10),
	resource: "Unstable Rocket Fuel",
	baseResource: "Money",
	baseAmount() {
		return player.points;
	},

	type: "normal",
	exponent: 0.5,

	gainMult() {
		let mult = new Decimal(1);
		if (layers.galaxy.effect()?.gte(1) ?? false)
			mult = mult.times(layers.galaxy.effect());
		if (hasMilestone(this.layer, 1)) mult = mult.times(2);
		if (hasUpgrade(this.layer, 21)) mult = mult.times(1.5);
		if (hasUpgrade(this.layer, 22)) mult = mult.times(1.25);
		if (hasUpgrade(this.layer, 23))
			mult = mult.times(upgradeEffect(this.layer, 23));
		if (hasUpgrade(this.layer, 31)) mult = mult.times(2);
		if (hasUpgrade(this.layer, 32)) mult = mult.times(1.5);
		if (hasUpgrade(this.layer, 33)) mult = mult.times(1.2);
		if (hasUpgrade(this.layer, 34))
			mult = mult.times(upgradeEffect(this.layer, 34));
		if (hasUpgrade(this.layer, 41)) mult = mult.times(3);
		if (hasUpgrade(this.layer, 44))
			mult = mult.times(upgradeEffect(this.layer, 44));
		if (hasUpgrade("galaxy", 14)) mult = mult.times(2);
		if (hasUpgrade("galaxy", 23))
			mult = mult.times(upgradeEffect("galaxy", 23));
		if (hasMilestone(this.layer, 1))
			mult = mult.times(buyableEffect("darkmatter", 12));
		if (hasUpgrade("galaxy", 32))
			mult = mult.times(upgradeEffect("galaxy", 32));
		if (hasUpgrade(this.layer, 52))
			mult = mult.times(upgradeEffect(this.layer, 52));
		if (hasUpgrade(this.layer, 54))
			mult = mult.times(upgradeEffect(this.layer, 54));
		if (hasMilestone("supernova", 1)) mult = mult.times(3);
		if (hasMilestone("supernova", 2)) mult = mult.times(2);
		if (hasUpgrade("supernova", 14))
			mult = mult.times(upgradeEffect("supernova", 14));
		if (hasUpgrade("galaxy", 53))
			mult = mult.times(upgradeEffect("galaxy", 53));
		if (hasUpgrade(this.layer, 61))
			mult = mult.times(upgradeEffect(this.layer, 61));
		if (hasUpgrade(this.layer, 64))
			mult = mult.times(upgradeEffect(this.layer, 64));
		if (hasMilestone(this.layer, 11)) mult = mult.times(5);
		if (hasUpgrade("supernova", 24))
			mult = mult.times(upgradeEffect("supernova", 24));
		if (hasUpgrade("supernova", 34))
			mult = mult.times(upgradeEffect("supernova", 34));
		if (hasMilestone("supernova", 4)) mult = mult.times(5);
		if (hasUpgrade("galaxy", 54)) mult = mult.times(2000);
		if (hasMilestone(this.layer, 13)) mult = mult.times(1000);
		if (hasMilestone("supernova", 5)) mult = mult.times(5);
		if (hasUpgrade("supernova", 44))
			mult = mult.times(upgradeEffect("supernova", 44));
		if (hasMilestone("supernova", 6)) mult = mult.times(5);
		if (hasMilestone("supernova", 8))
			mult = mult.times(player.darkenergy.points.pow(0.7).add(1));
		if (hasUpgrade("supernova", 54))
			mult = mult.times(upgradeEffect("supernova", 54));
		if (hasUpgrade(this.layer, 71))
			mult = mult.times(upgradeEffect(this.layer, 71));
		if (hasMilestone(this.layer, 16)) mult = mult.times(1000);
		if (hasUpgrade("galaxy", 64)) mult = mult.times(5000);
		if (hasMilestone(this.layer, 19)) mult = mult.times(100);
		if (hasUpgrade(this.layer, 74))
			mult = mult.times(upgradeEffect(this.layer, 74));
		if (hasMilestone(this.layer, 17)) mult = mult.times(10000);
		if (hasUpgrade("blackhole", 11))
			mult = mult.times(upgradeEffect("blackhole", 11));
		if (hasUpgrade("blackhole", 14))
			mult = mult.times(upgradeEffect("blackhole", 14));
		if (hasUpgrade("blackhole", 22))
			mult = mult.times(upgradeEffect("blackhole", 22));
		if (hasUpgrade("galaxy", 71))
			mult = mult.times(upgradeEffect("galaxy", 71));
		if (hasUpgrade("blackhole", 24))
			mult = mult.times(upgradeEffect("blackhole", 24));
		if (hasMilestone("supernova", 51)) mult = mult.times(100);
		if (hasUpgrade("blackhole", 31))
			mult = mult.times(upgradeEffect("blackhole", 31));
		if (challengeCompletions("blackhole", 11) >= 2) {
			mult = mult.times(
				new Decimal(100).pow(challengeCompletions("blackhole", 11))
			);
		}

		if (inChallenge("real", 11) && inChallenge("blackhole", 11)) {
			mult = mult.pow(
				new Decimal(1).div(
					new Decimal(challengeCompletions("blackhole", 11)).plus(2).pow(2)
				)
			);
		}
		return mult;
	},

	gainExp() {
		let exp = new Decimal(1);
		return exp;
	},

	hotkeys: [
		{
			key: "",
			description: "",
			onPress() {
				if (canReset(this.layer) && inChallenge("real", 11))
					doReset(this.layer);
			},
		},
		{
			key: "n",
			description: "N: Press for Unstable Rocket Fuel Reset",
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
					"Reality II: Abyss",
					{
						color: "#5e4158",
						"font-size": "32px",
						"text-shadow": "0px 0px 20px #5e4158",
					},
				],
				"blank",
				"blank",
				"main-display",
				"resource-display",
				"blank",
				"prestige-button",
				"blank",
			],
		},
		Upgrades: {
			content: ["main-display", "prestige-button", "blank", "upgrades"],
		},
		Milestones: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
			unlocked() {
				return (
					hasUpgrade("unstablefuel", 15) || hasMilestone("unstablefuel", 1)
				);
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "Unstable Milestone I",
			effectDescription: "2x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade(this.layer, 11) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 15);
			},
		},
		2: {
			requirementDescription: "Unstable Milestone II",
			effectDescription: "12% of Unstable Rocket Fuel/s",
			unlocked() {
				return hasUpgrade(this.layer, 25) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 25);
			},
		},
		3: {
			requirementDescription: "Unstable Milestone III",
			effectDescription: "Unlock Galaxies",
			unlocked() {
				return hasUpgrade(this.layer, 35) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 35);
			},
		},
		4: {
			requirementDescription: "Unstable Milestone IV",
			effectDescription: "/5 Galaxy Price",
			unlocked() {
				return hasUpgrade("galaxy", 15) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 15);
			},
		},
		5: {
			requirementDescription: "Unstable Milestone V",
			effectDescription: "Improve Cosmic Dust Formula",
			unlocked() {
				return hasUpgrade(this.layer, 45) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 45);
			},
		},
		6: {
			requirementDescription: "Unstable Milestone VI",
			effectDescription: "3x Dark Matter",
			unlocked() {
				return hasUpgrade("galaxy", 25) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 25);
			},
		},
		7: {
			requirementDescription: "Unstable Milestone VII",
			effectDescription: "Unlock a new Dark Matter Buyable",
			unlocked() {
				return hasUpgrade("galaxy", 35) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 35);
			},
		},
		8: {
			requirementDescription: "Unstable Milestone VIII",
			effectDescription: "Improve Cosmic Dust Formula",
			unlocked() {
				return hasUpgrade(this.layer, 55) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 55);
			},
		},
		9: {
			requirementDescription: "Unstable Milestone IX",
			effectDescription: "Unlock Supernova",
			unlocked() {
				return hasUpgrade("galaxy", 45) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 45);
			},
		},
		10: {
			requirementDescription: "Unstable Milestone X",
			effectDescription: "5x Dark Matter",
			unlocked() {
				return hasUpgrade("supernova", 15) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("supernova", 15);
			},
		},
		11: {
			requirementDescription: "Unstable Milestone XI",
			effectDescription: "5x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade("supernova", 25) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("supernova", 25);
			},
		},
		12: {
			requirementDescription: "Unstable Milestone XII",
			effectDescription: "10x Cosmic Dust",
			unlocked() {
				return (
					hasUpgrade("unstablefuel", 65) || hasMilestone(this.layer, this.id)
				);
			},
			done() {
				return hasUpgrade("unstablefuel", 65);
			},
		},
		13: {
			requirementDescription: "Unstable Milestone XIII",
			effectDescription: "1,000x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade("supernova", 35) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("supernova", 35);
			},
		},
		14: {
			requirementDescription: "Unstable Milestone XIV",
			effectDescription: "10x Dark Matter",
			unlocked() {
				return hasUpgrade("galaxy", 55) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 55);
			},
		},
		15: {
			requirementDescription: "Unstable Milestone XV",
			effectDescription: "Auto-buy Dark Matter Buyables",
			unlocked() {
				return hasUpgrade("supernova", 45) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("supernova", 45);
			},
		},
		16: {
			requirementDescription: "Unstable Milestone XVI",
			effectDescription: "1,000x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade("galaxy", 65) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("galaxy", 65);
			},
		},
		17: {
			requirementDescription: "Unstable Milestone XVII",
			effectDescription: "10,000x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade("supernova", 55) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("supernova", 55);
			},
		},
		18: {
			requirementDescription: "Unstable Milestone XVIII",
			effectDescription: "2x Void",
			unlocked() {
				return hasUpgrade(this.layer, 75) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade(this.layer, 75);
			},
		},
		19: {
			requirementDescription: "Unstable Milestone XIX",
			effectDescription: "3x Void, 100x Unstable Rocket Fuel",
			unlocked() {
				return hasUpgrade("blackhole", 15) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("blackhole", 15);
			},
		},
		20: {
			requirementDescription: "Unstable Milestone XX",
			effectDescription: "Dark Matter Buyables cost nothing",
			unlocked() {
				return hasUpgrade("blackhole", 25) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("blackhole", 25);
			},
		},
		21: {
			requirementDescription: "Unstable Milestone XXI",
			effectDescription: "1% of Void/s",
			unlocked() {
				return hasUpgrade("blackhole", 45) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("blackhole", 45);
			},
		},
		22: {
			requirementDescription: "Unstable Milestone XXII",
			effectDescription: "1,000,000x Money",
			unlocked() {
				return hasUpgrade("blackhole", 55) || hasMilestone(this.layer, this.id);
			},
			done() {
				return hasUpgrade("blackhole", 55);
			},
		},
		23: {
			requirementDescription: "Unstable Milestone XXIII",
			effectDescription: "3x Void",
			unlocked() {
				return player.points.gte(1e300) || hasMilestone(this.layer, this.id);
			},
			done() {
				return player.points.gte(1e300);
			},
		},
	},

	upgrades: {
		11: {
			title: "Expiremental Rocket Fuel",
			description: "+1 money/s",
			cost: new Decimal(1),
		},
		12: {
			title: "Decayed Rocket Fuel",
			description: "+2 money/s",
			cost: new Decimal(3),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		13: {
			title: "Corrosive Rocket Fuel",
			description: "+3 money/s",
			cost: new Decimal(5),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		14: {
			title: "Unstable Rocket Fuel",
			description: "+4 money/s",
			cost: new Decimal(12),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		15: {
			title: "Milestone",
			description: "Unlock Unstable Milestone I",
			cost: new Decimal(20),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		21: {
			title: "Fuel Tanks Error",
			description: "1.5x Unstable Rocket Fuel",
			cost: new Decimal(35),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		22: {
			title: "Leaking Fuel",
			description: "1.25x Unstable Rocket Fuel",
			cost: new Decimal(50),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		23: {
			title: "Fuel Overflow",
			description:
				"Unstable Rocket Fuel gain is increased based on your Achievements",
			cost: new Decimal(80),
			effect() {
				return player.a.points.add(1).pow(0.2);
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
		24: {
			title: "Unstable Profit",
			description: "Money gain is increased based on your Secret Achievements",
			cost: new Decimal(125),
			effect() {
				return player.sa.points;
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		25: {
			title: "Milestone",
			description: "Unlock Unstable Milestone II",
			cost: new Decimal(200),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		31: {
			title: "Unstable Rockets",
			description: "2x Unstable Rocket Fuel",
			cost: new Decimal(300),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		32: {
			title: "Unpowered Rockets",
			description: "1.5x Unstable Rocket Fuel",
			cost: new Decimal(500),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		33: {
			title: "Corrupted Rocket Fuel",
			description: "1.2x Unstable Rocket Fuel",
			cost: new Decimal(700),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		34: {
			title: "Destroy Rocket Fuel",
			description: "Unstable Rocket Fuel gain is increased based on your Money",
			cost: new Decimal(999),
			effect() {
				return new Decimal(player.points.add(1).pow(0.11));
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
		35: {
			title: "Milestone",
			description: "Unlock Unstable Milestone III",
			cost: new Decimal(1111),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		41: {
			title: "Unstable Rockets II",
			description: "3x Unstable Rocket Fuel",
			cost: new Decimal(20000),
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasUpgrade("galaxy", 13)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		42: {
			title: "Galactic Money",
			description: "Money gain is increased based on your Galaxies",
			cost: new Decimal(1111111),
			effect() {
				return player.galaxy.points.add(1).times(2);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		43: {
			title: "Unstable Money",
			description: "Money gain is increased based on your Unstable Rocket Fuel",
			cost: new Decimal(2222222),
			effect() {
				return player[this.layer].points.add(1).log10().max(0);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		44: {
			title: "Galactic Fuel",
			description:
				"Unstable Rocket Fuel gain is increased based on your Galaxies",
			cost: new Decimal(3333333),
			effect() {
				return player.galaxy.points.add(1).log2().max(0);
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
		45: {
			title: "Milestone",
			description: "Unlock Unstable Milestone V",
			cost: new Decimal(5e6),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		51: {
			title: "Corrupted Money",
			description: "Money gain is increased based on your Unstable Rocket Fuel",
			cost: new Decimal(111111111),
			effect() {
				return player[this.layer].points.add(1).log2().add(1).max(1);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("darkmatter", 2)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		52: {
			title: "Dark Fuel",
			description:
				"Unstable Rocket Fuel gain is increased based on your Dark Matter",
			cost: new Decimal(282828282),
			effect() {
				return player.darkmatter.points.add(1).log10().max(0);
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
		53: {
			title: "Dark Money",
			description: "Money gain is increased based on your Dark Matter",
			cost: new Decimal(989898989),
			effect() {
				return player.darkmatter.points.add(1).log2().max(0);
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		54: {
			title: "Secret Fuel",
			description:
				"Unstable Rocket Fuel gain is increased based on your Secret Achievements",
			cost: new Decimal(2222222222),
			effect() {
				return player.sa.points.add(1).log2().div(1.5).max(0);
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
		55: {
			title: "Milestone",
			description: "Unlock Unstable Milestone VIII",
			cost: new Decimal(5e9),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		61: {
			title: "Dark Fuel II",
			description:
				"Unstable Rocket Fuel gain is increased based on your Dark Matter",
			cost: new Decimal(1.1111e11),
			effect() {
				return player.darkmatter.points.add(1).log10().times(2.32).max(0);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasUpgrade("galaxy", 21)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		62: {
			title: "Corrupted Money II",
			description: "Money gain is increased based on Unstable Rocket Fuel",
			cost: new Decimal(1.313e13),
			effect() {
				let baseEffect = player[this.layer].points.add(1).pow(0.15);
				if (baseEffect.gt(500)) {
					baseEffect = new Decimal(500).plus(baseEffect.minus(500).log2());
				}
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effectValue);
				if (effectValue.gt(500)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		63: {
			title: "Corrupted Money III",
			description: "Money gain is increased based on Unstable Rocket Fuel",
			cost: new Decimal(1.51e15),
			effect() {
				let baseEffect = player[this.layer].points.add(1).pow(0.175);
				if (baseEffect.gt(1000)) {
					baseEffect = new Decimal(1000).plus(baseEffect.minus(1000).log2());
				}
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effectValue);
				if (effectValue.gt(1000)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		64: {
			title: "Dark Fuel III",
			description:
				"Unstable Rocket Fuel gain is increased based on your Dark Matter",
			cost: new Decimal(2.22222e20),
			effect() {
				return player.darkmatter.points.add(1).log2().pow(1.15);
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
		65: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XII",
			cost: new Decimal(1e30),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		71: {
			title: "Unstable Energy",
			description:
				"Unstable Rocket Fuel gain is increased based on your Dark Energy",
			cost: new Decimal(1e70),
			effect() {
				return player.darkenergy.points.add(1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasUpgrade("galaxy", 63)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		72: {
			title: "Corrupted Money IV",
			description: "Money gain is increased based on Unstable Rocket Fuel",
			cost: new Decimal(1e78),
			effect() {
				let baseEffect = player[this.layer].points.add(1).log(2).pow(2);
				if (baseEffect.gt(1e5)) {
					baseEffect = new Decimal(1e5).plus(baseEffect.minus(1e5).log2());
				}
				return baseEffect;
			},
			effectDisplay() {
				let effectValue = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effectValue);
				if (effectValue.gt(1e5)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		73: {
			title: "Unstable Matter",
			description:
				"Dark Matter gain is increased based on your Unstable Rocket Fuel",
			cost: new Decimal(1e90),
			effect() {
				return player[this.layer].points.add(1).log10().max(0);
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
		74: {
			title: "Dark Fuel IV",
			description:
				"Unstable Rocket Fuel gain is increased based on your Dark Matter",
			cost: new Decimal(1e100),
			effect() {
				return player.darkmatter.points.add(1).log2().pow(1.5);
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
		75: {
			title: "Milestone",
			description: "Unlock Unstable Milestone XVIII",
			cost: new Decimal(1.27e127),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},
});
