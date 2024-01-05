const level = foundry.utils.getProperty(await item.use(), 'flags.dnd5e.use.spellLevel');
if (level) {
    await actor.createEmbeddedDocuments("ActiveEffect", item.effects.contents);
}
