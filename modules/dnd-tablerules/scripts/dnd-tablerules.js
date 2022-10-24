console.log("Tablerules is loading.");

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
    logOurs(0, message);
}

function logWarning(message) {
    logOurs(1, message);
}

function logInfo(message) {
    logOurs(2, message);
}

function logDebug(message) {
    logOurs(3, message);
}

/*
    Sticky Death Saves
*/

// arguments[0].system.attributes.death

// preupdate save current death saves
// post update (find method) restore death saves to make the sticky

Hooks.on("init", function () {
    console.log("Tablerules hooked onto init.");
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");
});


/** 
 * Long Rest no Heal
*/
Hooks.on("dnd5e.preLongRest", function () {
    logDebug("caught dnd5e.preLongRest hook.");
    console.log(arguments);

    // save current hp to sticky hp
});

Hooks.on("dnd5e.restCompleted", function () {
    logDebug("caught dnd5e.restCompleted hook.");
    console.log(arguments);

    // set current hp to sticky hp
});



// posthook restore prior hp


console.log("Tablerules has been loaded.");
