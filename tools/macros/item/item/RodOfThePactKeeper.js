/**
 * Item-Macro Macro for Rod of the Pact Keeper
 */

// check uses
const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

// check if there are used Pact Slots
if (actor.system.spells.pact.value >= actor.system.spells.pact.max) {
    ui.notifications.warn(`${item.name} cannot be used to add slots, only to restore. There are no used pact slots.`);
    return;
}

item.use();
actor.update({ "system.spells.pact.value": actor.system.spells.pact.value + 1 });