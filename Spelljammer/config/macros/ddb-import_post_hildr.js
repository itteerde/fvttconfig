// this needs to be replaced with a check if it is Hildr, or Hildr being selected by name (not ID, should be a bit portable at least)
/* 
    we save this not just for efficiency, but mainly to eliminate race conditions with unselecting the correct token while processing.
    After all we are working with asynchronous stuff. No idea how elemental this would be without making sure every reference is worked
    out from the same one explicitely.
    */
const actorToBeModified = canvas.tokens.controlled[0].actor;


if (typeof actorToBeModified.system.scale.barbarian === 'undefined') {
    console.log("This is supposed to be fixing a Barbarian being imported via ddb-importer resulting in wrong syste.scale.barbarian data. There is no such data here: barbarian undefined, select a Barbarian imported with ddb-importer.");
} else {
    console.log("before modifications:")
    const levels = actorToBeModified._classes.barbarian.system.levels;
    console.log(" barbarian levels: " + levels);
    console.log(actorToBeModified.system.scale.barbarian);

    let rages = 0;
    let rageDamage = 0;
    let ddbrage = actorToBeModified.system.scale.barbarian.rage; // we'll keep that for compability in case we make DAE/MidiQOL by ddb-importer work
    switch (levels) {
        case 1:
            rages = 2;
            rageDamage = 2;
            break;
        case 2:
            rages = 2;
            rageDamage = 2;
            break;
        case 3:
            rages = 3;
            rageDamage = 2;
            break;
        case 4:
            rages = 3;
            rageDamage = 2;
            break;
        case 5:
            rages = 3;
            rageDamage = 2;
            break;
        case 6:
            rages = 4;
            rageDamage = 2;
            break;
        case 7:
            rages = 4;
            rageDamage = 2;
            break;
        case 8:
            rages = 4;
            rageDamage = 2;
            break;
        case 9:
            rages = 4;
            rageDamage = 3;
            break;
        case 10:
            rages = 4;
            rageDamage = 3;
            break;
        case 11:
            rages = 4;
            rageDamage = 3;
            break;
        case 12:
            rages = 5;
            rageDamage = 3;
            break;
        case 13:
            rages = 5;
            rageDamage = 3;
            break;
        case 14:
            rages = 5;
            rageDamage = 3;
            break;
        case 15:
            rages = 5;
            rageDamage = 3;
            break;
        case 16:
            rages = 5;
            rageDamage = 4;
            break;
        case 17:
            rages = 6;
            rageDamage = 4;
            break;
        case 18:
            rages = 6;
            rageDamage = 4;
            break;
        case 19:
            rages = 6;
            rageDamage = 4;
            break;
        case 20:
            rages = 999;
            rageDamage = 4;
            break;
        default:
            console.log("reached default while switching levels, not good.");
    }

    await actorToBeModified.update({ 'system.scale.barbarian': { 'rage': ddbrage, 'rages': rages, 'rage-damage': rageDamage } });

    console.log("done?");
}
