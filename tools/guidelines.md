# Naming Conventions

## Rules Data

Data reflecting any game mechanics usually would end up on the `Actor` active in the world the game happens to be played within. Most of it will have numberic differences in between `Actors`, too, so it seems natural to have them stored there. Storing things on an `Actor` in a non-invasive way is done by adding and maintaining `Documents`, for an `Effect` that is `.effects`, an `EmbeddedDocuments` `object`. E.g. `actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"))` and `actor.createEmbeddedDocuments("ActiveEffect", [effectData])`.

+ `Guidance` from One DND: `"flags.world.guidanceCooldown"`. [to be implemented](https://github.com/itteerde/fvttconfig/issues/22).
+ `Stress` from `VRGtR`: `actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"))`. [Source Link](https://github.com/itteerde/fvttconfig/blob/main/tools/macros/gm/stress.js).


## Module Configuration

Different `Modules` handle this differently. Some use the `CONFIG` object adding their named `object` with everything below that. This is the approach chosen initially. I do not thinkg that is good anymore. The new approach is to put everything we use under Tablerules.config, which is a static property of our class Tablerules, which will from here on get everything for several reasons including debugging and namespace-like considerations.