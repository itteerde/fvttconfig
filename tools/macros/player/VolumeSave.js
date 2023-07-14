game.user.update({
    'flags.world': {
        globalPlaylistVolume: game.settings.get('core', 'globalPlaylistVolume'),
        globalAmbientVolume: game.settings.get('core', 'globalAmbientVolume'),
        globalInterfaceVolume: game.settings.get('core', 'globalInterfaceVolume')
    }
})