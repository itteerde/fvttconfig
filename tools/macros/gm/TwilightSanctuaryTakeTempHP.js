/* 
    icon suggestion: icons/magic/light/light-lantern-lit-white.webp
    source: https://github.com/itteerde/fvttconfig/blob/main/tools/macros/gm/TwilightSanctuaryTakeTempHP.js
    discussion: https://github.com/itteerde/fvttconfig/issues/29

    I think I like the version where the Cleric player gets the `Effect` (that can create the `Aura` [either already or once we adopt `Effect Macro` which we'll test]) for having the `Twilight Sanctuary` active, maybe being applied by hitting the `Feature` (think we have that possibility already). All players get another `Macro` `Take Twilight Sanctuary HP` that looks for the active `Twilight Sanctuary` (everyone can read everything through code, just not save changes non-locally, so everyone can find the source in order to read their Cleric-Level), `Roll` and upgrade their own `Actor.system.attributes.hp.temp`.

    We do not let the Cleric player give the temp hp as that would require socket registering and programming or warpgate in order to modify an `Actor` the `User` does have the prvileges to modify.
*/

const macroLabel = "Channel Divinity: Twilight Sanctuary tempHP";
const sourceLabel = "Channel Divinity: Twilight Sanctuary";

//get the source Twilight Cleric
const twilightClericPCs = canvas.tokens.placeables.filter(t => {
    if (t.actor.type !== "character")
        return;
    if (!t.actor.items.find(i => i.name === "Twilight Domain"))
        return;
    return t.actor.effects.find(e => e.label === "Channel Divinity: Twilight Sanctuary");
});
console.log(twilightClericPCs);

if (twilightClericPCs.length === 0) {
    ui.notifications.error(
        `${macroLabel}, ${twilightClericPCs.length} Twilight Clerics found.`,
        { permanent: true }
    );
    return;
}

// check validity of source, maybe enforce hover if it is not?
if (twilightClericPCs.length !== 1) {
    ui.notifications.warn(
        `${macroLabel}, ${twilightClericPCs.length} Twilight Clerics found. Expected 1 and only 1.`,
        { permanent: true }
    );
}


// target?
if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.error(`${macroLabel}, ${canvas.tokens.controlled.length} Actors selected. Select 1 and only 1.`, { permanent: true });
    return;
}

if (actor.type !== "character") {
    ui.notifications.error(`${macroLabel}, Actor selected is type:${actor.type}. Select a character.`);
    return;
}

console.log({ target: actor, name: actor.name, id: actor._id });


// check distance
const tokenSource = twilightClericPCs[0]; // this is not sound, there should be logid to chose if there are more than one.

const tokenTarget = canvas.tokens.placeables.find(t => t.actor._id === actor._id); // also not sound technically. There might be more than one Token for the same correct Actor, and not all might be in range.

const cleric = tokenSource.actor;
const clericLevel = cleric.items.filter(i => i.type === "class").find(c => c.name === "Cleric").system.levels;

const distance = Math.round(canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }) * 5);
console.log({ message: "distance", distance: distance });
if (distance > 30) {
    ui.notifications.warn(
        `Distance between ${cleric.name} and ${actor.name} is ${distance}. Expected distance<=30.`,
        { permanent: true }
    );

    return;
}

// create the Roll
const roll = await new Roll(`1d6+${clericLevel}`, actor.getRollData()).evaluate({ async: true })

// create the ChatMessage
await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: cleric.name }), flavor: `granting temporary hit points by ${macroLabel}` });

// upgrade hp.temp