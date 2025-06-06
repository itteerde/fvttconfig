//////////////////............How does this work?.............//////////////////////
// You as the GM have to check the itemName is correct in this macro. (see main function)
// The player clicks the macro and on first run it will only give the button refresh
// this will set the dice for the first time. CLicking the macro again will allow the
// player to use the dice set by the macro. It is then upto the DM and player on how
// to interpret this number. Since there are too many use cases to capture at once.
//
// Gallery: https://imgur.com/a/PYpMbUy
//
// https://gitlab.com/Freeze020/foundry-vtt-scripts/-/blob/master/DnD5e%20specific%20macros/portent.js
//
// Requires v10 and DnD 5e v2.0.3+

const itemName = "Portent"                                                    // set this string to what the Portent feature item is called in your game.
const wizardActor = game.user.character || token.actor; //second option is for the GM.
const portentItem = wizardActor.items.find(i => i.name === "Portent");

if (!portentItem) return ui.notifications.warn("Your actor does not have the Portent feature");
let myButtons = await generateButtons(wizardActor, portentItem, itemName); // creates the buttons, see function below.
new Dialog({
    title: "Divination Wizard's Portent",
    content: `Make a choice ${wizardActor.getFlag("world", "portent")}`,
    buttons: myButtons,
}).render(true);

async function generateButtons(wizardActor, item, itemName) {
    let portentRolled = await wizardActor.getFlag("world", "portent"); // does the character already have a set of buttons
    let diceNumber = wizardActor.items.getName("Wizard").system.levels < 14 ? 2 : 3; //sets up for Greater Portent where the player gets 3 dice at level 14.
    let myButtons = {};
    if (portentRolled !== undefined) {
        myButtons = portentRolled.reduce((buttons, roll) => {
            let msgContent = `I forsaw this event and choose to roll: <b>${roll}</b>`;
            buttons[roll] = {
                label: `Roll: ${roll}`,
                callback: async () => {
                    ChatMessage.create({
                        content: `<div class="dnd5e chat-card">
                                                    <header class="card-header flexrow">
                                                        <img src="${item.img}" title="${item.name}" width="36" height="36" />
                                                        <h3 class="item-name">${item.name}:</h3>
                                                    </header></div>` + msgContent, speaker: { alias: wizardActor.name }
                    });
                    portentRolled.splice(portentRolled.indexOf(roll), 1); // removes the used value from the array.
                    await wizardActor.setFlag("world", "portent", portentRolled); // sets the new array as the flag value
                    //await item.update({ name: `${itemName} [${portentRolled}]` });  // updates the item name to contain the new array.
                }
            };
            return buttons;
        }, {});
    }
    myButtons.reset = {
        label: "Refresh, new day",
        callback: async () => {
            let portentRolls = [];
            let msgContent = "";
            let i = 1; // roll counter
            let myRoll = await new Roll(`${diceNumber}d20`).evaluate({ async: true }); // rolling the new dice
            for (let result of myRoll.terms[0].results) {
                portentRolls.push(result.result); // adding the result to the array.
                msgContent += `Roll ${i} - <b>${result.result}</b></br>`; // preps part of the chat message content
                i++;
            }
            await wizardActor.setFlag("world", "portent", portentRolls); // sets a fresh array of 2 or 3 d20s 
            //await item.update({ name: `${itemName} [${portentRolls}]` })
            ChatMessage.create({
                content: `<div class="dnd5e chat-card">
                                            <header class="card-header flexrow">
                                            <img src="${item.img}" title="${item.name}" width="36" height="36" />
                                            <h3 class="item-name">${item.name}:</h3>
                                        </header></div>
                                            My portent forsees the following outcomes:</br>` + msgContent, speaker: { alias: wizardActor.name }
            });
        }

    };
    return myButtons;
}

