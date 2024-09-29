let modInfo = {
	name: "The Galactic Tree",
	id: "galactictree11",
	author: "CoolBoris",
	pointsName: "Money",
	modFiles: [

		"tree.js", "rocketfuel.js", "rockets.js", "side.js", "astronauts.js",
		"space.js", "comets.js", "asteroids.js", "stars.js", "planets.js",
		"clickergame.js", "x.js",
		"infinity.js", "megainfinity.js", "omegainfinity.js"
	],
	pointsName: "Money",
	discordName: "CoolBoris' Server",
	discordLink: "https://discord.gg/tRDV4qUf",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0.0000001,  // In hours
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
	if (hasUpgrade('ro', 15)) gain = gain.times(upgradeEffect('ro', 15))
	if (hasMilestone('ro', 10)) gain = gain.times(2)
	if (hasMilestone('ro', 11)) gain = gain.times(2)
	if (hasMilestone('s', 1)) gain = gain.times(3)
	if (hasUpgrade('s', 43)) gain = gain.times(100)
	if (hasUpgrade('as', 11)) gain = gain.times(5)
	if (hasUpgrade('as', 12)) gain = gain.times(10)
	if (hasUpgrade('as', 21)) gain = gain.times(upgradeEffect('as', 21))
	if (hasUpgrade('as', 25)) gain = gain.times(100)
	if (hasUpgrade('s', 51)) gain = gain.times(500)
	if (hasUpgrade('ast', 21)) gain = gain.times(upgradeEffect('ast', 21))
	if (hasUpgrade('c', 21)) gain = gain.times(1000)
	if (hasUpgrade('ast', 22)) gain = gain.times(1000)
	if (hasUpgrade('c', 23)) gain = gain.times(upgradeEffect('c', 23))
	if (hasUpgrade('ast', 25)) gain = gain.times(100)
	if (hasUpgrade('c', 25)) gain = gain.times(100)
	if (hasUpgrade('stars', 11)) gain = gain.times(upgradeEffect('stars', 11))
	if (hasUpgrade('planets', 11)) gain = gain.times(upgradeEffect('planets', 11))
	if (hasUpgrade('r', 51)) gain = gain.times(1e9)
	if (hasUpgrade('x', 21)) gain = gain.times(upgradeEffect('x', 21))
	if (hasUpgrade('ro', 22)) gain = gain.times(upgradeEffect('ro', 22))
	if (hasUpgrade('ro', 23)) gain = gain.times(upgradeEffect('ro', 23))
	if (hasMilestone('ro', 21)) gain = gain.times(1e20)
	

	// Inf
	if (hasMilestone('inf', 1)) gain = gain.times(3)
	if (hasMilestone('megainf', 1)) gain = gain.times(5)
	if (hasMilestone('megainf', 7)) gain = gain.times(5)

	// Challenges
	if (inChallenge('c', 11)) gain = gain.pow(0.5)
	if (inChallenge('c', 14)) gain = gain.pow(0.12)
	if (inChallenge('ast', 11)) gain = gain.pow(0.25)
	if (inChallenge('ast', 14)) gain = gain.pow(0.108)
	return gain

}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Endgame: 1e350 Money",
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e350"))
	
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
	num: "1.0.1",
	name: "Outer Space",
}

let changelog = `<h1 style="color:Aquamarine;">UPDATES</h1><br>
	<br>
		<h4 style="color:gray;">Check out 10+ Themes in the settings tab!</h1><br>

		<h2 style="color:Violet;">v1.0.1</h2><br>
		- Bug Fixes<br>
		<br>
		<h2 style="color:#ff3200;">v1.0 [Release]</h2><br>
		- Chapter 2<br>
		- Stars<br>
		- Planets<br>
		- The Sun<br>
		- The Solar System<br>
		- X<br>
		- Infoboxes<br>
		- Infinity Rework<br>
		- More Space Content<br>
		- More Achievements<br>
		- More Secret Achievements<br>
		- Renamed 50% of the game<br>
		- Rebalanced earlygame<br>
		- Secrets..<br>
		<br>
		<h2 style="color:Violet;">v0.2.3</h2><br>
		- Omega Infinity <br>
		- New Comets & Asteroids Content<br>
		- More Achievements<br>
		- More Secret Achievements<br>
		- Small themes rework<br>
		<br>
		<h2 style="color:Violet;">v0.2.2</h2><br>
		- Infinity <br>
		<br>
		<h2 style="color:Violet;">v0.2.1</h2><br>
		- Asteroids & Comets Balancing<br>
		- More Achievements<br>
		- Endgame changes<br>
		- minor bug fixes<br>
		<br>
		<h2 style="color:DeepPink;">v0.2.0 </h2><br>
		- Secret Achievements<br>
		- Savebank<br>
		- Softcaps<br>
		- More Comets & Asteroids content<br>
		- Achievements rework<br>
		- BIG Balance Changes<br>
		- QOL<br>
		- crazy amount of bug fixes<br>
		- Full Astronauts Rework<br>
		- 1 new theme<br>
		- Space Rework<br>
		<br>
		<h2 style="color:Violet;">v0.1.1</h2><br>
		- Comets Layer<br>
		- Asteroids Layer<br>
		- More Space Content<br>
		- Big Balance Changes<br>
		<br>
		<h2 style="color:DeepPink;">v0.1.0 [Beta Release]</h2><br>
		- Space Layer<br>
		- ~20 New Upgrades<br>
		- ~10 New Milestones<br>
		- More Achievements<br>
		- Big Balance Changes<br>
		<br>
		<h2 style="color:Violet;">v0.0.14</h2><br>
		- More Astronaut Upgrades <br>
		- More Rocket Fuel Upgrades<br>
		- More Rockets Milestones<br>
		- More Achievements<br>
		<br>
		<h2 style="color:Violet;">v0.0.13</h2><br>
		- More Astronaut Upgrades <br>
		- ASTRONAUTS ARE FINALLY BALANCED<br>
		<br>
		<h2 style="color:Violet;">v0.0.12</h2><br>
		- 7 NEW THEMES!! <br>
		- More Rockets Milestones<br>
		<br>
		<h2 style="color:Violet;">v0.0.11</h2><br>
		- Subtabs <br>
		- More Rockets Milestones<br>
	    - More Achievements<br>
		<br>
		<h2 style="color:Violet;">v0.0.10</h2><br>
		- Astronaut Upgrades <br>
		- Astronaut Milestones<br>
		- More Rocket Milestones<br>
		- Some balancing<br>
		- Reward: Secret role<br>
		- Softcaps<br>
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
	