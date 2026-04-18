addLayer("darkmatter", {
	name: "Dark Matter",
	position: 2,
	row: 1,
	branches: ["galaxy", "unstablefuel"],

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled) return "⚫";
		return "DM";
	},

	nodeStyle() {
		const style = { "border-radius": "100px" };
		if (options.emojisEnabled) style.color = "white";
		return style;
	},

	layerShown() {
		if (player.darkmatter.unlocked && inChallenge("real", 11)) return true;

		return (
			inChallenge("real", 11) &&
			(hasMilestone("galaxy", 3) || player.supernova.points.gte(1))
		);
	},

	milestonePopups() {
		if (options.DarkmatterMilestonePopup == true) return true;
		return false;
	},

	update(diff) {
		if (inChallenge("real", 11) && hasMilestone("galaxy", 3))
			player[this.layer].unlocked = true;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (hasMilestone("galaxy", 4)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	automate() {
		if (
			hasMilestone("unstablefuel", 15) ||
			hasMilestone("universe", 2) ||
			hasUpgrade("negativeinfinity", 32)
		) {
			[11, 12, 13, 21, 22].forEach((id) => {
				const buyable = layers[this.layer].buyables[id];
				if (!buyable) return;

				const limit = buyable.purchaseLimit || Infinity;

				if (
					hasMilestone("supernova", 51) ||
					hasUpgrade("negativeinfinity", 34)
				) {
					while (true) {
						if (getBuyableAmount(this.layer, id).gte(limit)) break;
						if (buyable.canAfford()) {
							buyable.buy();
						} else {
							break;
						}
					}
				} else {
					if (
						buyable.canAfford() &&
						getBuyableAmount(this.layer, id).lt(limit)
					) {
						buyable.buy();
					}
				}
			});
		}
	},

	passiveGeneration() {
		if (!inChallenge("real", 11)) return 0;
		if (
			hasUpgrade("negativeinfinity", 31) &&
			!player.darkenergy.points.pow(0.4).add(1).divide(100).gte(1)
		)
			return 1;
		if (hasMilestone("supernova", 9))
			return player.darkenergy.points.pow(0.4).add(1).divide(100);
		if (hasUpgrade("universe", 92)) return 0.01;

		return 0;
	},

	color: "#450080",
	requires: new Decimal(1e7),
	resource: "Dark Matter",
	baseResource: "Unstable Rocket Fuel",
	baseAmount() {
		return player.unstablefuel.points;
	},
	type: "normal",
	exponent: 0.5,

	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("unstablefuel", 6)) mult = mult.times(3);
		if (hasUpgrade("galaxy", 31))
			mult = mult.times(upgradeEffect("galaxy", 31));
		if (hasUpgrade("galaxy", 34)) mult = mult.times(2);
		if (hasUpgrade("galaxy", 41)) mult = mult.times(3);
		if (hasUpgrade("galaxy", 42))
			mult = mult.times(upgradeEffect("galaxy", 42));
		if (hasMilestone("supernova", 1)) mult = mult.times(3);
		if (hasMilestone("supernova", 2)) mult = mult.times(3);
		if (hasMilestone("unstablefuel", 10)) mult = mult.times(5);
		if (hasUpgrade("galaxy", 52)) mult = mult.times(5);
		if (hasMilestone("unstablefuel", 14)) mult = mult.times(10);
		if (hasUpgrade("galaxy", 61)) mult = mult.times(10);
		if (hasMilestone("supernova", 10))
			mult = mult.times(player.darkenergy.points.pow(0.585).add(1));
		if (hasUpgrade("unstablefuel", 73))
			mult = mult.times(upgradeEffect("unstablefuel", 73));
		if (hasUpgrade("blackhole", 12))
			mult = mult.times(upgradeEffect("blackhole", 12));
		if (hasUpgrade("blackhole", 21))
			mult = mult.times(upgradeEffect("blackhole", 21));
		if (hasUpgrade("universe", 22)) mult = mult.times(5);
		if (hasUpgrade("universe", 31))
			mult = mult.times(upgradeEffect("universe", 31));
		if (hasMilestone("universe", 1)) mult = mult.times(10);
		if (hasUpgrade("universe", 42))
			mult = mult.times(upgradeEffect("universe", 42));
		if (inChallenge("real", 11) && inChallenge("universe", 21))
			mult = mult.pow(0.1);
		if (hasUpgrade("blackhole", 41))
			mult = mult.times(upgradeEffect("blackhole", 41));
		if (hasUpgrade("universe", 82))
			mult = mult.times(upgradeEffect("universe", 82));
		if (hasMilestone("universe", 4)) mult = mult.times(1000);
		if (hasUpgrade("universe", 111))
			mult = mult.times(upgradeEffect("universe", 111));
		if (hasUpgrade("galaxy", 82))
			mult = mult.times(upgradeEffect("galaxy", 82));
		if (hasUpgrade("blackhole", 51))
			mult = mult.times(upgradeEffect("blackhole", 51));
		if (hasMilestone("unstablefuel", 25)) mult = mult.times(1e10);
		if (hasUpgrade("universe", 181)) mult = mult.times(9.99e20);
		if (challengeCompletions("blackhole", 11) >= 4) {
			mult = mult.times(
				new Decimal(75).pow(challengeCompletions("blackhole", 11)),
			);
		}
		mult = mult.times(player.negativeinfinity.points.add(1));

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	hotkeys: [
		{
			key: "d",
			description: "D: Press for Dark Matter Reset",
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
				"resource-display",
				"blank",
				"prestige-button",
				"blank",
			],
		},
		Buyables: {
			content: ["main-display", "prestige-button", "blank", "buyables"],
			unlocked() {
				return player.darkmatter.unlocked;
			},
		},
		Milestones: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
			unlocked() {
				return player.darkmatter.unlocked;
			},
		},
	},

	milestones: {
		1: {
			requirementDescription() {
				return formatWhole(new Decimal(10)) + " Dark Matter";
			},
			effectDescription: "Improve Cosmic Rays Formula",
			done() {
				return player[this.layer].points.gte(10);
			},
		},
		2: {
			requirementDescription() {
				return formatWhole(new Decimal(250)) + " Dark Matter";
			},
			effectDescription: "Unlock 5 Unstable Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player[this.layer].points.gte(250);
			},
		},
		3: {
			requirementDescription() {
				return formatWhole(new Decimal(1e35)) + " Dark Matter";
			},
			effectDescription: "Unlock 5 Cosmos Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player[this.layer].points.gte(1e35);
			},
		},
	},

	buyables: {
		11: {
			title: "Dark Money<br>",
			purchaseLimit: 1000,
			cost(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.1);
				let result = base.times(mul.pow(x));
				return result;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Dark Matter` +
					`<br>Bought: ${getBuyableAmount(this.layer, this.id)}/1,000<br>` +
					`<br>Effect: +${format(
						getBuyableAmount(this.layer, this.id),
					)} Money/s`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					if (
						!hasMilestone("unstablefuel", 20) &&
						!hasUpgrade("negativeinfinity", 33)
					)
						player[this.layer].points = player[this.layer].points.sub(
							this.cost(),
						);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
		12: {
			title: "Dark Fuel<br>",
			purchaseLimit: 1000,
			cost(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.65);
				let result = base.times(mul.pow(x));
				return result;
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.2);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Dark Matter<br>` +
					`Bought: ${getBuyableAmount(this.layer, this.id)}/1,000<br><br>` +
					`Effect: ${format(
						buyableEffect(this.layer, this.id),
					)}x Unstable Rocket Fuel`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					if (
						!hasMilestone("unstablefuel", 20) &&
						!hasUpgrade("negativeinfinity", 33)
					)
						player[this.layer].points = player[this.layer].points.sub(
							this.cost(),
						);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
		13: {
			title: "Dark Dust<br>",
			purchaseLimit: 1000,
			cost(x) {
				let base = new Decimal(3);
				let mul = new Decimal(1.8);
				let result = base.times(mul.pow(x));
				return result;
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.05);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Dark Matter<br>` +
					`Bought: ${getBuyableAmount(this.layer, this.id)}/1,000<br><br>` +
					`Effect: ${format(buyableEffect(this.layer, this.id))}x Cosmic Dust`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					if (
						!hasMilestone("unstablefuel", 20) &&
						!hasUpgrade("negativeinfinity", 33)
					)
						player[this.layer].points = player[this.layer].points.sub(
							this.cost(),
						);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
		21: {
			title: "Unstable Generation<br>",
			purchaseLimit: 88,
			unlocked() {
				return hasUpgrade("galaxy", 35) || hasMilestone("unstablefuel", 7);
			},
			cost(x) {
				let base = new Decimal(10);
				let mul = new Decimal(1.5);
				let result = base.times(mul.pow(x));
				return result;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Dark Matter` +
					`<br>Bought: ${getBuyableAmount(this.layer, this.id)}/88<br>` +
					`<br>Effect: Generate ${format(
						getBuyableAmount(this.layer, this.id).add(12),
					)}% of Unstable Rocket Fuel/s`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					if (
						!hasMilestone("unstablefuel", 20) &&
						!hasUpgrade("negativeinfinity", 33)
					)
						player[this.layer].points = player[this.layer].points.sub(
							this.cost(),
						);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
		22: {
			title: "Dark Void<br>",
			purchaseLimit: 1000,
			cost(x) {
				let base = new Decimal(1e65);
				let mul = new Decimal(8);
				let result = base.times(mul.pow(x));
				return result;
			},
			unlocked() {
				return hasMilestone("universe", 12);
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.15);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Dark Matter<br>` +
					`Bought: ${getBuyableAmount(this.layer, this.id)}/1,000<br><br>` +
					`Effect: ${format(buyableEffect(this.layer, this.id))}x Void`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					if (
						!hasMilestone("unstablefuel", 20) &&
						!hasUpgrade("negativeinfinity", 33)
					)
						player[this.layer].points = player[this.layer].points.sub(
							this.cost(),
						);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
	},
});
