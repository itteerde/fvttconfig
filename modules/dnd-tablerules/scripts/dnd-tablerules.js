var start_time = performance.now();
console.log("Tablerules is loading.");

class Tablerules {

    /*
        Radius of the disc being a sphere of radius r cut in the distance/ height h from its center. Especially radius of the disc projected onto the floor by a source of a spherical effect flying at height/ elevation h over ground/ projection surface.
    */
    static rSphereCut(r, h) {
        if (h > r)
            return 0;
        return Math.sqrt(r * r - (r - (r - h)) * (r - (r - h)));
    }

}


function logOurs(level, message) {
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
            console.log("no logging level set");
    }

    console.log("Tablerules | " + levelstring + ":" + message);
}

function logError(message) {
    if (logOwn) {
        logOurs(0, message);
    } else {
        console.error(message);
    }
}

function logWarning(message) {
    if (CONFIG.Tablerules.loglevel < 1)
        return;
    if (logOwn) {
        logOurs(1, message);
    } else {
        console.warn(message);
    }
}

function logInfo(message) {
    if (CONFIG.Tablerules.loglevel < 2)
        return;
    if (logOwn) {
        logOurs(2, message);
    } else {
        console.info(message);
    }
}

function logDebug(message) {
    if (CONFIG.Tablerules.loglevel < 3)
        return;
    if (logOwn) {
        logOurs(3, message);
    } else {
        console.debug(message);
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
        logDebug("preventing healing on Long Rest.");
        arguments[1].updateData["system.attributes.hp.value"] -= arguments[1].dhp;
        arguments[1].dhp = 0;

        death = arguments[0].system.attributes.death;
        death.failure = 0;
        death.success = 0;

        logDebug("resetting death saves on Long Rest.")
        arguments[1].updateData["system.attributes.death"] = death;
    }
});

/**
 * make death saves sticky (don't reset on healing)
 */
Hooks.on("preUpdateActor", function () {

    logDebug("keeping sticky death saves.");
    if (typeof arguments[1].system !== "undefined")
        if (typeof arguments[1].system.attributes !== "undefined")
            if (typeof arguments[1].system.attributes.death !== "undefined") {
                if (arguments[1].system.attributes.death.success === 0 && arguments[1].system.attributes.death.failure === 0) {
                    arguments[1].system.attributes["death"] = arguments[0].system.attributes.death;
                }
            }
});


CONFIG["Tablerules"] = {
    "loglevel": 0, "logOwn": false,
    "stickydeathsaves": true,
    "guidance": { maxTimesPerLongRest: 1 }
};

console.log(`Tablerules has been loaded (${performance.now() - start_time}ms).`);
