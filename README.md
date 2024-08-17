# fvttconfig
Configuration and customization for Foundry Virtual Tabletop (FVTT)


# Dungeons and Dragons

## System

+ dnd5e (the System) ( [Project URL](https://github.com/foundryvtt/dnd5e), [Manifest](https://raw.githubusercontent.com/foundryvtt/dnd5e/master/system.json) )


## Modules Active

`game.modules.filter(m => m.active)` (might not order alphabetically, `id` is probably key for ordering while `title` is what we use). This list can be updated [by Macro](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/dev/listModules.js). This list is supposed to be to real Production list. Currently there is a bit of a gap during preparing the next update. Maybe in the future it should reflect the accpeted list instead, which would mean it is either Production or what production is supposed to catch up soon, with the list already being somewhat approved.

**reported from RotFM 2024-08-17**

1. Autocomplete Whisper (version: 1.0.5) : [Project-URL](https://github.com/orcnog/autocomplete-whisper/)
1. Covered Token Rescue HUD (version: 1.2.0) : [Project-URL](https://github.com/xaukael/covered-token-rescue-hud/)
1. DDB-Importer: A D&D Beyond Integrator (version: 5.2.29) : [Project-URL](https://github.com/mrprimate/ddb-importer)
1. Dice Tray (version: 2.2.2) : [Project-URL](https://github.com/mclemente/fvtt-dice-tray)
1. Tasha's Cauldron of Everything (version: 1.2.0) : [Project-URL](https://foundryvtt.com/packages/dnd-tashas-cauldron)
1. Simple Calendar (version: 2.4.18) : [Project-URL](https://github.com/vigoren/foundryvtt-simple-calendar)
1. Item Macro (version: 1.11.1) : [Project-URL](https://github.com/Foundry-Workshop/Item-Macro)
1. Limithron's Crashed Nautiloid (version: 1.1.0) : [Project-URL](https://www.limithron.com/crashed-nautiloid)
1. Monk's Bloodsplats (version: 12.01) : [Project-URL](https://github.com/ironmonk88/monks-bloodsplats)
1. Tablerules - FVTT Module (version: 0.12.2) : [Project-URL](https://github.com/itteerde/fvttconfig/)

# General

+ [Foundry VTT GitHub, Issues and Documentation only](https://github.com/foundryvtt/foundryvtt)
+ [Foundry Virtual Tabletop - API Documentation - Version 11](https://foundryvtt.com/api/)
+ [Foundry VTT Discord Server](https://discord.gg/foundryvtt)
+ [JavaScript](https://devdocs.io/javascript/)
+ [Roll-Formulas](https://github.com/foundryvtt/dnd5e/wiki/Roll-Formulas)
+ [Module-Development](https://foundryvtt.com/article/module-development/)
+ [Foundry VTT Community Wiki](https://foundryvtt.wiki/en/home)
+ [Deleting Properties from Documents](https://discord.com/channels/170995199584108546/699750150674972743/1043341804742914141)
  like `game.actors.get("id of actor").update({"system.currency.-=undefined": null})`
+ [Deleting Documents](https://github.com/GamerFlix/foundryvtt-api-guide/blob/main/macro_guide.md#deleting-documents)
+ [dnd5e](https://github.com/foundryvtt/dnd5e)
+ [summoning](https://github.com/foundryvtt/dnd5e/wiki/Summoning)


## ActiveEffects

+ [Active Effects](https://hackmd.io/@foundryvtt-dnd5e/active-effects)
+ [Kandashi's Guide](https://docs.google.com/document/d/1DuZaIFVq0YulDOvpahrfhZ6dK7LuclIRlGOtT0BIYEo/edit#heading=h.d17oo6mrlamg)

## ChatMessage dnd5e

+ [Freeze chat-message.js](https://gitlab.com/Freeze020/foundry-vtt-scripts/-/blob/master/api-examples/chat-message.js)


## Flags

+ [Freeze flags.js](https://gitlab.com/Freeze020/foundry-vtt-scripts/-/blob/master/api-examples/flags.js)


## Hooks and Wrappers

+ `CONFIG.debug.hooks = true;`
+ [Hooks Listening & Calling](https://foundryvtt.wiki/en/development/guides/Hooks_Listening_Calling)
+ [https://github.com/ruipin/fvtt-lib-wrapper/](https://github.com/ruipin/fvtt-lib-wrapper/)


## Rolls dnd5e

+ `CONST.DICE_ROLL_MODES`


## Warpgate

+ [Look at the source, ```actor.toObject()```, not the template Actor put in a Scene](https://discord.com/channels/170995199584108546/699750150674972743/1084007647214313546)


## Development Outlook

Note that both have a lot of rolling targets, where items, even if technically simple (but maybe tidious) keep rolling through milestones.

+ [V11 - Stable Maintenance 7](https://github.com/foundryvtt/foundryvtt/milestone/135)
+ [D&D5E 2.3.0](https://github.com/foundryvtt/dnd5e/milestone/59)



# Cyberpunk Red

The CPR system did a lot of things fundamentally different from dnd5e.

## System

+ cyberpunk-red-core (the System), [Project URL](https://gitlab.com/cyberpunk-red-team/fvtt-cyberpunk-red-core)

## Modules Active

`game.modules.filter(m => m.active)` (might not order alphabetically, `id` is probably key for ordering while `title` is what we use). This list can be updated [by Macro](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/dev/listModules.js). This list is supposed to be to real Production list. Currently there is a bit of a gap during preparing the next update. Maybe in the future it should reflect the accpeted list instead, which would mean it is either Production or what production is supposed to catch up soon, with the list already being somewhat approved.



1. Autocomplete Whisper (version: 1.0.4) : [Project-URL](https://github.com/orcnog/autocomplete-whisper/), [Manifest](https://raw.githubusercontent.com/orcnog/autocomplete-whisper/master/module.json)
1. Compendium Folders (version: 2.5.7) : [Project-URL](https://github.com/earlSt1/vtt-compendium-folders), [Manifest](https://raw.githubusercontent.com/earlSt1/vtt-compendium-folders/10x-update/module.json)
1. Covered Token Rescue HUD (version: 1.0.8) : [Project-URL](https://github.com/xaukael/covered-token-rescue-hud/), [Manifest](https://github.com/xaukael/covered-token-rescue-hud/raw/main/module.json)
1. Simple Calendar (version: 2.2.0) : [Project-URL](https://github.com/vigoren/foundryvtt-simple-calendar), [Manifest](https://github.com/vigoren/foundryvtt-simple-calendar/releases/latest/download/module.json)
1. Frag Maps - Modern, Cyberpunk and Sci-Fi Maps (version: 1.1.1) : [Project-URL](https://www.patreon.com/fragmaps), [Manifest](https://foundryvtt.s3-us-west-2.amazonaws.com/modules/fragmaps-free/module.json)
1. FXMaster (version: 3.6.0) : [Project-URL](https://github.com/ghost-fvtt/fxmaster), [Manifest](https://github.com/ghost-fvtt/fxmaster/releases/latest/download/module.json)
1. Game Audio Bundle 1 (version: 3.2) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1), [Manifest](https://raw.githubusercontent.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1/master/module.json)
1. Game Audio Bundle 2 (version: 3.3) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2), [Manifest](https://raw.githubusercontent.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2/master/module.json)
1. Game Audio Bundle 3 (version: 3.2) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3), [Manifest](https://raw.githubusercontent.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3/master/module.json)
1. Game Audio Bundle 4 (version: 3.2) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4), [Manifest](https://raw.githubusercontent.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4/master/module.json)
1. libWrapper (version: 1.12.12.1) : [Project-URL](https://github.com/ruipin/fvtt-lib-wrapper), [Manifest](https://github.com/ruipin/fvtt-lib-wrapper/releases/latest/download/module.json)
1. Michael Ghelfi Studios Audio Pack (version: 1.4) : [Project-URL](https://michaelghelfi.com/), [Manifest](https://foundryvtt.s3-us-west-2.amazonaws.com/modules/michaelghelfi/module.json)
1. Monk's Bloodsplats (version: 10.1) : [Project-URL](https://github.com/ironmonk88/monks-bloodsplats), [Manifest](https://github.com/ironmonk88/monks-bloodsplats/releases/latest/download/module.json)
1. Monk's Combat Marker (version: 10.1) : [Project-URL](https://github.com/ironmonk88/monks-combat-marker), [Manifest](https://github.com/ironmonk88/monks-combat-marker/releases/latest/download/module.json)
1. PopOut! (version: 2.13) : [Project-URL](https://github.com/League-of-Foundry-Developers/fvtt-module-popout), [Manifest](https://raw.githubusercontent.com/League-of-Foundry-Developers/fvtt-module-popout/master/module.json)
1. Tablerules - CPR Module (version: 0.10.14) : [Project-URL](https://github.com/itteerde/fvttconfig/), [Manifest](https://raw.githubusercontent.com/itteerde/fvttconfig/main/modules/cpr-tablerules/module.json)
1. Token Magic FX (version: 0.6.3.2) : [Project-URL](https://github.com/Feu-Secret/Tokenmagic), [Manifest](https://raw.githubusercontent.com/Feu-Secret/Tokenmagic/master/tokenmagic/module.json)


## ChatMessage

The ChatMessage is not deeply structured like in dnd5e, but has pretty much everything in `content`. A Roll's representation will have the rendered Roll result in `content`. Therefore anything modifying afterwards would be String replacements in the HTML and on first glance looks very unlikely to be a good path of doing anything.
