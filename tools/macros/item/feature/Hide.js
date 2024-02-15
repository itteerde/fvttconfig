/**
 * Item-Macro Macro for the Hide Action
 */

const showValue = false;

await item.displayCard();

const buttons = {
    advantage: {
        label: "Advantage",
        callback: () => "advantage",
    },
    normal: {
        label: "Normal",
        callback: () => "normal",
    },
    disadvantage: {
        label: "Disadvantage",
        callback: () => "disadvantage",
    }
}

const modifier = await Dialog.wait({ title: item.name, buttons, close: () => null });
if (!modifier) return;

let rollFormula = "1d20+@skill";

if (modifier === "advantage") {
    rollFormula = "2d20kh1+@skill";
}

if (modifier === "disadvantage") {
    rollFormula = "2d20kl1+@skill";
}

const roll = await new Roll(rollFormula, { skill: actor.getRollData().skills.ste.total, async: true });
const chatMessage = await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: `${item.name}, stealth to break:`
}, { rollMode: CONST.DICE_ROLL_MODES.BLIND });

const stealth = chatMessage.rolls[0].total;

let effect = actor.getEmbeddedCollection("ActiveEffect").find(e => e.name === "Stealth");

if (effect === undefined) {
    const effectData = { icon: item.img, name: showValue ? `Stealth: (${stealth})` : "Stealth", statuses: [showValue ? `Stealth: (${stealth})` : "Stealth"] };
    foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);
    //foundry.utils.setProperty(effectData, "flags.core.statusId", showValue ? `Stealth: (${stealth})` : "Stealth");
    foundry.utils.setProperty(effectData, "flags.world.stealth", stealth);

    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
} else {
    await effect.update({ "flags.world.stealth": stealth });
}

