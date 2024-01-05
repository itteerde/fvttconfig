const macroLabel = "Empowered Spell";
if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`${macroLabel} requires selecting exactly one Token.`);
    return;
}
const actor = canvas.tokens.controlled[0]?.actor;
const maxNumberRerolls = actor.system.abilities.cha.mod;

const mOriginal = game.messages.contents.findLast(m => m.speaker.actor === actor.id);
const empoweredRoll = structuredClone(mOriginal.rolls[0]);
const roll = empoweredRoll.terms[0].results.map(r => r.result).sort();
const rerollThreshold = (mOriginal.rolls[0].dice[0].faces + 1) / 2;
for (let i = 0; i < maxNumberRerolls; i++) {
    if (roll[i] < rerollThreshold) {
        roll[i] = Math.floor(Math.random() * (mOriginal.rolls[0].dice[0].faces - 1 + 1) + 1);
    }
}

const rolls = mOriginal.rolls;
console.log({ rolls: rolls });
rolls[0].results = rolls[0].results.map((r, i) => { return { result: r, active: true } });

ChatMessage.create({
    speaker: mOriginal.speaker,
    content: roll.reduce((acc, n) => { return acc + n }, 0),
    flavor: mOriginal.flavor + `, ${macroLabel}`,
    sound: mOriginal.sound,
    rolls: rolls,
    flags: mOriginal.flags,
    type: mOriginal.type
})
