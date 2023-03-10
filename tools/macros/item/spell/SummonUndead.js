/**
 * Item-Macro Macro.
 * 
 * https://www.dndbeyond.com/spells/summon-undead
 */

const macroLabel = item.name;
const textureGhostly = "systems/dnd5e/tokens/undead/Ghost.webp";
const texturePutrid = "systems/dnd5e/tokens/undead/Ghast.webp";
const textureSkeletal = "systems/dnd5e/tokens/undead/Skeleton.webp";

// labels for easy customization and quick testing what works for unclear cases.
const formGhostly = "Ghostly Spirit";
const formPutrid = "Putrid Spirit";
const formSkeletal = "Skeletal Spirit";

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
        label: formGhostly,
        value: {
            token: { name: formGhostly },
            actor: { name: formGhostly },
            embedded: {
                Item: {
                    "Grave Bolt": warpgate.CONST.DELETE,
                    "Rotting Claw": warpgate.CONST.DELETE,
                    "Festering Aura": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formPutrid,
        value: {
            actor: { name: formPutrid },
            token: { name: formPutrid },
            embedded: {
                Item: {
                    "Deathly Touch": warpgate.CONST.DELETE,
                    "Grave Bolt": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formSkeletal,
        value: {
            actor: { name: formSkeletal },
            token: { name: formSkeletal },
            embedded: {
                Item: {
                    "Deathly Touch": warpgate.CONST.DELETE,
                    "Rotting Claw": warpgate.CONST.DELETE,
                    "Festering Aura": warpgate.CONST.DELETE
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
        'system.attributes.hp': { value: 30 + 10 * (level - 3), max: 30 + 10 * (level - 3) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Deathly Touch": {
                'system.damage.parts': [[`1d8 + 3 + ${level}`, "necrotic"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Grave Bolt": {
                'system.damage.parts': [[`2d4 + 3 + ${level}`, "necrotic"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Rotting Claw": {
                'system.damage.parts': [[`1d6 + 3 + ${level}`, "slashing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Festering Aura": {
                "system.save.dc": summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formGhostly) {
    updates["actor.img"] = textureGhostly;
    updates["token.texture.src"] = textureGhostly;
    updates["actor.system.attributes.movement.fly"] = 40;
    updates["actor.system.attributes.movement.hover"] = true;
}

if (spirit.actor.name === formPutrid) {
    updates["actor.img"] = texturePutrid;
    updates["token.texture.src"] = texturePutrid;
}

if (spirit.actor.name === formSkeletal) {
    updates["actor.img"] = textureSkeletal;
    updates["token.texture.src"] = textureSkeletal;
    updates['actor.system.attributes.hp'] = { value: 20 + 10 * (level - 3), max: 20 + 10 * (level - 3) };
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Undead Spirit", updates);

//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately for further changes like animations.

if (spirit.actor.name === formPutrid) {
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