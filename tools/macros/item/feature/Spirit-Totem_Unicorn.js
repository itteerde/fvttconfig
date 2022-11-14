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
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) fount. Place or delete to make it 1.`, { permanent: true });
    return;
}

const template = templates[0];

console.log(template);

// create Effect on Actor with the UUID of the template, that is looked up by the Macro of the healing part to calculate the valid targets.