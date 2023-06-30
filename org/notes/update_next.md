# TODO

1. Establish agreement on having sufficient backups, local zips of current are sufficient.
1. Remember that every step of copying, let alone overwriting, files should only happen with no instance of FVTT running.
1. Esablish clarity about necessity of, and agree on method to achieve, certainty of overwriting the right direction every time.


# Setup

1. Check Disk Space.
1. Node.js
1.1 Check if Node.js is installed, and if so if it is a reasonably current LTS version (18.x.x), ( https://nodejs.org/en ).
1. Download required FVTT versions for Node.js.
1.1 Version 10, latest
1.1 Version 11, latest
1. File System
    1. Create fvtt directory directly under your drive of choice (remember, path lenght problems).
    1. Create 10 directory within fvtt directory.
        1. Create code directory within 10 directory.
        1. Create data directory within 10 directory.
        1. Copy version 10 zip file contents into code directory (make sure to not nest top level from zip).
    1. Create 11 directory within fvtt directory.
        1. Create code directory within 11 directory.
        1. Create data directory within 11 directory.
        1. Copy version 11 zip file contents into code directory (make sure to not nest top level from zip).
1. Make run.bat file ( New textfile in Explorer, run.bat [check if it really is or if the extensions being hidden makes it run.bat.txt] node code/resources/app/main.js --port=30000 --dataPath=data ).
1. Run FVTT ( node code/resources/app/main.js --port=30000 --dataPath=data ) ( needs to be done not just for seeing if it works and entering license, but also to setup the empty directory structure, so do it! ).


# Setting Up A Game

1. Create the game folder within the proper version directory, such as creating a sj folder within the 11 folder.
1. Copy the code and data folders and the run.bat into the game folder such as sj.
1. Overwrite the games Data folder such as fvtt/11/sj/data/Data with the backup's Data folder.


# V10 Worlds

1. Do Setting Up A Game setup for every v10 game.


# World Migration

## SJ

1. Overwrite the game's Data directory in the new v11 game directors such as fvtt/11/toa/data/Data with Data from backup.
1. Start FVTT and open the chrome browser client (client).
1. Under Game Systems Check For Update of the DnD5e - Fifth Edition System ( note that "checking" means updating if there is any ).
1. Start the World. Begin Migration ( be patient, do not do anything before agreement that migration is complete has been confirmed ).
1. Login as Gamemaster. The extensive parts of migration starts now automatically ( be patient, do not do anything before agreement that migration is complete has been confirmed, this time it will take time... ).
1. Review the errors ( it is expected that there are numerous compendium migration errors of which a few should be checked and their impact estimated ).
1. Return to Setup.
1. Add-on Modules update Tablerules only (removes Magical Items dependency).
1. Add-on Modules delete Magical Items.
1. Add-on Modules, Update All. Confirm switching to moved Modules. An error with Magic Items is expected.
1. Try Update All again until only the Magic Items error remains ( expected once ).
1. Start the World.
1. Activate all Modules except Compendium Folders.
1. FXMaster should migrate without displaying errors.
1. Return to Setup.
1. Delete Compendium Folders.
1. Start the World.

### Testing


## ToA

1. Overwrite the game's Data directory in the new v11 game directors such as fvtt/11/toa/data/Data with Data from backup.
1. Start FVTT and open the chrome browser client (client).
1. Under Game Systems Check For Update of the DnD5e - Fifth Edition System ( note that "checking" means updating if there is any ).
1. Start the World. Begin Migration ( be patient, do not do anything before agreement that migration is complete has been confirmed ).
1. Login as Gamemaster. The extensive parts of migration starts now automatically ( be patient, do not do anything before agreement that migration is complete has been confirmed, this time it will take time... ).
1. Review the errors ( it is expected that there are numerous compendium migration errors of which a few should be checked and their impact estimated ).
1. Return to Setup.
1. Add-on Modules update Tablerules only (removes Magical Items dependency).
1. Add-on Modules delete Magical Items.
1. Add-on Modules, Update All. Confirm switching to moved Modules. An error with Magic Items is expected.
1. Try Update All again until only the Magic Items error remains ( expected once ).
1. Start the World.
1. Activate all Modules except Compendium Folders.
1. FXMaster should migrate without displaying errors.
1. Return to Setup.
1. Delete Compendium Folders.
1. Start the World.

### Testing



# Running A Game
1. Open the game's folder in Explorer such as fvtt/11/sj.
1. Double-click run.bat.
