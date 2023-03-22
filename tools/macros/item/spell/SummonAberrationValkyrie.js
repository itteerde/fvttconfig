/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-aberration
 */

const macroLabel = item.name;
const textureBeholderkin = "modules/Tablerules/icons/magic/summons/aberrationSpiritBeholderkin.png";
const textureSlaad = "modules/Tablerules/icons/magic/summons/aberrationSpiritSlaad.png";
const textureStarSpawn = "modules/Tablerules/icons/magic/summons/aberrationSpiritStarSpawn.png";

const formBeholderkin = "Eye of Hildr";
const formSlaad = "Slaad";
const formStarSpawn = "Star Spawn";

const scaleBeholderkin = 1;
const scaleSlaad = 1;
const scaleStarSpawn = 1;

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
        label: formBeholderkin,
        value: {
            token: { name: formBeholderkin },
            actor: { name: formBeholderkin },
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
        label: formSlaad,
        value: {
            actor: { name: formSlaad },
            token: { name: formSlaad },
            embedded: {
                Item: {
                    "Eye Ray": warpgate.CONST.DELETE,
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formStarSpawn,
        value: {
            actor: { name: formStarSpawn },
            token: { name: formStarSpawn },
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
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Claws": {
                'system.damage.parts': [[`1d10 + 3 + ${level}`, "slashing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Eye Ray": {
                'system.damage.parts': [[`1d8 + 3 + ${level}`, "psychic"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Psychic Slam": {
                'system.damage.parts': [[`1d8 + 3 + ${level}`, "psychic"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Whispering Aura": {
                "system.save.dc": summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formBeholderkin) {
    updates["actor.img"] = textureBeholderkin;
    updates["token.texture.src"] = textureBeholderkin;
    updates["token.texture.scaleX"] = scaleBeholderkin;
    updates["token.texture.scaleY"] = scaleBeholderkin;
    updates["actor.system.attributes.movement.fly"] = 30;
    updates["actor.system.attributes.movement.hover"] = true;
}

if (spirit.actor.name === formSlaad) {
    updates["actor.img"] = textureSlaad;
    updates["token.texture.src"] = textureSlaad;
    updates["token.texture.scaleX"] = scaleSlaad;
    updates["token.texture.scaleY"] = scaleSlaad;
    updates["actor.system.attributes.movement.fly"] = 0;
}

if (spirit.actor.name === formStarSpawn) {
    updates["actor.img"] = textureStarSpawn;
    updates["token.texture.src"] = textureStarSpawn;
    updates["token.texture.scaleX"] = scaleStarSpawn;
    updates["token.texture.scaleY"] = scaleStarSpawn;
    updates["actor.system.attributes.movement.fly"] = 0;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Aberrant Spirit", updates);

//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately for further changes like animations.

if (spirit.actor.name === formStarSpawn) {
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