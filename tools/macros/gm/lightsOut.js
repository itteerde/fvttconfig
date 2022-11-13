// icon suggestion: icons/sundries/lights/lantern-steel.webp
const tokensToBeModified = canvas.tokens.controlled;
for (let i = 0; i < tokensToBeModified.length; i++) {
    if (tokensToBeModified[i].data.light.dim !== 0) {
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