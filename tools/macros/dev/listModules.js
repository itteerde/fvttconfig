// the console report can be copied directly into the Markdown documentation (right-click copy String contents)

const modulesActive = game.modules.filter(m => m.active);
const moduleReport = modulesActive.map(
    m => ({ id: m.id, title: m.title, version: m.version })
);
console.log(modulesActive);
console.log(moduleReport);

let reportString = "";

for (i = 0; i < modulesActive.length; i++) {
    m = modulesActive[i];
    reportString = `${reportString}\n1. ${m.title} (version: ${m.version}) : [Project-URL](${m.url}), [Manifest](${m.manifest})`;
}

console.log({ reportString: reportString });


let wlString = "{";

for (i = 0; i < modulesActive.length; i++) {
    m = modulesActive[i];
    wlString = `${wlString} {"${m.title}", "${m.version}", "${m.url}"}${i < modulesActive.length - 1 ? "," : ""}`;
}

wlString = `${wlString}}`;

console.log({ wlString: wlString });