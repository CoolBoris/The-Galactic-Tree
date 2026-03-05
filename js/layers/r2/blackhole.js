addLayer("blackhole", {
	name: "blackhole",
	position: 2,
	row: 2,

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			stageCompletions: new Decimal(0),
		};
	},

	symbol() {
		if (options.emojisEnabled) return "✴";
		return "BH";
	},

	nodeStyle() {
		return {
			background: "radial-gradient(circle, #25083b, #000000)",
			width: "125px",
			height: "125px",
		};
	},

	componentStyles: {
		"milestone-popup"() {
			return { color: "white" };
		},
		upgrade() {
			return { "background-color": "radial-gradient(#130023,rgb(0, 0, 0))" };
		},
	},

	layerShown() {
		if (hasMilestone("supernova", 7) && inChallenge("real", 11)) return true;
		if (player[this.layer].points.gte(1) && inChallenge("real", 11))
			return true;
		return false;
	},

	update(diff) {
		if (inChallenge("real", 11) && hasMilestone("supernova", 7))
			player.blackhole.unlocked = true;
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset(this.layer, keep);
	},

	branches: ["darkmatter", "galaxy"],
	color: "rgb(255, 255, 255)",

	resource: "Void",
	requires: new Decimal(1e60),
	baseResource: "Dark Matter",
	baseAmount() {
		return player.darkmatter.points;
	},
	type: "normal",
	exponent: 0.2,

	gainMult() {
		mult = new Decimal(1);
		if (hasMilestone("unstablefuel", 18)) mult = mult.times(2);
		if (hasMilestone("unstablefuel", 19)) mult = mult.times(3);
		if (hasMilestone("supernova", 50)) mult = mult.times(10);
		mult = mult.times(new Decimal(8).pow(challengeCompletions(this.layer, 11)));
		if (hasMilestone("supernova", 12))
			mult = mult.times(player.darkenergy.points.pow(0.1).add(1));
		if (hasMilestone("supernova", 13))
			mult = mult.times(player.darkenergy.points.pow(0.275).add(1));
		if (hasMilestone("supernova", 51)) mult = mult.times(10);
		if (hasUpgrade("galaxy", 73))
			mult = mult.times(upgradeEffect("galaxy", 73));
		return mult;
	},

	hotkeys: [
		{
			key: "b",
			description: "B: Press for Black Hole Reset",
			onPress() {
				if (canReset(this.layer) && inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	tabFormat: {
		Main: {
			content: ["main-display", "resource-display", "prestige-button", "blank"],
		},
		Milestones: {
			content: ["main-display", "prestige-button", "blank", "milestones"],
			unlocked() {
				return player.blackhole.unlocked;
			},
		},
		Upgrades: {
			content: ["main-display", "prestige-button", "blank", "upgrades"],

			unlocked() {
				return player.blackhole.unlocked;
			},
		},

		"Black Hole Stages": {
			content: ["main-display", "prestige-button", "blank", "challenges"],

			unlocked() {
				return hasMilestone("blackhole", 3);
			},
			buttonStyle() {
				return { "border-color": "rgb(0, 0, 0)" };
			},
		},

		Buyables: {
			content: ["main-display", "prestige-button", "blank", "buyables"],

			unlocked() {
				return challengeCompletions("blackhole", 11) >= 1;
			},
		},
	},

	challenges: {
		11: {
			name() {
				return `Black Hole Stage ${challengeCompletions(this.layer, 11)}`;
			},
			completionLimit: 5,

			getRequiredAmount() {
				const completions = challengeCompletions(this.layer, 11);
				if (completions == 0) return new Decimal(1e29);
				if (completions == 1) return new Decimal(1e19);
				if (completions == 2) return new Decimal(1e19);
				if (completions == 3) return new Decimal(1e18);
				if (completions == 4) return new Decimal(1e18);
				return new Decimal(1e99999);
			},
			fullDisplay() {
				const completions = challengeCompletions(this.layer, 11);
				const maxed = maxedChallenge(this.layer, 11);
				const exponent = new Decimal(1).div(
					new Decimal(completions).plus(2).pow(2)
				);
				const required = this.getRequiredAmount();

				let display = ``;

				display += `^${format(exponent)} Unstable Rocket Fuel`;
				display += `<br>Goal: ${formatWhole(required)} Unstable Rocket Fuel`;
				display += `<br><br><b>Rewards:</b> `;

				if (completions >= 1) {
					display += `<br>- ${formatWhole(
						new Decimal(8).pow(completions)
					)}x Void`;
				}

				if (completions >= 1) {
					display += `<br>- Unlock 1 Black Hole Buyable`;
				}

				if (completions >= 2) {
					display += `<br>- ${formatWhole(
						new Decimal(1000).pow(completions)
					)}x Unstable Rocket Fuel`;
				}

				if (maxed) {
					display += `<br><br><b style="color:#4caf50">MAXED</b>`;
				} else {
					display += `<br><br><b style="color:#e0d238">${challengeCompletions(
						this.layer,
						11
					)} / ${this.completionLimit} Completions</b>`;
				}

				return display;
			},
			canComplete() {
				return (
					inChallenge(this.layer, this.id) &&
					player.unstablefuel.points.gte(this.getRequiredAmount())
				);
			},
			unlocked() {
				return hasMilestone(this.layer, 3);
			},
			style() {
				const completions = challengeCompletions(this.layer, 11);
				const maxed = completions >= 5;
				const canDo = this.canComplete();
				return {
					background: maxed
						? "radial-gradient(circle, #1a3320, #000000)"
						: canDo
						? "radial-gradient(circle, #3d3000, #1a1000)"
						: "radial-gradient(circle, #2e2238, #000000)",
					color: "white",
					height: "400px",
					width: "400px",
					border: maxed
						? "5px solid #2a5c3a"
						: canDo
						? "5px solid #f1be11"
						: "5px solid #19141c",
					"font-size": "18px",
				};
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "1 Void",
			effectDescription: "Auto-Buy Cosmos Upgrades",
			done() {
				return player[this.layer].points.gte(1);
			},
		},

		2: {
			requirementDescription: "10,000 Void",
			effectDescription: "Galaxies cost nothing",
			done() {
				return player[this.layer].points.gte(10000);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},

		3: {
			requirementDescription: "5e11 Void",
			effectDescription: "Unlock Black Hole Stages",
			done() {
				return player[this.layer].points.gte(5e11);
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
		},
	},

	buyables: {
		11: {
			title: "∂©ĸÆ∆<br>",
			purchaseLimit: 100,
			cost(x) {
				let base = new Decimal(1000);
				let mul = new Decimal(3);
				let result = base.times(mul.pow(x));
				return result;
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.5);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					`Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Void<br>` +
					`Bought: ${getBuyableAmount(this.layer, this.id)}/100<br><br>` +
					`Effect: ${format(buyableEffect(this.layer, this.id))}x Energy`
				);
			},
			canAfford() {
				return player[this.layer].points.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					player[this.layer].points = player[this.layer].points.sub(
						this.cost()
					);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1)
					);
				}
			},
			unlocked() {
				return challengeCompletions(this.layer, 11) >= 1;
			},
		},
	},

	upgrades: {
		11: {
			title: "ÿ∆#k©Ṗℜ",
			description: "Unstable Rocket Fuel gain is increased based on Void",
			cost: new Decimal(1),
			effect() {
				let base = player.blackhole.points.add(1).pow(0.5).add(1);
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
		},

		12: {
			title: "∆ø¶ṠÿΩ",
			description: "Dark Matter gain is increased based on Supernova Tier",
			cost: new Decimal(3),
			effect() {
				let base = player.supernova.points.add(1).pow(3);
				let result = base;

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

		13: {
			title: "#ℜk©Ṗ",
			description: "Money gain is increased based on Supernova Tier",
			cost: new Decimal(10),
			effect() {
				let base = new Decimal(1).times(10).pow(player.supernova.points.add(1));
				let result = base;

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = "+" + format(effect);
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
			title: "Ж§∑ṁÆ∂",
			description: "Unstable Rocket Fuel gain is increased based on Galaxies",
			cost: new Decimal(25),
			effect() {
				let base = player.galaxy.points.add(1).pow(4);
				let result = base;

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

		15: {
			title: "¥ÞṖ♠ℵ",
			description: "Unlock Unstable Milestone XIX",
			cost: new Decimal(2500),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		21: {
			title: "≠ÿ∆ĸΩ¶",
			description: "Dark Matter gain is increased based on Dark Energy",
			cost: new Decimal(25000),
			effect() {
				let base = player.darkenergy.points.add(1).log2().pow(4).add(1);
				let result = base;

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

		22: {
			title: "ℏṠ§ĦΨ",
			description:
				"Unstable Rocket Fuel gain is increased based on Dark Energy",
			cost: new Decimal(500000),
			effect() {
				let base = player.darkenergy.points.add(1).log2().pow(7).add(1);
				let result = base;

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

		23: {
			title: "∂ÆŊ©ṁж",
			description: "Cosmic Dust gain is increased based on Void",
			cost: new Decimal(1e7),
			effect() {
				let base = player.blackhole.points.add(1).pow(0.3).add(1.5);
				let result = base;

				// Softcaps
				if (result.gte(1e6)) {
					result = new Decimal(1e6).add(base.log2().pow(3));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(1e6)) display += "<br>(Softcapped)";
				return display;
			},
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		24: {
			title: "♠ℜΨ¥ĸ",
			description:
				"Unstable Rocket Fuel gain is increased based on Supernova Tier",
			cost: new Decimal(2.5e9),
			effect() {
				let base = player.supernova.points.add(1).pow(9);
				let result = base;

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

		25: {
			title: "ṖΩ∑∂Æ",
			description: "Unlock Unstable Milestone XX",
			cost: new Decimal(2e11),
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		31: {
			title: "≠ŊℜΨṁ",
			description:
				"Unstable Rocket Fuel gain is increased based on Dark Matter",
			cost: new Decimal(5e13),
			effect() {
				let base = player.darkmatter.points.add(1).log10().pow(4).add(1);
				let result = base;

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

		32: {
			title: "Þ∆ĦṖж",
			description: "Cosmic Dust gain is increased based on Dark Energy",
			cost: new Decimal(2.5e15),
			effect() {
				let base = player.darkenergy.points.add(1).log2().pow(5.24).add(1);
				let result = base;

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
	},
});
