const mineflayer = require('mineflayer');
const http = require('http');

// Render Health Check
http.createServer((req, res) => {
    res.write('FunGuard is active and jumping!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: 'fundom.playserver.pro', // Siguraduhing walang space o extra characters
        port: 41059,                  // Ang bagong port mo
        username: 'FunGuard', 
        version: '1.21.11' 
    });

    bot.on('spawn', () => {
        console.log("Naka-pasok na si FunGuard!");
        
        // Anti-AFK Loop: Talon at Crouch
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            
            setTimeout(() => {
                bot.setControlState('sneak', true);
                setTimeout(() => bot.setControlState('sneak', false), 1000);
            }, 1000);

            bot.chat("FunDom 24/7 System Active."); 
        }, 6000); 
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
