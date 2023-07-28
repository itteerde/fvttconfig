/**
 * Item-Macro Macro for Spirit Guardians
 * 
 * after dropping onto Actor create empty AE for duration/concentration and deleting the MeasuredTemplate with
 * await canvas.scene.deleteEmbeddedDocuments("MeasuredTemplate",canvas.scene.templates.filter(t => t.flags?.dnd5e?.origin === origin.uuid).map(t=>t.id));
 * on Effect-Macro onDelete
 */

const macroLabel = item.name;
const icon = item.img;

if (canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === item.uuid).length !== 0) {
    ui.notifications.warn(`${macroLabel}, MeasuredTemplate for this item ${item.name} (${item.uuid}) present. Delete if spell is supposed to not be active already (delte AE if present).`);
    return;
}


// use the item (takes care of resources, ChatMessage), if returning null (i believe) return
const use = await item.use();
if (!use) {
    return;
}

// select the MeasuringTemplate created by the Item.Spell use() and modify
template = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).find(t => t.flags.dnd5e.origin === item.uuid);

const templateData = {
    distance: 17.5,
    x: token.center.x,
    y: token.center.y
};

if (!game.modules.get("tokenmagicasdas")?.active ?? false) {
    templateData.borderColor = "#00800f";
    templateData.fillColor = "#022400";
}

await template.update(templateData);
await tokenAttacher.attachElementsToToken([template], token);
