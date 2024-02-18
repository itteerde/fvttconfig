/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-fiend
 */

// item = await fromUuid("Actor.HWlvr1Wb1hHs9Pfs.Item.mMFwnTooxvJWyOPH");

const macroLabel = item.name;
const textureDemon = "modules/Tablerules/icons/magic/summons/fiendishSpiritDemon.png";
const textureDevil = "modules/Tablerules/icons/magic/summons/fiendishSpiritDevil.png";
const textureYugoloth = "modules/Tablerules/icons/magic/summons/fiendishSpiritYugoloth.png";

const formDemon = "Demon";
const formDevil = "Devil";
const formYugoloth = "Yugoloth";

const scaleDemon = 1;
const scaleDevil = 1;
const scaleYugoloth = 1;

//const level = await warpgate.dnd5e.rollItem(item);
const level = foundry.utils.getProperty(await item.use({}, { skipItemMacro: true }), 'flags.dnd5e.use.spellLevel');
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
        label: formDemon,
        value: {
            token: { name: formDemon },
            actor: { name: formDemon },
            embedded: {
                Item: {
                    "Claws": warpgate.CONST.DELETE,
                    "Hurl Flame": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formDevil,
        value: {
            actor: { name: formDevil },
            token: { name: formDevil },
            embedded: {
                Item: {
                    "Claws": warpgate.CONST.DELETE,
                    "Bite": warpgate.CONST.DELETE,
                    "Death Throes": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formYugoloth,
        value: {
            actor: { name: formYugoloth },
            token: { name: formYugoloth },
            embedded: {
                Item: {
                    "Bite": warpgate.CONST.DELETE,
                    "Hurl Flame": warpgate.CONST.DELETE,
                    "Death Throes": warpgate.CONST.DELETE
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
        'system.attributes.hp': { value: 50 + 15 * (level - 6), max: 50 + 15 * (level - 6) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Claws": {
                'system.damage.parts': [[`1d8 + 3 + ${level}`, "slashing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Bite": {
                'system.damage.parts': [[`1d12 + 3 + ${level}`, "necrotic"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Hurl Flame": {
                'system.damage.parts': [[`2d6 + 3 + ${level}`, "fire"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Death Throes": {
                "system.save.dc": summonerDc,
                'system.damage.parts': [[`2d10 + ${level}`, "fire"]],
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formDemon) {
    updates["actor.img"] = textureDemon;
    updates["token.texture.src"] = textureDemon;
    updates["token.texture.scaleX"] = scaleDemon;
    updates["token.texture.scaleY"] = scaleDemon;
    updates["actor.system.attributes.movement.climb"] = 40;
}

if (spirit.actor.name === formDevil) {
    updates["actor.img"] = textureDevil;
    updates["token.texture.src"] = textureDevil;
    updates["token.texture.scaleX"] = scaleDevil;
    updates["token.texture.scaleY"] = scaleDevil;
    updates["actor.system.attributes.movement.fly"] = 60;
    updates['actor.system.attributes.hp'] = { value: 40 + 15 * (level - 6), max: 40 + 15 * (level - 6) };
}

if (spirit.actor.name === formYugoloth) {
    updates["actor.img"] = textureYugoloth;
    updates["token.texture.src"] = textureYugoloth;
    updates["token.texture.scaleX"] = scaleYugoloth;
    updates["token.texture.scaleY"] = scaleYugoloth;
    updates['actor.system.attributes.hp'] = { value: 60 + 15 * (level - 6), max: 60 + 15 * (level - 6) };
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Fiendish Spirit", updates);
