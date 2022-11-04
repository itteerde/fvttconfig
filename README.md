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

`game.modules.filter(m => m.active)` (might not order alphabetically, `id` is probably key for ordering while `title` is what we use).

1. Autocomplete Whisper ( [Project URL](https://github.com/orcnog/autocomplete-whisper) )
1. Dynamic effects using Active Effects ( [Project URL](https://gitlab.com/tposney/dae) )
1. D&D Beyond Importer ( [Project URL](https://github.com/MrPrimate/ddb-importer) )
1. DFreds Convenient Effects ( [Project URL](https://github.com/DFreds/dfreds-convenient-effects) )
1. DFreds Pocket Change ( [Project URL](https://github.com/DFreds/dfreds-pocket-change) )
1. Dice Tray ( [Project URL](https://gitlab.com/asacolips-projects/foundry-mods/foundry-vtt-dice-calculator) )
1. D&D Audio Bundle - Hammer Home ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home/) )
1. Game Audio Bundle 1 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1) )
1. Game Audio Bundle 2 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2) )
1. Game Audio Bundle 3 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3) )
1. Game Audio Bundle 4 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4) )
1. Item Containers ( [Project URL](https://gitlab.com/tposney/itemcollection) )
1. libWrapper ( [Project URL](https://github.com/ruipin/fvtt-lib-wrapper) )
1. Magic Items ( [Project URL](https://gitlab.com/riccisi/foundryvtt-magic-items) )
1. Michael Ghelfi Studios Audio Pack ( ! [Project URL](https://michaelghelfi.bandcamp.com/ "not the module") )
1. MidiQOL ( [Project URL](https://gitlab.com/tposney/midi-qol) )
1. Monk's Little Details ( [Project URL](https://github.com/ironmonk88/monks-little-details) )
1. PopOut! ( [Project URL](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) )
1. Settings Extender ( [Project URL](https://gitlab.com/foundry-azzurite/settings-extender) (what for?) )
1. socketlib ( [Project URL](https://github.com/manuelVo/foundryvtt-socketlib) )
1. Tablerules ( [Project URL](https://github.com/itteerde/fvttconfig) )
1. Times Up ( [Project URL](https://gitlab.com/tposney/times-up) )
1. Token Auras ( [Project URL](https://bitbucket.org/Fyorl/token-auras) )
1. Token Magic FX ( [Project URL](https://github.com/Feu-Secret/Tokenmagic) )



Development removes the following for size reduction assuming there should not be a lot of interactions:

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