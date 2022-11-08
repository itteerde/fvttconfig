
const icon = "icons/magic/light/light-lantern-lit-white.webp";
const label = "Channel Divinity: Twilight Sanctuary";
const macroLabel = "Twilight Sanctuary";

const effect = actor.effects.find(e => e.getFlag("world", "TwilightSanctuary"));
const current = effect?.getFlag("world", "TwilightSanctuary") ?? 1;

const effectData = { icon, label, duration: { seconds: 60 } };
foundry.utils.setProperty(effectData, "flags.world.TwilightSanctuary", current);

foundry.utils.setProperty(effectData, "flags.effectmacro.onDisable", "token.document.setFlag(\'token-auras\', \'aura1.distance\',0); \nconsole.log(\'cheese and rice\');");

if (effect) {
    await effect.update(effectData);
} else {
    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}

actor.items.find(i => i.name === "Channel Divinity: Twilight Sanctuary").use();

token.document.setFlag('token-auras', 'aura1.distance', 30);
token.document.setFlag('token-auras', 'aura1.colour', "#ddddff");
token.document.setFlag('token-auras', 'aura1.opacity', 0.5);
token.document.setFlag('token-auras', 'aura1.permission', "all");
token.document.setFlag('token-auras', 'aura1.square', false);








// const twilightSanctuaryAura = token.getFlag('token-auras', 'auras');
console.log("Twilight Sanctuary is doing things!!");