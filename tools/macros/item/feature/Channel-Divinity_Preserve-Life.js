/**
 * Item-Macro Macro for Channel Divinity: Preserve Life
 * https://www.dndbeyond.com/classes/cleric#LifeDomain
 * 
 * icon-suggestion: icons/magic/light/orb-beams-green.webp
 */

const macroLabel = "Channel Divinity: Preserve Life";
const useDistance3D = true;

if (await item.use() === null) {
  if (TRUtils.isDebugEnabled()) {
    Tablerules.debug({ message: `${macroLabel}, item.use() returned null, returning.`, arguments: arguments });
  }
  return;
}
let tokensInRange = canvas.tokens.placeables.filter(
  t => t.document.disposition === 1 &&
    (t.actor.system.attributes.hp.value < t.actor.system.attributes.hp.max / 2)
);

if (useDistance3D) {
  tokensInRange = tokensInRange.filter(t => (Math.sqrt(TRUtils.distanceTokens(token, t) * TRUtils.distanceTokens(token, t) + (token.document.elevation - t.document.elevation) * (token.document.elevation - t.document.elevation))) <= 30);
} else {
  tokensInRange = tokensInRange.filter(t => TRUtils.distanceTokens(token, t) <= 30);
}

const maxHpHealed = actor._classes.cleric.system.levels * 5;
let healingPool = maxHpHealed;

const description = `As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level (${maxHpHealed}). Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can’t use this feature on an undead or a construct.`;

const footer = `
<div class="form-group">
  <label>Healing Pool</label>
  <input type="number" value="${healingPool}" disabled>
</div>`;

const content = description + tokensInRange.reduce((acc, token) => {
  return acc + `
  <div class="form-group">
    <label>${token.actor.name}</label>
    <label>${token.actor.system.attributes.hp.value}/${token.actor.system.attributes.hp.max}</label>
    <div class="form-fields">
      <input data-token-id="${token.document.id}" type="number" style="width: 3em;" value="0" min="0"></input>
    </div>
  </div>`;
}, "<form>") + footer + "</form>";
const dialogResult = await Dialog.prompt({
  title: macroLabel,
  content,
  callback: (html) => {
    return [...html[0].querySelectorAll("input")].map(i => {
      return { id: i.dataset.tokenId, healing: i.value };
    });
  },
  render: (html) => html[0].addEventListener("change", (event) => { _changeEvent(event, html) }),
  rejectClose: false
});

console.log({ message: `${macroLabel}, returned from Dialog`, dialogResult: dialogResult });


function _changeEvent(event, html) {
  console.log({ message: `${macroLabel}, _changeEvent()`, arguments: arguments });
  const input = event.target;
  if (input.name === "Steve") {
    /* do something specific for the input named 'Steve' */
  } else if (input.name === "Not-so-Steve") {
    /* do something specific for the input named 'Not-so-Steve' */
  }
}

//create Dialog, change values
//put values returned to GM with Requestor
//updates (via Actor.applyDamage() for visuals)

/*
  on GUI validation
  https://github.com/krbz999/zhell-macros/blob/main/classes/wizard/arcane_recovery.js , line 73

*/