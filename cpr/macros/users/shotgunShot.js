let item = canvas.tokens.controlled[0].actor.items.find(i => i.name.startsWith("Shotgun"));
await item.update({ "system.damage": "3d6" });