/**
 * Item Macro for the Paldin Feature Lay on Hands
 * https://www.dndbeyond.com/sources/phb/paladin#LayonHands
 * https://raw.githubusercontent.com/krbz999/zhell-macros/main/classes/paladin/lay_on_hands.js
 */

//check if the Item needs to be corrected to matach the Actor's Paladin Levels
const paladinLevels = actor.classes.paladin.system.levels;
if (item.system.uses.max != paladinLevels * 5) {
    await item.update({ "system.uses.max": paladinLevels * 5 });
}

const { value } = item.system.uses;
if (value < 1) {
    ui.notifications.warn(`${item.name} has no uses left.`);
    return;
}

item.displayCard();

const content = `
<p>Lay on Hands has ${value} uses left.</p>
<form>
    <div class="form-group">
        <label for="num">Hit points to restore:</label>
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
            if (number < 1 || number > value) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await new Roll(`${number}`).toMessage({
                speaker: ChatMessage.getSpeaker({ actor }),
                flavor: item.name
            });
            return item.update({ "system.uses.value": value - number });
        }
    }
}
if (value >= 5) {
    buttons.cure = {
        icon: "<i class='fa-solid fa-virus'></i>",
        label: "Cure!",
        callback: async (html) => {
            await ChatMessage.create({
                content: `${actor.name} cures a disease or poison.`,
                speaker: ChatMessage.getSpeaker({ actor })
            });
            return item.update({ "system.uses.value": value - 5 });
        }
    }
}

new Dialog({ title: "Lay on Hands", content, buttons }).render(true);