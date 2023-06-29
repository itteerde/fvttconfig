# TODO

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
1. Run FVTT ( node code/resources/app/main.js --port=30000 --dataPath=data ) ( needs to be done not just for seeing if it works and entering license, but also to setup the empty directory structure, so do it! ).
1. Make run.bat file ( New textfile in Explorer, run.bat [check if it really is or if the extensions being hidden makes it run.bat.txt] node code/resources/app/main.js --port=30000 --dataPath=data ).


# Setting Up A Game

1. Create the game folder within the proper version directory, such as creating a sj folder within the 11 folder.
1. Copy the code and data folders and the run.bat into the game folder such as sj.
1. Overwrite the games Data folder such as 11/sj/data/Data with the backup's Data folder.


# Running A Game
1. Open the game's folder in Explorer such as 11/sj.
1. Double-click run.bat.
