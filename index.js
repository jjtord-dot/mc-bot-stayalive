const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
    res.write('ArcticGuard is active!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: 'fundom.playserver.pro', //
        port: 41059,           //
        username: 'FunGuard', 
        version: '1.21.1'      //
    });

    bot.on('spawn', () => {
        console.log("Naka-pasok na si ArcticGuard!");
        
        // Loop: Talon, Crouch, at Chat bawat 30 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            
            setTimeout(() => {
                bot.setControlState('sneak', true);
                setTimeout(() => bot.setControlState('sneak', false), 1000);
            }, 1000);

            // Chat para sa anti-hibernation ng mcserverhost
            bot.chat("ArcticEmpire 24/7 System Active."); 
        }, 30000); 
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') return; // Ignore if server is restarting
        console.log("Error: " + err.code);
    });

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10s.");
        setTimeout(startBot, 10000);
    });
}

startBot();
