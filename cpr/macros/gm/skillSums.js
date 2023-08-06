actors = [
    game.actors.get("NP1OBl9zwhUAggGk"), // Celine
    game.actors.get("RcZMMRc04t0iKrUY"), // Sticky
    game.actors.get("ctcDqtWFyVacYCuG"), // Coyote
    game.actors.get("qoF84nzjLIRH4NCg"), // Luca
    game.actors.get("HUr2NaReSIUdznJC"), // Gauss
    game.actors.get("07ySXIPyk7mAhTmf"), // Fie
];

function skillSumCore(actor) {
    return actor.items.filter(i => i.type === "skill").filter(i => i.system.core === true).reduce((acc, i) => { return acc + ((i.system.difficulty === "difficult") ? i.system.level * 2 : i.system.level) }, 0)
}

function skillSumAll(actor) {
    return actor.items.filter(i => i.type === "skill").reduce((acc, i) => { return acc + ((i.system.difficulty === "difficult") ? i.system.level * 2 : i.system.level) }, 0)
}

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "OK",
        callback: async (html) => {
        }
    }
}

contentString = `<table><tr><th align="left">Name</th><th align="left">Core</th><th align="left">All</th></tr>`;
actors.forEach(element => {
    contentString += `<tr><td>${element.name}</td><td>${skillSumCore(element)}</td><td>${skillSumAll(element)}</td></tr>`;
});
contentString += "</table>";

new Dialog({ title: "Skill Sum", content: contentString, buttons }).render(true);

