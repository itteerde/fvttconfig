/**
 * Effect-Macro Macro onDeletion for Holding Breath (Suffocating)
 * 
 * https://www.dndbeyond.com/sources/basic-rules/adventuring#Suffocating
 * https://github.com/itteerde/fvttconfig/issues/81
 * 
 * requires Item-Macro, Effect-Macro, Requestor
 */

// this should make the macro work even if our module is disabled, despite debug logging support
const isDebugEnabled = TRUtils === undefined ? false : TRUtils.isDebugEnabled();

const macroLabel = "Holding Breath (EM onDeletion)";

if (isDebugEnabled) {
    Tablerules.debug({ message: `${macroLabel}`, arguments: arguments });
}

const icon = "icons/magic/time/clock-stopwatch-white-blue.webp";
const flags = {
    scope: "world",
    holdingBreath: { key: "holdingBreath" },
    suffocating: { key: "suffocating" }
};

