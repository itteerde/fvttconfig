/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-aberration
 */

const macroLabel = item.name;
const textureBeholderkin = "modules/Tablerules/icons/magic/summons/aberrationSpiritBeholderkin.png";
const textureSlaad = "modules/Tablerules/icons/magic/summons/aberrationSpiritSlaad.png";
const textureStarSpawn = "modules/Tablerules/icons/magic/summons/aberrationSpiritStarSpawn.webp";

const level = await warpgate.dnd5e.rollItem(item);
const summonerDc = actor.data.data.attributes.spelldc;
const summonerAttack = summonerDc - 8;

if (!level > 0) {
    ui.notifications.error(`${macroLabel}, !level>0, check console error.`);
    console.error({ message: `${macroLabel}, !level>0`, arguments: arguments });
    return;
}

/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: "Beholderkin",
        value: {
            token: { name: "Beholderkin" },
            actor: { name: "Beholderkin" },
            embedded: {
                Item: {
                    "Flyby": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Slaad",
        value: {
            actor: { name: "Slaad" },
            token: { name: "Slaad" },
            embedded: {
                Item: {
                    "Pack Tactics": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Star Spawn",
        value: {
            actor: { name: "Star Spawn" },
            token: { name: "Star Spawn" },
            embedded: {
                Item: {
                    "Flyby": warpgate.CONST.DELETE,
                    "Pack Tactics": warpgate.CONST.DELETE
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
        'system.attributes.hp': { value: 30 + 5 * (level - 2), max: 30 + 5 * (level - 2) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Claws": {
                'system.damage.parts': [[`1d10 + 3 + ${level}`, "slashing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === "Beholderkin") {
    updates["actor.img"] = textureBeholderkin;
    updates["token.texture.src"] = textureBeholderkin;
    updates["actor.system.attributes.movement.climb"] = 30;
}

if (spirit.actor.name === "Slaad") {
    console.log({ message: `${macroLabel}, updating variants (${spirit.actor.name})` });
    updates['actor.system.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
    updates["actor.img"] = textureSlaad;
    updates["token.texture.src"] = textureSlaad;
    updates["actor.system.attributes.movement.fly"] = 60;
}

if (spirit.actor.name === "Star Spawn") {
    updates["actor.img"] = textureStarSpawn;
    updates["token.texture.src"] = textureStarSpawn;
    updates["actor.system.attributes.movement.swim"] = 30;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Aberrant Spirit", updates);

//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately for further changes like animations.