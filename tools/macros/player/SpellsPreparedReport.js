/**
 * planned to test the spells prepared from the Control Bar.
 *
 * https://github.com/itteerde/fvttconfig/issues/77
 */

// how are double preparations handled (Enona)?

//warlock
canvas.tokens.controlled[0].actor.items.filter(i => i.type === "spell" && i.system.preparation.mode === "pact")