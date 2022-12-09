/**
 * Effect-Macro Macro for regeneraion for the Item-Feature.
 * 
 * https://github.com/itteerde/fvttconfig/issues/74
 */

const healingPerTurn = 10;
const flagKey = "flags.world.regenerationSuppress";

const effect = actor.effects.find(e => foundry.utils.hasProperty(e, flagKey));

if (effect) {
    return;
}

actor.applyDamage(-healingPerTurn);