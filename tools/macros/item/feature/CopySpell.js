/**
 * Item Macro for the Wizard Feature Copy Spell
 * https://www.dndbeyond.com/classes/wizard#ClassFeatures
 */

const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left (put a number of charges equal to the time to learn the spells onto this item).`);
    return;
}

item.displayCard();
const unit = `${item.system.activation.type}s`; // will be "hour"s for all but Order of Scribe

const content = `
<p>Copying the current Spell requires ${value} more ${unit}.</p>
<form>
    <div class="form-group">
        <label for="num">Time to be spent (${unit}):</label>
        <div class="form-fields">
            <input id="num" type="number" value="1"></input>
        </div>
    </div>
</form>`;

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-pen-nib'></i>",
        label: "Do your homework!",
        callback: async (html) => {
            const number = Number(html[0].querySelector("#num").value);
            if (number < 1 || number > value) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await new Roll(`${number}`).toMessage({
                speaker: ChatMessage.getSpeaker({ actor }),
                flavor: `${item.name}: ${item.system.uses.value} ${unit} to go, taking ${value} ${unit} now, ${item.system.uses.value - number} ${unit} remaining after this.`
            });
            return item.update({ "system.uses.value": value - number });
        }
    }
}

new Dialog({ title: "Copy Spell", content, buttons }).render(true);