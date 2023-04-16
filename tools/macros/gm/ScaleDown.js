const scalingPercent = -(5 / 100);
token = canvas.tokens.controlled[0];
await token.document.update({ "texture.scaleX": token.document.texture.scaleX * (1 + scalingPercent), "texture.scaleY": token.document.texture.scaleY * (1 + scalingPercent) });