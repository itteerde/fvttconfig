if (item.system.uses.max !== actor.system.attributes.prof) {
    const difference = item.system.uses.max - item.system.uses.value;
    await item.update({ "system.uses.max": actor.system.attributes.prof, "system.uses.value": Math.max(actor.system.attributes.prof - difference, 0) });
}

const { value } = item.system.uses.value;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

item.use({}, { skipItemMacro: true })