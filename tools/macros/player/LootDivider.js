let looter = "Tenevir";
let partySize = 7;

const content = `
<form>
    <div class="form-group">
        <label for="looting">Looter:</label>
        <div class="form-fields">
            <input id="looting" type="string" value="${looter}"></input>
        </div>
        <label for="size">Party Size:</label>
        <div class="form-fields">
            <input id="size" type="number" value="${partySize}"></input>
        </div>
        <label for="pp">Platinum:</label>
        <div class="form-fields">
            <input id="pp" type="number" value="0"></input>
        </div>
        <label for="gp">Gold:</label>
        <div class="form-fields">
            <input id="gp" type="number" value="0"></input>
        </div>
        <label for="sp">Silver:</label>
        <div class="form-fields">
            <input id="sp" type="number" value="0"></input>
        </div>
        <label for="cp">Copper:</label>
        <div class="form-fields">
            <input id="cp" type="number" value="0"></input>
        </div>
    </div>
</form>`;

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

            console.log({ pp: pp, gp: gp, sp: sp, cp: cp });
        }
    }
}


new Dialog({ title: "Loot Divider", content, buttons }).render(true);