if (!game.user.isGM) {
    ui.notifications.warn("GM only.");
    return;
}

if (!MODULE_SCOPE) {
    ui.notifications.warn("Required Module not found.");
    return;
}

console.log({ this: this, lastRun: this.getFlag(MODULE_SCOPE, "lastRun") });
if (new Date().getTime() - this.getFlag(MODULE_SCOPE, "lastRun") < 3000) {
    ui.notifications.warn("Do not keep smashing that Macro. This has a 3s cooldown to keep you from breaking the game.");
    return;
}

async function regainHitDice(actor) {
    const classes = actor.itemTypes.class.toSorted((a, b) => {
        return parseInt(b.system.hitDice.substring(1)) - parseInt(a.system.hitDice.substring(1));
    });

    let hdUsed = classes.reduce((acc, c) => acc + c.system.hitDiceUsed, 0);
    let hdRegained = 0;
    let levels = classes.reduce((acc, c) => acc + c.system.levels, 0);

    //console.log({ actor: actor, levels: levels, hdUsed: hdUsed, hdRegained: hdRegained });

    let delta = new Map(); // class item id and new value
    for (let i = 0; i < classes.length; i++) {
        delta.set(classes[i].id, classes[i].system.hitDiceUsed);
    }

    while (hdRegained < Math.ceil(levels / 2) && hdRegained < hdUsed) {

        for (k in delta.keys) {
            if (delta.get(k) > 0) {
                delta.set(k, delta.get(k) - 1);
                hdRegained++;
                break;
            }
        }
    }

    for (c in classes) {
        if (c.system.hitDiceUsed !== delta.get(c.id)) {
            c.update({ "system.hitDiceUsed": delta.get(c.id) });
        }
    }

}

canvas.tokens.controlled.forEach(t => {
    regainHitDice(t.actor);
});

this.setFlag(MODULE_SCOPE, "lastRun", new Date().getTime());