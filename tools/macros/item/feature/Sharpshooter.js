/**
 * Item-Macro Macro for Sharpshooter
 * 
 * https://www.dndbeyond.com/feats/Sharpshooter
 */

const macroLabel = "Sharpshooter";
const icon = "icons/skills/ranged/arrow-flying-white-blue.webp";
const flagKey = "flags.world.sharpShooter";

// use the Item in order to check for resources if there are any, and have it create the ChatMessage
/* don't this is to much spam for no good reason for GWM/ Sharpshooter
if ((await item.use()) === null) {
    return;
}
*/


// check if there is an ActiveEffet on the Actor
const effect = actor.effects.find(e => foundry.utils.hasProperty(e, flagKey));

if (effect) {
    // toggle the ActiveEffect
    await effect.update({ disabled: !effect.disabled });
    return;
}


// create the ActiveEffect if not present
const changes = [
    { key: "system.bonuses.rwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: -5 },
    { key: "system.bonuses.rwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: +10 }
];
const effectData = { changes, icon, label: macroLabel };
foundry.utils.setProperty(effectData, flagKey, true);
foundry.utils.setProperty(effectData, "flags.core.statusId", macroLabel);

await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

