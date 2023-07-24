const partyIds = [
    "DRKzuVShUC9JXDFx", //Umbratica
    "6jtmp2Joatnf8PuB", //Qal
    "mW7HMwZy4zOrS5Jb", //Zannan
    "MxRATNuEN6RFKx5u", //Garthin
    "zNPrKVWqFobtsXhy", //Thruthr
    "LRVMkm47PS7mtTbc", //Tokz
];

party = [];
pool = game.actors.get(partyIds[0]).classes.cleric.system.levels * 5;

partyIds.forEach(element => {
    party.push({ actor: game.actors.get(element), heal: 0 });
});

// everybody > 0hp
party.forEach(a => {
    if (a.actor.system.attributes.hp.value === 0) {
        a.heal += 1;
        pool -= 1;
    }
});

// heal the healer first
party[0].heal = Math.max(0, Math.min(pool, Math.floor(party[0].actor.system.attributes.hp.max / 2) - party[0].actor.system.attributes.hp.value));
pool -= party[0].heal;

// equal parts


// rest

console.log(party);