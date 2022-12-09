/**
 * Item-Macro Macro for Channel Divinity: Preserve Life
 * https://www.dndbeyond.com/classes/cleric#LifeDomain
 * 
 * icon-suggestion: icons/magic/light/orb-beams-green.webp
 */

const macroLabel = "Channel Divinity: Preserve Life";
const useDistance3D = true;
const image = "icons/magic/light/orb-beams-green.webp";

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

const tokens = tokensInRange.reduce((acc, token) => {
  return acc + `
   <div class="form-group">
       <label style="min-width: 300px;">${token.actor.name}</label>
       <label style="flex:1;">${token.actor.system.attributes.hp.value}/${token.actor.system.attributes.hp.max}</label>
       <div name="${token.document.id}" class="form-fields" style="justify-content: left;">
           <button type="button" class="add">+</button>
           <input class="heal-value" data-token-id="${token.document.id}" type="number" style="flex: 0; min-width: 30px" value="0" min="0" max="${Math.floor(token.actor.system.attributes.hp.max / 2) - token.actor.system.attributes.hp.value}" step="1"></input>
           <button type="button" class="minus">-</button>
       </div>
   </div>
   `;
}, ``);

const content = `
<form style="margin-bottom: 10px">
   <div style="display: flex; margin-bottom: 10px;">
       <img src="${image}" title="Channel Divinity: Preserve Life" style="flex: 0; width: 100px; height: 100px; margin-right: 10px" >
       <div style="flex: 1">As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level (${maxHpHealed}). Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can’t use this feature on an undead or a construct.</div>
   </div>

   <div>
       ${tokens}
   </div>

   <div class="form-group">
       <label style="flex: 1">Healing Pool</label>
       <input name="total" totalstyle="flex: 1" type="number" value="${healingPool}" disabled>
   </div>
</form>
`;

const dialogResult = await Dialog.prompt({
  title: macroLabel,
  content,
  callback: (html) => {
    return [...html[0].querySelectorAll("input")].map(i => {
      return { id: i.dataset.tokenId, healing: i.value };
    });
  },
  render: html => {
    html[0].addEventListener("click", (event) => clickEvent(event, html));
    html[0].addEventListener("change", (event) => changeEvent(event, html));
  },
  rejectClose: false,
  label: 'Heal',
  options: { width: 600 }
});

let requestorDescription = "";
for (let i = 0; i < dialogResult.length - 1; i++) {
  requestorDescription += ` ${canvas.scene.tokens.find(t => t.id === dialogResult[i].id).actor.name} +${dialogResult[i].healing}`
}

await Requestor.request({
  title: `${macroLabel}`,
  description: requestorDescription,
  img: image,
  whisper: [game.users.getName("Gamemaster").id],
  buttonData: [{
    label: "Approve Healing",
    limit: Requestor.LIMIT.ONCE,
    action: async () => {
      for (let i = 0; i < this.dialogResult.length - 1; i++) {
        await canvas.scene.tokens.find(t => t.id === this.dialogResult[i].id).actor.applyDamage(-parseInt(this.dialogResult[i].healing));
      }
    },
    dialogResult: dialogResult // what is here gets into this.<something>
  }]
});


function clickEvent(event, html) {
  const trg = event.target;
  if (trg.type !== 'button') return;

  let input;
  if (trg.classList.contains('add')) {
    input = trg.nextElementSibling;
    input.oldValue = input.value;
    input.value = parseInt(input.value) + 1;
  } else if (trg.classList.contains('minus')) {
    input = trg.previousElementSibling;
    input.oldValue = input.value;
    input.value = Math.max(parseInt(input.value) - 1, 0);
  }

  changeEvent(input, html);
}

function changeEvent(input, html) {
  if (input instanceof Event) input = input.target;
  const total = html[0].querySelector('input[name="total"]').value;
  let runningTotal = 0;
  html[0].querySelectorAll('input.heal-value').forEach(n => runningTotal += parseInt(n.value));

  const oldValue = input.oldValue || 0;
  const newValue = input.value;

  if (runningTotal > total || newValue > parseInt(input.max)) input.value = oldValue;
  else input.oldValue = newValue;
}



//create Dialog, change values
//put values returned to GM with Requestor
//updates (via Actor.applyDamage() for visuals)

/*
 on GUI validation
 https://github.com/krbz999/zhell-macros/blob/main/classes/wizard/arcane_recovery.js , line 73

*/