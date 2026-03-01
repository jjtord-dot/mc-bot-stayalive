const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'calliope.mcserverhost.com', 
        port: 13807,             
        username: 'StayAliveBot',
        version: '1.21.11' // <--- ILAGAY MO DITO ANG VERSION NG SERVER MO
    });

    bot.on('login', () => {
        console.log("Naka-login na ang bot!");
    });

    bot.on('kick', (reason) => console.log(`Kicked: ${reason}`));
    bot.on('error', (err) => console.error(err));
    bot.on('end', () => {
        console.log("Bot disconnected. Reconnecting in 5 seconds...");
        setTimeout(createBot, 5000);
    });
}

createBot();
