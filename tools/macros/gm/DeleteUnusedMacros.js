/**
 * not tested, don't use
 * 
 * https://discord.com/channels/170995199584108546/699750150674972743/1055752969754263683
 */

const allMacroIds = new Set(game.macros.map(e => e.id));
const used = new Set();
for (let user of game.users) {
    Object.values(user.hotbar).forEach(id => used.add(id))
}
const unused = allMacroIds.difference(used);
await Macro.deleteDocuments([...unused]);