/**
 * Item-Macro for the Spell Item for Spirit Shroud
 * https://www.dndbeyond.com/spells/spirit-shroud
 * 
 */

const macroLabel = item.name;

console.log({ message: `${macroLabel}, start.`, arguments: arguments });

const icon = item.img;
const flags = {
    scope: "world", key: {
        "Spirit Shroud": {
            damageType: "damageType",
            damageOrigin: "damageOrigin"
        }
    }
};

let templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === item.uuid);
let template = templates[0];


const use = await item.use();
if (!use) {
    return;
}

// select the MeasuringTemplate created by the Item.Spell use() and modify
template = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === item.uuid)[0];

const templateData = {
    borderColor: "#d500d2",
    fillColor: "#81007f",
    x: token.center.x,
    y: token.center.y
};
await template.update(templateData);
await tokenAttacher.attachElementsToToken([template], token);
