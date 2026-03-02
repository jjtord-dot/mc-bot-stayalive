const mineflayer = require('mineflayer');
const http = require('http');

// 1. Dummy Server para hindi mag-fail ang Render
http.createServer((req, res) => {
    res.write('Bot is active!');
    res.end();
}).listen(10000);

// 2. Minecraft Bot Configuration
function startBot() {
    const bot = mineflayer.createBot({
        host: '191.96.231.21', 
        port: 13807,           
        username: 'ArcticGuard', // Kahit anong name
        version: '1.21.1'      // Base sa logs mo, 1.21.1 ang version mo
    });

    bot.on('login', () => console.log("Naka-pasok na ang bot sa ArcticEmpire!"));
    bot.on('error', (err) => console.log("Connection Error: " + err.code));
    
    // Auto-reconnect kapag na-kick
    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10 seconds.");
        setTimeout(startBot, 10000);
    });
}

startBot();
