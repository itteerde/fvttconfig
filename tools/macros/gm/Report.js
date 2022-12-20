/**
 * Report stuff for quick overview of the state of game
 * 
 * https://github.com/itteerde/fvttconfig/issues/52
*/

const macroLabel = "Party State Report";

const partyIds = [
    "8ugKnRSqQzxSxrZO", //Πως της αυγής (Copy)
    "FC2ZItcPqgCuvkhW", //Enona Jadrcej 10
    "oNbN0RJqlNH2pfSQ",
    "ui8iYXUbXVqLyiFX",
    "SjsjOTHTLfnugGtm",
    "xsI2KBbkRJlauxB7"
];

const party = partyIds.map(i => game.actors.get(i));

let dialogContent = `
    <div class="dnd5e chat-card">
        <h1>Summary</h1>
            <h2>HP and Spellslots</h2>
            ${summary(party)}
            <h2>Passives</h2>
            ${passives(party)}
    </div>`;

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
    const rows = party.map(a => `<tr><td>${a.name}</td><td>${a.system.attributes.hp.value}/${a.system.attributes.hp.max}</td><td>${spellSlots(a)}</td></tr>`);
    for (let i = 0; i < rows.length; i++) {
        html += rows[i];
    }
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

function passives(party) {
    let acrobatics = { names: [], max: 0 };
    let animalHandling = { names: [], max: 0 };
    let arcana = { names: [], max: 0 };
    let athletics = { names: [], max: 0 };
    let deception = { names: [], max: 0 };
    let history = { names: [], max: 0 };
    let insight = { names: [], max: 0 };
    let investigation = { names: [], max: 0 };
    let intimidation = { names: [], max: 0 };
    let medicine = { names: [], max: 0 };
    let nature = { names: [], max: 0 };
    let persuasion = { names: [], max: 0 };
    let perception = { names: [], max: 0 };
    let performance = { names: [], max: 0 };
    let religion = { names: [], max: 0 };
    let sleightOfHand = { names: [], max: 0 };
    let stealth = { names: [], max: 0 };
    let survival = { names: [], max: 0 };

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.acr.passive === acrobatics.max) {
            acrobatics.names.push(party[i].name);
        }
        if (party[i].system.skills.acr.passive > acrobatics.max) {
            acrobatics.names = [party[i].name];
            acrobatics.max = party[i].system.skills.acr.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.ani.passive === animalHandling.max) {
            animalHandling.names.push(party[i].name);
        }
        if (party[i].system.skills.ani.passive > animalHandling.max) {
            animalHandling.names = [party[i].name];
            animalHandling.max = party[i].system.skills.ani.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.arc.passive === arcana.max) {
            arcana.names.push(party[i].name);
        }
        if (party[i].system.skills.arc.passive > arcana.max) {
            arcana.names = [party[i].name];
            arcana.max = party[i].system.skills.arc.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.ath.passive === athletics.max) {
            athletics.names.push(party[i].name);
        }
        if (party[i].system.skills.ath.passive > athletics.max) {
            athletics.names = [party[i].name];
            athletics.max = party[i].system.skills.ath.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.dec.passive === deception.max) {
            deception.names.push(party[i].name);
        }
        if (party[i].system.skills.dec.passive > deception.max) {
            deception.names = [party[i].name];
            deception.max = party[i].system.skills.dec.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.his.passive === history.max) {
            history.names.push(party[i].name);
        }
        if (party[i].system.skills.his.passive > history.max) {
            history.names = [party[i].name];
            history.max = party[i].system.skills.his.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.ins.passive === insight.max) {
            insight.names.push(party[i].name);
        }
        if (party[i].system.skills.ins.passive > insight.max) {
            insight.names = [party[i].name];
            insight.max = party[i].system.skills.ins.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.inv.passive === investigation.max) {
            investigation.names.push(party[i].name);
        }
        if (party[i].system.skills.inv.passive > investigation.max) {
            investigation.names = [party[i].name];
            investigation.max = party[i].system.skills.inv.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.itm.passive === intimidation.max) {
            intimidation.names.push(party[i].name);
        }
        if (party[i].system.skills.itm.passive > intimidation.max) {
            intimidation.names = [party[i].name];
            intimidation.max = party[i].system.skills.itm.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.med.passive === medicine.max) {
            medicine.names.push(party[i].name);
        }
        if (party[i].system.skills.med.passive > medicine.max) {
            medicine.names = [party[i].name];
            medicine.max = party[i].system.skills.med.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.nat.passive === nature.max) {
            nature.names.push(party[i].name);
        }
        if (party[i].system.skills.nat.passive > nature.max) {
            nature.names = [party[i].name];
            nature.max = party[i].system.skills.nat.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.prc.passive === perception.max) {
            perception.names.push(party[i].name);
        }
        if (party[i].system.skills.prc.passive > perception.max) {
            perception.names = [party[i].name];
            perception.max = party[i].system.skills.prc.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.per.passive === persuasion.max) {
            persuasion.names.push(party[i].name);
        }
        if (party[i].system.skills.per.passive > persuasion.max) {
            persuasion.names = [party[i].name];
            persuasion.max = party[i].system.skills.per.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.prf.passive === performance.max) {
            performance.names.push(party[i].name);
        }
        if (party[i].system.skills.prf.passive > performance.max) {
            performance.names = [party[i].name];
            performance.max = party[i].system.skills.prf.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.rel.passive === religion.max) {
            religion.names.push(party[i].name);
        }
        if (party[i].system.skills.rel.passive > religion.max) {
            religion.names = [party[i].name];
            religion.max = party[i].system.skills.rel.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.slt.passive === sleightOfHand.max) {
            sleightOfHand.names.push(party[i].name);
        }
        if (party[i].system.skills.slt.passive > sleightOfHand.max) {
            sleightOfHand.names = [party[i].name];
            sleightOfHand.max = party[i].system.skills.slt.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.ste.passive === stealth.max) {
            stealth.names.push(party[i].name);
        }
        if (party[i].system.skills.ste.passive > stealth.max) {
            stealth.names = [party[i].name];
            stealth.max = party[i].system.skills.ste.passive;
        }
    }

    for (let i = 0; i < party.length; i++) {
        if (party[i].system.skills.sur.passive === survival.max) {
            survival.names.push(party[i].name);
        }
        if (party[i].system.skills.sur.passive > survival.max) {
            survival.names = [party[i].name];
            survival.max = party[i].system.skills.sur.passive;
        }
    }


    return `
        <table>
            <tr>
                <th align=\"left\">Skill</th><th align=\"left\">Max</th><th align=\"left\">Characters</th>
            </tr>
            <tr>
                <td>Acrobatics</td><td>${acrobatics.max}</td><td>${acrobatics.names}</td>
            </tr>
            <tr>
                <td>Animal Handling</td><td>${animalHandling.max}</td><td>${animalHandling.names}</td>
            </tr>
            <tr>
                <td>Arcana</td><td>${arcana.max}</td><td>${arcana.names}</td>
            </tr>
            <tr>
                <td>Athletics</td><td>${athletics.max}</td><td>${athletics.names}</td>
            </tr>
            <tr>
                <td>Deception</td><td>${deception.max}</td><td>${deception.names}</td>
            </tr>
            <tr>
                <td>History</td><td>${history.max}</td><td>${history.names}</td>
            </tr>
            <tr>
                <td>Insight</td><td>${insight.max}</td><td>${insight.names}</td>
            </tr>
            <tr>
                <td>Investigation</td><td>${investigation.max}</td><td>${investigation.names}</td>
            </tr>
            <tr>
                <td>Intimidation</td><td>${intimidation.max}</td><td>${intimidation.names}</td>
            </tr>
            <tr>
                <td>Medicine</td><td>${medicine.max}</td><td>${medicine.names}</td>
            </tr>
            <tr>
                <td>Nature</td><td>${nature.max}</td><td>${nature.names}</td>
            </tr>
            <tr>
                <td>Perception</td><td>${perception.max}</td><td>${perception.names}</td>
            </tr>
            <tr>
                <td>Persuasion</td><td>${persuasion.max}</td><td>${persuasion.names}</td>
            </tr>
            <tr>
                <td>Performance</td><td>${performance.max}</td><td>${performance.names}</td>
            </tr>
            <tr>
                <td>Religion</td><td>${religion.max}</td><td>${religion.names}</td>
            </tr>
            <tr>
                <td>Sleight of Hand</td><td>${sleightOfHand.max}</td><td>${sleightOfHand.names}</td>
            </tr>
            <tr>
                <td>Stealth</td><td>${stealth.max}</td><td>${stealth.names}</td>
            </tr>
            <tr>
                <td>Survival</td><td>${survival.max}</td><td>${survival.names}</td>
            </tr>
        </table>
    `;
}