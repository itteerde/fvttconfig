# ToDo

1.  Update Foundry
1.  Get rid of DAE, Times-Up and Item-Containers
1.  Update Modules


# How To

## ToA

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



# Notes

*   `canvas.tokens.controlled[0].actor.items.filter(i => i.flags.itemcollection !== undefined)` allows checking the selected token (one) for trash remaining from Item-Containers. I think we should keep it as is and just let if fade away with setting up new worlds.
    ```js
    let numberOfItemsWithTrash = 0;
    game.actors.contents.forEach((a) => {
        numberOfItemsWithTrash += a.items.filter(i => i.flags.itemcollection !== undefined).length;
    });
    numberOfItemsWithTrash;
    ```
    counts the items carrying trash in the world (172 for ToA).
*   Leaving the trash in for existing worlds also allows to check on console like if there was money forgotten.