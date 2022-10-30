// icon suggestion: icons/creatures/mammals/cat-hunched-glowing-red.webp
const uuid = canvas.tokens.controlled[0].actor.uuid;
const hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied("Shifting", uuid);

if (canvas.tokens.controlled[0].actor.effects.find(e => e.label === "Shifting") === "undefined") {
    game.dfreds.effectInterface.addEffect("Shifting");
}

const tempHPRoll = await new Roll("@details.level + 1d6 + @abilities.con.mod", actor.getRollData()).toMessage();

await actor.update({ "system.attributes.hp.temp": Math.max(Number(tempHPRoll.content), actor.system.attributes.hp.temp) });

game.dfreds.effectInterface.toggleEffect("Shifting");