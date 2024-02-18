/**
 * Control Bar Macro for putting all summoned Actors' initiative to their summoners in order to enable letting them have their Turn after the Actor who summoned them.
 */

const combats = game.combats;

if (combats.size === 0) {
    ui.notifications.warn("No active combats found.");
    return;
}

async function doCombatant(combatant, combat) {
    const token = game.scenes.get(combatant.sceneId).tokens.get(combatant.tokenId); // is a TokenDocument5e both for pc and npc
    if (token.actor?.flags?.world?.summoned === undefined) {
        if (combatant.initiative === Math.floor(combatant.initiative)) {
            await combatant.update({ initiative: combatant.initiative + token.actor.system.abilities.dex.value / 100 + Math.random() / 100000 });
        }
        return;
    }

    const summonerId = token.actor.flags.world.summoned.actor.substring(6);
    const summonerCombatant = combat.turns.find(c => c.actorId === summonerId);

    if (summonerCombatant === undefined) {
        return;
    }

    await combatant.update({ initiative: summonerCombatant.initiative - 0.0000001 });
}

function adjustCombat(combat) {
    for (const c of combat.turns) {
        doCombatant(c, combat);
    }
}

combats.forEach(adjustCombat);