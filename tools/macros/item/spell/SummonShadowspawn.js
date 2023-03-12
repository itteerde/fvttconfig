/**
 * Item-Macro Macro Summon Construct
 * 
 * https://www.dndbeyond.com/spells/summon-shadowspawn
 */

const macroLabel = item.name;
const textureFury = "modules/Tablerules/icons/magic/summons/shadowSpiritFury.png";
const textureDespair = "modules/Tablerules/icons/magic/summons/shadowSpiritDespair.png";
const textureFear = "modules/Tablerules/icons/magic/summons/shadowSpiritFear.png";

const formFury = "Shadowspawn Fury";
const formDespair = "Shadowspawn Despair";
const formFear = "Shadowspawn Fear";

const scaleFury = 1;
const scaleDespair = 1;
const scaleFear = 1;


const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;
const level = await warpgate.dnd5e.rollItem(item);
if (!level > 0) {
    return;
}


/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: formFury,
        value: {
            token: { name: formFury },
            actor: { name: formFury },
            embedded: {
                Item: {
                    "Weight of Sorrow": warpgate.CONST.DELETE,
                    "Shadow Stealth": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formDespair,
        value: {
            actor: { name: formDespair },
            token: { name: formDespair },
            embedded: {
                Item: {
                    "Terror Frenzy": warpgate.CONST.DELETE,
                    "Shadow Stealth": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formFear,
        value: {
            actor: { name: formFear },
            token: { name: formFear },
            embedded: {
                Item: {
                    "Weight of Sorrow": warpgate.CONST.DELETE,
                    "Terror Frenzy": warpgate.CONST.DELETE
                }
            }
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
        'system.attributes.hp': { value: 35 + 15 * (level - 3), max: 35 + 15 * (level - 3) },
        "system.details.cr": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Chilling Rend": {
                'system.damage.parts': [[`1d12 + 3 + ${level}`, "cold"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Dreadful Scream": {
                'system.save.dc': summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formFury) {
    updates["actor.img"] = textureFury;
    updates["token.texture.src"] = textureFury;
    updates["token.texture.scaleX"] = scaleFury;
    updates["token.texture.scaleY"] = scaleFury;
}

if (spirit.actor.name === formDespair) {
    updates["actor.img"] = textureDespair;
    updates["token.texture.src"] = textureDespair;
    updates["token.texture.scaleX"] = scaleDespair;
    updates["token.texture.scaleY"] = scaleDespair;
}

if (spirit.actor.name === formFear) {
    updates["actor.img"] = textureFear;
    updates["token.texture.src"] = textureFear;
    updates["token.texture.scaleX"] = scaleFear;
    updates["token.texture.scaleY"] = scaleFear;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Shadow Spirit", updates);
//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately

if (spirit.actor.name === formDespair) {
    const token = canvas.tokens.get(spawnIds[0]);
    // create and attach MeasuredTemplate
    const data = {
        distance: 7.5,
        borderColor: "#52004b",
        fillColor: "#940088",
        x: token.center.x,
        y: token.center.y
    };
    foundry.utils.setProperty(data, "flags.dnd5e.origin", item.uuid);
    await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [data]);

    const template = canvas.scene.templates.find(t => t.flags?.dnd5e?.origin === item.uuid);
    await tokenAttacher.attachElementsToToken([template], token);
}