addLayer("ro", {
	name: "Rockets",
	symbol() {
		if (options.emojisEnabled) return "🚀";
		return "R";
	},

	color: "#6D6D6D",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}
		return style;
	},

	hotkeys: [
		{
			key: "r",
			description: "R: Rocket reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (player.ro.unlocked) visible = true;
		if (player.infinity.points.gte(1)) visible = true;
		if (inChallenge("c", 13) || inChallenge("ast", 13)) visible = false;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	update(diff) {
		if (hasUpgrade("r", 25)) {
			player.ro.unlocked = true;
		}
	},

	milestonePopups() {
		let popup = true;
		if (options.RocketMilestonePopup == true) popup = true;
		else popup = false;
		return popup;
	},

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);

		if (player.ro.bulkBuy && canResetNow)
			return `+<b>${getResetGain(
				this.layer,
				"static"
			)}</b> Rockets<br><br>Next at ${format(
				getNextAt(this.layer, (canMax = true), "static")
			)} Rocket Fuel`;

		if (canResetNow) return `+<b>1</b> Rocket`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "static")
		)} Rocket Fuel`;
	},

	position: 0,
	row: 1,
	branches: ["r"],

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
			unlocked() {
				return hasMilestone("ro", 4) || hasMilestone("c", 2);
			},
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			bulkBuy: false,
		};
	},

	resource: "Rockets",
	baseResource: "Rocket Fuel",
	baseAmount() {
		return player.r.points;
	},

	requires: new Decimal(500),
	type: "static",
	exponent() {
		let exp = 2;

		const pts = player.ro.bulkBuy
			? player.ro.points.add(getResetGain("ro", "static"))
			: player.ro.points;
		if (pts.gte(30)) {
			exp = 1.8;
		} else if (pts.gte(17)) {
			exp = 1.82;
		} else if (pts.gte(13)) {
			exp = 1.85;
		} else if (pts.gte(11)) {
			exp = 1.895;
		} else if (pts.gte(6)) {
			exp = 1.92;
		}

		return exp;
	},

	resetsNothing() {
		let nothing = false;
		if (hasUpgrade("infinity", 23)) nothing = true;
		return nothing;
	},

	canBuyMax() {
		if (inChallenge("real", 11)) {
			player.ro.bulkBuy = false;
			return false;
		}
		if (
			hasMilestone("ro", 7) ||
			hasMilestone("stars", 2) ||
			hasUpgrade("infinity", 22)
		) {
			player.ro.bulkBuy = true;
			return true;
		}
	},

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("ro", 11)) mult = mult.divide(upgradeEffect("ro", 11));
		if (hasUpgrade("ro", 21)) mult = mult.divide(upgradeEffect("ro", 21));
		if (hasUpgrade("s", 13) && !inChallenge("real", 11)) mult = mult.divide(3);
		if (hasUpgrade("s", 23) && !inChallenge("real", 11)) mult = mult.divide(5);
		if (hasUpgrade("s", 33) && !inChallenge("real", 11)) mult = mult.divide(10);
		if (hasUpgrade("s", 43) && !inChallenge("real", 11)) mult = mult.divide(25);
		if (hasMilestone("c", 1)) mult = mult.divide(5);
		if (hasUpgrade("as", 14)) mult = mult.divide(upgradeEffect("as", 14));
		if (hasUpgrade("as", 24)) mult = mult.divide(upgradeEffect("as", 24));
		if (hasUpgrade("s", 51) && !inChallenge("real", 11))
			mult = mult.divide(100);
		if (hasUpgrade("c", 13)) mult = mult.divide(upgradeEffect("c", 13));
		if (hasUpgrade("c", 14)) mult = mult.divide(10);
		if (hasUpgrade("c", 22)) mult = mult.divide(upgradeEffect("c", 22));
		if (hasUpgrade("ast", 23)) mult = mult.divide(upgradeEffect("ast", 23));
		if (hasUpgrade("c", 24)) mult = mult.divide(100);
		if (hasUpgrade("stars", 13)) mult = mult.divide(upgradeEffect("stars", 13));
		if (hasUpgrade("planets", 13))
			mult = mult.divide(upgradeEffect("planets", 13));
		if (hasUpgrade("r", 55)) mult = mult.divide(upgradeEffect("r", 55));
		if (hasUpgrade("x", 23) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 23));
		if (hasMilestone("s", 16) && !inChallenge("real", 11))
			mult = mult.divide(1e12);
		if (hasUpgrade("x", 25) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 25));
		if (hasUpgrade("x", 31) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 31));
		if (hasUpgrade("x", 32) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 32));
		if (hasUpgrade("x", 33) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 33));
		if (hasUpgrade("x", 34) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 34));
		if (hasUpgrade("x", 35) && !inChallenge("real", 11))
			mult = mult.divide(upgradeEffect("x", 35));
		if (hasMilestone("s", 16) && !inChallenge("real", 11))
			mult = mult.divide(1e29);

		mult = mult.divide(player.infinity.points.add(1));

		if (inChallenge("c", 13)) mult = mult.times("-1e9999999999999999999");
		if (inChallenge("ast", 13)) mult = mult.times("-1e9999999999999999999");

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	autoPrestige() {
		let auto = false;
		if (hasUpgrade("infinity", 24)) auto = true;
		return auto;
	},

	doReset(reset) {
		let keep = [];
		if (hasMilestone("x", 1)) keep.push("milestones");
		if (hasMilestone("x", 1) && !inChallenge("real", 11)) {
			if (inChallenge("real", 11)) keep.push("upgrades");
			if (inChallenge("real", 11)) keep.push("points");
			if (inChallenge("real", 11)) keep.push("milestones");
			if (inChallenge("real", 11)) keep.push("buyables");
		}
		if (layers[reset].row > this.row) layerDataReset("ro", keep);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 21)) return true;
		if (hasMilestone("c", 3)) return true;
		if (hasMilestone("stars", 3)) return true;
		else return false;
	},

	infoboxes: {
		main: {
			title: "Introducing: Rockets",
			body() {
				return "Oh wow! A new feature already? This reset layer is a little bit different, instead of Money it costs Rocket Fuel and it will reset all progress you have made so far. The price of Rockets increase each Rocket. To see what benefits you get from Rockets, go to the 'Milestones' tab at the top<br><br>Pro tip: Check out hotkeys in Settings to make your experience faster!";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "1 Rocket",
			effectDescription: "3x Money",
			done() {
				return player.ro.points.gte(1);
			},
		},
		2: {
			requirementDescription: "2 Rockets",
			effectDescription: "2x Rocket Fuel & 2 Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(2);
			},
		},
		3: {
			requirementDescription: "3 Rockets",
			effectDescription: "2x Rocket Fuel & 2 Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(3);
			},
		},
		4: {
			requirementDescription: "4 Rockets",
			effectDescription: "5% of Rocket Fuel/s & Rocket Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(4);
			},
		},
		5: {
			requirementDescription: "5 Rockets",
			effectDescription: "10% of Rocket Fuel/s & 3x Money",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(5);
			},
		},
		6: {
			requirementDescription: "6 Rockets",
			effectDescription: "20% of Rocket Fuel/s & 1 Rocket Fuel Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(6);
			},
		},
		7: {
			requirementDescription: "7 Rockets",
			effectDescription: "Bulk buy Rockets",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(7);
			},
		},
		8: {
			requirementDescription: "8 Rockets",
			effectDescription: "Unlock Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(8);
			},
		},
		9: {
			requirementDescription: "9 Rockets",
			effectDescription: "50% of Rocket Fuel/s & 1.5x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(9);
			},
		},
		10: {
			requirementDescription: "10 Rockets",
			effectDescription: "2x Money & 1.5x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(10);
			},
		},
		11: {
			requirementDescription: "11 Rockets",
			effectDescription: "2x Money",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(11);
			},
		},
		12: {
			requirementDescription: "12 Rockets",
			effectDescription: "2x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(12);
			},
		},
		13: {
			requirementDescription: "13 Rockets",
			effectDescription: "10% of Astronauts/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(13);
			},
		},
		14: {
			requirementDescription: "14 Rockets",
			effectDescription: "250% of Rocket Fuel/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(14);
			},
		},
		15: {
			requirementDescription: "15 Rockets",
			effectDescription: "Unlock Space",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(15);
			},
		},
		16: {
			requirementDescription: "16 Rockets",
			effectDescription: "2 New Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(16);
			},
		},
		17: {
			requirementDescription: "17 Rockets",
			effectDescription: "2x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(17);
			},
		},
		18: {
			requirementDescription: "18 Rockets",
			effectDescription: "3 New Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(18);
			},
		},
		19: {
			requirementDescription: "19 Rockets",
			effectDescription: "3x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(19);
			},
		},
		20: {
			requirementDescription: "20 Rockets",
			effectDescription: "Unlock Comets",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(20);
			},
		},
		21: {
			requirementDescription: "50 Rockets",
			effectDescription: "1e20x Money",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.ro.points.gte(50);
			},
		},
	},

	upgrades: {
		11: {
			title: "Rocket Engineers",
			description: "Rockets cost is decreased based on money",
			cost: new Decimal(4),
			effect() {
				let base = player.points.add(1).pow(0.3);
				let result;

				result = base;

				// Softcaps
				if (result.gte(1e9)) {
					result = new Decimal(1e9).add(base.pow(0.4));
				}
				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = "/" + format(effect);
				if (effect.gt(1e9)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return hasMilestone(this.layer, 4);
			},
		},

		12: {
			title: "Rocket Market",
			description: "Money gain is increased based on Rockets",
			cost: new Decimal(5),
			effect() {
				let base = new Decimal(1).add(player.ro.points.add(1).pow(2.1));
				let result;

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

		13: {
			title: "Rocket Factory",
			description: "Rocket Fuel gain is increased based on Rockets",
			cost: new Decimal(7),
			effect() {
				let base = new Decimal(1).add(player.ro.points.add(1).pow(1.65));
				let result;

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

		14: {
			title: "Astrorocket",
			description: "Astronauts gain is increased based on Astronauts",
			cost: new Decimal(9),
			effect() {
				let base = player.as.points.add(1).pow(0.175);
				let result;

				result = base;

				// Softcaps
				if (result.gte(100)) {
					result = new Decimal(100).add(base.pow(0.5));
				}

				return result;
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				if (effect.gt(100)) display += " (Softcapped)";
				return display;
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("as", 1)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},

		15: {
			title: "Rocket Market+",
			description: "Money gain is increased based on Rockets",
			cost: new Decimal(12),
			effect() {
				return player.ro.points.add(1).pow(3);
			},
			effectDisplay() {
				let effect = upgradeEffect(this.layer, this.id);
				let display = format(effect) + "x";
				return display;
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("as", 3)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		21: {
			title: "Superfuel Engine v9000",
			description: "Rockets cost is decreased based on Space Distance",
			cost: new Decimal(15),
			effect() {
				return player.s.points.add(1).pow(0.68);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasMilestone("s", 3)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		22: {
			title: "Rocket Market Deluxe",
			description: "Money gain is increased based on Rockets",
			cost: new Decimal(30),
			effect() {
				return player.ro.points.add(1).pow(4);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasUpgrade("x", 22)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		23: {
			title: "Buy the Rocket Market",
			description: "Money gain is increased based on X",
			cost: new Decimal(46),
			effect() {
				return player.x.points.add(1).pow(35);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, previousUpgradeID(this.id)) &&
						hasUpgrade("x", 22)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
	},
});

function previousMilestoneID(id) {
	return id - 1;
}
