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
1. Mighty Summoner
    1. Implemented HP-boost.
    1. Implemented setting all `Items` of `type` `weapon` to magical.
    1. Created `Module` `tr-summons`.
    1. Added Elks.
    1. Installed `Module` `tr-summons`.
    1. Summoned Elks.
1. Foundry VTT Update
    1. Opened Console.
    1. Updated FVTT to 10.290.
    1. Updated All Modules, was only ours.
    1. Started Migration of World Spelljammer. Finished with not duration percieved, nothing in Console. Back to Integration Testing...

+ Workout a SOP for stripping passwords, preferably including a restore step in order to have it for the case of another backup-update-restore cycle on Prod should we ever need to go back to that last resort operation for some major update or because needs to fix something that was broken on Prod and deciding to not restore a backup.
+ Review Issues.

## Activities Protocol

```
If there is another Dev from Prod iteration this needs to be reset or a new protocol needs to be added.
```

We are winging this in this instance. So we'll restrict ourselves to doing stuff that we are very confident will not do permanent harm.


# Integration Tests

## Plan 1

1. Preparation
    1. Restore from Production.
    1. Unistall CPR System.
    1. Restart FVTT.
    1. Open Console.
1. Update all Modules.
1. Adopt new Modules
    1. Install Item-Macro Module (1.8.0).
    1. Install Effect-Marco Module (10.0.7).
    1. Activate Item-Macro and Effect-Macro.
1. Improve Settings
    1. Change MidiQOL -> Misc -> `Show Item details in chat card` to `Details: NPC + PC` (this is not what is sounds like. Without this `Item.use()` does not display `description` which is generally bad).
    1. Change Item-Macro -> `Character Sheet Hook` to activated (I do not believe this Module does anything without that?).
    1. Change Core -> Open Permission Configuration -> `Use File Browser` to activated for all roles (without the players cannot assign icons to their Macros). One might consider keeping uploading images disabled as it is, but picking one that is already available should be allowed as long as Users are allowed to use `Script Macros` which we need for lots of stuff we are currently doing and will be doing.
    1. Make Jorrick Trusted Player.
1. Twilight Sanctuary
    1. Open Actor Dusk.
    1. Delete Channel Divinity: Twilight Sanctuary Feature Item from Dusk Actor.
    1. Drag and Drop Feature Item Channel Divinity: Twilight Sanctuary from Tablerules Items Compendium onto Actor Dusk.
    1. Drag Actor Dusk Token on Canvs (Port N.).
1. Testing with User
    1. Connect Jorrick.
    1. GM: End Combat in Wildspace.
    1. GM: Activate Scene Port N.
    1. Jorrick: Drop Jorrick Actor onto Port N.
    1. GM: Add Actor Jorrick Token (Jorrick) and Actor Dusk Token (Dusk) to combat.
    1. GM: Unpause Game.
    1. Jorrick: Move Actor Jorrick Token (Jorrick) more than 30ft away from Actor Dusk Token (Dusk).
    1. GM: Advance to Dusk's Turn if necessary
    1. GM: use Channel Divinity: Twilight Sanctuary by using the Dice controll on the Dusk Character Sheet.
    1. GM: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to your Control Bar (yeah this, should probably be a two players connected test...)
    1. GM: Use the Macro `Twilight Sanctuary tHP`. Should give Dusk `hp.temp` and tell us about it in Chat.
    1. GM: Advance Turn.
    1. Jorrick: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to your Control Bar.
    1. Jorrick: Check that you are more than 30ft away from Dusk. If not fix it. Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Move Jorrick just completely into the `token-aura`, but change `elevation` to 25ft.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Move Jorrick directly above Dusk.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Should give Jorrick `hp.temp` and tell us about it in Chat.
    1. GM: Advance Turns for 10 Turns. The Aura and the `Effect` `Channel Divinity: Twilight Sanctuary` should (seem to [aura is size 0]) be removed from Dusk.
    1. GM: Advance Turn to Jorrick.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.error` message informing you that Jorrick did not find a Twilight Cleric (yeah, the message is not ideal).
1. Mighty Summoner
    1. Install tr-summons.
    1. Put Mighty Summoner Macro into Control Bar.
    1. Put Cycle Wildcard Token into Control Bar.
    1. Configure an Elk.
        1. Set Prototype Token => `dispostion=1`.
        1. Set Prototype Token to random Wildcard art.
        1. Set Prototype Token to use `modules/tr-summons/icons/elk/disc/*`.
    1. Test summoning Elk.
        1. Drag and Drop an Elk (the modified one).
        1. Use Macro Mighty Summoner.
        1. Copy and Paste empowered Elk.
        1. Use Macro Cycle Wildcard Token.

## Test 1

1. Preparation
    1. Restored from Production.
    1. Uninstalled CPR System.
    1. Restarted FVTT.
    1. Opened Console.
1. FVTT Update
    1. Was not needed as the FVTT installation has not been split yet and was therefore updated when updating for DEV.
1. Updated all Modules.
1. Adoption new Modules.
    1. Installed Item-Macro 1.8.0.
    1. Installed Effect-Macro 10.0.7.
    1. Migrated World Spelljammer.
    1. Activated Item-Macro and Effect-Macro.
1. Improving Settiong
    1. Changed MidiQOL -> Workflow Settings -> Misc -> `Show Item details in chat card` to `Details: NPC + PC`.
    1. Changed Item-Macro -> `Character Sheet Hook` to activated.
    1. Changed Core -> Open Permission Configuration -> `Use File Browser` to activated for all roles.
    1. Made Jorrick Trusted Player.
1. Twilight Sanctuary
    1. Opened Actor Dusk.
    1. Deleted Channel Divinity: Twilight Sanctuary Feature Item from Dusk Actor.
    1. Draged and Droped Feature Item Channel Divinity: Twilight Sanctuary from Tablerules Items Compendium onto Actor Dusk.
    1. Draged and droped Actor Dusk Token on Canvs (Port N.).
1. Testing with User
    1. Connected Jorrick.
    1. GM: Ended Combat in Wildspace.
    1. GM: Activated Scene Port N.
    1. Jorrick: Dropped Jorrick Actor onto Port N.
    1. GM: Added Actor Jorrick Token (Jorrick) and Actor Dusk Token (Dusk) to combat.
    1. GM: Unpause Game.
    1. Jorrick: Move Actor Jorrick Token (Jorrick) more than 30ft away from Actor Dusk Token (Dusk).
    1. GM: use Channel Divinity: Twilight Sanctuary by using the Dice controll on the Dusk Character Sheet.
    1. GM: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to Control Bar.
    1. GM: Used the Macro `Twilight Sanctuary tHP`. Gave Dusk `hp.temp` and told us about it in Chat.
    1. GM: Advanced Turn.
    1. Jorrick: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to your Control Bar.
    1. Jorrick: Checked that you are more than 30ft away from Dusk. Used the Macro `Twilight Sanctuary tHP`. There was a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Moved Jorrick just completely into the `token-aura`, changed `elevation` to 25ft.
    1. Jorrick: Used the Macro `Twilight Sanctuary tHP`. There was a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Moved Jorrick directly above Dusk.
    1. Jorrick: Used the Macro `Twilight Sanctuary tHP`. Give Jorrick `hp.temp` and told us about it in Chat.
    1. GM: Advanced Turns for 10 Turns. The Aura and the `Effect` `Channel Divinity: Twilight Sanctuary` seemed to be removed from Dusk.
    1. Jorrick: Used the Macro `Twilight Sanctuary tHP`. Checked that there was a `ui.notifications.error` message informing me that Jorrick did not find a Twilight Cleric (yeah, the message is not ideal).



# Update on Prod

1. Create Backup
    1. Make sure you are looking at the correct Production folder.
    1. Make sure there is no zip-file with the same name as the folder.
    1. Zip the Production folder.
1. Preparatory Housekeeping
    1. Uninstall CPR.
    1. Restart FVTT.
1. FVTT Update
    1. Update FVTT to 10.290.
    1. Restart FVTT.
    1. Open Console F12.
1. Updating all Modules
    1. Update all Modules.
    1. Check Console.
    1. Review Messages (expected incompatibility warnings from [magicitems and ?, which two are that, integration test?]).
1. Adopt new Modules
    1. Install Item-Macro Module (1.8.0).
    1. Install Effect-Marco Module (10.0.7).
    1. Activate Item-Macro and Effect-Macro.
1. Improve Settings
    1. Change MidiQOL -> Misc -> `Show Item details in chat card` to `Details: NPC + PC` (this is not what is sounds like. Without this `Item.use()` does not display `description` which is generally bad).
    1. Change Item-Macro -> `Character Sheet Hook` to activated (I do not believe this Module does anything without that?).
    1. Change Core -> Open Permission Configuration -> `Use File Browser` to activated for all roles (without the players cannot assign icons to their Macros). One might consider keeping uploading images disabled as it is, but picking one that is already available should be allowed as long as Users are allowed to use `Script Macros` which we need for lots of stuff we are currently doing and will be doing.
    1. Make Jorrick Trusted Player.
1. Twilight Sanctuary
    1. Open Actor Dusk.
    1. Delete Channel Divinity: Twilight Sanctuary Feature Item from Dusk Actor.
    1. Drag and Drop Feature Item Channel Divinity: Twilight Sanctuary from Tablerules Items Compendium onto Actor Dusk.
    1. Drag Actor Dusk Token on Canvs (Port N.).
1. Testing with User
    1. Connect Jorrick.
    1. GM: End Combat in Wildspace.
    1. GM: Activate Scene Port N.
    1. Jorrick: Drop Jorrick Actor onto Port N.
    1. GM: Add Actor Jorrick Token (Jorrick) and Actor Dusk Token (Dusk) to combat.
    1. GM: Unpause Game.
    1. Jorrick: Move Actor Jorrick Token (Jorrick) more than 30ft away from Actor Dusk Token (Dusk).
    1. GM: Advance to Dusk's Turn if necessary
    1. GM: use Channel Divinity: Twilight Sanctuary by using the Dice controll on the Dusk Character Sheet.
    1. GM: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to your Control Bar (yeah this, should probably be a two players connected test...)
    1. GM: Use the Macro `Twilight Sanctuary tHP`. Should give Dusk `hp.temp` and tell us about it in Chat.
    1. GM: Advance Turn.
    1. Jorrick: Put the Macro `Twilight Sanctuary tHP` from the Tablerules Macro Compendium to your Control Bar.
    1. Jorrick: Check that you are more than 30ft away from Dusk. If not fix it. Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Move Jorrick just completely into the `token-aura`, but change `elevation` to 25ft.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.warn` message informing you that Jorrick is to far away.
    1. Jorrick: Move Jorrick directly above Dusk.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Should give Jorrick `hp.temp` and tell us about it in Chat.
    1. GM: Advance Turns for 10 Turns. The Aura and the `Effect` `Channel Divinity: Twilight Sanctuary` should (seem to [aura is size 0]) be removed from Dusk.
    1. GM: Advance Turn to Jorrick.
    1. Jorrick: Use the Macro `Twilight Sanctuary tHP`. Check that there is a `ui.notifications.error` message informing you that Jorrick did not find a Twilight Cleric (yeah, the message is not ideal).
1. Mighty Summoner
    1. Install tr-summons.
    1. Put Mighty Summoner Macro into Control Bar.
    1. Put Cycle Wildcard Token into Control Bar.
    1. Configure an Elk.
        1. Set Prototype Token => `dispostion=1`.
        1. Set Prototype Token to random Wildcard art.
        1. Set Prototype Token to use `modules/tr-summons/icons/elk/disc/*`.
    1. Test summoning Elk.
        1. Drag and Drop an Elk (the modified one).
        1. Use Macro Mighty Summoner.
        1. Copy and Paste empowered Elk.
        1. Use Macro Cycle Wildcard Token.
