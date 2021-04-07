
const TelegramBot = require('node-telegram-bot-api');


const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_GROUP_CHAT_ID'; // e.g. -565606421


const bot = new TelegramBot(token, {polling: false});


function notify(message) {
    bot.sendMessage(CHAT_ID, message);
}

module.exports = notify;
