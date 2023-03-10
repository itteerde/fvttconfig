/**
 * Item-Macro Macro onCreation for the Summon Fey Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-fey
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = item.name;
const textureFuming = "modules/Tablerules/icons/magic/summons/beastialSpiritAir.webp";
const textureMirthful = "modules/Tablerules/icons/magic/summons/beastialSpiritLand.webp";
const textureTricksy = "modules/Tablerules/icons/magic/summons/beastialSpiritWater.webp";

const summonerDc = actor.system.attributes.spelldc;
const summonerAttack = summonerDc - 8;
const level = await warpgate.dnd5e.rollItem(item);
if (!level > 0) {
    return;
}


/* Prompt the user for which type of spirit to summon */
const buttonData = {
    buttons: [{
        label: "Fuming Fey Spirit",
        value: {
            token: { name: "Fuming Fey Spirit" },
            actor: { name: "Fuming Fey Spirit" },
            embedded: {
                Item: {
                    "Flyby": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Mirthful Fey Spirit",
        value: {
            actor: { name: "Mirthful Fey Spirit" },
            token: { name: "Mirthful Fey Spirit" },
            embedded: {
                Item: {
                    "Pack Tactics": warpgate.CONST.DELETE,
                    "Water Breathing": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: "Tricksy Fey Spirit",
        value: {
            actor: { name: "Tricksy Fey Spirit" },
            token: { name: "Tricksy Fey Spirit" },
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
        'system.attributes.ac.flat': 12 + level,
        'system.attributes.hp': { value: 30 + 10 * (level - 3), max: 30 + 10 * (level - 3) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Maul": {
                'system.damage.parts': [[`1d6 + 3 + ${level}`, "piercing"]], //Need to add 1d6 Force damage to calc.
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            }
        }
    }
}

/* update variants */
if (spirit.actor.name === "Fuming Fey Spirit") {
    updates["actor.img"] = textureFuming;
    updates["token.texture.src"] = textureFuming;
    updates["actor.system.attributes.movement.climb"] = 30; //All forms only have 40ft movement
}

if (spirit.actor.name === "Mirthful Fey Spirit") {
    updates['actor.system.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
    updates["actor.img"] = textureMirthful;
    updates["token.texture.src"] = textureMirthful;
    updates["actor.system.attributes.movement.fly"] = 60;
}

if (spirit.actor.name === "Tricksy Fey Spirit") {
    updates["actor.img"] = textureTricksy;
    updates["token.texture.src"] = textureTricksy;
    updates["actor.system.attributes.movement.swim"] = 30;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Bestial Spirit", updates);
//const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately