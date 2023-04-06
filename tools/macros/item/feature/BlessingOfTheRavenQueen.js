if (item.system.uses.max != actor.system.attributes.prof) {
    await item.update({ "system.uses.max": actor.system.attributes.prof, "system.uses.value": Math.min(item.system.uses.value, actor.system.attributes.prof) });
}

const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

item.use();