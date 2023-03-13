/**
 * Item-Macro Macro onCreation for the Summon Fey Spell, until now only tested from Control Bar.
 * 
 * https://www.dndbeyond.com/spells/summon-fey
 * 
 * TODO: clean up logging (pretty much remove, or put all to Tablerules logging with .debug() )
 */

const macroLabel = "Summon Fey";
const textureFuming = "modules/Tablerules/icons/magic/summons/beastialSpiritAir.webp";
const textureMirthful = "modules/Tablerules/icons/magic/summons/beastialSpiritLand.webp";
const textureTricksy = "modules/Tablerules/icons/magic/summons/beastialSpiritWater.webp";

const addGlow = true;
const addBlur = true;

//  from context (Item-Macro), drag Item in Control Bar for Control Bar use with selecting. Use next line for Control Bar without Selection providing the name (ID would be better)
//actor = game.actors.getName("Jorrick");

// TODO: get from context
const item = actor.items.getName("Summon Fey");

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
console.log({ message: macroLabel, spirit: spirit });

/* Craft the updates that are common to all spirits */
let updates = {
    token: {
        "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER,
        "flags.Tablerules.spellLevel": level
    },
    actor: {
        'system.attributes.ac.flat': 12 + level,
        'system.attributes.hp': { value: 30 + 10 * (level - 3), max: 30 + 10 * (level - 3) },
        "system.details.cr": actor.system.attributes.prof,
        "system.attributes.prof": actor.system.attributes.prof,
        "flags.world.summoned.item": item.uuid,
        "flags.world.summoned.actor": actor.uuid
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` },
            "Short Sword": {
                'system.damage.parts': [[`1d6 + 3 + ${level}`, "piercing"]], //Need to add 1d6 Force damage to calc.
                'system.attackBonus': `- @mod - @prof + ${summonerAttack}`,
            }
            //Bonus Action - Fey Step: The fey magically teleports up to 30 feet to an unoccupied space it can see. Then one of the following:
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