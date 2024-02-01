const macroLabel = "Party State Report";
const passivesIncludeAll = true; // overwrites passivesIncluded
const passivesIncluded = ["insight", "perception", "investigation"]; // ignored if passivesIncludeAll = true, set to false if you want to create only a partial list.
const displayEffects = true; // if true all ActiveEffects except those exactly matching by label to ignoreEffects are displayed as icons with mouseOver titles displaying the Labels. If false only Inspiration will be displayed. Inspiration is always the first icon displayed.
const width = 1000;
const ignoreEffects = ["Crossbow Expert", "War Caster"];
const displayStealth = true;

const party = game.folders.find(f => f.name === "PCs").contents.concat(game.folders.getName("Resources").contents).sort((a, b) => { return a.name.localeCompare(b.name) });

let dialogContent = `
    <div class="dnd5e chat-card">
        <h1>Summary</h1>
            <h2>HP and Spellslots</h2>
            ${summary(party)}
            ${displayStealth ? "<h2>Stealth</h2>" : ""}
            ${displayStealth ? stealthParty(party) : ""}
            <h2>Passives</h2>
            ${passives(party, passivesIncluded)}
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
d.render(true, { width: width });

function summary(party) {
    let html = `<table><tr><th align="left">Name</th><th align="left">Indicators</th><th align="left">HP/max</th><th align="left">Spell Slots</th></tr>`;
    const rows = party.map(a => `<tr><td>${a.name}</td><td>${renderStatusIcons(a)}</td><td>${renderMeter(a)} ${a.system.attributes.hp.value}/${a.system.attributes.hp.max + a.system.attributes.hp.tempmax} ${a.system.attributes.hp.value < (a.system.attributes.hp.max + a.system.attributes.hp.tempmax) ? " (" + (a.system.attributes.hp.value - (a.system.attributes.hp.max + a.system.attributes.hp.tempmax)) + ")" : ""}</td><td>${spellSlots(a)}</td></tr>`);
    for (let i = 0; i < rows.length; i++) {
        html += rows[i];
    }
    html += "</table>";
    return html;
}

function renderStatusIcons(actor) {
    const inspiration = actor.system.attributes.inspiration ? `<img src="icons/magic/perception/eye-ringed-green.webp" title="Inspiration" width="20" height="20">` : "";

    let effects = displayEffects ? Array.from(new Set(actor.effects.map(e => ignoreEffects.includes(e.name) ? "" : `<img src="${e.icon}" title="${e.name}" height="20", width="20">`))).join("") : "";

    return `${inspiration}${effects}`;
}

function renderMeter(actor) {
    const fraction = actor.system.attributes.hp.value / (actor.system.attributes.hp.max + actor.system.attributes.hp.tempmax); // null is 0 is JS maths

    return `<meter value="${fraction}" min="0" max="1" low="0.33" high="0.66" optimum="0.99" style="width: 160px; height:25px;"></meter>`;
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

    const numberPrepared = actor.items.filter(i => i.system?.preparation?.prepared && i.system?.preparation?.mode === "prepared" && i.system?.level > 0).length;
    if (numberPrepared > 0) {
        spellSlots += `, (${numberPrepared} prepared)`;
    }

    spellSlots += actor.classes.paladin?.system.levels !== undefined ? `, LoH:${actor.items.find(i => i.name === "Lay on Hands Pool").system.uses.value}/${actor.items.find(i => i.name === "Lay on Hands Pool").system.uses.max}` : "";

    spellSlots += actor.classes?.cleric?.system?.levels >= 2 ? `, CDiv:${actor.items.find(i => i.name === "Channel Divinity").system.uses.value}/${actor.items.find(i => i.name === "Channel Divinity").system.uses.max}` : "";

    // needs the Bardic Inspiration to be configured with uses instead of using the Primary Resource
    // spellSlots += actor.classes?.bard?.system?.levels !== undefined ? `, BInsp:${actor.items.find(i => i.name === "Bardic Inspiration").system.uses.value}/${actor.items.find(i => i.name === "Bardic Inspiration").system.uses.max}` : "";

    return spellSlots;
}

function stealthActor(a) {
    let r = "<tr>";

    r += `<td>${a.name}</td>`;

    const effect = a.effects.find(e => e.name.startsWith("Stealth"));

    if (effect !== undefined) {
        r += `<td>${effect?.flags?.world.stealth}</td>`;
    } else {
        r += "<td>-</td>"
    }

    return r + "</tr>";
}

function stealthParty(party) {
    let stealth = `
    <table>
        <tr>
            <th align=\"left\">Name</th><th align=\"left\">Value</th>
        </tr>`;
    for (let i = 0; i < party.length; i++) {
        stealth = stealth + stealthActor(party[i]);
    }
    return stealth = stealth + "</table>"
}

function passives(party, passivesIncluded) {
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


    let passives = `
    <table>
        <tr>
            <th align=\"left\">Skill</th><th align=\"left\">Max</th><th align=\"left\">Characters</th>
        </tr>`;

    if (passivesIncludeAll || passivesIncluded.includes("acrobatics")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.acr.passive === acrobatics.max) {
                acrobatics.names.push(party[i].name);
            }
            if (party[i].system.skills.acr.passive > acrobatics.max) {
                acrobatics.names = [party[i].name];
                acrobatics.max = party[i].system.skills.acr.passive;
            }
        }

        passives += `<tr><td>Acrobatics</td><td>${acrobatics.max}</td><td>${acrobatics.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("animalHandling")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.ani.passive === animalHandling.max) {
                animalHandling.names.push(party[i].name);
            }
            if (party[i].system.skills.ani.passive > animalHandling.max) {
                animalHandling.names = [party[i].name];
                animalHandling.max = party[i].system.skills.ani.passive;
            }
        }

        passives += `<tr><td>Animal Handling</td><td>${animalHandling.max}</td><td>${animalHandling.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("arcana")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.arc.passive === arcana.max) {
                arcana.names.push(party[i].name);
            }
            if (party[i].system.skills.arc.passive > arcana.max) {
                arcana.names = [party[i].name];
                arcana.max = party[i].system.skills.arc.passive;
            }
        }

        passives += `<tr><td>Arcana</td><td>${arcana.max}</td><td>${arcana.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("athletics")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.ath.passive === athletics.max) {
                athletics.names.push(party[i].name);
            }
            if (party[i].system.skills.ath.passive > athletics.max) {
                athletics.names = [party[i].name];
                athletics.max = party[i].system.skills.ath.passive;
            }
        }

        passives += `<tr><td>Athletics</td><td>${athletics.max}</td><td>${athletics.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("deception")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.dec.passive === deception.max) {
                deception.names.push(party[i].name);
            }
            if (party[i].system.skills.dec.passive > deception.max) {
                deception.names = [party[i].name];
                deception.max = party[i].system.skills.dec.passive;
            }
        }

        passives += `<tr><td>Deception</td><td>${deception.max}</td><td>${deception.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("history")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.his.passive === history.max) {
                history.names.push(party[i].name);
            }
            if (party[i].system.skills.his.passive > history.max) {
                history.names = [party[i].name];
                history.max = party[i].system.skills.his.passive;
            }
        }

        passives += `<tr><td>History</td><td>${history.max}</td><td>${history.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("insight")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.ins.passive === insight.max) {
                insight.names.push(party[i].name);
            }
            if (party[i].system.skills.ins.passive > insight.max) {
                insight.names = [party[i].name];
                insight.max = party[i].system.skills.ins.passive;
            }
        }

        passives += `<tr><td>Insight</td><td>${insight.max}</td><td>${insight.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("investigation")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.inv.passive === investigation.max) {
                investigation.names.push(party[i].name);
            }
            if (party[i].system.skills.inv.passive > investigation.max) {
                investigation.names = [party[i].name];
                investigation.max = party[i].system.skills.inv.passive;
            }
        }

        passives += `<tr><td>Investigation</td><td>${investigation.max}</td><td>${investigation.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("intimidation")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.itm.passive === intimidation.max) {
                intimidation.names.push(party[i].name);
            }
            if (party[i].system.skills.itm.passive > intimidation.max) {
                intimidation.names = [party[i].name];
                intimidation.max = party[i].system.skills.itm.passive;
            }
        }

        passives += `<tr><td>Intimidation</td><td>${intimidation.max}</td><td>${intimidation.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("medicine")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.med.passive === medicine.max) {
                medicine.names.push(party[i].name);
            }
            if (party[i].system.skills.med.passive > medicine.max) {
                medicine.names = [party[i].name];
                medicine.max = party[i].system.skills.med.passive;
            }
        }

        passives += `<tr><td>Medicine</td><td>${medicine.max}</td><td>${medicine.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("nature")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.nat.passive === nature.max) {
                nature.names.push(party[i].name);
            }
            if (party[i].system.skills.nat.passive > nature.max) {
                nature.names = [party[i].name];
                nature.max = party[i].system.skills.nat.passive;
            }
        }

        passives += `<tr><td>Nature</td><td>${nature.max}</td><td>${nature.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("perception")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.prc.passive === perception.max) {
                perception.names.push(party[i].name);
            }
            if (party[i].system.skills.prc.passive > perception.max) {
                perception.names = [party[i].name];
                perception.max = party[i].system.skills.prc.passive;
            }
        }

        passives += `<tr><td>Perception</td><td>${perception.max}</td><td>${perception.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("persuasion")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.per.passive === persuasion.max) {
                persuasion.names.push(party[i].name);
            }
            if (party[i].system.skills.per.passive > persuasion.max) {
                persuasion.names = [party[i].name];
                persuasion.max = party[i].system.skills.per.passive;
            }
        }

        passives += `<tr><td>Persuasion</td><td>${persuasion.max}</td><td>${persuasion.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("performance")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.prf.passive === performance.max) {
                performance.names.push(party[i].name);
            }
            if (party[i].system.skills.prf.passive > performance.max) {
                performance.names = [party[i].name];
                performance.max = party[i].system.skills.prf.passive;
            }
        }

        passives += `<tr><td>Performance</td><td>${performance.max}</td><td>${performance.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("religion")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.rel.passive === religion.max) {
                religion.names.push(party[i].name);
            }
            if (party[i].system.skills.rel.passive > religion.max) {
                religion.names = [party[i].name];
                religion.max = party[i].system.skills.rel.passive;
            }
        }

        passives += `<tr><td>Religion</td><td>${religion.max}</td><td>${religion.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("sleightOfHand")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.slt.passive === sleightOfHand.max) {
                sleightOfHand.names.push(party[i].name);
            }
            if (party[i].system.skills.slt.passive > sleightOfHand.max) {
                sleightOfHand.names = [party[i].name];
                sleightOfHand.max = party[i].system.skills.slt.passive;
            }
        }

        passives += `<tr><td>Sleight of Hand</td><td>${sleightOfHand.max}</td><td>${sleightOfHand.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("stealth")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.ste.passive === stealth.max) {
                stealth.names.push(party[i].name);
            }
            if (party[i].system.skills.ste.passive > stealth.max) {
                stealth.names = [party[i].name];
                stealth.max = party[i].system.skills.ste.passive;
            }
        }

        passives += `<tr><td>Stealth</td><td>${stealth.max}</td><td>${stealth.names}</td></tr>`;
    }

    if (passivesIncludeAll || passivesIncluded.includes("survival")) {
        for (let i = 0; i < party.length; i++) {
            if (party[i].system.skills.sur.passive === survival.max) {
                survival.names.push(party[i].name);
            }
            if (party[i].system.skills.sur.passive > survival.max) {
                survival.names = [party[i].name];
                survival.max = party[i].system.skills.sur.passive;
            }
        }

        passives += `<tr><td>Survival</td><td>${survival.max}</td><td>${survival.names}</td></tr>`;
    }

    passives += `</table>`;

    return passives;
}