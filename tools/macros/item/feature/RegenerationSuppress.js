/**
 * Control Bar Macro for suppressing regeneraion.
 * 
 * https://github.com/itteerde/fvttconfig/issues/74
 */

const macroLabel = "Regeneration Suppress";
const flagKey = "flags.world.regenerationSuppress";
const icon = "icons/magic/life/heart-broken-red.webp";

const tokensToBeModified = canvas.tokens.controlled;
const actors = canvas.tokens.controlled.map(t => t.actor);

for (let i = 0; i < actors.length; i++) {

    const actor = actors[i];

    const effect = actor.effects.find(e => foundry.utils.hasProperty(e, flagKey));

    if (effect) {
        ui.notifications.warn(`${macroLabel}, found effect on Actor: ${actor.name}. Only one instance per Actor allowed.`, { permanent: false });
    }

    const effectData = { icon, label: macroLabel, duration: { seconds: 6 } };
    foundry.utils.setProperty(effectData, flagKey, true);
    if (effect) {
        await effect.update(effectData);
    } else {
        await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    }
}

