const tokens = canvas.tokens.controlled;
for (let i = 0; i < tokens.length; i++) {
    console.log(game.actors.get(tokens[i].document.actorId));
}
