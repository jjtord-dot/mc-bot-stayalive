const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'calliope.mcserverhost.com', // Base sa screenshot mo
        port: 13807,           // Base sa server-port mo
        username: 'StayAliveBot',
        version: false         // Hayaan ang bot na mag-auto-detect ng version
    });

    bot.on('login', () => {
        console.log("Success! Naka-pasok na ang bot sa server.");
    });

    // Para hindi mag-crash ang Render kapag nag-error
    bot.on('error', (err) => {
        console.log("Waiting for server to be online... (" + err.code + ")");
    });

    // Auto-reconnect kapag na-kick o nawala ang server
    bot.on('end', () => {
        console.log("Disconnected. Reconnecting in 10 seconds...");
        setTimeout(createBot, 10000);
    });
}

createBot();

// Mahalaga para sa Render: Gumawa ng dummy server para hindi "Failed" ang status
const http = require('http');
http.createServer((req, res) => {
    res.write('Bot is running!');
    res.end();
}).listen(10000);
