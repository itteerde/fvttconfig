const icon = item.img;
const label = item.name;

if ((await item.use()) === null) {
    ui.notifications.warn(`${label} has no uses left.`);
    return;
}

const changes = [
    { key: "system.attributes.ac.bonus", value: "+1", mode: 2, priority: 20 }
];

const effect = actor.effects.find(e => e.name === label);
const effectData = { changes, icon, label, duration: { seconds: 60 } };

if (effect) { effect.update(effectData); }
else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

const roll = await new Roll(`1d6+${2 * actor.system.attributes.prof}`, actor.getRollData()).evaluate({ async: true })

await roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor: actor.name }), flavor: `getting temporary hit points from ${label}.` });

const currentTempHP = actor.system.attributes.hp.temp !== null ? actor.system.attributes.hp.temp : 0;
const newTempHP = Math.max(roll.total, currentTempHP);

await actor.update({ "system.attributes.hp.temp": newTempHP });