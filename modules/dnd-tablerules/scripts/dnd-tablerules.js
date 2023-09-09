var start_time = performance.now();
console.log("Tablerules is loading.");

class Timer {
    // for example
    // TIMER.logTimeByFunction("test",0,()=>{console.log("testing")})
    static logTimeByFunctionSync = (message, funct) => {
        const start = performance.now();
        const returnValue = funct();
        console.log(`${message}, function: ${funct}, time: ${performance.now() - start}ms`);// to be LOGGER in CPR
        return returnValue;
    }

    static logTimeByFunctionAsync = (message, funct) => {
        const start = performance.now();
        const returnValue = funct();
        console.log(`${message}, function: ${funct}, time: ${performance.now() - start}ms`);// to be LOGGER in CPR
        return returnValue;
    }
}

class MeasuringPoint {

    constructor(key, label) {
        this.key = key;
        this.label = label;
        count = 0;
        min = NaN;
        max = NaN;
        average = NaN;
    }

    addResult(measurement) {

        count++;

        if (min === NaN || min > measurement) {
            min = measurement;
        }

        if (max === NaN || max < measurement) {
            max = measurement;
        }

        if (average === NaN) {
            average = measurement;
        } else {
            average += ((measurement - average) / (count + 1));
        }
    }

}

class Performance {

    constructor() {
        const map = new Map();
    }

    getMeasuringPoint(key) {
        return map[key];
    }

    report() {
        map.forEach((values, keys) => {
            console.log({
                label: values.label,
                key: values.key,
                count: values.count,
                min: values.min,
                max: values.max,
                average: values.average
            })
        })
    }
}

/*
    Should be moved into Tablerules.config. At least do not make anything new in CONFIG.
*/
CONFIG["Tablerules"] = {
    "guidance": { maxTimesPerLongRest: 1 }
};


class TRUtils {

    static isDebugEnabled() {
        return (game.settings.get("Tablerules", "logLevel") >= 3);
    }

    /**
     * Distance between two Tokens.
     * 
     * @param {Token} tokenSource One of the two Tokens.
     * @param {Token} tokenTarget The other Token.
     * @param {boolean} [in3D=true] false if to ignore elevation difference. By default true meassuring 3-dimensional.
     * @returns {number} the distance.
     */
    static distanceTokens(tokenSource, tokenTarget, in3D = true) {
        const distance = Math.round(canvas.grid.measureDistance(tokenSource, tokenTarget, { gridSpaces: true }));
        if (!in3D)
            return distance;

        return Math.round(Math.sqrt(distance * distance + (tokenSource.document.elevation - tokenTarget.document.elevation) * (tokenSource.document.elevation - tokenTarget.document.elevation)));
    }

    /**
       * Distance between two placeables.
       * 
       * @param {Placable} source One of the two placables.
       * @param {Placable} target The other placables.
       * @param {boolean} [in3D=false] false if to ignore elevation difference. By default true meassuring 3-dimensional.
       * @returns {number} the distance.
       */
    static distancePlacables(source, target, in3D = false) {
        const distance = Math.round(canvas.grid.measureDistance(source, target, { gridSpaces: true }));
        if (!in3D)
            return distance;

        return Math.round(Math.sqrt(distance * distance + (source.document.elevation - target.document.elevation) * (source.document.elevation - target.document.elevation)));
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

        game.settings.register('Tablerules', 'deathSaveDC', {
            name: "Death Save DC",
            hint: "This will set the DC of Deathsaves. Setting of 10 is the D&D 5e default, other values enable for brighter or darker games, such as 15 for Tomb of Annihilation.",
            scope: 'world',
            config: true,
            default: 10,
            type: Number,
            requiresReload: true
        });

        game.settings.register('Tablerules', 'noHealOnLongRest', {
            name: "Long Rest does not reset HP",
            hint: "Typically, all HP are regained on a Long Rest. This will disable that feature.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register('Tablerules', 'reduceExhaustionOnLongRest', {
            name: "Long Rest does reduce Exhaustion",
            hint: "Without this enabled Exhaustion is not automatically reduced by one per Long Rest.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "woundedCondition", {
            name: "Wounded Condition",
            hint: "Displays a Wounded Active Status Effect when the Token's Actor's hp.value hp is 0 < hp < hp.max*value",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "woundedConditionThreshold", {
            name: "Wounded Condition Threshold",
            hint: "Displays a Wounded Active Status Effect when the Token's Actor's hp.value hp is 0 < hp < hp.max*value if Wounded Condition is enabled.",
            scope: "world",
            config: true,
            default: 0.5,
            type: Number,
            requiresReload: true
        });

        game.settings.register("Tablerules", "incapacitatedCondition", {
            name: "Incapacitated Condition",
            hint: "Displays a Incapacitated Active Status Effect when the Token's Actor's hp.value hp is 0 hp",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "incapacitatedConditionLabel", {
            name: "Incapacitated Condition Label",
            hint: "if Incapacitated Condition, label text to use",
            scope: "world",
            config: true,
            default: "Incapacitated & Unconscious",
            type: String,
            requiresReload: true
        });

        game.settings.register("Tablerules", "chatLogEntryContext_ApplyDamageMinusThree", {
            name: "ChatLogEntryContext, add option to apply damage minus three (Heavy Armor Master Feat)",
            hint: "canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(Math.max(roll.total - 3, 0)));",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "chatLogEntryContext_ApplyHalfDamageMinusThree", {
            name: "ChatLogEntryContext, add option to apply half damage minus three (Heavy Armor Master Feat)",
            hint: "canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(Math.max(Math.floor(roll.total/2) - 3, 0)));",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            requiresReload: true
        });

        game.settings.register("Tablerules", "whispersIncludeGM", {
            name: "Whispers, add GM",
            hint: "adds the GM to all whispered chat messages",
            scope: "world",
            config: true,
            default: true,
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

    static async dnd5ePreRollDeathSave() {

        arguments[1].targetValue = game.settings.get("Tablerules", "deathSaveDC");
        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "Tablerules.dnd5ePreRollDeathSave", object: arguments });
        }

    }

}

/**
 * modify resting rules
 * - no hp gain on long rest
 * - reset death saves (as they are now not reset on healing)
 */
Hooks.on("dnd5e.preRestCompleted", function () {
    if (arguments[1].longRest) {
        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "preventing healing on Long Rest.", arguments: arguments });
        }
        arguments[1].updateData["system.attributes.hp.value"] -= arguments[1].dhp;
        arguments[1].dhp = 0;

        if (game.settings.get("Tablerules", "reduceExhaustionOnLongRest")) {
            arguments[1].updateData["system.attributes.exhaustion"] = Math.max(arguments[0].system.attributes.exhaustion - 1, 0);
        }
    }

    arguments[1].updateData["system.attributes.death.success"] = 0;
    arguments[1].updateData["system.attributes.death.failure"] = 0;
});

Hooks.on("dnd5e.preRollDeathSave", function () {
    return Tablerules.dnd5ePreRollDeathSave(...arguments);
});

Hooks.on('init', () => {
    TRUtils.registerSettings();

    /**
     * Add ChatLog context menu option to apply damage minus three (Heavy Armor Master)
     */
    if (game.settings.get("Tablerules", "chatLogEntryContext_ApplyDamageMinusThree")) {
        Hooks.on("getChatLogEntryContext", (html, options) => {
            const condition = (li) => {
                const message = game.messages.get(li.data("messageId"));
                return (message?.isRoll && message?.isContentVisible && canvas.tokens.controlled.length);
            }

            const callback = (li) => {
                const message = game.messages.get(li.data("messageId"));
                const roll = message.rolls[0];
                canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(Math.max(roll.total - 3, 0)));
            }

            options.push({
                name: "Apply Damage -3",
                icon: `<i class="fas fa-user-clock"></i>`,
                condition,
                callback,
            });
        });
    }

    /**
     * Add ChatLog context menu option to apply half damage minus three (Heavy Armor Master)
     */
    if (game.settings.get("Tablerules", "chatLogEntryContext_ApplyDamageMinusThree")) {
        Hooks.on("getChatLogEntryContext", (html, options) => {
            const condition = (li) => {
                const message = game.messages.get(li.data("messageId"));
                return (message?.isRoll && message?.isContentVisible && canvas.tokens.controlled.length);
            }

            const callback = (li) => {
                const message = game.messages.get(li.data("messageId"));
                const roll = message.rolls[0];
                canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(Math.max(Math.floor(roll.total / 2) - 3, 0)));
            }

            options.push({
                name: "Apply Half Damage -3",
                icon: `<i class="fas fa-user-clock"></i>`,
                condition,
                callback,
            });
        });
    }

});

Hooks.on("preCreateChatMessage", (messageDoc, rawMessageData, context, userId) => {

    if (!game.settings.get("Tablerules", "whispersIncludeGM") || !game.settings.get("Tablerules", "isEnabled")) {
        return;
    }

    const gmWhisperIds = ChatMessage.getWhisperRecipients("gm").map(i => i.id) // get all gm ids in the world
    let whisperArray = duplicate(messageDoc.whisper) // Copy our array out
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

Hooks.on("getChatLogEntryContext", (html, options) => {
    const condition = (li) => {
        const message = game.messages.get(li.data("messageId"));
        return (message?.isRoll && message?.isContentVisible && canvas.tokens.controlled.length);
    }

    const callback = (li) => {
        const message = game.messages.get(li.data("messageId"));
        const roll = message.rolls[0];
        canvas.tokens.controlled.forEach(t => t.actor?.applyDamage(roll.total, 0.25));
    }

    /**
     * remove ChatLog context menu option to delete ChatMessage
     */
    options.push({
        name: "Apply Quarter Damage",
        icon: `<i class="fas fa-user-clock"></i>`,
        condition,
        callback,
    });

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

Hooks.on("updateActor", async function (actor, update, options, userId) {

    if (TRUtils.isDebugEnabled()) {
        Tablerules.debug({
            message: "Tablerules.updateActor",
            actor: actor,
            update: update,
            options: options,
            userId: userId
        });
    }

    if (game.user.id !== userId) return;
    if (!foundry.utils.hasProperty(update, "system.attributes.hp.value")) return;

    if (game.settings.get("Tablerules", "woundedCondition")) {
        let effectsWoundedIds = actor.effects.filter(e => e.label === "Wounded").map(e => e.id);

        if (update.system.attributes.hp.value > 0 && update.system.attributes.hp.value <= game.settings.get("Tablerules", "woundedConditionThreshold") * actor.system.attributes.hp.max) {
            if (effectsWoundedIds.length === 0) {
                const effectData = {
                    icon: "modules/Tablerules/icons/conditions/wounded.svg",
                    label: "Wounded",
                    statuses: ["Wounded"]
                };
                await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
            }
        } else {
            if (effectsWoundedIds.length > 0) {
                await actor.deleteEmbeddedDocuments("ActiveEffect", effectsWoundedIds);
            }
        }
    }

    if (game.settings.get("Tablerules", "incapacitatedCondition")) {

        let effectsIncapacitatedIds = actor.effects.filter(e => e.label === game.settings.get("Tablerules", "incapacitatedConditionLabel")).map(e => e.id);
        let effectsProneIds = actor.effects.filter(e => e.label === "Prone").map(e => e.id);

        if (update.system.attributes.hp.value === 0) {

            if (effectsIncapacitatedIds.length === 0) {
                const effectDataIncapacitated = {
                    icon: "modules/Tablerules/icons/conditions/incapacitated.svg",
                    label: game.settings.get("Tablerules", "incapacitatedConditionLabel"),
                    statuses: [game.settings.get("Tablerules", "incapacitatedConditionLabel")]
                };

                const effectDataProne = {
                    icon: "modules/Tablerules/icons/conditions/prone.svg",
                    label: "Prone",
                    statuses: ["Prone"]
                };

                if (effectsProneIds.length > 0) {
                    await actor.createEmbeddedDocuments("ActiveEffect", [effectDataIncapacitated]);

                } else {
                    await actor.createEmbeddedDocuments("ActiveEffect", [effectDataIncapacitated, effectDataProne]);
                }
            }
        } else {
            await actor.deleteEmbeddedDocuments("ActiveEffect", effectsIncapacitatedIds);
        }
    }


});

console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
