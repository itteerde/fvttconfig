/**
 * Effect-Macro Macro onCreation for the Summon Beast Spell
 * 
 * https://www.dndbeyond.com/spells/summon-beast
 */

const macroLabel = "Summon Beast";
const textureLand = "modules/Tablerules/icons/magic/summons/beastialSpiritLand.webp";
const textureAir = "modules/Tablerules/icons/magic/summons/beastialSpiritAir2.webp";
const textureWater = "modules/Tablerules/icons/magic/summons/beastialSpiritWater.webp";

const addGlow = true;
const addBlur = true;

// TODO: get from context
actor = game.actors.getName("Jorrick");

// TODO: get from context
const item = actor.items.getName("Summon Beast");


const level = await warpgate.dnd5e.rollItem(item);

console.log({ message: macroLabel, level: level, arguments: arguments });

const summonerDc = actor.data.data.attributes.spelldc;
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
                    "Water breathing": warpgate.CONST.DELETE
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
    token: { "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER },
    actor: {
        'data.attributes.ac.flat': 11 + level,
        'data.attributes.hp': { value: 30 + 5 * (level - 2), max: 30 + 5 * (level - 2) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Maul": {
                'data.damage.parts': [[`1d4 + 4 + ${level}`, "piercing"]],
                'data.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            }
        }
    }

}

/* update variants */
if (spirit.actor.name === "Bestial Spirit Air") {
    console.log({ message: `${macroLabel}, updating variants (${spirit.actor.name})` });
    updates['actor.data.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Bestial Spirit", updates);

// TODO: maybe make it more robust for multiple spawns right away?
const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately

console.log({ message: macroLabel, spawn: spawn, spawnIds: spawnIds });

for (let i = 0; i < spawnIds.length; i++) {
    s = canvas.tokens.get(spawnIds[i]);
}