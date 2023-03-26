const text = "This is a text for which something or somebody would like to know how many words it has.";

const dialog = true;
const chat = false;

if (dialog)
    new Dialog({ title: "Word Count", content: `${text} (${text.split(" ").length} words)`, buttons: {} }).render(true);

if (chat)
    await ChatMessage.create({ content: `${text} (${text.split(" ").length} words)` });