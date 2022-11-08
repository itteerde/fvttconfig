var start_time = performance.now();
console.log("Tablerules is loading.");

/*
    Should be moved into Tablerules.config. At least do not make anything new in CONFIG.
*/
CONFIG["Tablerules"] = {
    "stickydeathsaves": true,
    "guidance": { maxTimesPerLongRest: 1 }
};

class Tablerules {

    static config = {
        loglevel: 0,
        logOwn: false
    }

    /*
        Radius of the disc being a sphere of radius r cut in the distance/ height h from its center. Especially radius of the disc projected onto the floor by a source of a spherical effect flying at height/ elevation h over ground/ projection surface.
    */
    static rSphereCut(r, h) {
        if (h > r)
            return 0;
        return Math.sqrt(r * r - (r - (r - h)) * (r - (r - h)));
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

        console.log("Tablerules | " + levelstring + ":" + message);
    }


    static debug(message) {
        if (CONFIG.Tablerules.loglevel < 3)
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
        if (CONFIG.Tablerules.loglevel < 1)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(1, message);
        } else {
            console.warn(message);
        }
    }

    static info(message) {
        if (CONFIG.Tablerules.loglevel < 2)
            return;
        if (Tablerules.config.logOwn) {
            Tablerules.log(2, message);
        } else {
            console.info(message);
        }
    }
}


Hooks.on("init", function () {
    console.log("Tablerules hooked onto init.");
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");
});

function isOfClass(o, className) {
    if (typeof o !== "object") {
        return false;
    }

    return o.constructor.name === className;
}

function isActor5e(o) {
    return isOfClass(o, "Actor5e");
}

function isToken5e(o) {
    return isOfClass(o, "Token5e");
}

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

console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
