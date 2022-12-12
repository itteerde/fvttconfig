/**
 * Item-Macro (planned) for Aura of Vitality Item (Spell)
 * 
 * https://www.dndbeyond.com/spells/aura-of-vitality
 * 
 * Aura of Vitality Issue #31
 */

const macroLabel = "Aura of Vitality";
const icon = "icons/magic/air/air-burst-spiral-pink.webp";
const flagKey = "flags.world.auraOfVitality";
const useDistance3D = true;

let templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === item.uuid);
let template = templates[0];
console.log({ message: `${macroLabel}, selecting template present`, template: template });


// check if the "aura" is up (if there is the MeasuringTemplate with our flag)
if (typeof template !== "undefined") {
    console.log({ message: `${macroLabel}, template found, taking healing path`, template: template });

    // check for hovered and try to heal if valid
    const target = canvas.tokens.hover;
    if (canvas.tokens.hover === null) {
        ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target (no Actor found).`);
        return;
    }
    console.log({ message: `${macroLabel}, hover-targeting.`, target: target, targetName: target.name });

    // check range and abort if to far, for corner-cases roll in dice tray or temporarily move one of the tokens.
    const tokenSource = token;
    const tokenTarget = target;
    console.log({ message: `${macroLabel}`, tokenSource: tokenSource, tokenTarget: tokenTarget });
    const distance = Math.round(canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }));
    const distance3D = Math.round(Math.sqrt(distance * distance + (tokenSource.document.elevation - tokenTarget.document.elevation) * (tokenSource.document.elevation - tokenTarget.document.elevation)));
    console.log({ message: "distance", distance: distance, distance3D: distance3D });

    if ((useDistance3D ? distance3D : distance) > 30) {
        ui.notifications.warn(
            `Distance between ${token.actor.name} and ${target.actor.name} is ${(useDistance3D ? distance3D : distance)}. Expected distance<=30.`,
            { permanent: true }
        );

        return;
    }

    const effect = actor.effects.find(e => e.flags?.world?.origin === item.uuid);
    const spellLevel = effect.flags.world.spellLevel;

    const isDiscipleOfLife = actor.classes?.cleric?.system?.subclass?.identifier === "life-domain";
    let bonusHealing = 0;
    if (isDiscipleOfLife) {
        bonusHealing += spellLevel + 2;
    }
    const bonusHealingString = bonusHealing !== 0 ? `+${bonusHealing}` : "";
    console.log({ message: `${macroLabel}, preparing roll data.`, bonusHealing: bonusHealing, bonusHealingString: bonusHealingString });
    const chatMessage = await new Roll(`2d6${bonusHealing !== 0 ? bonusHealingString : ""}`, actor.getRollData()).toMessage();
    console.log({ message: `${macroLabel}, rolling.`, chatMessage: chatMessage });
    const hpHealed = chatMessage.rolls[0]._total;
    const requestorData = [{ id: target.actor.id, healing: hpHealed }];

    // request healing
    await Requestor.request({
        title: `${macroLabel}`,
        description: `healing ${target.name} for ${hpHealed}hp, ${effect.flags.world.charges} charges left.`,
        img: icon,
        whisper: [game.users.getName("Gamemaster").id],
        buttonData: [{
            label: `Approve Healing, charges: ${effect.flags.world.charges}`,
            limit: Requestor.LIMIT.ONCE,
            permission: Requestor.PERMISSION.GM,
            action: async () => {
                for (let i = 0; i < this.requestorData.length; i++) {
                    console.log({ message: `Requestor.request(action)`, requestorData: this.requestorData, arguments: arguments });
                    await game.actors.get(this.requestorData[i].id).applyDamage(-this.requestorData[i].healing);
                }
            },
            requestorData: requestorData // what is here gets into this.<something>
        }]
    });


    const charges = 10;
    const effectData = { icon, label: `${macroLabel} (${charges})` };
    foundry.utils.setProperty(effectData, "flags.world.spellLevel", spellLevel);
    foundry.utils.setProperty(effectData, "flags.world.charges", 10);
    foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);

    await effect.update({
        label: `${macroLabel} (${effect.flags.world.charges - 1})`,
        "flags.world.charges": effect.flags.world.charges - 1
    });

    return;
}


console.log({ message: `${macroLabel}, no template found, taking template setup and intitialization path` });

// use the item (takes care of resources, ChatMessage), if returning null (i believe) return
const use = await item.use();
if (!use) {
    return;
}
const DIV = document.createElement("DIV");
DIV.innerHTML = use.content;
const spellLevel = Number(DIV.firstChild.dataset.spellLevel);


// select the MeasuringTemplate created by the Item.Spell use() and modify
template = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === item.uuid)[0];
console.log({ message: `${macroLabel}, selecting template created`, template: template });

const templateData = {
    borderColor: "#00800f",
    fillColor: "#022400",
    x: token.center.x,
    y: token.center.y
};
//console.log({ message: `${macroLabel}, line 118` });
await template.update(templateData);
await tokenAttacher.attachElementsToToken([template], token);

const charges = 10;
const effectData = { icon, label: `${macroLabel} (${charges})` };
foundry.utils.setProperty(effectData, "flags.world.spellLevel", spellLevel);
foundry.utils.setProperty(effectData, "flags.world.charges", 10);
foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);