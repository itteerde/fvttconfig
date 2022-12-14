// icon suggestion: icons/magic/death/undead-ghosts-trio-blue.webp

const icon = "icons/magic/death/undead-ghosts-trio-blue.webp";
const macroLabel = "Stress Plus One";
const label = "Stress";
const changeBy = 1;

const keys = [
    "system.bonuses.abilities.save",
    "system.bonuses.abilities.check",
    "system.bonuses.mwak.attack",
    "system.bonuses.rwak.attack",
    "system.bonuses.msak.attack",
    "system.bonuses.rsak.attack"
];

actor = canvas.tokens.hover?.actor;

if (canvas.tokens.hover === null) {
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target.`);
    return;
}

const effect = actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"));
const current = effect?.getFlag("world", "stress") ?? 0;
const stress = Number(Math.max(current + changeBy, 0));
const changes = keys.map(key => {
    return { key, mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: `-${stress}` };
});
const effectData = { changes, icon };
foundry.utils.setProperty(effectData, "label", `${label}: ${stress}`);
foundry.utils.setProperty(effectData, "flags.world.stress", stress);
if (effect) {
    await effect.delete();
}

if (stress > 0) {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}