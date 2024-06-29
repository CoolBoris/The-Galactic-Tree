let modInfo = {
	name: "The Galactic Tree",
	id: "galactictree11",
	author: "C00LB0R1S",
	pointsName: "Money",
	modFiles: [
		"tree.js", "rocketfuel.js", "rockets.js", "achievements.js", "astronauts.js",
		"space.js", "comets.js", "asteroids.js"
	],
	pointsName: "Money",
	discordName: "COMING SOON",
	discordLink: "https://www.discord.com/comingsoon",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}



// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('cheat', 11)) gain = gain.add(1e20)
	if (hasUpgrade('r', 11)) gain = gain.add(1)
	if (hasUpgrade('r', 12)) gain = gain.times(2)
	if (hasUpgrade('r', 13)) gain = gain.times(upgradeEffect('r', 13))
	if (hasUpgrade('r', 21)) gain = gain.times(2)
	if (hasUpgrade('r', 24)) gain = gain.pow(1.05)
	if (hasUpgrade('r', 25)) gain = gain.times(3)
	if (hasUpgrade('r', 31)) gain = gain.times(5)
	if (hasMilestone('ro', 1)) gain = gain.times(3)
	if (hasUpgrade('r', 33)) gain = gain.times(10)
	if (hasMilestone('ro', 5)) gain = gain.times(3)
	if (hasUpgrade('ro', 12)) gain = gain.times(upgradeEffect('ro', 12))
	if (hasMilestone('ro', 10)) gain = gain.times(2)
	if (hasUpgrade('as', 11)) gain = gain.times(upgradeEffect('as', 11))
	if (hasUpgrade('as', 12)) gain = gain.times(upgradeEffect('as', 12))
	if (hasMilestone('ro', 11)) gain = gain.times(2)
	if (hasUpgrade('as', 23)) gain = gain.times(upgradeEffect('as', 23))
	if (hasMilestone('s', 1)) gain = gain.times(5)
	if (hasUpgrade('s', 41)) gain = gain.times(100)
	return gain

}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"SPACE SIMULATOR 3000",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e999999"))
	
}

let winText = `Congratulations! You have beaten The Galactic Tree!`
// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

// Set your version in num and name
let VERSION = {
	num: "0.Pre2.0",
	name: "Beta Release",
}

let changelog = `<h1 style="color:Aquamarine;">UPDATES</h1><br>
	<br>
		<h4 style="color:gray;">Check out 10+ Themes in the settings tab!</h1><br>

		<h2 style="color:DeepPink;">v0.Pre2.0</h2><br>
		- Comets Layer<br>
		- Asteroids Layer<br>
		- More Space Content<br>
		- ~10 New Upgrades<br>
		- ~8 New Milestones<br>
		- Big Balance Changes<br>
		not finished but had to publish for reasons<br>
		<br>
		<h2 style="color:DeepPink;">v0.1.0 [Beta Release]</h2><br>
		- Space Layer<br>
		- ~20 New Upgrades<br>
		- ~10 New Milestones<br>
		- More Achievements<br>
		- Big Balance Changes<br>
		- Release on galaxy<br>
		biggest update yet!!<br>
		<br>
		<h2 style="color:Violet;">v0.0.14</h2><br>
		- More Astronaut Upgrades <br>
		- More Rocket Fuel Upgrades<br>
		- More Rockets Milestones<br>
		- More Achievements<br>
		new layer next update!!!<br>
		<br>
		<h2 style="color:Violet;">v0.0.13</h2><br>
		- More Astronaut Upgrades <br>
		- ASTRONAUTS ARE FINALLY BALANCED<br>
		<br>
		<h2 style="color:Violet;">v0.0.12</h2><br>
		- 7 NEW THEMES!! <br>
		- More Rockets Milestones<br>
	    ong i dont understand softcaps<br>
		<br>
		<h2 style="color:Violet;">v0.0.11</h2><br>
		- Subtabs <br>
		- More Rockets Milestones<br>
	    - More Achievements<br>
		- ...<br>
		I HATE ASTRONAUTS<br>
		<h2 style="color:Violet;">v0.0.10</h2><br>
		- Astronaut Upgrades <br>
		- Astronaut Milestones<br>
		- More Rocket Milestones<br>
		- Balancing!!!!! (astronauts aren't yet)<br>
		- **SOFTCAPPED**<br>
		- 4 Achievements <br>
		- ...<br>
		4 new versions in 1 day yippee!<br>
		<br>
		<h2 style="color:Violet;">v0.0.9</h2><br>
		- Balanced Astronaut stuff <br>
		- Space Theme<br>
	     Github is so annoying ong<br>
		 <br>
		<h2 style="color:Violet;">v0.0.8 [Alpha Release]</h2><br>
		- Astronaut Upgrades <br>
		- Astronaut Milestones<br>
		- More Rocket Milestones<br>
		- Balancing!!!!! (astronauts aren't yet)<br>
		- **SOFTCAPPED**<br>
		- 4 Achievements <br>
		- ...<br>
		4 new versions in 1 day yippee!<br>
		also test release on github for friends<br>
		<br>
	<h2 style="color:Violet;">v0.0.7</h2><br>
		- Rockets Upgrades <br>
		- More Rocket Milestones<br>
		- More Rocket Fuel Upgrades<br>
		- Balancing!!!!!<br>
		- Astronauts (nothing yet)<br>
		- More achievements<br>
		- ...<br>
		<br>
	<h2 style="color:Violet;">v0.0.6</h2><br>
		- Balanced everything<br>
		- More Achievements<br>
		- Rockets content<br>
		<br>
	<h2 style="color:Violet;">v0.0.5</h2><br>
		- Balanced Rocket Fuel<br>
		- Achievements<br>
		- Rockets (nothing but it works)<br>
		- space theme removed :(<br>
	    finally understandig this stuff<br>
		<br>
	<h2 style="color:Violet;">v0.0.4</h2><br>
		- Balanced Rocket  Fuel<br>
		- NEW LAYERS ARE SO HARD TO MAKE!!!<br>
		<br>
	<h2 style="color:Violet;">v0.0.3</h2><br>
		- Removed Rockets (will be back next update)<br>
		- Added Money<br>
		- Added 6 Rocket Upgrades<br>
		- 1 New Theme<br>
		<br>
	<h2 style="color:Violet;">v0.0.2</h2><br>
		- Added Rockets<br>
		- Added 4 Rocket Upgrades<br>
		<br>
	<h2 style="color:Violet;">v0.0.1 [Early Alpha Release]</h2><br>
		- Added Rocket Fuel
		- basically nothing<br>`
	