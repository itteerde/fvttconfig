import { forEach } from "mathjs"

game.actors.get("y8pM6f2v4YLwcrxj").items.filter(s => s.type === "spell")
game.user.targets.find(t => true).actor.name
game.actors.getName(game.user.targets.find(t => true).actor.name).items.filter(s => s.type === "spell")

game.actors.get("w0H5GHtw7ser0ntj").items.filter(s => s.type === "spell").map(e => { return { name: e.name, level: e.system.level } }).sort((a, b) => { if (a.level !== b.level) { return a.level - b.level } else { a.name.localeCompare(b.name) } })

// Actor's spells sorted by level and within in alpabetical order
game.actors.get("kf5lTiiNlXd1B9vq").items.filter(
    s => s.type === "spell").map(
        e => {
            return {
                name: e.name,
                level: e.system.level
            }
        }).sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level
            } else {
                return a.name.localeCompare(b.name)
            }
        }).map(e => e.name)

canvas.tokens.controlled[0].actor.items.filter(
    s => s.type === "spell").map(
        e => {
            return {
                name: e.name,
                level: e.system.level
            }
        }).sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level
            } else {
                return a.name.localeCompare(b.name)
            }
        }).map(e => e.name)

canvas.tokens.controlled[0].actor.items.filter(
    s => s.type === "spell").sort((a, b) => {
        if (a.system.level !== b.system.level) {
            return a.system.level - b.system.level
        } else {
            return a.name.localeCompare(b.name)
        }
    }).reduce((acc, s) => {
        if (acc[s.system.level] === undefined) {
            acc[s.system.level] = [];
        };
        acc[s.system.level].push(s.name);
        return acc;
    }, {})

Object.getPrototypeOf(game.actors.get("qoF84nzjLIRH4NCg")).constructor.name


game.actors.get("kf5lTiiNlXd1B9vq").items.filter(s => s.type === "spell").filter(s => s.system.preparation.prepared).map(
    e => {
        return {
            name: e.name,
            level: e.system.level
        }
    }).sort((a, b) => {
        if (a.level !== b.level) {
            return a.level - b.level
        } else {
            return a.name.localeCompare(b.name)
        }
    }).map(e => e.name)

// version 1:
function filter(map, pred) {
    const result = new Map();
    for (let [k, v] of map) {
        if (pred(k, v)) {
            result.set(k, v);
        }
    }
    return result;
}

const map = new Map().set(1, "one").set(2, "two").set(3, "three");
const even = filter(map, (k, v) => k % 2 === 0);
console.log([...even]); // Output: "[ [ 2, 'two' ] ]"

let settingsArray = Array.from(game.settings.settings, ([key, value]) => ({ key, value }));
settingsArray.filter(e => e.key.startsWith("Tablerules"))

Array.from(game.settings.settings, ([key, value]) => ({ key, value })).filter(e => e.key.startsWith("Tablerules"))


canvas.scene.tiles._source.map((e) => e.texture.src)

ui.notifications.error("error message", { permanent: true })

let item = game.actors.get("EKf9YAMM3zb8EoUF").items.get("BfaUa5ahoPkVBLLC");
item.update({ ["system.magazine.value"]: item.system.magazine.value + 7 });

export default class TIMER {
    // for example
    // TIMER.logTimeByFunction("test",0,()=>{console.log("testing")})
    static logTimeByFunction = (message, funct) => {
        const start = performance.now();
        const returnValue = funct();
        console.log(`${message}, function: ${funct}, time: ${performance.now() - start}ms`);// to be LOGGER in CPR
        return returnValue;
    }
}


await canvas.tokens.controlled.forEach((t) => t.document.update({ vision: false }));

const start = performance.now();
await canvas.tokens.moveMany({ dx: 1, dy: 1 });
console.log(`time measured: ${performance.now() - start}ms`);

let numberOfItemsWithTrash = 0;
game.actors.contents.forEach((a) => {
    numberOfItemsWithTrash += a.items.filter(i => i.flags.itemcollection !== undefined).length;
});
numberOfItemsWithTrash;

ChatMessage.create({ content: `<iframe style="width:100%;" src="https://www.youtube.com/embed/dJ-QLl5qjLg" title="Two Steps From Hell - Archangel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` })


function d(n) {
    return getRandomIntInclusive(1, n);
}

function empoweredSpell(dice, sides, chaBonus) {
    let roll = [];
    for (let i = 0; i < dice; i++) {
        roll.push(d(sides));
    }
    roll.sort();

    for (let i = 0; i < chaBonus; i++) {
        if (roll[i] < sides / 2) {
            roll[i] = d(sides);
        }
    }

    return roll.reduce((acc, r) => { return acc + r }, 0);
}

function empoweredFireball() {
    let roll = [];
    for (let i = 0; i < 8; i++) {
        roll.push(d(6));
    }
    roll.sort();

    for (let i = 0; i < 5; i++) {
        if (roll[i] < 4) {
            roll[i] = d(6);
        }
    }

    return roll.reduce((acc, r) => { return acc + r }, 0);
}

function sample(f, args, sampleSize) {
    let sum = 0;
    for (let i = 0; i < sampleSize; i++) {
        sum += f(...args);
    }
    return sum / sampleSize;
}

sample(empoweredSpell, [8, 8, 5], 100000)

let data = item.toObject();
data.ownership = { default: 0 };
await item.update(data, { recursive: false, diff: false });


Array.from(game.settings.settings, ([key, value]) => ({ key, value }))
Array.from(game.settings.settings, ([key, value]) => ({ key, value })).filter(e => e.key.startsWith("core"))
game.settings.settings.get("Tablerules.whispersIncludeGM")

Array.from(game.settings.settings, ([key, value]) => ({ key, value })).map((e) => ({ key: e.key, ["default"]: e.value.default, value: game.settings.get(e.key.split(".")[0], e.key.substring(e.key.indexOf('.') + 1)) }))

Array.from(game.settings.settings, ([key, value]) => ({ key, value })).map((e) => ({ key: e.key, ["default"]: e.value.default, value: `${e.key.split(".")[0]}.${e.key.split(".")[1]}` }))

let errors = [];
settings.forEach((e) => {
    try {
        game.settings.get(e.key.split(".")[0], e.key.split(".")[1])
    } catch (error) {
        errors.push({ error: error, key: e.key })
    }
})
console.error({ errors: errors })

// comparing default versus value set for all settings.
Array.from(game.settings.settings, ([key, value]) => ({ key, value })).map((e) => ({ key: e.key, ["default"]: e.value.default, value: game.settings.get(e.key.split(".")[0], e.key.substring(e.key.indexOf('.') + 1)) }))
// difference
Array.from(game.settings.settings, ([key, value]) => ({ key, value })).map((e) => ({ key: e.key, ["default"]: e.value.default, value: game.settings.get(e.key.split(".")[0], e.key.substring(e.key.indexOf('.') + 1)) })).filter(e => e.default !== e.value)

let sampleSize = 1000000;
let character = { conBonus: 0, mode: "normal" };

function sample(character, sampleSize) {
    let deaths = new Array(10000).fill(0);

    for (let i = 0; i < sampleSize; i++) {
        let exhaustion = 0;
        let alive = true;
        for (let hours = 0; alive; hours++) {
            let roll = Math.floor(Math.random() * 20) + 1;
            if (exhaustion >= 3 && character.mode === "normal") {
                roll = Math.min(roll, Math.floor(Math.random() * 20) + 1);
            }
            if (exhaustion < 3 && character.mode === "advantage") {
                roll = Math.max(roll, Math.floor(Math.random() * 20) + 1);
            }
            if (roll + character.conBonus < 10) {
                exhaustion++;
                if (exhaustion > 5) {
                    alive = false;
                    deaths[hours]++;
                }
            }
            if (hours % 24 === 0 && exhaustion <= 5) {
                if (exhaustion > 0) {
                    exhaustion--;
                }
            }
        }
    }
    let alive = [sampleSize];
    let aliveNumber = sampleSize;
    for (let i = 0; aliveNumber > 0; i++) {
        if (i > alive.length) {
            alive.push(aliveNumber);
        }
        if (deaths[i] > 0) {
            aliveNumber -= deaths[i];
            alive[i] = aliveNumber;
        }
    }
    return alive;
}
sample({ conBonus: 0, mode: "normal" }, 1000000)
sample({ conBonus: 5, mode: "advantage" }, 1000000)

await ActiveEffect.create({ name: "Steve" }, { parent: token.actor, renderSheet: true }); //create and open Sheet
effect.sheet.render(true) //open Sheet for existing


await canvas.tokens.controlled[0].actor.update({ "system.spells.spell9": { value: 1, override: 1, max: 1 } })

await canvas.tokens.controlled[0].actor.items.find(i => i.name === "Form of Dread: Transform").update({ "flags.itemacro.macro.ownership": { default: 0, [game.userId]: 3 } })

await fromUuid("Actor.CVogtJ8SM5XVdEwE.Item.o1dRuMh8G6a6LTO1").update({ "flags.itemacro.macro.ownership": { default: 0, [game.userId]: 3 } })

await (await fromUuid("Actor.CVogtJ8SM5XVdEwE.Item.CRBZeUCIijSHX5xH")).update({ "flags.itemacro.macro.ownership": { default: 0, [game.userId]: 3 } })