// https://github.com/krbz999/zhell-macros/blob/main/tools/token/cycle_token_wildcards.js
const currentImg = token.document.texture.src;
const actorId = token.actor.id;
const wildcardImages = await game.actors.get(actorId).getTokenImages();
const currentIndex = wildcardImages.indexOf(currentImg);
const next = (currentIndex - 1) >= 0 ? (currentIndex - 1) : wildcardImages.length - 1;

await token.document.update({ "texture.src": wildcardImages[next] });