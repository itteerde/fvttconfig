/**
 * Report stuff for quick overview of the state of game
 * 
 * 
*/

const macroLabel = "Party State Report";

const partyIds = [
    "8ugKnRSqQzxSxrZO", //Πως της αυγής (Copy)
    "FC2ZItcPqgCuvkhW" //Enona Jadrcej 10
];

const party = partyIds.map(i => game.actors.get(i));

let dialogContent = `
    <div>
        <h1>Summary</h1>
        ${summary(party)}
    </di>
`;

let d = new Dialog({
    title: macroLabel,
    content: dialogContent,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Option One",
            callback: () => console.log("Chose One")
        },
        two: {
            icon: '<i class="fas fa-times"></i>',
            label: "Option Two",
            callback: () => console.log("Chose Two")
        }
    },
    default: "two",
    render: html => console.log("Register interactivity in the rendered dialog"),
    close: html => console.log("This always is logged no matter which option is chosen")
});
d.render(true);

function summary(party) {
    let html = "";
    html += "<table><tr><th align=\"left\">Name</th><th>HP/max</th></tr>";
    html += party.map(a => `<tr><td>${a.name}</td><td>${a.system.attributes.hp.value}/${a.system.attributes.hp.max}</td></tr>`);
    html += "</table>";
    return html;
}