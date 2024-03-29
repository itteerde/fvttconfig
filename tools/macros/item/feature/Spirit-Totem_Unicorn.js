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

if (templates.length === 1) {

    let tokensInRange = canvas.tokens.placeables.filter(t => t.document.disposition === 1);

    if (useDistance3D) {
        tokensInRange = tokensInRange.filter(t => (Math.sqrt(TRUtils.distancePlacables(template, t) * TRUtils.distancePlacables(template, t) + (0 - t.document.elevation) * (0 - t.document.elevation))) <= 30);
    } else {
        tokensInRange = tokensInRange.filter(t => TRUtils.distancePlacables(template, t) <= 30);
    }

    const hpHealed = actor.classes.druid.system.levels;
    const actors = [];

    for (let i = 0; i < tokensInRange.length; i++) {
        actors.push(tokensInRange[i].actor._id);
    }
    const params = { actorId: actors, hpHealed: hpHealed };
    await Requestor.request({
        title: "Unicorn Spirit",
        description: `Spirit Totem (Unicorn Spirit Healing) healing ${tokensInRange.map(t => ` ${t.actor.name}`)} for ${hpHealed} each.`,
        img: "icons/commodities/treasure/trinket-totem-bone-green.webp",
        whisper: [game.users.getName("Gamemaster").id],
        buttonData: [{
            label: "Approve Healing",
            limit: Requestor.LIMIT.ONCE,
            permission: Requestor.PERMISSION.GM,
            action: async () => {
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
    return;
}


templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);
if (templates.length > 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Please delete them.`, { permanent: true });
    return;
}

template = templates[0];

await template.update({
    texture: 'modules/Tablerules/icons/magic/textures/unicornSpiritTotem03.webp',
    "flags.tokenmagic.templateData.opacity": .25
});