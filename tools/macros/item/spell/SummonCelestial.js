/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-celestial
 */

const macroLabel = item.name;
const textureAvenger = "modules/Tablerules/icons/magic/summons/celestialSpiritAvenger.webp";
const textureDefender = "modules/Tablerules/icons/magic/summons/celestialSpiritDefender.webp";

const formAvenger = "Avenger";
const formDefender = "Defender";

const scaleAvenger = 1;
const scaleDefender = 1;

const level = foundry.utils.getProperty(await item.use(), 'flags.dnd5e.use.spellLevel');
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
        label: formAvenger,
        value: {
            token: { name: formAvenger },
            actor: { name: formAvenger },
            embedded: {
                Item: {
                    "Radiant Mace": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formDefender,
        value: {
            actor: { name: formDefender },
            token: { name: formDefender },
            embedded: {
                Item: {
                    "Radiant Bow": warpgate.CONST.DELETE
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
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Radiant Bow": {
                'system.damage.parts': [[`2d6 + 2 + ${level}`, "radiant"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`
            },
            "Radiant Mace": {
                'system.damage.parts': [[`1d10 + 3 + ${level}`, "radiant"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`
            },
            "Healing Touch": {
                "system.damage.parts": [[`2d8+ ${level}`, "healing"]]
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formAvenger) {
    updates["actor.img"] = textureAvenger;
    updates["token.texture.src"] = textureAvenger;
    updates["token.texture.scaleX"] = scaleAvenger;
    updates["token.texture.scaleY"] = scaleAvenger;
}

if (spirit.actor.name === formDefender) {
    updates["actor.img"] = textureDefender;
    updates["token.texture.src"] = textureDefender;
    updates["token.texture.scaleX"] = scaleDefender;
    updates["token.texture.scaleY"] = scaleDefender;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Celestial Spirit", updates);
