addLayer("stardust", {
	name: "Stardust",

	layerShown() {
		let visible = false;
		return visible;
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	position: 0,
	row: 4,

	resource: "Stardust",
	baseResource: "Stars",
	baseAmount() {
		return player.stars.points;
	},

	requires: new Decimal(1),
	type: "normal",
	exponent: 2.68,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("x", 13)) mult = mult.times(upgradeEffect("x", 13));
		if (hasUpgrade("r", 53)) mult = mult.times(100);

		if (hasMilestone("stars", 6))
			mult = mult.times(tmp.stars.milestones[6].effect);
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (hasMilestone("stars", 1)) return 1;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("points");
		if (layers[reset].row > this.row) layerDataReset("stardust", keep);
	},

	autoUpgrade() {
		return false;
	},
});

addLayer("stars", {
	name: "Stars",

	symbol() {
		if (options.emojisEnabled) return "🌟";
		return "ST";
	},

	color: "#FFFEA5",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.width = "100px";
		style.height = "100px";
		return style;
	},

	hotkeys: [
		{
			key: "t",
			description: "T: Star reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);

		if (player.stars.bulkBuy && canResetNow)
			return `+<b>${getResetGain(
				this.layer,
				"static"
			)}</b> Stars<br><br>Next at ${format(
				getNextAt(this.layer, (canMax = true), "static")
			)} Comets`;

		if (canResetNow) return `+<b>1</b> Star`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "static")
		)} Comets`;
	},

	layerShown() {
		let visible = false;
		if (player.infinity.points.gte(1)) visible = true;

		if (
			hasChallenge("ast", 14) ||
			player.stars.points.gte(1) ||
			player.x.unlocked
		)
			visible = true;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	position: 1,
	row: 4,
	branches: ["c", "s"],

	tabFormat: {
		Main: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
						<h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.stardust.points)}</span></h2> Stardust`;
						return txt;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						return `You have ${format(player.c.points)}</span></h2> Comets`;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						let resetgain = getResetGain("stardust");
						txt =
							txt +
							`You are gaining ${format(
								resetgain
							)}</span></h2> Stardust per second`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				["infobox", "main"],
			],
		},
		Milestones: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
						<h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.stardust.points)}</span></h2> Stardust`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"milestones",
			],
			unlocked() {
				return player.stars.points.gte(1);
			},
		},
		Upgrades: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
						<h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.stardust.points)}</span></h2> Stardust`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.stars.points.gte(1);
			},
		},
		Buyables: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
						<h2><span style="color: #FF6FCB; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.stardust.points)}</span></h2> Stardust`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"buyables",
			],
			unlocked() {
				return player.stars.points.gte(1);
			},
		},
		"The Sun": {
			content: [["infobox", "sun"], "blank", "challenges"],
			unlocked() {
				return hasMilestone("s", 13) || hasChallenge("stars", 11);
			},
			buttonStyle() {
				return { "border-color": "#FFB50B" };
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

	resource: "Stars",
	baseResource: "Comets",
	baseAmount() {
		return player.c.points;
	},

	requires: new Decimal(1e13),
	type: "static",
	exponent() {
		let exp = 1.35;

		const pts = player.stars.bulkBuy
			? player.stars.points.add(getResetGain("stars", "static"))
			: player.stars.points;
		if (pts.gte(7)) {
			exp = 1.3;
		}

		return exp;
	},

	canBuyMax() {
		if (hasMilestone("x", 4)) {
			player.stars.bulkBuy = true;
			return true;
		}
		if (hasUpgrade("infinity", 73)) {
			player.stars.bulkBuy = true;
			return true;
		}
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 71)) return true;
		else return false;
	},

	automate() {
		if (hasUpgrade("infinity", 72)) {
			[11, 12].forEach((id) => {
				const buyable = tmp.stars.buyables[id];
				if (buyable.canAfford) {
					buyBuyable("stars", id);
				}
			});
		}
	},

	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("s", 15)) mult = mult.times(1.5);
		mult = mult.divide(player.infinity.points.add(1));

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		return 0;
	},

	resetsNothing() {
		let nothing = false;
		if (hasUpgrade("infinity", 74)) nothing = true;
		return nothing;
	},

	autoPrestige() {
		let auto = false;
		if (hasUpgrade("infinity", 75)) auto = true;
		return auto;
	},

	doReset(reset) {
		let keep = [];
		if (hasUpgrade("infinity", 93)) keep.push("challenges");
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("stars", keep);
	},

	infoboxes: {
		main: {
			title: "Introducing: Stars",
			body() {
				return "Stars are the Same as Rockets, but they cost Comets. Once you got your first Star, you start generating Stardust. the more Stars you have, the more Stardust you will generate. Stardust can be spent on Upgrades & Buyables. Buyables are Upgrades you can buy more than once.<br><br> Pro tip: Hold buyables to Fast buy!";
			},
		},
		sun: {
			title: "Introducing: The Sun",
			body() {
				return "Welcome to The Sun! The Sun is basically a clicker game, it contains tons of upgrades, buyables and milestones. Once you beat The Sun, You unlock a new feature. Scroll down to begin playing.<br><br> CPS = Clicks Per Second";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "1 Star",
			effectDescription: "Begin forming Stardust based on Stars",
			done() {
				return player.stars.points.gte(1);
			},
		},
		2: {
			requirementDescription: "2 Stars",
			effectDescription: "Bulk Buy Rockets",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.stars.points.gte(2);
			},
		},
		3: {
			requirementDescription: "3 Stars",
			effectDescription: "Auto-Buy Rocket Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.stars.points.gte(3);
			},
		},
		4: {
			requirementDescription: "4 Stars",
			effectDescription: "Auto-Buy Rocket Fuel Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.stars.points.gte(4);
			},
		},
		5: {
			requirementDescription: "5 Stars",
			effectDescription: "Auto-Buy Astronaut Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.stars.points.gte(5);
			},
		},
		6: {
			requirementDescription: "6 Stars",
			effectDescription() {
				return `Each Star doubles Stardust gain (Begins at 6 Stars)<br>Effect: ${format(
					this.effect()
				)}x Stardust`;
			},
			effect() {
				let stars = player.stars.points;
				if (stars.lt(6)) return new Decimal(1);
				return Decimal.pow(2, stars.sub(5));
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.stars.points.gte(6);
			},
		},
	},

	upgrades: {
		11: {
			title: "Stardust Boost",
			description: "Money gain is increased based on Stardust",
			cost: new Decimal(10),
			effect() {
				return player.stardust.points.add(1).pow(0.34);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Stardust",
			currencyLocation() {
				return player.stardust;
			},
			currencyInternalName: "points",
		},
		12: {
			title: "Stardust Boost+",
			description: "Rocket Fuel gain is increased based on Stardust",
			cost: new Decimal(100),
			effect() {
				return player.stardust.points.add(1).pow(0.3);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Stardust",
			currencyLocation() {
				return player.stardust;
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
			title: "Stardust Boost++",
			description: "Rocket Cost is decreased based on Stardust",
			cost: new Decimal(1000),
			effect() {
				return player.stardust.points.add(1).pow(0.26);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "Stardust",
			currencyLocation() {
				return player.stardust;
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
			title: "Stardust Boost+++",
			description: "Astronaut gain is increased based on Stardust",
			cost: new Decimal(10000),
			effect() {
				return player.stardust.points.add(1).pow(0.22);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Stardust",
			currencyLocation() {
				return player.stardust;
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
			title: "Mega Stardust Booster",
			description: "Comet gain is increased based on Stardust",
			cost: new Decimal(100000),
			effect() {
				return player.stardust.points.add(1).pow(0.18);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Stardust",
			currencyLocation() {
				return player.stardust;
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

	buyables: {
		11: {
			title: "Comet Generation<br>",
			purchaseLimit: 100,
			cost(x) {
				let base = new Decimal(5);
				let mul = new Decimal(1.2);
				let result = base.times(mul.pow(x));
				return result;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Stardust" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/100<br>" +
					"<br>Effect: Generate " +
					format(getBuyableAmount("stars", 11)) +
					"% of Comets/s"
				);
			},
			canAfford() {
				return player.stardust.points.gte(this.cost());
			},
			buy() {
				player.stardust.points = player.stardust.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "Comet Multiplier<br>",
			purchaseLimit: 100,
			cost(x) {
				let base = new Decimal(8);
				let mul = new Decimal(1.4);
				let result = base.times(mul.pow(x));
				return result;
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.25);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Stardust" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/100<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Comets"
				);
			},
			canAfford() {
				return player.stardust.points.gte(this.cost());
			},
			buy() {
				player.stardust.points = player.stardust.points.sub(this.cost());
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
	},

	challenges: {
		11: {
			name: "The Sun",
			canComplete: function () {
				return player.sun.points.gte("1e53100");
			},
			goalDescription: "???",
			rewardDescription: "Unlock Planets",
			style() {
				const isCompleted = hasChallenge("stars", 11);

				return {
					"background-image": isCompleted
						? "repeating-linear-gradient(-49deg, #FFB50B, #FFB50B 25px, #FFA500 25px, #FFA500 50px)"
						: "none",
					width: "500px",
					height: "500px",
					color: "#880000",
					"button-text": "Enter",
					"text-shadow": "#FF0B88 0px 0px 20px",
					"font-size": "32px",
					"font-family": "Lucida Console",
					TextSize: 50,
					backgroundColor: "#FFB50B",
					resetsNothing: true,
				};
			},
		},
	},
});
