const disposition = -1; // -2 (stealth), through -1 (hostile) to 1 (friendly)

canvas.tokens.controlled.forEach(t => {
    t.document.update({ "disposition": disposition });
});