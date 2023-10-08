const apValue = 1;
const zone = "body"; //or "head"

canvas.tokens.controlled.forEach(token => {
    const actor = token.actor;
    actor._ablateArmor(zone, apValue);
    ChatMessage.create({ content: `${actor.name}: ablating armor (${zone}) by ${apValue}` });
});