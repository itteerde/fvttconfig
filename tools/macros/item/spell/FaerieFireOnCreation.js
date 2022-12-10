/**
 * Effect-Macro Macro for Faerie Fire onCreation
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const macroLabel = "Faerie Fire";
const icon = "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp";
const flagKey = "flags.world.faerieFire";

console.log({ message: `${macroLabel}`, arguments: arguments, token: token });

const lightData = {
    config: {
        alpha: 0.5,
        angle: 360,
        bright: 11,
        color: "#37b800",
        coloration: 1,
        dim: 22,
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
    x: token.x,
    y: token.y
};

const created = await canvas.scene.createEmbeddedDocuments("AmbientLight", [lightData]);
const lightCreated = created[0];

console.log({ message: `${macroLabel}, after .createEmbeddedDocuments("AmbientLight", [lightData]).`, created: created, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });

console.log({ message: `${macroLabel}`, effect: effect, originMaybe: effect.origin });

//foundry.utils.setProperty(lightData, "flags.origin", effect.flags.origin);
//await created.update({lightData});

lightCreated.setFlag("world", "origin", effect.origin);

console.log({ message: `${macroLabel}.`, lightCreated: lightCreated, lightCreatedAsObject: lightCreated.toObject() });
