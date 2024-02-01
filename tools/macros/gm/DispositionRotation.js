if (canvas.tokens.controlled.length < 1) {
    ui.notifications.warn("No tokens selected. Select the tokens you want to change the disposition for.");
    return;
}

canvas.tokens.controlled.forEach(t => {
    t.document.update({ "disposition": t.document.disposition < 1 ? t.document.disposition + 1 : -2 });
});