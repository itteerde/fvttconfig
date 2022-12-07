/**
 * Item-Macro Macro onCreation for the Summon Beast Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-beast
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = "Summon Beast";
const textureLand = "modules/Tablerules/icons/magic/summons/Einhornchen_Medium_Spirit_01.webp";
const textureAir = "modules/Tablerules/icons/magic/summons/Quipper_Tiny_Spirit_01.webp";
const textureWater = "modules/Tablerules/icons/magic/summons/Giant_Octopus_Large_Spirit_01.webp";

const addGlow = true;
const addBlur = true;

//  from context (Item-Macro), drag Item in Control Bar for Control Bar use with selecting. Use next line for Control Bar without Selection providing the name (ID would be better)
//actor = game.actors.getName("Jorrick");

// TODO: get from context
const item = actor.items.getName("Summon Beast");

console.log({ message: macroLabel, actor: actor, item: item, arguments: arguments });


const level = await warpgate.dnd5e.rollItem(item);

console.log({ message: macroLabel, level: level, arguments: arguments });

if (!level > 0) {
    return;
}

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
    token: { "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER },
    actor: {
        'system.attributes.ac.flat': 11 + level,
        'system.attributes.hp': { value: 30 + 5 * (level - 2), max: 30 + 5 * (level - 2) },
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

updates["flags.Tablerules.spellLevel"] = level;

/* update variants */
if (spirit.actor.name === "Bestial Spirit Land") {
    updates["actor.img"] = textureLand;
    updates["token.texture.src"] = textureLand;
}

if (spirit.actor.name === "Bestial Spirit Air") {
    console.log({ message: `${macroLabel}, updating variants (${spirit.actor.name})` });
    updates['actor.system.attributes.hp'] = { value: 20 + 5 * (level - 2), max: 20 + 5 * (level - 2) };
    updates["actor.img"] = textureAir;
    updates["token.texture.src"] = textureAir;
}

if (spirit.actor.name === "Bestial Spirit Water") {
    updates["actor.img"] = textureWater;
    updates["token.texture.src"] = textureWater;
}

/* Combine the general and specific updates */
updates = mergeObject(updates, spirit);

const spawnIds = await warpgate.spawn("Bestial Spirit", updates);

const spawn = canvas.tokens.get(spawnIds[0]); // or canvas.scene.tokens.get(id) to get the document immediately

console.log({ message: macroLabel, spawn: spawn, spawnIds: spawnIds });

for (let i = 0; i < spawnIds.length; i++) {
    s = canvas.tokens.get(spawnIds[i]);
}