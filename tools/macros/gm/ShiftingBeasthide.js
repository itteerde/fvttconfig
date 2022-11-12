// icon suggestion: icons/creatures/mammals/cat-hunched-glowing-red.webp
const icon = "icons/creatures/mammals/cat-hunched-glowing-red.webp";
const label = "Shifting";
const macroLabel = "Shifting";

console.log(actor);
await item.use();



const changes = [
    { key: "system.attributes.ac.bonus", value: "+1", mode: 2, priority: 20 }
];

const effect = actor.effects.find(e => e.getFlag(Tablerules.dictionary.race.shifter.features.shiftingBeasthide.scope, Tablerules.dictionary.race.shifter.features.shiftingBeasthide.key));

const current = effect?.getFlag(Tablerules.dictionary.race.shifter.features.shiftingBeasthide.scope, Tablerules.dictionary.race.shifter.features.shiftingBeasthide.key) ?? false;
const effectData = { changes, icon, label };


if (effect) { effect.update(effectData); }
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}