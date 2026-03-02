const mineflayer = require('mineflayer');
const http = require('http');

// Render Health Check para hindi mag-sleep ang bot
http.createServer((req, res) => {
    res.write('ArcticGuard is jumping and crouching!');
    res.end();
}).listen(10000);

function startBot() {
    const bot = mineflayer.createBot({
        host: '191.96.231.21', //
        port: 13807,           //
        username: 'ArcticGuard', 
        version: '1.21.1'      //
    });

    bot.on('spawn', () => {
        console.log("Naka-pasok na at magsisimulang gumalaw!");
        
        // Loop para sa galaw ng bot bawat 3 segundo
        setInterval(() => {
            // Talon
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);

            // Crouch
            setTimeout(() => {
                bot.setControlState('sneak', true);
                setTimeout(() => bot.setControlState('sneak', false), 1000);
            }, 1500);
            
        }, 3000);
    });

    bot.on('error', (err) => console.log("Error: " + err.code));

    bot.on('end', () => {
        console.log("Disconnected... Reconnecting in 10 seconds.");
        setTimeout(startBot, 10000);
    });
}

startBot();
