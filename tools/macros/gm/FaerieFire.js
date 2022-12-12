/**
 * GM only Macro Bar version for Faerie Fire
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 * 
 * requires: Token-Attacher, Token Magic FX.
 */

const macroLabel = "Faerie Fire";
const icon = "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp";
const flags = { scope: "world", key: "Faerie Fire" };

token = canvas.tokens.controlled[0];// TODO: once works change to all tokens selected (and test properly once more)
actor = token.actor;// TODO: once works change to all tokens selected (and test properly once more)

// if token's actor is affected by Faerie Fire already
if (token.actor.effects.find(e => e.getFlag(flags.scope, flags.key))) {
    TokenMagic.deleteFilters(token, macroLabel);
    canvas.scene.deleteEmbeddedDocuments("AmbientLight", canvas.scene.lights.filter(l => l.getFlag(flags.scope, "origin") === token.id && l.getFlag(flags.scope, flags.key)).map(l => l.id));
    token.actor.deleteEmbeddedDocuments("ActiveEffect", [token.actor.effects.find(e => e.getFlag(flags.scope, flags.key)).id]);
    return;
}

const effectData = { icon, label: macroLabel, duration: { seconds: 60 } };
const effectsCreated = await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
//console.log({ message: `${macroLabel}`, effectsCreated: effectsCreated });

const effect = effectsCreated[0];
await effect.setFlag(flags.scope, flags.key, true);
console.log({ message: `${macroLabel}`, effect: effect });

let params =
    [{
        filterType: "glow",
        filterId: macroLabel,
        outerStrength: 4,
        innerStrength: 0,
        color: 0x003300,
        quality: 0.5,
        padding: 10,
        animated:
        {
            color:
            {
                active: true,
                loopDuration: 3000,
                animType: "colorOscillation",
                val1: 0x006600,
                val2: 0x00FF00
            }
        }
    }];

await TokenMagic.addUpdateFilters(token, params);

const lightData = {
    config: {
        alpha: 0.5,
        angle: 360,
        bright: 0,
        color: "#37b800",
        coloration: 1,
        dim: 10,
        attenuation: 0.5,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0,
        shadows: 0,
        animation: {
            type: null,
            speed: 5,
            intensity: 5,
            reverse: false
        },
        darkness: {
            min: 0,
            max: 1
        }
    },
    x: token.center.x,
    y: token.center.y
};

const created = await canvas.scene.createEmbeddedDocuments("AmbientLight", [lightData]);
const lightCreated = created[0];
await lightCreated.setFlag(flags.scope, "origin", token.id);
await lightCreated.setFlag(flags.scope, flags.key, true);
await tokenAttacher.attachElementsToToken([lightCreated], token);