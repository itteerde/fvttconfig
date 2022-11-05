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

const effect = actor.effects.find(e => e.getFlag("world", "guidance"));
const current = effect?.getFlag("world", "guidance.timesSinceLongRest") ?? 0;

const max = CONFIG.Tablerules?.guidance?.maxTimesPerLongRest ?? 1;

if (current >= max) {
    ui.notifications.warn(`${macroLabel}, maximum numbers per Long Rest: ${max}, current: ${current}. ${actor.name} at cooldown.`);
    ChatMessage.create({ content: `${macroLabel}, maximum numbers per Long Rest: ${max}, current: ${current}. ${actor.name} cooldown.`, flavor: macroLabel });
    return;
}

const effectData = { icon, label };
foundry.utils.setProperty(effectData, "flags.world.guidance.timesSinceLongRest", current + 1);
foundry.utils.setProperty(effectData, "flags.dae.specialDuration", ["longRest"]);

if (effect) return effect.update(effectData);
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

new Roll("1d4", actor.getRollData()).toMessage({ speaker: actor.name, flavor: macroLabel });