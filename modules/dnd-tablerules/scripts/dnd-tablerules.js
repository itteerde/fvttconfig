const MODULE_SCOPE = "Tablerules"; // don't change without serious consideration, unless making a copy setting up a new Module (if changing for a System already used it might be necessary to fork the repository for that System -- unless there comes a time where no instance is currently used, including backups).

var start_time = performance.now(); // should this be let?
console.log(`${MODULE_SCOPE} is loading.`);

class TRUtils {

    static isDebugEnabled() {
        return (game.settings.get(MODULE_SCOPE, "logLevel") >= 3);
    }

    static registerSettings() {
        game.settings.register(MODULE_SCOPE, 'isEnabled', {
            name: "Enable Tablerules",
            hint: "Enables Tablerules Module changes. If we ever implement this disabling this setting will make all other Tablerules settings be ignored and return the stuff that has settings configured return to what it is without the Module. This has no effect as of now, and might just get removed instead of being implemented in the future.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, 'reduceExhaustionOnLongRest', {
            name: "Long Rest does reduce Exhaustion",
            hint: "Without this enabled Exhaustion is not automatically reduced by one per Long Rest.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "incapacitatedCondition", {
            name: "Incapacitated Condition",
            hint: "Displays Incapacitated, Prone, Unconscious Token's Actor's hp.value hp is 0 hp",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "whispersIncludeGM", {
            name: "Whispers, add GM",
            hint: "adds the GM to all whispered chat messages",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "modifyDefaultVolumes", {
            name: "Modify Default Volumes",
            hint: "modified the core default volumes, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalPlaylistVolume", {
            name: "globalPlaylistVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalAmbientVolume", {
            name: "globalAmbientVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "globalInterfaceVolume", {
            name: "globalInterfaceVolume default overwrite value",
            hint: "if Modify Default Volumes is enabled this overwrites the core default",
            scope: "world",
            config: true,
            default: 0.1,
            type: Number,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "modifyChatBubbles", {
            name: "Modify Chat Bubbles",
            hint: "modified the core default for chatBubbles, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "chatBubbles", {
            name: "Chat Bubbles",
            hint: "if Modify Chat Bubbles is enabled: modifies the core default for chatBubbles, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "chatBubblesPan", {
            name: "Chat Bubbles Pan",
            hint: "if Modify Chat Bubbles is enabled: modifies the core default for chatBubblesPan, if enabled the Module checks the current settings and adjusts them to the configured below values if they are at assumed core default values.",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "useAdditionalStatuses", {
            name: "Use Additional Statuses",
            hint: "if active the additional statuses from Add additional Statuses are added.",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "additionalStatuses", {
            name: "Add additional Statuses (Conditions)",
            hint: "Adds the Statuses to CONFIG.statusEffects. By core they would be at the end. Monks (Details?) sorts them after adding though, so they will be in alphabetical order. The JSON String is not checked. So currently this is easy to break.",
            scope: "world",
            config: true,
            default: '[{"id":"surprised","name":"Surprised","icon":"icons/magic/control/fear-fright-white.webp"}]',
            type: String,
            requiresReload: true
        });

        game.settings.register(MODULE_SCOPE, "logLevel", {
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

        game.settings.register(MODULE_SCOPE, 'logOwn', {
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

    static SCOPE = MODULE_SCOPE;
    static LOGLEVEL = {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3
    };

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
            console.log({ message: `${MODULE_SCOPE} | ${levelstring}: ${message}`, obj: typeof message === "object" ? message : null });
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

Hooks.on("preCreateChatMessage", (messageDoc, rawMessageData, context, userId) => {

    if (!game.settings.get(MODULE_SCOPE, "whispersIncludeGM") || !game.settings.get("Tablerules", "isEnabled")) {
        return;
    }

    const gmWhisperIds = ChatMessage.getWhisperRecipients("gm").map(i => i.id) // get all gm ids in the world
    let whisperArray = foundry.utils.duplicate(messageDoc.whisper) // Copy our array out
    if (whisperArray.length === 0) return // Not a whisper if there's no whisper ids


    for (let gmId of gmWhisperIds) {// Push each gm id into the array of whisper ids
        if (gmId === game.user.id) continue // You never include yourself in the whisper so this would erronously add yourself causing the "we changed the array! trigger later on"
        if (!whisperArray.includes(gmId)) {
            whisperArray.push(gmId)
        }
    }

    if (whisperArray.length !== messageDoc.whisper.length) { //only modify if needed
        let userListString = ""
        for (let userId of messageDoc.whisper) {
            userListString = userListString + game.users.get(userId).name + ", "
        }
        userListString = userListString.slice(0, -2)

        messageDoc.updateSource({
            content: `${messageDoc.content}`,//<br>Original Whisper Recipients: ${userListString}`,
            whisper: whisperArray
        })
    }
})

/**
 * @todo Should be conditional on Module-global active Setting
 */
Hooks.on("ready", function () {
    console.log(`${MODULE_SCOPE} hooked onto ready.`);

    Tablerules.config.loglevel = game.settings.get(MODULE_SCOPE, "logLevel");
    Tablerules.config.logOwn = game.settings.get(MODULE_SCOPE, "logOwn");

    if (game.settings.get(MODULE_SCOPE, "modifyDefaultVolumes")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalPlaylistVolume").value.default === game.settings.get("core", "globalPlaylistVolume")) {
            game.settings.set("core", "globalPlaylistVolume", game.user.flags?.world?.globalPlaylistVolume ?? game.settings.get(MODULE_SCOPE, "globalPlaylistVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalAmbientVolume").value.default === game.settings.get("core", "globalAmbientVolume")) {
            game.settings.set("core", "globalAmbientVolume", game.user.flags?.world?.globalAmbientVolume ?? game.settings.get(MODULE_SCOPE, "globalAmbientVolume"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.globalInterfaceVolume").value.default === game.settings.get("core", "globalInterfaceVolume")) {
            game.settings.set("core", "globalInterfaceVolume", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "globalInterfaceVolume"));
        }

        ui.sidebar.tabs.playlists.render();
    }

    if (game.settings.get(MODULE_SCOPE, "modifyChatBubbles")) {
        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubbles").value.default === game.settings.get("core", "chatBubbles")) {
            game.settings.set("core", "chatBubbles", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "chatBubbles"));
        }

        if (Array.from(game.settings.settings, ([key, value]) => ({ key, value })).find(e => e.key === "core.chatBubblesPan").value.default === game.settings.get("core", "chatBubblesPan")) {
            game.settings.set("core", "chatBubblesPan", game.user.flags?.world?.globalInterfaceVolume ?? game.settings.get(MODULE_SCOPE, "chatBubblesPan"));
        }
    }

    if (game.settings.get(MODULE_SCOPE, "useAdditionalStatuses")) {
        CONFIG.statusEffects = CONFIG.statusEffects.concat(JSON.parse(game.settings.get("Tablerules", "additionalStatuses")));
    }

});

Hooks.on("getChatLogEntryContext", (html, options) => {
    const condition = (li) => {
        const message = game.messages.get(li.data("messageId"));
        return (message?.isRoll && message?.isContentVisible && canvas.tokens.controlled.length);
    }

    const callback = (li) => {
        const message = game.messages.get(li.data("messageId"));
        const roll = message.rolls[0];
        canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(Math.floor(roll.total * 0.25)));
    }

    options.push({
        name: "Apply Quarter Damage",
        icon: `<i class="fas fa-user-clock"></i>`,
        condition,
        callback,
    });

    /**
     * remove ChatLog context menu option to delete ChatMessage
     */
    let idx = -1;
    for (let i = 0; i < options.length; i++) {
        if (options[i].name === "SIDEBAR.Delete") {
            idx = i;
            break;
        }
    }
    if (idx > -1) {
        options.splice(idx, 1);
    } else {
        console.warning("Tablerules: no ChatLog context menu delete ChatMessage option to be removed found.");
    }

});

/**
 * @todo Remove the Conditions stuff no longer needed after complete migration to dnd5e 4.x.
 */
Hooks.on("updateActor", async function (actor, update, options, userId) {

    if (TRUtils.isDebugEnabled()) {
        Tablerules.debug({
            message: `${MODULE_SCOPE}.updateActor`,
            actor: actor,
            update: update,
            options: options,
            userId: userId
        });
    }

    if (game.user.id !== userId) return;
    if (!foundry.utils.hasProperty(update, "system.attributes.hp.value")) return;

    if (game.settings.get(MODULE_SCOPE, "incapacitatedCondition")) {

        if (update.system.attributes.hp.value === 0) {
            await actor.toggleStatusEffect("incapacitated");
            await actor.toggleStatusEffect("prone");
            await actor.toggleStatusEffect("unconscious");
        }
    }


});

console.log(`${MODULE_SCOPE} has been loaded (${performance.now() - start_time}ms).`);