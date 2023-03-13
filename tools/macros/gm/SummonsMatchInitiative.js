/**
 * Control Bar Macro for putting all summoned Actors' initiative to their summoners in order to enable letting them have their Turn after the Actor who summoned them.
 */

const combats = game.combats;

if (combats.size === 0) {
    ui.notifications.warn("No active combats found.");
    return;
}

// tie-breaking (skip this for the time being)

async function doCombatant(combatant, combat) {
    const token = game.scenes.get(combatant.sceneId).tokens.get(combatant.tokenId); // is a TokenDocument5e both for pc and npc
    if (token.actorData?.flags?.world?.summoned === undefined) {
        return;
    }

    const summonerId = token.actorData.flags.world.summoned.actor.substring(6);
    const summonerCombatant = combat.turns.find(c => c.actorId === summonerId);

    await combatant.update({ initiative: summonerCombatant.initiative - 0.01 });
}

function adjustCombat(combat) {
    for (const c of combat.turns) {
        doCombatant(c, combat);
    }
}

combats.forEach(adjustCombat);