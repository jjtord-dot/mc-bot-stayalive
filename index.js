const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'calliope.mcserverhost.com', 
        port: 13807,           
        username: 'StayAliveBot',
        version: '1.21.11' // Siguraduhin na 1.21.1 ito base sa logs mo
    });

    bot.on('login', () => console.log("Bot is online sa ArcticEmpire!"));
    
    bot.on('error', (err) => {
        console.log("Server issue: " + err.code);
        // Huwag hayaang mag-crash ang program
    });

    bot.on('end', () => {
        console.log("Disconnected. Reconnecting in 15 seconds...");
        setTimeout(createBot, 15000);
    });
}

createBot();

// Mahalaga para sa Render (Keep-alive server)
const http = require('http');
http.createServer((req, res) => {
    res.write('Bot is running!');
    res.end();
}).listen(10000);
