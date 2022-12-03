/**
 * needs to lookup the spellcasting bonus from the item.
 * 
 * https://www.dndbeyond.com/spells/heroism
 */

const macroLabel = "Heroism";

if (TRUtils.isDebugEnabled()) {
    Tablerules.debug({ message: `${macroLabel}.`, arguments: arguments, effect: effect });
}

//const item = await fromUuid("Actor.2nLfgTKvok1OR4Hq.Item.opKdbNnekhfCbZBJ");
const spellcastingBonus = 3;

await actor.update({ "system.attributes.hp.temp": Math.max(actor.system.attributes.hp.temp, spellcastingBonus) });