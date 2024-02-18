canvas.tokens.controlled[0].actor.items.forEach(i => {
    if (i.type !== "spell") {
        return;
    }
    if (i.system.duration.value === "") {
        return;
    }

    i.effects.forEach(e => {
        e.update({ "disabled": false, "transfer": false, "duration.startTime": null, "duration.rounds": null });
    });
    // if Duration && i.effects.size === 0 // don't need await as the size was not changed, the AE already existed, just mutating
    // create SpellEffect ActiveEffect // if we change it to be dependent on this further down the line we need to make it async and await above
    if (i.effects.size === 0) { // create Concentration effect (with or without changes contained)
        i.createEmbeddedDocuments("ActiveEffect", [{
            name: i.name,
            duration: i.system.duration //are they the same duration structure?
        }]);
    }
    // if Concentration && Target !== Self
    // create separate Concentration ActiveEffect without changes
});
