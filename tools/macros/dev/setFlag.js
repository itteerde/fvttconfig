// set flag to a document 


const item = await fromUuid("Actor.2nLfgTKvok1OR4Hq.Item.opKdbNnekhfCbZBJ"); // can get item from anywhere, even compendium
const lightSourceData = {
    light: {
        alpha: 0.2,
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
            speed: 1,
            intensity: 2,
            reverse: false,
            type: "torch",
        },
        darkness: {
            min: 0,
            max: 1,
        },
        color: "#f3e09b"
    }
}
console.log(item);

await item.setFlag(Tablerules.dictionary.config.lightSource.scope, Tablerules.dictionary.config.lightSource.key, lightSourceData);

