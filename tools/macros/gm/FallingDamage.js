/**
 * Macro to be used from Control Bar by the DM selecting one and only one Actor the Falling Damage is to be applied to.
 *
 * [Issue](https://github.com/itteerde/fvttconfig/issues/43)
 */

const macroLabel = "Fall Damage";
const icon = "modules/Tablerules/icons/prototypes/falling01.webp";

// query GM for RollFormula

console.log(`${macroLabel}: working on it.`);

const content = `
<p>Falling damage.</p>
<form>
    <div class="form-group">
        <label for="num">Falling height (ft):</label>
        <div class="form-fields">
            <input id="num" type="number" value="11"></input>
        </div>
    </div>
</form>`;

const buttons = {
    heal: {
        icon: "<i class='fa-solid fa-person-falling-burst'></i>",
        label: "Drop them!",
        callback: async (html) => {
            const number = Number(html[0].querySelector("#num").value);
            if (number < 1 || number > value) {
                ui.notifications.warn("Invalid number.");
                return;
            }
            await new Roll(`${number}`).toMessage({
                speaker: ChatMessage.getSpeaker({ actor }),
                flavor: macroLabel
            });
            return; //item.update({ "system.uses.value": value - number });
        }
    }
}

// Roll damage
// Requestor Save or Save from ChatMessage (prefer the latter)
// Apply Damage and report in ChatMessage
