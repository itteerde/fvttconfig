const rerolls = 5;
const threshold = 5;

function dice(n) {
    return Math.floor(Math.random() * n) + 1;
}

let cm = structuredClone(game.messages.contents.filter(m => m.speaker.actor === game.user.character.id)[game.messages.contents.filter(m => m.speaker.actor === game.user.character.id).length - 1]);
let results = cm.rolls[0].terms[0].results.sort((a, b) => { return (a.result - b.result) });

for (let i = 0; i < rerolls; i++) {
    if (results[i].result < threshold) {
        results[i].result = dice(8);
    }
}

cm.rolls[0].terms[0].results = results;

ChatMessage.create(cm);