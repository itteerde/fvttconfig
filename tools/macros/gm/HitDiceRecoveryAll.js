async function regainHitDice(actor) {
    const classes = actor.itemTypes.class.toSorted((a, b) => {
        return parseInt(b.system.hitDice.substring(1)) - parseInt(a.system.hitDice.substring(1));
    });

    let hdUsed = classes.reduce((acc, c) => acc + c.system.hitDiceUsed, 0);
    let hdRegained = 0;
    let levels = classes.reduce((acc, c) => acc + c.system.levels, 0);

    //console.log({ actor: actor, levels: levels, hdUsed: hdUsed, hdRegained: hdRegained });

    while (hdRegained < Math.ceil(levels / 2) && hdRegained < hdUsed) {

        for (let i = 0; i < classes.length; i++) {
            if (classes[i].system.hitDiceUsed > 0) {
                await classes[i].update({ "system.hitDiceUsed": classes[i].system.hitDiceUsed - 1 });
                hdRegained++;
                break;
            }
        }
    }

}

game.folders.find(f => f.name === "PCs").contents.filter(pc => pc.type === "character").forEach(a => {

    regainHitDice(a);

    let item = pc.items.find(i => i.name === "Long Rest")
    if (item) {
        item.update({ "system.uses.value": Math.min(item.system.uses.max, item.system.uses.value + 1) });
    } else {
        ui.notifications.warn(`${pc.name}: no Long Rest Item found`, { permanent: true });
    }
});

