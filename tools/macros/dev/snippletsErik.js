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