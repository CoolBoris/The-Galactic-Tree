addLayer("negativeinfinity", {
	name: "Negative Infinity",
	symbol: "-♾️",
	position: 0,

	symbol() {
		if (options.emojisEnabled == true) symbol = "-♾️";
		else symbol = "-INF";
		return symbol;
	},

	branches: ["universe"],
	row: 20,
	color: "#b43ce7",

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);
		if (canResetNow) return `-♾️`;

		return `Requires 5 Universes`;
	},

	nodeStyle() {
		const style = {};
		const canResetNow = canReset("negativeinfinity");

		if (options.emojisEnabled) {
			style.color = "white";
		}
		style.animation = canResetNow ? "negativeinfinity 5s linear" : "";
		style["animation-iteration-count"] = canResetNow ? "infinite" : "0";
		style.width = "175px";
		style["background-color"] = "#252525";
		style.height = "175px";
		style["font-size"] = "75px";
		return style;
	},

	layerShown() {
		if (player.negativeinfinity.points.gte(1)) return true;
		if (!inChallenge("real", 11)) return false;
		if (player.universe.points.gte(5)) return true;
		return false;
	},

	componentStyles: {
		"prestige-button"() {
			const canResetNow = canReset("negativeinfinity");
			return {
				animation: canResetNow ? "negativeinfinity 5s linear" : "",
				"animation-iteration-count": canResetNow ? "infinite" : "0",
				width: "300px",
				height: "200px",
				color: canResetNow ? "white" : null,
				"font-size": canResetNow ? "100px" : "23px",
			};
		},
	},

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
						<h2><span style="color: #341d72; text-shadow: 0px 0px 20px #9769ad; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.negativeinfinity.shards)}</span></h2> Negative Infinity Shards`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				["infobox", "main"],
				"blank",
			],
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
						<h2><span style="color: #341d72; text-shadow: 0px 0px 20px #9769ad; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.negativeinfinity.shards)}</span></h2> Negative Infinity Shards`;
						return txt;
					},
				],
				"blank",
				"upgrades",
			],
		},

		Rewards: {
			content: ["main-display", "milestones", "blank", ["infobox", "roles"]],
			buttonStyle() {
				return { "border-color": "#3006ba" };
			},
		},

		"Infinity Conversion": {
			content: ["clickables"],
			unlocked() {
				return player.negativeinf.points.gte(1);
			},
			buttonStyle() {
				return { "border-color": "#00ff3c" };
			},
			shouldNotify: true,
			glowColor: "#00ff3c",
		},
	},

	onPrestige(gain) {
		player.negativeinfinity.shards = player.negativeinfinity.shards.add(
			getResetGain("negativeinfinity", "normal"),
		);
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			shards: new Decimal(0),
		};
	},

	requires: new Decimal(5),
	resource: "Infinities",
	baseResource: "Universes",
	baseAmount() {
		return player.universe.points;
	},

	type: "normal",
	exponent: 0.0000001,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("blob", 51)) mult = mult.add(1);
		if (hasUpgrade("negativeinfinity", 101)) mult = mult.add(1);
		if (hasUpgrade("negativeinfinity", 102)) mult = mult.add(1);
		if (hasUpgrade("negativeinfinity", 103)) mult = mult.add(1);
		if (hasUpgrade("negativeinfinity", 104)) mult = mult.add(1);
		if (hasUpgrade("negativeinfinity", 105)) mult = mult.add(1);

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	effect() {
		let effectboost = new Decimal(1).add(player.negativeinfinity.points);
		return effectboost;
	},

	effectDescription() {
		return (
			"which multiply EVERYTHING by " +
			format(tmp.negativeinfinity.effect) +
			"x"
		);
	},

	doReset(reset) {
		let keep = [];
		keep.push("upgrades");
		keep.push("points");
		keep.push("milestones");
		if (layers[reset].row > this.row) layerDataReset("negativeinfinity", keep);
	},

	clickables: {
		11: {
			title: "Negative Infinity Conversion",
			display() {
				let total = player.negativeinf.points;
				return `
        <b>Convert old Infinities into new Infinities</b><br>
        ${formatWhole(player.negativeinf.points)} Old Negative Infinities
        <hr style="margin: 4px 0;">
        = <b>${formatWhole(total)}</b> New Negative Infinities & Negative Infinity Shards
      `;
			},
			style() {
				return {
					"background-color": "#c41e3a",
					"background-image":
						"linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)",
					height: "250px",
					width: "400px",
					"border-radius": "8px",
					"box-shadow": "0 4px 8px rgba(0,0,0,0.3)",
					color: "white",
					"font-size": "14px",
					"line-height": "1.4",
				};
			},
			canClick: true,
			onClick() {
				player.subtabs.negativeinfinity.mainTabs = "Main";
				let total = player.negativeinf.points;

				player.negativeinfinity.points = new Decimal(
					player.negativeinfinity.points,
				).add(total);
				player.negativeinfinity.shards = new Decimal(
					player.negativeinfinity.shards,
				).add(total);
				player.negativeinf.points = new Decimal(0);
			},
			unlocked() {
				return player.negativeinf.points.gte(1);
			},
		},
	},

	infoboxes: {
		main: {
			title: "Introducing: Negative Infinity",
			body() {
				return "Negative Infinity resets <b>EVERYTHING from Reality II</b>. Negative Infinity is not required to progress, you've basically completed Reality II. Negative Infinity is just a way to replay Reality II. Each Negative Infinity gives a Negative Infinity Shard, which can be used on Negative Infinity Upgrades to make your game faster. You also get a multiplier to everything from Reality II based on your Negative Infinities.<br><br><span style=\"color: #ff4444;\">Negative Infinity doesn't have any Universe Boosts right now. Universes are brand new and it would be too fast for now. Universe automation and boosts will be added in the future.</span>";
			},
		},
		roles: {
			title: "Negative Infinity Roles",
			body() {
				return "These roles can be claimed in the CoolBoris Studio discord server. This is not required, only if you care about status and fame you can claim these by sending proof in the '📷┃proof' channel";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "10 Negative Infinities",
			effectDescription: "CoolBoris Studio Negative Infinity Role 1",
			done() {
				return player.negativeinfinity.points.gte(10);
			},
		},
		2: {
			requirementDescription: "100 Negative Infinities",
			effectDescription: "CoolBoris Studio Negative Infinity Role 2",
			done() {
				return player.negativeinfinity.points.gte(100);
			},
		},
		3: {
			requirementDescription: "1,000 Negative Infinities",
			effectDescription: "CoolBoris Studio Negative Infinity Role 3",
			done() {
				return player.negativeinfinity.points.gte(1000);
			},
		},
	},

	upgrades: {
		11: {
			title: "Auto-buy Unstable Rocket Fuel Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Negative Infinity Shard",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		12: {
			title: "100% of Unstable Rocket Fuel/s",
			cost: new Decimal(3),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		21: {
			title: "Bulk buy Galaxies",
			cost: new Decimal(2),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		22: {
			title: "Galaxies reset nothing",
			cost: new Decimal(8),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		23: {
			title: "Automatically get Galaxies",
			description: "(Galaxies reset nothing recommended first)",
			cost: new Decimal(25),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		24: {
			title: "Auto-buy Cosmos Upgrades",
			cost: new Decimal(8),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		31: {
			title: "100% of Dark Matter/s",
			cost: new Decimal(5),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		32: {
			title: "Auto-buy Dark Matter Buyables",
			cost: new Decimal(5),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		33: {
			title: "Dark Matter Buyables cost nothing",
			cost: new Decimal(10),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		34: {
			title: "Bulk buy Dark Matter Buyables",
			cost: new Decimal(25),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		41: {
			title: "Auto-buy Energy Upgrades",
			cost: new Decimal(12),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		42: {
			title: "Supernovas reset nothing",
			cost: new Decimal(80),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		43: {
			title: "Automatically get Supernovas",
			cost: new Decimal(100),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		51: {
			title: "100% of Void/s",
			cost: new Decimal(12),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		52: {
			title: "Auto-buy Black Hole Buyables",
			cost: new Decimal(15),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		53: {
			title: "Black Hole Buyables cost nothing",
			cost: new Decimal(20),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		54: {
			title: "Bulk buy Black Hole Buyables",
			cost: new Decimal(30),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		55: {
			title: "Auto-buy Black Hole Upgrades",
			cost: new Decimal(25),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		101: {
			title: "+1 Negative Infinity",
			cost: new Decimal(5),
			currencyDisplayName: "Negative Infinity Shards",
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		102: {
			title: "+1 Negative Infinity",
			cost: new Decimal(50),
			currencyDisplayName: "Negative Infinity Shards",
			unlocked() {
				return hasUpgrade(this.layer, 101);
			},
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		103: {
			title: "+1 Negative Infinity",
			cost: new Decimal(500),
			currencyDisplayName: "Negative Infinity Shards",
			unlocked() {
				return hasUpgrade(this.layer, 102);
			},
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		104: {
			title: "+1 Negative Infinity",
			cost: new Decimal(5000),
			currencyDisplayName: "Negative Infinity Shards",
			unlocked() {
				return hasUpgrade(this.layer, 103);
			},
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
		105: {
			title: "+1 Negative Infinity",
			cost: new Decimal(50000),
			currencyDisplayName: "Negative Infinity Shards",
			unlocked() {
				return hasUpgrade(this.layer, 104);
			},
			currencyLocation() {
				return player.negativeinfinity;
			},
			currencyInternalName: "shards",
		},
	},
});
