const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

item.displayCard();

const content = `
<p>${item.name} requires ${value} days until completion.</p>
<form>
    <div class="form-group">
        <label for="num">Hours to spend:</label>
        <div class="form-fields">
            <input id="num" type="number" value="1"></input>
        </div>
    </div>
</form>`;

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "Study Days!",
        callback: async (html) => {
            const number = Number(html[0].querySelector("#num").value);
            if (number < 1 || number > value) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await ChatMessage.create({
                content: `${actor.name} works ${number} days.`,
                speaker: ChatMessage.getSpeaker({ actor })
            });
            return item.update({ "system.uses.value": value - number });
        }
    }
}
if (value >= 5) {
    buttons.cure = {
        icon: "<i class='fa-solid fa-virus'></i>",
        label: "Study 1 Day!",
        callback: async (html) => {
            await ChatMessage.create({
                content: `${actor.name} works a day.`,
                speaker: ChatMessage.getSpeaker({ actor })
            });
            return item.update({ "system.uses.value": value - 1 });
        }
    }
}

new Dialog({ title: item.name, content, buttons }).render(true);