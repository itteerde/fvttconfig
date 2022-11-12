const item = toBeFound;
item = await fromUuid("uuid here"); // can get item from anywhere, even compendium
item = fromUuidSync("uuid here"); // will get the item from the world, but returns an object if it is in a compendium