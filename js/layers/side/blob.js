addLayer("blob", {
	resource: "blobs",
	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
		};
	},
	nodeStyle() {
		return {
			width: "1px",
			height: "1px",
		};
	},
	prestigeNotify() {
		return false;
	},
	prestigeButtonText() {
		return "blob";
	},

	color: "var(--background)",
	symbol: "",
	row: "side",
	position: "6",
	layerShown() {
		let visible = true;
		return visible;
	},
	resetDescription: "blob ",
	requires: new Decimal(0),
	resource: "Blobs",
	baseResource: "blobbers",
	baseAmount() {
		return player.blob.points;
	},
	type: "normal",
	resetsNothing: true,
	shouldNotify: false,
	gainMult() {
		let mult = new Decimal(1);
		if (hasUpgrade("blob", 11)) mult = mult.times(5);
		if (hasUpgrade("blob", 12)) mult = mult.times(5);
		if (hasUpgrade("blob", 13)) mult = mult.times(5);
		if (hasUpgrade("blob", 14)) mult = mult.times(5);
		if (hasUpgrade("blob", 15)) mult = mult.times(5);
		if (hasUpgrade("blob", 21)) mult = mult.times(5);
		if (hasUpgrade("blob", 22)) mult = mult.times(5);
		if (hasUpgrade("blob", 23)) mult = mult.times(5);
		if (hasUpgrade("blob", 24)) mult = mult.times(5);
		if (hasUpgrade("blob", 25)) mult = mult.times(5);
		if (hasUpgrade("blob", 41)) mult = mult.times(1.1);
		if (hasUpgrade("blob", 42)) mult = mult.times(5);
		if (hasUpgrade("blob", 43)) mult = mult.times(upgradeEffect("blob", 43));
		if (hasMilestone("blob", 7)) mult = mult.times(5);
		if (hasUpgrade("blob", 44)) mult = mult.times(upgradeEffect("blob", 44));
		if (hasUpgrade("blob", 45)) mult = mult.times(150);

		return mult;
	},
	tabFormat: {
		"blob 1": {
			content: [
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                        <h2><span style="color: Purple; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${player.blob.points}</span></h2> blobs!!`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"achievements",
			],
		},
		"blob 2": {
			content: [
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                        <h2><span style="color: Purple; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${player.blob.points}</span></h2> blobs!!`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"upgrades",
			],
			unlocked() {
				return hasAchievement("blob", 15);
			},
		},
		"blob 3": {
			content: [
				[
					"display-text",
					function () {
						let txt = "";
						txt =
							txt +
							`You have 
                        <h2><span style="color: Purple; text-shadow: 0px 0px 20px #AD6F69; font-family: Lucida Console, Courier New, monospace">
                            ${player.blob.points}</span></h2> blobs!!`;
						return txt;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"milestones",
			],
			unlocked() {
				return hasAchievement("blob", 25);
			},
		},
	},
	achievements: {
		11: {
			name: "blobber",
			done() {
				return player.blob.points.gte(1);
			},
			tooltip: "1 blob",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1);
				return {
					"border-color": "#ff00ff",
					"border-width": "3px",
					"border-style": "dashed",
					transform: "rotate(2deg)",
					"background-color": bought ? "#4a0066" : "#1a0033",
					width: "75px",
				};
			},
		},
		12: {
			name: "blobber noob",
			done() {
				return player.blob.points.gte(10);
			},
			tooltip: "10 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(10);
				return {
					"border-color": "#00ffcc",
					"border-width": "6px",
					"border-style": "dotted",
					transform: "rotate(-3deg) skewX(5deg)",
					"background-color": bought ? "#005544" : "#001a15",
					width: "90px",
					height: "60px",
				};
			},
		},
		13: {
			name: "blobber pro",
			done() {
				return player.blob.points.gte(100);
			},
			tooltip: "100 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(100);
				return {
					"border-color": "#ff4400",
					"border-width": "2px",
					"border-style": "double",
					transform: "skewY(-4deg)",
					"background-color": bought ? "#552200" : "#1a0a00",
					width: "110px",
					"border-radius": "0px",
				};
			},
		},
		14: {
			name: "blobber king",
			done() {
				return player.blob.points.gte(1000);
			},
			tooltip: "1,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1000);
				return {
					"border-color": "#ffff00",
					"border-width": "8px",
					"border-style": "ridge",
					transform: "rotate(5deg)",
					"background-color": bought ? "#555500" : "#1a1a00",
					width: "65px",
					height: "85px",
				};
			},
		},
		15: {
			name: "blobber champion",
			done() {
				return player.blob.points.gte(10000);
			},
			tooltip: "10,000 blobs<br>Reward: blob 2",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(10000);
				return {
					"border-color": "#cc00ff",
					"border-width": "4px",
					"border-style": "groove",
					transform: "rotate(-6deg) scale(0.9)",
					background: bought
						? "linear-gradient(135deg, #440088, #880044)"
						: "linear-gradient(135deg, #1a0033, #33001a)",
					width: "100px",
					height: "55px",
				};
			},
		},
		16: {
			name: "blobber winner",
			done() {
				return player.blob.points.gte(100000);
			},
			tooltip: "100,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(100000);
				return {
					"border-color": "#00ff00",
					"border-width": "5px",
					"border-style": "dashed",
					transform: "skewX(-8deg)",
					"background-color": bought ? "#005500" : "#001a00",
					width: "80px",
					height: "95px",
					"border-radius": "15px 0px 15px 0px",
				};
			},
		},
		21: {
			name: "blobber beast",
			done() {
				return player.blob.points.gte(1e6);
			},
			tooltip: "1,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e6);
				return {
					"border-color": "#ff0055",
					"border-width": "7px",
					"border-style": "outset",
					transform: "rotate(4deg) skewY(3deg)",
					"background-color": bought ? "#550033" : "#1a0011",
					width: "55px",
					height: "100px",
					"border-radius": "50% 0% 50% 0%",
				};
			},
		},
		22: {
			name: "blobber emperor",
			done() {
				return player.blob.points.gte(1e7);
			},
			tooltip: "10,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e7);
				return {
					"border-color": "#ff8800",
					"border-width": "3px",
					"border-style": "dotted",
					transform: "rotate(-2deg) scale(1.1)",
					background: bought
						? "linear-gradient(45deg, #552200, #335500)"
						: "linear-gradient(45deg, #1a0800, #0d1a00)",
					width: "120px",
					height: "50px",
				};
			},
		},
		23: {
			name: "blobber god",
			done() {
				return player.blob.points.gte(1e8);
			},
			tooltip: "100,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e8);
				return {
					"border-color": "#ffffff",
					"border-width": "1px",
					"border-style": "solid",
					transform: "rotate(8deg)",
					"background-color": bought ? "#333333" : "#0a0a0a",
					width: "70px",
					height: "70px",
					"border-radius": "0% 50% 0% 50%",
				};
			},
		},
		24: {
			name: "blobber creator",
			done() {
				return player.blob.points.gte(1e9);
			},
			tooltip: "1,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e9);
				return {
					"border-color": "#00ccff",
					"border-width": "10px",
					"border-style": "inset",
					transform: "skewX(10deg) skewY(-5deg)",
					"background-color": bought ? "#004455" : "#00111a",
					width: "95px",
					height: "58px",
				};
			},
		},
		25: {
			name: "blobber blobber",
			done() {
				return player.blob.points.gte(1e10);
			},
			tooltip: "10,000,000,000 blobs<br>Reward: blob 3",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e10);
				return {
					"border-color": "#ff00aa",
					"border-width": "6px",
					"border-style": "dashed",
					transform: "rotate(-7deg) scale(0.85)",
					background: bought
						? "linear-gradient(200deg, #550066, #000055)"
						: "linear-gradient(200deg, #1a0022, #00001a)",
					width: "130px",
					height: "45px",
					"border-radius": "40px 0px",
				};
			},
		},
		26: {
			name: "The Blobber",
			done() {
				return player.blob.points.gte(1e11);
			},
			tooltip: "100,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e11);
				return {
					"border-color": "#884400",
					"border-width": "4px",
					"border-style": "double",
					transform: "rotate(3deg) skewX(-6deg)",
					"background-color": bought ? "#442200" : "#110800",
					width: "85px",
					height: "90px",
				};
			},
		},
		31: {
			name: "Infinite Blob",
			done() {
				return player.blob.points.gte(1e12);
			},
			tooltip: "1,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e12);
				return {
					"border-color": "#aaaaff",
					"border-width": "9px",
					"border-style": "groove",
					transform: "scale(0.8) rotate(-5deg)",
					"background-color": bought ? "#111155" : "#05051a",
					width: "140px",
					height: "42px",
					"border-radius": "0px",
				};
			},
		},
		32: {
			name: "Mega Infinite Blob",
			done() {
				return player.blob.points.gte(1e13);
			},
			tooltip: "10,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e13);
				return {
					"border-color": "#ff3333",
					"border-width": "2px",
					"border-style": "ridge",
					transform: "skewY(7deg)",
					background: bought
						? "linear-gradient(90deg, #550000, #333333)"
						: "linear-gradient(90deg, #1a0000, #0a0a0a)",
					width: "60px",
					height: "110px",
				};
			},
		},
		33: {
			name: "Omega Infinite Blob",
			done() {
				return player.blob.points.gte(1e14);
			},
			tooltip: "100,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e14);
				return {
					"border-color": "#00ff88",
					"border-width": "5px",
					"border-style": "outset",
					transform: "rotate(9deg) scale(1.05)",
					"background-color": bought ? "#005533" : "#001a0d",
					width: "75px",
					height: "75px",
					"border-radius": "30% 70% 70% 30%",
				};
			},
		},
		34: {
			name: "Super Infinite Blob",
			done() {
				return player.blob.points.gte(1e15);
			},
			tooltip: "1,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e15);
				return {
					"border-color": "#ffcc00",
					"border-width": "7px",
					"border-style": "dashed",
					transform: "rotate(-4deg) skewX(4deg)",
					"background-color": bought ? "#554400" : "#1a1100",
					width: "50px",
					height: "120px",
					"border-radius": "50%",
				};
			},
		},
		35: {
			name: "Ultra Infinite Blob",
			done() {
				return player.blob.points.gte(1e16);
			},
			tooltip: "10,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e16);
				return {
					"border-color": "#cc44ff",
					"border-width": "3px",
					"border-style": "dotted",
					transform: "skewX(-10deg) skewY(4deg)",
					background: bought
						? "linear-gradient(300deg, #440066, #002255)"
						: "linear-gradient(300deg, #110022, #000a1a)",
					width: "105px",
					height: "62px",
				};
			},
		},
		36: {
			name: "Infinite Infinite Blob",
			done() {
				return player.blob.points.gte(1e17);
			},
			tooltip: "100,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e17);
				return {
					"border-color": "#ff6600",
					"border-width": "8px",
					"border-style": "inset",
					transform: "rotate(6deg) scale(0.95)",
					"background-color": bought ? "#552200" : "#1a0500",
					width: "88px",
					height: "88px",
					"border-radius": "0% 100% 0% 100%",
				};
			},
		},
		41: {
			name: "The End",
			done() {
				return player.blob.points.gte(1e18);
			},
			tooltip: "hope you enjoyed blob, for now!",
			goalTooltip: "amount of blobs",
			style() {
				const bought = player.blob.points.gte(1e18);
				return {
					"border-color": "#851883",
					"border-width": "10px",
					"border-style": "double",
					width: "550px",
					transform: "skewX(2deg)",
					background: bought
						? "linear-gradient(45deg, #330055, #550033, #330055)"
						: "linear-gradient(45deg, #0a001a, #1a0011, #0a001a)",
					height: "55px",
				};
			},
		},
	},

	upgrades: {
		11: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
			style() {
				const bought = hasUpgrade("blob", 11);
				return {
					"border-color": "#ff00ff",
					transform: "rotate(-3deg)",
					"background-color": bought ? "#4a004a" : "#1a001a",
					width: "90px",
					height: "90px",
				};
			},
		},
		12: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
			style() {
				const bought = hasUpgrade("blob", 12);
				return {
					"border-color": "#00ffcc",
					"border-style": "dashed",
					transform: "skewX(6deg)",
					"background-color": bought ? "#005544" : "#001a15",
					width: "120px",
					height: "70px",
				};
			},
		},
		13: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
			style() {
				const bought = hasUpgrade("blob", 13);
				return {
					"border-color": "#ff4400",
					"border-width": "5px",
					transform: "rotate(5deg) skewY(-3deg)",
					"background-color": bought ? "#552200" : "#1a0800",
					width: "75px",
					height: "110px",
					"border-radius": "0px",
				};
			},
		},
		14: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
			style() {
				const bought = hasUpgrade("blob", 14);
				return {
					"border-color": "#ffff00",
					"border-style": "dotted",
					"border-width": "7px",
					transform: "rotate(-7deg)",
					"background-color": bought ? "#555500" : "#1a1a00",
					width: "60px",
					height: "60px",
					"border-radius": "50%",
				};
			},
		},
		15: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
			style() {
				const bought = hasUpgrade("blob", 15);
				return {
					"border-color": "#aa00ff",
					"border-style": "ridge",
					transform: "skewX(-8deg) scale(0.9)",
					background: bought
						? "linear-gradient(180deg, #330055, #440077)"
						: "linear-gradient(180deg, #0d001a, #1a0033)",
					width: "140px",
					height: "55px",
				};
			},
		},
		21: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
			style() {
				const bought = hasUpgrade("blob", 21);
				return {
					"border-color": "#ff0055",
					"border-width": "4px",
					"border-style": "groove",
					transform: "rotate(4deg)",
					"background-color": bought ? "#550022" : "#1a0011",
					width: "55px",
					height: "130px",
				};
			},
		},
		22: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
			style() {
				const bought = hasUpgrade("blob", 22);
				return {
					"border-color": "#ff8800",
					"border-width": "9px",
					transform: "skewY(5deg)",
					"background-color": bought ? "#552200" : "#1a0800",
					width: "100px",
					height: "80px",
					"border-radius": "20px 0px 20px 0px",
				};
			},
		},
		23: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
			style() {
				const bought = hasUpgrade("blob", 23);
				return {
					"border-color": "#00ccff",
					"border-style": "outset",
					transform: "rotate(-5deg) skewX(4deg)",
					"background-color": bought ? "#004455" : "#00101a",
					width: "85px",
					height: "95px",
					"border-radius": "0% 50% 50% 0%",
				};
			},
		},
		24: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
			style() {
				const bought = hasUpgrade("blob", 24);
				return {
					"border-color": "#ffffff",
					"border-width": "2px",
					"border-style": "dashed",
					transform: "rotate(8deg) scale(1.1)",
					"background-color": bought ? "#444444" : "#0a0a0a",
					width: "65px",
					height: "65px",
				};
			},
		},
		25: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
			style() {
				const bought = hasUpgrade("blob", 25);
				return {
					"border-color": "#ff00aa",
					"border-width": "6px",
					"border-style": "double",
					transform: "skewX(-6deg) skewY(6deg)",
					background: bought
						? "linear-gradient(270deg, #440055, #000044)"
						: "linear-gradient(270deg, #1a0022, #00001a)",
					width: "110px",
					height: "50px",
				};
			},
		},
		31: {
			title: "infinity blob",
			description: "+1 Infinity",
			cost: new Decimal(1e10),
			style() {
				const bought = hasUpgrade("blob", 31);
				return {
					"border-color": "#aaaaff",
					"border-width": "8px",
					"border-style": "inset",
					transform: "rotate(-9deg) scale(0.85)",
					"background-color": bought ? "#111166" : "#05051a",
					width: "150px",
					height: "45px",
					"border-radius": "40px",
				};
			},
		},
		41: {
			title: "garbage blob",
			description: "1.1x of this",
			cost: new Decimal(1),
			unlocked() {
				return hasMilestone("blob", 3);
			},
			style() {
				const bought = hasUpgrade("blob", 41);
				return {
					"border-color": "#884400",
					"border-style": "dotted",
					transform: "rotate(3deg) skewX(-5deg)",
					"background-color": bought ? "#442200" : "#110800",
					width: "95px",
					height: "95px",
					"border-radius": "0px",
				};
			},
		},
		42: {
			title: "cool blob",
			description: "does something cool",
			cost: new Decimal(1e10),
			unlocked() {
				return hasMilestone("blob", 4);
			},
			style() {
				const bought = hasUpgrade("blob", 42);
				return {
					"border-color": "#00ff44",
					"border-width": "5px",
					"border-style": "ridge",
					transform: "skewY(-7deg)",
					background: bought
						? "linear-gradient(120deg, #005522, #224400)"
						: "linear-gradient(120deg, #001a08, #0a1a00)",
					width: "130px",
					height: "60px",
				};
			},
		},
		43: {
			title: "blobs = more blobs",
			description: "x48dkA(CàS6",
			unlocked() {
				return hasMilestone("blob", 6);
			},
			cost: new Decimal(383),
			effect() {
				return new Decimal(player.blob.points).log10().add(1).pow(1.25);
			},
			style() {
				const bought = hasUpgrade("blob", 43);
				return {
					"border-color": "#ff3300",
					"border-width": "3px",
					"border-style": "outset",
					transform: "rotate(-4deg) scale(0.92)",
					"background-color": bought ? "#551500" : "#1a0500",
					width: "70px",
					height: "115px",
					"border-radius": "30% 70% 30% 70%",
				};
			},
		},
		44: {
			title: "blobs = more blobs but better!!!!",
			description: "x48dkA(CàS6B^1$xLw+Tè",
			unlocked() {
				return hasMilestone("blob", 8);
			},
			cost: new Decimal(8),
			effect() {
				return new Decimal(player.blob.points).log10().add(1).pow(1.8);
			},
			style() {
				const bought = hasUpgrade("blob", 44);
				return {
					"border-color": "#ffcc00",
					"border-width": "7px",
					"border-style": "dashed",
					transform: "rotate(6deg) skewX(5deg)",
					"background-color": bought ? "#554400" : "#1a1100",
					width: "160px",
					height: "48px",
				};
			},
		},
		45: {
			title: "final blob :(",
			description: "you don't know what this does but it does A LOT",
			unlocked() {
				return hasMilestone("blob", 11);
			},
			cost: new Decimal(1.23456789e15),
			style() {
				const bought = hasUpgrade("blob", 45);
				return {
					"border-color": "#cc00ff",
					"border-width": "10px",
					"border-style": "groove",
					transform: "rotate(-8deg) scale(1.08)",
					background: bought
						? "linear-gradient(330deg, #330055, #440033, #001133)"
						: "linear-gradient(330deg, #110022, #1a0011, #000a1a)",
					width: "200px",
					height: "65px",
					"border-radius": "0px 40px 0px 40px",
				};
			},
		},
		51: {
			title: "infinity blob deluxe but it is the same",
			description: "+1 Negative Infinity",
			cost: new Decimal(1e18),
			unlocked() {
				return hasMilestone("blob", 12);
			},
			style() {
				const bought = hasUpgrade("blob", 51);
				return {
					"border-color": "#b43ce7",
					"border-width": "6px",
					"border-style": "double",
					transform: "skewX(-4deg) skewY(4deg) scale(0.9)",
					background: bought
						? "linear-gradient(45deg, #330055, #550033, #222222)"
						: "linear-gradient(45deg, #0d001a, #1a0033, #0a0a0a)",
					width: "220px",
					height: "55px",
					"border-radius": "50px 0px",
				};
			},
		},
	},

	tooltip() {
		return "???";
	},

	passiveGeneration() {
		if (hasMilestone("blob", 2)) return 0.44;
		return 0;
	},

	milestones: {
		1: {
			requirementDescription: "2500000000 blob",
			effectDescription: "this does something to blobs but you dont know what.",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(2.5e9);
			},
			style() {
				const done = player.blob.points.gte(2.5e9);
				return {
					transform: "rotate(-3deg) skewX(4deg)",
					"border-style": "dashed",
					"border-color": "#ff00ff",
					"border-width": "4px",
					"background-color": done ? "#330033" : "#0d000d",
					width: "95%",
					"margin-left": "8px",
				};
			},
		},
		2: {
			requirementDescription: "5000000000 blob",
			effectDescription: "nah jk but this does something tho",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(5e9);
			},
			style() {
				const done = player.blob.points.gte(5e9);
				return {
					transform: "skewX(-6deg) skewY(2deg)",
					"border-style": "dotted",
					"border-color": "#00ffcc",
					"border-width": "5px",
					"background-color": done ? "#004433" : "#001510",
					"margin-left": "-5px",
					width: "102%",
				};
			},
		},
		3: {
			requirementDescription: "7500000000 blob",
			effectDescription: "why isn't blobs formatted, also does somehting",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(7.5e9);
			},
			style() {
				const done = player.blob.points.gte(7.5e9);
				return {
					transform: "rotate(2deg)",
					"border-style": "ridge",
					"border-color": "#ff8800",
					"border-width": "7px",
					"background-color": done ? "#442200" : "#150a00",
					width: "88%",
					"margin-left": "20px",
				};
			},
		},
		4: {
			requirementDescription: "10000000000 blob",
			effectDescription: "woah",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(1e10);
			},
			style() {
				const done = player.blob.points.gte(1e10);
				return {
					transform: "skewX(8deg)",
					"border-style": "double",
					"border-color": "#ffff00",
					"border-width": "6px",
					background: done
						? "linear-gradient(90deg, #333300, #554400)"
						: "linear-gradient(90deg, #0d0d00, #1a1100)",
					"margin-left": "-3px",
					width: "97%",
				};
			},
		},
		5: {
			requirementDescription: "30000000000 blob",
			effectDescription: "hello slime",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(3e10);
			},
			style() {
				const done = player.blob.points.gte(3e10);
				return {
					transform: "rotate(-4deg) skewY(-3deg)",
					"border-style": "groove",
					"border-color": "#00ff44",
					"border-width": "3px",
					"background-color": done ? "#003311" : "#001008",
					width: "105%",
					"margin-left": "-12px",
				};
			},
		},
		6: {
			requirementDescription: "50000000000 blob",
			effectDescription: "overpowered",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(5e10);
			},
			style() {
				const done = player.blob.points.gte(5e10);
				return {
					transform: "skewX(-9deg)",
					"border-style": "outset",
					"border-color": "#cc00ff",
					"border-width": "8px",
					background: done
						? "linear-gradient(45deg, #330055, #110033)"
						: "linear-gradient(45deg, #0d0022, #05000f)",
					"margin-left": "15px",
					width: "90%",
				};
			},
		},
		7: {
			requirementDescription: "736224516013.0575 blob",
			effectDescription: "blob boost",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(736224516013.0575);
			},
			style() {
				const done = player.blob.points.gte(736224516013.0575);
				return {
					transform: "rotate(5deg) skewX(3deg)",
					"border-style": "dashed",
					"border-color": "#ff3300",
					"border-width": "5px",
					"background-color": done ? "#551100" : "#1a0500",
					"margin-left": "-8px",
					width: "99%",
				};
			},
		},
		8: {
			requirementDescription: "5e12 blob",
			effectDescription: "ok milestone formatted, unlock OP blob 2",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(5e12);
			},
			style() {
				const done = player.blob.points.gte(5e12);
				return {
					transform: "skewY(4deg)",
					"border-style": "inset",
					"border-color": "#00ccff",
					"border-width": "6px",
					"background-color": done ? "#003344" : "#00101a",
					width: "107%",
					"margin-left": "-18px",
				};
			},
		},
		9: {
			requirementDescription: "2.2222222e14 blob",
			effectDescription: "insane milestone",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(2.222222e14);
			},
			style() {
				const done = player.blob.points.gte(2.222222e14);
				return {
					transform: "rotate(-6deg) skewX(-5deg)",
					"border-style": "dotted",
					"border-color": "#ff00aa",
					"border-width": "4px",
					background: done
						? "linear-gradient(200deg, #440055, #000044)"
						: "linear-gradient(200deg, #110022, #00001a)",
					"margin-left": "22px",
					width: "86%",
				};
			},
		},
		10: {
			requirementDescription: "2.2222222e14 blob",
			effectDescription: "lol no doesn't nothing",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(2.222222e14);
			},
			style() {
				const done = player.blob.points.gte(2.222222e14);
				return {
					transform: "skewX(10deg) rotate(3deg)",
					"border-style": "ridge",
					"border-color": "#aaaaff",
					"border-width": "9px",
					"background-color": done ? "#111155" : "#05051a",
					"margin-left": "-10px",
					width: "96%",
				};
			},
		},
		11: {
			requirementDescription: "2.5e14 blob",
			effectDescription: "okay yes more blob2",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(2.5e14);
			},
			style() {
				const done = player.blob.points.gte(2.5e14);
				return {
					transform: "rotate(7deg) skewY(-6deg)",
					"border-style": "groove",
					"border-color": "#ffcc00",
					"border-width": "7px",
					"background-color": done ? "#443300" : "#1a1100",
					width: "101%",
					"margin-left": "5px",
				};
			},
		},
		12: {
			requirementDescription: "1e17 blob",
			effectDescription:
				"ok bye thanks for playing blob incremental, enjoy your final reward",
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
			done() {
				return player.blob.points.gte(1e17);
			},
			style() {
				const done = player.blob.points.gte(1e17);
				return {
					transform: "skewX(-7deg) skewY(5deg) rotate(-2deg)",
					"border-style": "double",
					"border-color": "#851883",
					"border-width": "10px",
					background: done
						? "linear-gradient(45deg, #330055, #550033, #330055)"
						: "linear-gradient(45deg, #0a001a, #1a0011, #0a001a)",
					"margin-left": "-15px",
					width: "110%",
				};
			},
		},
	},
});
