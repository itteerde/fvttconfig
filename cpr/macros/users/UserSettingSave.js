ui.notifications.info(`Saving volumes: globalPlaylistVolume=${game.settings.get('core', 'globalPlaylistVolume')}, globalAmbientVolume=${game.settings.get('core', 'globalAmbientVolume')}, globalInterfaceVolume=${game.settings.get('core', 'globalInterfaceVolume')}`, { permanent: true });
ui.notifications.info("Volume values are on a logarithmic scale within a range of 0-1. Don't be alarmed by low values.", { permanent: true });

ui.notifications.info(`Saving current chat bubble setting (display=${game.settings.get("core", "chatBubbles")}, pan=${game.settings.get("core", "chatBubblesPan")}) to server.`, { permanent: true })

game.user.update({
    'flags.world': {
        globalPlaylistVolume: game.settings.get('core', 'globalPlaylistVolume'),
        globalAmbientVolume: game.settings.get('core', 'globalAmbientVolume'),
        globalInterfaceVolume: game.settings.get('core', 'globalInterfaceVolume'),
        chatBubbles: game.settings.get("core", "chatBubbles"),
        chatBubblesPan: game.settings.get("core", "chatBubblesPan")
    }
})