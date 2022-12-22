/**
 * only for debugging!
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 */

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    console.log(`pressed ${keyName}`);

}, false);

document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    console.log(`released ${keyName}`);

}, false);