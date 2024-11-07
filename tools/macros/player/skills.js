const width = 650;
const SHOW_LANGUAGES = true;
const SHOW_TREASURY = true;
const TREASURY_UUID = "Actor.8AEpgEDR8sabumTi.Item.BE9gyEeNtKutK057";

let party = game.folders.find(f => f.name === "The Party").contents.filter(a => a.type === "character").sort((a, b) => { return a.name.localeCompare(b.name) });
console.log(party);

const ignored_languages = [
    'common'
];


function portraits(party) {
    let html = '';
    party.forEach(a => {
        html += `<td align="center" style="min-height:50px; min-width:50px;"><img src="${a.img}" alt="${a.name}" title="${a.name}" width="50" height="50"></td>`;
    });
    return html;
}

function skill(party, skill) {
    let html = '';
    party.forEach(a => {
        html += `<td align="center" style="${a.getRollData().skills[skill].prof.multiplier < 1 ? ("color:gray") : (a.getRollData().skills[skill].prof.multiplier === 1 ? ("color:black") : ("color:green"))};">${a.getRollData().skills[skill].total}</td > `;
    });
    return html;
}

function inspiration(party) {
    let html = '';
    party.forEach(a => {
        html += `<td align="center">${a.system.attributes.inspiration ? '<img src="icons/svg/light.svg" width="20px" height="20px" style="border:none; outline: none; filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(80%) contrast(119%);"/>' : '<img src="icons/svg/light.svg" width="20px" height="20px" style="border:none; outline: none; filter: invert(39%) sepia(0%) saturate(177%) hue-rotate(194deg) brightness(93%) contrast(85%);"/>'}</td > `;
    });
    return html;
}

function health(party) {
    let html = '';
    party.forEach(a => {
        html += `<td align="center" style="${a.system.attributes.hp.pct < 33 ? ("color:red") : (a.system.attributes.hp.pct < 66 ? ("color:orange") : ("color:green"))};">${a.system.attributes.hp.value + "/" + a.system.attributes.hp.effectiveMax}</td>`;
    });
    return html;
}

function exhaustion(party) {
    let html = '';
    party.forEach(a => {
        html += `<td align="center" style="${a.system.attributes.exhaustion === 0 ? ("color:green") : (a.system.attributes.exhaustion < 3 ? ("color:orange") : ("color:red"))};">${a.system.attributes.exhaustion}</td>`;
    });
    return html;
}

function resting(party) {
    let html = '';
    try {
        party.forEach(a => {
            html += `<td align="center" style="${a.items.find(i => i.name === "Long Rest").system.uses.value < 2 ? ("color:gray") : ("color:green")};">${a.items.find(i => i.name === "Long Rest").system.uses.value + "/" + a.items.find(i => i.name === "Long Rest").system.uses.max}</td>`;
        });

    } catch (e) {

    }
    return html;
}

function speaks(actor, language) {
    return actor.system.traits.languages.value.has(language);
}

function language_name(language) {
    switch (language) {
        case 'cant': return "Thieves' Cant";
        case 'celestial': return "Celestial";
        case 'common': return "Common";
        case 'draconic': return "Draconic";
        case 'dwarvish': return "Dwarvish";
        case 'elvish': return "Elvish";
        case 'giant': return "Giant";
        case 'gnomish': return "Gnomish";
        case 'goblin': return "Goblin";
        case 'orc': return "Orc";
        case 'sign': return "Common. Sign Lang.";
        case 'sylvan': return "Sylvan";
        case 'undercommon': return "Undercommon";
        default: return language;
    }
}

function languages(party) {
    let languages = new Set();
    party.forEach(a => {
        languages = languages.union(a.system.traits.languages.value);
    });

    ignored_languages.forEach(l => {
        languages.delete(l);
    })

    languages = Array.from(languages);
    languages = languages.sort((a, b) => a.localeCompare(b));

    let html = '';
    let count = 0;
    languages.forEach(l => {
        count++;
        if (count === 1) {
            html += `<tr style="border-top: solid; border-top-width: thin; border-top-color: gray;">`;
        } else {
            if (count === languages.length) {
                html += `<tr style="border-bottom: solid; border-bottom-width: thin; border-bottom-color: gray;">`;
            } else {
                html += `<tr>`
            }
        }
        html += `<td>${language_name(l)}</td>`;
        party.forEach(a => {
            html += `<td align="center" style="color: ${speaks(a, l) ? "green" : "gray"}">${speaks(a, l) ? "✅" : "-"}</td>`;
        });
    });

    return html;
}

let content = '';

content += `
    <table>
        <tr>
        <td></td>
        ${portraits(party)}
        </tr>
        <tr style="border-top: solid; border-top-width: thin; border-top-color: gray;">
            <td>Inspiration</td>
            ${inspiration(party)}
        </tr>
        <tr>
            <td>Health</td>
            ${health(party)}
        </tr>
        <tr style="border-bottom: solid; border-bottom-width: thin; border-bottom-color: gray;">
            <td>Exhaustion</td>
            ${exhaustion(party)}
        </tr>
        <tr>
            <td colspan="${party.length + 1}"></td>
        </tr>
        <tr style="border-top: solid; border-top-width: thin; border-top-color: gray;">
            <td>Acrobatics</td>
            ${skill(party, "acr")}
        </tr>
        <tr>
            <td>Animal Handling</td>
            ${skill(party, "ani")}
        </tr>
        <tr>
            <td>Arcana</td>
            ${skill(party, "arc")}
        </tr>
        <tr>
            <td>Athletics</td>
            ${skill(party, "ath")}
        </tr>
        <tr>
            <td>Deception</td>
            ${skill(party, "dec")}
        </tr>
        <tr>
            <td>History</td>
            ${skill(party, "his")}
        </tr>
        <tr>
            <td>Insight</td>
            ${skill(party, "ins")}
        </tr>
        <tr>
            <td>Intimidation</td>
            ${skill(party, "itm")}
        </tr>
        <tr>
            <td>Investigation</td>
            ${skill(party, "inv")}
        </tr>
        <tr>
            <td>Medicine</td>
            ${skill(party, "med")}
        </tr>
        <tr>
            <td>Nature</td>
            ${skill(party, "nat")}
        </tr>
        <tr>
            <td>Perception</td>
            ${skill(party, "prc")}
        </tr>
        <tr>
            <td>Performance</td>
            ${skill(party, "prf")}
        </tr>
        <tr>
            <td>Persuasion</td>
            ${skill(party, "per")}
        </tr>
        <tr>
            <td>Religion</td>
            ${skill(party, "rel")}
        </tr>
        <tr>
            <td>Sleight of Hand</td>
            ${skill(party, "slt")}
        </tr>
        <tr>
            <td>Stealth</td>
            ${skill(party, "ste")}
        </tr>
        <tr style="border-bottom: solid; border-bottom-width: thin; border-bottom-color: gray;">
            <td>Survival</td>
            ${skill(party, "sur")}
        </tr>`;

if (SHOW_LANGUAGES) {
    content += `
        <tr>
            <td colspan="${party.length + 1}"></td>
        </tr>
        ${languages(party)}
        `;
}

content += `
        <tr>
            <td colspan="${party.length + 1}"></td>
        </tr>
        <tr style="border-top: solid; border-top-width: thin; border-top-color: gray;">
            <td>Rest Charges</td>
            ${resting(party)}
        </tr>
    </table>
        `;

let d = new Dialog({
    title: "Report 2.0",
    options: {},
    content: content,
    buttons: {
        ok: {
            icon: '',
            label: "OK",
            callback: async () => {
                console.log({ content: content });
                if (SHOW_TREASURY) {
                    const value = (await fromUuid(TREASURY_UUID)).system.currency;
                    ChatMessage.create({
                        speaker: { actor: '8AEpgEDR8sabumTi' },
                        content: `
                        <div>
                            Company Treasure
                            <table>
                                <tr><td><img src="systems/dnd5e/icons/currency/platinum.webp" alt="Platinum" title="Platinum" style="border:none; outline: none;"></td><td style="text-align: right;">${value.pp}</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/gold.webp" alt="Gold" title="Gold" style="border:none; outline: none;"></td><td style="text-align: right;">${value.gp}</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/electrum.webp" alt="Electrum" title="Electrum" style="border:none; outline: none;"></td><td style="text-align: right;">${value.ep}</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/silver.webp" alt="Silver" title="Silver" style="border:none; outline: none;"></td><td style="text-align: right;">${value.sp}</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/copper.webp" alt="Copper" title="Copper" style="border:none; outline: none;"></td><td style="text-align: right;">${value.cp}</td></tr>
                            </table>
                            suggested Payout
                            <table width="50%">
                                <tr><td><img src="systems/dnd5e/icons/currency/platinum.webp" alt="Platinum" title="Platinum" style="border:none; outline: none;"></td><td style="text-align: right;">${Math.floor(value.pp / party.length) * party.length} (${Math.floor(value.pp / party.length)} each)</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/gold.webp" alt="Gold" title="Gold" style="border:none; outline: none;"></td><td style="text-align: right;">${Math.floor(value.gp / party.length) * party.length} (${Math.floor(value.gp / party.length)} each)</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/electrum.webp" alt="Electrum" title="Electrum" style="border:none; outline: none;"></td><td style="text-align: right;">${Math.floor(value.ep / party.length) * party.length} (${Math.floor(value.ep / party.length)} each)</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/silver.webp" alt="Silver" title="Silver" style="border:none; outline: none;"></td><td style="text-align: right;">${Math.floor(value.sp / party.length) * party.length} (${Math.floor(value.sp / party.length)} each)</td></tr>
                                <tr><td><img src="systems/dnd5e/icons/currency/copper.webp" alt="Copper" title="Copper" style="border:none; outline: none;"></td><td style="text-align: right;">${Math.floor(value.cp / party.length) * party.length} (${Math.floor(value.cp / party.length)} each)</td></tr>
                            </table>
                        </div>
                        `})
                }
            }
        }
    },
    default: "ok",
    //render: html => console.log("Register interactivity in the rendered dialog"),
    //close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true, { width: width });