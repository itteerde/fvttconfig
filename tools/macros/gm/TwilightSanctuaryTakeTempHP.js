// icon suggestion: icons/magic/light/light-lantern-lit-white.webp

/* 
    I think I like the version where the Cleric player gets the `Effect` (that can create the `Aura` [either already or once we adopt `Effect Macro` which we'll test]) for having the `Twilight Sanctuary` active, maybe being applied by hitting the `Feature` (think we have that possibility already). All players get another `Macro` `Take Twilight Sanctuary HP` that looks for the active `Twilight Sanctuary` (everyone can read everything through code, just not save changes non-locally, so everyone can find the source in order to read their Cleric-Level), `Roll` and upgrade their own `Actor.system.attributes.hp.temp`.
*/

const macroLabel = "Twilight Guidance tempHP";
const sourceLabel = "Twilight Guidance";

//get the source cleric

const twilightClericPCs = game.actors.filter(a => {
    if (a.type !== "character")
        return;
    return a.items.find(i => i.name === "Twilight Domain");
});
console.log(twilightClericPCs);

// check validity of source, maybe enforce hover if it is not?
if (twilightClericPCs.length !== 1) {
    ui.notifications.warn(
        `${macroLabel}, ${twilightClericPCs.length} TwilightClerics found. Expected 1 and only 1.`,
        { permanent: true }
    );
}


// target?
console.log({ target: actor, name: actor.name, id: actor._id });


// check distance
const tokenSource = neitherThis;
const tokenTarget = norThis;
const distance = canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }) * 5;
if (distance > 30) {
    ui.notifications.warn(
        `${macroLabel}, ${twilightClericPCs.length} TwilightClerics found. Expected 1 and only 1.`,
        { permanent: true }
    );

    return;
}

// upgrade hp.temp