/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-celestial
 */

const macroLabel = item.name;
const textureAvenger = "modules/Tablerules/icons/magic/summons/celestialSpiritAvenger.webp";
const textureDefender = "modules/Tablerules/icons/magic/summons/celestialSpiritDefender.webp";

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
        label: "Avenger",
        value: {
            token: { name: "Avenger" },
            actor: { name: "Avenger" },
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
        label: "Defender",
        value: {
            actor: { name: "Defender" },
            token: { name: "Defender" },
            embedded: {
                Item: {
                    "Eye Ray": warpgate.CONST.DELETE,
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
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
        'system.attributes.hp': { value: 40 + 10 * (level - 5), max: 40 + 10 * (level - 5) },
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
if (spirit.actor.name === "Avenger") {
    updates["actor.img"] = textureAvenger;
    updates["token.texture.src"] = textureAvenger;
}

if (spirit.actor.name === "Defender") {
    updates["actor.img"] = textureDefender;
    updates["token.texture.src"] = textureDefender;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Aberrant Spirit", updates);
