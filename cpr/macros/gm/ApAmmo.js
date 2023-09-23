if (canvas.tokens.controlled[0] === undefined) {

    ui.notifications.warn("No actor token selected", { permanent: true });
    return;
}

const actor = canvas.tokens.controlled[0].actor;
await actor.update({ "system.derivedStats.hp.value": actor.system.derivedStats.hp.value - 2 });

ChatMessage.create({ content: `${actor.name} dealt 2 damage.` });