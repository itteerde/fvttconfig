console.log(`Tablerules loading.`);

class TRUtils {

    static isDebugEnabled() {
        return (game.settings.get("Tablerules", "logLevel") >= 3);
    }

    static registerSettings() {
        game.settings.register('Tablerules', 'isEnabled', {
            name: "Enable Tablerules",
            hint: "Enables Tablerules Module changes. If we ever implement this disabling this setting will make all other Tablerules settings be ignored and return the stuff that has settings configured return to what it is without the Module. This has no effect as of now, and might just get removed instead of being implemented in the future.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "whispersIncludeGM", {
            name: "Whispers, add GM (not implemented yet)",
            hint: "adds the GM to all whispered chat messages",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "modifyDefaultVolumes", {
            name: "Modify Default Volumes",
            hint: "modified the core default volumes, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "globalPlaylistVolume", {
            name: "globalPlaylistVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register("Tablerules", "globalAmbientVolume", {
            name: "globalAmbientVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register("Tablerules", "globalInterfaceVolume", {
            name: "globalInterfaceVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register("Tablerules", "logLevel", {
            name: "Log Level",
            hint: "The Module's own log level. By default FVTT and the module don't log debug and info. Set to error for normal operation and debug for development.",
            scope: 'world',
            config: true,
            default: "error",
            type: Number,
            choices: {
                0: "error",
                1: "warning",
                2: "info",
                3: "debug"
            },
            requiresReload: true
        });

        game.settings.register('Tablerules', 'logOwn', {
            name: "Use own logging function.",
            hint: "Enable to log using own logging method. Disable for play and enable for development if debugging (with Log Level set to debug above).",
            scope: 'world',
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });
    }

}

class Tablerules {

    static SCOPE = "Tablerules";
    static LOGLEVEL = {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3
    };

    /**
     * check usage and remove.
     */
    static config = {
        loglevel: 0,
        logOwn: false
    }

    static log(level, message) {
        let levelstring;

        switch (level) {
            case 0:
                levelstring = "ERROR";
                break;
            case 1:
                levelstring = "WARNING";
                break;
            case 2:
                levelstring = "INFO";
                break;
            case 3:
                levelstring = "DEBUG";
                break;
            default:
                console.error("No logging level set.");
                console.error(message);
        }

        if (typeof message === "object") {
            console.log(message);
        } else {
            console.log({ message: "Tablerules | " + levelstring + ":" + message, obj: typeof message === "object" ? message : null });
        }
    }

    static debug(message) {
        if (Tablerules.config.loglevel < 3)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(3, message);
        } else {
            console.debug(message);
        }
    }

    static error(message) {
        if (Tablerules.config.logOwn) {
            Tablerules.log(0, message);
        } else {
            console.error(message);
        }
    }

    static warn(message) {
        if (Tablerules.config.loglevel < 1)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(1, message);
        } else {
            console.warn(message);
        }
    }

    static info(message) {
        if (Tablerules.config.loglevel < 2)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(2, message);
        } else {
            console.info(message);
        }
    }

}

Hooks.on('init', () => {
    TRUtils.registerSettings();
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");

    Tablerules.config.loglevel = game.settings.get("Tablerules", "logLevel");
    Tablerules.config.logOwn = game.settings.get("Tablerules", "logOwn");

    if (game.settings.get("Tablerules", "modifyDefaultVolumes")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalPlaylistVolume").value.default === game.settings.get("core", "globalPlaylistVolume")) {
            game.settings.set("core", "globalPlaylistVolume", game.user.flags?.world?.globalPlaylistVolume ?? game.settings.get("Tablerules", "globalPlaylistVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalAmbientVolume").value.default === game.settings.get("core", "globalAmbientVolume")) {
            game.settings.set("core", "globalAmbientVolume", game.user.flags?.world?.globalAmbientVolume ?? game.settings.get("Tablerules", "globalAmbientVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalInterfaceVolume").value.default === game.settings.get("core", "globalInterfaceVolume")) {
            game.settings.set("core", "globalInterfaceVolume", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get("Tablerules", "globalInterfaceVolume"));
        }

        ui.sidebar.tabs.playlists.render();
    }

});


console.log(`Tablerules has been loaded.`);
