/**
 * Item-Macro Macro for the Hide Action
 */

const showValue = false;

await item.displayCard();

async function rollHide(modifier, sitBonus) {
    let rollFormula = "1d20+@skill";

    if (modifier === "advantage") {
        rollFormula = "2d20kh1+@skill";
    }

    if (modifier === "disadvantage") {
        rollFormula = "2d20kl1+@skill";
    }

    rollFormula += `+${sitBonus}`;

    const roll = await new Roll(rollFormula, { skill: actor.getRollData().skills.ste.total, async: true });
    const chatMessage = await roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: `${item.name}, stealth to break:`
    }, { rollMode: CONST.DICE_ROLL_MODES.BLIND });

    const stealth = chatMessage.rolls[0].total;

    let effect = actor.getEmbeddedCollection("ActiveEffect").find(e => e.name === "Stealth");

    if (effect === undefined) {
        const effectData = { icon: item.img, name: showValue ? `Stealth: (${stealth})` : "Stealth", statuses: [showValue ? `Stealth: (${stealth})` : "Stealth"] };
        foundry.utils.setProperty(effectData, "flags.world.origin", item.uuid);
        //foundry.utils.setProperty(effectData, "flags.core.statusId", showValue ? `Stealth: (${stealth})` : "Stealth");
        foundry.utils.setProperty(effectData, "flags.world.stealth", stealth);

        await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
    } else {
        await effect.update({ "flags.world.stealth": stealth });
    }
}

const content = `
<form>
    <div class="form-group">
        <label for="text">Situational Bonus?</label>
        <div class="form-fields">
            <input id="sitBonus" type="text" value=""></input>
        </div>
    </div>
</form>`;


const buttons = {
    advantage: {
        label: "Advantage",
        callback: async (html) => {
            const sitBonus = html[0].querySelector("#sitBonus").value;
            const modifier = "advantage";
            rollHide(modifier, sitBonus);
        }
    },
    normal: {
        label: "Normal",
        callback: async (html) => {
            const sitBonus = html[0].querySelector("#sitBonus").value;
            const modifier = "normal";
            rollHide(modifier, sitBonus);
        }
    },
    disadvantage: {
        label: "Disadvantage",
        callback: async (html) => {
            const sitBonus = html[0].querySelector("#sitBonus").value;
            const modifier = "disadvantage";
            rollHide(modifier, sitBonus);
        }
    }
}

new Dialog({ title: item.name, content, buttons, close: () => null }).render(true);

