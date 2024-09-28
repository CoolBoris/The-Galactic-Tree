// Load files

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

console.log("what are you doing here? you filthy hacker!");
console.log("Reward: Secret Role)");
console.log("don't cheat you lazy person!");
