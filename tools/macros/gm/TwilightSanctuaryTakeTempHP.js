/* 
    icon suggestion: icons/magic/light/light-lantern-lit-white.webp
    source: https://github.com/itteerde/fvttconfig/blob/main/tools/macros/gm/TwilightSanctuaryTakeTempHP.js

    I think I like the version where the Cleric player gets the `Effect` (that can create the `Aura` [either already or once we adopt `Effect Macro` which we'll test]) for having the `Twilight Sanctuary` active, maybe being applied by hitting the `Feature` (think we have that possibility already). All players get another `Macro` `Take Twilight Sanctuary HP` that looks for the active `Twilight Sanctuary` (everyone can read everything through code, just not save changes non-locally, so everyone can find the source in order to read their Cleric-Level), `Roll` and upgrade their own `Actor.system.attributes.hp.temp`.

    We do not let the Cleric player give the temp hp as that would require socket registering and programming or warpgate in order to modify an `Actor` the `User` does have the prvileges to modify.
*/

const macroLabel = "Channel Divinity: Twilight Guidance tempHP";
const sourceLabel = "Channel Divinity: Twilight Guidance";

//get the source Twilight Cleric
const twilightClericPCs = game.actors.filter(a => {
    if (a.type !== "character")
        return;
    return a.items.find(i => i.name === "Twilight Domain");
});
console.log(twilightClericPCs);

// check validity of source, maybe enforce hover if it is not?
if (twilightClericPCs.length !== 1) {
    ui.notifications.warn(
        `${macroLabel}, ${twilightClericPCs.length} Twilight Clerics found. Expected 1 and only 1.`,
        { permanent: true }
    );
}


// target?
console.log({ target: actor, name: actor.name, id: actor._id });


// check distance
const tokenSource = neitherThis;
const tokenTarget = norThis;

const cleric = tokenSource.actor;

const distance = canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }) * 5;
if (distance > 30) {
    ui.notifications.warn(
        `${macroLabel}, ${twilightClericPCs.length} Twilight Clerics found. Expected 1 and only 1.`,
        { permanent: true }
    );

    return;
}

// create the Roll
const clericLevel = 999;
const roll = await new Roll(`1d6+${clericLevel}`, actor.getRollData()).evaluate({ async: true })
await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: cleric.name }), flavor: `granting temporary hit points by ${macroLabel}` });

// create the ChatMessage
// upgrade hp.temp