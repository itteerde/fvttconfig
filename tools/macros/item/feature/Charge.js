/**
 * Item-Macro Effect for the Charge/Pounce Feature Item
 * 
 * icon suggestion: icons/creatures/mammals/ox-bull-horned-glowing-orange.webp
 */

const label = "Charge";
const macroLabel = "Charge";
const icon = "icons/creatures/mammals/ox-bull-horned-glowing-orange.webp";

if (await item.use() === null) {
    return;
}

const changes = [
    { key: "system.bonuses.weapon.damage", value: "+2d6", mode: 2, priority: 20 }
];

const effect = actor.effects.find(e => e.getFlag("world", label));
const effectData = { changes, icon, label, duration: { seconds: 6 } };
foundry.utils.setProperty(effectData, `flags.world.${label}`, true);

if (effect) { effect.update(effectData); }
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}