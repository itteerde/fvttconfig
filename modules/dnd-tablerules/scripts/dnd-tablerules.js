var start_time = performance.now();
console.log("Tablerules is loading.");

/*
    Should be moved into Tablerules.config. At least do not make anything new in CONFIG.
*/
CONFIG["Tablerules"] = {
    "stickydeathsaves": true,
    "guidance": { maxTimesPerLongRest: 1 }
};

/*
    Math for the game, so not just generally useful math, but more than that rules-related calculations or definitions.
*/
class TRMath {

    /**
        Radius of the disc being a sphere of radius r cut in the distance/ height h from its center. Especially radius of the disc projected onto the floor by a source of a spherical effect flying at height/ elevation h over ground/ projection surface.

        @param {number} r radius of the sphere, especially range of a spherical zone spell.
        @param {number} h height/ elevation over ground/ projection surface.
        @returns {number} radius of the projected disc.
    */
    static rSphereCut(r, h) {
        if (h > r)
            return 0;
        return Math.sqrt(r * r - (r - (r - h)) * (r - (r - h)));
    }

    /**
     * https://www.dndbeyond.com/sources/dmg/running-the-game#SpecialTravelPace
     * 
     * @param {number} miles Miles to travel.
     * @param {number} movement Special Movement, e.g. 80 if polymorphed into Giant Eagle.
     * @param {string} speed slow, normal or fast.
     * @returns {string} time (xh ym).
     */
    static timeTravelSpecialTravelPace(miles, movement, speed) {
        const speedMultiplier = (speed === "slow") ? 2 : (speed === "normal" ? 3 : 4);
        const timeHours = miles / ((movement / 30) * speedMultiplier);
        const hours = Math.floor(timeHours);
        const minutes = Math.round((timeHours - hours) * 60);
        return `${hours}h ${minutes}`;
    }

    /**
     * https://www.dndbeyond.com/sources/phb/adventuring#TravelPace
     * 
     * @param {number} feet Distance in feet.
     * @returns {string} time in minutes.
     */
    static timeTravelFeet(feet) {
        return `${Math.round(feet / 300)}min`;
    }

    /**
     * https://www.dndbeyond.com/sources/phb/adventuring#TravelPace
     * 
     * @param {number} miles Distance in miles.
     * @param {string} speed slow, normal or fast. 
     * @returns {string} time (xh ym).
     */
    static timeTravel(miles, speed) {
        const milesPerHour = (speed === "slow") ? 2 : (speed === "normal" ? 3 : 4);
        const timeHours = miles / milesPerHour;
        const hours = Math.floor(timeHours);
        const minutes = Math.round((timeHours - hours) * 60);

        return `${hours}h ${minutes}`;
    }

    /**
     * 
     * @param {number} score Ability score (usually 8-20).
     * @returns the ability modifier.
     */
    static abilityModifier(score) {
        return (Math.floor((score - 10) / 2));
    }

    /**
     *  
     * @param {number} level Character level.
     * @returns {number} proficiency bonus.
     */
    static proficiencyBonus(level) {
        return Math.ceil(level / 4) + 1;
    }

    /**
     * https://www.dndbeyond.com/sources/phb/adventuring#Jumping
     * 
     * @param {number} strength Character's Strength Ability Score, usually 8 to 20.
     * @param {boolean} [hasApproachRun] false if the Character has no approach run of at least 10ft, true otherwise (and assumed).
     * @returns {number} maximum horizontal distance covered without a Skill Check.
     */
    static jumpLong(strength, hasApproachRun = true) {
        return strength * (hasApproachRun ? 1 : 0.5);
    }
}

class TRUtils {

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
        });

        game.settings.register('Tablerules', 'deathSaveDC', {
            name: "Death Save DC",
            hint: "This will set the DC of Deathsaves. Setting of 10 is the D&D 5e default, other values enable for brighter or darker games, such as 15 for Tomb of Annihilation.",
            scope: 'world',
            config: true,
            default: 10,
            type: Number,
        });

        game.settings.register('Tablerules', 'stickyDeathSaves', {
            name: "Sticky Death Saves",
            hint: "Normally Death Saves reset when you regain consciousness (technically being updated to hp.value>0). This will set Death Saves to reset with a Short Rest.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register('Tablerules', 'truelyBlindDeathSaves', {
            name: "Truely Blind Death Saves",
            hint: "Enable to hide Death Save results from the Character Sheet while the character is unconscious.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean
        });

        game.settings.register('Tablerules', 'noHealOnLongRest', {
            name: "Long Rest does not reset HP",
            hint: "Typically, all HP are regained on a Long Rest. This will disable that feature.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register("Tablerules", "measureLoadingTime", {
            name: "Measure Loading Times (MLT)",
            hint: "Measures the times it takes to load scenes on the client side.",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });

        game.settings.register("Tablerules", "mltAlarmThreshold", {
            name: "MLT Threshhold",
            hint: "Threshold for alerting if if loading a scene takes longer than set in ms.",
            scope: "world",
            config: true,
            default: 30000,
            type: Number
        });

        game.settings.register("Tablerules", "mltReporting", {
            name: "MLT Reporting",
            hint: "Way to report threshold being violated.",
            scope: "world",
            config: true,
            default: "disabled",
            type: Number,
            choices: {
                0: "disabled",
                1: "console",
                2: "blind whisper"
            }
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
            onChange: () => window.location.reload()
        });

        game.settings.register('Tablerules', 'logOwn', {
            name: "Use own logging function.",
            hint: "Enable to log using own logging method. Disable for play and enable for development if debugging (with Log Level set to debug above).",
            scope: 'world',
            config: true,
            default: false,
            type: Boolean,
            onChange: () => window.location.reload()
        });
    }

    static registerWrappers() {
        console.log("Tablerules registering wrappers");

        libWrapper.register(Tablerules.SCOPE, "dnd5e.documents.Actor5e.prototype.rollDeathSave", Tablerules.dnd5e_documents_Actor5e_prototype__rollDeathSave, libWrapper.WRAPPER);
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

    static config = {
        loglevel: 0,
        logOwn: false
    }



    /*
        For looking up keys (for cases where we cannot use _id and don't want to use names).

        For example for the Twilight Sanctuary case the consumer cannot get an ID because the creator has no privileges to create the information on the other players' Actors. So the consumer searches for a viable source. That should not be by name, but by a technical key that is stored in a way the player cannot change. This allows the player to flavor their Feature without breaking the mechanics.

        Once anything using any key within has been implemented the key cannot be changed without breaking everything that has been implemented with it.
    */
    static dictionary = {
        class: {
            artificer: {},
            barbarian: {},
            bard: {},
            cleric: {
                life: {
                    features: {
                        preserveLife: { key: "Channel Divinity: Preserve Life", label: "Channel Divinity: Preserve Life" }
                    }
                },
                twilight: {
                    features: {
                        twilightSanctuary: { key: "Channel Divinity: Twilight Sanctuary", label: "Channel Divinity: Twilight Sanctuary" }
                    }
                }
            },
            druid: {
                shepherd: {
                    features: {
                        mightySummoner: { key: "Mighty Summoner", label: "Mighty Summoner" },
                        spiritTotem: {
                            unicornSpirit: { key: "Spirit Totem: Unicorn Spirit", label: "Spirit Totem: Unicorn Spirit", scope: Tablerules.SCOPE }
                        }
                    }
                }
            },
            fighter: {},
            monk: {},
            paladin: {},
            ranger: {},
            rogue: {},
            sorcerer: {},
            warlock: {},
            wizard: {},
            bloodHunter: {}
        },
        race: {
            shifter: {
                features: {
                    shiftingBeasthide: { key: "Shifting: Beasthide", label: "Shifting: Beasthide", scope: "Tablerules" }
                }
            }
        },
        config: {
            death: {
                dead: { key: "death.dead", label: "Death Saves: Is Dead" },
                stabilized: { key: "death.stabilized", label: "Death Saves: Is Stabile" }
            },
            lightSource: { key: "Light Source", label: "Light Source", scope: "Tablerules" }
        }

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

    static isOfClass(o, className) {
        if (typeof o !== "object") {
            return false;
        }

        return o.constructor.name === className;
    }

    static isActor5e(o) {
        return Tablerules.isOfClass(o, "Actor5e");
    }

    static isToken5e(o) {
        return Tablerules.isOfClass(o, "Token5e");
    }

    static isItem5e(o) {
        return Tablerules.isOfClass(o, "Item5e");
    }

    /*
        call from appropriate hook to check for Variant: Encumbrance and maintain Effects implementing those rules https://www.dndbeyond.com/sources/phb/using-ability-scores#VariantEncumbrance.
    */
    static checkVariantEncumbrance() {

    }

    /**
     * We are setting the lighting for all Tokens of the Actor upon the Item being used, this is doing that for one of the items only for better debugging.
     * 
     * @param {Token5e} token The Token for which to change the lighting.
     * @param {Item5e} item The light source Item carrying the lighting data.
     */
    static setLighting(token, item) {

        token.update({
            light: item.flags.Tablerules["Light Source"].light
        });
    }

    static setLightingByActor(actor, item) {
        const tokens = game.scenes.reduce((acc, scene) => {
            acc.push(...scene.tokens);
            return acc;
        }, []);
        const actorTokens = tokens.filter(t => t.actorId === actor._id);
        for (let i = 0; i < actorTokens.length; i++) {
            this.setLighting(actorTokens[i], item);
        }
    }

    /**
     * 
     * @param {*} wrapped dnd5e.documents.Actor5e.rollDeathSave()
     * @param  {...any} args arguments provided to dnd5e.documents.Actor5e.rollDeathSave()
     * @returns  modified return of dnd5e.documents.Actor5e.rollDeathSave()
     */
    static dnd5e_documents_Actor5e_prototype__rollDeathSave(wrapped, ...args) {

        if (!game.settings.get(Tablerules.SCOPE, "isEnabled")) {

            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({
                    message: "Tablerules.dnd5e_documents_Actor5e_prototype__rollDeathSave, !isEnabled, returning wrapped.",
                    wrapped: wrapped,
                    args: args,
                    isEnabled: game.settings.get(Tablerules.SCOPE, "isEnabled")
                });
            }

            return wrapped(...args);
        }

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({
                message: "Tablerules.dnd5e_documents_Actor5e_prototype__rollDeathSave, executing own code.",
                wrapped: wrapped,
                args: args,
                this: this
            });
        }

        const actor = this;

        // preprocessing

        // execute wrapped, returns roll after updating, so still need to either do fudging around or skip it in favor for doing it ourselv with a modified version, so really overwritings still. If we overwrite it alltogether, could we still keep the pre-hook (not sure if we would like to anyways), or do we need to put our modifications in this?
        let result = wrapped(...args);

        // postprocessing

        return result;
    }

    static async dnd5ePreRollDeathSave() {

        const actor = arguments[0];
        const stabilized = actor.getFlag(Tablerules.SCOPE, Tablerules.dictionary.config.death.stabilized.key) ?? false;
        const dead = actor.getFlag(Tablerules.SCOPE, Tablerules.dictionary.config.death.dead.key) ?? false;

        if (dead) {

            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({
                    message: "Tablerules.dnd5ePreRollDeathSave, is already dead, returning false to abort.",
                    arguments: arguments
                });
            }

            let chatData = {
                content: `${actor.name} is ${dead ? "dead" : ""}${stabilized ? "stabilized" : ""}, faking roll.`,
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                whisper: ChatMessage.getWhisperRecipients("GM")
            };
            ChatMessage.applyRollMode(chatData, CONST.DICE_ROLL_MODES.BLIND);
            await ChatMessage.create(chatData);

            return false;
        }

        arguments[1].targetValue = game.settings.get("Tablerules", "deathSaveDC");

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({
                message: "Tablerules.dnd5ePreRollDeathSave",
                object: arguments
            });
        }

    }

    static dnd5eRollDeathSave() {

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({
                message: "Tablerules.dnd5eRollDeathSave, start",
                object: arguments
            });
        }

        const actor = arguments[0];
        const stabilized = actor.getFlag(Tablerules.SCOPE, Tablerules.dictionary.config.death.stabilized.key) ?? false;

        if (!stabilized) {// has not been defined yet, or, false overwritten because 'checking for undefined' is nontrivial
            foundry.utils.setProperty(arguments[2].updates, `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.stabilized.key}`, false);
        }

        if (stabilized) {
            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({
                    message: "Tablerules.dnd5eRollDeathSave, was already stabilized, returning false to abort.",
                    arguments: arguments
                });
            }

            return false;
        }

        const roll = arguments[1]._total;
        if (roll === 20 && !stabilized) {
            foundry.utils.setProperty(arguments[2].updates, `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.stabilized.key}`, false);

            arguments[2].updates["system.attributes.death.failure"] = arguments[0].system.attributes.death.failure;

            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({
                    message: "Tablerules.dnd5eRollDeathSave, roll === 20 and not stabalized",
                    object: arguments
                });
            }

            return;
        }

        let success = actor.system.attributes.death.success;
        let failure = actor.system.attributes.death.failure;
        if (roll >= arguments[1].options.targetValue) {
            success++;
        } else {
            failure++;
        }

        if (roll === 1) {
            failure++;
            if (failure > 3) {
                failure = 3;
            }
        }

        if (success >= 3) {
            foundry.utils.setProperty(arguments[2].updates, `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.stabilized.key}`, true);

            arguments[2].updates["system.attributes.death.failure"] = arguments[0].system.attributes.death.failure;
            arguments[2].updates["system.attributes.death.success"] = arguments[0].system.attributes.death.success;
            Tablerules.debug("Tablerules.dnd5eRollDeathSave, stabilized.");
        }

        if (failure >= 3) {
            foundry.utils.setProperty(arguments[2].updates, `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.dead.key}`, true);

            arguments[2].updates["system.attributes.death.failure"] = arguments[0].system.attributes.death.failure;
            arguments[2].updates["system.attributes.death.success"] = arguments[0].system.attributes.death.success;
            Tablerules.debug("Tablerules.dnd5eRollDeathSave, stabilized.");
        }

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({
                message: "Tablerules.dnd5eRollDeathSave end",
                object: arguments
            });
        }
    }


    /**
     * 
     */
    static dnd5eUseItem() {

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "Tablerules.dnd5eUseItem", arguments: arguments });
        }

        if (!Tablerules.isItem5e(arguments[0])) {
            console.log("Not a 5e item!!");
            return;
        }

        const item = arguments[0];
        if (item.getFlag(
            Tablerules.dictionary.config.lightSource.scope, Tablerules.dictionary.config.lightSource.key)
        ) {
            Tablerules.debug("Using a tablerules light source.");
            Tablerules.setLightingByActor(item.parent, item);
            return;
        }
    }

}

/**
 * https://github.com/foundryvtt/dnd5e/blob/master/dnd5e.mjs
 */
class TRActorSheet5eCharacter extends dnd5e.applications.actor.ActorSheet5eCharacter {

    /** @override */
    get template() {
        if (!game.user.isGM && this.actor.limited) return "systems/dnd5e/templates/actors/limited-sheet.hbs";

        if (this.actor.type === "character") {
            Tablerules.debug("overwritten get template.");
            return `modules/Tablerules/templates/actors/${this.actor.type}-sheet.hbs`;
        }

        return `systems/dnd5e/templates/actors/${this.actor.type}-sheet.hbs`;
    }

    async getData() {
        const data = foundry.utils.mergeObject(await super.getData(), {
            "Tablerules.truelyBlindDeathSaves": game.settings.get("Tablerules", "truelyBlindDeathSaves")
        });
        foundry.utils.setProperty(data, "Tablerules.deathsaves.dead", this.actor.getFlag(Tablerules.SCOPE, Tablerules.dictionary.config.death.dead.key) ?? false);
        Tablerules.debug({ message: "TRActorSheet5eCharacter.getData", data: data });
        return data;
    }


    /** @inheritdoc */
    async _updateObject(event, formData) {
        console.log({ event: event, formData: formData });

        return super._updateObject(event, formData);
    }

}


Hooks.on("init", function () {
    console.log("Tablerules hooked onto init.");
});

/**
 * modify resting rules
 * - no hp gain on long rest
 * - reset death saves (as they are now not reset on healing)
 */
Hooks.on("dnd5e.preRestCompleted", function () {
    if (arguments[1].longRest) {
        Tablerules.debug("preventing healing on Long Rest.");
        arguments[1].updateData["system.attributes.hp.value"] -= arguments[1].dhp;
        arguments[1].dhp = 0;

    }

    death = arguments[0].system.attributes.death;
    death.failure = 0;
    death.success = 0;

    Tablerules.debug("resetting death saves on Short Rest.")
    arguments[1].updateData["system.attributes.death"] = death;
});

/**
 * make death saves sticky (don't reset on healing)
 */
Hooks.on("preUpdateActor", function () {

    if (arguments[2].dhp > 0) {
        foundry.utils.setProperty(arguments[1], `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.stabilized.key}`, false);
        foundry.utils.setProperty(arguments[1], `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.death.dead.key}`, false);
        Tablerules.debug({ message: "preUpdateActor, setting flags (death saves)", arguments: arguments });
    }

    Tablerules.debug("before keeping sticky death saves.");
    Tablerules.debug(arguments);
    if (typeof arguments[1].system !== "undefined")
        if (typeof arguments[1].system.attributes !== "undefined")
            if (typeof arguments[1].system.attributes.death !== "undefined") {
                if (arguments[2].dhp > 0) {
                    arguments[1].system.attributes.death.success = 0;
                    arguments[1].system.attributes.death.failure = arguments[0].system.attributes.death.failure;
                }
            }
    Tablerules.debug("after modifying arguments to make sticky death saves.");
    Tablerules.debug(arguments);
});


/**
 * 
 */
Hooks.on("dnd5e.rollDeathSave", function () {
    return Tablerules.dnd5eRollDeathSave(...arguments);
});

Hooks.on("dnd5e.preRollDeathSave", function () {
    return Tablerules.dnd5ePreRollDeathSave(...arguments);
});


/**
 * 
 */
Hooks.on("dnd5e.useItem", function () {
    Tablerules.dnd5eUseItem(...arguments);
});


Hooks.on('init', () => {
    TRUtils.registerSettings();
    TRUtils.registerWrappers();
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");

    Tablerules.config.loglevel = game.settings.get("Tablerules", "logLevel");
    Tablerules.config.logOwn = game.settings.get("Tablerules", "logOwn");
});









console.log("Tablerules registering sheets.");
Actors.registerSheet("Tablerules", TRActorSheet5eCharacter, { types: ["character"], makeDefault: true, label: "Tablerules Character" });


console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);

