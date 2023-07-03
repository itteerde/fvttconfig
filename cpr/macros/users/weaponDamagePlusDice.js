actor = canvas.tokens.controlled[0].actor;
weapons = actor.items.filter(i => i.system.equipped === "equipped" && i.type === "weapon");

if (weapons.length !== 1) {
    ui.notifications.warn("Exactly one weapon needs to be equiped for this to work.");
    return;
} else {
    weapon = weapons[0];
}

damage = weapon.system.damage;
numberOfDice = Number(damage.substr(0, damage.length - 2));

ui.notifications.info(`Setting damage of ${actor}'s ${weapon.name} to ${numberOfDice + 1}d6`);

await weapon.update({ "system.damage": `${numberOfDice + 1}d6` });