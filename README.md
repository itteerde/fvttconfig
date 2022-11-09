# fvttconfig
Configuration and customization for Foundry Virtual Tabletop (FVTT)

# Structure
## [grouplabel]/Data/...
The basic idea is to be able to enable just copying the /Data folder for every game table (roughly a world I suppose) over your /Data FVTT user data directory overwriting the customized files.

## [module]
Configuration that cannot be copy and paste modified, like (probably) the MidiQOL JSON to be imported (that probably does not just end up 1:1 on file?).

# Dungeons and Dragons

## System

+ dnd5e (the System) ( [Project URL](https://github.com/foundryvtt/dnd5e) )


## Modules Active

`game.modules.filter(m => m.active)` (might not order alphabetically, `id` is probably key for ordering while `title` is what we use). This list can be updated [by Macro](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/dev/listModules.js).


1. Autocomplete Whisper (version: 1.0.4) : [Project-URL](https://github.com/orcnog/autocomplete-whisper/)
1. Dynamic effects using Active Effects (version: 10.0.11) : [Project-URL](https://gitlab.com/tposney/dae)
1. D&D Beyond Importer (version: 3.1.22) : [Project-URL](https://github.com/mrprimate/ddb-importer)
1. DFreds Convenient Effects (version: 3.0.2) : [Project-URL](https://github.com/DFreds/dfreds-convenient-effects)
1. DFreds Pocket Change (version: 4.0.1) : [Project-URL](https://github.com/DFreds/dfreds-pocket-change)
1. Dice Tray (version: 1.5.2) : [Project-URL](https://gitlab.com/asacolips-projects/foundry-mods/foundry-vtt-dice-calculator)
1. D&D Audio Bundle - Hammer Home (version: 1.5) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home)
1. Game Audio Bundle 1 (version: 2.8) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1)
1. Game Audio Bundle 2 (version: 2.8) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2)
1. Game Audio Bundle 3 (version: 2.8) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3)
1. Game Audio Bundle 4 (version: 2.8) : [Project-URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4)
1. Item Containers (version: 10.0.4) : [Project-URL](https://gitlab.com/tposney/itemcollection/tree/master)
1. libWrapper (version: 1.12.10.0) : [Project-URL](https://github.com/ruipin/fvtt-lib-wrapper)
1. Magic Items (version: 3.0.0) : [Project-URL](https://gitlab.com/riccisi/foundryvtt-magic-items)
1. Michael Ghelfi Studios Audio Pack (version: 1.3) : [Project-URL](https://michaelghelfi.com/)
1. Midi QOL (version: 10.0.19) : [Project-URL](https://gitlab.com/tposney/midi-qol)
1. Monk's Little Details (version: 10.3) : [Project-URL](https://github.com/ironmonk88/monks-little-details)
1. PopOut! (version: 2.9) : [Project-URL](https://github.com/League-of-Foundry-Developers/fvtt-module-popout)
1. Settings Extender (version: 1.2.1) : [Project-URL](https://gitlab.com/foundry-azzurite/settings-extender)
1. socketlib (version: 1.0.12) : [Project-URL](https://github.com/manuelVo/foundryvtt-socketlib)
1. Tablerules - FVTT Module (version: 0.0.6) : [Project-URL](https://github.com/itteerde/fvttconfig/)
1. Times Up (version: 10.0.2) : [Project-URL](https://gitlab.com/tposney/times-up)
1. Token Auras (version: 2.1) : [Project-URL](https://bitbucket.org/Fyorl/token-auras)
1. Token Magic FX (version: 0.6.1.2) : [Project-URL](https://github.com/Feu-Secret/Tokenmagic)


Development may remove the following for size reduction assuming there should not be a lot of interactions:

1. D&D Audio Bundle - Hammer Home ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home/) )
1. Game Audio Bundle 1 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1) )
1. Game Audio Bundle 2 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2) )
1. Game Audio Bundle 3 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3) )
1. Game Audio Bundle 4 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4) )
1. Michael Ghelfi Studios Audio Pack ( ! [Project URL](https://michaelghelfi.bandcamp.com/ "not the module") )


## Autocomplete Whisper

> Adds whisper autocompletion and group whispers.

    critical: no
    dependencies: none
    version tested: 1.0.4

[Project URL](https://github.com/orcnog/autocomplete-whisper)


## D&D Audio Bundle - Hammer Home

> ?

    critical: ?
    dependencies: ?
    version tested:?

[Project URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home/)


## D&D Beyond Importer

> Imports stuff from DnDBeyond. We use it for importing characters, but not for munching compendia.

    critical: yes
    dependencies: ?
    version tested: ?

[Project URL](https://github.com/MrPrimate/ddb-importer)


# Resources

## General

+ [Guidelines (our own)](https://github.com/itteerde/fvttconfig/blob/main/tools/guidelines.md)
+ [Foundry Virtual Tabletop - API Documentation - Version 10](https://foundryvtt.com/api/)
+ [Foundry VTT Discord Server](https://discord.gg/foundryvtt)
+ [Roll-Formulas](https://github.com/foundryvtt/dnd5e/wiki/Roll-Formulas)
+ [Module-Development](https://foundryvtt.com/article/module-development/)
+ [Foundry VTT Community Wiki](https://foundryvtt.wiki/en/home)


## ChatMessage

+ [Freeze chat-message.js](https://gitlab.com/Freeze020/foundry-vtt-scripts/-/blob/master/api-examples/chat-message.js)


## Flags

+ [Freeze flags.js](https://gitlab.com/Freeze020/foundry-vtt-scripts/-/blob/master/api-examples/flags.js)