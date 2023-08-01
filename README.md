# fvttconfig
Configuration and customization for Foundry Virtual Tabletop (FVTT)


# Dungeons and Dragons

## System

+ dnd5e (the System) ( [Project URL](https://github.com/foundryvtt/dnd5e) )


## Modules Active

`game.modules.filter(m => m.active)` (might not order alphabetically, `id` is probably key for ordering while `title` is what we use). This list can be updated [by Macro](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/dev/listModules.js). This list is supposed to be to real Production list. Currently there is a bit of a gap during preparing the next update. Maybe in the future it should reflect the accpeted list instead, which would mean it is either Production or what production is supposed to catch up soon, with the list already being somewhat approved.

1. Autocomplete Whisper (version: 1.0.5) : [Project-URL](https://github.com/orcnog/autocomplete-whisper/)
1. Covered Token Rescue HUD (version: 1.0.11) : [Project-URL](https://github.com/xaukael/covered-token-rescue-hud/)
1. Dynamic effects using Active Effects (version: 11.0.6.1) : [Project-URL](https://gitlab.com/tposney/dae)
1. DDB-Importer: A D&D Beyond Integrator (version: 3.4.52) : [Project-URL](https://github.com/mrprimate/ddb-importer)
1. Dice Tray (version: 1.5.3) : [Project-URL](https://gitlab.com/asacolips-projects/foundry-mods/foundry-vtt-dice-calculator)
1. Effective Transferral (version: 1.4.2) : [Project-URL](https://github.com/GamerFlix/effective-transferral)
1. Effect Macro (version: 11.0.0) : [Project-URL](https://github.com/krbz999/effectmacro)
1. Simple Calendar (version: 2.3.20) : [Project-URL](https://github.com/vigoren/foundryvtt-simple-calendar)
1. FXMaster (version: 4.0.2) : [Project-URL](https://github.com/ghost-fvtt/fxmaster)
1. Item Macro (version: 1.8.0) : [Project-URL](https://github.com/Kekilla0/Item-Macro)
1. Item Containers (version: 11.0.1) : [Project-URL](https://gitlab.com/tposney/itemcollection/tree/master)
1. libWrapper (version: 1.12.13.0) : [Project-URL](https://github.com/ruipin/fvtt-lib-wrapper)
1. Monk's Bloodsplats (version: 11.01) : [Project-URL](https://github.com/ironmonk88/monks-bloodsplats)
1. Monk's Combat Details (version: 11.03) : [Project-URL](https://github.com/ironmonk88/monks-combat-details)
1. Monk's Combat Marker (version: 11.01) : [Project-URL](https://github.com/ironmonk88/monks-combat-marker)
1. Monk's Little Details (version: 11.04) : [Project-URL](https://github.com/ironmonk88/monks-little-details)
1. PopOut! (version: 2.14) : [Project-URL](https://github.com/League-of-Foundry-Developers/fvtt-module-popout)
1. Settings Extender (version: 1.2.2) : [Project-URL](https://gitlab.com/foundry-azzurite/settings-extender)
1. socketlib (version: 1.0.13) : [Project-URL](https://github.com/manuelVo/foundryvtt-socketlib)
1. Tablerules - FVTT Module (version: 0.11.21) : [Project-URL](https://github.com/itteerde/fvttconfig/)
1. Times Up (version: 11.0.3) : [Project-URL](https://gitlab.com/tposney/times-up)
1. Token Attacher (version: v4.5.13) : [Project-URL](https://github.com/KayelGee/token-attacher)
1. Token Auras (version: 2.5) : [Project-URL](https://bitbucket.org/Fyorl/token-auras)
1. Token Magic FX (version: 0.6.4.1) : [Project-URL](https://github.com/Feu-Secret/Tokenmagic)
1. Warp Gate (version: 1.18.1) : [Project-URL](https://github.com/trioderegion/warpgate)


# General

+ [Guidelines (our own)](https://github.com/itteerde/fvttconfig/blob/main/tools/guidelines.md)
+ [Foundry Virtual Tabletop - API Documentation - Version 11](https://foundryvtt.com/api/)
+ [Foundry VTT Discord Server](https://discord.gg/foundryvtt)
+ [JavaScript](https://devdocs.io/javascript/)
+ [Roll-Formulas](https://github.com/foundryvtt/dnd5e/wiki/Roll-Formulas)
+ [Module-Development](https://foundryvtt.com/article/module-development/)
+ [Foundry VTT Community Wiki](https://foundryvtt.wiki/en/home)
+ [Deleting Properties from Documents](https://discord.com/channels/170995199584108546/699750150674972743/1043341804742914141)
+ [Deleting Documents](https://github.com/GamerFlix/foundryvtt-api-guide/blob/main/macro_guide.md#deleting-documents)
+ [dnd5e](https://github.com/foundryvtt/dnd5e)
+ [Font-Awesome](https://fontawesome.com/search?m=free&o=r)


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


## ChatMessage

The ChatMessage is not deeply structured like in dnd5e, but has pretty much everything in `content`. A Roll's representation will have the rendered Roll result in `content`. Therefore anything modifying afterwards would be String replacements in the HTML and on first glance looks very unlikely to be a good path of doing anything.