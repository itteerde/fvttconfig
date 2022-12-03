/**
 * Item-Macro Macro for Channel Divinity: Preserve Life (Tablerules.dictionary.class.cleric.life.features.preserveLife)
 */

const macroLabel = Tablerules.dictionary.class.cleric.life.features.preserveLife.label;

if (await item.use() === null) {
  if (TRUtils.isDebugEnabled()) {
    Tablerules.debug({ message: `${macroLabel}, item.use() returned null, returning.`, arguments: arguments });
  }
  return;
}


const useDistance3D = true;

let tokensInRange = canvas.tokens.placeables.filter(
  t => t.document.disposition === 1 &&
    (t.actor.system.attributes.hp.value < t.actor.system.attributes.hp.max / 2)
);

if (useDistance3D) {
  tokensInRange = tokensInRange.filter(t => (Math.sqrt(TRUtils.distanceTokens(token, t) * TRUtils.distanceTokens(token, t) + (token.document.elevation - t.document.elevation) * (token.document.elevation - t.document.elevation))) <= 30);
} else {
  tokensInRange = tokensInRange.filter(t => TRUtils.distanceTokens(token, t) <= 30);
}



let dataToBeModifiedInDialog = tokensInRange.map(t => ({ name: t.actor.name, value: t.actor.system.attributes.hp.value, max: t.actor.system.attributes.hp.max, half: Math.floor(t.actor.system.attributes.hp.max / 2), id: t.actor._id }));

if (TRUtils.isDebugEnabled()) {
  Tablerules.debug({ message: `${macroLabel}, collected data for GUI.`, arguments: arguments, dataToBeModifiedInDialog: dataToBeModifiedInDialog });
}


//create Dialog, change values
//put values returned to GM with Requestor
//updates (via Actor.applyDamage() for visuals)

// https://discord.com/channels/170995199584108546/699750150674972743/1048270276368015472

/*
const content = tokensInRange.reduce((acc, token) => {
  return acc + `
  <div class="form-group">
    <label>${token.actor.name}</label>
    <div class="form-fields">
      <input data-token-id="${token.document.id}" value="${token.actor.system.attributes.hp.value}">
    </div>
  </div>`;
}, "<form>") + "</form>";
const map_of_ids_and_values = await Dialog.prompt({
  title: macroLabel,
  content,
  callback: (html) => {
    return = [...html[0].querySelector("input")].map(i => {
      return {id: i.dataset.tokenId, hp: i.value};
    });
  },
  rejectClose: false
});
*/

/*

  on GUI validation

  https://github.com/krbz999/zhell-macros/blob/main/classes/wizard/arcane_recovery.js , line 73

*/

//

const { a, b } = await Dialog.prompt({
  title: macroLabel,
  content: `
  <input id="a" type="number" placeholder="Number of d20s" autofocus>
  <input id="b" type="number" placeholder="Success Threshold">`,
  callback: (html) => {
    const a = html[0].querySelector("#a").value;
    const b = html[0].querySelector("#b").value;
    return { a, b };
  },
  rejectClose: false
});
if (!a || !b) return;
const roll = await new Roll(`${a}d20`).evaluate({ async: true });
const fails = roll.dice[0].results.reduce((acc, e) => acc += (e.result === 1 ? 1 : 0), 0);
const succs = roll.dice[0].results.reduce((acc, e) => acc += (e.result >= b ? 1 : 0), 0);
const flavor = `Successes: ${succs}. Failures: ${fails}`;
await roll.toMessage({ flavor });


/* example
const {a,b} = await Dialog.prompt({
  title: "Number of d20s",
  content: `
  <input id="a" type="number" placeholder="Number of d20s" autofocus>
  <input id="b" type="number" placeholder="Success Threshold">`,
  callback: (html) => {
    const a = html[0].querySelector("#a").value;
    const b = html[0].querySelector("#b").value;
    return {a,b};
  },
  rejectClose: false
});
if(!a || !b) return;
const roll = await new Roll(`${a}d20`).evaluate({async: true});
const fails = roll.dice[0].results.reduce((acc, e) => acc += (e.result === 1 ? 1 : 0), 0);
const succs = roll.dice[0].results.reduce((acc, e) => acc += (e.result >= b ? 1 : 0), 0);
const flavor = `Successes: ${succs}. Failures: ${fails}`;
await roll.toMessage({flavor});
 */