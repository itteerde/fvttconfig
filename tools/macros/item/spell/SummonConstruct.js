/**
 * Item-Macro Macro onCreation for the Summon Construct Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-construct
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = item.name;
const textureClay = "modules/Tablerules/icons/magic/summons/constructSpiritClay.png";
const textureMetal = "modules/Tablerules/icons/magic/summons/constructSpiritMetal.png";
const textureStone = "modules/Tablerules/icons/magic/summons/constructSpiritStone.png";

const formClay = "Clay Construct";
const formMetal = "Metal Construct";
const formStone = "Stone Construct";

const scaleClay = 1;
const scaleMetal = 1;
const scaleStone = 1;


const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;
const level = await warpgate.dnd5e.rollItem(item);
if (!level > 0) {
    return;
}


/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: formClay,
        value: {
            token: { name: formClay },
            actor: { name: formClay },
            embedded: {
                Item: {
                    "Heated Body": warpgate.CONST.DELETE,
                    "Stone Lethargy": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formMetal,
        value: {
            actor: { name: formMetal },
            token: { name: formMetal },
            embedded: {
                Item: {
                    "Stone Lethargy": warpgate.CONST.DELETE,
                    "Berserk Lashing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formStone,
        value: {
            actor: { name: formStone },
            token: { name: formStone },
            embedded: {
                Item: {
                    "Heated Body": warpgate.CONST.DELETE,
                    "Berserk Lashing": warpgate.CONST.DELETE
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
        'system.attributes.ac.flat': 13 + level,
        'system.attributes.hp': { value: 40 + 15 * (level - 4), max: 40 + 15 * (level - 4) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Slam": {
                'system.damage.parts': [[`1d8 + 4 + ${level}`, "bludgeoning"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Stone Lethargy": {
                'system.save.dc': summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formClay) {
    updates["actor.img"] = textureClay;
    updates["token.texture.src"] = textureClay;
    updates["token.texture.scaleX"] = scaleClay;
    updates["token.texture.scaleY"] = scaleClay;
}

if (spirit.actor.name === formMetal) {
    updates["actor.img"] = textureMetal;
    updates["token.texture.src"] = textureMetal;
    updates["token.texture.scaleX"] = scaleMetal;
    updates["token.texture.scaleY"] = scaleMetal;
}

if (spirit.actor.name === formStone) {
    updates["actor.img"] = textureStone;
    updates["token.texture.src"] = textureStone;
    updates["token.texture.scaleX"] = scaleStone;
    updates["token.texture.scaleY"] = scaleStone;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Construct Spirit", updates);
//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately