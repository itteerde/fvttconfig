if (item.effects.size !== 1) {
    ui.notifications.warn(`${item.name} should have exactly one ActiveEffect tracking duration`, { permanent: true });
    return;
}
if (item.effects.find(e => true).duration.seconds !== actor._classes.druid.system.levels * 3600) {
    ui.notifications.info(`incorrect number duration on duration tracking ActiveEffect (level-up?), correcting duration.`, { permanent: true });

    item.effects.find(e => true).update({ "duration.seconds": actor._classes.druid.system.levels * 3600 })
}
return true;