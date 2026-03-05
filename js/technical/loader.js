// Load files

for (file in modInfo.modFiles) {
	let script = document.createElement("script");
	script.setAttribute("src", "js/" + modInfo.modFiles[file]);
	script.setAttribute("async", "false");
	document.head.insertBefore(script, document.getElementById("temp"));
}

console.log(
	"[TGT] >>> Ah, greetings, traveler. I am the Console, keeper of the game's inner workings. Now, tell me, what brings you here? Oh, I see… you're here to cheat. Hmm, an interesting choice. Well, who am I to judge? I'll grant you the power to bend the rules. But remember, with every shortcut, you risk stealing away the joy of discovering aspects in the game itself. Unless, of course, you find the journey a bit too slow. In that case… perhaps a little cheating is warranted. The choice is yours. Just remember: power comes with responsibility, and only you can decide how to wield it."
);
console.log(
	"[TGT] >>> Ah, during my journey, I came across something extraordinary... I believe this belongs to you. Here, take it."
);
console.log("[TGT] >>> Reward: Secret Role");
