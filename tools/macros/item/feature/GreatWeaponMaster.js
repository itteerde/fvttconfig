/**
 * Item-Macro Macro for Great Weapon Master
 * 
 * https://www.dndbeyond.com/feats/great-weapon-master
 */

const macroLabel = "Great Weapon Master";
const icon = "icons/weapons/axes/axe-battle-skull-black.webp";
const flagKey = "flags.world.greatWeaponMaster";

console.log({ message: `${macroLabel}`, arguments: arguments, item: item });


// use the Item in order to check for resources if there are any, and have it create the ChatMessage
/* don't this is to much spam for no good reason for GWM/ Sharpshooter
if ((await item.use()) === null) {
    return;
}
*/


// check if there is an ActiveEffet on the Actor
const effect = actor.effects.find(e => foundry.utils.hasProperty(e, flagKey));
console.log({ message: `${macroLabel}`, arguments: arguments, effect: effect });


if (effect) {
    // toggle the ActiveEffect
    await effect.update({ disabled: !effect.disabled });
    return;
}


// create the ActiveEffect if not present
const changes = [
    { key: "system.bonuses.mwak.attack", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: -5 },
    { key: "system.bonuses.mwak.damage", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: +10 }
];
const effectData = { changes, icon, label: macroLabel };
foundry.utils.setProperty(effectData, flagKey, true);
foundry.utils.setProperty(effectData, "flags.core.statusId", macroLabel);

await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

