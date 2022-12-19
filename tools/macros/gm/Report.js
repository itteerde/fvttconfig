/**
 * Report stuff for quick overview of the state of game
 * 
 * https://github.com/itteerde/fvttconfig/issues/52
*/

const macroLabel = "Party State Report";

const partyIds = [
    "8ugKnRSqQzxSxrZO", //Πως της αυγής (Copy)
    "FC2ZItcPqgCuvkhW", //Enona Jadrcej 10
    "oNbN0RJqlNH2pfSQ"
];

const party = partyIds.map(i => game.actors.get(i));

let dialogContent = `<div class="dnd5e chat-card"><h1>Summary</h1>Basic party state overview for making signaling decisions, asking critical questions and stuff.\n${summary(party)}</div>`;

//console.log({ message: macroLabel, summary: summary(party), dialogContent: dialogContent });

let d = new Dialog({
    title: macroLabel,
    content: dialogContent,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "",
        },
    },
    default: "one",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true, { width: 750 });

function summary(party) {
    let html = "<table><tr><th align=\"left\">Name</th><th align=\"left\">HP/max</th><th align=\"left\">Spell Slots</th></tr>";
    html += party.map(a => `<tr><td>${a.name}</td><td>${a.system.attributes.hp.value}/${a.system.attributes.hp.max}</td><td>${spellSlots(a)}</td></tr>`);
    html += "</table>";
    return html;
}

function spellSlots(actor) {
    let spellSlots = "";
    if (actor.system.spells.spell1.max > 0) {
        spellSlots += actor.system.spells.spell1.value;
    }
    if (actor.system.spells.spell2.max > 0) {
        spellSlots += `,${actor.system.spells.spell2.value}`;
    }
    if (actor.system.spells.spell3.max > 0) {
        spellSlots += `,${actor.system.spells.spell3.value}`;
    }
    if (actor.system.spells.spell4.max > 0) {
        spellSlots += `,${actor.system.spells.spell4.value}`;
    }
    if (actor.system.spells.spell5.max > 0) {
        spellSlots += `,${actor.system.spells.spell5.value}`;
    }
    if (actor.system.spells.spell6.max > 0) {
        spellSlots += `,${actor.system.spells.spell6.value}`;
    }
    if (actor.system.spells.spell7.max > 0) {
        spellSlots += `,${actor.system.spells.spell7.value}`;
    }
    if (actor.system.spells.spell8.max > 0) {
        spellSlots += `,${actor.system.spells.spell8.value}`;
    }
    if (actor.system.spells.spell9.max > 0) {
        spellSlots += `,${actor.system.spells.spell9.value}`;
    }

    if (actor.system.spells.pact.max > 0) {
        spellSlots += `,${actor.system.spells.pact.value}p`;
    }

    return spellSlots;
}