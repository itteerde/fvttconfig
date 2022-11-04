// icon suggestion: icons/magic/control/buff-flight-wings-blue.webp
const icon = "icons/magic/control/buff-flight-wings-blue.webp";
const label = "Guidance";
const macroLabel = "Guidance One D&D";

if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`${macroLabel}, ${canvas.tokens.controlled.length} Actors selected. Select 1 and only 1.`, { permanent: true });
    return;
}

if (actor.type !== "character") {
    ui.notifications.warn(`${macroLabel}, Actor selected is type:${actor.type}. Select a character.`);
    return;
}

/*
const effect = actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.guidance.timesSinceLongRest"));
const current = effect?.getFlag("world", "guidance", "timesSinceLongRest") ?? 0;
*/

const effect = actor.effects.find(e => e.getFlag("world", "guidance"));
const current = effect?.getFlag("world", "guidance.timesSinceLongRest") ?? 0;

console.info({ "current": current });

//const max = foundry.utils.hasProperty(CONFIG, "Tablerules.guidance.maxTimesPerLongRest") ? CONFIG.Tablerules.guidance.maxTimesPerLongRest : 1;
const max = CONFIG.Tablerules?.guidance?.maxTimesPerLongRest ?? 1;

console.info({ "max": max });

if (current >= max) {
    ui.notifications.warn(`${macroLabel}, maximum numbers per Long Rest: ${max}, current: ${current}. ${actor.name} at cooldown.`);
    ChatMessage.create({ content: `${macroLabel}, maximum numbers per Long Rest: ${max}, current: ${current}. ${actor.name} cooldown.`, flavor: macroLabel });
    return;
}

const effectData = { icon, label };
foundry.utils.setProperty(effectData, "flags.world.guidance.timesSinceLongRest", current + 1);
if (effect) return effect.update(effectData);
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

new Roll("1d4", actor.getRollData()).toMessage({ flavor: macroLabel });
