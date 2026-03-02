const mineflayer = require('mineflayer');
const http = require('http');

// Render Health Check (Para manatiling 'Live')
http.createServer((req, res) => {
    res.write('ArcticEmpire Bot is Online!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: '191.96.231.21', //
        port: 13807,           // Java Port
        username: 'ArcticGuard', 
        version: '1.21.1'      //
    });

    bot.on('login', () => console.log("SUCCESS: Naka-pasok na ang bot!"));
    
    bot.on('error', (err) => {
        console.log("Connection Error: " + err.code);
    });

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10 seconds.");
        setTimeout(startBot, 10000);
    });
}

startBot();
