const warlockLevels = actor.classes.warlock.system.levels;

if (item.system.uses.max != warlockLevels + 1) {
    await item.update({ "system.uses.max": warlockLevels + 1, "system.uses.value": Math.min(item.system.uses.value, warlockLevels + 1) });
}

const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

item.displayCard();

const content = `
<p>${item.name} has ${value} uses left.</p>
<form>
    <div class="form-group">
        <label for="num">Dice (1 to ${Math.max(actor.system.abilities.cha.mod, 1)}):</label>
        <div class="form-fields">
            <input id="num" type="number" value="1"></input>
        </div>
    </div>
</form>`;

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-hand-holding-heart'></i>",
        label: "Heal!",
        callback: async (html) => {
            const number = Number(html[0].querySelector("#num").value);
            if (number < 1 || number > Math.max(actor.system.abilities.cha.mod, 1)) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await new Roll(`${number}d6`).toMessage({
                speaker: ChatMessage.getSpeaker({ actor }),
                flavor: item.name
            });
            return item.update({ "system.uses.value": value - number });
        }
    }
}

new Dialog({ title: item.name, content, buttons }).render(true);