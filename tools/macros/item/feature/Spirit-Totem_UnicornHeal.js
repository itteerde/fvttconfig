/**
 * Find the Actors to heal and let the GM do it via Requestor. Used by the Druid player.
 * 
 * https://www.dndbeyond.com/classes/druid#CircleoftheShepherd
 */

const icon = "";
const macroLabel = "Spirit Totem: Unicorn (on healing)";

// find the Measuring Template
const templates = canvas.scene.templates.filter(t => t.getFlag(Tablerules.SCOPE, Tablerules.dictionary.class.druid.shepherd.features.spiritTotem.unicornSpirit.key));

if (templates.length !== 1) {
    ui.notifications.error(`${macroLabel}, ${templates.length} Measuring Templates (effects on map) fount. Place or delete to make it 1.`, { permanent: true });
    return;
}

const template = templates[0];

// find Actors in range of the Measuring Template
Math.round(canvas.grid.measureDistance(template, tokenTarget, { gridSpaces: true }));

const actorsToHeal = null;
const targetString = actorsToHeal.map(a => a);//correct mapping?

await Requestor.request({
    description: `${macroLabel}\n ${targetString}`,
    whisper: [game.users.find(u => u.name === "Gamemaster")._id],
    buttonData: [{
        label: "heal",
        action: async () => {
            //await actor.rollSkill("nat", { event });

            // heal actorsToHeal
        }
    }]
});

