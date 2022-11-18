/** 
 * Reference values torch version with the default settings for ambient light (except color, which is handled differently there). Probably default values for Tokens, too.
 * 
 * icon suggestion: icons/sundries/lights/torch-brown-lit.webp
 * 
 */
const dim_range = 40;
const bright_range = 20;
const tokensToBeModified = canvas.tokens.controlled;
for (let i = 0; i < tokensToBeModified.length; i++) {
    if (tokensToBeModified[i].data.light.dim === 0) {
        await tokensToBeModified[i].document.update({
            light: {
                alpha: 0.5,
                angle: 0,
                bright: 15,
                coloration: 1,
                dim: 30,
                gradual: true,
                luminosity: 0.5,
                saturation: 0,
                contrast: 0,
                shadows: 0,
                animation: {
                    speed: 1,
                    intensity: 5,
                    reverse: false,
                    type: "torch"
                },
                darkness: {
                    min: 0,
                    max: 1
                },
                color: "#000000"
            }
        });
    } else {
        await tokensToBeModified[i].document.update({
            light: {
                alpha: 0.5,
                angle: 0,
                bright: 0,
                color: "#000000",
                coloration: 1,
                dim: 0,
                gradual: true,
                luminosity: 0.5,
                saturation: 0,
                contrast: 0,
                shadows: 0,
                animation: {
                    speed: 5,
                    intensity: 5,
                    reverse: false,
                },
                darkness: {
                    min: 0,
                    max: 1,
                },
            },
        });
    }
}