/**
 * Item-Macro Macro for the Hide Action
 */

const use = await item.use();
if (use === null) {
    return;
}

console.log({ use: use });