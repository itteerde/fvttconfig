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

    /*
        Make Effect for Tablerules context, especially aware of the rules keys.
    */
    static makeEffect() {
        return "notImplementedYet";
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
            deathSaves: { key: "deathSaves", label: "Death Saves", default: { rollsSinceReset: 0 } },
            lightSource: { key: "Light Source", label: "Light Source", scope: "Tablerules" }
        }

    }

    /*
        dnd5e.preRestCompleted

        Test if we can programm this way for nicer debugging/ if the expectation that this gives you prettier debugging is correct.
    */
    static dnd5ePreRestCompleted() {
        console.log("Does this work?");
        console.log(arguments);
        console.log("If we got here without errors it probably does.");
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
     */
    static dnd5eRollDeathSave() {

        Tablerules.debug({ message: "Tablerules.dnd5eRollDeathSave", object: arguments });
        console.log({ message: "Tablerules.dnd5eRollDeathSave", object: arguments });

        const actor = arguments[0];

        const deaths = actor.getFlag(Tablerules.SCOPE, Tablerules.dictionary.config.deathSaves.key) ?? Tablerules.dictionary.config.deathSaves.default;

        deaths.rollsSinceReset++;

        actor.setFlag(Tablerules.SCOPE, Tablerules.dictionary.config.deathSaves.key, deaths);

        foundry.utils.setProperty(arguments[2], `flags.${Tablerules.SCOPE}.${Tablerules.dictionary.config.deathSaves.key}`, deaths);

        console.log({ message: "end of Tablerules.dnd5eRollDeathSave", object: actor });
        Tablerules.debug({ message: "end of Tablerules.dnd5eRollDeathSave", object: actor });
    }

    static dnd5ePreRollDeathSave() {

        arguments[1].targetValue = game.settings.get("Tablerules", "deathSaveDC");

        console.log("deathSaveDC wuz here.");



    }

    /**
     * 
     */
    static dnd5eUseItem() {

        Tablerules.debug(arguments);

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

    getData() {

        console.log(this);
        //"flags.Tablerules.config.deathSaves.rollsSinceReset": this.flags.Tablerules.config.deathSaves.rollsSinceReset,
        //"flags.Tablerules.config.deathSaves.dc": this.flags.Tablerules.config.deathSaves.dc

        const data = foundry.utils.mergeObject(super.getData(), {
            "flags.Tablerules.deathSaves.rollsSinceReset": 1
        });

        console.log(data);

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

    Tablerules.debug("keeping sticky death saves.");
    if (typeof arguments[1].system !== "undefined")
        if (typeof arguments[1].system.attributes !== "undefined")
            if (typeof arguments[1].system.attributes.death !== "undefined") {
                if (arguments[1].system.attributes.death.success === 0 && arguments[1].system.attributes.death.failure === 0) {
                    arguments[1].system.attributes["death"] = arguments[0].system.attributes.death;
                }
            }
});


/**
 * 
 */
Hooks.on("dnd5e.rollDeathSave", function () {
    Tablerules.dnd5eRollDeathSave(...arguments);
});

Hooks.on("dnd5e.preRollDeathSave", function () {
    Tablerules.dnd5ePreRollDeathSave(...arguments);
});


/**
 * 
 */
Hooks.on("dnd5e.useItem", function () {
    Tablerules.dnd5eUseItem(...arguments);
});


Hooks.on('init', () => {
    // 
    game.settings.register('Tablerules', 'enableTablerules', {
        name: "Enable Tablerules",
        hint: "Enables Tablerules Module",
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register('Tablerules', 'deathSaveDC', {
        name: "Death Save DC",
        hint: "This will set the DC of Deathsaves.",
        scope: 'world',
        config: true,
        default: 10,
        type: Number,
    });

    game.settings.register('Tablerules', 'stickyDeathSaves', {
        name: "Enable Sticky Death Saves",
        hint: "Normally Death Saves reset when you regain consciousness. This will set Death Saves to reset with a short rest.",
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register('Tablerules', 'noHealOnLongRest', {
        name: "Enable No Heal on Long Rest",
        hint: "Typically, HP is regained on a Long Rest. This will disable that feature.",
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("Tablerules", "logLevel", {
        name: "Log Level",
        hint: "The Module's own log level.",
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
        hint: "Enable to log using own logging method.",
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
        onChange: () => window.location.reload()
    });

});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");

    Tablerules.config.loglevel = game.settings.get("Tablerules", "logLevel");
    Tablerules.config.logOwn = game.settings.get("Tablerules", "logOwn");
});









console.log("Tablerules registering sheets.");
Actors.registerSheet("Tablerules", TRActorSheet5eCharacter, { types: ["character"], makeDefault: true, label: "Tablerules Character" });


console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);

