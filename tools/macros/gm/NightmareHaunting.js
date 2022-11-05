// icon suggestion: icons/magic/death/undead-ghosts-trio-blue.webp
const icon = icons/magic/death/hand-withered-gray.webp;
const label = "Nightmare Haunting";
const macroLabel = "Nightmare Haunting";


if (canvas.tokens.controlled.length !== 1) {
    ui.notifications.warn(`${macroLabel}, ${canvas.tokens.controlled.length} Actors selected. Select 1 and only 1.`, { permanent: true });
    return;
}

if (actor.type !== "character") {
    ui.notifications.warn(`${macroLabel}, Actor selected is type:${actor.type}. Select a character.`);
    return;
}

const effect = actor.effects.find(e => e.getFlag("world", "Nightmare Haunting"));

const keys = ["system.attributes.hp.max"];
const changes = keys.map(key => {
    return { };
  });
  const effectData = { changes, icon, label };

  function updateValue(actorId, dir) {
    const actor = game.actors.get(actorId);
    const effect = actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"));
    const current = effect?.getFlag("world", "stress") ?? 0;
    const stress = Number(Math.max(current + Number(dir), 0));
    const changes = keys.map(key => {
      return { };
    });
    const effectData = { changes, icon, label };
    foundry.utils.setProperty(effectData, "flags.world.stress", stress);
    if (effect) return effect.update(effectData);
    return actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
  }