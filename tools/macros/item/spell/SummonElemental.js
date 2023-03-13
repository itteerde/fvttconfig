/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-elemental
 */

const macroLabel = item.name;
const textureAir = "modules/Tablerules/icons/magic/summons/elementalSpiritAir.png";
const textureEarth = "modules/Tablerules/icons/magic/summons/elementalSpiritEarth.png";
const textureFire = "modules/Tablerules/icons/magic/summons/elementalSpiritFire.png";
const textureWater = "modules/Tablerules/icons/magic/summons/elementalSpiritWater.png";

const formAir = "Air";
const formEarth = "Earth";
const formFire = "Fire";
const formWater = "Water";

const level = await warpgate.dnd5e.rollItem(item);
const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;

if (!level > 0) {
    ui.notifications.error(`${macroLabel}, !level>0, check console error.`);
    console.error({ message: `${macroLabel}, !level>0`, arguments: arguments });
    return;
}

/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: formAir,
        value: {
            token: { name: formAir },
            actor: { name: formAir }
        }
    },
    {
        label: formEarth,
        value: {
            actor: { name: formEarth },
            token: { name: formEarth },
            embedded: {
                Item: {
                    "Amorphous Form": warpgate.CONST.DELETE
                }
            }
        }
    },
    {
        label: formFire,
        value: {
            actor: { name: formFire },
            token: { name: formFire }
        }
    },
    {
        label: formWater,
        value: {
            actor: { name: formWater },
            token: { name: formWater }
        }
    }
    ], title: "Which version?"
};

let spirit = await warpgate.buttonDialog(buttonData);

/* Craft the updates that are common to all spirits */
let updates = {
    token: {
        "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER,
        "flags.Tablerules.spellLevel": level
    },
    actor: {
        'system.attributes.ac.flat': 11 + level,
        'system.attributes.hp': { value: 50 + 10 * (level - 4), max: 50 + 10 * (level - 4) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Slam": {
                'system.damage.parts': [[`1d10 + 4 + ${level}`, spirit.actor.name === formFire ? "fire" : "bludgeoning"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formAir) {
    updates["actor.img"] = textureAir;
    updates["token.texture.src"] = textureAir;
    updates["actor.system.attributes.movement.fly"] = 40;
    updates["actor.system.attributes.movement.hover"] = true;
    updates["actor.system.traits.dr.value"] = ["lightning", "thunder"];
}

if (spirit.actor.name === formEarth) {
    updates["actor.img"] = textureEarth;
    updates["token.texture.src"] = textureEarth;
    updates["actor.system.attributes.movement.burrow"] = 40;
    updates["actor.system.traits.dr.value"] = ["piercing", "slashing"];
}

if (spirit.actor.name === formFire) {
    updates["actor.img"] = textureFire;
    updates["token.texture.src"] = textureFire;
    updates["actor.system.traits.di.value"] = ["poison", "fire"];
}

if (spirit.actor.name === formWater) {
    updates["actor.img"] = textureWater;
    updates["token.texture.src"] = textureWater;
    updates["actor.system.attributes.movement.swim"] = 40;
    updates["actor.system.traits.dr.value"] = ["acid"];
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Elemental Spirit", updates);
