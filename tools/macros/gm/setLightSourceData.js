/** 
    Sets the lighting source flag to an Item by the ID provided below. Get uuid by right-clicking on the item. Has been tested with items being on the Actor. Should work for all places, but trying to modify directly in a Compendium is cautioned against.
 */

const uuid = "Actor.c8eWGi2yGBkoxFiW.Item.sTvVk1hqgrULqa3B";

const item = await fromUuid(uuid); // can get item from anywhere, even compendium
const lightSourceData = {
    light: {
        alpha: 0.1,
        angle: 0,
        bright: 20,
        coloration: 1,
        dim: 40,
        gradual: true,
        luminosity: 0.5,
        saturation: 0,
        contrast: 0.25,
        shadows: 0,
        animation: {
            speed: 2,
            intensity: 5,
            reverse: false,
            type: "torch",
        },
        darkness: {
            min: 0,
            max: 1,
        },
        color: "#ffffff"
    }
}
console.log(item);

await item.setFlag(Tablerules.dictionary.config.lightSource.scope, Tablerules.dictionary.config.lightSource.key, lightSourceData);