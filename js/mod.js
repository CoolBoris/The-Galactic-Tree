let modInfo = {
	name: "The Galactic Tree",
	id: "galactictree11",
	author: "CoolBoris",
	pointsName: "Money",
	modFiles: [

		"tree.js", "rocketfuel.js", "rockets.js", "side.js", "astronauts.js",
		"space.js", "comets.js", "asteroids.js", "stars.js", "planets.js",
		"clickergame.js", "x.js",
		"infinity.js", "megainfinity.js", "omegainfinity.js",
		"unstablerocketfuel.js", "galaxy.js", "darkmatter.js", "supernova.js"
	],
	pointsName: "Money",
	discordName: "CoolBoris Studio",
	discordLink: "https://discord.gg/Rs5cKF75WB",
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

function music(){
["raw-html", options.musicToggle ? "<audio controls autoplay loop hidden><source src=music/chapter2.mp3 type<=audio/mp3>loop=true hidden=false autostart=true</audio>" : ""]

}


// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)

	// Reality I
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
	if (hasMilestone('s', 1)  && ! inChallenge("x", 11)) gain = gain.times(3)
	if (hasUpgrade('s', 43)  && ! inChallenge("x", 11)) gain = gain.times(100)
	if (hasUpgrade('as', 11)) gain = gain.times(5)
	if (hasUpgrade('as', 12)) gain = gain.times(10)
	if (hasUpgrade('as', 21)) gain = gain.times(upgradeEffect('as', 21))
	if (hasUpgrade('as', 25)) gain = gain.times(100)
	if (hasUpgrade('s', 51)  && ! inChallenge("x", 11)) gain = gain.times(500)
	if (hasUpgrade('ast', 21)) gain = gain.times(upgradeEffect('ast', 21))
	if (hasUpgrade('c', 21)) gain = gain.times(1000)
	if (hasUpgrade('ast', 22)) gain = gain.times(1000)
	if (hasUpgrade('c', 23)) gain = gain.times(upgradeEffect('c', 23))
	if (hasUpgrade('ast', 25)) gain = gain.times(100)
	if (hasUpgrade('c', 25)) gain = gain.times(100)
	if (hasUpgrade('stars', 11)) gain = gain.times(upgradeEffect('stars', 11))
	if (hasUpgrade('planets', 11)) gain = gain.times(upgradeEffect('planets', 11))
	if (hasUpgrade('r', 51)) gain = gain.times(1e9)
	if (hasUpgrade('x', 21)  && !inChallenge("x", 11)) gain = gain.times(upgradeEffect('x', 21))
	if (hasUpgrade('ro', 22)) gain = gain.times(upgradeEffect('ro', 22))
	if (hasMilestone('ro', 21)) gain = gain.times(1e20)
	

	// Challenges Reality I
	if (inChallenge('c', 11)) gain = gain.pow(0.5)
	if (inChallenge('c', 14)) gain = gain.pow(0.12)
	if (inChallenge('ast', 11)) gain = gain.pow(0.25)
	if (inChallenge('ast', 14)) gain = gain.pow(0.108)
	if (inChallenge('x', 11)) gain = gain.times(0)

	// Reality II
	if (hasUpgrade('unstablefuel', 11)) gain = gain.add(1)
	if (hasUpgrade('unstablefuel', 12)) gain = gain.add(2)
	if (hasUpgrade('unstablefuel', 13)) gain = gain.add(3)
	if (hasUpgrade('unstablefuel', 14)) gain = gain.add(4)
	if (hasUpgrade('unstablefuel', 24)) gain = gain.add(upgradeEffect('unstablefuel', 24))
	if (hasUpgrade('galaxy', 11)) gain = gain.add(upgradeEffect('galaxy', 11))
	if (hasUpgrade('unstablefuel', 42)) gain = gain.add(upgradeEffect('unstablefuel', 42))
	if (hasUpgrade('unstablefuel', 43)) gain = gain.add(upgradeEffect('unstablefuel', 43))
	if (hasMilestone('unstablefuel', 1)) gain = gain.add(getBuyableAmount('darkmatter', 11))
	if (hasUpgrade('unstablefuel', 51)) gain = gain.add(upgradeEffect('unstablefuel', 51))
	if (hasUpgrade('unstablefuel', 53)) gain = gain.add(upgradeEffect('unstablefuel', 53))
	if (hasUpgrade('galaxy', 44)) gain = gain.add(upgradeEffect('galaxy', 44))
	if (hasUpgrade('supernova', 12)) gain = gain.add(upgradeEffect('supernova', 12))
	if (hasUpgrade('unstablefuel', 62)) gain = gain.add(upgradeEffect('unstablefuel', 62))
	if (hasUpgrade('unstablefuel', 63)) gain = gain.add(upgradeEffect('unstablefuel', 63))
	if (hasUpgrade('supernova', 22)) gain = gain.add(upgradeEffect('supernova', 22))
	if (hasUpgrade('supernova', 32)) gain = gain.add(upgradeEffect('supernova', 32))








	// Inf
	if (hasMilestone('inf', 1)) gain = gain.times(3)
	if (hasMilestone('megainf', 1)) gain = gain.times(5)
	if (hasMilestone('megainf', 7)) gain = gain.times(5)
	return gain

}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Endgame: Unstable Milestone XIV in Reality II",
]

// Determines when the game "ends"
function isEndgame() {
	return player.omegainf.points.gte(new Decimal(10))
	
}

let winText = `Congratulations! You have completed The Galactic Tree!`
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
	num: "2.0.1",
	name: "Fracture",
}

let changelog =
`<changelog>
<h1 style="color:Aquamarine;">CHANGELOG</h1><br>
	<br>

		<h2 style="color:Violet;">v2.0.1</h2><br>
		- Bug Fixes<br>
		- Minor Reality II Changes<br>
		<br>
		<h2 style="color:#ff3200;">v2.0 </h2><br>
		- Fracture<br>
		- Second Reality<br>
		- Unstable Rocket Fuel<br>
		- Galaxies<br>
		- The Cosmos<br>
		- Dark Matter<br>
		- Supernova<br>
		- Energy<br>
		- Game UI changes<br>
		- More Achievements<br>
		- More Secret Achievements<br>
		- Chapters changed to Realities<br>
		- Hardcaps<br>
		- Reality I Changes<br>

		- QOL Reality I Changes<br>
		- Better Settings Menu<br>
		- Better Info Menu<br>
		- Better Savebank<br>
		- Better Softcaps<br>
		- Animated Background<br>
		- Theme Changes<br>
		- Better Achievements<br>
		- Changelog Changes<br>
		- Bug fixes<br>
		<br>
		<h2 style="color:Violet;">v1.0.4</h2><br>
		- Bug fixes<br>
		<br>
		<h2 style="color:Violet;">v1.0.3</h2><br>
		- QOL Popup settings<br>
		- More blobbings<br>
		- 3 more themes<br>
		<br>

		<h2 style="color:Violet;">v1.0.2</h2><br>
		- Bug Fixes<br>
		- Blobbing<br>
		<br>
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
		- Minor bug fixes<br>
		<br>
		<h2 style="color:DeepPink;">v0.2.0 </h2><br>
		- Secret Achievements<br>
		- Savebank<br>
		- Softcaps<br>
		- More Comets & Asteroids content<br>
		- Achievements rework<br>
		- BIG Balance Changes<br>
		- QOL<br>
		- Major bug fixes<br>
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
		<br>
		<h2 style="color:Violet;">v0.0.9</h2><br>
		- Balanced Astronaut stuff <br>
		- Space Theme<br>
		 <br>
		<h2 style="color:Violet;">v0.0.8 [Alpha Release]</h2><br>
		- Astronaut Upgrades <br>
		- Astronaut Milestones<br>
		- More Rocket Milestones<br>
		- Balancing<br>
		- 4 Achievements <br>
		<br>
	<h2 style="color:Violet;">v0.0.7</h2><br>
		- Rockets Upgrades <br>
		- More Rocket Milestones<br>
		- More Rocket Fuel Upgrades<br>
		- Balancing<br>
		- Astronauts (nothing yet)<br>
		- More achievements<br>
		<br>
	<h2 style="color:Violet;">v0.0.6</h2><br>
		- Balanced everything<br>
		- More Achievements<br>
		- More Rocket Content<br>
		<br>
	<h2 style="color:Violet;">v0.0.5</h2><br>
		- Balanced Rocket Fuel<br>
		- Achievements<br>
		- Rockets<br>
		<br>
	<h2 style="color:Violet;">v0.0.4</h2><br>
		- Balanced Rocket  Fuel<br>
		<br>
	<h2 style="color:Violet;">v0.0.3</h2><br>
		- Added Money<br>
		- Added 6 Rocket Upgrades<br>
		- 1 New Theme<br>
		<br>
	<h2 style="color:Violet;">v0.0.2</h2><br>
		- Added Rockets<br>
		- Added 4 Rocket Upgrades<br>
		<br>
	<h2 style="color:Violet;">v0.0.1 [Private Release]</h2><br>
		- Added Rocket Fuel<br>
		<br>
</changelog>`