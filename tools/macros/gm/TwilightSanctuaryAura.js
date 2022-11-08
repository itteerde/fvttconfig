dnd5e.documents.macro.rollItem("Channel Divinity: Twilight Sanctuary");
console.log("Twilight Sanctuary is doing things!!");

const twilightSanctuaryAura = Auras.newAura();
const myToken = canvas.tokens.placeables.filter(t => t.actor._id === actor._id);

twilightSanctuaryAura.color = "#ddddff";

await myToken.document.setFlag("world", "token-auras", twilightSanctuaryAura);








console.log(actor);