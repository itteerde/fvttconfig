/**
 * Item-Macro Macro for Shepherd Druid's Spirit Totem: Unicorn
 * 
 * https://www.dndbeyond.com/classes/druid#CircleoftheShepherd
 * 
 */

const macroLabel = "Spirit Totem: Unicorn";

if (await item.use() === null) {
    return;
}



const templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);

if (templates.length !== 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Place or delete to make it 1.`, { permanent: true });
    return;
}

const template = templates[0];
await template.setFlag(Tablerules.SCOPE, Tablerules.dictionary.class.druid.shepherd.features.spiritTotem.unicornSpirit.key, true);


console.log(template);

