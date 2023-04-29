game.actors.get("y8pM6f2v4YLwcrxj").items.filter(s => s.type === "spell")
game.user.targets.find(t => true).actor.name
game.actors.getName(game.user.targets.find(t => true).actor.name).items.filter(s => s.type === "spell")

game.actors.get("w0H5GHtw7ser0ntj").items.filter(s => s.type === "spell").map(e => { return { name: e.name, level: e.system.level } }).sort((a, b) => { if (a.level !== b.level) { return a.level - b.level } else { a.name.localeCompare(b.name) } })

// Actor's spells sorted by level and within in alpabetical order
game.actors.get("w0H5GHtw7ser0ntj").items.filter(
    s => s.type === "spell").map(
        e => {
            return {
                name: e.name,
                level: e.system.level
            }
        }).sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level
            } else {
                return a.name.localeCompare(b.name)
            }
        }).map(e => e.name)

canvas.tokens.controlled[0].actor.items.filter(
    s => s.type === "spell").map(
        e => {
            return {
                name: e.name,
                level: e.system.level
            }
        }).sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level
            } else {
                return a.name.localeCompare(b.name)
            }
        }).map(e => e.name)

Object.getPrototypeOf(game.actors.get("qoF84nzjLIRH4NCg")).constructor.name


if (true) {
    const oneLiners = [
        "For you the bells toll!",
        "Your time has come!",
        "The bell tolls for thee!",
        "The end is nigh!",
        "Your fate is sealed!",
        "The hour of reckoning is at hand!",
        "Your destiny awaits!",
        "The tolling bell is your death knell!",
        "Your time on this earth is up!",
        "The bell tolls, and you shall answer!",
        "Your end is written in the stars!",
        "The time has come to pay the price!",
        "The tolling of the bell is the harbinger of your doom!",
        "Your sins have caught up to you!",
        "The bell tolls, and your fate is sealed!",
        "The reckoning has arrived!",
        "The end is near!",
        "Your time is up!",
        "The bell tolls for all, but it tolls loudest for you!",
        "You have been weighed, you have been measured, and you have been found wanting!",
        "Your time has run out!",
        "The end is inevitable!",
        "The bell tolls, and so it begins!",
        "Your fate is inescapable!",
        "The hourglass has run out of sand for you!",
        "The bell tolls, and death comes for you!",
        "Your time has expired!",
        "The end is written, and you cannot change it!",
        "The tolling of the bell is the last thing you'll hear!",
        "Your time is done!",
        "The end has come!",
        "The bell tolls, and your fate is sealed!",
        "Your fate was decided long ago!",
        "The reckoning has come!",
        "The bell tolls, and the end is near!",
        "Your time has come to an end!",
        "The end is here!",
        "The tolling of the bell is the sound of your demise!",
        "Your time on this world is finished!",
        "The end is written in the stars!",
        "The bell tolls, and so it shall be!",
        "Your destiny is sealed!",
        "The hour of your death is at hand!",
        "The tolling of the bell marks the end of your life!",
        "Your end is inevitable!",
        "The bell tolls, and it tolls for you!",
        "Your time has come to face the music!",
        "The end is upon you!",
        "The bell tolls, and you cannot escape your fate!",
        "Your time on this earth is at an end!",
        "The end is near, and you cannot run from it!",
        "The tolling of the bell is the sound of your doom!",
        "Your fate is sealed, and the bell tolls for you!",
        "May Mishakal's compassion guide your soul... to the afterlife!",
        "Let the toll of the dead remind you of the consequences of your evil deeds!",
        "You cannot escape the toll of Mishakal's justice!",
        "May the toll of the dead be a wake-up call to those who still cling to darkness!",
        "The sound of the bell tolls for thee, and there's no escape from Mishakal's divine wrath!",
        "May the toll of the dead remind you that all actions have consequences!",
        "Mishakal's love knows no bounds, but her justice is swift and unforgiving!",
        "Even in death, may you find the compassion and healing you denied to others!",
        "Mishakal's toll of the dead is a warning to all who dare to oppose her divine will!",
        "May the toll of the dead be a reminder that Mishakal's power is not to be underestimated!",
        "May the sound of the bell be a reminder that justice is never too late to be served!",
        "You may think you're untouchable, but the toll of the dead will prove you wrong!",
        "May the bell toll for thee, and may it be the last sound you hear!",
        "Mishakal's mercy is infinite, but her patience with evil is not!",
        "May the toll of the dead be a call to repentance before it's too late!",
        "Death may be the end of your physical existence, but it's just the beginning of your punishment!",
        "The toll of the dead echoes through the ages as a warning to all who seek to do harm!",
        "May the sound of the bell be a reminder of the loved ones you've hurt and the lives you've destroyed!",
        "Mishakal's love is unconditional, but her wrath is relentless!",
        "May the toll of the dead be a beacon of hope for those you've wronged!",
        "The sound of the bell is the last thing you'll hear before Mishakal's judgment is delivered!",
        "You may have evaded justice in life, but you can't escape the toll of the dead in death!",
        "May the bell toll for thee, and may it be the last sound of your wickedness!",
        "Mishakal's compassion extends to all, but her retribution is reserved for the most wicked!",
        "May the toll of the dead be a reminder that no one is above Mishakal's law!",
        "The sound of the bell tolls for all, but only the wicked fear its toll!",
        "May the bell's toll be the last sound you hear before Mishakal's justice is served!",
        "Mishakal's love heals all wounds, but her justice delivers the final blow!",
        "May the toll of the dead be a warning to those who underestimate the power of Mishakal's champions!",
        "The sound of the bell is a call to arms for all those who seek to bring Mishakal's justice to the world!",
        "May the toll of the dead be a reminder that no one can escape their fate!",
        "The sound of the bell is the sound of the end for those who dare to oppose Mishakal's will!",
        "May the toll of the dead be a reminder of the loved ones who await justice!",
        "Mishakal's power is infinite, and so is her wrath against the wicked!",
        "May the sound of the bell be a sign of hope for those who seek justice!",
        "The toll of the dead is the sound of your sins catching up to you!",
        "May the toll of the dead be a warning to those who would seek to hurt the innocent!",
        "The sound of the bell tolls for thee, and its toll is the sound of your undoing!",
        "May the toll of the dead be the last thing you hear before the weight of your sins consumes you!",
        "Mishakal's champions are guided by her love and fueled by her justice!",
        "May the toll of the dead be the first step towards redemption for the wicked!",
        "The sound of the bell is a call to all who believe in justice to rise up and fight!",
        "May the toll of the dead be a reminder that even the most powerful can fall!",
        "Mishakal's compassion is for all, but her mercy is reserved for the repentant!",
        "May the sound of the bell be a reminder that those who live by the sword will die by the bell!",
        "The toll of the dead is the sound of Mishakal's justice, and it will not be denied!",
        "May the toll of the dead be the last thing the wicked hear before they meet their fate!",
        "The sound of the bell is a warning to all who seek to defy Mishakal's will!",
        "May the toll of the dead be a reminder that every soul is accountable for their actions!",
        "Mishakal's love extends to all, but her judgment is reserved for the most evil!",
        "May the sound of the bell be a call to all those who seek to bring Mishakal's justice to the world!",
        "The toll of the dead is the sound of the righteous striking down the wicked!",
        "May the toll of the dead be a beacon of hope for those who seek to right the wrongs of the world!",
        "The sound of the bell is the last thing the wicked hear before they face their punishment!",
        "May the toll of the dead be a reminder that no one can escape Mishakal's judgment!",
        "The toll of the dead is the sound of Mishakal's champions fighting for justice!",
        "May the sound of the bell be a warning to all who seek to harm the innocent!",
        "The toll of the dead is the sound of Mishakal's wrath against the wicked!",
        "May the toll of the dead be a reminder that those who seek to cause pain will feel it themselves!",
        "The sound of the bell is a call to all those who believe in justice to unite and fight!",
        "May the toll of the dead be a sign of hope for the oppressed and the downtrodden!",
        "The toll of the dead is the sound of Mishakal's champions bringing justice to the world!",
        "May the sound of the bell be a reminder that even the most wicked can be redeemed!",
        "The toll of the dead is the sound of justice being served!",
        "May the toll of the dead be a warning to those who seek to harm the innocent that justice will find them!",
        "The sound of the bell is the last thing the wicked hear before they meet their fate at Mishakal's hands!",
        "May the toll of the dead be a reminder that every action has consequences!",
        "The toll of the dead is the sound of the righteous standing up to evil!",
        "May the sound of the bell be a call to all those who seek to bring peace to the world!",
        "The toll of the dead is the sound of Mishakal's champions fighting for what is right!"
    ];

    let spkr = ChatMessage.getSpeaker({ actor: actor });
    ChatMessage.create({
        speaker: spkr,
        content: oneLiners[Math.floor(Math.random() * oneLiners.length)],
        type: CONST.CHAT_MESSAGE_TYPES.EMOTE
    },
        { chatBubble: true });
}

item.use();