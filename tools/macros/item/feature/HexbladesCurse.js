/**
 * Item-Macro Effect for the Hexblade's Curse Feature Item
 * 
 * icon suggestion: icons/magic/death/projectile-skull-flaming-green.webp
 */

const label = "Hexblade's Curse";
const macroLabel = "Hexblade's Curse";
const icon = "icons/magic/death/projectile-skull-flaming-green.webp";

if ((await item.use()) === null) {
    return;
}

const changes = [
    { key: "system.bonuses.All-Damage", value: `+${actor.system.attributes.prof}`, mode: 2, priority: 20 },
    { key: "flags.dnd5e.spellCriticalThreshold", value: 19, mode: 5, priority: 20 },
    { key: "flags.dnd5e.weaponCriticalThreshold", value: 19, mode: 5, priority: 20 }
];

const effect = actor.effects.find(e => e.getFlag("world", label));
const effectData = { changes, icon, label, duration: { seconds: 60 } };
foundry.utils.setProperty(effectData, `flags.world.${label}`, true);

if (effect) { effect.update(effectData); }
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}