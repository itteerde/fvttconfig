// icon suggestion: icons/creatures/mammals/cat-hunched-glowing-red.webp
const icon = "icons/creatures/mammals/cat-hunched-glowing-red.webp";
const label = "Shifting";
const macroLabel = "Shifting";

const keys = [
    "system.bonuses.abilities.save"
];
const effect = actor.effects.find(e => e.getFlag("world", "Shifting: Beasthide")); // do colon and whitespace work?

const effectData = { icon, label };



const uuid = canvas.tokens.controlled[0].actor.uuid;
const hasEffectApplied = await game.dfreds.effectInterface.hasEffectApplied("Shifting", uuid);

if (canvas.tokens.controlled[0].actor.effects.find(e => e.label === "Shifting") === "undefined") {
    game.dfreds.effectInterface.addEffect("Shifting");
}

const tempHPRoll = await new Roll("@details.level + 1d6 + @abilities.con.mod", actor.getRollData()).toMessage();

await actor.update({ "system.attributes.hp.temp": Math.max(Number(tempHPRoll.content), actor.system.attributes.hp.temp) });

game.dfreds.effectInterface.toggleEffect("Shifting");