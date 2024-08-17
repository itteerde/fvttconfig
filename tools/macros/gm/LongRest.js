//let players = game.folders.find(f => f.name === "PCs").contents.filter(a => a.type === "character").forEach(pc => {

canvas.tokens.controlled.forEach(t => {

    let item = t.actor.items.find(i => i.name === "Long Rest")
    if (item) {
        item.update({ "system.uses.value": Math.min(item.system.uses.max, item.system.uses.value + 1) });
    } else {
        ui.notifications.warn(`${t.name}: no Long Rest Item found`, { permanent: true });
    }

});;