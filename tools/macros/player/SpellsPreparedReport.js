/**
 * planned to test the spells prepared from the Control Bar.
 *
 * https://github.com/itteerde/fvttconfig/issues/77
 */

// how are double preparations handled (Enona)?

const iDs = [
    "w0H5GHtw7ser0ntj", // Lome
    "Q7hqVwhDhhZq8QEa", // Shrazz
    "XLChqsYCd5rmR5i3", // Enona
];

const actors = [];

for (let i = 0; i < iDs.length; i++) {
    actors.push(game.actors.get(iDs[i]));
}

const parts = [];

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "OK",
        callback: async (html) => {
        }
    }
}

let content = "<table>";
for (let i = 0; i < actors.length; i++) {
    content += createPart(actors[i]);
}
content += "</table>"

new Dialog({ title: "Spell Coordination", content, buttons }).render(true);


function createPart(a) {
    let part = `
        <tr>
            <th colspan="10">${a.name}</th>
        </tr>
        <tr>
            <th>0</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
        </tr>
        <tr>
            <td>${a.items.filter(
        s => s.type === "spell").filter(e => e.system.level === 0).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 1).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 2).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 3).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 4).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 5).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 6).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 7).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 8).map(
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
        }</td>
            <td>${a.items.filter(
            s => s.type === "spell").filter(e => e.system.level === 9).map(
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
        }</td>
        </tr>
    `;
    return part;
}