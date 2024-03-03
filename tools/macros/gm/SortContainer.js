const pack = await fromUuid("Actor.nrTOaAjDjugyxtpD.Item.wvql7UJCKlCIM0IY"); //your uuid, use with caution
const contained = pack.system.allContainedItems.contents;
const updates = contained.sort((a, b) => a.name.localeCompare(b.name)).map((item, i) => {
    return { _id: item.id, sort: i * 10 };
});
await pack.actor.updateEmbeddedDocuments("Item", updates);