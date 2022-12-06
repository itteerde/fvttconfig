/**
 * Effect-Macro Macro onCreation for the Summon Beast Spell
 * 
 * https://www.dndbeyond.com/spells/summon-beast
 */

const macroLabel = "Summon Beast";

// TODO: get from context
const actor = game.actors.getName("Jorrick");

// TODO: get from context
const item = actor.items.getName("Summon Beast");


const level = await warpgate.dnd5e.rollItem(item);

console.log({ message: macroLabel, level: level, arguments: arguments });

const summonerDc = actor.data.data.attributes.spelldc;
const summonerAttack = summonerDc - 8;

/* Prompt the user for which type of badger to summon */
const buttonData = {
    buttons: [{
        label: "Bestial Spirit Land",
        value: {
            token: { name: "Bestial Spirit Land" },
            actor: { name: "Bestial Spirit Land" },
            embedded: {
                Item: {
                    "Thick Hide": warpgate.CONST.DELETE,
                    "Regeneration": warpgate.CONST.DELETE
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
                    "Hide": warpgate.CONST.DELETE,
                    "Flatten": warpgate.CONST.DELETE,
                    "Thick Hide": {
                        'data.uses': { value: level, max: level, per: 'charges' }
                    }
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
                    "Hide": warpgate.CONST.DELETE,
                    "Flatten": warpgate.CONST.DELETE,
                    "Thick Hide": {
                        'data.uses': { value: level, max: level, per: 'charges' }
                    }
                }
            }
        }
    }
    ], title: "Which version?"
};

let badger = await warpgate.buttonDialog(buttonData);

/* Craft the updates that are common to all spiritual badgers */
let updates = {
    token: { "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER },
    actor: {
        'data.attributes.ac.flat': 11 + level,
        'data.attributes.hp': { value: 40 + 10 * (level - 4), max: 40 + 10 * (level - 4) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Claws": {
                'data.damage.parts': [[`1d8 + 2 + ${level}`]],
                'data.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            },
            "Intimidate": {
                'data.save': { ability: "wis", dc: summonerDc, scaling: "flat" }
            }
        }
    }

}

/* Combine the general and specific updates */
updates = mergeObject(updates, badger);

await warpgate.spawn("Spiritual Badger", updates);