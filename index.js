const mineflayer = require('mineflayer');
const http = require('http');

// Dummy server para sa Render Health Check
http.createServer((req, res) => {
    res.write('Bot is active!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: '191.96.231.21', 
        port: 13807,           
        username: 'ArcticGuard', 
        version: '1.21.1'      // Eto ang tamang version base sa logs mo
    });

    bot.on('login', () => console.log("Naka-pasok na ang bot!"));
    
    bot.on('error', (err) => {
        console.log("Connection Error: " + err.code);
    });

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10 seconds.");
        setTimeout(startBot, 10000);
    });
}

startBot();
