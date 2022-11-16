/**
 * Macro for GM Control Bar. Modifies hp.temp for the Token hovered's Actor with feedback by ChatMessage to self.
 */

const macroLabel = "ModifyTempHP";
const damage = 1;

actor = canvas.tokens.hover?.actor;

if (canvas.tokens.hover === null) {
    ui.notifications.warn(`${macroLabel}, Actor hovered ${actor?.name} invalid target.`);
    return;
}

const oldTempHP = actor.system.attributes.hp.temp;

await actor.update({ "system.attributes.hp.temp": actor.system.attributes.hp.temp - damage });

ChatMessage.create({
    content: `${macroLabel}: modifying hp.temp on ${actor.name} (${actor._id}), from ${oldTempHP} to ${actor.system.attributes.hp.temp}.`,
    whisper: [game.users.getName("GM")]
});
