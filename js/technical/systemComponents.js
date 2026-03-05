var systemComponents = {
	"tab-buttons": {
		props: ["layer", "data", "name"],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked" v-bind:class="{tabButton: true, notify: subtabShouldNotify(layer, name, tab), resetNotify: subtabResetNotify(layer, name, tab)}"
					v-bind:style="[{'border-color': tmp[layer].color}, (subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + (data[tab].glowColor || defaultGlow)} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
						v-on:click="function(){player.subtabs[layer][name] = tab; updateTabFormats(); needCanvasUpdate = true;}">{{tab}}</button>
				</div>
			</div>
		`,
	},

	"tree-node": {
		props: ["layer", "abb", "size", "prev"],
		template: `
		<button v-if="nodeShown(layer)"
			v-bind:id="layer"
			v-on:click="function() {
				if (shiftDown && options.forceTooltips) player[layer].forceTooltip = !player[layer].forceTooltip
				else if(tmp[layer].isLayer) {
					if (tmp[layer].leftTab) {
						showNavTab(layer, prev)
						showTab('none')
					}
					else
						showTab(layer, prev)
				}
				else {run(layers[layer].onClick, layers[layer])}
			}"


			v-bind:class="{
				treeNode: tmp[layer].isLayer,
				treeButton: !tmp[layer].isLayer,
				smallNode: size == 'small',
				[layer]: true,
				tooltipBox: true,
				forceTooltip: player[layer].forceTooltip,
				ghost: tmp[layer].layerShown == 'ghost',
				hidden: !tmp[layer].layerShown,
				locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
				notify: tmp[layer].notify && player[layer].unlocked,
				resetNotify: tmp[layer].prestigeNotify,
				can: ((player[layer].unlocked || tmp[layer].canReset) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
				front: !tmp.scrolled,
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span class="nodeLabel" v-html="(abb !== '' && tmp[layer].image === undefined) ? abb : '&nbsp;'"></span>
			<tooltip
      v-if="tmp[layer].tooltip != ''"
			:text="(tmp[layer].isLayer) ? (
				player[layer].unlocked ? (tmp[layer].tooltip ? tmp[layer].tooltip : formatWhole(player[layer].points) + ' ' + tmp[layer].resource)
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : 'Reach ' + formatWhole(tmp[layer].requires) + ' ' + tmp[layer].baseResource + ' to unlock (You have ' + formatWhole(tmp[layer].baseAmount) + ' ' + tmp[layer].baseResource + ')')
			)
			: (
				tmp[layer].canClick ? (tmp[layer].tooltip ? tmp[layer].tooltip : 'I am a button!')
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : 'I am a button!')
			)"></tooltip>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark></span>
		</button>
		`,
	},

	"layer-tab": {
		props: ["layer", "back", "spacing", "embedded"],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]" class="noBackground">
		<div v-if="back"><button v-bind:class="back == 'big' ? 'other-back' : 'back'" v-on:click="goBack(layer)">←</button></div>
		<div v-if="!tmp[layer].tabFormat">
			<div v-if="spacing" v-bind:style="{'height': spacing}" :key="this.$vnode.key + '-spacing'"></div>
			<infobox v-if="tmp[layer].infoboxes" :layer="layer" :data="Object.keys(tmp[layer].infoboxes)[0]":key="this.$vnode.key + '-info'"></infobox>
			<main-display v-bind:style="tmp[layer].componentStyles['main-display']" :layer="layer"></main-display>
			<div v-if="tmp[layer].type !== 'none'">
				<prestige-button v-bind:style="tmp[layer].componentStyles['prestige-button']" :layer="layer"></prestige-button>
			</div>
			<resource-display v-bind:style="tmp[layer].componentStyles['resource-display']" :layer="layer"></resource-display>
			<milestones v-bind:style="tmp[layer].componentStyles.milestones" :layer="layer"></milestones>
			<div v-if="Array.isArray(tmp[layer].midsection)">
				<column :layer="layer" :data="tmp[layer].midsection" :key="this.$vnode.key + '-mid'"></column>
			</div>
			<clickables v-bind:style="tmp[layer].componentStyles['clickables']" :layer="layer"></clickables>
			<buyables v-bind:style="tmp[layer].componentStyles.buyables" :layer="layer"></buyables>
			<upgrades v-bind:style="tmp[layer].componentStyles['upgrades']" :layer="layer"></upgrades>
			<challenges v-bind:style="tmp[layer].componentStyles['challenges']" :layer="layer"></challenges>
			<achievements v-bind:style="tmp[layer].componentStyles.achievements" :layer="layer"></achievements>
			<br><br>
		</div>
		<div v-if="tmp[layer].tabFormat">
			<div v-if="Array.isArray(tmp[layer].tabFormat)"><div v-if="spacing" v-bind:style="{'height': spacing}"></div>
				<column :layer="layer" :data="tmp[layer].tabFormat" :key="this.$vnode.key + '-col'"></column>
			</div>
			<div v-else>
				<div class="upgTable" v-bind:style="{'padding-top': (embedded ? '0' : '25px'), 'margin-top': (embedded ? '-10px' : '0'), 'margin-bottom': '24px'}">
					<tab-buttons v-bind:style="tmp[layer].componentStyles['tab-buttons']" :layer="layer" :data="tmp[layer].tabFormat" :name="'mainTabs'"></tab-buttons>
				</div>
				<layer-tab v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :embedded="true" :key="this.$vnode.key + '-' + layer"></layer-tab>
				<column v-else :layer="layer" :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" :key="this.$vnode.key + '-col'"></column>
			</div>
		</div></div>
			`,
	},

	"overlay-head": {
		template: `			
		<div class="overlayThing" style="padding-bottom:7px; width: 90%; z-index: 1000; position: relative">
		<span v-if="player.devSpeed && player.devSpeed > 1" class="overlayThing">
			<br>Dev Speed: {{format(player.devSpeed)}}x<br>
		</span>
		<span v-if="player.offTime !== undefined"  class="overlayThing">
			<br>Offline Time: {{formatTime(player.offTime.remain)}}<br>
		</span>
		<br>
		<span v-if="player.points.lt('1e1000')"  class="overlayThing">You have </span>
		<h2  class="overlayThing" id="points">{{format(player.points)}}</h2>
		<span v-if="player.points.lt('1e1e6')"  class="overlayThing"> {{modInfo.pointsName}}</span>
		<br>
		<span v-if="canGenPoints()"  class="overlayThing">({{tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OOM" + (tmp.other.oompsMag < 0 ? "^OOM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen())}}/sec)</span>
		<div v-for="thing in tmp.displayThings" class="overlayThing"><span v-if="thing" v-html="thing"></span></div>
	</div>
	`,
	},

	"info-tab": {
		template: `
        <div class = "info-tab">
        <h1>{{modInfo.name}}</h1>
		<br>
        <h3>{{VERSION.withName}}</h3>
		<br>
		<br>
        Made by {{modInfo.author}}
		<span v-if="modInfo.discordLink"><a class="link" v-bind:href="modInfo.discordLink" target="_blank">{{modInfo.discordName}}</a><br></span>
		<img src="resources/coolboris.png" alt="CoolBoris" width="200"><br><br>
        </span>
		The Prestige Tree made by Jacorb and Aarex
		<a class="link" href="http://discord.gg/wwQfgPa" target="_blank" v-bind:style="{'font-size': '16px'}">Jacorb's Games</a><br>

        The Modding Tree made by Acamaeda
        <a class="link" href="https://discord.gg/F3xveHV" target="_blank" v-bind:style="modInfo.discordLink ? {'font-size': '16px'} : {}">The Modding Tree</a><br>
		<div class="link" onclick="showTab('changelog-tab')">Changelog</div><br>
        Time Played: {{ formatTime(player.timePlayed) }}<br><br>
		Current Endgame: e280000000 points<br><br>
		Thank you for playing!
    `,
	},

	"options-tab": {
		template: `
        <table class="options-table">
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td colspan="5" class="options-header">Main Settings</td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td><button class="opt" onclick="save()">Save</button></td>
                <td>
                    <button class="opt" onclick="toggleOpt('autosave')">
                        Autosave: <span :class="options.autosave ? 'on' : 'off'">{{ options.autosave ? "ON" : "OFF" }}</span>
                    </button>
                </td>
                <td><button class="opt" onclick="exportSave()">Export Save to clipboard</button></td>
                <td><button class="opt" onclick="importSave()">Import</button></td>
                <td><button class="opt" onclick="hardReset()"><span class = "fullreset">FULL RESET</span></button></td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td colspan="5" class="options-header">Visual Settings</td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td>
                    <button class="opt" onclick="switchTheme()">
                        Theme:<br><span class= "theme">{{ getThemeName() }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('hqTree')">
                        High Quality Tree:<br> <span :class="options.hqTree ? 'on' : 'off'">{{ options.hqTree ? "ON" : "OFF" }}</span>
                    </button>
                </td>
                <td>
				<button class="opt" onclick="toggleOpt('emojisEnabled')">
                       Layer Emojis:<br> <span :class="options.emojisEnabled ? 'on' : 'off'">{{ options.emojisEnabled ? "ON" : "OFF" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('hideChallenges')">
                        Completed Challenges:<br> <span :class="options.hideChallenges ? 'off' : 'on'">{{ options.hideChallenges ? "HIDDEN" : "SHOWN" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('forceOneTab'); needsCanvasUpdate = true">
                        Single-Tab Mode:<br> <span :class="options.forceOneTab ? 'off' : 'on'">{{ options.forceOneTab ? "ALWAYS" : "AUTO" }}</span>
                    </button>
                </td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td colspan="5" class="options-header">Popup Settings</td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td>
                    <button class="opt" onclick="toggleOpt('RocketMilestonePopup'); needsCanvasUpdate = true">
                        Rocket Milestone Popups: <span :class="options.RocketMilestonePopup ? 'on' : 'off'">{{ options.RocketMilestonePopup ? "ENABLED" : "DISABLED" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('AstronautMilestonePopup'); needsCanvasUpdate = true">
                        Astronaut Milestone Popups: <span :class="options.AstronautMilestonePopup ? 'on' : 'off'">{{ options.AstronautMilestonePopup ? "ENABLED" : "DISABLED" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('SpaceMilestonePopup'); needsCanvasUpdate = true">
                        Space Milestone Popups: <span :class="options.SpaceMilestonePopup ? 'on' : 'off'">{{ options.SpaceMilestonePopup ? "ENABLED" : "DISABLED" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('ComAstMilestonePopup'); needsCanvasUpdate = true">
                        Comet & Asteroid Milestone Popups: <span :class="options.ComAstMilestonePopup ? 'on' : 'off'">{{ options.ComAstMilestonePopup ? "ENABLED" : "DISABLED" }}</span>
                    </button>
                </td>
                <td>
                    <button class="opt" onclick="toggleOpt('AchievementPopup'); needsCanvasUpdate = true">
                        Achievement Popups: <span :class="options.AchievementPopup ? 'on' : 'off'">{{ options.AchievementPopup ? "ENABLED" : "DISABLED" }}</span>
                    </button>
                </td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td colspan="5" class="options-header">Extra Settings</td>
            </tr>
            <tr class="spacer-row"><td colspan="5"></td></tr>
            <tr>
                <td colspan="5">
                    <button class="opt" onclick="toggleOpt('forceTooltips'); needsCanvasUpdate = true">
                        Shift-Click to Toggle Tooltips: <span :class="options.forceTooltips ? 'on' : 'off'">{{ options.forceTooltips ? "ON" : "OFF" }}</span>
                    </button>
                </td>
            </tr>
            <tr></tr>
            <tr>
                <td colspan="5" class="options-header">Hotkeys</td>
            </tr>
            <tr>
                <td colspan="5">
                    <div class="hotkey-section">
                        <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked">
                            <br>{{key.description}}
                        </span>
                    </div>
                </td>
            </tr>
            <tr class="spacer-row"><td colspan="5" style="height: 50px;"></td></tr> <!-- Extra space at bottom -->
        </table>
    `,
	},

	"back-button": {
		template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `,
	},

	tooltip: {
		props: ["text"],
		template: `<div class="tooltip" v-html="text"></div>
		`,
	},

	"node-mark": {
		props: {
			layer: {},
			data: {},
			offset: { default: 0 },
			scale: { default: 1 },
		},
		template: `<div v-if='data'>
			<div v-if='data === true' class='star' v-bind:style='{position: "absolute", left: (offset-10) + "px", top: (offset-10) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}'></div>
			<img v-else class='mark' v-bind:style='{position: "absolute", left: (offset-22) + "px", top: (offset-15) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}' v-bind:src="data"></div>
		</div>
		`,
	},

	particle: {
		props: ["data", "index"],
		template: `<div><div class='particle instant' v-bind:style="[constructParticleStyle(data), data.style]" 
			v-on:click="run(data.onClick, data)"  v-on:mouseenter="run(data.onMouseEnter, data)" v-on:mouseleave="run(data.onMouseLeave, data)" ><span v-html="data.text"></span>
		</div>
		<svg version="2" v-if="data.color">
		<mask v-bind:id="'pmask' + data.id">
        <image id="img" v-bind:href="data.image" x="0" y="0" :height="data.width" :width="data.height" />
    	</mask>
    	</svg>
		</div>
		`,
	},

	bg: {
		props: ["layer"],
		template: `<div class ="bg" v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]"></div>
		`,
	},
};
