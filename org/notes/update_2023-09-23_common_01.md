# ToDo

1.  Update Foundry
1.  Get rid of DAE, Times-Up and Item-Containers
1.  Update Modules


# How To

## ToA

### Considerations

1.  There is a second party in ToA. Does it need to be checked?

### Update

1.  Update FVTT. *We do this first, even before checking the in-game preparations, to have that checking already be some very basic testing.*
    1.  Start Server, ToA instance.
    1.  Update. *This is just downloading and replacing in file system, nothing to monitor. The server is shut down for the replacement automatically.*
    1.  Start Server, ToA instance.
    1.  Open Console.
    1.  Launch World. *Does migrate, but does not do any meaningful migration. Suspect to see nothing more than the popup telling one that it is doing the migration step.*
1.  Drop Item-Containers. *We are currently in the running world.*
    1.  Move Obliec's Backpack's contents to their Gear Actor.
    1.  Return to Setup.
    1.  Uninstall Item Containers.
1.  Drop DAE.
    1.  Uninstall Dynamic effects using Active Effects.
1.  Drop Times Up.
    1.  Uninstall Times Up.
1.  Update Modules.
    1.  Update All. *Should report having updated DDB-Importer, Simple Calendar, Monk's Combat Details.*
1.  Launch World.


## SJ

### Considerations

1.  There is a second party in SJ. Does it need to be checked?

### Update

1.  Update FVTT. *We do this first, even before checking the in-game preparations, to have that checking already be some very basic testing.*
    1.  Start Server, SJ instance.
    1.  Update. *This is just downloading and replacing in file system, nothing to monitor. The server is shut down for the replacement automatically.*
    1.  Start Server, SJ instance.
    1.  Open Console.
    1.  Launch World. *Does migrate, but does not do any meaningful migration. Suspect to see nothing more than the popup telling one that it is doing the migration step.*
1.  Drop Item-Containers. *We are currently in the running world.*
    1.  Return to Setup.
    1.  Uninstall Item Containers.
1.  Drop DAE.
    1.  Uninstall Dynamic effects using Active Effects.
1.  Drop Times Up.
    1.  Uninstall Times Up.
1.  Drop Tablerules Summons.
    1. Uninstall Tablerules Summons.
1.  Update Modules.
    1.  Update All. *Should report having updated DDB-Importer, Simple Calendar, Monk's Combat Details.*
1.  Launch World.


## DL

### Considerations

### Update

1.  Update FVTT. *We do this first, even before checking the in-game preparations, to have that checking already be some very basic testing.*
    1.  Start Server, DL instance.
    1.  Update. *This is just downloading and replacing in file system, nothing to monitor. The server is shut down for the replacement automatically.*
    1.  Start Server, DL instance.
    1.  Open Console.
    1.  Launch World. *Does migrate, but does not do any meaningful migration. Suspect to see nothing more than the popup telling one that it is doing the migration step.*
1.  Drop Item-Containers. *We are currently in the running world.*
    1.  Move Eknoro's Backpack's Items into his Gear Actor.
    1.  Move Teagan's Toolbag of Holding's money into his Gear Actor.
    1.  Return to Setup.
    1.  Uninstall Item Containers.
1.  Drop DAE.
    1.  Uninstall Dynamic effects using Active Effects.
1.  Drop Times Up.
    1.  Uninstall Times Up.
1.  Update Modules.
    1.  Update All. *Should report having updated DDB-Importer, Simple Calendar, Monk's Combat Details.*
1.  Launch World.


## EB

### Considerations

### Update

1.  Update FVTT. *We do this first, even before checking the in-game preparations, to have that checking already be some very basic testing.*
    1.  Start Server, EB instance.
    1.  Update. *This is just downloading and replacing in file system, nothing to monitor. The server is shut down for the replacement automatically.*
    1.  Start Server, EB instance.
    1.  Open Console.
    1.  Launch World. *Does migrate, but does not do any meaningful migration. Suspect to see nothing more than the popup telling one that it is doing the migration step.*
1.  Drop Item-Containers. *We are currently in the running world.*
    1.  Keep in mind that Zalret has money in his Sack that might or might not have been added to his Actor's money, ask. If it was not: 76pp, 100gp.
    1.  Return to Setup.
    1.  Uninstall Item Containers.
1.  Drop DAE.
    1.  Uninstall Dynamic effects using Active Effects.
1.  Drop Times Up.
    1.  Uninstall Times Up.
1.  Update Modules.
    1.  Update All. *Should report having updated DDB-Importer, Simple Calendar, Monk's Combat Details.*
1.  Launch World.



# Notes

*   `canvas.tokens.controlled[0].actor.items.filter(i => i.flags.itemcollection !== undefined)` allows checking the selected token (one) for trash remaining from Item-Containers. I think we should keep it as is and just let it fade away with setting up new worlds.
    ```js
    let numberOfItemsWithTrash = 0;
    game.actors.contents.forEach((a) => {
        numberOfItemsWithTrash += a.items.filter(i => i.flags.itemcollection !== undefined).length;
    });
    numberOfItemsWithTrash;
    ```
    counts the items carrying trash in the world (172 for ToA).
*   Leaving the trash in for existing worlds also allows to check on console like if there was money forgotten.
*   This seems to be a good opportunity to stress the point of never trying out any module with the real game server, as it cannot just destroy everything (that is actually the minor part as one would hope one would have done the backup before trying out shit), but also will almost certainly leave behind trash (and without a proper process one would expect not to restore from backup in such a case after having the look at the module one was interested in). Instead for trying out anything **always** do a copy (with server shut down), and try shit out in the throw away copy. If it looks promising there put it into the pipeline to be tested by Erik or Tyler (who can look into technical impact that might be impossible to see without looking at code), and get it a bit later, but with much reduced risks for the table being unable to properly play the game.
*   There was an invalid combatant in DL, that I'd like to ignore until it bites us. In the past those were self-healing simply by combats ending/ starting.