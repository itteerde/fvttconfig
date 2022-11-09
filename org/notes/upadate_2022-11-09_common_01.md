# Update from Snapshot 2022-11-09

```
Use the following grammatical protocols when documenting your activities: if you are documenting steps
that must still be taken, use the imperative mood; if you are documenting an ongoing process related to 
your activity, use the present progressive tense-aspect; if you are documenting observed results, use the 
simple past tense. All documented steps should be written in something close to natural English sentences 
for the sake of clarity, but to avoid redundancy, use of the pronoun “I” may be omitted from the main 
clause’s subject position.
```


# Investigating Snapshot State

+ List and review Modules installed and active.
+ Review MidiQOL settings.
+ Compendium Folders.


# Updating Dev

1. Restore from Origin
    1. Restored Prod-origin to Prod.
    1. Copied Prod to Dev.
    1. Reset passwords on Dev.
1. Upadate all Modules
    1. Uninstalling CPR Game System.
    1. Updated all Modules.
1. Adopt Macro Modules
    1. Installed Item-Macro Module.
    1. Installed Effect-Macros Module.
    1. Activated Item-Macro and Effect-Macros Modules.
1. Review Settings
    1. Changed MidiQOL -> Misc -> `Show Item details in chat card` to `Details: NPC + PC` (this is not what is sounds like. Without this `Item.use()` does not display `description` which is generally bad).
    1. Changed Item-Macro -> `Character Sheet Hook` to activated (I do not believe this Module does anything without that?).
    1. Changed Core -> Open Permission Configuration -> `Use File Browser` to activated (without the players cannot assign icons to their Macros). One might consider keeping uploading images disabled as it is, but picking one that is already available should be allowed as long as Users are allowed to use `Script Macros` which we need for lots of stuff we are currently doing and will be doing.
1. Compendium Imrovements
    1. Installed Compendium Folders Module.
    1. ~~Installed Compendium Navigator Module.~~ (and uninstalled, wrong one!)
    1. Installed Compendium Browser Module.
1. Twilight Sanctuary
    1. Put the [Channel Divinity: Twilight Sanctuary](https://github.com/itteerde/fvttconfig/blob/main/tools/item/feat/fvtt-Item-channel-divinity_-twilight-sanctuary.json) `Feature Item` into Tablerules Items `Compendium`.
    1. Imported Umbratica CoS.
    1. Deleted Umbratica's `Channel Divinity: Twilight Sanctuary` `Feature Item` created by DDB-Importer.
    1. Dragged and dropped our [Channel Divinity: Twilight Sanctuary](https://github.com/itteerde/fvttconfig/blob/main/tools/item/feat/fvtt-Item-channel-divinity_-twilight-sanctuary.json) `Feature Item` from Tablerules Items `Compendium` onto the Umbratica `Actor` `Character Sheet`.
    1. Put the `Macro` [TwilightSanctuaryTakeTempHP](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/gm/TwilightSanctuaryTakeTempHP.js) on Wendal's Control Bar.
    1. Tested successfully activating the abitiy by using the item from the `Character Sheet` on Umbratica and consuming `hp.temp` from Wendal's `Control Bar`. Did not do extensive testing like with several Clerics and 3d distances. Also did not test duration and deletion.

+ Workout a SOP for stripping passwords, preferably including a restore step in order to have it for the case of another backup-update-restore cycle on Prod should we ever need to go back to that last resort operation for some major update or because needs to fix something that was broken on Prod and deciding to not restore a backup.
+ Review Issues.

## Activities Protocol

```
If there is another Dev from Prod iteration this needs to be reset or a new protocol needs to be added.
```

1. Configure Settings -> Item-Macros -> sheet-hook


## Item-Macros

## Effect-Macros


# Invetgration Tests



# Update on Prod