/**
 * Item-Macro Macro for Shepherd Druid's Spirit Totem: Unicorn
 * 
 * https://www.dndbeyond.com/classes/druid#CircleoftheShepherd
 * 
 */

const useDistance3D = true;
const macroLabel = "Spirit Totem: Unicorn";
console.log({ message: `${macroLabel}`, arguments: arguments });
const actor = arguments[2];
const item = arguments[0];

let templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);

let template = templates[0];

console.log({ message: `${macroLabel}`, actor: actor, item: item, template: template, templates: templates });

/*

This is the path we are healing

*/

if (actor.effects.filter(e => e.label === "Spirit Totem (Unicorn Spirit) Template").length === 1) {
    console.log("Spirit Totem (Unicorn Spirit) is Present");

    let tokensInRange = canvas.tokens.placeables.filter(t => t.document.disposition === 1);

    if (useDistance3D) {
        tokensInRange = tokensInRange.filter(t => (Math.sqrt(TRUtils.distancePlacables(template, t) * TRUtils.distancePlacables(template, t) + (0 - t.document.elevation) * (0 - t.document.elevation))) <= 30);
    } else {
        tokensInRange = tokensInRange.filter(t => TRUtils.distancePlacables(template, t) <= 30);
    }

    console.log(tokensInRange);

    const hpHealed = actor._classes.druid.system.levels;
    const actors = [];

    for (let i = 0; i < tokensInRange.length; i++) {
        actors.push(tokensInRange[i].actor._id);
    }
    const params = { actorId: actors, hpHealed: hpHealed };
    await Requestor.request({
        description: "Spirit Totem (Unicorn Spirit Healing)",
        buttonData: [{
            label: "(Unicorn Spirit Healing)",
            action: async () => {
                console.log({ message: "Trying to heal the group", arguments: arguments });
                for (let i = 0; i < arguments[5].actorId.length; i++) {
                    await game.actors.get(arguments[5].actorId[i]).applyDamage(-this.hpHealed);
                }

            },
            ...params
        }]
    });

    return;
}

if (await item.use() === null) {
    console.log("Did Godot arive?");
    return;
}

console.log({ message: "Actor and Item", actor: actor, item: item });

/*

No totem is present, create the totem

*/
templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);
console.log({ message: "templates", templates: templates });
if (templates.length > 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Please delete them.`, { permanent: true });
    return;
}

console.log({ message: "template", template: template });




console.log(template);

