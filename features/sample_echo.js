module.exports = function (controller) {

    const token = '1099937447:AAHzy2K-EItbPDG9AUSaRZENxdC2Mf-j-58';
    const TelegramBot = require('node-telegram-bot-api');

    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/echo (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer tTDPnKiEten7FgiPxRH1n07a8JWUznabo95rqrYM'
            },
            body: JSON.stringify({ 'text': msg.text })
        };
        async function getGiga() {
            let response = await fetch('https://mp2.gigaaa.link/api/v1/gigaaa-conversations', options)
            let data = await response.json()
            console.log(data);
            console.log(data.actions.display_list);
            return data;
        }
        getGiga()
            .then(data => {
                if (data.actions.display_list === undefined) {
                    bot.sendMessage(chatId, data.actions.speak.text);
                } else if (data.actions.display_list.elements[0].hasOwnProperty('url')) {
                    for (let i = 0; i < 4; i++) {
                        bot.sendMessage(chatId, data.actions.display_list.elements[i].url);
                    }
                } else if (data.actions.display_list.elements[0].hasOwnProperty('body') && data.actions.display_list.elements[0].hasOwnProperty('footer')) {
                    for (let k = 0; k < 3; k++) {
                        bot.sendMessage(chatId, data.actions.display_list.elements[k].body + " " + data.actions.display_list.elements[k].footer);
                    }
                } else {
                    bot.sendMessage(chatId, data.actions.speak.title);
                }
            });
    });
}
