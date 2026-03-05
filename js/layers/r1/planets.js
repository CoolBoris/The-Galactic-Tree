addLayer("planetoid", {
	name: "Planetoids",

	layerShown() {
		let visible = false;
		return visible;
	},

	position: 2,
	row: 4,

	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},

	resource: "Planetoids",
	baseResource: "Planets",
	baseAmount() {
		return player.planets.points;
	},

	requires: new Decimal(1),
	type: "normal",
	exponent: 1.72,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("r", 53)) mult = mult.times(100);
		if (hasMilestone("planets", 6))
			mult = mult.times(tmp.planets.milestones[6].effect);
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		if (inChallenge("real", 11)) return 0;
		if (hasMilestone("planets", 1)) return 1;
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("points");
		if (layers[reset].row > this.row) layerDataReset("planetoid", keep);
	},

	autoUpgrade() {
		return false;
	},
});

addLayer("planets", {
	name: "Planets",

	symbol() {
		if (options.emojisEnabled) return "🪐";
		return "P";
	},

	color: "#5E37B0",

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
			key: "p",
			description: "P: Planet reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (player.infinity.points.gte(1)) visible = true;

		if (hasChallenge("stars", 11)) visible = true;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	prestigeButtonText() {
		if (!hasChallenge("stars", 11)) {
			return "The Sun<br>Challenge required!";
		}
		const canResetNow = canReset(this.layer);

		if (player.planets.bulkBuy && canResetNow)
			return `+<b>${getResetGain(
				this.layer,
				"static"
			)}</b> Planets<br><br>Next at ${format(
				getNextAt(this.layer, (canMax = true), "static")
			)} Asteroids`;

		if (canResetNow) return `+<b>1</b> Planet`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "static")
		)} Asteroids`;
	},

	canReset() {
		if (!hasChallenge("stars", 11)) return false;
		return player.ast.points.gte(
			getNextAt(this.layer, (canMax = false), "static")
		);
	},

	position: 2,
	row: 4,
	branches: ["ast", "s"],

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
						<h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.planetoid.points)}</span></h2> Planetoids`;
						return txt;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						return `You have ${format(
							player.ast.points
						)}</span></h2> Asteroids`;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						let resetgain = getResetGain("planetoid");
						txt =
							txt +
							`You are gaining ${format(
								resetgain
							)}</span></h2> Planetoids per second`;
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
						<h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.planetoid.points)}</span></h2> Planetoids`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"milestones",
			],
			unlocked() {
				return player.planets.points.gte(1);
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
						<h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.planetoid.points)}</span></h2> Planetoids`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.planets.points.gte(1);
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
						<h2><span style="color: #ca11a0; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${format(player.planetoid.points)}</span></h2> Planetoids`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"buyables",
			],
			unlocked() {
				return player.planets.points.gte(1);
			},
		},
		"The Solar System": {
			content: [["infobox", "solarsystem"], "blank", "challenges"],
			unlocked() {
				return hasMilestone("planets", 7) || hasChallenge("planets", 11);
			},
			buttonStyle() {
				return { "border-color": "#620A8A" };
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

	resource: "Planets",
	baseResource: "Asteroids",
	baseAmount() {
		return player.ast.points;
	},

	requires: new Decimal(1e19),
	type: "static",
	exponent() {
		let exp = 1.3;

		const pts = player.planets.bulkBuy
			? player.planets.points.add(getResetGain("planets", "static"))
			: player.planets.points;
		if (pts.gte(10)) {
			exp = 1.32;
		}

		return exp;
	},

	canBuyMax() {
		if (hasMilestone("x", 2)) {
			player.planets.bulkBuy = true;
			return true;
		}
		if (hasUpgrade("infinity", 83)) {
			player.planets.bulkBuy = true;
			return true;
		}

		return false;
	},

	automate() {
		if (hasUpgrade("infinity", 82)) {
			[11, 12].forEach((id) => {
				const buyable = tmp.planets.buyables[id];
				if (buyable.canAfford) {
					buyBuyable("planets", id);
				}
			});
		}
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 81)) return true;
		else return false;
	},

	gainMult() {
		let mult = new Decimal(1);
		if (hasMilestone("s", 15)) mult = mult.times(1.5);
		if (hasMilestone("s", 16)) mult = mult.divide(500000);
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
		if (hasUpgrade("infinity", 84)) nothing = true;
		return nothing;
	},

	autoPrestige() {
		let auto = false;
		if (hasUpgrade("infinity", 85)) auto = true;
		return auto;
	},

	doReset(reset) {
		let keep = [];
		if (hasUpgrade("infinity", 94)) keep.push("challenges");
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("planets", keep);
	},

	infoboxes: {
		main: {
			title: "Introducing: Planets",
			body() {
				return "Planets are the Same as Stars, but they cost Asteroids. Once you got your first Planet, you start generating Planetoids. the more Planets you have, the more Planetoids you will generate. Planetoids can be spent on Upgrades & Buyables.";
			},
		},
		solarsystem: {
			title: "Introducing: The Solar System",
			body() {
				return "Welcome to The Solar System! You already know how this works, it's the same as The Sun. Good Luck!";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "1 Planet",
			effectDescription: "Begin forming Planetoids based on Planets",
			done() {
				return player.planets.points.gte(1);
			},
		},
		2: {
			requirementDescription: "2 Planets",
			effectDescription: "Keep Comet Challenges",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(2);
			},
		},
		3: {
			requirementDescription: "3 Planets",
			effectDescription: "Keep Asteroid Challenges",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(3);
			},
		},
		4: {
			requirementDescription: "4 Planets",
			effectDescription: "Auto-buy Comet Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(4);
			},
		},
		5: {
			requirementDescription: "5 Planets",
			effectDescription: "Auto-Buy Asteroid Upgrades",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(5);
			},
		},
		6: {
			requirementDescription: "6 Planets",
			effectDescription() {
				return `Each Planet doubles Planetoid gain (Begins at 6 Planets)<br>Effect: ${format(
					this.effect()
				)}x Planetoids`;
			},
			effect() {
				let planets = player.planets.points;
				if (planets.lt(6)) return new Decimal(1);
				return Decimal.pow(2, planets.sub(5));
			},
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(6);
			},
		},
		7: {
			requirementDescription: "10 Planets",
			effectDescription: "Unlock The Solar System",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.planets.points.gte(10);
			},
		},
	},

	upgrades: {
		11: {
			title: "Planetoid Boost",
			description: "Money gain is increased based on Planetoids",
			cost: new Decimal(10),
			effect() {
				return player.planetoid.points.add(1).pow(0.38);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Planetoids",
			currencyLocation() {
				return player.planetoid;
			},
			currencyInternalName: "points",
		},
		12: {
			title: "Planetoid Boost+",
			description: "Rocket Fuel gain is increased based on Planetoids",
			cost: new Decimal(100),
			effect() {
				return player.planetoid.points.add(1).pow(0.34);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Planetoids",
			currencyLocation() {
				return player.planetoid;
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
			title: "Planetoid Boost++",
			description: "Rocket Cost is decreased based on Planetoids",
			cost: new Decimal(1000),
			effect() {
				return player.planetoid.points.add(1).pow(0.3);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "Planetoids",
			currencyLocation() {
				return player.planetoid;
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
			title: "Planetoid Boost+++",
			description: "Astronaut gain is increased based on Planetoids",
			cost: new Decimal(10000),
			effect() {
				return player.planetoid.points.add(1).pow(0.26);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Planetoids",
			currencyLocation() {
				return player.planetoid;
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
			title: "Mega Planetoid Booster",
			description: "Asteroid gain is increased based on Planetoids",
			cost: new Decimal(100000),
			effect() {
				return player.planetoid.points.add(1).pow(0.22);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "Planetoids",
			currencyLocation() {
				return player.planetoid;
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
			title: "Asteroid Generation<br>",
			purchaseLimit: 100,
			cost(x) {
				let base = new Decimal(3);
				let mul = new Decimal(1.2);
				let result = base.times(mul.pow(x));
				return result;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" Planetoids" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/100<br>" +
					"<br>Effect: Generate " +
					format(getBuyableAmount(this.layer, 11)) +
					"% of Asteroids/s"
				);
			},
			canAfford() {
				return player.planetoid.points.gte(this.cost());
			},
			buy() {
				player.planetoid.points = player.planetoid.points.sub(this.cost());
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
				let base = new Decimal(5);
				let mul = new Decimal(1.375);
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
					" Planetoids" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/100<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id)) +
					"x Asteroids"
				);
			},
			canAfford() {
				return player.planetoid.points.gte(this.cost());
			},
			buy() {
				player.planetoid.points = player.planetoid.points.sub(this.cost());
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
			name: "The Solar System",
			canComplete: function () {
				return player.jupiter.points.gte(1);
			},
			goalDescription: "???",
			rewardDescription: "Unlock X",
			style() {
				const isCompleted = hasChallenge("planets", 11);

				return {
					"background-image": isCompleted
						? "repeating-linear-gradient(-49deg, #620A8A, #620A8A 25px, #69009a 25px, #69009a 50px)"
						: "none",
					width: "500px",
					height: "500px",
					color: "#F80BFF",
					"button-text": "Enter",
					"text-shadow": "#C817C0 0px 0px 20px",
					"font-size": "32px",
					"font-family": "Lucida Console",
					TextSize: 50,
					backgroundColor: "#620A8A",
					resetsNothing: true,
				};
			},
		},
	},
});
