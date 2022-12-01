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

const castLevel = effect.flags["effective-transferral"].castData.castLevel;

const changes = effect.changes;
const tempmax = castLevel * 5 - 5;
changes[0].value = tempmax;

await effect.update({ changes: changes });
await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + tempmax });

/*
const changes = effect.changes;
changes[0].value = effect.flags["effective-transferral"].castData.castLevel * 5 - 5;

await effect.update({ changes: changes });
await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + changes[0].value });
*/