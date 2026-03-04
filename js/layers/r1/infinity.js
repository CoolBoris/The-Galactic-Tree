addLayer("infinity", {
	name: "Infinity",
	symbol: "♾️",
	position: 0,

	symbol() {
		if (options.emojisEnabled == true) symbol = "♾️";
		else symbol = "INF";
		return symbol;
	},

	branches: ["x"],
	row: 20,
	color: "#e73c7e",

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);
		if (canResetNow) return `♾️`;

		return `Requires 50 Rockets`;
	},

	nodeStyle() {
		const style = {};
		const canResetNow = canReset("infinity");

		if (options.emojisEnabled) {
			style.color = "white";
		}
		style.animation = canResetNow ? "rainbow 10s linear" : "";
		style["animation-iteration-count"] = canResetNow ? "infinite" : "0";
		style.width = "175px";
		style["background-color"] = "#252525";
		style.height = "175px";
		style["font-size"] = "75px";
		return style;
	},

	layerShown() {
		let visible = false;
		if (hasMilestone("x", 6)) visible = true;
		if (player.infinity.points.gte(1)) visible = true;
		if (inChallenge("stars", 11) || inChallenge("planets", 11)) visible = false;
		if (inChallenge("real", 11)) visible = false;

		return visible;
	},

	componentStyles: {
		"prestige-button"() {
			const canResetNow = canReset("infinity");
			return {
				animation: canResetNow ? "rainbow 10s linear" : "",
				"animation-iteration-count": canResetNow ? "infinite" : "0",
				width: "300px",
				height: "200px",
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
						<h2><span style="color: #3cdfdf; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.infinity.shards)}</span></h2> Infinity Shards`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				["infobox", "main"],
				"blank",
				[
					"display-text",
					function () {
						return `You will gain ${formatWhole(
							getResetGain("infinity")
						)} Infinities on reset`;
					},
				],
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
						<h2><span style="color: #3cdfdf; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
							${formatWhole(player.infinity.shards)}</span></h2> Infinity Shards`;
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
				return (
					player.inf.points.gte(1) ||
					player.megainf.points.gte(1) ||
					player.omegainf.points.gte(1)
				);
			},
			buttonStyle() {
				return { "border-color": "#00ff3c" };
			},
			shouldNotify: true,
			glowColor: "#00ff3c",
		},
	},

	onPrestige(gain) {
		player.infinity.shards = player.infinity.shards.add(
			getResetGain("infinity", "normal")
		);
	},

	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
			shards: new Decimal(0),
		};
	},

	requires: new Decimal(50),
	resource: "Infinities",
	baseResource: "Rockets",
	baseAmount() {
		return player.ro.points;
	},

	type: "normal",
	exponent: 0.0000001,

	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("blob", 31)) mult = mult.add(1);
		if (hasUpgrade("infinity", 101)) mult = mult.add(1);
		if (hasUpgrade("infinity", 102)) mult = mult.add(1);
		if (hasUpgrade("infinity", 103)) mult = mult.add(1);
		if (hasUpgrade("infinity", 104)) mult = mult.add(1);
		if (hasUpgrade("infinity", 105)) mult = mult.add(1);

		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	effect() {
		let effectboost = new Decimal(1).add(player.infinity.points);
		return effectboost;
	},

	effectDescription() {
		return (
			"which multiplies EVERYTHING by " + format(tmp.infinity.effect) + "x"
		);
	},

	doReset(reset) {
		let keep = [];
		keep.push("upgrades");
		keep.push("points");
		keep.push("milestones");
		if (layers[reset].row > this.row) layerDataReset("infinity", keep);
	},

	clickables: {
		11: {
			title: "Infinity Conversion",
			display() {
				let total = player.inf.points
					.add(player.megainf.points.times(10))
					.add(player.omegainf.points.times(100));

				return `
        <b>Convert old Infinities into new Infinities</b><br>
        ${formatWhole(player.inf.points)} Old Infinities
        + ${formatWhole(player.megainf.points)} Mega Infinities (×10)
        + ${formatWhole(player.omegainf.points)} Omega Infinities (×100)
        <hr style="margin: 4px 0;">
        = <b>${formatWhole(total)}</b> New Infinities & Infinity Shards
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
				player.subtabs.infinity.mainTabs = "Main";
				let total = player.inf.points
					.add(player.megainf.points.times(10))
					.add(player.omegainf.points.times(100));

				player.infinity.points = new Decimal(player.infinity.points).add(total);
				player.infinity.shards = new Decimal(player.infinity.shards).add(total);
				player.inf.points = new Decimal(0);
				player.megainf.points = new Decimal(0);
				player.omegainf.points = new Decimal(0);
			},
			unlocked() {
				return (
					player.inf.points.gte(1) ||
					player.megainf.points.gte(1) ||
					player.omegainf.points.gte(1)
				);
			},
		},
	},

	infoboxes: {
		main: {
			title: "Introducing: Infinity",
			body() {
				return "Infinity resets <b>EVERYTHING from Reality I</b>, even Space, The Sun and The Solar System. Infinity is not required to progress, you've basically completed Reality I. Infinity is just a way to replay Reality I. Each Infinity gives an Infinity Shard, which can be used on Infinity Upgrades to make your game faster. You also get a multiplier to everything from Reality I based on your Infinities.";
			},
		},
		roles: {
			title: "Infinity Roles",
			body() {
				return "These roles can be claimed in the CoolBoris Studio discord server. This is not required, only if you care about status and fame you can claim these by sending proof in the '📷┃proof' channel";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "10 Infinities",
			effectDescription: "CoolBoris Studio Infinity Role 1",
			done() {
				return player.infinity.points.gte(10);
			},
		},
		2: {
			requirementDescription: "100 Infinities",
			effectDescription: "CoolBoris Studio Infinity Role 2",
			done() {
				return player.infinity.points.gte(100);
			},
		},
		3: {
			requirementDescription: "1,000 Infinities",
			effectDescription: "CoolBoris Studio Infinity Role 3",
			done() {
				return player.infinity.points.gte(1000);
			},
		},
	},

	upgrades: {
		11: {
			title: "Auto-buy Rocket Fuel Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		12: {
			title: "100% of Rocket Fuel/s",
			cost: new Decimal(3),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		21: {
			title: "Auto-buy Rocket Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		22: {
			title: "Bulk buy Rockets",
			cost: new Decimal(3),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		23: {
			title: "Rockets reset nothing",
			cost: new Decimal(10),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		24: {
			title: "Automatically get Rockets",
			description: "(Rockets reset nothing recommended first)",
			cost: new Decimal(25),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		31: {
			title: "Auto-buy Astronaut Upgrades",
			cost: new Decimal(2),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		32: {
			title: "100% of Astronauts/s",
			cost: new Decimal(3),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		41: {
			title: "Auto-buy Space Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		42: {
			title: "Always start with 1 Space Distance/s",
			cost: new Decimal(3),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		43: {
			title: "Always start with 100 Space Distance/s",
			cost: new Decimal(5),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 42);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		44: {
			title: "Always start with 100,000 Space Distance/s",
			cost: new Decimal(15),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 43);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		45: {
			title: "Always start with 1e9 Space Distance/s",
			cost: new Decimal(50),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 44);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		51: {
			title: "Auto-buy Comet Upgrades",
			cost: new Decimal(2),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		52: {
			title: "100% of Comets/s",
			cost: new Decimal(8),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		53: {
			title: "Keep Comet Challenges",
			cost: new Decimal(100),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		61: {
			title: "Auto-buy Asteroid Upgrades",
			cost: new Decimal(2),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		62: {
			title: "100% of Asteroids/s",
			cost: new Decimal(8),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		63: {
			title: "Keep Asteroid Challenges",
			cost: new Decimal(100),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		71: {
			title: "Auto-buy Star Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		72: {
			title: "Auto-buy Star Buyables",
			cost: new Decimal(10),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		73: {
			title: "Bulk buy Stars",
			cost: new Decimal(10),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		74: {
			title: "Stars reset nothing",
			cost: new Decimal(25),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		75: {
			title: "Automatically get Stars",
			description: "(Stars reset nothing recommended first)",
			cost: new Decimal(50),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		81: {
			title: "Auto-buy Planet Upgrades",
			cost: new Decimal(1),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		82: {
			title: "Auto-buy Planet Buyables",
			cost: new Decimal(10),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		83: {
			title: "Bulk buy Planets",
			cost: new Decimal(10),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		84: {
			title: "Planets reset nothing",
			cost: new Decimal(25),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		85: {
			title: "Automatically get Planets",
			description: "(Planets reset nothing recommended first)",
			cost: new Decimal(50),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		91: {
			title: "Auto-buy X Upgrades",
			cost: new Decimal(3),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		92: {
			title: "X reset nothing",
			cost: new Decimal(100),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		93: {
			title: "Keep The Sun",
			cost: new Decimal(100),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		94: {
			title: "Keep The Solar System",
			cost: new Decimal(250),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		101: {
			title: "+1 Infinity",
			cost: new Decimal(5),
			currencyDisplayName: "Infinity Shard",
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		102: {
			title: "+1 Infinity",
			cost: new Decimal(50),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 101);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		103: {
			title: "+1 Infinity",
			cost: new Decimal(500),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 102);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		104: {
			title: "+1 Infinity",
			cost: new Decimal(5000),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 103);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
		105: {
			title: "+1 Infinity",
			cost: new Decimal(50000),
			currencyDisplayName: "Infinity Shard",
			unlocked() {
				return hasUpgrade(this.layer, 104);
			},
			currencyLocation() {
				return player.infinity;
			},
			currencyInternalName: "shards",
		},
	},
});
