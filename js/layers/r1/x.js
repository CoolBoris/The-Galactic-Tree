addLayer("xpo", {
	name: "XPO",

	symbol() {
		return "XPO";
	},

	color: "#27006C",

	nodeStyle() {
		const style = {};
		return style;
	},

	hotkeys: [],

	layerShown() {
		let visible = false;
		return visible;
	},

	position: 3,
	row: 5,
	branches: [],

	tabFormat: {},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "XPO",
	baseResource: "X",
	baseAmount() {
		return player.x.points;
	},

	requires: new Decimal(1),
	type: "normal",
	exponent: 0.00000000000000000000000000001,

	gainMult() {
		let mult = new Decimal(1);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		let base1 = new Decimal(1);
		if (getBuyableAmount("x", 11) == 0) base1 = new Decimal(0);
		let base2 = new Decimal(10).pow(getBuyableAmount("x", 11) - 1);
		let generation = base1.times(base2);
		if (hasMilestone("x", 1)) generation;
		return generation;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("xpo", keep);
	},

	autoUpgrade() {
		return false;
	},
});

addLayer("xge", {
	name: "XGE",

	symbol() {
		return "XGE";
	},

	color: "#BFDA00",

	nodeStyle() {
		const style = {};
		return style;
	},

	hotkeys: [],

	layerShown() {
		let visible = false;
		return visible;
	},

	position: 3,
	row: 5,
	branches: [],

	tabFormat: {},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "XGE",
	baseResource: "X",
	baseAmount() {
		return player.x.points;
	},

	requires: new Decimal(1),
	type: "normal",
	exponent: 0.000000000000000000000000000000000000000000000000000001,

	gainMult() {
		let mult = new Decimal(1);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		let base1 = new Decimal(1);
		if (getBuyableAmount("x", 12) == 0) base1 = new Decimal(0);
		let base2 = new Decimal(10).pow(getBuyableAmount("x", 12) - 1);
		let generation = base1.times(base2);
		if (hasMilestone("x", 1)) generation;
		return generation;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("xge", keep);
	},

	autoUpgrade() {
		return false;
	},
});

addLayer("xla", {
	name: "XLA",

	symbol() {
		return "XLA";
	},

	color: "#3BB696",

	nodeStyle() {
		const style = {};
		return style;
	},

	hotkeys: [],

	layerShown() {
		let visible = false;
		return visible;
	},

	position: 3,
	row: 5,
	branches: [],

	tabFormat: {},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "XLA",
	baseResource: "X",
	baseAmount() {
		return player.x.points;
	},

	requires: new Decimal(1),
	type: "normal",
	exponent: 0.000000000000000000000000000000000000000000000000000000000000001,

	gainMult() {
		let mult = new Decimal(1);
		mult = mult.times(player.infinity.points.add(1));
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		let base1 = new Decimal(1);
		if (getBuyableAmount("x", 13) == 0) base1 = new Decimal(0);
		let base2 = new Decimal(10).pow(getBuyableAmount("x", 13) - 1);
		let generation = base1.times(base2);
		if (hasMilestone("x", 1)) generation;
		return generation;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("xla", keep);
	},

	autoUpgrade() {
		return false;
	},
});

addLayer("x", {
	name: "X",

	symbol() {
		if (options.emojisEnabled) return "🌑";
		return "X";
	},

	color: "#810081",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.background = "radial-gradient(#49002F, #810081)";
		style.width = "125px";
		style.height = "125px";
		style["font-size"] = "50px";
		return style;
	},

	hotkeys: [
		{
			key: "x",
			description: "X: X reset",
			onPress() {
				if (canReset(this.layer) && !inChallenge("real", 11))
					doReset(this.layer);
			},
		},
	],

	layerShown() {
		let visible = false;
		if (player.infinity.points.gte(1)) visible = true;
		if (hasChallenge("planets", 11)) visible = true;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;
		return visible;
	},

	prestigeButtonText() {
		if (!hasChallenge("planets", 11)) {
			return "The Solar System Challenge required!";
		}
		const canResetNow = canReset(this.layer);

		if (canResetNow) return `+<b>1</b> X`;

		return `Requires ${format(
			getNextAt(this.layer, (canMax = false), "static")
		)} Planets`;
	},

	position: 1,
	row: 5,
	branches: ["stars", "planets"],

	tabFormat: {
		Main: {
			content: [
				"main-display",
				"blank",
				"prestige-button",
				"blank",
				"blank",
				["infobox", "main"],
			],
		},
		Xtra: {
			content: ["main-display", "blank", "milestones"],
			unlocked() {
				return player.x.points.gte(1);
			},
		},
		"X-Define": {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                    <h2><span style="color: #27006C; text-shadow: 0px 0px 20px #27006C; font-family: Lucida Console, Courier New, monospace">
                        ${format(player.xpo.points)}</span></h2> XPO`;
						return txt;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                <h2><span style="color: #BFDA00; text-shadow: 0px 0px 20px #BFDA00; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.xge.points)}</span></h2> XGE`;
						return txt;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                <h2><span style="color: #3BB696; text-shadow: 0px 0px 20px #3BB696; font-family: Lucida Console, Courier New, monospace">
                    ${format(player.xla.points)}</span></h2> XLA`;
						return txt;
					},
				],
				"blank",
				"buyables",
				"blank",
				["infobox", "respec"],
			],
			unlocked() {
				return player.x.points.gte(1);
			},
		},
		"X-More": {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
            <h2><span style="color: #27006C; text-shadow: 0px 0px 20px #27006C; font-family: Lucida Console, Courier New, monospace">
                ${format(player.xpo.points)}</span></h2> XPO`;
						return txt;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
        <h2><span style="color: #BFDA00; text-shadow: 0px 0px 20px #BFDA00; font-family: Lucida Console, Courier New, monospace">
            ${format(player.xge.points)}</span></h2> XGE`;
						return txt;
					},
				],
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
        <h2><span style="color: #3BB696; text-shadow: 0px 0px 20px #3BB696; font-family: Lucida Console, Courier New, monospace">
            ${format(player.xla.points)}</span></h2> XLA`;
						return txt;
					},
				],
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.x.points.gte(1);
			},
		},
		"Fracture fix": {
			content: ["main-display", "blank", "challenges", ["infobox", "fracture"]],
			unlocked() {
				return inChallenge("x", 12);
			},
			buttonStyle() {
				return { "border-color": "red", width: "150px" };
			},
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "X",
	baseResource: "Planets",
	baseAmount() {
		return player.planets.points;
	},

	canReset() {
		if (!hasChallenge("planets", 11)) return false;
		return player.planets.points.gte(
			getNextAt(this.layer, (canMax = false), "static")
		);
	},

	autoUpgrade() {
		if (inChallenge("real", 11)) return false;
		if (hasUpgrade("infinity", 91)) return true;
		else return false;
	},

	resetsNothing() {
		let nothing = false;
		if (hasUpgrade("infinity", 92)) nothing = true;
		return nothing;
	},

	resetDescription: "",
	requires: new Decimal(10),
	type: "static",
	exponent: 1,

	gainMult() {
		let mult = new Decimal(1);
		mult = mult.divide(player.infinity.points.add(1));
		if (player.x.points.gte(3)) mult = mult.times(-1e99999999999999);
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		return 0;
	},

	doReset(reset) {
		let keep = [];
		if (inChallenge("real", 11)) keep.push("upgrades");
		if (inChallenge("real", 11)) keep.push("points");
		if (inChallenge("real", 11)) keep.push("milestones");
		if (inChallenge("real", 11)) keep.push("buyables");
		if (inChallenge("real", 11)) keep.push("challenges");
		if (layers[reset].row > this.row) layerDataReset("x", keep);
	},

	infoboxes: {
		main: {
			title: "Introducing: Planet X",
			body() {
				return "Wow! You made it to X. This is a really big layer. It has tons of upgrades, milestones, buyables, and more!<br>You're on your own now. Good Luck!";
			},
		},
		respec: {
			title: "Respec Info",
			body() {
				return "The Respec button is really dangerous! it will do an 'X' reset and it will also reset some features of X!";
			},
		},
		fracture: {
			title: "Fracture fix info",
			body() {
				return "Since the Fracture challenge has moved to the 'Realities' tab, you need to exit this first. i dont know if this does anything but you should leave for sure.<br>When you leave you might get a message saying something like invalid points bla bla.. Ignore this and just try to enter reality II. i dont know why and how this happens but if you keep trying this will work.";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "X-R+M",
			effectDescription: "Keep Rocket Milestones",
			done() {
				return player.x.points.gte(1);
			},
		},
		2: {
			requirementDescription: "X-PL4",
			effectDescription: "Bulk buy Planets",
			done() {
				return player.x.points.gte(1);
			},
		},
		3: {
			requirementDescription: "XX-C04S",
			effectDescription: "Keep Comets & Asteroid Milestones",
			unlocked() {
				return hasMilestone(this.layer, 1);
			},
			done() {
				return player.x.points.gte(2);
			},
		},
		4: {
			requirementDescription: "XX-ST4",
			effectDescription: "Bulk buy Stars",
			unlocked() {
				return hasMilestone(this.layer, 1);
			},
			done() {
				return player.x.points.gte(2);
			},
		},
		5: {
			requirementDescription: "XXX-ULT",
			effectDescription: "Unlock Realities & Fracture",
			unlocked() {
				return hasMilestone(this.layer, 3);
			},
			done() {
				return player.x.points.gte(3);
			},
		},
		6: {
			requirementDescription: "XXX-INF",
			effectDescription: "Unlock Infinity",
			unlocked() {
				return hasMilestone(this.layer, 3);
			},
			done() {
				return player.x.points.gte(3);
			},
		},
	},

	upgrades: {
		11: {
			title: "XPO-B00",
			description: "Rocket Fuel gain is increased based on XPO",
			cost: new Decimal(19),
			effect() {
				return player.xpo.points.add(10).pow(0.5);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "XPO",
			currencyLocation() {
				return player.xpo;
			},
			currencyInternalName: "points",
			unlocked() {
				return player.xpo.points.gte(0.1);
			},
		},
		12: {
			title: "XPO-XTR",
			description: "Unlock 5 Rocket Fuel Upgrades",
			cost: new Decimal(171),
			currencyDisplayName: "XPO",
			currencyLocation() {
				return player.xpo;
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
			title: "XPO-SDU",
			description: "Stardust gain is increased based on XPO",
			cost: new Decimal(104),
			effect() {
				return player.xpo.points.add(1).pow(0.227);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "XPO",
			currencyLocation() {
				return player.xpo;
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
			title: "XPO-SPD",
			description: "Unlock 2 Space Milestones",
			cost: new Decimal(334),
			currencyDisplayName: "XPO",
			currencyLocation() {
				return player.xpo;
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
			title: "XPO-AAA",
			description: "1,000x Asteroids",
			cost: new Decimal(322),
			currencyDisplayName: "XPO",
			currencyLocation() {
				return player.xpo;
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
			title: "XGE-MMM",
			description: "Money gain is increased based on XGE",
			cost: new Decimal(65),
			effect() {
				return player.xge.points.add(10).pow(1.1);
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			currencyDisplayName: "XGE",
			currencyLocation() {
				return player.xge;
			},
			currencyInternalName: "points",
			unlocked() {
				return player.xge.points.gte(0.1);
			},
		},
		22: {
			title: "XGE-RO+",
			description: "Unlock 2 Rocket Upgrades",
			cost: new Decimal(228),
			currencyDisplayName: "XGE",
			currencyLocation() {
				return player.xge;
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
			title: "XGE-ROD",
			description: "Rocket cost is decreased based on XGE",
			cost: new Decimal(112),
			effect() {
				return player.xge.points.add(10).pow(4);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XGE",
			currencyLocation() {
				return player.xge;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		24: {
			title: "XGE-SRO",
			description: "Unlock 1 Space Milestone",
			cost: new Decimal(157),
			currencyDisplayName: "XGE",
			currencyLocation() {
				return player.xge;
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
			title: "XGE-ROX",
			description: "Rocket cost is decreased based on XGE",
			cost: new Decimal(13),
			effect() {
				return player.xge.points.add(10).pow(4);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XGE",
			currencyLocation() {
				return player.xge;
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
			title: "XLA-RO1",
			description: "Rocket cost is decreased based on XLA",
			cost: new Decimal(105),
			effect() {
				return player.xla.points.add(1).pow(2);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XLA",
			currencyLocation() {
				return player.xla;
			},
			currencyInternalName: "points",
			unlocked() {
				return player.xla.points.gte(0.1);
			},
		},
		32: {
			title: "XLA-RO2",
			description: "Rocket cost is decreased based on XLA",
			cost: new Decimal(208),
			effect() {
				return player.xla.points.add(1).pow(2);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XLA",
			currencyLocation() {
				return player.xla;
			},
			currencyInternalName: "points",
			unlocked() {
				return (
					hasUpgrade(this.layer, previousUpgradeID(this.id)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
		},
		33: {
			title: "XLA-RO3",
			description: "Rocket cost is decreased based on XLA",
			cost: new Decimal(2),
			effect() {
				return player.xla.points.add(1).pow(3);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XLA",
			currencyLocation() {
				return player.xla;
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
			title: "XLA-RO4",
			description: "Rocket cost is decreased based on XLA",
			cost: new Decimal(124),
			effect() {
				return player.xla.points.add(1).pow(4);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XLA",
			currencyLocation() {
				return player.xla;
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
			title: "XLA-RO5",
			description: "Rocket cost is decreased based on XLA",
			cost: new Decimal(303),
			effect() {
				return player.xla.points.add(1).pow(5);
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			currencyDisplayName: "XLA",
			currencyLocation() {
				return player.xla;
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
		respec() {
			player.x.buyables[11] = decimalZero;
			player.x.buyables[12] = decimalZero;
			player.x.buyables[13] = decimalZero;
			player.xpo.points = decimalZero;
			player.xge.points = decimalZero;
			player.xla.points = decimalZero;
			doReset(this.layer, true);
		},
		showRespec() {
			return player.subtabs.x.mainTabs == "X-Define";
		},
		respecText: () => "Respec",
		11: {
			title: "X-XPO<br>",
			style() {
				return {
					width: "175px",
					height: "175px",
				};
			},
			cost() {
				let mult = new Decimal(1);
				mult = mult.add(getBuyableAmount(this.layer, 11));
				mult = mult.add(getBuyableAmount(this.layer, 12));
				mult = mult.add(getBuyableAmount(this.layer, 13));
				let cost = new Decimal(mult);
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1);
				if (getBuyableAmount("x", 11) == 0) base1 = new Decimal(0);
				let base2 = new Decimal(10).pow(x);
				let eff = base1.times(base2);
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" X" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/inf<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id) / 10) +
					" XPO/s"
				);
			},
			canAfford() {
				return player.x.points.gte(this.cost());
			},
			buy() {
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		12: {
			title: "X-XGE<br>",
			style() {
				return {
					width: "175px",
					height: "175px",
				};
			},
			cost() {
				let mult = new Decimal(1);
				mult = mult.add(getBuyableAmount(this.layer, 11));
				mult = mult.add(getBuyableAmount(this.layer, 12));
				mult = mult.add(getBuyableAmount(this.layer, 13));
				let cost = new Decimal(mult);
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1);
				if (getBuyableAmount("x", 12) == 0) base1 = new Decimal(0);
				let base2 = new Decimal(10).pow(x);
				let eff = base1.times(base2);
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" X" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/inf<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id) / 10) +
					" XGE/s"
				);
			},
			canAfford() {
				return player.x.points.gte(this.cost());
			},
			buy() {
				setBuyableAmount(
					this.layer,
					this.id,
					getBuyableAmount(this.layer, this.id).add(1)
				);
			},
		},
		13: {
			title: "X-XLA<br>",
			style() {
				return {
					width: "175px",
					height: "175px",
				};
			},
			cost() {
				let mult = new Decimal(1);
				mult = mult.add(getBuyableAmount(this.layer, 11));
				mult = mult.add(getBuyableAmount(this.layer, 12));
				mult = mult.add(getBuyableAmount(this.layer, 13));
				let cost = new Decimal(mult);
				return cost;
			},
			effect(x) {
				let base1 = new Decimal(1);
				if (getBuyableAmount("x", 13) == 0) base1 = new Decimal(0);
				let base2 = new Decimal(10).pow(x);
				let eff = base1.times(base2);
				return eff;
			},
			display() {
				return (
					"Cost: " +
					format(tmp[this.layer].buyables[this.id].cost) +
					" X" +
					"<br>Bought: " +
					getBuyableAmount(this.layer, this.id) +
					"/inf<br>" +
					"<br>Effect: " +
					format(buyableEffect(this.layer, this.id) / 10) +
					" XLA/s"
				);
			},
			canAfford() {
				return player.x.points.gte(this.cost());
			},
			buy() {
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
			name: "Fix Fracture",
			canComplete: function () {
				return player.points.gte("1e30000000");
			},
			challengeDescription: "read infobox<br>",
			goalDescription: "???",
			rewardDescription: "???",
		},
	},
});
