const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "OK",
        callback: async (html) => {
        }
    }
}

const sum =
    canvas.tokens.controlled[0].actor.system.stats.body.value +
    canvas.tokens.controlled[0].actor.system.stats.cool.value +
    canvas.tokens.controlled[0].actor.system.stats.dex.value +
    canvas.tokens.controlled[0].actor.system.stats.emp.max +
    canvas.tokens.controlled[0].actor.system.stats.int.value +
    canvas.tokens.controlled[0].actor.system.stats.luck.max +
    canvas.tokens.controlled[0].actor.system.stats.move.value +
    canvas.tokens.controlled[0].actor.system.stats.ref.value +
    canvas.tokens.controlled[0].actor.system.stats.tech.value +
    canvas.tokens.controlled[0].actor.system.stats.will.value;

new Dialog({ title: "Stats Sum", content: `${sum}`, buttons }).render(true);