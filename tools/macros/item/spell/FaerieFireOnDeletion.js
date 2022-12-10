/**
 * Effect-Macro Macro for Faerie Fire onDeletion
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const lightsCreatedByThisEffect = canvas.scene.lights.filter(l => l.flags?.world?.origin === "Actor.ZtcZ8OdyJl1byKkr.Item.KLoFoT7n9cTUCdTT");
await canvas.scene.deleteEmbeddedDocuments("AmbientLight", lightsCreatedByThisEffect.map(l => l.id));