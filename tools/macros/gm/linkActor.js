/**
 * 
 * Reestablishes a link for a Token with broken link to an Actor with the exact same name. Does not yet check if the link is even broken before doing so or perform any heuristics if it has the correct one.
 * 
 */

const actorId = game.actors.getName(token.document.name).id;
await token.document.update({ actorId });