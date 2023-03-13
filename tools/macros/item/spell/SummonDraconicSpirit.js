/**
 * Item-Macro Macro onCreation for the Summon Draconic Spirit Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-fey
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = item.name;
const textureChromatic = "modules/Tablerules/icons/magic/summons/draconicSpiritChromatic.png";
const textureMetallic = "modules/Tablerules/icons/magic/summons/draconicSpiritMetallic.png"
const textureGem = "modules/Tablerules/icons/magic/summons/draconicSpiritGem.png";

const formChromatic = "Chromatic Dragon Spirit";
const formMetallic = "Metallic Dragon Spirit";
const formGem = "Gem Dragon Spirit";

const scaleChromatic = 1;
const scaleMetallic = 1;
const scaleGem = 1;


const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;
const level = await warpgate.dnd5e.rollItem(item);
if (!level > 0) {
    return;
}


/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: formChromatic,
        value: {
            token: { name: formChromatic },
            actor: { name: formChromatic },
            embedded: {
                Item: {
                    "Breath Weapon - Force": warpgate.CONST.DELETE,
                    "Breath Weapon - Necrotic": warpgate.CONST.DELETE,
                    "Breath Weapon - Psychic": warpgate.CONST.DELETE,
                    "Breath Weapon - Radiant": warpgate.CONST.DELETE,
                    "Breath Weapon - Thunder": warpgate.CONST.DELETE,
                    "Shared Resistances - Force": warpgate.CONST.DELETE,
                    "Shared Resistances - Necrotic": warpgate.CONST.DELETE,
                    "Shared Resistances - Psychic": warpgate.CONST.DELETE,
                    "Shared Resistances - Radiant": warpgate.CONST.DELETE,
                    "Shared Resistances - Thunder": warpgate.CONST.DELETE
                }
            }
        }
    },
    {
        label: formMetallic,
        value: {
            token: { name: formMetallic },
            actor: { name: formMetallic },
            embedded: {
                Item: {
                    "Breath Weapon - Force": warpgate.CONST.DELETE,
                    "Breath Weapon - Necrotic": warpgate.CONST.DELETE,
                    "Breath Weapon - Psychic": warpgate.CONST.DELETE,
                    "Breath Weapon - Radiant": warpgate.CONST.DELETE,
                    "Breath Weapon - Thunder": warpgate.CONST.DELETE,
                    "Shared Resistances - Force": warpgate.CONST.DELETE,
                    "Shared Resistances - Necrotic": warpgate.CONST.DELETE,
                    "Shared Resistances - Psychic": warpgate.CONST.DELETE,
                    "Shared Resistances - Radiant": warpgate.CONST.DELETE,
                    "Shared Resistances - Thunder": warpgate.CONST.DELETE
                }
            }
        }
    },
    {
        label: formGem,
        value: {
            actor: { name: formGem },
            token: { name: formGem },
            embedded: {
                Item: {
                    "Breath Weapon - Acid": warpgate.CONST.DELETE,
                    "Breath Weapon - Cold": warpgate.CONST.DELETE,
                    "Breath Weapon - Fire": warpgate.CONST.DELETE,
                    "Breath Weapon - Lightning": warpgate.CONST.DELETE,
                    "Breath Weapon - Poison": warpgate.CONST.DELETE,
                    "Shared Resistances - Acid": warpgate.CONST.DELETE,
                    "Shared Resistances - Cold": warpgate.CONST.DELETE,
                    "Shared Resistances - Fire": warpgate.CONST.DELETE,
                    "Shared Resistances - Lightning": warpgate.CONST.DELETE,
                    "Shared Resistances - Poison": warpgate.CONST.DELETE
                }
            }
        }
    },
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
        'system.attributes.ac.flat': 14 + level,
        'system.attributes.hp': { value: 50 + 10 * (level - 5), max: 50 + 10 * (level - 5) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Rend": {
                'system.damage.parts': [[`1d6 + 4 + ${level}`, "piercing"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Breath Weapon - Acid": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Cold": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Fire": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Lightning": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Poison": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Force": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Necrotic": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Psychic": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Radiant": {
                'system.save.dc': summonerDc
            },
            "Breath Weapon - Thunder": {
                'system.save.dc': summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formChromatic) {
    updates["actor.img"] = textureChromatic;
    updates["token.texture.src"] = textureChromatic;
    updates["token.texture.scaleX"] = scaleChromatic;
    updates["token.texture.scaleY"] = scaleChromatic;
}

if (spirit.actor.name === formMetallic) {
    updates["actor.img"] = textureMetallic;
    updates["token.texture.src"] = textureMetallic;
    updates["token.texture.scaleX"] = scaleMetallic;
    updates["token.texture.scaleY"] = scaleMetallic;
}

if (spirit.actor.name === formGem) {
    updates["actor.img"] = textureGem;
    updates["token.texture.src"] = textureGem;
    updates["token.texture.scaleX"] = scaleGem;
    updates["token.texture.scaleY"] = scaleGem;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Draconic Spirit", updates);
//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately