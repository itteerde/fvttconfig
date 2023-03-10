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
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Regeneration": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
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
                    "Eye Ray": warpgate.CONST.DELETE,
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
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
                    "Claws": warpgate.CONST.DELETE,
                    "Eye Ray": warpgate.CONST.DELETE,
                    "Regeneration": warpgate.CONST.DELETE
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
        'system.attributes.hp': { value: 40 + 10 * (level - 4), max: 40 + 10 * (level - 4) },
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
            "Hurl Fire": {
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
if (spirit.actor.name === "Beholderkin") {
    updates["actor.img"] = textureBeholderkin;
    updates["token.texture.src"] = textureBeholderkin;
    updates["actor.system.attributes.movement.fly"] = 30;
    updates["actor.system.attributes.movement.hover"] = true;
}

if (spirit.actor.name === "Slaad") {
    updates['actor.system.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
    updates["actor.img"] = textureSlaad;
    updates["token.texture.src"] = textureSlaad;
    updates["actor.system.attributes.movement.fly"] = 0;
}

if (spirit.actor.name === "Star Spawn") {
    updates["actor.img"] = textureStarSpawn;
    updates["token.texture.src"] = textureStarSpawn;
    updates["actor.system.attributes.movement.fly"] = 0;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Aberrant Spirit", updates);
