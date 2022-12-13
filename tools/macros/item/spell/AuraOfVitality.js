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

// check if the "aura" is up (if there is the MeasuringTemplate with our flag)
if (typeof template !== "undefined") {

    // check for hovered and try to heal if valid
    const target = canvas.tokens.hover;
    if (canvas.tokens.hover === null) {
        ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target (no Actor found).`);
        return;
    }

    // check range and abort if to far, for corner-cases roll in dice tray or temporarily move one of the tokens.
    const tokenSource = token;
    const tokenTarget = target;
    const distance = Math.round(canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }));
    const distance3D = Math.round(Math.sqrt(distance * distance + (tokenSource.document.elevation - tokenTarget.document.elevation) * (tokenSource.document.elevation - tokenTarget.document.elevation)));

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

    const dice = target.actor.items.filter(i => i.name === ("Eldritch Invocations: Gift of the Ever-Living Ones")).length > 0 ? "12" : "2d6";
    const roll = await new Roll(`${dice}${bonusHealing !== 0 ? bonusHealingString : ""}`, actor.getRollData()).evaluate({ async: true });
    const hpHealed = roll.total;
    roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: token.actor }),
        flavor: `${macroLabel}, healing ${target.name} for ${hpHealed}hp.`
    });
    const requestorData = [{ uuid: target.document.uuid, healing: hpHealed }];

    // request healing
    await Requestor.request({
        title: `${macroLabel}`,
        description: `healing ${target.name} for ${hpHealed}hp, ${effect.flags.world.charges} charges left.`,
        img: icon,
        whisper: [game.users.getName("Gamemaster").id],
        buttonData: [{
            label: `${target.name.substr(0, 6)} +${hpHealed}[heal], ${effect.flags.world.charges} charges`,
            limit: Requestor.LIMIT.ONCE,
            permission: Requestor.PERMISSION.GM,
            action: async () => {
                for (let i = 0; i < this.requestorData.length; i++) {
                    //await game.actors.get(this.requestorData[i].id).applyDamage(-this.requestorData[i].healing);
                    await canvas.tokens.placeables.find(t => t.document.uuid === this.requestorData[i].uuid).actor.applyDamage(-this.requestorData[i].healing)
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

const templateData = {
    borderColor: "#00800f",
    fillColor: "#022400",
    x: token.center.x,
    y: token.center.y
};
await template.update(templateData);
await tokenAttacher.attachElementsToToken([template], token);

const charges = 10;
const effectData = { icon, label: `${macroLabel} (${charges})` };
foundry.utils.setProperty(effectData, "flags.world.spellLevel", spellLevel);
foundry.utils.setProperty(effectData, "flags.world.charges", 10);
foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);