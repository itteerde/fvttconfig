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
                        mightySummoner: { key: "Mighty Summoner", label: "Mighty Summoner" }
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
                    shiftingBearhide: { key: "Shifting: Bearhide", label: "Shifting: Bearhide" }
                }
            }
        },
        config: {
            lightSource: { key: "Light Source", label: "Ligth Source", scope: "dnd-tablerules" }
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
     * 
     * @param {Token5e} token 
     */
    static setLighting(token) {
        // actually do set the lighting
    }

    static setLightingByActor(actor) {
        const tokens = needToBeFound;
        for (i = 0; i < tokens.length; i++) {
            this.setLighting(tokens[i]);
        }
    }

    /**
     * 
     */
    static dnd5UseItem() {

        Tablerules.debug(arguments);

        if (!this.isItem5e(arguments[0])) {
            return;
        }

        const item = arguments[0];
        if (item.getFlag(
            Tablerules.dictionary.config.lightSource.scope, Tablerules.dictionary.config.lightSource.key)
        ) {
            Tablerules.debug("Using a tablerules light source.");
            Tablerules.setLightingByActor(item.parent);
        }
    }

}


Hooks.on("init", function () {
    console.log("Tablerules hooked onto init.");
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");
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

        death = arguments[0].system.attributes.death;
        death.failure = 0;
        death.success = 0;

        Tablerules.debug("resetting death saves on Long Rest.")
        arguments[1].updateData["system.attributes.death"] = death;
    }
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
Hooks.on("dnd5e.useItem", function () {
    Tablerules.dnd5UseItem(arguments);
});

console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);

