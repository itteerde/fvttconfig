ui.notifications.info(`Saving volumes: globalPlaylistVolume=${game.settings.get('core', 'globalPlaylistVolume')}, globalAmbientVolume=${game.settings.get('core', 'globalAmbientVolume')}, globalInterfaceVolume=${game.settings.get('core', 'globalInterfaceVolume')}`, { permanent: true });
ui.notifications.info("Volume values are on a logarithmic scale within a range of 0-1. Don't be alarmed by low values.",
    { permanent: true })

game.user.update({
    'flags.world': {
        globalPlaylistVolume: game.settings.get('core', 'globalPlaylistVolume'),
        globalAmbientVolume: game.settings.get('core', 'globalAmbientVolume'),
        globalInterfaceVolume: game.settings.get('core', 'globalInterfaceVolume')
    }
})