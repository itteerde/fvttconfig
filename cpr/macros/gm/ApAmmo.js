canvas.tokens.controlled.forEach(token => {
    const actor = token.actor;
    actor.update({ "system.derivedStats.hp.value": actor.system.derivedStats.hp.value - 2 });
    ChatMessage.create({ content: `${actor.name} dealt 2 damage.` });
});