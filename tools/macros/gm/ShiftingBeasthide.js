// icon suggestion: icons/creatures/mammals/cat-hunched-glowing-red.webp
const icon = "icons/creatures/mammals/cat-hunched-glowing-red.webp";
const label = "Shifting";
const macroLabel = "Shifting";

console.log(actor);
await item.use();
console.log(item);


const changes = [
    { key: "system.attributes.ac.bonus", value: "+1", mode: 2, priority: 20 }
];

const effect = actor.effects.find(e => e.getFlag(Tablerules.dictionary.race.shifter.features.shiftingBeasthide.scope, Tablerules.dictionary.race.shifter.features.shiftingBeasthide.key));

const current = effect?.getFlag(Tablerules.dictionary.race.shifter.features.shiftingBeasthide.scope, Tablerules.dictionary.race.shifter.features.shiftingBeasthide.key) ?? false;

const effectData = { changes, icon, label, duration: { seconds: 60 } };
foundry.utils.setProperty(effectData, Tablerules.dictionary.race.shifter.features.shiftingBeasthide.key, true);

if (effect) { effect.update(effectData); }
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

const roll = await new Roll(`1d6+${2 * actor.system.attributes.prof}`, actor.getRollData()).evaluate({ async: true })

await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: actor.name }), flavor: `getting temporary hit points from ${Tablerules.dictionary.race.shifter.features.shiftingBeasthide.label}.` });

const currentTempHP = actor.system.attributes.hp.temp !== null ? actor.system.attributes.hp.temp : 0;
const newTempHP = Math.max(roll.total, currentTempHP);
console.log({ message: "newTempHP", temp: newTempHP });

await actor.update({ "system.attributes.hp.temp": newTempHP });