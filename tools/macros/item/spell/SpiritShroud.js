/**
 * Item-Macro for the Spirit Shroud Spell Item
 * 
 * https://www.dndbeyond.com/spells/spirit-shroud
 */

const macroLabel = "Spirit Shroud";

console.log({ message: `${macroLabel}, start.`, arguments: arguments });

const icon = "icons/magic/death/projectile-skull-fire-purple.webp";
const flags = {
    scope: "world", key: {
        "Spirit Shroud": {
            damageType: "damageType",
            damageOrigin: "damageOrigin"
        }
    }
};

const use = await item.use();
if (!use) {
    return;
}
const DIV = document.createElement("DIV");
DIV.innerHTML = use.content;
const spellLevel = Number(DIV.firstChild.dataset.spellLevel);

let effect = actor.effects.find(e => e.getFlag(flags.scope, flags.key));
console.log({ message: macroLabel, effect: effect });

if (effect) {// toggle of
    await actor.deleteEmbeddedDocuments("ActiveEffect", [effect.id]);
    return;
}

// depending on level cast at ask what demage type to use

const changes = {};
const effectData = { label: macroLabel, icon, changes, duration: { seconds: 60 } };


function possibleDamageTypes(spellLevel, spell) {

    const spells = {
        level_1: {
            "Absorb Elements": ["acid", "cold", "fire", "lightning", "thunder"]
        },
        level_2: {
            "Dragon's Breath": ["acid", "cold", "fire", "lightning", "poison"],
            "Scorching Ray": ["fire"]
        },
        level_3: {
            "Spirit Shroud": ["radiant", "necrotic", "cold"]
        },
        level_4: {
            "Sickening Radiance": ["radiant"]
        },
        level_5: {
            "Bigby's Hand": ["force", "bludgeoning"]
        },
        level_6: {
            "Sunbeam": ["radiant"]
        },
        level_7: {
            "Crown of Stars": ["radiant"]
        },
        level_8: {
            "Maddening Darkness": ["psychic"]
        },
        level_9: {
            "Prismatic Wall": ["fire", "acid", "lightning", "poison", "cold"],
            "Psychic Scream": ["psychic"]
        }
    };

    // if spell known add spell to array "sum" and do return [...new Set([...arrA, ...arrB)];

    return null;
}