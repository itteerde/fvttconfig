/**
 * Item-Macro Macro for Channel Divinity: Preserve Life (Tablerules.dictionary.class.cleric.life.features.preserveLife)
 */

//collect valid targets
const token = canvas.tokens.controlled[0];
const tokensInRange = canvas.tokens.placeables.filter(t => TRUtils.distanceTokens(token, t) <= 30);

//create UI
//create ChatMessage