addLayer("universe", {
	name: "Universe",
	position: 0,
	row: 3,

	color: "#6b60b4",

	starList: [
		"Red Dwarf",
		"Brown Dwarf",
		"White Dwarf",
		"Yellow Dwarf",
		"Blue Dwarf",
		"Red Giant",
		"Blue Giant",
		"Red Supergiant",
		"Blue Supergiant",
		"Hypergiant",
	],
	starColors: [
		"#ff4444",
		"#a0522d",
		"#e8e8ff",
		"#ffd700",
		"#4488ff",
		"#ff2200",
		"#0066ff",
		"#cc1100",
		"#0033cc",
		"#ff00ff",
	],
	starRequirements: [
		new Decimal(1),
		new Decimal(100),
		new Decimal(500000),
		new Decimal(2.5e8),
		new Decimal(5e10),
		new Decimal(1e99999999),
		new Decimal(1e56),
		new Decimal(1e72),
		new Decimal(1e90),
		new Decimal(1e110),
	],
	universeRequirements: [
		new Decimal(1e300),
		new Decimal("1e380"),
		new Decimal("1e500"),
		new Decimal("1e600"),
		new Decimal("1e700"),
		new Decimal("1e99999999"),
		new Decimal("1e99999999"),
		new Decimal("1e99999999"),
		new Decimal("1e99999999"),
	],

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			plasma: new Decimal(0),
			antimatter: new Decimal(0),
			currentStar: new Decimal(1),
		};
	},

	doReset(reset) {
		let keep = [];
		if (!inChallenge("real", 11)) keep.push("upgrades");
		if (!inChallenge("real", 11)) keep.push("points");
		if (!inChallenge("real", 11)) keep.push("milestones");
		if (!inChallenge("real", 11)) keep.push("buyables");
		if (!inChallenge("real", 11)) keep.push("challenges");

		if (layers[reset].row > this.row) {
			layerDataReset(this.layer, keep);
		}
	},

	plasmaGain() {
		let base = new Decimal(100);

		if (player.unstablefuel.points.gte("1e300")) {
			let bonus = player.unstablefuel.points.log10().sub(300);
			base = base.add(bonus);
		} else {
			let log = player.unstablefuel.points.add(1).log10();
			base = base.add(log);
		}

		if (hasUpgrade("universe", 21)) base = base.times(2.5);
		if (hasUpgrade("universe", 41))
			base = base.times(upgradeEffect("universe", 41));
		if (hasUpgrade("universe", 71)) base = base.times(5);
		if (hasUpgrade("universe", 91))
			base = base.times(upgradeEffect("universe", 91));
		if (hasUpgrade("universe", 121))
			base = base.times(upgradeEffect("universe", 121));
		if (hasUpgrade("universe", 162))
			base = base.times(upgradeEffect("universe", 162));
		if (hasUpgrade("universe", 181)) base = base.times(9.99);

		return base;
	},

	antimatterGain() {
		let base = new Decimal(challengeCompletions("universe", 11));
		let c12 = challengeCompletions("universe", 12);
		let c21 = challengeCompletions("universe", 21);
		let c22 = challengeCompletions("universe", 22);

		let mult12 = new Decimal(3).pow(c12);
		let mult21 = new Decimal(5).pow(c21);
		let exp22 = new Decimal(1).add(new Decimal(c22).div(10));
		let gain = base.times(mult12).times(mult21).pow(exp22);

		return gain;
	},

	getUniverseRequirement() {
		let index = player.universe.points.toNumber();
		let req = layers.universe.universeRequirements[index];

		if (player.unstablefuel.points.gte(req)) {
			return true;
		}

		return false;
	},

	update(diff) {
		if (!player.universe.unlocked) return;

		player.universe.antimatter = player.universe.antimatter.add(
			layers.universe.antimatterGain().times(diff),
		);

		let starIndex = player.universe.currentStar.toNumber();
		let req = layers.universe.starRequirements[starIndex];

		if (req && player.universe.antimatter.gte(req)) {
			player.universe.currentStar = player.universe.currentStar.add(1);
		}
	},

	symbol() {
		if (options.emojisEnabled) return "🌀";
		return "U";
	},

	branches: ["supernova", "blackhole"],

	nodeStyle() {
		const style = {
			"border-radius": "100px",
			height: "150px",
			width: "150px",
			background: "radial-gradient(circle, #574c9d, #46d4d6)",
			"font-size": "60px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
		}

		return style;
	},

	layerShown() {
		return (
			(player.supernova.points.gte(10) && inChallenge("real", 11)) ||
			(player.universe.unlocked && inChallenge("real", 11))
		);
	},

	prestigeButtonText() {
		const canResetNow = canReset(this.layer);
		const plasmaGain = format(this.plasmaGain());
		const meetsRequirement = this.getUniverseRequirement();
		const requirement =
			layers.universe.universeRequirements[player.universe.points.toNumber()];

		if (player.universe.points.gte(5)) {
			if (!canResetNow)
				return `Requires ${format(
					getNextAt(this.layer, false, "normal"),
				)} Unstable Rocket Fuel`;
			return `+${plasmaGain} Plasma`;
		}

		if (!canResetNow)
			return `Requires ${format(
				getNextAt(this.layer, false, "normal"),
			)} Unstable Rocket Fuel<br><br>(+1 Universe at ${format(requirement)} Unstable Rocket Fuel)`;

		if (player.universe.bulkBuy && meetsRequirement)
			return `+<b>${getResetGain(
				this.layer,
				"normal",
			)}</b> Universe <br>+${plasmaGain} Plasma<br><br>Next at ${format(
				getNextAt(this.layer, true, "normal"),
			)} Unstable Rocket Fuel`;

		if (meetsRequirement) return `+<b>1</b> Universe <br>+${plasmaGain} Plasma`;

		return `+${plasmaGain} Plasma<br><br>(+1 Universe at ${format(requirement)} Unstable Rocket Fuel)`;
	},

	resource: "Universes",
	requires: new Decimal(1e300),
	baseResource: "Unstable Rocket Fuel",
	baseAmount() {
		return player.unstablefuel.points;
	},
	type: "normal",
	exponent: 0.0000000000000001,

	onPrestige() {
		player.universe.plasma = player.universe.plasma.add(
			layers.universe.plasmaGain(),
		);

		if (!this.getUniverseRequirement()) {
			player.universe.points = player.universe.points.sub(1);
		}
	},

	tabFormat: {
		Main: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(226, 18, 174); text-shadow: 0px 0px 10px rgb(226, 18, 174); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.plasma)}</span></h2> Plasma`;
					},
				],
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(255, 48, 48); text-shadow: 0px 0px 10px rgb(255, 48, 48); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.antimatter)}</span></h2> Antimatter`;
					},
				],
				"blank",
				"resource-display",
				"prestige-button",
				"blank",
			],
		},
		Milestones: {
			content: [
				"main-display",
				"blank",
				"prestige-button",
				"blank",
				["milestones", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
			],
			unlocked() {
				return player.universe.unlocked;
			},
		},
		"Upgrade Tree": {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(226, 18, 174); text-shadow: 0px 0px 10px rgb(226, 18, 174); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.plasma)}</span></h2> Plasma`;
					},
				],
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(255, 48, 48); text-shadow: 0px 0px 10px rgb(255, 48, 48); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.antimatter)}</span></h2> Antimatter`;
					},
				],
				"blank",
				"prestige-button",
				"blank",
				"upgrades",
			],
			unlocked() {
				return player.universe.unlocked;
			},
		},
		Wormholes: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(255, 48, 48); text-shadow: 0px 0px 10px rgb(255, 48, 48); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.antimatter)}</span></h2> Antimatter`;
					},
				],
				"blank",
				[
					"display-text",
					function () {
						return `You are gaining ${format(
							layers.universe.antimatterGain(),
						)} Antimatter per second`;
					},
				],
				"blank",
				"challenges",
				"blank",
				["infobox", "main"],
			],
			buttonStyle() {
				return { "border-color": "rgb(255, 21, 21)" };
			},
			unlocked() {
				return player.universe.unlocked;
			},
		},
		Stars: {
			content: [
				"main-display",
				[
					"display-text",
					function () {
						return `You have 
					<h2><span style="color:rgb(255, 48, 48); text-shadow: 0px 0px 10px rgb(255, 48, 48); font-family: Lucida Console, Courier New, monospace">
						${format(player.universe.antimatter)}</span></h2> Antimatter`;
					},
				],
				[
					"display-text",
					function () {
						const index = player.universe.currentStar.toNumber() - 1;
						const color = layers.universe.starColors[index];
						const name = layers.universe.starList[index];
						return `You currently have a <h2><span style="color: ${color}; text-shadow: 0px 0px 10px ${color}; font-family: Lucida Console, Courier New, monospace">${name}</span></h2>`;
					},
				],
				"blank",
				["bar", "starProgress"],
				"blank",
				["milestones", [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]],
			],
			buttonStyle() {
				return { "border-color": "rgb(250, 255, 92)" };
			},
			unlocked() {
				return player.universe.unlocked;
			},
		},
	},

	infoboxes: {
		main: {
			title: "Warning",
			body() {
				return "Entering and leaving a Wormhole force an Universe reset, so you should only do these right after an Universe reset!";
			},
		},
	},

	bars: {
		starProgress: {
			direction: RIGHT,
			width: 400,
			height: 50,
			progress() {
				let index = player.universe.currentStar.toNumber() - 1;
				let nextIndex = index + 1;

				if (nextIndex >= layers.universe.starRequirements.length) {
					return new Decimal(1);
				}

				let currentReq = layers.universe.starRequirements[index];
				let nextReq = layers.universe.starRequirements[nextIndex];
				let antimatter = player.universe.antimatter;

				let logCurrent = currentReq.add(1).log10();
				let logNext = nextReq.add(1).log10();
				let logNow = antimatter.add(1).log10();

				let progress = logNow.sub(logCurrent).div(logNext.sub(logCurrent));

				return progress.max(0).min(1).toNumber();
			},

			display() {
				let index = player.universe.currentStar.toNumber() - 1;
				let nextIndex = index + 1;
				if (nextIndex >= layers.universe.starRequirements.length) {
					return "Max Star!";
				}
				let nextReq = layers.universe.starRequirements[nextIndex];
				return `Next Star at ${format(nextReq)} Antimatter`;
			},

			fillStyle() {
				let index = player.universe.currentStar.toNumber() - 1;
				let color = layers.universe.starColors[index];
				return {
					background: color,
					"box-shadow": `0px 0px 8px ${color}`,
				};
			},
			baseStyle: {
				"border-radius": "6px",
				border: "2px solid #444",
				background: "#111",
			},
			textStyle: {
				color: "white",
				"text-shadow": "1px 1px 2px black",
				"font-size": "13px",
			},
		},
	},

	challenges: {
		11: {
			name() {
				return `Einstein-Rosen Bridge`;
			},
			completionLimit: 15,
			getRequiredAmount() {
				const completions = challengeCompletions(this.layer, 11);
				if (completions == this.completionLimit) return new Decimal("1e999999");
				return new Decimal(100).times(new Decimal(10).pow(completions));
			},
			fullDisplay() {
				const completions = challengeCompletions(this.layer, 11);
				const maxed = maxedChallenge(this.layer, 11);
				const required = this.getRequiredAmount();
				let display = ``;
				display += `^0.25 Unstable Rocket Fuel`;
				display += `<br>Goal: ${formatWhole(required)} Unstable Rocket Fuel`;
				display += `<br><br><b>Reward:</b> `;
				if (completions >= 1) {
					display += `<br>+${formatWhole(new Decimal(completions))} Base Antimatter`;
				}
				if (maxed) {
					display += `<br><br><b style="color:#4caf50">MAXED</b>`;
				} else {
					display += `<br><br><b style="color:#e0d238">${challengeCompletions(this.layer, 11)} / ${this.completionLimit} Completions</b>`;
				}
				return display;
			},
			canComplete() {
				return (
					inChallenge(this.layer, this.id) &&
					player.unstablefuel.points.gte(this.getRequiredAmount())
				);
			},
			style() {
				const completions = challengeCompletions(this.layer, 11);
				const maxed = completions >= this.completionLimit;
				const canDo = this.canComplete();
				return {
					background: maxed
						? "radial-gradient(circle, #1a3320, #000000)"
						: canDo
							? "radial-gradient(circle, #3d3000, #1a1000)"
							: "radial-gradient(circle, #130663, #000000)",
					color: "white",
					border: maxed
						? "4px solid #2a5c3a"
						: canDo
							? "4px solid #f1be11"
							: "4px solid #100d4b",
					"font-size": "15px",
					position: "relative",
					overflow: "hidden",
				};
			},
		},

		12: {
			name() {
				return `Morris-Thorne Wormhole`;
			},
			completionLimit: 7,
			getRequiredAmount() {
				const completions = challengeCompletions(this.layer, 12);
				if (completions == 0) return new Decimal(1e7);
				if (completions == 1) return new Decimal(1e12);
				if (completions == 2) return new Decimal(1e19);
				if (completions == 3) return new Decimal(1e48);
				if (completions == 4) return new Decimal(1e72);
				if (completions == 5) return new Decimal(1e207);
				if (completions == 6) return new Decimal("1e350");

				return new Decimal("1e99999");
			},
			fullDisplay() {
				const completions = challengeCompletions(this.layer, 12);
				const maxed = maxedChallenge(this.layer, 12);
				const required = this.getRequiredAmount();
				let display = ``;
				display += `You can't earn Galaxies`;
				display += `<br>Goal: ${formatWhole(required)} Unstable Rocket Fuel`;
				display += `<br><br><b>Reward:</b> `;
				if (completions >= 1) {
					display += `<br>${formatWhole(new Decimal(3).pow(completions))}x Antimatter`;
				}
				if (maxed) {
					display += `<br><br><b style="color:#4caf50">MAXED</b>`;
				} else {
					display += `<br><br><b style="color:#e0d238">${challengeCompletions(this.layer, 12)} / ${this.completionLimit} Completions</b>`;
				}
				return display;
			},
			canComplete() {
				return (
					inChallenge(this.layer, this.id) &&
					player.unstablefuel.points.gte(this.getRequiredAmount())
				);
			},
			style() {
				const completions = challengeCompletions(this.layer, 12);
				const maxed = completions >= this.completionLimit;
				const canDo = this.canComplete();
				return {
					background: maxed
						? "radial-gradient(circle, #1a3320, #000000)"
						: canDo
							? "radial-gradient(circle, #3d3000, #1a1000)"
							: "radial-gradient(circle, #4d0663, #000000)",
					color: "white",
					border: maxed
						? "4px solid #2a5c3a"
						: canDo
							? "4px solid #f1be11"
							: "4px solid #410d4b",
					"font-size": "15px",
					position: "relative",
					overflow: "hidden",
				};
			},
		},

		21: {
			name() {
				return `Kerr Wormhole`;
			},
			completionLimit: 5,
			getRequiredAmount() {
				const completions = challengeCompletions(this.layer, 21);
				if (completions == 0) return new Decimal(1e22);
				if (completions == 1) return new Decimal(1e50);
				if (completions == 2) return new Decimal(1e109);
				if (completions == 3) return new Decimal(1e255);
				if (completions == 4) return new Decimal("1e515");

				return new Decimal("1e99999");
			},
			fullDisplay() {
				const completions = challengeCompletions(this.layer, 21);
				const maxed = maxedChallenge(this.layer, 21);
				const required = this.getRequiredAmount();
				let display = ``;
				display += `^0.8 Unstable Rocket Fuel ^0.1 Dark Matter`;
				display += `<br>Goal: ${formatWhole(required)} Unstable Rocket Fuel`;
				display += `<br><br><b>Reward:</b> `;
				if (completions >= 1) {
					display += `<br>${formatWhole(new Decimal(5).pow(completions))}x Antimatter`;
				}
				if (maxed) {
					display += `<br><br><b style="color:#4caf50">MAXED</b>`;
				} else {
					display += `<br><br><b style="color:#e0d238">${challengeCompletions(this.layer, 21)} / ${this.completionLimit} Completions</b>`;
				}
				return display;
			},
			canComplete() {
				return (
					inChallenge(this.layer, this.id) &&
					player.unstablefuel.points.gte(this.getRequiredAmount())
				);
			},
			style() {
				const completions = challengeCompletions(this.layer, 21);
				const maxed = completions >= 5;
				const canDo = this.canComplete();
				return {
					background: maxed
						? "radial-gradient(circle, #1a3320, #000000)"
						: canDo
							? "radial-gradient(circle, #3d3000, #1a1000)"
							: "radial-gradient(circle, #630606, #000000)",
					color: "white",
					border: maxed
						? "4px solid #2a5c3a"
						: canDo
							? "4px solid #f1be11"
							: "4px solid #4b0d0d",
					"font-size": "15px",
					position: "relative",
					overflow: "hidden",
				};
			},
		},

		22: {
			name() {
				return `Schwarzschild Wormhole`;
			},
			completionLimit: 5,
			getRequiredAmount() {
				const completions = challengeCompletions(this.layer, 22);
				if (completions == 0) return new Decimal(1e50);
				if (completions == 1) return new Decimal(1e80);
				if (completions == 2) return new Decimal(1e146);
				if (completions == 3) return new Decimal(1e247);
				if (completions == 4) return new Decimal("1e370");

				return new Decimal("1e99999");
			},
			fullDisplay() {
				const completions = challengeCompletions(this.layer, 22);
				const maxed = maxedChallenge(this.layer, 22);
				const required = this.getRequiredAmount();
				let display = ``;
				display += `You can't earn Supernova Tiers`;
				display += `<br>Goal: ${formatWhole(required)} Unstable Rocket Fuel`;
				display += `<br><br><b>Reward:</b> `;
				if (completions >= 1) {
					display += `<br>^${format(new Decimal(1).add(completions / 10))} Antimatter`;
				}
				if (maxed) {
					display += `<br><br><b style="color:#4caf50">MAXED</b>`;
				} else {
					display += `<br><br><b style="color:#e0d238">${challengeCompletions(this.layer, 22)} / ${this.completionLimit} Completions</b>`;
				}
				return display;
			},
			canComplete() {
				return (
					inChallenge(this.layer, this.id) &&
					player.unstablefuel.points.gte(this.getRequiredAmount())
				);
			},
			style() {
				const completions = challengeCompletions(this.layer, 22);
				const maxed = completions >= 5;
				const canDo = this.canComplete();
				return {
					background: maxed
						? "radial-gradient(circle, #1a3320, #000000)"
						: canDo
							? "radial-gradient(circle, #3d3000, #1a1000)"
							: "radial-gradient(circle, #635706, #000000)",
					color: "white",
					border: maxed
						? "4px solid #2a5c3a"
						: canDo
							? "4px solid #f1be11"
							: "4px solid #4b4a0d",
					"font-size": "15px",
					position: "relative",
					overflow: "hidden",
				};
			},
		},
	},

	milestones: {
		1: {
			requirementDescription: "First Universe",
			effectDescription:
				"Auto-buy Unstable Rocket Fuel Upgrades, 10x Dark Matter, 2x Energy",
			done() {
				return player.universe.points.gte(1);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},

		2: {
			requirementDescription: "Second Universe",
			effectDescription: "Auto-buy Dark Matter Buyables, 100x Void, 2x Energy",
			done() {
				return player.universe.points.gte(2);
			},
			unlocked() {
				return (
					hasMilestone(this.layer, this.id - 1) ||
					hasMilestone(this.layer, this.id)
				);
			},
		},

		3: {
			requirementDescription: "Third Universe",
			effectDescription:
				"Auto-buy Energy Upgrades, 1,000x Unstable Rocket Fuel",
			done() {
				return player.universe.points.gte(3);
			},
			unlocked() {
				return (
					hasMilestone(this.layer, this.id - 1) ||
					hasMilestone(this.layer, this.id)
				);
			},
		},

		4: {
			requirementDescription: "Fourth Universe",
			effectDescription: "Auto-buy Blackhole Buyables, 1,000x Dark Matter",
			done() {
				return player.universe.points.gte(4);
			},
			unlocked() {
				return (
					hasMilestone(this.layer, this.id - 1) ||
					hasMilestone(this.layer, this.id)
				);
			},
		},

		5: {
			requirementDescription: "Fifth Universe",
			effectDescription: "Unlock Negative Infinity",
			done() {
				return player.universe.points.gte(5);
			},
			unlocked() {
				return (
					hasMilestone(this.layer, this.id - 1) ||
					hasMilestone(this.layer, this.id)
				);
			},
		},

		11: {
			requirementDescription: "Red Dwarf",
			effectDescription: "Unlock 5 Black Hole Upgrades",
			done() {
				return (
					player.universe.currentStar.gte(1) && player.universe.points.gte(1)
				);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},
		12: {
			requirementDescription: "Brown Dwarf",
			effectDescription: "Unlock a new Dark Matter Buyable",
			done() {
				return player.universe.currentStar.gte(2);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},
		13: {
			requirementDescription: "White Dwarf",
			effectDescription: "Unlock 5 Unstable Rocket Fuel Upgrades",
			done() {
				return player.universe.currentStar.gte(3);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},
		14: {
			requirementDescription: "Yellow Dwarf",
			effectDescription: "Unlock 5 Cosmos Upgrades",
			done() {
				return player.universe.currentStar.gte(4);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},
		15: {
			requirementDescription: "Blue Dwarf",
			effectDescription: "Unlock 5 Black Hole Upgrades",
			done() {
				return player.universe.currentStar.gte(5);
			},
			unlocked() {
				return hasMilestone(this.layer, this.id);
			},
		},
	},

	upgrades: {
		11: {
			title: "P1-1",
			description: "Unstable Rocket Fuel gain is increased based on Universes",
			cost: new Decimal(3),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			branches: [21, 22, 23],
			effect() {
				let base = new Decimal(5).pow(player.universe.points.times(2).add(1));
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		21: {
			title: "P2-1",
			description: "2.5x Plasma",
			cost: new Decimal(50),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 11) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		22: {
			title: "P2-2",
			description: "5x Dark Matter",
			cost: new Decimal(50),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 11) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		23: {
			title: "A2-3",
			description: "Unstable Rocket Fuel gain is increased based on Antimatter",
			cost: new Decimal(10),
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(2).add(1.5);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 11) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		31: {
			title: "P3-1",
			description: "Dark Matter gain is increased based on Plasma",
			cost: new Decimal(75),
			branches: [21, 22],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.plasma.add(1).log2().pow(1.75).add(1.5);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		32: {
			title: "A3-2",
			description: "Void gain is increased based on Antimatter",
			cost: new Decimal(25),
			branches: [23],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log2().add(1.5);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 23) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		33: {
			title: "A3-3",
			description: "Money gain is increased based on Antimatter",
			cost: new Decimal(200),
			branches: [23],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log10().add(1);
				return base;
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return hasUpgrade(this.layer, 23) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		41: {
			title: "P4-1",
			description: "Plasma gain is increased based on Plasma",
			cost: new Decimal(200),
			branches: [31],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.plasma.add(1).log10().pow(0.65).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 31) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		42: {
			title: "A4-2",
			description: "Dark Matter gain is increased based on Antimatter",
			cost: new Decimal(444),
			branches: [32, 33],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(0.8).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 33) && hasUpgrade(this.layer, 32)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		43: {
			title: "A4-3",
			description: "3x Energy",
			cost: new Decimal(676),
			branches: [42],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 42) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		51: {
			title: "P5-1",
			description: "Unstable Rocket Fuel gain is increased based on Plasma",
			cost: new Decimal(500),
			branches: [41],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.plasma.add(1).log2().pow(2.25).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 41) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		52: {
			title: "A5-2",
			description: "100x Void",
			cost: new Decimal(11111),
			branches: [43],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 43) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		61: {
			title: "A6-1",
			description: "Unstable Rocket Fuel gain is increased based on Antimatter",
			cost: new Decimal(35000),
			branches: [51, 52],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(2.7).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 51) && hasUpgrade(this.layer, 52)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		71: {
			title: "P7-1",
			description: "5x Plasma",
			cost: new Decimal(100),
			branches: [61],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 61) && player.universe.points.gte(2)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		72: {
			title: "P7-2",
			description: "Money gain is increased based on Plasma",
			cost: new Decimal(1111),
			branches: [61],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.plasma.add(1).log2().pow(1.475).add(1);
				return base;
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 61) && player.universe.points.gte(2)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		73: {
			title: "A7-3",
			description: "Money gain is increased based on Antimatter",
			cost: new Decimal(1111),
			branches: [61],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(1.25).add(1);
				return base;
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 61) && player.universe.points.gte(2)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		81: {
			title: "P8-1",
			description: "Cosmic Dust gain is increased based on Plasma",
			cost: new Decimal(5000),
			branches: [71, 72],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.plasma.add(1).pow(0.8).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 71) && hasUpgrade(this.layer, 72)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		82: {
			title: "A8-2",
			description: "Dark Matter gain is increased based on Antimatter",
			cost: new Decimal(250000),
			branches: [73],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).pow(0.5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 73) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		83: {
			title: "A8-3",
			description: "Unstable Rocket Fuel gain is increased based on Antimatter",
			cost: new Decimal(250000),
			branches: [73],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).pow(0.5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 73) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		91: {
			title: "P9-1",
			description: "Plasma gain is increased based on Antimatter",
			cost: new Decimal(5000),
			branches: [81],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).pow(0.1).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return hasUpgrade(this.layer, 81) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		92: {
			title: "A9-2",
			description: "1% of Dark Matter/s",
			cost: new Decimal(1e6),
			branches: [82],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 82) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		93: {
			title: "A9-3",
			description: "1% of Void/s",
			cost: new Decimal(1e6),
			branches: [83],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 83) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		101: {
			title: "P10-1",
			description: "5x Energy",
			cost: new Decimal(20000),
			branches: [91],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 91) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		102: {
			title: "P10-2",
			description: "Unstable Rocket Fuel gain is increased based on Plasma",
			cost: new Decimal(70000),
			effect() {
				let base = player.universe.plasma.add(1).pow(0.9).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			branches: [91],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 91) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		103: {
			title: "A10-3",
			description: "Unstable Rocket Fuel gain is increased based on Antimatter",
			cost: new Decimal(999999),
			branches: [92, 93],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			effect() {
				let base = player.universe.antimatter.add(1).pow(0.9).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 92) && hasUpgrade(this.layer, 93)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		111: {
			title: "P11-1",
			description: "Dark Matter Gain is increased based on Plasma",
			effect() {
				let base = player.universe.plasma.add(1).log2().pow(3.8).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(100000),
			branches: [101, 102, 103],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 101) &&
						hasUpgrade(this.layer, 102) &&
						hasUpgrade(this.layer, 103)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		121: {
			title: "A12-1",
			description: "Plasma Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(0.44).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(1e8),
			branches: [111],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 111) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		122: {
			title: "A12-2",
			description: "Money Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(3.8).add(1);
				return base;
			},
			effectDisplay() {
				return "+" + format(upgradeEffect(this.layer, this.id));
			},
			cost: new Decimal(1e8),
			branches: [111],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 111) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		123: {
			title: "A12-3",
			description: "Void Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(2.2).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(1e8),
			branches: [111],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 111) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		131: {
			title: "P13-1",
			description: "Cosmic Dust gain is increased based on Plasma",
			effect() {
				let base = player.universe.plasma.add(1).log2().pow(5.5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(700000),
			branches: [111],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 121) &&
						hasUpgrade(this.layer, 122) &&
						hasUpgrade(this.layer, 123)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		132: {
			title: "A13-2",
			description: "Cosmic Dust Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(5.1).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(1e10),
			branches: [121, 122, 123],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 121) &&
						hasUpgrade(this.layer, 122) &&
						hasUpgrade(this.layer, 123)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		141: {
			title: "P14-1",
			description: "Galaxy cost is decreased based on Plasma",
			effect() {
				let base = player.universe.plasma.add(1).pow(9).add(1);
				return base;
			},
			effectDisplay() {
				return "/" + format(upgradeEffect(this.layer, this.id));
			},
			cost: new Decimal(700000),
			branches: [131],
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 131) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		151: {
			title: "P15-1",
			description: "Unstable Rocket Fuel gain is increased based on Universes",
			cost: new Decimal(1.5e6),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			branches: [141],
			effect() {
				let base = new Decimal(5).pow(player.universe.points.times(3).add(1));
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			style() {
				return {
					margin: "12px",
				};
			},
			unlocked() {
				return (
					(hasUpgrade(this.layer, 141) && player.universe.points.gte(4)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		161: {
			title: "P16-1",
			description: "Unstable Rocket Fuel gain is increased based on Void",
			cost: new Decimal(2e7),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			branches: [151],
			effect() {
				let base = player.blackhole.points.add(1).log10().pow(5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			style() {
				return {
					margin: "12px",
				};
			},
			unlocked() {
				return hasUpgrade(this.layer, 151) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		162: {
			title: "A16-2",
			description: "Plasma Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).log2().pow(0.5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(1e11),
			branches: [151, 132],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 151) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		163: {
			title: "A16-3",
			description: "Dark Energy Gain is increased based on Antimatter",
			effect() {
				let base = player.universe.antimatter.add(1).pow(0.0175).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			cost: new Decimal(5e11),
			branches: [151, 132],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return hasUpgrade(this.layer, 151) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		171: {
			title: "P17-1",
			description:
				"Unstable Rocket Fuel gain is increased based on Dark Matter",
			cost: new Decimal(2.5e7),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			branches: [161],
			effect() {
				let base = player.darkmatter.points.add(1).log10().pow(4.5).add(1);
				return base;
			},
			effectDisplay() {
				return format(upgradeEffect(this.layer, this.id)) + "x";
			},
			style() {
				return {
					margin: "12px",
				};
			},
			unlocked() {
				return hasUpgrade(this.layer, 161) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		172: {
			title: "A17-2",
			description: "100,000,000x Cosmic Dust",
			cost: new Decimal(2.25e12),
			branches: [162, 163],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 162) && hasUpgrade(this.layer, 163)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		173: {
			title: "A17-3",
			description: "100x Energy",
			cost: new Decimal(1e13),
			branches: [162, 163],
			currencyDisplayName: "Antimatter",
			currencyInternalName: "antimatter",
			currencyLayer: "universe",
			unlocked() {
				return (
					(hasUpgrade(this.layer, 162) && hasUpgrade(this.layer, 163)) ||
					hasUpgrade(this.layer, this.id)
				);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		181: {
			title: "P18-1",
			description() {
				return (
					formatWhole(9.99e25) +
					"x Unstable Rocket Fuel, " +
					formatWhole(9.99e20) +
					"x Dark Matter, " +
					formatWhole(9.99e15) +
					"x Cosmic Dust, " +
					formatWhole(9.99e10) +
					"x Void, " +
					formatWhole(99999) +
					"x Energy, " +
					format(9.99) +
					"x Plasma"
				);
			},
			cost: new Decimal(1),
			currencyDisplayName: "Plasma",
			currencyInternalName: "plasma",
			currencyLayer: "universe",
			branches: [171, 172, 173],
			style() {
				return {
					margin: "12px",
				};
			},
			unlocked() {
				return player.universe.points.gte(5) || hasUpgrade(this.layer, this.id);
			},
			style() {
				return {
					margin: "12px",
					width: "200px",
					height: "200px",
					"font-size": "13px",
				};
			},
		},
	},
});
