
/*
    Long Rest no Heal
*/

// prehook save current hp
// posthook restore prior hp


/*
    Sticky Death Saves
*/

// preupdate save current death saves
// post update (find method) restore death saves to make the sticky

console.log("Tablerules is loaded.");

Hooks.on("init", function () {
    console.log("Tablerules hooked onto init.");
});

Hooks.on("ready", function () {
    console.log("Tablerules hooked onto ready.");
});