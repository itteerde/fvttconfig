# Naming Conventions

## Rules Data

Data reflecting any game mechanics usually would end up on the `Actor` active in the world the game happens to be played within. Most of it will have numberic differences in between `Actors`, too, so it seems natural to have them stored there. Storing things on an `Actor` in a non-invasive way is done by adding and maintaining `Documents`, for an `Effect` that is `.effects`, an `EmbeddedDocuments` `object`. E.g. `actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"))` and `actor.createEmbeddedDocuments("ActiveEffect", [effectData])`.

+ `Stress` from `VRGtR`: `actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"))`.