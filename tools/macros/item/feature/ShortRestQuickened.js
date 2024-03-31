if (item.system.uses.max !== Math.ceil(actor.system.attributes.prof) / 2) {
    const difference = item.system.uses.max - item.system.uses.value;
    await item.update({ "system.uses.max": Math.ceil(actor.system.attributes.prof) / 2, "system.uses.value": Math.max(Math.ceil(actor.system.attributes.prof) / 2 - difference, 0) });
}

const { value } = item.system.uses.value;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

if (actor.items.find(i => i.name === "Short Rest").system.uses.value < 1) {
    ui.notifications.warn("No Short Rests left.");
    return;
}

item.use({}, { skipItemMacro: true })