const FISHING_FISHES = [
	// Common (16)
	{ name: "Space Bass", rarity: "Common" },
	{ name: "Cosmic Trout", rarity: "Common" },
	{ name: "Nebula Eel", rarity: "Common" },
	{ name: "Asteroid Carp", rarity: "Common" },
	{ name: "Void Minnow", rarity: "Common" },
	{ name: "Comet Chub", rarity: "Common" },
	{ name: "Orbit Oranda", rarity: "Common" },
	{ name: "Galactic Guppy", rarity: "Common" },
	{ name: "Lunar Loach", rarity: "Common" },
	{ name: "Photon Perch", rarity: "Common" },
	{ name: "Solar Flare Flounder", rarity: "Common" },
	{ name: "Pulsar Pike", rarity: "Common" },
	{ name: "Stardust Sturgeon", rarity: "Common" },
	{ name: "Cosmic Ray Roach", rarity: "Common" },
	{ name: "Satellite Sunfish", rarity: "Common" },
	{ name: "Meteor Minnow", rarity: "Common" },
	// Rare (10)
	{ name: "Dark Matter Dace", rarity: "Rare" },
	{ name: "Quasar Koi", rarity: "Rare" },
	{ name: "Supernova Snapper", rarity: "Rare" },
	{ name: "Gravity Wave Grouper", rarity: "Rare" },
	{ name: "Wormhole Walleye", rarity: "Rare" },
	{ name: "Neutron Narwhal Fish", rarity: "Rare" },
	{ name: "Singularity Sardine", rarity: "Rare" },
	{ name: "Ion Storm Icefish", rarity: "Rare" },
	{ name: "Nebular Needlefish", rarity: "Rare" },
	{ name: "Eclipse Eel", rarity: "Rare" },
	// Epic (8)
	{ name: "Magnetar Mackerel", rarity: "Epic" },
	{ name: "Event Horizon Herring", rarity: "Epic" },
	{ name: "Blackhole Bass", rarity: "Epic" },
	{ name: "Exoplanet Eel", rarity: "Epic" },
	{ name: "Plasma Pleco", rarity: "Epic" },
	{ name: "Red Dwarf Ray", rarity: "Epic" },
	{ name: "Celestial Cichlid", rarity: "Epic" },
	{ name: "Tachyon Tuna", rarity: "Epic" },
	// Legendary (6)
	{ name: "Antimatter Angelfish", rarity: "Legendary" },
	{ name: "Parsec Piranha", rarity: "Legendary" },
	{ name: "Spacetime Spadefish", rarity: "Legendary" },
	{ name: "Hypernova Halibut", rarity: "Legendary" },
	{ name: "Binary Star Bream", rarity: "Legendary" },
	{ name: "Dimensional Driftfish", rarity: "Legendary" },
	// Mythical (5)
	{ name: "Zenith Zebrafish", rarity: "Mythical" },
	{ name: "Void Wraith Wrasse", rarity: "Mythical" },
	{ name: "Stellar Collapse Shark", rarity: "Mythical" },
	{ name: "Chrono Chimera Fish", rarity: "Mythical" },
	{ name: "Omniversal Oarfish", rarity: "Mythical" },
	// Godly (4)
	{ name: "Primordial Paradox Eel", rarity: "Godly" },
	{ name: "Cosmic Isopod Fish", rarity: "Godly" },
	{ name: "Creation Coelacanth", rarity: "Godly" },
	{ name: "Infinity Leviathan", rarity: "Godly" },

	// Galactic (1)
	{ name: "The First Fish", rarity: "Galactic" },
];

const RARITIES = [
	{ name: "Common", color: "#B4B2A9", chance: 0.8, value: 5, mult: 0.01 },
	{ name: "Rare", color: "#efb66c", chance: 0.15, value: 40, mult: 0.02 },
	{ name: "Epic", color: "#d8acf7", chance: 0.04, value: 175, mult: 0.04 },
	{
		name: "Legendary",
		color: "#27dbef",
		chance: 0.009,
		value: 1000,
		mult: 0.1,
	},
	{
		name: "Mythical",
		color: "#ff1e69",
		chance: 0.001,
		value: 25000,
		mult: 0.25,
	},
	{ name: "Godly", color: "#ff5bce", chance: 0.0001, value: 500000, mult: 1 },
	{
		name: "Galactic",
		color: "#9213dc",
		chance: 0.00001,
		value: 9999999,
		mult: 5,
	},
];
const RARITY_MAP = Object.fromEntries(RARITIES.map((r) => [r.name, r]));

const SACKS = [
	{ name: "Tiny Sack", capacity: 5, cost: new Decimal(0), color: "#8B6343" },
	{ name: "Small Sack", capacity: 10, cost: new Decimal(50), color: "#C0A882" },
	{
		name: "Medium Sack",
		capacity: 25,
		cost: new Decimal(200),
		color: "#A8A9AD",
	},
	{
		name: "Large Sack",
		capacity: 50,
		cost: new Decimal(750),
		color: "#D4AF37",
	},
	{
		name: "Giant Sack",
		capacity: 100,
		cost: new Decimal(25000),
		color: "#5DADE2",
	},
	{
		name: "Titanic Sack",
		capacity: 250,
		cost: new Decimal(1e6),
		color: "#7DFDFE",
	},
	{
		name: "Colossal Sack",
		capacity: 1000,
		cost: new Decimal(1e8),
		color: "#d8acf7",
	},
	{
		name: "Astronomical Sack",
		capacity: 5000,
		cost: new Decimal(1e10),
		color: "#9213dc",
	},
];

const FISHING_RODS = [
	{
		name: "Wooden Fishing Rod",
		cooldownReduction: 0,
		cost: new Decimal(0),
		color: "#8B6343",
	},
	{
		name: "Stone Fishing Rod",
		cooldownReduction: 1,
		cost: new Decimal(25),
		color: "#8C8C8C",
	},
	{
		name: "Copper Fishing Rod",
		cooldownReduction: 1.5,
		cost: new Decimal(100),
		color: "#B87333",
	},
	{
		name: "Iron Fishing Rod",
		cooldownReduction: 2,
		cost: new Decimal(400),
		color: "#A8A9AD",
	},
	{
		name: "Steel Fishing Rod",
		cooldownReduction: 2.5,
		cost: new Decimal(900),
		color: "#C0C0C0",
	},
	{
		name: "Reinforced Fishing Rod",
		cooldownReduction: 3,
		cost: new Decimal(2000),
		color: "#D4AF37",
	},
	{
		name: "Carbon Fishing Rod",
		cooldownReduction: 3.5,
		cost: new Decimal(5000),
		color: "#333333",
	},
	{
		name: "Titanium Fishing Rod",
		cooldownReduction: 4,
		cost: new Decimal(12000),
		color: "#5DADE2",
	},
	{
		name: "Quantum Fishing Rod",
		cooldownReduction: 4.5,
		cost: new Decimal(30000),
		color: "#7DFDFE",
	},
	{
		name: "Plasma Fishing Rod",
		cooldownReduction: 4.75,
		cost: new Decimal(75000),
		color: "#FF6B35",
	},
	{
		name: "Photon Fishing Rod",
		cooldownReduction: 5,
		cost: new Decimal(2e5),
		color: "#FFF176",
	},
	{
		name: "Dark Matter Fishing Rod",
		cooldownReduction: 5.5,
		cost: new Decimal(5e5),
		color: "#4A0E8F",
	},
	{
		name: "Neutron Fishing Rod",
		cooldownReduction: 6,
		cost: new Decimal(1.5e6),
		color: "#B0C4DE",
	},
	{
		name: "Antimatter Fishing Rod",
		cooldownReduction: 6.5,
		cost: new Decimal(4e6),
		color: "#FF1493",
	},
	{
		name: "Singularity Fishing Rod",
		cooldownReduction: 7,
		cost: new Decimal(1e7),
		color: "#000000",
	},
	{
		name: "Wormhole Fishing Rod",
		cooldownReduction: 7.5,
		cost: new Decimal(3e7),
		color: "#00FA9A",
	},
	{
		name: "Pulsar Fishing Rod",
		cooldownReduction: 8,
		cost: new Decimal(1e8),
		color: "#FFD700",
	},
	{
		name: "Quasar Fishing Rod",
		cooldownReduction: 8.5,
		cost: new Decimal(5e8),
		color: "#FF4500",
	},
	{
		name: "Void Fishing Rod",
		cooldownReduction: 9.0,
		cost: new Decimal(2e9),
		color: "#1a0030",
	},
	{
		name: "Galactic Fishing Rod",
		cooldownReduction: 9.5,
		cost: new Decimal(1e10),
		color: "#9213dc",
	},
];

addLayer("fishing", {
	color: "#9213dc",

	startData() {
		return {
			unlocked: true,
			fishesDiscovered: new Decimal(0),
			astroCredits: new Decimal(0),
			inventory: {},
			fishingRodLevel: 0,
			sackLevel: 0,
			currentCooldown: 0,
			lastCatches: [],
			cooldownNotify: true,
			fishingLuckEnabled: true,
			totalFishes: new Decimal(0),
			totalAstroCredits: new Decimal(0),
			rebirthPoints: new Decimal(0),
		};
	},

	fishes: FISHING_FISHES,
	rarities: RARITIES,
	sacks: SACKS,
	fishingRods: FISHING_RODS,

	tabFormat: {
		Info: {
			content: [["infobox", "main"], "blank", ["infobox", "rarityInfo"]],
			buttonStyle() {
				return { "border-color": "#7c7c7c" };
			},
		},
		Index: {
			content: [
				[
					"display-text",
					function () {
						return `You have discovered
                            <h2 style="color: #9213dc; text-shadow: 0px 0px 20px #9213dc; font-family: 'Lucida Console', 'Courier New', monospace">
                            ${player.fishing.fishesDiscovered}/${layers.fishing.fishes.length}</h2> Fishes, which multiply Astrocredits gain by ${format(layers.fishing.getIndexMult())}x`;
					},
				],
				"blank",
				"achievements",
			],
		},
		Fish: {
			content: [
				[
					"display-text",
					function () {
						const sackStorage = SACKS[player.fishing.sackLevel].capacity;
						let inventoryCount = 0;
						for (let fishName in player.fishing.inventory) {
							inventoryCount += player.fishing.inventory[fishName];
						}

						return `You have
            <h2 style="color: #9213dc; text-shadow: 0px 0px 20px #9213dc; font-family: 'Lucida Console', 'Courier New', monospace">
            ${inventoryCount}/${formatWhole(sackStorage)}</h2> Space Fishes in your sack!`;
					},
				],
				"blank",
				["bar", "fishingProgress"],
				"blank",
				[
					"display-text",
					function () {
						const lastCatches = player.fishing.lastCatches;
						if (!lastCatches || lastCatches.length === 0) {
							return `Last Catch: <h2 style="color: #ffffff; font-family: 'Lucida Console', 'Courier New', monospace">None</h2>`;
						}

						const catchText = lastCatches
							.map((catchName) => {
								const fish = FISHING_FISHES.find((f) => f.name === catchName);
								const rarity = RARITIES.find((r) => r.name === fish.rarity);
								const color = rarity.color;
								return `<span style="color: ${color}; text-shadow: 0px 0px 20px ${color}; font-family: 'Lucida Console', 'Courier New', monospace">${catchName}</span>`;
							})
							.join(" + ");

						const label =
							lastCatches.length > 1
								? `<span style="color: #00ffff">Double Hook!</span>`
								: "Last Catch:";
						return `${label} <h2>${catchText}</h2>`;
					},
				],
				"blank",
				["clickable", 11],
				"blank",
				["clickables", [15, 16]],
			],
			buttonStyle() {
				return player.fishing.cooldownNotify &&
					player.fishing.currentCooldown <= 0
					? { "box-shadow": "0px 0px 10px #ffffff" }
					: {};
			},
		},
		Sell: {
			content: [
				[
					"display-text",
					function () {
						return `You have
                    <h2 style="color: #e1bf5f; text-shadow: 0px 0px 20px #e1bf5f; font-family: 'Lucida Console', 'Courier New', monospace">
                    ${formatWhole(player.fishing.astroCredits)}</h2> Astrocredits`;
					},
				],
				[
					"display-text",
					function () {
						const sackStorage = SACKS[player.fishing.sackLevel].capacity;
						let inventoryCount = 0;
						for (let fishName in player.fishing.inventory) {
							inventoryCount += player.fishing.inventory[fishName];
						}

						return `You have
            <h2 style="color: #9213dc; text-shadow: 0px 0px 20px #9213dc; font-family: 'Lucida Console', 'Courier New', monospace">
            ${inventoryCount}/${formatWhole(sackStorage)}</h2> Space Fishes in your sack!`;
					},
				],
				"blank",
				["clickable", 12],
				"blank",
				["infobox", "inventory"],
				"blank",
				["infobox", "sell"],
			],
			buttonStyle() {
				return { "border-color": "#e1bf5f" };
			},
		},
		Upgrade: {
			content: [
				[
					"display-text",
					function () {
						return `You have
                    <h2 style="color: #e1bf5f; text-shadow: 0px 0px 20px #e1bf5f; font-family: 'Lucida Console', 'Courier New', monospace">
                    ${formatWhole(player.fishing.astroCredits)}</h2> Astrocredits`;
					},
				],
				"blank",
				["microtabs", "fishingUpgradeTabs"],
			],

			buttonStyle() {
				return { "border-color": "#74e36a" };
			},
		},
		Rebirth: {
			content: [
				[
					"display-text",
					function () {
						return `You have
                    <h2 style="color: #e13b3b; text-shadow: 0px 0px 20px #e13b3b; font-family: 'Lucida Console', 'Courier New', monospace">
                    ${formatWhole(player.fishing.rebirthPoints)}</h2> Rebirth Points`;
					},
				],
				[
					"display-text",
					function () {
						return `You have
                    <h2 style="color: #e1bf5f; text-shadow: 0px 0px 20px #e1bf5f; font-family: 'Lucida Console', 'Courier New', monospace">
                    ${formatWhole(player.fishing.astroCredits)}</h2> Astrocredits`;
					},
				],
				"blank",
				["clickable", 17],
				"blank",
				"upgrades",
			],
			buttonStyle() {
				if (
					player.fishing.astroCredits.gte(1000) ||
					player.fishing.rebirthPoints.gte(1)
				) {
					return { "border-color": "#e13b3b" };
				}
				return { "border-color": "#414141" };
			},
			unlocked: false,
		},
	},

	microtabs: {
		fishingUpgradeTabs: {
			"Fishing Rods": {
				content: [
					"blank",
					[
						"display-text",
						function () {
							let fishingRod = FISHING_RODS[player.fishing.fishingRodLevel];
							return `You have a
					<h2 style="color: ${fishingRod.color}; text-shadow: 0px 0px 20px ${fishingRod.color}; font-family: 'Lucida Console', 'Courier New', monospace">
					${fishingRod.name}</h2> which has a cooldown of ${10 - fishingRod.cooldownReduction}s`;
						},
					],
					"blank",
					["clickable", 13],
				],
			},
			Sacks: {
				content: [
					"blank",
					[
						"display-text",
						function () {
							let sack = SACKS[player.fishing.sackLevel];
							return `You have a
					<h2 style="color: ${sack.color}; text-shadow: 0px 0px 20px ${sack.color}; font-family: 'Lucida Console', 'Courier New', monospace">
					${sack.name}</h2> with a capacity of ${formatWhole(sack.capacity)}`;
						},
					],
					"blank",
					["clickable", 14],
				],
			},
			Buyables: {
				content: ["blank", "buyables"],
			},
		},
	},

	update(diff) {
		let completedCount = 0;
		for (let id in this.achievements) {
			if (hasAchievement("fishing", id)) {
				completedCount++;
			}
		}
		player.fishing.fishesDiscovered = new Decimal(completedCount);

		player.fishing.currentCooldown -= diff;
		if (player.fishing.currentCooldown < 0) {
			player.fishing.currentCooldown = 0;
		}
	},

	rollFish() {
		const luckLevel = player.fishing.fishingLuckEnabled
			? layers.fishing.calculateFishingLuck().toNumber()
			: 0;

		const weightedRarities = RARITIES.map((r, i) => {
			const luckMultiplier = 1 + (luckLevel / 100) * i * 2;
			return { ...r, weight: r.chance * luckMultiplier };
		});

		const totalWeight = weightedRarities.reduce((sum, r) => sum + r.weight, 0);
		let roll = Math.random() * totalWeight;
		let chosenRarity = weightedRarities[0];

		for (const rarity of weightedRarities) {
			roll -= rarity.weight;
			if (roll <= 0) {
				chosenRarity = rarity;
				break;
			}
		}

		const pool = FISHING_FISHES.filter((f) => f.rarity === chosenRarity.name);
		const fish = pool[Math.floor(Math.random() * pool.length)];
		return fish;
	},

	calculateSellValue() {
		let total = new Decimal(0);

		for (let fishName in player.fishing.inventory) {
			if (fishName === "__ob__") continue;
			const fish = FISHING_FISHES.find((f) => f.name === fishName);
			if (!fish) continue;
			const count = player.fishing.inventory[fishName];
			const value = RARITY_MAP[fish.rarity].value;
			total = total.plus(new Decimal(value).times(count));
		}

		return total
			.times(buyableEffect("fishing", 11))
			.times(layers.fishing.getIndexMult());
	},

	calculateRebirthPoints() {
		let x = player.fishing.astroCredits;
		let amount = x.div(1000).log(2).add(1);
		return amount.floor();
	},

	calculateFishingLuck() {
		let luck = new Decimal(0);
		luck = luck.add(getBuyableAmount("fishing", 13));
		if (hasUpgrade("fishing", 12)) luck = luck.add(5);

		return luck;
	},

	getIndexMult() {
		let totalMult = new Decimal(1);

		for (let id in this.achievements) {
			if (hasAchievement("fishing", id)) {
				const fish = FISHING_FISHES.find(
					(f) => f.name === this.achievements[id].fishName,
				);
				if (!fish) continue;
				totalMult = totalMult.plus(RARITY_MAP[fish.rarity].mult);
			}
		}

		return totalMult;
	},

	doRebirth() {},

	infoboxes: {
		main: {
			title: "Space Fishing",
			body() {
				const rod = FISHING_RODS[player.fishing.fishingRodLevel];
				const sack = SACKS[player.fishing.sackLevel];
				const indexMult = format(layers.fishing.getIndexMult());
				const boostMult = format(buyableEffect("fishing", 11));
				const doubleHook = getBuyableAmount("fishing", 12).toNumber();
				const luckLevel = layers.fishing.calculateFishingLuck().toNumber();

				return `

                <h3 style="margin-bottom: 4px;">🎣 Fishing</h3>
                <p>Click the "Fish!" button in the Fish tab to cast your line. Each cast has a cooldown based on your fishing rod. Your current rod is the <b style="color: ${rod.color}">${rod.name}</b>, which has a cooldown of ${10 - rod.cooldownReduction}s.</p>
				<br>
                <h3 style="margin-top: 12px; margin-bottom: 4px;">🎒 Sacks</h3>
                <p>Caught fish go into your sack. You can't fish when it's full, sell your fish to empty your sack.
                Your current sack is the <b style="color: ${sack.color}">${sack.name}</b> with a capacity of ${formatWhole(sack.capacity)} fish.</p>
				<br>
				 <h3 style="margin-top: 12px; margin-bottom: 4px;">📖 Index</h3>
                <p>The Index tab tracks every unique fish you've discovered. Each discovered fish permanently increases
                your Astrocredits multiplier based on its rarity.</p>
				<br>
                <h3 style="margin-top: 12px; margin-bottom: 4px;">💰 Selling</h3>
                <p>Sell your fish in the Sell tab for Astrocredits. Each rarity has a base sell value, multiplied by your
                Astrocredits Boost Buyable (<b style="color: #e1bf5f">${boostMult}x</b>) and your
                Index Multiplier (<b style="color: #9213dc">${indexMult}x</b>).</p>
				<br>
                <h3 style="margin-top: 12px; margin-bottom: 4px;">⬆️ Upgrades</h3>
                <p>Spend Astrocredits in the Upgrade tab on:</p>
                <ul style="margin: 4px 0 0 16px;">
                    <li>- Fishing Rods: reduce your cast cooldown</li>
                    <li>- Sacks: increase how many fish you can carry</li>
                    <li>- Astrocredits Boost: multiply all sell values</li>
                    <li>- Double Hook: ${doubleHook > -1 ? `<b style="color: #00ffff">${doubleHook}%</b> chance to catch two fish per cast` : "chance to catch two fish per cast"}</li>
                    <li>- Fishing Luck: ${luckLevel > -1 ? `currently <b style="color: #74e36a">${luckLevel}%</b>, makes it more likely to catch rarer fish` : "makes it more likely to catch rarer fish"}</li>
                </ul>
				<br>
                <h3 style="margin-top: 12px; margin-bottom: 4px;">⭐ Rarities</h3>
                <p>Fish come in 7 different rarities. Check the Rarity Info box below for exact details.
                </p>
				<br>
                <p>Be sure to give feedback and suggestions, expect more space fishing content to be added in the future!
                </p>
        `;
			},
		},
		rarityInfo: {
			title: "Rarity Info",
			body() {
				const luckLevel = player.fishing.fishingLuckEnabled
					? layers.fishing.calculateFishingLuck().toNumber()
					: 0;

				const weightedRarities = RARITIES.map((r, i) => {
					const luckMultiplier = 1 + (luckLevel / 100) * i * 2;
					return { ...r, weight: r.chance * luckMultiplier };
				});

				const totalWeight = weightedRarities.reduce(
					(sum, r) => sum + r.weight,
					0,
				);

				const rows = RARITIES.map((r, i) => {
					const baseChance = +(
						(r.chance / RARITIES.reduce((s, x) => s + x.chance, 0)) *
						100
					).toFixed(4);
					const effChance = +(
						(weightedRarities[i].weight / totalWeight) *
						100
					).toFixed(4);
					const chanceChanged = luckLevel > 0 && effChance !== baseChance;

					const effectiveSellValue = new Decimal(r.value)
						.times(buyableEffect("fishing", 11))
						.times(layers.fishing.getIndexMult());
					const baseValue = formatWhole(r.value);
					const effValue = formatWhole(effectiveSellValue);
					const valueChanged = effectiveSellValue.gt(r.value);

					return `
                <tr>
                    <td style="color: ${r.color}; padding: 6px 16px; font-weight: bold;">${r.name}</td>
                    <td style="padding: 1px 5px;">
                        ${
													valueChanged
														? `<span style="text-decoration: line-through; opacity: 0.5">${baseValue} Astrocredits</span>
                               <span style="color: #e1bf5f"><br>${effValue} Astrocredits</span>`
														: `${baseValue} Astrocredits`
												}
                    </td>
                    <td style="padding: 1px 5px;">
                        ${
													chanceChanged
														? `<span style="text-decoration: line-through; opacity: 0.5">${baseChance}%</span>
                               <span style="color: #74e36a"><br>${effChance}%</span>`
														: `${baseChance}%`
												}
                    </td>
                    <td style="padding: 1px 5px;">+${r.mult}x Sell Value</td>
                </tr>
            `;
				}).join("");

				return `
            <table style="border-collapse: collapse; margin: 8px auto; text-align: left;">
                <tr style="opacity: 0.6; font-size: 15px;">
                    <th style="padding: 4px 16px;">Rarity</th>
                    <th style="padding: 4px 16px;">Sell Value</th>
                    <th style="padding: 4px 16px;">Chance</th>
                    <th style="padding: 4px 16px;">Index Bonus</th>
                </tr>
                ${rows}
            </table>
        `;
			},
		},
		inventory: {
			title: "Fish Inventory",
			body() {
				let txt = "";
				for (let fishName in player.fishing.inventory) {
					const color = RARITIES.find(
						(r) =>
							r.name === FISHING_FISHES.find((f) => f.name === fishName).rarity,
					).color;
					const count = player.fishing.inventory[fishName];
					txt += `<span style="color: ${color}">${fishName}</span>: ${count}<br>`;
				}
				return txt || "Your sack is empty!";
			},
		},
	},

	achievements: (function () {
		let achievements = {};
		let currentRow = 1;
		let currentCol = 1;
		let lastRarity = null;

		for (let i = 0; i < FISHING_FISHES.length; i++) {
			const fish = FISHING_FISHES[i];
			const rarity = RARITIES.find((r) => r.name === fish.rarity);
			const color = rarity.color;

			if (
				currentCol > 6 ||
				(lastRarity !== null && lastRarity !== fish.rarity)
			) {
				currentRow++;
				currentCol = 1;
			}

			const id = currentRow * 10 + currentCol;
			lastRarity = fish.rarity;
			currentCol++;

			achievements[id] = {
				fishName: fish.name,
				name() {
					return hasAchievement("fishing", id) ? fish.name : "???";
				},
				description() {
					return hasAchievement("fishing", id)
						? `Discovered the ${fish.rarity} ${fish.name}`
						: `Undiscovered ${fish.rarity} fish`;
				},
				style: {
					"border-color": color,
					visibility: "shown",
					"border-width": "3.5px",
					margin: "2px",
				},
				goalTooltip() {
					return hasAchievement("fishing", id)
						? `✅ ${fish.rarity} ${fish.name}`
						: `❌ ${fish.rarity} ???`;
				},
				tooltip() {
					return hasAchievement("fishing", id)
						? `✅ ${fish.rarity} ${fish.name}`
						: `❌ ${fish.rarity} ???`;
				},
				done() {
					return player.fishing.inventory[fish.name] > 0;
				},
			};
		}
		return achievements;
	})(),

	clickables: {
		11: {
			display() {
				let txt = "<h1><b>Fish!</b></h1>";

				const sackStorage =
					layers.fishing.sacks[player.fishing.sackLevel].capacity;
				let inventoryCount = 0;
				for (let fishName in player.fishing.inventory) {
					inventoryCount += player.fishing.inventory[fishName];
				}

				if (inventoryCount >= sackStorage) {
					txt += "<br><br><h4>(Sack Full)</h4>";
					return txt;
				}

				if (player.fishing.currentCooldown > 0) {
					txt += "<br><br><h4>(Cooldown)</h4>";
				}

				return txt;
			},
			canClick() {
				const sackStorage =
					layers.fishing.sacks[player.fishing.sackLevel].capacity;
				let inventoryCount = 0;
				for (let fishName in player.fishing.inventory) {
					inventoryCount += player.fishing.inventory[fishName];
				}

				if (inventoryCount >= sackStorage) {
					return false;
				}

				return player.fishing.currentCooldown <= 0;
			},
			onClick() {
				const rod = FISHING_RODS[player.fishing.fishingRodLevel];
				player.fishing.currentCooldown = 10 - rod.cooldownReduction;

				const sackStorage = SACKS[player.fishing.sackLevel].capacity;
				let inventoryCount = 0;
				for (let fishName in player.fishing.inventory) {
					inventoryCount += player.fishing.inventory[fishName];
				}

				const addFish = (fish) => {
					if (player.fishing.inventory[fish.name] === undefined) {
						Vue.set(player.fishing.inventory, fish.name, 1);
					} else {
						player.fishing.inventory[fish.name]++;
					}
				};

				let catches = [];

				// First catch
				if (inventoryCount < sackStorage) {
					const fish = layers.fishing.rollFish();
					addFish(fish);
					catches.push(fish.name);
					inventoryCount++;
					player.fishing.totalFishes = player.fishing.totalFishes.add(1);
				}

				// Double hook check
				const doubleHookChance =
					getBuyableAmount("fishing", 12).toNumber() / 100;
				if (Math.random() < doubleHookChance && inventoryCount < sackStorage) {
					const fish = layers.fishing.rollFish();
					addFish(fish);
					catches.push(fish.name);
					player.fishing.totalFishes = player.fishing.totalFishes.add(1);
				}

				player.fishing.lastCatches = catches;
				player.fishing.lastCatch = catches[0] || null;
			},
			style: {
				height: "200px",
				width: "200px",
				"font-size": "20px",
			},
		},

		12: {
			display() {
				let txt = "<h1><b>Sell Fish for</b></h1>";
				txt += `<h1><b><br>${formatWhole(layers.fishing.calculateSellValue())} Astrocredits</b></h1>`;
				return txt;
			},
			style() {
				if (layers.fishing.calculateSellValue().gt(0)) {
					return {
						height: "150px",
						width: "250px",
						"font-size": "12px",
						background: "#e1bf5f",
					};
				}

				return {
					height: "150px",
					width: "250px",
					"font-size": "12px",
				};
			},
			canClick() {
				return layers.fishing.calculateSellValue().gt(0);
			},
			onClick() {
				const sellValue = layers.fishing.calculateSellValue();
				player.fishing.astroCredits =
					player.fishing.astroCredits.plus(sellValue);
				player.fishing.inventory = {};
				player.fishing.totalAstroCredits =
					player.fishing.totalAstroCredits.plus(sellValue);
			},
		},

		13: {
			display() {
				const nextRod = FISHING_RODS[player.fishing.fishingRodLevel + 1];

				let txt = `<br><h1><b>Upgrade Fishing Rod</b></h1>`;

				if (nextRod) {
					txt += `<br><br><h3>Next: ${nextRod.name}</h3>`;
					txt += `<br><h4>Cooldown Reduction: ${nextRod.cooldownReduction}s</h4>`;
					txt += `<h4>Cost: ${formatWhole(nextRod.cost)} Astrocredits</h4>`;
				} else {
					txt += `<br><h3>Max Level Reached!</h3>`;
				}

				return txt;
			},
			canClick() {
				const nextRod = FISHING_RODS[player.fishing.fishingRodLevel + 1];
				if (!nextRod) return false;
				return player.fishing.astroCredits.gte(nextRod.cost);
			},
			onClick() {
				const nextRod = FISHING_RODS[player.fishing.fishingRodLevel + 1];
				if (!nextRod) return;
				if (player.fishing.astroCredits.lt(nextRod.cost)) return;

				player.fishing.astroCredits = player.fishing.astroCredits.minus(
					nextRod.cost,
				);
				player.fishing.fishingRodLevel++;
			},
			style() {
				const nextRod = FISHING_RODS[player.fishing.fishingRodLevel + 1];
				const base = {
					height: "175px",
					width: "300px",
					"font-size": "12px",
				};

				if (!nextRod) return base;

				if (player.fishing.astroCredits.gte(nextRod.cost)) {
					return {
						...base,
						background: nextRod.color,
					};
				}

				return base;
			},
		},

		14: {
			display() {
				const nextSack = SACKS[player.fishing.sackLevel + 1];

				let txt = `<br><h1><b>Upgrade Sack</b></h1>`;

				if (nextSack) {
					txt += `<br><br><h3>Next: ${nextSack.name}</h3>`;
					txt += `<br><h4>Capacity: ${nextSack.capacity}</h4>`;
					txt += `<h4>Cost: ${formatWhole(nextSack.cost)} Astrocredits</h4>`;
				} else {
					txt += `<br><h3>Max Level Reached!</h3>`;
				}

				return txt;
			},
			canClick() {
				const nextSack = SACKS[player.fishing.sackLevel + 1];
				if (!nextSack) return false;
				return player.fishing.astroCredits.gte(nextSack.cost);
			},
			onClick() {
				const nextSack = SACKS[player.fishing.sackLevel + 1];
				if (!nextSack) return;
				if (player.fishing.astroCredits.lt(nextSack.cost)) return;

				player.fishing.astroCredits = player.fishing.astroCredits.minus(
					nextSack.cost,
				);
				player.fishing.sackLevel++;
			},
			style() {
				const nextSack = SACKS[player.fishing.sackLevel + 1];
				const base = {
					height: "175px",
					width: "300px",
					"font-size": "12px",
				};

				if (!nextSack) return base;

				if (player.fishing.astroCredits.gte(nextSack.cost)) {
					return {
						...base,
						background: nextSack.color,
					};
				}

				return base;
			},
		},

		15: {
			display() {
				let txt = `Cooldown Notify: <b>${player.fishing.cooldownNotify ? "ON" : "OFF"}`;
				return txt;
			},
			canClick() {
				return true;
			},
			onClick() {
				player.fishing.cooldownNotify = !player.fishing.cooldownNotify;
			},
			style() {
				return {
					"min-height": "50px",
					height: "50px",
					width: "150px",
					"font-size": "15px",
					background: player.fishing.cooldownNotify ? "#74e36a" : "#e15f5f",
				};
			},
		},

		16: {
			display() {
				let txt = `Fishing Luck: <b>${player.fishing.fishingLuckEnabled ? "ON" : "OFF"}`;
				return txt;
			},
			canClick() {
				return true;
			},
			onClick() {
				player.fishing.fishingLuckEnabled = !player.fishing.fishingLuckEnabled;
			},
			style() {
				return {
					"min-height": "50px",
					width: "150px",
					"font-size": "15px",
					background: player.fishing.fishingLuckEnabled ? "#74e36a" : "#e15f5f",
				};
			},
		},

		17: {
			display() {
				let txt;
				if (player.fishing.astroCredits.gte(1000)) {
					txt = `+${formatWhole(layers.fishing.calculateRebirthPoints())} Rebirth Points`;
					txt += `<br><br>Next at: ${format(new Decimal(2).pow(layers.fishing.calculateRebirthPoints()).times(1000))} Astrocredits`;
				} else txt = "Requires 1,000 Astrocredits";
				return txt;
			},
			canClick() {
				return player.fishing.astroCredits.gte(1000);
			},
			onClick() {
				let addedRebirthPoints = layers.fishing.calculateRebirthPoints();
				let array = player.fishing.buyables;

				player.fishing.buyables[11] = new Decimal(0);
				player.fishing.buyables[12] = new Decimal(0);
				player.fishing.buyables[13] = new Decimal(0);

				player.fishing.astroCredits = new Decimal(0);
				player.fishing.fishingRodLevel = 0;
				player.fishing.sackLevel = 0;
				player.fishing.lastCatches = [];
				player.fishing.inventory = {};
				player.fishing.currentCooldown = 0;

				player.fishing.rebirthPoints =
					player.fishing.rebirthPoints.add(addedRebirthPoints);
			},
			style() {
				let style = {
					height: "130px",
					width: "200px",
					"border-radius": "12px",
					border: "4px solid",
					"border-color": "rgba(0, 0, 0, 0.25)",
					"font-size": "15px",
					background: player.fishing.astroCredits.gte(1000) ? "#e13b3b" : "",
				};

				return style;
			},
		},
	},

	bars: {
		fishingProgress: {
			direction: RIGHT,
			height: 30,
			width: 300,
			progress() {
				const rod = FISHING_RODS[player.fishing.fishingRodLevel];
				const totalCooldown = 10 - rod.cooldownReduction;
				if (totalCooldown <= 0) return 1;
				return player.fishing.currentCooldown / totalCooldown;
			},
			display() {
				return player.fishing.currentCooldown <= 0
					? "Cooldown: READY!"
					: `Cooldown: ${format(player.fishing.currentCooldown)}s`;
			},
			fillStyle() {
				return {
					background: "#9213dc",
					"box-shadow": "0px 0px 8px #9213dc",
				};
			},
			baseStyle: {
				"border-radius": "4px",
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

	buyables: {
		11: {
			title: "Astrocredits Boost<br>",
			cost(x) {
				let base = new Decimal(50);
				let mul = new Decimal(1.9);
				let result = base.times(mul.pow(x));
				return result;
			},
			effect(x) {
				let base = new Decimal(1);
				let mul = new Decimal(1.5);
				let effect = base.times(mul.pow(x));
				return effect;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Astrocredits` +
					`<br>Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/inf<br>` +
					`<br>Effect: ${format(buyableEffect(this.layer, this.id))}x Astrocredits`
				);
			},
			canAfford() {
				return player[this.layer].astroCredits.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					player[this.layer].astroCredits = player[this.layer].astroCredits.sub(
						this.cost(),
					);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},

		12: {
			title: "Double Hook<br>",
			cost(x) {
				let base = new Decimal(10);
				let mul = new Decimal(1.25);
				let result = base.times(mul.pow(x));
				return result;
			},
			purchaseLimit: 100,
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Astrocredits` +
					`<br>Bought: ${getBuyableAmount(this.layer, this.id)}/100<br>` +
					`<br>Effect: +${formatWhole(getBuyableAmount(this.layer, this.id))}% Double Hook Chance`
				);
			},
			canAfford() {
				return player[this.layer].astroCredits.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					player[this.layer].astroCredits = player[this.layer].astroCredits.sub(
						this.cost(),
					);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},

		13: {
			title: "Fishing Luck<br>",
			cost(x) {
				let base = new Decimal(100);
				let mul = new Decimal(1.75);
				let result = base.times(mul.pow(x));
				return result;
			},
			display() {
				return (
					`Cost: ${format(
						tmp[this.layer].buyables[this.id].cost,
					)} Astrocredits` +
					`<br>Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/inf<br>` +
					`<br>Effect: +${formatWhole(getBuyableAmount(this.layer, this.id))}% Fishing Luck`
				);
			},
			canAfford() {
				return player[this.layer].astroCredits.gte(this.cost());
			},
			buy() {
				if (this.canAfford()) {
					player[this.layer].astroCredits = player[this.layer].astroCredits.sub(
						this.cost(),
					);
					setBuyableAmount(
						this.layer,
						this.id,
						getBuyableAmount(this.layer, this.id).add(1),
					);
				}
			},
		},
	},

	upgrades: {
		11: {
			title: "R1-1",
			description: "Unlock Gold Fish (3x Sell Value)",
			cost: new Decimal(1),
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			style() {
				return {
					margin: "12px",
				};
			},
		},
		21: {
			title: "R2-1",
			description: "Unlock Shiny Fish (10x Sell Value)",
			cost: new Decimal(10),
			branches: [11],
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			unlocked() {
				return hasUpgrade("fishing", 11);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		31: {
			title: "R3-1",
			description: "Unlock Rainbow Fish (40x Sell Value)",
			cost: new Decimal(100),
			branches: [21],
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			unlocked() {
				return hasUpgrade("fishing", 21);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		41: {
			title: "R3-1",
			description: "Unlock Corrupt Fish (100x Sell Value)",
			cost: new Decimal(1000),
			branches: [31],
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			unlocked() {
				return hasUpgrade("fishing", 31);
			},
			style() {
				return {
					margin: "12px",
				};
			},
		},
		12: {
			title: "R1-2",
			description: "+5% Fishing Luck",
			cost: new Decimal(1),
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			style() {
				return {
					margin: "12px",
				};
			},
		},
		22: {
			title: "R2-2",
			description: "1.5x Astrocredits",
			cost: new Decimal(3),
			branches: [12],
			currencyDisplayName: "Rebirth Points",
			currencyInternalName: "rebirthPoints",
			currencyLayer: "fishing",
			style() {
				return {
					margin: "12px",
				};
			},
		},
	},
});
