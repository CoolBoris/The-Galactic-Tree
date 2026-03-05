addLayer("s", {
	name: "Space",

	symbol() {
		if (options.emojisEnabled) return "🌌";
		return "S";
	},

	color: "#8E00FF",

	nodeStyle() {
		const style = {};
		if (options.emojisEnabled) {
			style.color = "white";
		}

		style.background = "radial-gradient(#8E00FF, #810081)";
		style.width = "125px";
		style.height = "125px";
		style["font-size"] = "50px";
		return style;
	},

	hotkeys: [],

	layerShown() {
		let visible = false;
		if (
			hasMilestone("ro", 15) ||
			player.s.unlocked ||
			player.infinity.points.gte(1)
		)
			visible = true;
		if (
			inChallenge("stars", 11) ||
			inChallenge("planets", 11) ||
			inChallenge("real", 11)
		)
			visible = false;
		return visible;
	},

	componentStyles: {
		"prestige-button"() {
			const hidden = !player.s.points.eq(0);

			return {
				background: hidden ? "none" : "radial-gradient(#a00adb, #aa108b)",
				width: hidden ? "0px" : "300px",
				height: hidden ? "0px" : "200px",
				border: hidden ? "0px" : "4px",
				"font-size": hidden ? "0px" : "22px",
				overflow: "hidden",
			};
		},
	},

	onPrestige(gain) {
		player.subtabs.s.mainTabs = "Main";
	},

	prestigeButtonText() {
		return "Launch your rockets and break into space!<br><br>(One-time reset)";
	},

	milestonePopups() {
		let popup = true;
		if (options.SpaceMilestonePopup == true) popup = true;
		else popup = false;
		return popup;
	},

	onTabOpen() {
		if (player.s.points.eq(0)) {
			player.subtabs.s.mainTabs = "???";
		}
	},

	position: 1,
	row: 3,
	branches: ["ro", "as", "r"],

	tabFormat: {
		Main: {
			content: [
				"main-display",
				"resource-display",
				"blank",
				["infobox", "main"],
				["infobox", "main2"],
			],
			unlocked() {
				return player.s.points.gte(1);
			},
		},
		Upgrades: {
			content: ["main-display", "blank", "upgrades"],
			unlocked() {
				return player.s.points.gte(1);
			},
		},
		Milestones: {
			content: ["main-display", "blank", "milestones"],
			unlocked() {
				return player.s.points.gte(1);
			},
		},
		"???": {
			content: ["prestige-button"],
			unlocked() {
				return player.s.points.equals(new Decimal(0));
			},
		},
	},

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
		};
	},

	resource: "Space Distance",
	baseResource: "Rockets",
	baseAmount() {
		return player.ro.points;
	},

	resetDescription: "Launch a Rocket into space! ",
	requires: new Decimal(15),
	type: "static",
	exponent: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999,

	gainMult() {
		let mult = new Decimal(1);
		return mult;
	},

	gainExp() {
		return new Decimal(1);
	},

	passiveGeneration() {
		let mult = new Decimal(1);
		mult = mult.times(player.infinity.points.add(1));

		if (inChallenge("real", 11)) return 0;
		if (hasMilestone("s", 16)) return mult.times(5e13);
		if (hasMilestone("s", 15)) return mult.times(2.5e12);
		if (hasMilestone("s", 14)) return mult.times(2.5e11);
		if (hasMilestone("s", 13)) return mult.times(1e10);
		if (hasUpgrade("infinity", 45)) return mult.times(1e9);
		if (hasMilestone("s", 12)) return mult.times(5e8);
		if (hasMilestone("s", 11)) return mult.times(4e7);
		if (hasMilestone("s", 10)) return mult.times(5e6);
		if (hasMilestone("s", 9)) return mult.times(200000);
		if (hasUpgrade("infinity", 44)) return mult.times(100000);
		if (hasMilestone("s", 8)) return mult.times(40000);
		if (hasMilestone("s", 7)) return mult.times(7500);
		if (hasMilestone("s", 6)) return mult.times(1000);
		if (hasMilestone("s", 5)) return mult.times(250);
		if (hasUpgrade("infinity", 43)) return mult.times(100);
		if (hasMilestone("s", 4)) return mult.times(50);
		if (hasMilestone("s", 3)) return mult.times(10);
		if (hasMilestone("s", 2)) return mult.times(3);
		if (hasUpgrade("infinity", 42)) return mult.times(1);
		if (hasMilestone("s", 1)) return mult.times(1);
		return 0;
	},

	doReset(reset) {
		if (reset === "infinity") {
			layerDataReset("s", []);
			return;
		}

		let keep = [];
		keep.push("upgrades");
		keep.push("points");
		keep.push("milestones");
		keep.push("buyables");
		if (layers[reset].row > this.row) layerDataReset("s", keep);
	},

	autoUpgrade() {
		if (hasUpgrade("infinity", 41)) return true;
		return false;
	},

	infoboxes: {
		main: {
			title: "Introducing: Space",
			body() {
				return "Congrats! you made it into Space. This is a big layer and a lot of the game supports on this layer. There are a ton of Upgrades and Milestones. Each second you travel 1 meter in Space, you can increase this by completing Milestones. Good Luck!";
			},
		},
		main2: {
			title: "Extra",
			body() {
				return "This layer never resets <br><br> 1 Space Distance = 1m <br> 1,000 Space Distance = 1km <br> 149,597,871km = 1 Astronomical Unit";
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "Entering Space",
			effectDescription: "1 Space Distance/s & 3x Money",
			done() {
				return player.s.points.gte(1);
			},
		},
		2: {
			requirementDescription: "200 Space Distance (200m) & 5 Rockets",
			effectDescription: "3 Space Distance/s & 2x Astronauts",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(200) && player.ro.points.gte(5);
			},
		},
		3: {
			requirementDescription: "750 Space Distance (750m) & 1e9 Astronauts",
			effectDescription: "10 Space Distance/s & 1 New Rocket Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(750) && player.as.points.gte(1e9);
			},
		},
		4: {
			requirementDescription: "1,750 Space Distance (1.75km) & 15 Rockets",
			effectDescription: "50 Space Distance/s & 25% of Astronauts/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(1750) && player.ro.points.gte(15);
			},
		},
		5: {
			requirementDescription: "4,000 Space Distance (4km) & 1e30 Rocket Fuel",
			effectDescription: "250 Space Distance/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(4000) && player.r.points.gte(1e30);
			},
		},
		6: {
			requirementDescription: "15,000 Space Distance (15km)",
			effectDescription: "1,000 Space Distance/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(15000);
			},
		},
		7: {
			requirementDescription:
				"150,000 Space Distance (100km) & 1e28 Astronauts",
			effectDescription: "7,500 Space Distance/s & 3x Comets & Asteroids",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(150000) && player.as.points.gte(1e28);
			},
		},
		8: {
			requirementDescription:
				"1,500,000 Space Distance (1,500km) & 10 Comets & Asteroids",
			effectDescription: "40,000 Space Distance/s & 500% of Rocket Fuel/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return (
					player.s.points.gte(1500000) &&
					player.c.points.gte(10) &&
					player.ast.points.gte(10)
				);
			},
		},
		9: {
			requirementDescription:
				"10,000,000 Space Distance (10,000km) & 100,000 Comets & Asteroids",
			effectDescription: "200,000 Space Distance/s & 1 New Space Upgrade",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return (
					player.s.points.gte(1e7) &&
					player.c.points.gte(1e5) &&
					player.ast.points.gte(1e5)
				);
			},
		},
		10: {
			requirementDescription: "100,000,000 Space Distance (100,000km) & 1 Star",
			effectDescription: "5,000,000 Space Distance/s & 100% of Astronauts/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(100000000) && player.stars.points.gte(1);
			},
		},
		11: {
			requirementDescription:
				"1e9 Space Distance (1,000,000km) & 2500 Stardust",
			effectDescription: "40,000,000 Space Distance/s & 1000% of Rocket Fuel/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(1e9) && player.stardust.points.gte(2500);
			},
		},
		12: {
			requirementDescription: "1e10 Space Distance (10,000,000km) & 5 Stars",
			effectDescription: "500,000,000 Space Distance/s",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(1e10) && player.stars.points.gte(5);
			},
		},
		13: {
			requirementDescription:
				"1.49e11 Space Distance (1 Astronomical Unit) & 10 Stars",
			effectDescription: "1e10 Space Distance/s & Unlock The Sun",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(1.49e11) && player.stars.points.gte(10);
			},
		},
		14: {
			requirementDescription:
				"4e12 Space Distance (33.4 Astronomical Units) & 250 XPO",
			effectDescription: "2.5e11 Space Distance/s & 1,000,000x Astronauts",
			unlocked() {
				return (
					hasMilestone(this.layer, previousMilestoneID(this.id)) &&
					hasUpgrade("x", 14)
				);
			},
			done() {
				return (
					player.s.points.gte(4e12) &&
					player.xpo.points.gte(250) &&
					hasUpgrade("x", 14)
				);
			},
		},
		15: {
			requirementDescription:
				"1e14 Space Distance (668.5 Astronomical Units) & 500 XPO",
			effectDescription: "2.5e12 Space Distance/s",
			unlocked() {
				return (
					hasMilestone(this.layer, previousMilestoneID(this.id)) &&
					hasUpgrade("x", 14)
				);
			},
			done() {
				return (
					player.s.points.gte(1e14) &&
					player.xpo.points.gte(500) &&
					hasUpgrade("x", 14)
				);
			},
		},
		16: {
			requirementDescription:
				"3e15 Space Distance (20,054 Astronomical Units) & 300 XGE",
			effectDescription:
				"5e13 Space Distance/s & /1e12 Rocket Cost & Better Planets Formula",
			unlocked() {
				return (
					hasMilestone(this.layer, previousMilestoneID(this.id)) &&
					hasUpgrade("x", 24)
				);
			},
			done() {
				return (
					player.s.points.gte(3e15) &&
					player.xge.points.gte(300) &&
					hasUpgrade("x", 24)
				);
			},
		},
		17: {
			requirementDescription:
				"5e16 Space Distance (334,229 Astronomical Units) & 1e100 Money",
			effectDescription: "5e15 Space Distance/s & /1e20 Rocket Cost",
			unlocked() {
				return hasMilestone(this.layer, previousMilestoneID(this.id));
			},
			done() {
				return player.s.points.gte(5e16) && player.points.gte(1e100);
			},
		},
	},

	upgrades: {
		11: {
			title: "Comet Booster",
			description: "3x Comets",
			cost: new Decimal(750000),
			unlocked() {
				return hasMilestone("c", 2);
			},
		},
		12: {
			title: "Rocket Fuel Booster",
			description: "5x Rocket Fuel",
			cost: new Decimal(50),
		},
		13: {
			title: "Rocket Booster",
			description: "/3 Rocket Price",
			cost: new Decimal(50),
		},
		14: {
			title: "Astronaut Booster",
			description: "2x Astronauts",
			cost: new Decimal(50),
		},
		15: {
			title: "Asteroid Booster",
			description: "3x Asteroids",
			cost: new Decimal(750000),
			unlocked() {
				return hasMilestone("ast", 2);
			},
		},
		21: {
			title: "Comet Booster+",
			description: "5x Comets",
			cost: new Decimal(2.5e6),
			unlocked() {
				return hasMilestone("c", 2) && hasUpgrade("s", 11);
			},
		},
		22: {
			title: "Rocket Fuel Booster+",
			description: "10x Rocket Fuel",
			cost: new Decimal(500),
			unlocked() {
				return hasUpgrade(this.layer, 12);
			},
		},
		23: {
			title: "Rocket Booster+",
			description: "/5 Rocket Price",
			cost: new Decimal(500),
			unlocked() {
				return hasUpgrade(this.layer, 13);
			},
		},
		24: {
			title: "Rocket Booster+",
			description: "4x Astronauts",
			cost: new Decimal(500),
			unlocked() {
				return hasUpgrade(this.layer, 14);
			},
		},
		25: {
			title: "Asteroid Booster+",
			description: "5x Asteroids",
			cost: new Decimal(2.5e6),
			unlocked() {
				return hasMilestone("ast", 2) && hasUpgrade("s", 15);
			},
		},
		31: {
			title: "Comet Booster++",
			description: "10x Comets",
			cost: new Decimal(1e7),
			unlocked() {
				return hasMilestone("c", 2) && hasUpgrade("s", 21);
			},
		},
		32: {
			title: "Rocket Fuel Booster++",
			description: "20x Rocket Fuel",
			cost: new Decimal(7500),
			unlocked() {
				return hasUpgrade(this.layer, 22);
			},
		},
		33: {
			title: "Rocket Booster++",
			description: "/10 Rocket Price",
			cost: new Decimal(7500),
			unlocked() {
				return hasUpgrade(this.layer, 23);
			},
		},
		34: {
			title: "Rocket Booster++",
			description: "10x Astronauts",
			cost: new Decimal(7500),
			unlocked() {
				return hasUpgrade(this.layer, 24);
			},
		},
		35: {
			title: "Asteroid Booster++",
			description: "10x Asteroids",
			cost: new Decimal(1e7),
			unlocked() {
				return hasMilestone("ast", 2) && hasUpgrade("s", 25);
			},
		},
		41: {
			title: "Mega Comet Booster",
			description: "25x Comets",
			cost: new Decimal(4e7),
			unlocked() {
				return hasMilestone("c", 4) && hasUpgrade("s", 31);
			},
		},
		42: {
			title: "Comet Research",
			description: "5x Comets",
			cost: new Decimal(500000),
			unlocked() {
				return hasMilestone("c", 1);
			},
		},
		43: {
			title: "Mega Booster",
			description:
				"100x Money, 50x Rocket Fuel, /25 Rocket Price & 25x Astronauts",
			cost: new Decimal(100000),
			unlocked() {
				return (
					hasUpgrade(this.layer, 32) &&
					hasUpgrade(this.layer, 33) &&
					hasUpgrade(this.layer, 34)
				);
			},
		},
		44: {
			title: "Asteroid Research",
			description: "5x Asteroids",
			cost: new Decimal(500000),
			unlocked() {
				return hasMilestone("ast", 1);
			},
		},
		45: {
			title: "Mega Asteroid Booster",
			description: "25x Asteroids",
			cost: new Decimal(4e7),
			unlocked() {
				return hasMilestone("ast", 4) && hasUpgrade("s", 35);
			},
		},
		51: {
			title: "Mega Ultra Booster",
			description:
				"500x Money, 200x Rocket Fuel, /100 Rocket Price & 75x Astronauts",
			cost: new Decimal(1e8),
			unlocked() {
				return (
					hasUpgrade(this.layer, 42) &&
					hasUpgrade(this.layer, 43) &&
					hasUpgrade(this.layer, 44) &&
					hasMilestone("s", 9)
				);
			},
		},
	},
});
