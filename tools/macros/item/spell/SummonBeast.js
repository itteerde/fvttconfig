/**
 * Item-Macro Macro onCreation for the Summon Beast Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-beast
 * 
 */

const macroLabel = "Summon Beast";
const textureLand = "modules/Tablerules/icons/magic/summons/beastialSpiritLand.webp";
const textureAir = "modules/Tablerules/icons/magic/summons/beastialSpiritAir.webp";
const textureWater = "modules/Tablerules/icons/magic/summons/beastialSpiritWater.webp";

const scaleLand = 1;
const scaleAir = 1;
const scaleWater = 1;

const addGlow = true;
const addBlur = true;

//const item = actor.items.getName("Summon Beast"); // if used without Item-Macro (better assign by fromUUID then)
const level = foundry.utils.getProperty(await item.use({}, { skipItemMacro: true }), 'flags.dnd5e.use.spellLevel');

if (!level > 0) {
    return;
}

const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;

/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: "Bestial Spirit Land",
        value: {
            token: { name: "Bestial Spirit Land" },
            actor: { name: "Bestial Spirit Land" },
            embedded: {
                Item: {
                    "Flyby": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Bestial Spirit Air",
        value: {
            actor: { name: "Bestial Spirit Air" },
            token: { name: "Bestial Spirit Air" },
            embedded: {
                Item: {
                    "Pack Tactics": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Bestial Spirit Water",
        value: {
            actor: { name: "Bestial Spirit Water" },
            token: { name: "Bestial Spirit Water" },
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
console.log({ message: macroLabel, spirit: spirit });

/* Craft the updates that are common to all spirits */
let updates = {
    token: {
        "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER,
        "flags.Tablerules.spellLevel": level
    },
    actor: {
        'system.attributes.ac.flat': 11 + level,
        'system.attributes.hp': { value: 30 + 5 * (level - 2), max: 30 + 5 * (level - 2) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Maul": {
                'system.damage.parts': [[`1d8 + 4 + ${level}`, "piercing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === "Bestial Spirit Land") {
    updates["actor.img"] = textureLand;
    updates["token.texture.src"] = textureLand;
    updates["token.texture.scaleX"] = scaleLand;
    updates["token.texture.scaleY"] = scaleLand;
    updates["actor.system.attributes.movement.climb"] = 30;
}

if (spirit.actor.name === "Bestial Spirit Air") {
    updates['actor.system.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
    updates["actor.img"] = textureAir;
    updates["token.texture.src"] = textureAir;
    updates["token.texture.scaleX"] = scaleAir;
    updates["token.texture.scaleY"] = scaleAir;
    updates["actor.system.attributes.movement.fly"] = 60;
}

if (spirit.actor.name === "Bestial Spirit Water") {
    updates["actor.img"] = textureWater;
    updates["token.texture.src"] = textureWater;
    updates["token.texture.scaleX"] = scaleWater;
    updates["token.texture.scaleY"] = scaleWater;
    updates["actor.system.attributes.movement.swim"] = 30;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Bestial Spirit", updates);

const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately

for (let i = 0; i < spawnIds.length; i++) {
    s = canvas.tokens.get(spawnIds[i]);
}