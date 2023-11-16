const actor = game.actors.get("7YkumVViRlXYhNtM");

const tmpHP = Math.floor(Math.random() * 6) + 1 + actor.classes.cleric.system.levels;
let reportString = "";
canvas.tokens.controlled.forEach(t => {
    t.actor.update({ "system.attributes.hp.temp": Math.max(t.actor.system.attributes.hp.temp, tmpHP) });
    reportString += t.actor.name + ", ";
});

ChatMessage.create({ content: `Twilight Sanctury for ${tmpHP}: ${reportString.slice(0, -2)}` });