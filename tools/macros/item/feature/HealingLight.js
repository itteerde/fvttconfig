const warlockLevels = actor.classes.warlock.system.levels;

if (item.system.uses.max != warlockLevels + 1) {
    await item.update({ "system.uses.max": warlockLevels + 1 });
}

if (await item.use() === null) {
    return;
}
