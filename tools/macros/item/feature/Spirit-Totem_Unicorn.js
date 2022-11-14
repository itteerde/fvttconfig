/**
 * Item-Macro Macro for Shepherd Druid's Spirit Totem: Unicorn
 * 
 * https://www.dndbeyond.com/classes/druid#CircleoftheShepherd
 * 
 */

if (await item.use() === null) {
    return;
}



const template = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);

console.log(template);

// create Effect on Actor with the UUID of the template, that is looked up by the Macro of the healing part to calculate the valid targets.