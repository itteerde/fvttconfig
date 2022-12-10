// icon suggestion: icons/sundries/lights/torch-brown-lit.webp
const dim_range = 20;
const bright_range = 10;
const tokensToBeModified = canvas.tokens.controlled;
for (let i = 0; i < tokensToBeModified.length; i++) {
	if (tokensToBeModified[i].document.light.dim === 0) {
		await tokensToBeModified[i].document.update({
			light: {
				alpha: 0.2,
				angle: 0,
				bright: bright_range,
				coloration: 1,
				dim: dim_range,
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
				color: "#f3e09b",
			},
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