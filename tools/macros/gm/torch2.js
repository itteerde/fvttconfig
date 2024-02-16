const configs = {
    def: { dim: 0, bright: 0 },
    torch: { dim: 40, bright: 20, color: "#92bd51", animation: { type: "torch" }, angle: 0 },
    bullseye: { dim: 120, bright: 60, color: "#92bd51", animation: { type: "torch" }, angle: 60 }
};

const states = new Set(Object.keys(configs));
states.delete("def");

const state = token.document.flags.world?.light ?? null;
if (states.has(state)) return token.document.update({ light: configs.def, "flags.world.light": null });

return Dialog.wait({
    title: "Light Config",
    buttons: states.reduce((acc, k) => {
        acc[k] = { label: k.capitalize(), callback: callback };
        return acc;
    }, {})
});

async function callback([html], event) {
    const state = event.currentTarget.dataset.button;
    const light = configs[state];
    return token.document.update({ light: light, "flags.world.light": state });
}