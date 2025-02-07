// ************ Themes ************
var themes = ["space", "strawberry", "cherry", "orange", "banana", "kiwi", "blueberry", "grape", "prune", "dragonfruit"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#44004d",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	blackberry: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#44004d",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	prune: {
		1: "#C66EFF",
		2: "#C66EFF",
		3: "#C66EFF",
		color: "#C66EFF",
		points: "#9211E7",
		locked: "#BB9CB3",
		background: "linear-gradient(45deg, #24003F, #361054, #15156b)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	blueberry: {
		1: "#bfdfff",
		2: "#bfdfff",
		3: "#bfdfff",
		color: "#bfdfff",
		points: "#1A55E6",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #001f3f, #004080, #0074d9)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#0080ff80",
	},
	cherry: {
		1: "#f5c1c1",
		2: "#f5c1c1",
		3: "#f5c1c1",
		color: "#f5c1c1",
		points: "#A0150F",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #3f0000, #b30000, #ff6666)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff757580",
	},
	strawberry: {
		1: "#A71818",
		2: "#A71818",
		3: "#A71818",
		color: "#A71818",
		points: "#FF008F",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #FF3737, #FF6969, #FF9B9B)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff000080",
	},
	kiwi: {
		1: "#ccffce",
		2: "#ccffce",
		3: "#ccffce",
		color: "#ccffce",
		points: "#26E61A",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #002905, #005f0b, #00a819)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#65ff5780",
	},
	banana: {
		1: "#A7A518",
		2: "#A7A518",
		3: "#A7A518",
		color: "#A7A518",
		points: "#FFB900",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #F0E55B, #FFE066, #FFEA99)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#fffa7880",
	},
	orange: {
		1: "#A75518",
		2: "#A75518",
		3: "#A75518",
		color: "#A75518",
		points: "#FF4600",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #E0841C, #FF9F3F, #FFC266)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ffb57880",
	},
	grape: {
		1: "#ffccff",
		2: "#ffccff",
		3: "#ffccff",
		color: "#ffccff",
		points: "#841CE0",
		locked: "#c4a7b3",
		background: "linear-gradient(45deg, #270029, #5A0062, #8C0093)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff78ef80",
	},
	dragonfruit: {
		1: "#901755",
		2: "#901755",
		3: "#901755",
		color: "#901755",
		points: "#DF0A78",
		locked: "#6F4F6D",
		background: "linear-gradient(45deg, #F78FC4, #FFA0D4, #FFB3E4)",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#ff78ef80",
	},
	space: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#44004d",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	infinity: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#e73c7e",
		points: "#ff31f3",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #23a6d5, #5fc5ed, #91e4ff)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	"mega infinity": {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#00afff",
		points: "#005dff",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #00d914, #33e643, #66f16f)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	"omega infinity": {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#FF5100",
		points: "#ffab31",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #e30083, #ff4da6, #ff87c4)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
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