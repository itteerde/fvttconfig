/**
 * Effect-Macro Macro for Faerie Fire onDeletion
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const macroLabel = "Faerie Fire";
const icon = "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp";
const flagKey = "flags.world.faerieFire";

const lightsCreatedByThisEffect = canvas.scene.lights.filter(l => l.flags?.world?.origin === "Actor.ZtcZ8OdyJl1byKkr.Item.KLoFoT7n9cTUCdTT");
await canvas.scene.deleteEmbeddedDocuments("AmbientLight", lightsCreatedByThisEffect.map(l => l.id));

await TokenMagic.deleteFilters(token, macroLabel);