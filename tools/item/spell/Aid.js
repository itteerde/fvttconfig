/**
 * https://www.dndbeyond.com/spells/aid
 * 
 * For Effect-Macro to rewrite the changes with benefit of effective-transferral providing 
 *  casstData = {
 *    "origin": "Actor.eRdyUWBs84M14oVO.Item.KHYjNb820TLUEzhU",
 *    "castLevel": 2
 *  }
 *
 * allowing for upcasting-specific changes.
 */

console.log({ message: "Aid Effect-Macro", effect: effect, actor: actor, arguments: arguments });

const label = "Aid";
const icon = "icons/magic/life/heart-cross-strong-blue.webp";


const changes = effect.changes;
changes[0].value = effect.flags["effective-transferral.castData.castLevel"] * 5 - 5;
const effectData = { changes, icon, label };

console.log({ changes: changes, effectData: effectData });

await effect.update({ effectData });
await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + changes[0].value });