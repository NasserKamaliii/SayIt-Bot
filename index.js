require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const db = require('./database/db');

const bot = new TelegramBot(process.env.BOT_TOKEN, { 
    polling: true,
    filepath: false
});

// تسجيل المعالجات
require('./handlers/start')(bot);
require('./handlers/link')(bot);
require('./handlers/messages')(bot);
require('./handlers/admin')(bot);

// Middleware للتحقق من المطور
bot.on('message', (msg) => {
    if (msg.text?.startsWith('/admin') && 
        msg.from.id.toString() !== process.env.ADMIN_ID) {
        return bot.sendMessage(msg.chat.id, '❌ ليس لديك صلاحية');
    }
});

console.log('✅ البوت يعمل!');