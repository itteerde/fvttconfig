/**
 * Configure the selected Actor's (Token's) light source. The settings are stored to the Actor, so that it both is a default value, and also is kept if the Actor moves from Scene to Scene, as the Actor is a unique persistent entity.
 */

const actors = canvas.tokens.controlled;
Tablerules.debug(actors);

const actor = actors[0]; // lets make it work for one and repeat for all after we are done.

const effect = actor.effects.find(e => e.getFlag("world", Tablerules.dictionary.config.lightSource.key));
const effectData = { icon, label };