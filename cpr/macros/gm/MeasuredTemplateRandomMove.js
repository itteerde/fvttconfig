const original = canvas.scene.templates.contents.at(-1);

if (original === undefined) {
    ui.notifications.warn("There is no MeasuredTemplate. This randomizes the last one created, giving up.");
    return;
}

const range = original.distance;

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

function move(point, angle, unit) {
    const rad = Math.radians(angle % 360);

    let [x, y] = point;
    x += unit * Math.sin(rad);
    y -= unit * Math.cos(rad);

    return [x, y];
}

const randomDirection = Math.random() * 360;
const randomDistance = Math.random() * range;
const coordinatesOriginal = [original.x, original.y];
const coordinatesRandomWalked = move(coordinatesOriginal, randomDirection, randomDistance * canvas.scene.grid.size);

if (coordinatesRandomWalked[0] <= 0 || coordinatesRandomWalked[0] >= canvas.scene.dimensions.width || coordinatesRandomWalked[1] <= 0 || coordinatesRandomWalked[1] >= canvas.scene.dimensions.height) {
    ui.notifications.warn(`RandomWalk left the scene: ${coordinatesRandomWalked}`);
    return;
}

const randomWalked = original.toObject();
randomWalked.x = coordinatesRandomWalked[0];
randomWalked.y = coordinatesRandomWalked[1];

await canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [randomWalked]);