const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "OK",
        callback: async (html) => {
        }
    }
}

new Dialog({ title: "Skill Sum", content: `${canvas.tokens.controlled[0].actor.items.filter(i => i.type === "skill").filter(i => i.system.core === true).reduce((acc, i) => { return acc + ((i.system.difficulty === "dificult") ? i.system.level * 2 : i.system.level) }, 0)}`, buttons }).render(true);