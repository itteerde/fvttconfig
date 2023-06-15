/**
 * Item Macro for the Life Cleric Feature Blessed Healer
 */

item.displayCard();

const content = `
<form>
    <div class="form-group">
        <label for="num">Level (Slot) cast:</label>
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
            if (number < 1) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await new Roll(`${number + 2}`).toMessage({
                speaker: ChatMessage.getSpeaker({ actor }),
                flavor: `${item.name} (applied automatically)`
            });
            return await actor.applyDamage(- (number + 2));
        }
    }
}

new Dialog({ title: "Lay on Hands", content, buttons }).render(true);