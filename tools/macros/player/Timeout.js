const content = `
<form>
    <div class="form-group">
        <label for="message">Message cast:</label>
        <div class="form-fields">
            <input id="message" type="text" value=""></input>
        </div>
    </div>
</form>`;

const buttons = {
    message: {
        icon: "<i class='fa-regular fa-bell'></i>",
        label: "Timeout!",
        callback: async (html) => {
            const message = html[0].querySelector("#message").value;
            return await ChatMessage.create({
                content: `
                <div style="width:100%;">
                    <img style="padding:5px; background-color: red;" src="icons/magic/time/clock-stopwatch-white-blue.webp"><b>Timeout?!</b><br/>
                    ${message}
                </di>
                `,
                sound: "modules/Tablerules/sounds/turn.ogg",
                whisper: ChatMessage.getWhisperRecipients('GM')
            });
        }
    }
}

new Dialog({ title: "Timeout", content, buttons, default: "message" }).render(true);

