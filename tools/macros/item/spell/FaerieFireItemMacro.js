/**
 * Effect-Macro Macro for Faerie Fire ItemMacro
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const macroLabel = "Faerie Fire";

if (await item.use() === null) {
    return;
}


templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);
if (templates.length > 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Please delete them.`, { permanent: true });
    return;
}

const template = templates[0];

console.log({ message: macroLabel, template: template });

function isTokenInTemplate(token, template) {

    let templateCenterX = template.x + template.width / 2;
    let templateCenterY = template.y + template.width / 2;

    console.log({ message: `${macroLabel}`, templateCenter: { x: templateCenterX, y: templateCenterY } });

    if (Math.abs(token.center.x - templateCenterX) > template.width) {
        return false;
    }
    if (Math.abs(token.center.y - templateCenterY) > template.width) {
        return false;
    }

    return true;
};
