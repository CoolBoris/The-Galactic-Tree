// ************ Themes ************
var themes = ["default", "space", "strawberry", "cherry", "orange", "banana", "kiwi", "blueberry", "grape"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	space: {
		1: "#C66EFF",
		2: "#915D9C",
		3: "#6C4A70",
		color: "#C66EFF",
		points: "#CFAEFF",
		locked: "#BB9CB3",
		background: "#24003F",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	blueberry: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#0080ff80",
	},
	cherry: {
		1: "#f5c1c1",
		2: "#f5c1c1",
		3: "#f5c1c1",
		color: "#ffbfbf",
		points: "#ffdfdf",
		locked: "#c4a7b3",
		background: "#3f0000",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff757580",
	},
	strawberry: {
		1: "#ffffff",
		2: "#ffffff",
		3: "#ffffff",
		color: "#ff8a8a",
		points: "#ffdfdf",
		locked: "#c4a7b3",
		background: "#7d0000",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff000080",
	},
	kiwi: {
		1: "#ccffce",
		2: "#ccffce",
		3: "#ccffce",
		color: "#bbfabe",
		points: "#ffdfdf",
		locked: "#c4a7b3",
		background: "#002905",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#65ff5780",
	},
	banana: {
		1: "#fffdcc",
		2: "#fffdcc",
		3: "#fffdcc",
		color: "#faf9bb",
		points: "#fffadf",
		locked: "#c4a7b3",
		background: "#817C00",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#fffa7880",
	},
	orange: {
		1: "#ffe9cc",
		2: "#ffe9cc",
		3: "#ffe9cc",
		color: "#fadcbb",
		points: "#fff1df",
		locked: "#c4a7b3",
		background: "#633300",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ffb57880",
	},
	grape: {
		1: "#ffccff",
		2: "#ffccff",
		3: "#ffccff",
		color: "#fabbf6",
		points: "#ffdffe",
		locked: "#c4a7b3",
		background: "#270029",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff78ef80",
	},
}
function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
	document.body.style.setProperty("--tint", colors_theme["tint"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}