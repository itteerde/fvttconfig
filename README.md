# fvttconfig
Configuration and customization for Foundry Virtual Tabletop (FVTT)

# Structure
## [grouplabel]/Data/...
The basic idea is to be able to enable just copying the /Data folder for every game table (roughly a world I suppose) over your /Data FVTT user data directory overwriting the customized files.

## [module]
Configuration that cannot be copy and paste modified, like (probably) the MidiQOL JSON to be imported (that probably does not just end up 1:1 on file?).

# Dungeons and Dragons
+ dnd5e (the System) ( [Project URL](https://github.com/foundryvtt/dnd5e) )
+ Autocomplete Whisper ( [Project URL](https://github.com/orcnog/autocomplete-whisper) )
+ D&D Audio Bundle - Hammer Home ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home/) )
+ D&D Beyond Importer ( [Project URL](https://github.com/MrPrimate/ddb-importer) )
+ DFreds Convenient Effects ( [Project URL](https://github.com/DFreds/dfreds-convenient-effects) )
+ Dice Tray ( [Project URL](https://gitlab.com/asacolips-projects/foundry-mods/foundry-vtt-dice-calculator) )
+ ~~Dynamic effects using Active Effects~~ ( [Project URL](https://gitlab.com/tposney/dae)? )
+ Game Audio Bundle 1 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1) )
+ Game Audio Bundle 2 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2) )
+ Game Audio Bundle 3 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3) )
+ Game Audio Bundle 4 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4) )
+ ~~Item Containers~~ ( [Project URL](https://gitlab.com/tposney/itemcollection)(? Item Collection by tim posney?) )
+ libWrapper ( [Project URL](https://github.com/ruipin/fvtt-lib-wrapper) )
+ Michael Ghelfi Studios Audio Pack ( ! [Project URL](https://michaelghelfi.bandcamp.com/ "not the module") )
+ MidiQOL ( [Project URL](https://gitlab.com/tposney/midi-qol) )
+ Monk's Little Details ( [Project URL](https://github.com/ironmonk88/monks-little-details) )
+ PopOut! ( [Project URL](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) )
+ Settings Extender ( [Project URL](https://gitlab.com/foundry-azzurite/settings-extender) (what for?) )
+ socketlib ( [Project URL](https://github.com/manuelVo/foundryvtt-socketlib) )
+ Times Up ( [Project URL](https://gitlab.com/tposney/times-up) )
+ Token Auras ( [Project URL](https://bitbucket.org/Fyorl/token-auras) )
+ Token Magic FX ( [Project URL](https://github.com/Feu-Secret/Tokenmagic) )


Development removes the following for size reduction assuming there should not be a lot of interactions:

+ D&D Audio Bundle - Hammer Home ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-DnD-Audio-Bundle-Hammer-Home/) )
+ Game Audio Bundle 1 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-1) )
+ Game Audio Bundle 2 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-2) )
+ Game Audio Bundle 3 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-3) )
+ Game Audio Bundle 4 ( [Project URL](https://github.com/datdamnzotz/FoundryVTT-Game-Audio-Bundle-4) )
+ Michael Ghelfi Studios Audio Pack ( ! [Project URL](https://michaelghelfi.bandcamp.com/ "not the module") )


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

+ [Foundry Virtual Tabletop - API Documentation - Version 10](https://foundryvtt.com/api/)
+ [Foundry VTT Discord Server](https://discord.gg/foundryvtt)
+ [Roll-Formulas](https://github.com/foundryvtt/dnd5e/wiki/Roll-Formulas)
+ [Module-Development](https://foundryvtt.com/article/module-development/)
+ [Foundry VTT Community Wiki](https://foundryvtt.wiki/en/home)