const use = await item.use();
if (!use) {
    return;
}
const DIV = document.createElement("DIV");
DIV.innerHTML = use.content;
const spellLevel = Number(DIV.firstChild.dataset.spellLevel);

await actor.update({ "system.attributes.hp.temp": Math.max(actor.system.attributes.hp.temp, spellLevel * 5) });
