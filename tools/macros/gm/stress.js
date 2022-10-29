//const actorIds = ["tBmsCEZ4otbmmPcO","anotherID","..."]; // for corner cases and whatever
const actorIds = canvas.tokens.controlled.map(t => t.actor.id);
const icon = "icons/magic/death/undead-ghosts-trio-blue.webp";
const label = "Stress";

const keys = [
  "system.bonuses.abilities.save",
  "system.bonuses.abilities.check",
  "system.bonuses.mwak.attack",
  "system.bonuses.rwak.attack",
  "system.bonuses.msak.attack",
  "system.bonuses.rsak.attack"
];
const actorOptions = actorIds.reduce((acc, id) => {
  const name = game.actors.get(id).name;
  return acc + `<option value="${id}">${name}</option>`;
}, "");
const dirOptions = `
<option value="-1">Reduce Stress</option>
<option value="1">Increase Stress</option>`;
const content = `
<form>
  <div class="form-group">
    <label>Affected Actor:</laberl>
    <div class="form-fields">
      <select id="target-stress-actor">${actorOptions}</select>
      <select id="stress-direction">${dirOptions}</select>
    </div>
  </div>
</form>`;
await Dialog.prompt({
  title: "Stress Config", content, callback: (html) => {
    const actorId = html[0].querySelector("#target-stress-actor").value;
    const dir = html[0].querySelector("#stress-direction").value;
    return updateValue(actorId, dir);
  }
});

function updateValue(actorId, dir) {
  const actor = game.actors.get(actorId);
  const effect = actor.effects.find(e => foundry.utils.hasProperty(e, "flags.world.stress"));
  const current = effect?.getFlag("world", "stress") ?? 0;
  const stress = Number(Math.max(current + Number(dir), 0));
  const changes = keys.map(key => {
    return { key, mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: `-${stress}` };
  });
  const effectData = { changes, icon, label };
  foundry.utils.setProperty(effectData, "flags.world.stress", stress);
  if (effect) return effect.update(effectData);
  return actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
}