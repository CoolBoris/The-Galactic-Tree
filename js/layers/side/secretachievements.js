addLayer("sa", {
	symbol() {
		if (options.emojisEnabled == true) symbol = "🏆";
		else symbol = "A";
		return symbol;
	},

	color: "#2f383b",

	nodeStyle() {
		const style = {
			"border-radius": "100px",
		};

		if (options.emojisEnabled) {
			style.color = "white";
		}

		return style;
	},

	layerShown() {
		let visible = false;
		return visible;
	},

	row: "side",
	position: "1",
	branches: [],

	tooltip() {
		return "";
	},

	achievementPopups() {
		let popup = true;
		if (options.AchievementPopup == true) popup = true;
		else popup = false;
		return popup;
	},

	startData() {
		return {
			unlocked: true,
			points: new Decimal(0),
			totalAchievements: new Decimal(0),
		};
	},

	update(diff) {
		let completedCount = 0;
		let totalAchievements = 0;
		for (let id in this.achievements) {
			totalAchievements++;
			if (hasAchievement("sa", id)) {
				completedCount++;
			}
		}
		player.sa.points = new Decimal(completedCount);
		player.sa.totalAchievements = new Decimal(totalAchievements);
	},

	tabFormat: {
		Achievements: {
			content: [
				[
					"display-text",
					function () {
						return `You have 
                        <h2 style="color: #2f383b; text-shadow: 0px 0px 20px #65777d; font-family: Lucida Console, Courier New, monospace">
                        ${player.sa.points}/${player.sa.totalAchievements}</h2> Achievements`;
					},
				],
				[
					"display-text",
					"Achievements contain spoilers!",
					{ color: "red", "font-size": "18px" },
				],
				"blank",
				"achievements",
				"upgrades",
			],
			buttonStyle() {
				return { "border-color": "#2f383b" };
			},
		},
		Secrets: {
			content: [["infobox", "main"]],
		},
	},

	infoboxes: {
		main: {
			title: "Introducing: Secrets",
			body() {
				return "There are currently 4 Secrets in The Galactic Tree, each give a special role in CoolBoris' Studio. <br>To claim the role you need to send a screenshot of the secret to @coolboris08 or any staff and you will recieve your role.<br>Good luck!<br><br> You'll know that you found a secret if it says: 'Reward: Secret Role'";
			},
		},
	},

	achievements: {
		11: {
			name: "The First one is always free",
			done() {
				return player.sa.points.gte(0);
			},
			tooltip: "✅ Free Achievement",
			goalTooltip: "❌ you can't see me?",
			style: {
				visibility: "shown",
			},
		},
		12: {
			name: "fruity",
			done() {
				if (options.theme == "strawberry") {
					return true;
				}
			},
			tooltip: "✅ Switch the theme",
			goalTooltip: "❌ whatever the title says",
			style: {
				visibility: "shown",
			},
		},
		13: {
			name: "last",
			done() {
				if (options.theme == "dragonfruit") {
					return true;
				}
			},
			tooltip: "✅ Go through all the themes",
			goalTooltip: "❌ actually",
			style: {
				visibility: "shown",
			},
		},
		14: {
			name: "9,882 Inches",
			done() {
				return player.s.points.gte(251);
			},
			tooltip: "✅ 251 Space Distance",
			goalTooltip: "❌ too easy",
			style: {
				visibility: "shown",
			},
		},
		15: {
			name: "Keep clicking!",
			done() {
				return player.sun.points.gte("1e110000");
			},
			tooltip: "✅ 1e110,000 Light",
			goalTooltip: "❌ keep going!",
			style: {
				visibility: "shown",
			},
		},
		16: {
			name: "tap tap tap",
			done() {
				return player.sun.points.gte("1e122300");
			},
			tooltip: "✅ 1e112,300 Light",
			goalTooltip: "❌ even further!!",
			style: {
				visibility: "shown",
			},
		},
		21: {
			name: "R1 Endgame",
			done() {
				return player.points.gte("1e308");
			},
			tooltip: "✅ You beat Reality I congrats!",
			goalTooltip: "❌ Reach 1.79e308 Money",
			style: {
				visibility: "shown",
			},
		},
		22: {
			name: "R1 Mega Endgame",
			done() {
				return player.points.gte("1e315");
			},
			tooltip: "✅ You definitely beat Reality I now..",
			goalTooltip: "❌ 1e315 Money",
			style: {
				visibility: "shown",
			},
		},
		23: {
			name: "Infinite",
			done() {
				return player.infinity.points.gte(1);
			},
			tooltip: "✅ You reached Infinity once",
			goalTooltip: "❌ Infinity",
			style: {
				visibility: "shown",
			},
		},
		24: {
			name: "Mega Infinite",
			done() {
				return player.infinity.points.gte(10);
			},
			tooltip: "✅ You reached 10 Infinities",
			goalTooltip: "❌ even more?",
			style: {
				visibility: "shown",
			},
		},
		25: {
			name: "Omega Infinite",
			done() {
				return player.infinity.points.gte(100);
			},
			tooltip:
				"✅ Congratulations, Few have reached this milestone, but your journey is far from over. The path you've chosen is only the beginning. What lies beyond is known only to those who dare to seek it. The game is never truly over.",
			goalTooltip: "❌ 10% Complete Reality I",
			style: {
				visibility: "shown",
			},
		},
		26: {
			name: "blobs",
			done() {
				return player.blob.points.gte(10);
			},
			tooltip: "✅ 10 Blobs<br>Reward: Secret Role",
			goalTooltip: "❌ blob blob",
			style: {
				visibility: "shown",
			},
		},
		31: {
			name: "addiction",
			done() {
				if (player.timePlayed > 3600) {
					return true;
				}
			},
			tooltip: "✅ 1 hour playtime",
			goalTooltip: "❌ addicted",
			style: {
				visibility: "shown",
			},
		},
		32: {
			name: "small grind",
			done() {
				if (player.timePlayed > 14400) {
					return true;
				}
			},
			tooltip: "✅ 4 hours playtime",
			goalTooltip: "❌ wow",
			style: {
				visibility: "shown",
			},
		},
		33: {
			name: "big grind",
			done() {
				if (player.timePlayed > 43200) {
					return true;
				}
			},
			tooltip: "✅ 12 hours playtime",
			goalTooltip: "❌ WOW<br>",
			style: {
				visibility: "shown",
			},
		},
		34: {
			name: "day and night",
			done() {
				if (player.timePlayed > 86400) {
					return true;
				}
			},
			tooltip: "✅ 24 hours playtime",
			goalTooltip: "❌ insane<br>",
			style: {
				visibility: "shown",
			},
		},
		35: {
			name: "days and days",
			done() {
				if (player.timePlayed > 172800) {
					return true;
				}
			},
			tooltip: "✅ 48 hours playtime",
			goalTooltip: "❌ crazy work<br>",
			style: {
				visibility: "shown",
			},
		},
		36: {
			name: "no-life",
			done() {
				if (player.timePlayed > 360000) {
					return true;
				}
			},
			tooltip: "✅ 100 hours playtime",
			goalTooltip: "❌ impossible<br>",
			style: {
				visibility: "shown",
			},
		},
		41: {
			name: "dangerous",
			done() {
				if (options.autosave == false) {
					return true;
				}
			},
			tooltip: "✅ disable autosave",
			goalTooltip: "❌ risky",
			style: {
				visibility: "shown",
			},
		},
		42: {
			name: "you didn't even notice",
			done() {
				if (
					options.RocketMilestonePopup == false &&
					options.AstronautMilestonePopup == false &&
					options.SpaceMilestonePopup == false &&
					options.ComAstMilestonePopup == false &&
					options.AchievementPopup == false
				) {
					return true;
				}
			},
			tooltip: "✅ disable all popups",
			goalTooltip: "❌ not visible",
			style: {
				visibility: "shown",
			},
		},
		43: {
			name: "100b dus",
			done() {
				return player.stardust.points.gte(1e11);
			},
			tooltip: "✅ 1e11 Stardust",
			goalTooltip: "❌ letters gone",
			style: {
				visibility: "shown",
			},
		},
		44: {
			name: "why?",
			done() {
				return player.jupiter.points.gte(250);
			},
			tooltip: "✅ 250 Hydrogen",
			goalTooltip: "❌ 250 H2",
			style: {
				visibility: "shown",
			},
		},
		45: {
			name: "R2 Endgame",
			done() {
				return hasMilestone("unstablefuel", 23);
			},
			tooltip: "✅ You beat Reality II congrats!<br>Reward: Infinity",
			goalTooltip: "❌ Reach Endgame (changes every update)",
			style: {
				visibility: "shown",
			},
		},
		46: {
			name: "R2 Mega Endgame",
			done() {
				return player.darkmatter.points.gte(1e65);
			},
			tooltip: "✅ You definitely beat Reality II now..",
			goalTooltip: "❌ 1e20 Darkmatter (changes every update)",
			style: {
				visibility: "shown",
			},
		},
		51: {
			name: "- Infinite",
			done() {
				return player.negativeinf.points.gte(1);
			},
			tooltip: "✅ You reached Negative Infinity once",
			goalTooltip: "❌ Negative Infinity",
			style: {
				visibility: "shown",
			},
		},
		52: {
			name: "no-life deluxe",
			done() {
				if (player.timePlayed > 900000) {
					return true;
				}
			},
			tooltip: "✅ 250 hours playtime",
			goalTooltip: "❌ impossible but more<br>",
			style: {
				visibility: "shown",
			},
		},
		54: {
			name: "Omega Infinite",
			done() {
				return player.infinity.points.gte(1000);
			},
			tooltip: "✅ since the infinity rework, this is really the end",
			goalTooltip: "❌ 100% Complete Reality I",
			style: {
				visibility: "shown",
			},
		},
	},
});
