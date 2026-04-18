addLayer("stats", {
	startData() {
		return {
			unlocked: true,
		};
	},

	statusFishing() {
		const total = player.fishing?.totalFishes ?? new Decimal(0);

		if (total.gte(10000))
			return ["🌌", "A cosmic legend. The fish fear your name."];
		if (total.gte(5000))
			return ["👑", "Master of the void. Nothing escapes your hook."];
		if (total.gte(2500))
			return ["🔱", "Space fishing royalty. Truly impressive."];
		if (total.gte(1000))
			return ["🚀", "A thousand catches. You were born for this."];
		if (total.gte(500))
			return ["🎣", "500 fish in. The cosmos is your fishing pond."];
		if (total.gte(250))
			return ["⭐", "Quarter thousand! You're getting the hang of this."];
		if (total.gte(100))
			return ["🐠", "100 fish caught. A seasoned space angler."];
		if (total.gte(50))
			return ["🌙", "50 catches. The void is starting to know you."];
		if (total.gte(25)) return ["🪐", "25 fish! Finding your rhythm."];
		if (total.gte(10)) return ["🐟", "10 fish caught. Just getting started."];
		if (total.gte(1)) return ["🎣", "First catch! The journey begins."];
		return ["🪣", "No fish yet. The void awaits."];
	},

	statusMisc() {
		const t = player.timePlayed;

		if (t > 86400 * 30) return ["🧓", "A month in. True dedication."];
		if (t > 86400 * 7) return ["💀", "A whole week. Are you okay?"];
		if (t > 86400 * 3)
			return ["🛋️", "Three days. You've forgotten what outside looks like."];
		if (t > 86400)
			return ["😴", "Over 24 hours played. The universe is proud of you."];
		if (t > 3600 * 12) return ["🌙", "Half a day in. Did you sleep?"];
		if (t > 3600 * 6) return ["☕", "6 hours in. Crazy work!"];
		if (t > 3600 * 3) return ["🎮", "3 hours deep. No turning back now."];
		if (t > 3600) return ["🕐", "Over an hour. Just getting warmed up."];
		if (t > 600) return ["👀", "10 minutes in. You're hooked, aren't you."];
		if (t > 120) return ["🌱", "A couple minutes in. The journey begins."];
		if (t > 30) return ["🐣", "Just hatched. Welcome!"];
		return ["👶", "Freshly started. Hello world!"];
	},

	countUpgrades() {
		const layers = [
			"r",
			"ro",
			"as",
			"s",
			"c",
			"as",
			"stars",
			"planets",
			"x",
			"infinity",
			"unstablefuel",
			"galaxy",
			"darkmatter",
			"supernova",
			"blackhole",
			"universe",
		];
		let total = new Decimal(0);
		for (const l of layers) {
			const upgrades = player[l]?.upgrades;
			if (upgrades)
				total = total.add(upgrades.length ?? Object.keys(upgrades).length);
		}
		return total;
	},

	countMilestones() {
		const layers = [
			"r",
			"ro",
			"as",
			"s",
			"c",
			"as",
			"stars",
			"planets",
			"x",
			"infinity",
			"unstablefuel",
			"galaxy",
			"darkmatter",
			"supernova",
			"blackhole",
			"universe",
		];
		let total = new Decimal(0);
		for (const l of layers) {
			const ms = player[l]?.milestones;
			if (ms) total = total.add(ms.length ?? Object.keys(ms).length);
		}
		return total;
	},

	statusR1() {
		const r = player.r?.points ?? new Decimal(0);
		const ro = player.ro?.points ?? new Decimal(0);
		const a = player.as?.points ?? new Decimal(0);
		const s = player.s?.points ?? new Decimal(0);
		const c = player.c?.points ?? new Decimal(0);
		const as_ = player.as?.points ?? new Decimal(0);
		const st = player.stars?.points ?? new Decimal(0);
		const pl = player.planets?.points ?? new Decimal(0);
		const x = player.x?.points ?? new Decimal(0);
		const inf = player.infinity?.points ?? new Decimal(0);

		if (inf.gt(0)) return ["♾️", "Infinity. You completed Reality I!"];
		if (x.gt(0)) return ["✖️", "X layer unlocked. Things are getting weird."];
		if (pl.gt(0)) return ["🪐", "Planet builder. A god in the making."];
		if (st.gt(0)) return ["⭐", "Stars in your pocket. Literally."];
		if (c.gt(0) || as_.gt(0)) return ["☄️", "Creating Space Rocks."];
		if (s.gt(0))
			return ["🌌", "You reached space. Congrats, you're an astronomer now."];
		if (a.gt(0))
			return ["👨‍🚀", "Astronauts hired. They're already complaining."];
		if (ro.gt(0))
			return ["🚀", "First rocket created! The sky is not the limit."];
		if (r.gt(0)) return ["⛽", "The beginning of everything!"];
		return ["👶", "Just getting started."];
	},

	statusR2() {
		const uf = player.unstablefuel?.points ?? new Decimal(0);
		const g = player.galaxy?.points ?? new Decimal(0);
		const dm = player.darkmatter?.points ?? new Decimal(0);
		const sn = player.supernova?.points ?? new Decimal(0);
		const bh = player.blackhole?.points ?? new Decimal(0);
		const u = player.universe?.points ?? new Decimal(0);
		const ni = player.negativeinfinity?.points ?? new Decimal(0);

		if (ni.gt(0))
			return ["-♾️", "Negative infinity. You completed Reality II!"];
		if (u.gte(1)) return ["🌀", "You just created a Universe. Nothing much."];
		if (bh.gt(0))
			return ["🕳️", "A black hole. You made a black hole. Totally normal."];
		if (sn.gte(1)) return ["🌟", "You blew up a star."];
		if (dm.gt(0)) return ["⚫", "Dark Matter detected."];
		if (g.gt(0)) return ["🌌", "A whole Galaxy? Casual."];
		if (uf.gt(0)) return ["⛽", "Unstable Rocket Fuel. What could go wrong?"];
		return ["😴", "Reality 2 not yet reached."];
	},

	tabFormat: [
		[
			"display-text",
			function () {
				const [icon, msg] = layers.stats.statusR1();
				return `
        <div style="background:linear-gradient(135deg,#0d1b2a,#1b2a3b);border:1px solid #4fc3f7;border-radius:12px;padding:14px 20px;margin-bottom:8px;text-align:center;">
            <div style="font-size:13px;color:#4fc3f7;letter-spacing:2px;margin-bottom:4px">REALITY 1 - LAUNCH</div>
            <div style="font-size:36px;margin-bottom:4px">${icon}</div>
            <div style="font-size:15px;color:#ccc;font-style:italic">"${msg}"</div>
        </div>`;
			},
		],
		"blank",
		[
			"display-text",
			function () {
				const pts = inChallenge("real", 11) ? new Decimal(0) : player.points;
				return `💰 Money: <b>${formatWhole(pts)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.r?.unlocked) return "";
				return `⛽ Rocket Fuel: <b>${formatWhole(player.r?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.ro?.unlocked) return "";
				return `🚀 Rockets: <b>${formatWhole(player.ro?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.as.unlocked) return "";
				return `👨‍🚀 Astronauts: <b>${formatWhole(player.as?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.s?.unlocked) return "";
				return `🌌 Space Distance: <b>${formatWhole(player.s?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.c?.unlocked) return "";
				return `☄️ Comets: <b>${formatWhole(player.c?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.as?.unlocked) return "";
				return `☄️ Asteroids: <b>${formatWhole(player.as?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.stars?.unlocked) return "";
				return `⭐ Stars: <b>${formatWhole(player.stars?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.stars?.unlocked) return "";
				return `⭐ Stardust: <b>${formatWhole(player.stardust?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.planets?.unlocked) return "";
				return `🪐 Planets: <b>${formatWhole(player.planets?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.planets?.unlocked) return "";
				return `🪐 Planetoids: <b>${formatWhole(player.planetoid?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.x?.unlocked) return "";
				return `✖️ X: <b>${formatWhole(player.x?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.x?.unlocked) return "";
				return `✖️ XPO: <b>${formatWhole(player.xpo?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.x?.unlocked) return "";
				return `✖️ XGE: <b>${formatWhole(player.xge?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.x?.unlocked) return "";
				return `✖️ XLA: <b>${formatWhole(player.xla?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.infinity.unlocked) return "";
				return `♾️ Infinities: <b>${formatWhole(player.infinity?.points ?? 0)}</b>`;
			},
		],
		"blank",
		"blank",
		[
			"display-text",
			function () {
				const [icon, msg] = layers.stats.statusR2();
				return `
        <div style="background:linear-gradient(135deg,#1a0d2e,#2a1b3b);border:1px solid #ce93d8;border-radius:12px;padding:14px 20px;margin-bottom:12px;text-align:center;">
            <div style="font-size:13px;color:#ce93d8;letter-spacing:2px;margin-bottom:4px">REALITY 2 - ABYSS</div>
            <div style="font-size:36px;margin-bottom:4px">${icon}</div>
            <div style="font-size:15px;color:#ccc;font-style:italic">"${msg}"</div>
        </div>`;
			},
		],
		"blank",
		[
			"display-text",
			function () {
				if (!inChallenge("real", 11)) return "";
				const pts = inChallenge("real", 11) ? player.points : new Decimal(0);
				return `💰 Money: <b>${formatWhole(pts)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.unstablefuel?.unlocked) return "";
				return `⛽ Unstable Rocket Fuel: <b>${formatWhole(player.unstablefuel?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.galaxy?.unlocked) return "";
				return `🌌 Galaxies: <b>${formatWhole(player.galaxy?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.darkmatter?.unlocked) return "";
				return `⚫ Dark Matter: <b>${formatWhole(player.darkmatter?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.supernova?.unlocked) return "";
				return `🌟 Supernova Tier: <b>${formatWhole(player.supernova?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!hasMilestone("supernova", 2)) return "";
				return `🌟 Energy: <b>${formatWhole(player.energy?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!hasMilestone("supernova", 5)) return "";
				return `🌟 Dark Energy: <b>${formatWhole(player.darkenergy?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.blackhole?.unlocked) return "";
				return `🕳️ Void: <b>${formatWhole(player.blackhole?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.universe?.unlocked) return "";
				return `🌀 Universes: <b>${formatWhole(player.universe?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.universe?.unlocked) return "";
				return `🌀 Plasma: <b>${formatWhole(player.universe?.plasma ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.universe?.unlocked) return "";
				return `🌀 Antimatter: <b>${formatWhole(player.universe?.antimatter ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.negativeinfinity?.unlocked) return "";
				return `-♾️ Negative Infinities: <b>${formatWhole(player.negativeinfinity?.points ?? 0)}</b>`;
			},
		],
		"blank",
		"blank",
		[
			"display-text",
			function () {
				const [icon, msg] = layers.stats.statusMisc();
				return `
        <div style="background:linear-gradient(135deg,#1a1a0d,#2b2b1a);border:1px solid #ffd700;border-radius:12px;padding:14px 20px;margin:8px 0;text-align:center;">
            <div style="font-size:13px;color:#ffd700;letter-spacing:2px;margin-bottom:4px">MISC</div>
            <div style="font-size:36px;margin-bottom:4px">${icon}</div>
            <div style="font-size:15px;color:#ccc;font-style:italic">"${msg}"</div>
        </div>`;
			},
		],
		"blank",
		[
			"display-text",
			function () {
				return `⏱️ Time Played: <b>${formatTime(player.timePlayed)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				return `🏆 Achievements: <b>${formatWhole(player.a?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				return `🔒 Secret Achievements: <b>${formatWhole(player.sa?.points ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				return `⬆️ Upgrades Owned: <b>${formatWhole(layers.stats.countUpgrades())}</b>`;
			},
		],
		[
			"display-text",
			function () {
				return `🎯 Milestones Reached: <b>${formatWhole(layers.stats.countMilestones())}</b>`;
			},
		],
		"blank",
		"blank",
		"blank",
		[
			"display-text",
			function () {
				const [icon, msg] = layers.stats.statusFishing();
				return `
        <div style="background:linear-gradient(135deg,#0d0a1a,#1a0d2e);border:1px solid #9213dc;border-radius:12px;padding:14px 20px;margin-bottom:12px;text-align:center;">
            <div style="font-size:13px;color:#9213dc;letter-spacing:2px;margin-bottom:4px">SPACE FISHING</div>
            <div style="font-size:36px;margin-bottom:4px">${icon}</div>
            <div style="font-size:15px;color:#ccc;font-style:italic">"${msg}"</div>
        </div>`;
			},
		],
		"blank",
		[
			"display-text",
			function () {
				if (!player.fishing?.unlocked) return "";
				return `🎣 Total Fish Caught: <b>${formatWhole(player.fishing?.totalFishes ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (!player.fishing?.unlocked) return "";
				return `📖 Fish Discovered: <b>${formatWhole(player.fishing?.fishesDiscovered ?? 0)}/${FISHING_FISHES.length}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (player.fishing.totalAstroCredits.lt(1)) return "";
				return `💰 Total Astrocredits: <b>${formatWhole(player.fishing?.totalAstroCredits ?? 0)}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (player.fishing.totalFishes.lt(1)) return "";
				const rod = FISHING_RODS[player.fishing?.fishingRodLevel ?? 0];
				return `🎣 Fishing Rod: <b style="color: ${rod.color}">${rod.name}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (player.fishing.totalFishes.lt(1)) return "";
				const sack = SACKS[player.fishing?.sackLevel ?? 0];
				return `🎒 Sack: <b style="color: ${sack.color}">${sack.name}</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (getBuyableAmount("fishing", 12).eq(0)) return "";
				const doubleHook = getBuyableAmount("fishing", 12).toNumber();
				return `🪝 Double Hook Chance: <b style="color: #00ffff">${doubleHook}%</b>`;
			},
		],
		[
			"display-text",
			function () {
				if (getBuyableAmount("fishing", 13).eq(0)) return "";
				const luck = getBuyableAmount("fishing", 13).toNumber();
				return `🍀 Fishing Luck: <b style="color: #74e36a">${luck}%</b>`;
			},
		],
		"blank",
	],
});
