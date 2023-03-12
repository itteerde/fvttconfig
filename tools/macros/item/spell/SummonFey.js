/**
 * Item-Macro Macro onCreation for the Summon Fey Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-fey
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = item.name;
const textureFuming = "modules/Tablerules/icons/magic/summons/feySpiritFuming.png";
const textureMirthful = "modules/Tablerules/icons/magic/summons/feySpiritMirthful.png";
const textureTricksy = "modules/Tablerules/icons/magic/summons/feySpiritTricksy.png";

const formFuming = "Fuming Fey Spirit";
const formMirthful = "Mirthful Fey Spirit";
const formTricksy = "Tricksy Fey Spirit";


const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;
const level = await warpgate.dnd5e.rollItem(item);
if (!level > 0) {
    return;
}


/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: formFuming,
        value: {
            token: { name: formFuming },
            actor: { name: formFuming },
            embedded: {
                Item: {
                    "Mirthful": warpgate.CONST.DELETE,
                    "Tricksy": warpgate.CONST.DELETE,
                    "Tricksy spell": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formMirthful,
        value: {
            actor: { name: formMirthful },
            token: { name: formMirthful },
            embedded: {
                Item: {
                    "Fuming": warpgate.CONST.DELETE,
                    "Tricksy": warpgate.CONST.DELETE,
                    "Tricksy spell": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: formTricksy,
        value: {
            actor: { name: formTricksy },
            token: { name: formTricksy },
            embedded: {
                Item: {
                    "Fuming": warpgate.CONST.DELETE,
                    "Mirthful": warpgate.CONST.DELETE
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
        'system.attributes.ac.flat': 12 + level,
        'system.attributes.hp': { value: 30 + 10 * (level - 3), max: 30 + 10 * (level - 3) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Shortsword": {
                'system.damage.parts': [[`1d6 + 3 + ${level}`, "piercing"], [`1d6`, "force"]],
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Mirthful": {
                'system.save.dc': summonerDc
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === formFuming) {
    updates["actor.img"] = textureFuming;
    updates["token.texture.src"] = textureFuming;
}

if (spirit.actor.name === formMirthful) {
    updates["actor.img"] = textureMirthful;
    updates["token.texture.src"] = textureMirthful;
}

if (spirit.actor.name === formTricksy) {
    updates["actor.img"] = textureTricksy;
    updates["token.texture.src"] = textureTricksy;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Fey Spirit", updates);
//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately