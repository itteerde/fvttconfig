/**
 * https://www.dndbeyond.com/classes/druid#CircleoftheShepherd => Mighty Summoner
 * 
 * icon suggestion: icons/magic/control/debuff-energy-hold-levitate-green.webp
 * 
 * Create one valid target, hit with Macro, copy and paste (Tokens appear on cursor).
 * 
 */

const icon = "icons/magic/control/debuff-energy-hold-levitate-green.webp";
const label = Tablerules.dictionary.class.druid.shepherd.features.mightySummoner.label;
const macroLabel = Tablerules.dictionary.class.druid.shepherd.features.mightySummoner.label;

actor = canvas.tokens.hover?.actor;

if (canvas.tokens.hover === null) {
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target.`);
    return;
}

const rollFormula = game.actors.find(a => a._id === canvas.tokens.hover.document.actorId).system.attributes.hp.formula;
if (rollFormula === undefined) {
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target.`);
    return;
}

const hitDice = new Roll(rollFormula).evaluate({ async: false }).dice.map(d => d.number).reduce((previousValue, currentValue) => previousValue + currentValue);

const effectData = { icon, label };
const effect = actor.effects.find(e => e.getFlag("world", Tablerules.dictionary.class.druid.shepherd.features.mightySummoner.key));
foundry.utils.setProperty(effectData, `flags.world.${Tablerules.dictionary.class.druid.shepherd.features.mightySummoner.key}`, true);
foundry.utils.setProperty(effectData, "flags.core.statusId", Tablerules.dictionary.class.druid.shepherd.features.mightySummoner.label);
if (effect) {
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} already mightily empowered.`);
    return;
}
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + 2 * hitDice });

const items = actor.items.filter(i => i.type === "weapon");

function setMagical(item) {
    const changes = item.system.properties;
    changes.mgc = true;
    item.update({ "system.properties": changes });
}
items.forEach(setMagical);

console.log(items);


// ChatMessage