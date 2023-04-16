game.actors.get("y8pM6f2v4YLwcrxj").items.filter(s => s.type === "spell")
game.user.targets.find(t => true).actor.name
game.actors.getName(game.user.targets.find(t => true).actor.name).items.filter(s => s.type === "spell")

game.actors.get("w0H5GHtw7ser0ntj").items.filter(s => s.type === "spell").map(e => { return { name: e.name, level: e.system.level } }).sort((a, b) => { if (a.level !== b.level) { return a.level - b.level } else { a.name.localeCompare(b.name) } })

// Actor's spells sorted by level and within in alpabetical order
game.actors.get("w0H5GHtw7ser0ntj").items.filter(
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

Object.getPrototypeOf(game.actors.get("qoF84nzjLIRH4NCg")).constructor.name