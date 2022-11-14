/**
 * Item-Macro Macro for Channel Divinity: Preserve Life (Tablerules.dictionary.class.cleric.life.features.preserveLife)
 */

//collect valid targets
const token = canvas.tokens.controlled[0]; //do we have the token? if not this, or lookup the token for the active scene or? if we don't have the token probably this as there could be several active scenes

const tokensInRange = canvas.tokens.placeables.filter(t => t.document.disposition === 1 && TRUtils.distanceTokens(token, t) <= 30);
let dataToBeModifiedInDialog = tokensInRange.map(t => ({ name: t.actor.name, value: t.actor.system.attributes.hp.value, max: t.actor.system.attributes.hp.max, half: Math.floor(t.actor.system.attributes.hp.max / 2), id: t.actor._id }));

//create Dialog, change values, update values returned (via Actor.applyDamage() for visuals)
//create ChatMessage

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