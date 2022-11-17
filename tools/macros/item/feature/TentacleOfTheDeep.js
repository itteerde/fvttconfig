const macroLabel = "Tentacle of the Deep";
const texture = "icons/creatures/tentacles/tentacle-earth-green.webp";

if (await item.use() === null) {
    return;
}

const templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);

if (templates.length !== 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Place or delete to make it 1.`, { permanent: true });
    return;
}

await templates[0].update({ "texture": texture });
console.log(templates[0]);