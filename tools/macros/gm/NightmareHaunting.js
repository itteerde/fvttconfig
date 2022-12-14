// icon suggestion: icons/magic/death/hand-withered-gray.webp
const icon = "icons/magic/death/hand-withered-gray.webp";
const label = "Nightmare Haunting";
const macroLabel = "Nightmare Haunting";


if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`${macroLabel}, ${canvas.tokens.controlled.length} Actors selected. Select 1 and only 1.`, { permanent: true });
    return;
}

if (actor.type !== "character") {
    ui.notifications.warn(`${macroLabel}, Actor selected is type:${actor.type}. Select a character.`);
    return;
}

const effect = actor.effects.find(e => e.getFlag("world", "NightmareHaunting"));
const current = effect?.getFlag("world", "NightmareHaunting") ?? 0;

const roll = await new Roll("1d10", actor.getRollData()).evaluate({ async: true })
await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: actor.name }), flavor: macroLabel });

const hauntingDamage = current - roll.total;

const keys = ["system.attributes.hp.max"];
const changes = keys.map(key => {
    return { key, mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: hauntingDamage };
});
const effectData = { changes, icon, label };
foundry.utils.setProperty(effectData, "flags.world.NightmareHaunting", hauntingDamage);

if (effect) {
    await effect.update(effectData);
} else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}


if (actor.system.attributes.hp.value > actor.system.attributes.hp.max) {
    await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.max });
}

