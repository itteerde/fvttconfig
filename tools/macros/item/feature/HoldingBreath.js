/**
 * Item-Macro Macro for Holding Breath (Suffocating)
 * 
 * Functionality: toggle on of Holding Breath.
 * 
 * https://www.dndbeyond.com/sources/basic-rules/adventuring#Suffocating
 * https://github.com/itteerde/fvttconfig/issues/81
 * 
 * requires: Item-Macro, Effect-Macro, Token-Magic-FX (could be made optional)
 * limitation: does not work if Item is renamed to different names within one world (being dragged into Control Bar
 * by GM is part of the process).
 */

// this should make the macro work even if our module is disabled, despite debug logging support
const isDebugEnabled = TRUtils === undefined ? false : TRUtils.isDebugEnabled();

const macroLabel = "Holding Breath";

if (isDebugEnabled) {
    Tablerules.debug({ message: `${macroLabel}`, arguments: arguments });
}

const icon = "icons/magic/time/clock-stopwatch-white-blue.webp";
const flags = {
    scope: "world",
    holdingBreath: { key: "holdingBreath" },
    suffocating: { key: "suffocating" },
    suffocatingState: {
        key: "suffocating.state",
        none: "none", // rule not in effect
        holdingBreath: "holdingBreath", // holding breath, not yet out of air
        suffocating: "suffocating" // out of air, seconds to unconscious and death saves
    }
};


// actor injected by Item-Macro
const tokens = canvas.tokens.placeables.filter(t => t.document.actor.id === actor.id); // should there be multiple copies of the same actor on the cavas (for linked actors) the changes should affect all tokens. Making sure it does cover this case is not part of the implementation yet

if (tokens.length < 1) {// ideally this should not matter. Holding Breath and suffocating might be relevant in theater of the mind without tokens out. But such scenes can always be played with an empty scene with tokens present for such reasons, so not supported at the moment.
    ui.notifications.error(`${macroLabel}, no token found for actor ${actor.name} (${actor.id}).`);
    console.log(`${macroLabel}, no token found for actor ${actor.name} (${actor.id}).`);
    return;
}

const token = tokens[0];

let myButtons = await generateButtons(actor, item, flags, macroLabel, icon);

let d = new Dialog({
    title: `${macroLabel}`,
    content: `some instructions/ rules`,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Option One",
            callback: () => console.log("Chose One")
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Option Two",
            callback: () => console.log("Chose Two")
        }
    },
    default: "two",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true);


// if token's actor is affected by Hold Breath already
if (actor.effects.find(e => e.getFlag(flags.scope, flags.key))) {
    actor.deleteEmbeddedDocuments("ActiveEffect", [token.actor.effects.find(e => e.getFlag(flags.scope, flags.key)).id]);
    TokenMagic.deleteFilters(token, macroLabel);
    return;
}

// Item has no resources (yet), so should never happen
if (await item.use() === null) {
    if (isDebugEnabled) {
        Tablerules.debug({ message: `${macroLabel}, item.use() returned null, returning.`, arguments: arguments });
    }
    return;
}

const effectData = { icon, label: macroLabel, duration: { seconds: Math.max((token.actor.system.abilities.con.mod + 1) * 60, 30) } };
const effectsCreated = await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

const effect = effectsCreated[0];
await effect.setFlag(flags.scope, flags.key, true);
if (isDebugEnabled) {
    Tablerules.debug({ message: `${macroLabel}, effect created`, effect: effect });
}

await toggleVisualEffect(token, macroLabel);


/**
 * 
 * @param {Actor5e} actor 
 * @param {string} macroLabel 
 * @param {object} flags 
 */
function toggleEffectHoldingBreath(actor, macroLabel, flags) {
}

function toggleEffectSuffocating(actor, macroLabel, flags) {
}

/**
 * Character loses a minute of air. Probably want to display something as ChatMessage.
 * 
 * @param {Actor5e} actor 
 * @param {string} macroLabel 
 * @param {object} flags 
 */
function looseAir(actor, macroLabel, flags) {

}

/**
 * 
 * @param {Token5e} token 
 * @param {string} macroLabel 
 */
async function toggleVisualEffect(token, macroLabel) {

    let params =
        [{
            filterType: "flood",
            filterId: macroLabel,
            time: 0,
            color: 0x0020BB,
            billowy: 0.43,
            tintIntensity: 0.72,
            glint: 0.31,
            scale: 70,
            padding: 10,
            animated:
            {
                time:
                {
                    active: true,
                    speed: 0.0006,
                    animType: "move"
                }
            }
        }];

    if (TokenMagic.hasFilterId(token, macroLabel)) {
        await TokenMagic.deleteFilters(token, macroLabel);
    }

    await TokenMagic.addUpdateFilters(token, params);
}