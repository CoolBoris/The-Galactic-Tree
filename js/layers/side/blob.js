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
	color: "var(--background)",
	symbol: "",
	row: "side",
	position: "6",
	layerShown() {
		let visible = true;
		return visible;
	},
	resetDescription: "blob ",
	requires: new Decimal(0), // Can be a function that takes requirement increases into account
	resource: "Blobs", // Name of prestige currency
	baseResource: "blobbers", // Name of resource prestige is based on
	baseAmount() {
		return player.blob.points;
	}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		12: {
			name: "blobber noob",
			done() {
				return player.blob.points.gte(10);
			},
			tooltip: "10 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		13: {
			name: "blobber pro",
			done() {
				return player.blob.points.gte(100);
			},
			tooltip: "100 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		14: {
			name: "blobber king",
			done() {
				return player.blob.points.gte(1000);
			},
			tooltip: "1,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		15: {
			name: "blobber champion",
			done() {
				return player.blob.points.gte(10000);
			},
			tooltip: "10,000 blobs<br>Reward: blob 2",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		16: {
			name: "blobber winner",
			done() {
				return player.blob.points.gte(100000);
			},
			tooltip: "100,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		21: {
			name: "blobber beast",
			done() {
				return player.blob.points.gte(1e6);
			},
			tooltip: "1,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		22: {
			name: "blobber emperor",
			done() {
				return player.blob.points.gte(1e7);
			},
			tooltip: "10,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		23: {
			name: "blobber god",
			done() {
				return player.blob.points.gte(1e8);
			},
			tooltip: "100,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		24: {
			name: "blobber creator",
			done() {
				return player.blob.points.gte(1e9);
			},
			tooltip: "1,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		25: {
			name: "blobber blobber",
			done() {
				return player.blob.points.gte(1e10);
			},
			tooltip: "10,000,000,000 blobs<br>Reward: blob 3",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		26: {
			name: "The Blobber",
			done() {
				return player.blob.points.gte(1e11);
			},
			tooltip: "100,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		31: {
			name: "Infinite Blob",
			done() {
				return player.blob.points.gte(1e12);
			},
			tooltip: "1,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		32: {
			name: "Mega Infinite Blob",
			done() {
				return player.blob.points.gte(1e13);
			},
			tooltip: "10,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		33: {
			name: "Omega Infinite Blob",
			done() {
				return player.blob.points.gte(1e14);
			},
			tooltip: "100,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		34: {
			name: "Super Infinite Blob",
			done() {
				return player.blob.points.gte(1e15);
			},
			tooltip: "1,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		35: {
			name: "Ultra Infinite Blob",
			done() {
				return player.blob.points.gte(1e16);
			},
			tooltip: "10,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		36: {
			name: "Infinite Infinite Blob",
			done() {
				return player.blob.points.gte(1e17);
			},
			tooltip: "100,000,000,000,000,000 blobs",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
		},
		41: {
			name: "The End",
			done() {
				return player.blob.points.gte(1e18);
			},
			tooltip: "hope you enjoyed blob, for now!",
			goalTooltip: "amount of blobs", // Shows when achievement is not completed
			style() {
				return {
					"border-color": "#851883",
					"border-width": "10px",
					width: "550px",
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
		},
	},
	upgrades: {
		11: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
		},
		12: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
		},
		13: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
		},
		14: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
		},
		15: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e4),
		},
		21: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
		},
		22: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
		},
		23: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
		},
		24: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
		},
		25: {
			title: "blobber blob",
			description: "5x blob",
			cost: new Decimal(1e6),
		},
		31: {
			title: "infinity blob",
			description: "+1 Infinity",
			cost: new Decimal(1e10),
		},
		41: {
			title: "garbage blob",
			description: "1.1x of this",
			cost: new Decimal(1),
			unlocked() {
				return hasMilestone("blob", 3);
			},
		},
		42: {
			title: "cool blob",
			description: "does something cool",
			cost: new Decimal(1e10),
			unlocked() {
				return hasMilestone("blob", 4);
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
		},
		45: {
			title: "final blob :(",
			description: "you don't know what this does but it does A LOT",
			unlocked() {
				return hasMilestone("blob", 11);
			},
			cost: new Decimal(1.23456789e15),
		},
		51: {
			title: "infinity blob deluxe but it is the same",
			description: "+1 Negative Infinity",
			cost: new Decimal(1e18),
			unlocked() {
				return hasMilestone("blob", 12);
			},
		},
	},
});
