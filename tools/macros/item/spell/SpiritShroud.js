/**
 * Item-Macro for the Spell Items with Order of Scribes
 * 
 * Plan: before Item.use() open a Dialog asking which Spell Slot to use, lookup what spells at that level are on 
 * the Actor and collect all their damage types. Select one of those types and Item.use() the spell, maybe even
 * only after having changed the spell's damage type. Maybe also not using the Resource for Scorching Ray (or even
 * count its uses after first use [in that case extra uses would have to be fired of to reset the item or there
 * needts to be a resetting macro]).
 * 
 * proof of concept with Spirit Shroud.
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


function possibleDamageTypes(spellLevel, actor) {

    const spells = [
        { level: 1, name: "Absorb Elements", damageTypes: ["acid", "cold", "fire", "lightning", "thunder"] },
        { level: 2, name: "Dragon's Breath", damageTypes: ["acid", "cold", "fire", "lightning", "poison"] },
        { level: 2, name: "Scorching Ray", damageTypes: ["fire"] },
        { level: 3, name: "Spirit Shroud", damageTypes: ["radiant", "necrotic", "cold"] },
        { level: 4, name: "Sickening Radiance", damageTypes: ["radiant"] },
        { level: 5, name: "Bigby's Hand", damageTypes: ["force", "bludgeoning"] },
        { level: 6, name: "Sunbeam", damageTypes: ["radiant"] },
        { level: 7, name: "Crown of Stars", damageTypes: ["radiant"] },
        { level: 8, name: "Maddening Darkness", damageTypes: ["psychic"] },
        { level: 9, name: "Prismatic Wall", damageTypes: ["fire", "acid", "lightning", "poison", "cold"] },
        { level: 9, name: "Psychic Scream", damageTypes: ["psychic"] }
    ]

    damageTypes = [];
    // if spell known add spell to array "sum" and do return [...new Set([...arrA, ...arrB)];
    return damageTypes;
};