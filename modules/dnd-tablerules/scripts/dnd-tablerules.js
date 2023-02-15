var start_time = performance.now();
console.log("Tablerules is loading.");

/*
    Should be moved into Tablerules.config. At least do not make anything new in CONFIG.
*/
CONFIG["Tablerules"] = {
    "guidance": { maxTimesPerLongRest: 1 }
};

/*
    Math for the game, so not just generally useful math, but more than that rules-related calculations or definitions.
*/
class TRMath {

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {number} [c] 
     * @returns lenght of the diagonal between the three orthogonal lenghts a, b and c
     */
    static pythagorean(a, b, c = 0) {
        return Math.sqrt(a * a + b * b + c * c);
    }

    /**
     * How much change in height can one move with movement of m moving xy horizontally?
     * 
     * @param {number} dXY movement orthogonally to the elevation change
     * @param {number} movement movement speed
     */
    static dZQ(dXY, movement) {
        return Math.max(Math.sqrt(movement * movement - dXY * dXY), 0);
    }

    /**
     * 
     * @param {number} range 
     * @returns the radius of the circle/disc projected by a cone of that range orthogonally onto a plane (e.g. flying straight above) 
     */
    static radiusConeProjectionCircle(range) {
        return (range * Math.cos(Math.PI / 2 - Math.atan(0.5)));
    }

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

    static carryCapacity(actor = null, variant = true, size = "medium", str = null) {
        if (actor !== null) {
            size = actor.system.traits.size;
            str = actor.system.abilities.str.value;
        }

        let multiplier = 0;
        switch (size) {
            case "tiny":
                multiplier = 0.5;
                break;
            case "sm":
                multiplier = 1;
                break;
            case "med":
                multiplier = 1;
                break;
            case "lg":
                multiplier = 2;
                break;
            case "huge":
                multiplier = 4;
                break;
            case "grg":
                multiplier = 8;
                break;
        }

        if (variant) {
            return { encumbered: str * 5 * multiplier, heavilyEncumbered: str * 10 * multiplier, limit: str * 15 * multiplier, };
        }
        return str * 15 * multiplier;
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

/**
 * Is this a good idea?
 */
class TRDB {
    static spells = [
        {
            name: "Acid Splash",
            level: 0,
            castingTime: "1 Action",
            range: "60 ft",
            attack: null,
            save: "dex",
            damageTypes: ["acid"],
            components: ["V", "S"],
            duration: "Instantaneous",
            school: "Conjuration"
        }
    ];
}

class TRPerformance {

    /**
     * Whisper the threshold violation blind to GM.
     * 
     * @param {*} data 
     */
    static whisperAlert(data) {

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "TRPerformance.whisperAlert", data: data });
        }

        const message = data.message;
        const timer = data.timer;
        // create ChatMessage
    }

}

class TRTimer {

    constructor(name) {
        this.name = name;
        this.startTime = Date.now();
        this.stopped = false;
    }

    stop() {
        this.stopTime = Date.now();
        this.stopped = true;
    }

    getStartTime() {
        return this.startTime;
    }

    timeElapsed() {
        if (this.stopped) {
            return this.stopTime - this.startTime;
        } else {
            return Date.now() - this.startTime;
        }
    }

    timeElapsedSeconds() {
        return Math.round(this.timeElapsed() / 1000);
    }
}

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
        });

        game.settings.register('Tablerules', 'deathSaveDC', {
            name: "Death Save DC",
            hint: "This will set the DC of Deathsaves. Setting of 10 is the D&D 5e default, other values enable for brighter or darker games, such as 15 for Tomb of Annihilation.",
            scope: 'world',
            config: true,
            default: 10,
            type: Number,
        });

        game.settings.register('Tablerules', 'noHealOnLongRest', {
            name: "Long Rest does not reset HP",
            hint: "Typically, all HP are regained on a Long Rest. This will disable that feature.",
            scope: 'world',
            config: true,
            default: true,
            type: Boolean,
        });

        game.settings.register("Tablerules", "woundedCondition", {
            name: "Wounded Condition",
            hint: "Displays a Wounded Active Status Effect when the Token's Actor's hp.value hp is 0 < hp < hp.max*value",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });

        game.settings.register("Tablerules", "woundedConditionThreshold", {
            name: "Wounded Condition Threshold",
            hint: "Displays a Wounded Active Status Effect when the Token's Actor's hp.value hp is 0 < hp < hp.max*value if Wounded Condition is enabled.",
            scope: "world",
            config: true,
            default: 0.5,
            type: Number
        });

        game.settings.register("Tablerules", "incapacitatedCondition", {
            name: "Incapacitated Condition",
            hint: "Displays a Incapacitated Active Status Effect when the Token's Actor's hp.value hp is 0 hp",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
        });

        game.settings.register("Tablerules", "encumbrance", {
            name: "Encumbrance AE",
            hint: "Add Active Effects for Encumbrance according to the Variant Encumbrance rules",
            scope: "world",
            config: true,
            default: true,
            type: Boolean
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
            //onChange: () => window.location.reload()
            requiresReload: true
        });

        game.settings.register('Tablerules', 'logOwn', {
            name: "Use own logging function.",
            hint: "Enable to log using own logging method. Disable for play and enable for development if debugging (with Log Level set to debug above).",
            scope: 'world',
            config: true,
            default: false,
            type: Boolean,
            //onChange: () => window.location.reload()
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

    static async dnd5ePreRollDeathSave() {

        arguments[1].targetValue = game.settings.get("Tablerules", "deathSaveDC");
        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "Tablerules.dnd5ePreRollDeathSave", object: arguments });
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
            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({ message: "Using a tablerules light source.", arguments: arguments });
            }
            Tablerules.setLightingByActor(item.parent, item);
            return;
        }
    }

    static preUpdateActor() {
        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "Tablerules.preUpdateActor", arguments: arguments });
        }

        /**
         * Wounded Condition Active Effect
         */
        if (game.settings.get("Tablerules", "woundedCondition")) {
            Tablerules.handleWounded(...arguments);
        }

        /**
         * Incapacitated Condition Active Effect
         */
        if (game.settings.get("Tablerules", "incapacitatedCondition")) {
            Tablerules.handleIncapacitated(...arguments);
        }

        /**
         * Encumbrance Active Effects
         */
        if (game.settings.get("Tablerules", "encumbrance")) {
            Tablerules.handleEncumbrance(...arguments);
        }
    }

    static async handleEncumbrance() {
        const actor = arguments[0];
        if (!actor.type === "character") {
            return;
        }

        const percentage = actor.system.attributes.encumbrance.value / actor.system.attributes.encumbrance.max;
        let effects = actor.effects.filter(e => e.flags?.world === "Encumbrance");

        if (percentage < 0.33333) {// below carry capacity

            await actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(e => e.id)); // delete all prior version of encumberance

            return;
        }

        const icon = "modules/Tablerules/icons/mechanics/turtle.svg";

        if (percentage < 0.66667) {// encumbered

            if (effects.filter(e => e.label === "Encumbered").length === 1) {
                return;
            }

            await actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(e => e.id)); // delete all prior version of encumberance

            await actor.createEmbeddedDocuments("ActiveEffect", [{
                icon: icon,
                label: "Encumbered",
                flags: { world: "Encumbrance", core: { statusId: "Encumbered" } },
                changes: [
                    {
                        "key": "system.attributes.movement.walk",
                        "value": "-10",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.fly",
                        "value": "-10",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.swim",
                        "value": "-10",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.burrow",
                        "value": "-10",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.climb",
                        "value": "-10",
                        "mode": 2,
                        "priority": 20
                    }
                ]
            }]); // create the appropriate level of Encumbrance

            return;
        }

        if (percentage <= 1) {// heavily encumbered
            if (effects.filter(e => e.label === "Heavily Encumbered").length === 1) {
                return;
            }

            await actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(e => e.id)); // delete all prior version of encumberance

            await actor.createEmbeddedDocuments("ActiveEffect", [{
                icon: icon, label: "Heavily Encumbered", flags: { world: "Encumbrance", core: { statusId: "Heavily Encumbered" } },
                changes: [
                    {
                        "key": "system.attributes.movement.walk",
                        "value": "-20",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.fly",
                        "value": "-20",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.swim",
                        "value": "-20",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.burrow",
                        "value": "-20",
                        "mode": 2,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.climb",
                        "value": "-20",
                        "mode": 2,
                        "priority": 20
                    }
                ]
            }]); // create the appropriate level of Encumbrance

            return;
        }

        if (percentage <= 2) {// overburdened but below lift capacity
            if (effects.filter(e => e.label === "Overburdened").length === 1) {
                return;
            }

            await actor.deleteEmbeddedDocuments("ActiveEffect", effects.map(e => e.id)); // delete all prior version of encumberance

            await actor.createEmbeddedDocuments("ActiveEffect", [{
                icon: icon, label: "Overburdened", flags: { world: "Encumbrance", core: { statusId: "Overburdened" } },
                changes: [
                    {
                        "key": "system.attributes.movement.walk",
                        "value": "5",
                        "mode": 3,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.fly",
                        "value": "5",
                        "mode": 3,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.swim",
                        "value": "5",
                        "mode": 3,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.burrow",
                        "value": "5",
                        "mode": 3,
                        "priority": 20
                    },
                    {
                        "key": "system.attributes.movement.climb",
                        "value": "5",
                        "mode": 3,
                        "priority": 20
                    }
                ]
            }]); // create the appropriate level of Encumbrance

            return;
        }

        // overburdened to immobility

    }

    static async handleWounded() {

        if (!arguments[2].diff || arguments[2].dhp === undefined) {// does not work for updates directly on the document
            return;
        }

        const actor = arguments[0];
        const diff = arguments[2].diff ? arguments[2].dhp : 0;
        let effects = actor.effects.filter(e => e.label === "Wounded").map(e => e.id);

        if (actor.system.attributes.hp.value + actor.system.attributes.hp.temp + diff < game.settings.get("Tablerules", "woundedConditionThreshold") * actor.system.attributes.hp.max) {
            if (effects.length > 0) {
                if (actor.system.attributes.hp.value + actor.system.attributes.hp.temp + diff <= 0) {// was wounded, now dead, so no longer just wounded
                    await actor.deleteEmbeddedDocuments("ActiveEffect", effects);
                    return;
                }
                return;// was wounded, still wounded, nothing to do
            }
            // was not yet wounded, but is now
            const effectData = { icon: "modules/Tablerules/icons/conditions/wounded.svg", label: "Wounded", flags: { core: { statusId: "Wounded" } } };
            await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
            return;
        }

        //not below threshold
        if (effects.length > 0) {
            await actor.deleteEmbeddedDocuments("ActiveEffect", effects);
            return;
        }
    }

    static async handleIncapacitated() {

        const actor = arguments[0];
        if (actor.type !== "character") {
            return;
        }

        if (!arguments[2].diff || arguments[2].dhp === undefined) {
            return;
        }

        const diff = arguments[2].diff ? arguments[2].dhp : 0;
        let effects = actor.effects.filter(e => e.label === "Incapacitated").map(e => e.id);

        if (effects.length > 0) {
            if (actor.system.attributes.hp.value + actor.system.attributes.hp.temp + diff > 0) {// was incapacitated, not anymore
                await actor.deleteEmbeddedDocuments("ActiveEffect", effects);
                return;
            }
        }

        if (actor.system.attributes.hp.value + actor.system.attributes.hp.temp + diff <= 0) {// was not incapacitated, is now
            const effectData = { icon: "modules/Tablerules/icons/conditions/incapacitated.svg", label: "Incapacitated", flags: { core: { statusId: "Incapacitated" } } };
            await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
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
            if (TRUtils.isDebugEnabled()) {
                Tablerules.debug({ message: "overwritten get template.", arguments: arguments });
            }
            return `modules/Tablerules/templates/actors/${this.actor.type}-sheet.hbs`;
        }

        return `systems/dnd5e/templates/actors/${this.actor.type}-sheet.hbs`;
    }

    async getData() {
        const data = foundry.utils.mergeObject(await super.getData(), {
            //"Tablerules.truelyBlindDeathSaves": game.settings.get("Tablerules", "truelyBlindDeathSaves")
        });

        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "TRActorSheet5eCharacter.getData", data: data });
        }
        return data;
    }

    /** @inheritdoc */
    async _updateObject(event, formData) {
        if (TRUtils.isDebugEnabled()) {
            Tablerules.debug({ message: "TRActorSheet5eCharacter._updateObject", event: event, formData: formData });
        }

        return super._updateObject(event, formData);
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

    }

    arguments[1].updateData["system.attributes.death.success"] = 0;
    arguments[1].updateData["system.attributes.death.failure"] = 0;
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

    Hooks.on("preUpdateActor", function () {
        Tablerules.preUpdateActor(...arguments);
    });

});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");

    Tablerules.config.loglevel = game.settings.get("Tablerules", "logLevel");
    Tablerules.config.logOwn = game.settings.get("Tablerules", "logOwn");
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

console.log("Tablerules registering sheets.");
Actors.registerSheet("Tablerules", TRActorSheet5eCharacter, { types: ["character"], makeDefault: true, label: "Tablerules Character" });


console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
