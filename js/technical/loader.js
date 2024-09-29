// Load files

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

console.log("dont listen to whatever galaxy says");
console.log("cheating is not fun and is bad!");
console.log("don't cheat you lazy person!");
console.log("thanks for reading me, enjoy this:")
console.log("Reward: Secret Role)");
