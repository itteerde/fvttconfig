/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-fiend
 */

const macroLabel = item.name;
const textureDemon = "modules/Tablerules/icons/magic/summons/fiendishSpiritDemon.png";
const textureDevil = "modules/Tablerules/icons/magic/summons/fiendishSpiritDevil.png";
const textureYugoloth = "modules/Tablerules/icons/magic/summons/fiendishSpiritYugoloth.png";

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
        label: "Demon",
        value: {
            token: { name: "Demon" },
            actor: { name: "Demon" },
            embedded: {
                Item: {
                    "Claws": warpgate.CONST.DELETE,
                    "Hurl Flame": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Devil",
        value: {
            actor: { name: "Devil" },
            token: { name: "Devil" },
            embedded: {
                Item: {
                    "Claws": warpgate.CONST.DELETE,
                    "Bite": warpgate.CONST.DELETE,
                    "Death Throes": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Yugoloth",
        value: {
            actor: { name: "Yugoloth" },
            token: { name: "Yugoloth" },
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
        "system.attributes.prof": actor.system.attributes.prof
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
if (spirit.actor.name === "Demon") {
    updates["actor.img"] = textureDemon;
    updates["token.texture.src"] = textureDemon;
    updates["actor.system.attributes.movement.climb"] = 40;
}

if (spirit.actor.name === "Devil") {
    updates["actor.img"] = textureDevil;
    updates["token.texture.src"] = textureDevil;
    updates["actor.system.attributes.movement.fly"] = 60;
    updates['actor.system.attributes.hp'] = { value: 40 + 15 * (level - 6), max: 40 + 15 * (level - 6) };
}

if (spirit.actor.name === "Yugoloth") {
    updates["actor.img"] = textureYugoloth;
    updates["token.texture.src"] = textureYugoloth;
    updates['actor.system.attributes.hp'] = { value: 60 + 15 * (level - 6), max: 60 + 15 * (level - 6) };
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Fiendish Spirit", updates);
