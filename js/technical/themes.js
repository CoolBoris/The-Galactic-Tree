// ************ Themes ************
var themes = [
	"space",
	"strawberry",
	"cherry",
	"orange",
	"banana",
	"kiwi",
	"blueberry",
	"grape",
	"prune",
	"dragonfruit",
];

var colors = {
	default: {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#dfdfdf",
		points: "#9900ac",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	blackberry: {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#dfdfdf",
		points: "#9900ac",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	prune: {
		1: "#8624c7",
		2: "#8624c7",
		3: "#8624c7",
		color: "#ffffff",
		points: "#9211E7",
		locked: "#c4a7b3",
		background: "#361054",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#4A1A6B80",
	},
	blueberry: {
		1: "#1e52e0",
		2: "#1e52e0",
		3: "#1e52e0",
		color: "#ffffff",
		points: "#1A55E6",
		locked: "#c4a7b3",
		background: "#004080",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#1A3A8F80",
	},
	cherry: {
		1: "#c72525",
		2: "#8F1A1A",
		3: "#8F1A1A",
		color: "#ffffff",
		points: "#E61A1A",
		locked: "#c4a7b3",
		background: "#870000",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#8F1A1A80",
	},
	strawberry: {
		1: "#e71313",
		2: "#e71313",
		3: "#e71313",
		color: "#ffffff",
		points: "#FF3737",
		locked: "#c4a7b3",
		background: "#a91c1c",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#A7181880",
	},
	kiwi: {
		1: "#1ad51a",
		2: "#1ad51a",
		3: "#1ad51a",
		color: "#ffffff",
		points: "#26E61A",
		locked: "#c4a7b3",
		background: "#005f0b",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#1A6B1A80",
	},
	banana: {
		1: "#dbcb14",
		2: "#dbcb14",
		3: "#dbcb14",
		color: "#ffffff",
		points: "#FFE61A",
		locked: "#c4a7b3",
		background: "#c0b410",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#A79A1880",
	},
	orange: {
		1: "#de6b13",
		2: "#de6b13",
		3: "#de6b13",
		color: "#ffffff",
		points: "#FF8C1A",
		locked: "#c4a7b3",
		background: "#bf6600",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#A7551880",
	},
	grape: {
		1: "#841ed7",
		2: "#841ed7",
		3: "#841ed7",
		color: "#ffffff",
		points: "#9E1AE6",
		locked: "#c4a7b3",
		background: "#5A0062",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#5A1A8F80",
	},
	dragonfruit: {
		1: "#F78FC4",
		2: "#F78FC4",
		3: "#F78FC4",
		color: "#ffffff",
		points: "#ff0090",
		locked: "#c4a7b3",
		background: "#af239d",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		tint: "#8F1A5A80",
	},
	space: {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#dfdfdf",
		points: "#9900ac",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #0f0f0f, #1b072a, #0e0019)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	infinity: {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#ff0015",
		points: "#ff31f3",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #23a6d5, #5fc5ed, #91e4ff)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	"mega infinity": {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#00afff",
		points: "#005dff",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #00d914, #33e643, #66f16f)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
	"omega infinity": {
		1: "#ffffff", //Branch color 1
		2: "#bfbfbf", //Branch color 2
		3: "#7f7f7f", //Branch color 3
		color: "#FF5100",
		points: "#ffab31",
		locked: "#bf8f8f",
		background: "linear-gradient(45deg, #e30083, #ff4da6, #ff87c4)",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		tint: "#ffffff00",
	},
};
function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty("--background", colors_theme["background"]);
	document.body.style.setProperty(
		"--background_tooltip",
		colors_theme["background_tooltip"]
	);
	document.body.style.setProperty("--color", colors_theme["color"]);
	document.body.style.setProperty("--points", colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
	document.body.style.setProperty("--tint", colors_theme["tint"]);
}
function getThemeName() {
	return options.theme ? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme);
	if (options.theme === null || index >= themes.length - 1 || index < 0) {
		options.theme = themes[0];
	} else {
		index++;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
