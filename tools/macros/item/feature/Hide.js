/**
 * Item-Macro Macro for the Hide Action
 */

await item.displayCard();
const roll = new Roll("1d20+@skill", { skill: actor.getRollData().skills.ste.total, async: true });
const chatMessage = await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: `${item.name}, stealth tobreak:`
});

const stealth = chatMessage.rolls[0].total;

const effectData = { icon: item.img, label: `Stealth: (${stealth})` };
foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);
foundry.utils.setProperty(effectData, "flags.core.statusId", `Stealth: (${stealth})`);
await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);