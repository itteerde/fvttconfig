/**
 * Effect-Macro Macro for Faerie Fire ItemMacro
 * 
 * https://www.dndbeyond.com/spells/faerie-fire
 * https://github.com/itteerde/fvttconfig/issues/73
 */

const macroLabel = "Faerie Fire";
const image = "icons/magic/fire/projectile-meteor-salvo-strong-teal.webp";

if (await item.use() === null) {
    return;
}


const templates = canvas.scene.templates.filter(t => t.flags.dnd5e !== undefined).filter(t => t.flags.dnd5e.origin === `Actor.${actor._id}.Item.${item._id}`);
if (templates.length > 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) found. Please delete them.`, { permanent: true });
    return;
}

const template = templates[0];

console.log({ message: macroLabel, template: template });

const templateCenterX = template.x + template.width * canvas.scene.grid.size / 5 / 2;
const templateCenterY = template.y + template.width * canvas.scene.grid.size / 5 / 2;

console.log({ message: macroLabel, templateCenterX: templateCenterX, templateCenterY: templateCenterY });

const tokensAffected = canvas.tokens.placeables.filter(p => (Math.abs(p.center.x - templateCenterX) / canvas.scene.grid.size * 5 < template.width && Math.abs(p.center.y - templateCenterY) / canvas.scene.grid.size * 5 < template.width));

console.log({ message: macroLabel, tokensAffected: tokensAffected });

const response = await Requestor.request({
    title: `${macroLabel}`,
    description: `Some Faerie Fire, please?`,
    img: image,
    whisper: [game.users.getName("Gamemaster").id],
    buttonData: [{
        label: "Apply Faerie Fire",
        limit: Requestor.LIMIT.ONCE,
        action: async () => {
            for (let i = 0; i < this.tokensAffected.length; i++) {
                let t = this.tokensAffected[i];
                //modify the token t, referring to data via this., that is:
                // ambient light
                // attach
                // glow
            }
        },
        tokensAffected: tokensAffected // what is here gets into this.<something>
    }]
});

// if response is more or less positive (assuming it gives something useful back) modify ActiveEffect (from Template PLacement) on origin Actor for deletion of all if Concentration is broken.