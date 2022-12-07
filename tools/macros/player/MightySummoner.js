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

if (canvas.tokens.hover.document.disposition !== 1) {// guess your own summons should always be friendly
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} is not friendly: ${canvas.tokens.hover.document.disposition}.`);
    return;
}

const rollFormula = game.actors.find(a => a._id === canvas.tokens.hover.document.actorId).system.attributes.hp.formula;
console.log({ message: macroLabel, rollFormula: rollFormula });
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

await actor.update({ "system.attributes.hp.value": actor.system.attributes.hp.value + 2 * hitDice, "system.attributes.hp.max": actor.system.attributes.hp.max + 2 * hitDice });

const items = actor.items.filter(i => i.type === "weapon");

for (i = 0; i < items.length; i++) {
    const changes = items[i].system.properties;
    changes.mgc = true;
    await items[i].update({ "system.properties": changes });
}


// ChatMessage