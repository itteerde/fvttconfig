const macroLabel = "Dodge";
const icon = "modules/monks-little-details/icons/dodging.svg";

let tokens = null; // make viable for PC and NPC tokens, and deal with multiple tokens selected (deactivate if any is dodging)

if (canvas.tokens.controlled[0].document.flags?.tokenmagic?.filters?.filter(f => f.tmFilters?.tmFilterId === "Dodge").length > 0) {
    await TokenMagic.deleteFiltersOnSelected("Dodge");
    const effectIds = canvas.tokens.controlled[0].actor.effects.filter(e => e.label === "Dodge").map(e => e.id);
    canvas.tokens.controlled[0].actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    return;
}

const effectData = { label: macroLabel, icon, duration: { seconds: 6 } };
await canvas.tokens.controlled[0].actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

let params =
    [{
        filterType: "transform",
        filterId: "Dodge",
        padding: 50,
        animated:
        {
            translationX:
            {
                animType: "sinOscillation",
                val1: -0.0625,
                val2: +0.0625,
                loopDuration: 2800,
            },
            translationY:
            {
                animType: "cosOscillation",
                val1: -0.035,
                val2: +0.035,
                loopDuration: 1400,
            }
        }
    }];

await TokenMagic.addUpdateFiltersOnSelected(params);