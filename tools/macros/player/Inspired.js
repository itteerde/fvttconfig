if (game.folders.find(f => f.name === "PCs").contents.filter(c => c.type === "character" && !c.system.attributes.inspiration) > 0) {
    ChatMessage.create({
        content: `Slept through Inspirations:<br/>${game.folders.find(f => f.name === "PCs").contents.filter(c => c.type === "character" && !c.system.attributes.inspiration).map(a => a.name)}`
    })
} else {
    ui.notifications.warn("Nobody needs Inspiration.");
}
