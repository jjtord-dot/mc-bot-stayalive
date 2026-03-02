const mineflayer = require('mineflayer');
const http = require('http');

// Render Health Check para manatiling online ang bot
http.createServer((req, res) => {
    res.write('FunGuard is active!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: 'fundom.playserver.pro', // Siguraduhing walang extra characters
        port: 41059,                  // Ang iyong bagong port
        username: 'FunGuard', 
        version: '1.21.11'             // Ang version ng iyong server
    });

    bot.on('spawn', () => {
        console.log("Naka-pasok na si FunGuard!");

        // Gagalaw at mag-cha-chat ang bot bawat 60 seconds (1 minute)
        // Ginawa nating 60s para hindi magmukhang spam sa console
        setInterval(() => {
            // 1. Galaw (Talon at Crouch)
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            
            setTimeout(() => {
                bot.setControlState('sneak', true);
                setTimeout(() => bot.setControlState('sneak', false), 1000);
            }, 1000);

            // 2. Isang Mensahe (Chat)
            // Isang beses lang ito lalabas bawat loop
            bot.chat("FunDom 24/7 System is active. No hibernation."); 
            
        }, 60000); // 60000ms = 1 minute
    });

    bot.on('error', (err) => {
        console.log("Error: " + err.code);
    });

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10s.");
        setTimeout(startBot, 10000);
    });
}

startBot();
