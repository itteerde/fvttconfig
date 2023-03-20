let looter = canvas.tokens.controlled[0] === undefined ? "?" : canvas.tokens.controlled[0].actor.name;
let partySize = 7;
const method = "noChange";

const content = `
<form>
    <div class="form-group">
        <label for="looting">Looter:</label>
        <div class="form-fields">
            <input id="looting" type="text" value="${looter}">
        </div>
    </div>
    <div class="form-group">
        <label for="size">Party Size:</label>
        <div class="form-fields">
            <input id="size" type="number" value="${partySize}">
        </div>
    </div>
    <div class="form-group">        
        <label for="pp">Platinum:</label>
        <div class="form-fields">
            <input id="pp" type="number" value="0">
        </div>
    </div>
    <div class="form-group">
        <label for="gp">Gold:</label>
        <div class="form-fields">
            <input id="gp" type="number" value="0">
        </div>
    </div>
    <div class="form-group">
        <label for="sp">Silver:</label>
        <div class="form-fields">
            <input id="sp" type="number" value="0">
        </div>
    </div>
    <div class="form-group">
        <label for="cp">Copper:</label>
        <div class="form-fields">
            <input id="cp" type="number" value="0">
        </div>
    </div>
</form>`;

let loot = undefined;

const buttons = {
    distribute: {
        icon: "<i class='fa-solid fa-coins'></i>",
        label: "Distribute",
        callback: async (html) => {
            looter = html[0].querySelector("#looting").value;
            partySize = Number(html[0].querySelector("#size").value);
            const pp = Number(html[0].querySelector("#pp").value);
            const gp = Number(html[0].querySelector("#gp").value);
            const sp = Number(html[0].querySelector("#sp").value);
            const cp = Number(html[0].querySelector("#cp").value);

            return divide({ pp: pp, gp: gp, sp: sp, cp: cp }, looter, partySize);
        }
    }
}

new Dialog({ title: "Loot Divider", content, buttons }).render(true);

function divide(loot, looting, size) {
    console.log({ message: "dividing loot", looting: looting, size: size });
    if (method === "noChange") {
        ChatMessage.create({
            content: `
                <p>${looting} (claims to have) found ${loot.pp} pp, ${loot.gp} pp, ${loot.sp} pp, and ${loot.cp} pp.</p>
                <p>They are giving everybody else ${Math.floor(loot.pp / size)} pp, ${Math.floor(loot.gp / size)} gp, ${Math.floor(loot.sp / size)} sp, and ${Math.floor(loot.cp / size)} cp.</p>
                <p>${looting} is claiming to keep ${loot.pp - (size - 1) * Math.floor(loot.pp / size)} pp, ${loot.gp - (size - 1) * Math.floor(loot.gp / size)} gp, ${loot.sp - (size - 1) * Math.floor(loot.sp / size)} sp, and ${loot.cp - (size - 1) * Math.floor(loot.cp / size)} cp.</p>
            `
        }, { chatBubble: false });

    }
}